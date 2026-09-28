import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE } from '@/lib/session-cookie';

/**
 * Gatekeeper for /admin. Runs on the Edge runtime without bindings, so it only
 * turns away requests with no session cookie; the /admin layout and the API
 * verify the JWT signature. Never import lib/auth here (bcryptjs + jose).
 */
export function middleware(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();

  const url = new URL('/login/', request.url);
  url.searchParams.set('next', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
