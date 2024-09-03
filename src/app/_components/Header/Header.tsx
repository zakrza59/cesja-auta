'use client';

import Link from 'next/link';
import { Group, Button, Box, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

import { UserDropdown } from '~/app/_components/Header/UserDropdown';
import { MobileMenu } from '~/app/_components/Header/MobileMenu';
import { routes } from '~/const/routes';

import classes from './Header.module.css';

export const Header = () => {
  const [isDrawerOpen, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <>
      <Box component="header" className={classes.header}>
        <Group color="red" justify="space-between" h="100%">
          <p>CesjaAuta</p>
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href={routes.home} className={classes.link}>
              Home
            </Link>
            <Link href={routes.offers} className={classes.link}>
              Szukaj
            </Link>
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
            <Button
              size="md"
              variant="gradient"
              gradient={{ from: 'blue', to: 'grape', deg: 90 }}
              component={Link}
              href={routes.addOffer}
            >
              Wystaw auto
            </Button>
          </Group>
          <Burger onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </Box>

      <MobileMenu isOpen={isDrawerOpen} handleClose={closeDrawer} />
    </>
  );
};
