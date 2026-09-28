'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraphicIcon } from '@/components/GraphicIcon';
import { Mark } from '@/components/Mark';

// Add a section here when the panel grows (proyectos, precios, ...).
const sections = [
  { href: '/admin/', label: 'Resumen', icon: 'grid' },
  { href: '/admin/mensajes/', label: 'Mensajes', icon: 'inbox' },
];

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout/', { method: 'POST' });
    router.replace('/login/');
    router.refresh();
  }

  return (
    <div className="panel admin">
      <aside className="admin-sidebar">
        <div>
          <Link className="brand" href="/admin/">
            <Mark />
            <span>thexify</span>
          </Link>
          <nav className="admin-nav" aria-label="Panel">
            {sections.map((section) => {
              const current =
                section.href === '/admin/' ? pathname === '/admin/' : pathname.startsWith(section.href);
              return (
                <Link key={section.href} href={section.href} aria-current={current ? 'page' : undefined}>
                  <GraphicIcon name={section.icon} />
                  {section.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="admin-foot">
          <a href="/" target="_blank" rel="noopener noreferrer">
            Ver el sitio <span aria-hidden="true">↗</span>
          </a>
          <span className="email" title={email}>
            {email}
          </span>
          <button type="button" onClick={logout}>
            <GraphicIcon name="logout" />
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
