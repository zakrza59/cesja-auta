'use client';

import Link from 'next/link';
import { Group, Button, Box, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';

import { UserDropdown } from '~/app/_components/Header/UserDropdown';
import { MobileMenu } from '~/app/_components/Header/MobileMenu';
import { Logo } from '~/components/ui/Logo';
import { routes } from '~/const/routes';
import { Button as ButtonUi } from '~/components/ui/Button';

import classes from './Header.module.css';

export const Header = () => {
  const [isDrawerOpen, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <>
      <Box component="header" className={classes.header}>
        <Group color="red" justify="space-between" h="100%">
          <Logo />
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
                <Button color="#fff" size="md" variant="outline">
                  Zaloguj się
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserDropdown />
            </SignedIn>
            <Button size="md" color="deepBlue" component={Link} href={routes.addOffer}>
              Dodaj ogłoszenie
            </Button>
            <ButtonUi variant="default" size="lg">
              Dodaj ogłoszenie 1
            </ButtonUi>
            <ButtonUi variant="outline">Dodaj ogłoszenie 3</ButtonUi>
            <ButtonUi variant="destructive">Dodaj ogłoszenie 2</ButtonUi>
            <ButtonUi variant="link">Dodaj ogłoszenie 4</ButtonUi>
            <ButtonUi variant="ghost">Dodaj ogłoszenie 5</ButtonUi>
            <ButtonUi variant="secondary">Dodaj ogłoszenie 6</ButtonUi>
          </Group>
          <Burger color="white" onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </Box>
      <MobileMenu isOpen={isDrawerOpen} handleClose={closeDrawer} />
    </>
  );
};
