import React from 'react';
import { UnstyledButton, Group, Text, Menu, rem, useMantineTheme } from '@mantine/core';
import { IconLogout, IconHeart, IconSettings, IconChevronDown, IconUserCircle } from '@tabler/icons-react';
import { SignOutButton } from '@clerk/nextjs';

import classes from './UserDropdown.module.css';

export const UserDropdown = () => {
  const theme = useMantineTheme();

  return (
    <Menu
      width={181}
      position="bottom-end"
      trigger="click-hover"
      offset={0}
      closeDelay={300}
      withinPortal={false}
      closeOnItemClick={false}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group gap={9}>
            <IconUserCircle style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
            <Text fw={500}>Twoje Konto</Text>
            <IconChevronDown style={{ width: rem(20), height: rem(20) }} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />}>
          Liked posts
        </Menu.Item>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}>
          Account settings
        </Menu.Item>
        <Menu.Divider />
        <SignOutButton>
          <Menu.Item color="red" leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}>
            Logout
          </Menu.Item>
        </SignOutButton>
      </Menu.Dropdown>
    </Menu>
  );
};
