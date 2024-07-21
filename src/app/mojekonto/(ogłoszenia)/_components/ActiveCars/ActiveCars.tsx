import React from 'react';

import { api } from '~/trpc/react';
import { CarList } from '~/app/mojekonto/(ogłoszenia)/_components/CarList';

export const ActiveCars = () => {
  const { data, error, isPending } = api.car.getActiveCarsByUser.useQuery();
  console.log(data, 'active cars');

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No data</div>;
  }

  return <CarList data={data} />;
};
