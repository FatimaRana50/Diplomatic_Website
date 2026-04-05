import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/welcome', '/login', '/signup'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('session')?.value;

  const isPublicPage = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // Logged-in user visiting login/signup/welcome → send home
  if (isPublicPage && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Unauthenticated user visiting a protected route → send to landing page
  if (!isPublicPage && !session) {
    const welcomeUrl = new URL('/welcome', request.url);
    return NextResponse.redirect(welcomeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
