import * as changeCase from 'change-case';

import { Page } from '~/app/_components/Page';
import { api } from '~/trpc/server';

type Props = {
  params: { slug: string };
};

export default async function Osobowe({ params }: Props) {
  const { slug } = params;

  const carId = slug.slice(-10);

  console.log(changeCase.kebabCase('TEST_VALUE'), 'KEBAB');

  const car = await api.offer.getCar({ id: carId });

  console.log(car, 'CAR');
  return (
    <Page>
      <div>Osobowe {params.slug}</div>
      <div>{JSON.stringify(car, null, 2)}</div>
    </Page>
  );
}
