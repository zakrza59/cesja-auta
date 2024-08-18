import { z } from 'zod';

export const AddOfferSchema = z.object({
  title: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
});