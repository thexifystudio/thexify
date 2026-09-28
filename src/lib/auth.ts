import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { SESSION_COOKIE } from '@/lib/session-cookie';

export { SESSION_COOKIE };

const encoder = new TextEncoder();
const SESSION_SECONDS = 60 * 60 * 24 * 7;

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(userId: number, email: string, secret: string): Promise<string> {
  return new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(encoder.encode(secret));
}

export async function verifyToken(
  token: string,
  secret: string,
): Promise<{ userId: number; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return { userId: payload.userId as number, email: payload.email as string };
  } catch {
    return null;
  }
}

export function sessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_SECONDS}`;
}

export function clearedSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export function getTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get('Cookie');
  if (!cookie) return null;
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return match ? match[1] : null;
}
