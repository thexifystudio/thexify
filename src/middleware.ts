import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIES } from '@/lib/session-cookie';

const CANONICAL_HOST = 'thexify.com';
const PRODUCTION_HOSTS = new Set([CANONICAL_HOST, `www.${CANONICAL_HOST}`]);

/**
 * True only when Cloudflare's edge reports a plain-http visit. The URL's own
 * scheme is not trusted: `wrangler dev` presents local requests as
 * http://thexify.com, which would loop.
 */
function isPlainHttp(request: NextRequest): boolean {
  const visitor = request.headers.get('cf-visitor')?.match(/"scheme"\s*:\s*"(\w+)"/)?.[1];
  const forwarded = request.headers.get('x-forwarded-proto')?.split(',')[0].trim();
  return (visitor ?? forwarded) === 'http';
}

/**
 * 1. One public address: http:// and www. answer with a 301 to https://thexify.com.
 * 2. Gatekeeper for /admin. Runs without bindings, so it only turns away
 *    requests with no session cookie; the /admin layout and the API verify the
 *    JWT signature. Never import lib/auth here (bcryptjs + jose).
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() ?? '';
  if (PRODUCTION_HOSTS.has(host) && (host !== CANONICAL_HOST || isPlainHttp(request))) {
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`https://${CANONICAL_HOST}${pathname}${search}`, 301);
  }

  const { pathname } = request.nextUrl;
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  if (!isAdmin || SESSION_COOKIES.some((name) => request.cookies.has(name))) return NextResponse.next();

  const url = new URL('/login/', request.url);
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
