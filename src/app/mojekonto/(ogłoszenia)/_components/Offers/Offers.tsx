import React from 'react';
import { Prisma } from '@prisma/client';

type OffersProps = {
  data?: Prisma.OfferGetPayload<{ include: { make: true; model: true } }>[];
};

export const Offers = ({ data }: OffersProps) => {
  if (!data || data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <ul>
      {data.map((offer) => (
        <li key={offer.id}>
          {offer.title} - {offer.make.name} - {offer.model.name}
        </li>
      ))}
    </ul>
  );
};
