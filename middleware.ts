import { auth } from '@/lib/auth';

export default auth;

export const config = {
  // Protect /admin routes, but let other things pass
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
