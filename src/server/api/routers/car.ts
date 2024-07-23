import { z } from 'zod';
import { Status } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import { generateId } from '~/utils/generateId';

export const carRouter = createTRPCRouter({
  addCar: protectedProcedure.input(z.object({ title: z.string().min(1) })).mutation(async ({ ctx, input }) => {
    const modelMake = Math.floor(Math.random() * 2) + 1;
    return ctx.db.car.create({
      data: {
        id: generateId(),
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
  getCar: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const car = await ctx.db.car.findUnique({
      where: {
        id: input.id,
        status: Status.ACTIVE,
      },
    });

    if (!car) {
      // TODO: Add proper error
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Nie możemy znaleźć ogłoszenia' });
    }

    return car;
  }),
});
