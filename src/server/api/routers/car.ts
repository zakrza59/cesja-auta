import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';

export const carRouter = createTRPCRouter({
  addCar: protectedProcedure.input(z.object({ title: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    const clerkId = ctx.userId;
    const modelMake = Math.floor(Math.random() * 2) + 1;
    console.log(modelMake, 'modelMake');
    console.log(clerkId, 'clerkId');

    return ctx.db.car.create({
      data: {
        clerkId,
        title: input.title,
        makeId: modelMake,
        modelId: modelMake,
      },
    });
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.car.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }),
});
