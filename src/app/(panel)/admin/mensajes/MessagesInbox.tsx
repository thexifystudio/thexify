'use client';

import { useState } from 'react';
import { GraphicIcon } from '@/components/GraphicIcon';
import type { Message } from '@/db/schema';
import { formatDate } from '@/lib/format';

const filters = [
  { id: 'todos', label: 'Todos' },
  { id: 'nuevo', label: 'Sin leer' },
  { id: 'leido', label: 'Leídos' },
  { id: 'archivado', label: 'Archivados' },
] as const;

type Filter = (typeof filters)[number]['id'];
type Status = 'nuevo' | 'leido' | 'archivado';

export function MessagesInbox({ initial }: { initial: Message[] }) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<Filter>('todos');
  const [error, setError] = useState<string | null>(null);

  async function setStatus(id: number, status: Status) {
    const previous = items;
    setError(null);
    setItems((list) => list.map((item) => (item.id === id ? { ...item, status } : item)));
    const response = await fetch(`/api/mensajes/${id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    if (!response?.ok) {
      setItems(previous);
      setError('No se pudo actualizar el mensaje.');
    }
  }

  async function remove(id: number) {
    if (!window.confirm('¿Borrar este mensaje? No se puede deshacer.')) return;
    const previous = items;
    setError(null);
    setItems((list) => list.filter((item) => item.id !== id));
    const response = await fetch(`/api/mensajes/${id}/`, { method: 'DELETE' }).catch(() => null);
    if (!response?.ok) {
      setItems(previous);
      setError('No se pudo borrar el mensaje.');
    }
  }

  const visible = filter === 'todos' ? items : items.filter((item) => item.status === filter);

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrar mensajes">
        {filters.map((option) => {
          const count =
            option.id === 'todos' ? items.length : items.filter((item) => item.status === option.id).length;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => setFilter(option.id)}
            >
              {option.label} ({count})
            </button>
          );
        })}
      </div>

      {error && (
        <p className="form-error inbox-error" role="alert">
          {error}
        </p>
      )}

      {visible.length === 0 ? (
        <p className="empty">No hay mensajes en esta categoría.</p>
      ) : (
        <ul className="message-list">
          {visible.map((item) => (
            <li key={item.id} className="message" data-status={item.status}>
              <div className="message-head">
                <div>
                  <h2>
                    {item.name}
                    {item.status === 'nuevo' && <span className="badge">Nuevo</span>}
                  </h2>
                  {item.business && <p className="message-business">{item.business}</p>}
                </div>
                <div className="message-actions">
                  {item.status !== 'leido' && item.status !== 'archivado' && (
                    <button
                      className="icon-button"
                      type="button"
                      title="Marcar como leído"
                      aria-label="Marcar como leído"
                      onClick={() => setStatus(item.id, 'leido')}
                    >
                      <GraphicIcon name="check" />
                    </button>
                  )}
                  {item.status !== 'archivado' ? (
                    <button
                      className="icon-button"
                      type="button"
                      title="Archivar"
                      aria-label="Archivar"
                      onClick={() => setStatus(item.id, 'archivado')}
                    >
                      <GraphicIcon name="archive" />
                    </button>
                  ) : (
                    <button
                      className="icon-button"
                      type="button"
                      title="Desarchivar"
                      aria-label="Desarchivar"
                      onClick={() => setStatus(item.id, 'leido')}
                    >
                      <GraphicIcon name="undo" />
                    </button>
                  )}
                  <button
                    className="icon-button"
                    type="button"
                    title="Borrar"
                    aria-label="Borrar"
                    data-danger
                    onClick={() => remove(item.id)}
                  >
                    <GraphicIcon name="trash" />
                  </button>
                </div>
              </div>
              <p className="message-body">{item.message}</p>
              <div className="message-meta">
                <a href={`mailto:${item.email}`}>{item.email}</a>
                {item.phone && <span>{item.phone}</span>}
                {item.projectType && <span>Servicio: {item.projectType}</span>}
                <span>{formatDate(item.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
