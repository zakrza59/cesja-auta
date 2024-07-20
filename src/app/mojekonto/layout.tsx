'use client';

import { Flex, Tabs } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';

import { routes } from '~/const/routes';

const accountTabs = [
  {
    label: 'Ogłoszenia',
    value: routes.myAccount,
    title: 'Twoje ogłoszenia',
    childPaths: [routes.myAccountUnpaid, routes.myAccountFinished],
  },
  { label: 'Platności', value: routes.myAccountPayments, title: 'Twoje płatności' },
  { label: 'Ustawienia', value: routes.myAccountSettings, title: 'Ustawienia konta' },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const tab = accountTabs.find((el) => el.value === pathname || el.childPaths?.includes(pathname));
  const mainPathname = tab?.value;
  const title = tab?.title;

  return (
    <div>
      <Flex h={100} direction="column" justify="space-between">
        {title}
        <Tabs value={mainPathname} onChange={(value) => router.push(value!)}>
          <Tabs.List>
            {accountTabs.map((tab) => (
              <Tabs.Tab key={tab.value} value={tab.value}>
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </Flex>
      <div>{children}</div>
    </div>
  );
}
