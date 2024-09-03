import Link from 'next/link';
import { Card } from '@mantine/core';

import { Page } from '~/app/_components/Page';
import { Filters } from '~/app/_components/Filters';
import { api } from '~/trpc/server';
import { buildOfferUrl } from '~/utils/buildOfferUrl';

export default async function Oferty({ searchParams }) {
  const offers = await api.offer.getOffers({
    makes: searchParams.makes?.split(',') || [],
    models: searchParams.models?.split(',') || [],
  });

  console.log(offers.length, 'OFFERS');
  return (
    <Page>
      <Filters />
      <div>searchParams: {JSON.stringify(searchParams)}</div>
      <div>
        <ul>
          {offers.map((offer) => (
            <Card withBorder radius="md" p="md" mb="md" key={offer.id}>
              <Link href={buildOfferUrl(offer.type, offer.slug!)}>{offer.title}</Link>
            </Card>
          ))}
        </ul>
      </div>
    </Page>
  );
}
