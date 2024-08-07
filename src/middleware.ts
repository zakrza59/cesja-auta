import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

import { routes } from '~/const/routes';

const includeChildRoutesRegex = (route: string) => `${route}(.*)`;

const isProtectedRoute = createRouteMatcher([includeChildRoutesRegex(routes.myAccount), routes.addOffer]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
