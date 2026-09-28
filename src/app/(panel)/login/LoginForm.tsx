'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/** Only same-site paths inside /admin, so ?next= cannot redirect anywhere else. */
function safeDestination(value: string | null) {
  return value && value.startsWith('/admin') && !value.startsWith('//') ? value : '/admin/';
}

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setError(body?.error ?? 'No se pudo iniciar sesión');
        return;
      }
      router.replace(safeDestination(new URLSearchParams(window.location.search).get('next')));
      router.refresh();
    } catch {
      setError('No se pudo conectar. Revisa tu conexión.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Correo</span>
        <input name="email" type="email" required autoComplete="username" maxLength={160} />
      </label>
      <label className="field">
        <span>Contraseña</span>
        <input name="password" type="password" required autoComplete="current-password" maxLength={200} />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={loading}>
        {loading ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
