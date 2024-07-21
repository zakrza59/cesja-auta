import { z } from 'zod';
import { Status } from '@prisma/client';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';

export const carRouter = createTRPCRouter({
  addCar: protectedProcedure.input(z.object({ title: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    const modelMake = Math.floor(Math.random() * 2) + 1;
    console.log(modelMake, 'modelMake');
    return ctx.db.car.create({
      data: {
        clerkId: ctx.userId,
        title: input.title,
        makeId: modelMake,
        modelId: modelMake,
      },
    });
  }),
  getActiveCarsByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.car.findMany({
      where: {
        clerkId: ctx.userId,
        status: Status.ACTIVE,
      },
    });
  }),
  getUnpaidCarsByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.car.findMany({
      where: {
        clerkId: ctx.userId,
        status: Status.UNPAID,
      },
    });
  }),
  getFinishedCarsByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.car.findMany({
      where: {
        clerkId: ctx.userId,
        status: Status.FINISHED,
      },
    });
  }),
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.car.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }),
});
