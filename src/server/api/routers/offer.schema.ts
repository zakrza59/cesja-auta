import { z } from 'zod';

export const AddOfferSchema = z.object({
  title: z.string().min(1).max(70),
  make: z.string().min(1),
  model: z.string().min(1),
});

export const GetOfferSchema = z.object({
  makes: z.string().array(),
  models: z.string().array(),
});
