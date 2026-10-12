import { desc } from 'drizzle-orm';
import { messages } from '@/db/schema';
import { getDb } from '@/lib/db';
import { MessagesInbox } from './MessagesInbox';

export default async function MessagesPage() {
  let rows = null;
  try {
    const db = await getDb();
    rows = await db.select().from(messages).orderBy(desc(messages.id)).all();
  } catch (error) {
    console.error(
      JSON.stringify({
        event: 'admin_messages_load_failed',
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    rows = null;
  }

  return (
    <div>
      <span className="kicker">Formulario de contacto</span>
      <h1>Mensajes</h1>
      <p className="lead">Todo lo que llega desde /contact y /es/contacto.</p>
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
