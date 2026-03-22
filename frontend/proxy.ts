import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_PATHS = ['/login', '/signup'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  // Logged-in user visiting login/signup → send home
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Everything else (not login/signup, not static) is protected
  if (!isAuthPage && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
