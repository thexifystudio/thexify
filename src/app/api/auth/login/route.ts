import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { users } from '@/db/schema';
import { createToken, sessionCookie, verifyPassword } from '@/lib/auth';
import { getDb, getEnv } from '@/lib/db';

const schema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: 'Faltan datos' }, { status: 400 });

  const env = await getEnv();
  if (!env.AUTH_SECRET) return Response.json({ error: 'Servidor mal configurado' }, { status: 500 });

  const db = await getDb();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, parsed.data.email.toLowerCase()))
    .limit(1)
    .all();

  // Same answer for unknown email and wrong password: never confirm which emails exist.
  const invalid = () => Response.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 });
  if (!user) return invalid();
  if (!(await verifyPassword(parsed.data.password, user.passwordHash))) return invalid();

  const token = await createToken(user.id, user.email, env.AUTH_SECRET);
  return Response.json(
    { user: { id: user.id, email: user.email, name: user.name } },
    { headers: { 'Set-Cookie': sessionCookie(token) } },
  );
}
