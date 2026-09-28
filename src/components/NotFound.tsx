import Link from 'next/link';
import { SiteFrame } from '@/components/SiteFrame';
import type { Lang } from '@/lib/i18n';
import '@/styles/not-found.css';

/** Bilingual 404, same content as the Astro 404 page. */
export function NotFound({ lang = 'es' }: { lang?: Lang }) {
  return (
    <SiteFrame lang={lang}>
      <section className="not-found">
        <p className="eyebrow">404 / FUERA DEL MAPA · OFF THE MAP</p>
        <h1>
          Esta página
          <br />
          <span>no existe.</span>
        </h1>
        <p className="not-found-en" lang="en">
          This page doesn’t exist, but the rest of Thexify is right where it should be.
        </p>
        <div className="not-found-actions">
          <Link className="pill-link pill-link--green" href="/">
            Volver al inicio <span aria-hidden="true">↗</span>
          </Link>
          <Link className="pill-link" href="/en/" lang="en">
            Go to English site <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
