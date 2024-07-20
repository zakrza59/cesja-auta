import React from 'react';
import { Tabs } from '@mantine/core';

type AdvertsTabsProps = {
  path: string;
  tabs: Array<{
    label: string;
    value: string;
    component: React.ReactNode;
  }>;
};

export const AdvertsTabs = ({ path, tabs }: AdvertsTabsProps) => {
  const handleTabChange = (value: string | null) => {
    if (value !== null) {
      window.history.pushState(null, '', value);
    }
  };

  return (
    <Tabs value={path} onChange={handleTabChange}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          {tab.component}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
