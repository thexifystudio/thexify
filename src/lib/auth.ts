import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { SESSION_COOKIES, sessionCookieName } from '@/lib/session-cookie';

export { SESSION_COOKIES };

const encoder = new TextEncoder();
const SESSION_SECONDS = 60 * 60 * 24 * 7;
const TOKEN_ISSUER = 'thexify.com';
const TOKEN_AUDIENCE = 'thexify-admin';

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(userId: number, email: string, secret: string): Promise<string> {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(TOKEN_ISSUER)
    .setAudience(TOKEN_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(encoder.encode(secret));
}

export async function verifyToken(
  token: string,
  secret: string,
): Promise<{ userId: number; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret), {
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
      algorithms: ['HS256'],
    });
    if (!Number.isSafeInteger(payload.userId) || typeof payload.email !== 'string') return null;
    return { userId: payload.userId as number, email: payload.email };
  } catch {
    return null;
  }
}

export function sessionCookie(token: string, secure: boolean): string {
  const secureAttribute = secure ? '; Secure' : '';
  return `${sessionCookieName(secure)}=${token}; HttpOnly${secureAttribute}; SameSite=Lax; Path=/; Max-Age=${SESSION_SECONDS}`;
}

export function clearedSessionCookie(secure: boolean): string {
  const secureAttribute = secure ? '; Secure' : '';
  return `${sessionCookieName(secure)}=; HttpOnly${secureAttribute}; SameSite=Lax; Path=/; Max-Age=0`;
}

export function getTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get('Cookie');
  if (!cookie) return null;
  for (const name of SESSION_COOKIES) {
    const match = cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
    if (match) return match[1];
  }
  return null;
}
