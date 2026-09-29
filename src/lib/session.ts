import { cookies } from 'next/headers';
import { SESSION_COOKIES, getTokenFromRequest, verifyToken } from '@/lib/auth';
import { getEnv } from '@/lib/db';

/**
 * Real session checks. The middleware only looks for the cookie; the JWT
 * signature is verified here, where the secret is available.
 */

/** Route Handlers. Null when there is no valid session. */
export async function getSession(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  const env = await getEnv();
  if (!env.AUTH_SECRET) return null;
  return verifyToken(token, env.AUTH_SECRET);
}

/** Server Components (the /admin layout). */
export async function getServerSession() {
  try {
    const cookieStore = await cookies();
    const token = SESSION_COOKIES.map((name) => cookieStore.get(name)?.value).find(Boolean);
    if (!token) return null;
    const env = await getEnv();
    if (!env.AUTH_SECRET) return null;
    return await verifyToken(token, env.AUTH_SECRET);
  } catch {
    return null;
  }
}

export function unauthorized() {
  return Response.json({ error: 'No autorizado' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
}
