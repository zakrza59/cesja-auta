import React from 'react';

import { api } from '~/trpc/react';
import { CarList } from '~/app/mojekonto/(ogłoszenia)/_components/CarList';

export const FinishedCars = () => {
  const { data, error, isPending } = api.offer.getFinishedCarsByUser.useQuery();
  console.log(data, 'finished cars');

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No data</div>;
  }

  return <CarList data={data} />;
};
