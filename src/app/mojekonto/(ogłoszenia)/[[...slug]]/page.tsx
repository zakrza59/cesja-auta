'use client';

import { notFound, usePathname } from 'next/navigation';
import { Flex } from '@mantine/core';

import { routes } from '~/const/routes';
import { Page } from '~/app/_components/Page';
import { AdvertsTabs } from '~/app/mojekonto/_components/AdvertsTabs';
import { ActiveCars } from '~/app/mojekonto/(ogłoszenia)/_components/ActiveCars';
import { UnpaidCars } from '~/app/mojekonto/(ogłoszenia)/_components/UnpaidCars';
import { FinishedCars } from '~/app/mojekonto/(ogłoszenia)/_components/FinishedCars';

const advertsTabs = [
  { label: 'Aktywne', value: routes.myAccount, component: <ActiveCars /> },
  { label: 'Nieopłacone', value: routes.myAccountUnpaid, component: <UnpaidCars /> },
  { label: 'Zakończone', value: routes.myAccountFinished, component: <FinishedCars /> },
];

export default function MojeKonto() {
  const pathname = usePathname();
  const selectedTab = advertsTabs.find((el) => el.value === pathname);

  if (!selectedTab) {
    notFound();
  }

  return (
    <Page>
      <Flex direction="column">
        <AdvertsTabs tabs={advertsTabs} path={pathname} />
      </Flex>
    </Page>
  );
}
