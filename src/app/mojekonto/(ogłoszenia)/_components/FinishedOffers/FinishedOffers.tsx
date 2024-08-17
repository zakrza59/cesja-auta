import React from 'react';

import { api } from '~/trpc/react';
import { Offers } from '~/app/mojekonto/(ogłoszenia)/_components/Offers';

export const FinishedOffers = () => {
  const { data, error, isPending } = api.offer.getFinishedOffersByUser.useQuery();
  console.log(data, 'finished offers');

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No data</div>;
  }

  return <Offers data={data} />;
};
