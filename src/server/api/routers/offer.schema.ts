import { z } from 'zod';

export const AddOfferSchema = z.object({
  title: z.string().min(1).max(70),
  brand: z.string().min(1),
  model: z.string().min(1),
});

export const GetOfferSchema = z.object({
  brand: z.string().array(),
  model: z.string().array(),

  installmentFrom: z.number().optional(),
  installmentTo: z.number().optional(),

  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),

  yearFrom: z.number().optional(),
  yearTo: z.number().optional(),

  bodyType: z.string().array(),
});
