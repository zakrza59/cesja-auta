import React from 'react';
import Link from 'next/link';
import { Offer } from '@prisma/client';

import { buildOfferUrl } from '~/utils/buildOfferUrl';

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
        <li key={offer.id}>
          <Link href={buildOfferUrl(offer.type, offer.slug!)}>{offer.title}</Link>
        </li>
      ))}
    </ul>
  );
};
