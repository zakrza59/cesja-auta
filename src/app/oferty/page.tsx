import Link from 'next/link';
import { Card } from '@mantine/core';

import { Page } from '~/app/_components/Page';
import { api } from '~/trpc/server';
import { buildOfferUrl } from '~/lib/buildOfferUrl';

export default async function Oferty({ searchParams }) {
  const offers = await api.offer.getOffers({
    brand: searchParams.brand?.split(',') || [],
    model: searchParams.model?.split(',') || [],
    installmentFrom: Number(searchParams.installmentFrom) || 0,
    installmentTo: Number(searchParams.installmentTo) || 0,
    priceFrom: Number(searchParams.priceFrom) || 0,
    priceTo: Number(searchParams.priceTo) || 0,
    yearFrom: Number(searchParams.yearFrom) || 0,
    yearTo: Number(searchParams.yearTo) || 0,
    body: searchParams.body?.split(',') || [],
    fuelType: searchParams.fuelType?.split(',') || [],
    gearbox: searchParams.gearbox?.split(',') || [],
  });

  return (
    <Page>
      <div>searchParams: {JSON.stringify(searchParams)}</div>
      <div>
        <ul>
          {offers.map((offer) => (
            <Card withBorder radius="md" p="md" mb="md" key={offer.id}>
              <Link href={buildOfferUrl(offer.type, offer.slug!)}>
                {offer.title} CENA: {offer.price}, RATA: {offer.installment}, NADWOZIE: {offer.body.name}, PALIWO:{' '}
                {offer.fuelType.name}, SKRZYNIA: {offer.gearbox.name}
              </Link>
            </Card>
          ))}
        </ul>
      </div>
    </Page>
  );
}

const a = [
  {
    id: '0dcfnurhZv',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'Mercedes GLC Lorem ipsum?',
    description: null,
    price: null,
    brandId: 'mercedes',
    modelId: 'mercedes.glc',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'mercedes-glc-lorem-ipsum-0dcfnurhZv',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: '4ZYGe15iMp',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'Mercedes GLB Drop database :"|}{_+<>?,./',
    description: null,
    price: null,
    brandId: 'mercedes',
    modelId: 'mercedes.glb',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'mercedes-glb-drop-database-4ZYGe15iMp',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: '6Scyb5Jwwa',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'Mercedes GLC Tanio od niemca',
    description: null,
    price: null,
    brandId: 'mercedes',
    modelId: 'mercedes.glc',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'mercedes-glc-tanio-od-niemca-6Scyb5Jwwa',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: 'FNIANEEBcx',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'BMW X1 Test db',
    description: null,
    price: null,
    brandId: 'bmw',
    modelId: 'bmw.x1',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'bmw-x1-test-db-FNIANEEBcx',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: 'OxTN7Iy3Vb',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'Audi A5 Powypadkowe | Tanio | Do NEGOO?',
    description: null,
    price: null,
    brandId: 'audi',
    modelId: 'audi.a5',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'audi-a5-powypadkowe-tanio-do-negoo-OxTN7Iy3Vb',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: 'VKpEBHlU0v',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'Audi A5 Rata 1000PLN !!!! Polecam!',
    description: null,
    price: null,
    brandId: 'audi',
    modelId: 'audi.a5',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'audi-a5-rata-1000-pln-polecam-VKpEBHlU0v',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: 'YJz6oQWClQ',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'Mercedes GLA Nie lubie zupy :)',
    description: null,
    price: null,
    brandId: 'mercedes',
    modelId: 'mercedes.gla',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'mercedes-gla-nie-lubie-zupy-YJz6oQWClQ',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: 'ZUILpIlIIW',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'BMW X1 Jedyny W POLSCE!! Taniocha',
    description: null,
    price: null,
    brandId: 'bmw',
    modelId: 'bmw.x1',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'bmw-x1-jedyny-w-polsce-taniocha-ZUILpIlIIW',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: 'kCkEw9avTW',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'Mercedes GLA Najnowsze z salonu',
    description: null,
    price: null,
    brandId: 'mercedes',
    modelId: 'mercedes.gla',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'mercedes-gla-najnowsze-z-salonu-kCkEw9avTW',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
  {
    id: 'msq3ffqpdw',
    clerkId: 'user_2kOClxrdmYwtC7gP3J0osyAJgyd',
    title: 'BMW X1 Pierwszy właściiel, || {}Pedał ściana/ / Używany',
    description: null,
    price: null,
    brandId: 'bmw',
    modelId: 'bmw.x1',
    year: null,
    mileage: null,
    fuelType: null,
    transmission: null,
    engineSize: null,
    bodyType: null,
    color: null,
    condition: null,
    slug: 'bmw-x1-pierwszy-wlasciiel-pedal-sciana-uzywany-msq3ffqpdw',
    status: 'ACTIVE',
    type: 'PERSONAL',
    createdAt: '2024-08-26T19:16:03.954Z',
    updatedAt: '2024-08-26T19:27:59.134Z',
  },
];
