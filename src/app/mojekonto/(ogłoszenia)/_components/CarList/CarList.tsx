import React from 'react';
import { Car } from '@prisma/client';

type CarListProps = {
  data?: Car[];
};

export const CarList = ({ data }: CarListProps) => {
  if (!data || data.length === 0) {
    return <div>No data</div>;
  }

  return (
    <ul>
      {data.map((car) => (
        <li key={car.id}>{car.title}</li>
      ))}
    </ul>
  );
};
