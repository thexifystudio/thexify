import { desc } from 'drizzle-orm';
import { z } from 'zod';
import { messages } from '@/db/schema';
import { getDb } from '@/lib/db';
import { getSession, unauthorized } from '@/lib/session';

// Mirrors the limits of the contact form (src/components/ContactForm.tsx).
const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(160),
  business: z.string().trim().max(150).optional().default(''),
  service: z.string().trim().max(80).optional().default(''),
  description: z.string().trim().min(15).max(2500),
  /** Honeypot: real visitors never see or fill it. */
  website: z.string().max(200).optional().default(''),
  /** Time between the form loading and being sent, measured in the browser. */
  elapsedMs: z.number().optional(),
  lang: z.enum(['es', 'en']).optional(),
});

/** Anything faster than this after the form loaded is treated as a bot. */
const MIN_FILL_MS = 2500;

/** Public: the contact form posts here. */
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: 'Datos inválidos' }, { status: 400 });

  const data = parsed.data;
  const tooFast = data.elapsedMs !== undefined && data.elapsedMs >= 0 && data.elapsedMs < MIN_FILL_MS;
  // Bots get the same success answer, so they have nothing to adjust against.
  if (data.website || tooFast) return Response.json({ ok: true }, { status: 201 });

  try {
    const db = await getDb();
    await db.insert(messages).values({
      name: data.name,
      email: data.email.toLowerCase(),
      business: data.business || null,
      projectType: data.service || null,
      message: data.description,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return Response.json({ error: 'No se pudo guardar el mensaje' }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}

/** Private: admin inbox. */
export async function GET(request: Request) {
  if (!(await getSession(request))) return unauthorized();
  const db = await getDb();
  const rows = await db.select().from(messages).orderBy(desc(messages.id)).all();
  return Response.json({ mensajes: rows });
}
