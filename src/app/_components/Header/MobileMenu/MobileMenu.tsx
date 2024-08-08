import React from 'react';
import Link from 'next/link';
import { Button, Divider, Drawer, Stack } from '@mantine/core';
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/nextjs';

import { routes } from '~/const/routes';

import classes from './MobileMenu.module.css';

type MobileMenuProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const MobileMenu = ({ isOpen, handleClose }: MobileMenuProps) => {
  return (
    <Drawer
      opened={isOpen}
      onClose={handleClose}
      hiddenFrom="sm"
      zIndex={1000000}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <Stack justify="center" py="lg" px="md">
        <Button
          size="md"
          variant="gradient"
          gradient={{ from: 'blue', to: 'grape', deg: 90 }}
          component={Link}
          href={routes.addOffer}
        >
          Wystaw auto
        </Button>
      </Stack>
      <Divider />
      <a href="#" className={classes.link}>
        Home
      </a>
      <a href="#" className={classes.link}>
        Szukaj
      </a>
      <Divider />
      <a href="#" className={classes.link}>
        Ulubione
      </a>
      <a href="#" className={classes.link}>
        Ustawienia konta
      </a>
      <Divider />
      <Stack justify="center" pt="lg" px="md">
        <SignedOut>
          <SignInButton>
            <Button size="md" variant="default">
              Zaloguj się
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <SignOutButton>
            <Button size="md" variant="default" onClick={() => window.location.reload()}>
              Wyloguj się
            </Button>
          </SignOutButton>
        </SignedIn>
      </Stack>
    </Drawer>
  );
};
