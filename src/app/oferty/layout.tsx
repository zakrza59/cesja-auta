import React from 'react';

import { Filters } from '~/app/_components/Filters';
import { Page } from '~/app/_components/Page';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <Filters />
      {children}
    </Page>
  );
}
