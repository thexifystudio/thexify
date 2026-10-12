import Link from 'next/link';
import { SiteFrame } from '@/components/SiteFrame';
import { paths, type Lang } from '@/lib/i18n';
import '@/styles/not-found.css';

/** 404 in the visitor's language, with a way into the other one. */
export function NotFound({ lang = 'en' }: { lang?: Lang }) {
  const en = lang === 'en';
  const other: Lang = en ? 'es' : 'en';
  return (
    <SiteFrame lang={lang}>
      <section className="not-found">
        <p className="eyebrow">404 / {en ? 'Off the map' : 'Fuera del mapa'}</p>
        <h1>
          {en ? 'This page' : 'Esta página'}
          <br />
          <span>{en ? 'doesn’t exist.' : 'no existe.'}</span>
        </h1>
        <p className="not-found-en">
          {en
            ? 'The link may be old or mistyped. The rest of Thexify is right where it should be.'
            : 'Puede que el enlace sea antiguo o tenga un error. El resto de Thexify sigue en su lugar.'}
        </p>
        <div className="not-found-actions">
          <Link className="pill-link pill-link--green" href={paths.home(lang)}>
            {en ? 'Back to home' : 'Volver al inicio'} <span aria-hidden="true">↗</span>
          </Link>
          <Link className="pill-link" href={paths.home(other)} lang={other}>
            {en ? 'Ver el sitio en español' : 'Go to the English site'} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </SiteFrame>
  );
}
