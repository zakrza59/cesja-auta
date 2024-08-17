'use client';

import { notFound, usePathname } from 'next/navigation';
import { Flex } from '@mantine/core';

import { routes } from '~/const/routes';
import { Page } from '~/app/_components/Page';
import { AdvertsTabs } from '~/app/mojekonto/_components/AdvertsTabs';
import { ActiveOffers } from '~/app/mojekonto/(ogłoszenia)/_components/ActiveOffers';
import { UnpaidOffers } from '~/app/mojekonto/(ogłoszenia)/_components/UnpaidOffers';
import { FinishedOffers } from '~/app/mojekonto/(ogłoszenia)/_components/FinishedOffers';

const advertsTabs = [
  { label: 'Aktywne', value: routes.myAccount, component: <ActiveOffers /> },
  { label: 'Nieopłacone', value: routes.myAccountUnpaid, component: <UnpaidOffers /> },
  { label: 'Zakończone', value: routes.myAccountFinished, component: <FinishedOffers /> },
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
