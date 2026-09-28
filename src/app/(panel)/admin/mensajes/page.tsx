import { desc } from 'drizzle-orm';
import { messages } from '@/db/schema';
import { getDb } from '@/lib/db';
import { MessagesInbox } from './MessagesInbox';

export default async function MessagesPage() {
  let rows = null;
  try {
    const db = await getDb();
    rows = await db.select().from(messages).orderBy(desc(messages.id)).all();
  } catch {
    rows = null;
  }

  return (
    <div>
      <span className="kicker">Formulario de contacto</span>
      <h1>Mensajes</h1>
      <p className="lead">Todo lo que llega desde /contacto y /en/contact.</p>
      {rows === null ? (
        <p className="empty">
          La base de datos todavía no responde. Revisa que las migraciones estén aplicadas.
        </p>
      ) : (
        <MessagesInbox initial={rows} />
      )}
    </div>
  );
}
