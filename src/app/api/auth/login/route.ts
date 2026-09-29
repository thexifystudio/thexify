import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { users } from '@/db/schema';
import { createToken, sessionCookie, verifyPassword } from '@/lib/auth';
import { getDb, getEnv } from '@/lib/db';
import { isAllowed } from '@/lib/rate-limit';
import { isTrustedMutation, readJson } from '@/lib/request';

const NO_STORE = { 'Cache-Control': 'no-store' };
// Comparing against a real hash keeps unknown-email and wrong-password requests
// close enough in cost that the endpoint does not reveal registered addresses.
const DUMMY_HASH = '$2b$10$zwgXx9cksGYcJTZOnthrUeFcRMot7lxOw1.TPJ2Th1Fnvw7gQ3Lr6';

const schema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  if (!isTrustedMutation(request)) {
    return Response.json({ error: 'Origen no permitido' }, { status: 403, headers: NO_STORE });
  }
  if (!(await isAllowed(request, 'LOGIN_RATE_LIMITER'))) {
    return Response.json(
      { error: 'Demasiados intentos. Intenta más tarde.' },
      { status: 429, headers: NO_STORE },
    );
  }

  const json = await readJson(request, 1024);
  if (!json.ok) return Response.json({ error: json.message }, { status: json.status, headers: NO_STORE });
  const parsed = schema.safeParse(json.value);
  if (!parsed.success) return Response.json({ error: 'Faltan datos' }, { status: 400, headers: NO_STORE });

  const env = await getEnv();
  if (!env.AUTH_SECRET || env.AUTH_SECRET.length < 32) {
    console.error(JSON.stringify({ event: 'auth_secret_invalid' }));
    return Response.json({ error: 'Servidor mal configurado' }, { status: 500, headers: NO_STORE });
  }

  const db = await getDb();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, parsed.data.email.toLowerCase()))
    .limit(1)
    .all();

  // Same answer for unknown email and wrong password: never confirm which emails exist.
  const passwordIsValid = await verifyPassword(parsed.data.password, user?.passwordHash ?? DUMMY_HASH);
  const invalid = () =>
    Response.json({ error: 'Correo o contraseña incorrectos' }, { status: 401, headers: NO_STORE });
  if (!user || !passwordIsValid) return invalid();

  const token = await createToken(user.id, user.email, env.AUTH_SECRET);
  return Response.json(
    { user: { id: user.id, email: user.email, name: user.name } },
    {
      headers: {
        ...NO_STORE,
        'Set-Cookie': sessionCookie(token, new URL(request.url).protocol === 'https:'),
      },
    },
  );
}
