import { z } from 'zod';
import { OfferStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import * as changeCase from 'change-case';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import { AddOfferSchema } from '~/server/api/routers/offer.schema';
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
    const title = `${make} ${model} ${input.title.trim()}`;
    const url = removeAccents(changeCase.kebabCase(`${title}-${id}`));

    return ctx.db.offer.create({
      data: {
        id,
        title,
        url,
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
  getCar: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
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
  getMakes: protectedProcedure.query(({ ctx }) => {
    return ctx.db.make.findMany();
  }),
  getMakeModels: protectedProcedure.input(z.object({ makeId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.model.findMany({ where: { makeId: input.makeId } });
  }),
});
