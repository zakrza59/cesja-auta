import React from 'react';

import { api } from '~/trpc/react';
import { CarList } from '~/app/mojekonto/(ogłoszenia)/_components/CarList';

export const UnpaidCars = () => {
  const { data, error, isPending } = api.offer.getUnpaidCarsByUser.useQuery();

  console.log(data, 'unpaid cars');

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No data</div>;
  }

  return <CarList data={data} />;
};
