import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { messages } from '@/db/schema';
import { getDb } from '@/lib/db';
import { getSession, unauthorized } from '@/lib/session';

type Params = { params: Promise<{ id: string }> };

const patchSchema = z.object({ status: z.enum(['nuevo', 'leido', 'archivado']) });

async function parseId(params: Params['params']) {
  const id = Number((await params).id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(request: Request, { params }: Params) {
  if (!(await getSession(request))) return unauthorized();
  const id = await parseId(params);
  if (id === null) return Response.json({ error: 'Id inválido' }, { status: 400 });

  const parsed = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: 'Estado inválido' }, { status: 400 });

  const db = await getDb();
  await db.update(messages).set({ status: parsed.data.status }).where(eq(messages.id, id));
  return Response.json({ ok: true });
}

export async function DELETE(request: Request, { params }: Params) {
  if (!(await getSession(request))) return unauthorized();
  const id = await parseId(params);
  if (id === null) return Response.json({ error: 'Id inválido' }, { status: 400 });

  const db = await getDb();
  await db.delete(messages).where(eq(messages.id, id));
  return Response.json({ ok: true });
}
