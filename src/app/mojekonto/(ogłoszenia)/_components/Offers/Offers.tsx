import React from 'react';
import { Offer } from '@prisma/client';

type OffersProps = {
  data?: Offer[];
};

export const Offers = ({ data }: OffersProps) => {
  if (!data || data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <ul>
      {data.map((offer) => (
        <li key={offer.id}>{offer.title}</li>
      ))}
    </ul>
  );
};
