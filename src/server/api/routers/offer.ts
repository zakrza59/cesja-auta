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
        brand: true,
      },
    });

    if (!selectedModel) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie może znaleźć modelu' });
    }

    const brand = selectedModel.brand.name;
    const model = selectedModel.name;
    const title = `${brand} ${model} ${input.title.trim()}`; //TODO brand i model może niekoniecznie w title na sztywno?
    const slug = removeAccents(changeCase.kebabCase(title)) + `-${id}`;

    return ctx.db.offer.create({
      data: {
        id,
        title,
        slug,
        clerkId: ctx.userId,
        brandId: input.brand,
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
        brand: true,
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
        brand: true,
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
        brand: true,
        model: true,
      },
    });
  }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.offer.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        brand: true,
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
  getOffers: publicProcedure.input(GetOfferSchema).query(({ ctx, input }) => {
    const whereClause: Prisma.OfferWhereInput = {
      status: OfferStatus.ACTIVE,
      ...brandAndModelFilter(input.brand, input.model),
      ...rangeFilter('installment', input.installmentFrom, input.installmentTo),
      ...rangeFilter('price', input.priceFrom, input.priceTo),
      ...rangeFilter('year', input.yearFrom, input.yearTo),
      ...bodyTypeFilter(input.bodyType),
    };

    return ctx.db.offer.findMany({
      where: whereClause,
      take: 10,
      include: {
        brand: true,
        model: true,
        bodyType: true,
      },
    });
  }),
  getBrands: publicProcedure.query(({ ctx }) => {
    return ctx.db.brand.findMany();
  }),
  getBrandModels: publicProcedure.input(z.object({ brandId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.model.findMany({
      where: {
        brandId: input.brandId,
      },
    });
  }),
  getBrandsModels: publicProcedure.input(z.object({ brandIds: z.array(z.string()) })).query(async ({ ctx, input }) => {
    const models = await ctx.db.model.findMany({
      where: {
        brandId: {
          in: input.brandIds,
        },
      },
      include: {
        brand: true,
      },
    });

    console.log(models, 'WESZLO models');

    function groupModelsByBand(models) {
      const newArr = [];

      models.forEach((model) => {
        const group = model.brand.name;
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

    return groupModelsByBand(models);
  }),
  getBodyTypes: publicProcedure.query(({ ctx }) => {
    return ctx.db.bodyType.findMany();
  }),
});

/**
 * Helper function to build the OR conditions based on the brands and models input.
 */
function brandAndModelFilter(brands: string[] | [], models: string[]): Prisma.OfferWhereInput {
  if (brands.length === 0) {
    return {};
  }

  const filteredBands = brands.filter((brand) => !models.some((model) => model.startsWith(brand)));

  return {
    OR: [
      {
        brandId: { in: filteredBands },
      },
      {
        modelId: { in: models },
      },
    ],
  };
}

function rangeFilter(
  field: keyof Pick<Prisma.OfferWhereInput, 'installment' | 'price' | 'year' | 'mileage' | 'engineSize'>,
  from?: number,
  to?: number,
): Prisma.OfferWhereInput {
  const whereClause: Prisma.OfferWhereInput = {};

  if (from) {
    whereClause[field] = {
      gte: from,
    };
  }

  if (to) {
    whereClause[field] = {
      lte: to,
    };
  }

  if (from && to) {
    whereClause[field] = {
      gte: from,
      lte: to,
    };
  }

  return whereClause;
}

function bodyTypeFilter(bodyTypes: string[]): Prisma.OfferWhereInput {
  if (bodyTypes.length === 0) {
    return {};
  }

  return {
    AND: [{ bodyTypeId: { in: bodyTypes } }],
  };
}
