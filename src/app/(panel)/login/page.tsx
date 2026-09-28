import type { Metadata } from 'next';
import Link from 'next/link';
import { Mark } from '@/components/Mark';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = { title: 'Acceso · Thexify' };

export default function LoginPage() {
  return (
    <main className="panel login">
      <div className="login-card">
        <Link className="login-back" href="/">
          <span aria-hidden="true">↖</span>
          Volver al sitio
        </Link>
        <span className="brand">
          <Mark />
          <span>thexify</span>
        </span>
        <h1>Acceso al panel</h1>
        <p className="lead">Área privada. Sólo para el equipo de Thexify.</p>
        <LoginForm />
      </div>
    </main>
  );
}
