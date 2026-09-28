import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { messages } from '@/db/schema';
import { getDb } from '@/lib/db';
import { formatDate } from '@/lib/format';

async function loadSummary() {
  try {
    const db = await getDb();
    const all = await db.select().from(messages).orderBy(desc(messages.id)).all();
    return {
      ok: true as const,
      total: all.length,
      unread: all.filter((message) => message.status === 'nuevo').length,
      latest: all.slice(0, 5),
    };
  } catch {
    return { ok: false as const };
  }
}

export default async function AdminHome() {
  const summary = await loadSummary();

  if (!summary.ok) {
    return (
      <div className="empty">
        <h1>La base de datos todavía no responde</h1>
        <p className="lead">
          Faltan las migraciones de D1 (<code>npm run db:migrate:local</code>) o el proyecto corre sin los
          bindings de Cloudflare. Revisa el README.
        </p>
      </div>
    );
  }

  return (
    <div>
      <span className="kicker">Panel</span>
      <h1>Resumen</h1>
      <p className="lead">Lo que llega desde tu sitio, en un solo lugar.</p>

      <div className="stat-grid">
        <Link className="stat-card" href="/admin/mensajes/">
          <span className="kicker">Sin leer</span>
          <strong>{summary.unread}</strong>
          <span>mensajes nuevos del formulario de contacto</span>
        </Link>
        <Link className="stat-card" href="/admin/mensajes/">
          <span className="kicker">Total</span>
          <strong>{summary.total}</strong>
          <span>mensajes recibidos</span>
        </Link>
      </div>

      <div className="section-head">
        <h2>Últimos mensajes</h2>
        <Link href="/admin/mensajes/">Ver todos</Link>
      </div>
      {summary.latest.length === 0 ? (
        <p className="empty">Todavía no llegó ningún mensaje.</p>
      ) : (
        <ul className="message-list">
          {summary.latest.map((message) => (
            <li key={message.id} className="message" data-status={message.status}>
              <div className="message-head">
                <h3>
                  {message.name}
                  {message.status === 'nuevo' && <span className="badge">Nuevo</span>}
                </h3>
                <span className="message-business">{formatDate(message.createdAt)}</span>
              </div>
              {message.business && <p className="message-business">{message.business}</p>}
              <p className="message-body">
                {message.message.length > 220 ? `${message.message.slice(0, 220)}…` : message.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
