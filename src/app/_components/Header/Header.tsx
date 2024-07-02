'use client';

import { Group, Button, Divider, Box, Burger, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

import { UserDropdown } from '~/app/_components/Header/UserDropdown';

import classes from './Header.module.css';

export const Header = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <>
      <Box component="header" className={classes.header}>
        <Group color="red" justify="space-between" h="100%">
          <p>CesjaAuta</p>
          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
          </Group>

          <Group visibleFrom="sm" gap={24}>
            <SignedOut>
              <SignInButton>
                <Button variant="default">Zaloguj się</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserDropdown />
            </SignedIn>
            <Button size="md" variant="gradient" gradient={{ from: 'blue', to: 'grape', deg: 90 }}>
              Wystaw auto
            </Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Divider mb="sm" />
        <a href="#" className={classes.link}>
          Home
        </a>
        <a href="#" className={classes.link}>
          Learn
        </a>
        <a href="#" className={classes.link}>
          Academy
        </a>
        <Divider my="sm" />
        <Stack justify="center" pb="xl" px="md">
          <Button size="md" variant="default">
            Zaloguj się
          </Button>
          <Button size="md" variant="gradient" gradient={{ from: 'blue', to: 'grape', deg: 90 }}>
            Wystaw auto
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};
