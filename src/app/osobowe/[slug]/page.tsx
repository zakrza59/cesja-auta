import { Page } from '~/app/_components/Page';
import { api } from '~/trpc/server';

type Props = {
  params: { slug: string };
};

export default async function Osobowe({ params }: Props) {
  const { slug } = params;

  const carId = slug.slice(-10);

  const car = await api.offer.getCar({ id: carId });

  if (!car) {
    return <Page>Osobowe</Page>;
  }

  return (
    <Page>
      <div>Osobowe {params.slug}</div>
      <div>{JSON.stringify(car, null, 2)}</div>
    </Page>
  );
}
