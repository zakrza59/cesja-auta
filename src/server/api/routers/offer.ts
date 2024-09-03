import { z } from 'zod';
import { Prisma, OfferStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import * as changeCase from 'change-case';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';
import { AddOfferSchema, GetOfferSchema } from '~/server/api/routers/offer.schema';
import { generateId } from '~/utils/generateId';
import { removeAccents } from '~/utils/removeAccents';

export const offerRouter = createTRPCRouter({
  addOffer: protectedProcedure.input(AddOfferSchema).mutation(async ({ ctx, input }) => {
    const id = generateId();

    const selectedModel = await ctx.db.model.findUnique({
      where: {
        id: input.model,
      },
      include: {
        make: true,
      },
    });

    if (!selectedModel) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie może znaleźć modelu' });
    }

    const make = selectedModel.make.name;
    const model = selectedModel.name;
    const title = `${make} ${model} ${input.title.trim()}`; //TODO make i model może niekoniecznie w title na sztywno?
    const slug = removeAccents(changeCase.kebabCase(title)) + `-${id}`;

    return ctx.db.offer.create({
      data: {
        id,
        title,
        slug,
        clerkId: ctx.userId,
        makeId: input.make,
        modelId: input.model,
      },
    });
  }),
  getActiveOffersByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.offer.findMany({
      where: {
        clerkId: ctx.userId,
        status: OfferStatus.ACTIVE,
      },
      include: {
        make: true,
        model: true,
      },
    });
  }),
  getUnpaidOffersByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.offer.findMany({
      where: {
        clerkId: ctx.userId,
        status: OfferStatus.UNPAID,
      },
      include: {
        make: true,
        model: true,
      },
    });
  }),
  getFinishedOffersByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.offer.findMany({
      where: {
        clerkId: ctx.userId,
        status: OfferStatus.FINISHED,
      },
      include: {
        make: true,
        model: true,
      },
    });
  }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        make: true,
        model: true,
      },
    });
  }),
  getOffer: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const offer = await ctx.db.offer.findUnique({
      where: {
        id: input.id,
        status: OfferStatus.ACTIVE,
      },
    });

    if (!offer) {
      // TODO: Add proper error
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie możemy znaleźć ogłoszenia' });
    }

    return offer;
  }),
  getOffers: publicProcedure
    .input(
      z.object({
        makes: z.string().array(),
        models: z.string().array(),
      }),
    )
    .query(({ ctx, input }) => {
      const whereClause: Prisma.OfferWhereInput = {
        status: OfferStatus.ACTIVE,
        ...brandAndModelFilter(input.makes, input.models),
      };

      return ctx.db.offer.findMany({
        where: whereClause,
        take: 10,
        include: {
          make: true,
          model: true,
        },
      });
    }),
  getMakes: publicProcedure.query(({ ctx }) => {
    return ctx.db.make.findMany();
  }),
  getMakeModels: publicProcedure.input(z.object({ makeId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.model.findMany({
      where: {
        makeId: input.makeId,
      },
    });
  }),
  getMakesModels: publicProcedure.input(z.object({ makeIds: z.array(z.string()) })).query(async ({ ctx, input }) => {
    const models = await ctx.db.model.findMany({
      where: {
        makeId: {
          in: input.makeIds,
        },
      },
      include: {
        make: true,
      },
    });

    console.log(models, 'WESZLO models');

    function groupModelsByMake(models) {
      const newArr = [];

      models.forEach((model) => {
        const group = model.make.name;
        const item = { value: model.id, label: model.name };

        const existingGroupIndex = newArr.findIndex((groupObj) => groupObj.group === group);

        if (existingGroupIndex !== -1) {
          newArr[existingGroupIndex].items.push(item);
        } else {
          newArr.push({ group, items: [item] });
        }
      });

      return newArr;
    }

    return groupModelsByMake(models);
  }),
});

/**
 * Helper function to build the OR conditions based on the makes and models input.
 */
function brandAndModelFilter(makes: string[] | [], models: string[]): Prisma.OfferWhereInput {
  if (makes.length === 0) {
    return {};
  }

  const filteredMakes = makes.filter((make) => !models.some((model) => model.startsWith(make)));

  return {
    OR: [
      {
        makeId: { in: filteredMakes },
      },
      {
        modelId: { in: models },
      },
    ],
  };
}
