'use client';

import Link from 'next/link';
import { CircleUser, Menu, Package2 } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/Sheet';
import { Button } from '~/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/Card';
import { Checkbox } from '~/components/ui/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/DropdownMenu';
import { Input } from '~/components/ui/Input';
import { routes } from '~/const/routes';
import { Logo } from '~/components/ui/Logo';
import { Switch } from '~/components/ui/Switch';

export const Navbar = () => {
  const { setTheme, theme } = useTheme();

  console.log(theme, 'THEME');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Logo />
          <Link href={routes.home} className="text-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href={routes.offers} className="text-foreground transition-colors hover:text-foreground">
            Szukaj
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Logo />
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Orders
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center">
                  Darkmode
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="ml-3"
                  />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ogłoszenia</DropdownMenuItem>
              <DropdownMenuItem>Ulubione</DropdownMenuItem>
              <DropdownMenuItem>Ustawienia konta</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Wyloguj się</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>Used to identify your store in the marketplace.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Store Name" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>The directory within your project, in which your plugins are located.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input placeholder="Project Name" defaultValue="/content/plugins" />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};