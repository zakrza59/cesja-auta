import '~/styles/globals.css';
import '@mantine/core/styles.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { GeistSans } from 'geist/font/sans';

import { TRPCReactProvider } from '~/trpc/react';

export const metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head suppressHydrationWarning>
          <ColorSchemeScript />
        </head>
        <body className={GeistSans.className}>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <TRPCReactProvider>
            <MantineProvider>{children}</MantineProvider>
          </TRPCReactProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
