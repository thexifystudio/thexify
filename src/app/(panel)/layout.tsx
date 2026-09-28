import type { Metadata } from 'next';
import { manrope } from '@/lib/fonts';
import { siteViewport } from '@/lib/metadata';
import '@/styles/global.css';
import '@/styles/admin.css';

/*
 * Root layout of the private area (/login, /admin). Separate from the site's
 * layouts: the panel is an internal tool, always in Spanish, never indexed.
 */
export const metadata: Metadata = {
  title: 'Panel · Thexify',
  robots: { index: false, follow: false },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
};

export const viewport = siteViewport;

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
