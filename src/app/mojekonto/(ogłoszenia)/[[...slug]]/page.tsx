'use client';

import { notFound, usePathname } from 'next/navigation';

import { Page } from '~/app/_components/Page';
import { AdvertsTabs } from '~/app/mojekonto/_components/AdvertsTabs';
import { routes } from '~/const/routes';

const AdvertsList = () => {
  return <div>AdvertsList1</div>;
};
const AdvertsList2 = () => {
  return <div>AdvertsList2</div>;
};
const AdvertsList3 = () => {
  return <div>AdvertsList3</div>;
};

const advertsTabs = [
  { label: 'Aktywne', value: routes.myAccount, component: <AdvertsList /> },
  { label: 'Nieopłacone', value: routes.myAccountUnpaid, component: <AdvertsList2 /> },
  { label: 'Zakończone', value: routes.myAccountFinished, component: <AdvertsList3 /> },
];

export default function MojeKonto() {
  const pathname = usePathname();
  const selectedTab = advertsTabs.find((el) => el.value === pathname);

  if (!selectedTab) {
    notFound();
  }

  return (
    <Page>
      <AdvertsTabs tabs={advertsTabs} path={pathname} />
      SLUG
    </Page>
  );
}
