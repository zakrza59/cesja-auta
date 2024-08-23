import { CarType } from '@prisma/client';

export const buildOfferUrl = (carType: CarType, slug: string): string => {
  if (carType === CarType.PERSONAL) {
    return `/osobowe/${slug}`;
  }

  if (carType === CarType.CARGO) {
    return `/dostawcze/${slug}`;
  }

  return `/osobowe/${slug}`;
};
