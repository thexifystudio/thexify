import { desc } from 'drizzle-orm';
import { z } from 'zod';
import { messages } from '@/db/schema';
import { getDb } from '@/lib/db';
import { isAllowed } from '@/lib/rate-limit';
import { isTrustedMutation, readJson } from '@/lib/request';
import { getSession, unauthorized } from '@/lib/session';

const NO_STORE = { 'Cache-Control': 'no-store' };

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
  if (!isTrustedMutation(request)) {
    return Response.json({ error: 'Origen no permitido' }, { status: 403 });
  }
  if (!(await isAllowed(request, 'CONTACT_RATE_LIMITER'))) {
    return Response.json({ error: 'Demasiados mensajes. Intenta más tarde.' }, { status: 429 });
  }

  const json = await readJson(request, 16 * 1024);
  if (!json.ok) return Response.json({ error: json.message }, { status: json.status });
  const parsed = schema.safeParse(json.value);
  if (!parsed.success) return Response.json({ error: 'Datos inválidos' }, { status: 400 });

  const data = parsed.data;
  const tooFast = data.elapsedMs === undefined || data.elapsedMs < MIN_FILL_MS;
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
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'contact_message_insert_failed',
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return Response.json({ error: 'No se pudo guardar el mensaje' }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}

/** Private: admin inbox. */
export async function GET(request: Request) {
  if (!(await getSession(request))) return unauthorized();
  const db = await getDb();
  const rows = await db.select().from(messages).orderBy(desc(messages.id)).all();
  return Response.json({ mensajes: rows }, { headers: NO_STORE });
}
