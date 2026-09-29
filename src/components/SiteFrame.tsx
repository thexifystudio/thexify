import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { Mark } from '@/components/Mark';
import { site, whatsappHref } from '@/data/site';
import { paths, type Lang } from '@/lib/i18n';

interface Props {
  lang?: Lang;
  /** Same page in the other language (language switch). */
  alternatePath?: string;
  children: React.ReactNode;
}

/**
 * Header, main and footer of the public site (the body of the old Astro Layout).
 * Rendered by each page, not by the layout, because only the page knows its
 * alternate-language URL.
 */
export function SiteFrame({ lang = 'es', alternatePath, children }: Props) {
  const en = lang === 'en';
  const home = paths.home(lang);
  const contact = paths.contact(lang);
  const alternate = alternatePath ?? (en ? '/' : '/en/');
  const whatsapp = whatsappHref(
    en
      ? 'Hello Thexify, I would like to discuss a project.'
      : 'Hola Thexify, quisiera conversar sobre un proyecto.',
  );

  return (
    <>
      <a className="skip-link" href="#main">
        {en ? 'Skip to content' : 'Saltar al contenido'}
      </a>
      <header className="site-header">
        <Link className="brand" href={home} aria-label={en ? 'Thexify, home' : 'Thexify, inicio'}>
          <Mark />
          <span>thexify</span>
        </Link>
        <nav className="desktop-nav" aria-label={en ? 'Main navigation' : 'Navegación principal'}>
          <Link href={`${home}#servicios`}>{en ? 'Services' : 'Servicios'}</Link>
          <Link href={`${home}#estudio`}>{en ? 'Why Thexify' : 'Por qué Thexify'}</Link>
          <Link href={`${home}#proceso`}>{en ? 'Process' : 'Proceso'}</Link>
          <Link href={`${home}#proyectos`}>{en ? 'Work' : 'Proyectos'}</Link>
        </nav>
        <div className="header-actions">
          <Link
            className="language-switch"
            href={alternate}
            lang={en ? 'es' : 'en'}
            aria-label={en ? 'Cambiar a español' : 'Switch to English'}
          >
            {en ? 'ES' : 'EN'}
          </Link>
          <Link className="header-cta" href={contact}>
            {en ? 'Let’s talk' : 'Cotizar'}
            <Arrow />
          </Link>
          <button
            className="menu-toggle"
            data-menu-toggle
            aria-controls="mobile-menu"
            aria-expanded="false"
            aria-label={en ? 'Open navigation menu' : 'Abrir menú de navegación'}
            data-open-label={en ? 'Open navigation menu' : 'Abrir menú de navegación'}
            data-close-label={en ? 'Close navigation menu' : 'Cerrar menú de navegación'}
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <nav
          id="mobile-menu"
          className="mobile-menu"
          data-menu-panel
          hidden
          aria-label={en ? 'Mobile navigation' : 'Navegación móvil'}
        >
          <Link href={`${home}#servicios`}>{en ? 'Services' : 'Servicios'}</Link>
          <Link href={`${home}#estudio`}>{en ? 'Why Thexify' : 'Por qué Thexify'}</Link>
          <Link href={`${home}#proceso`}>{en ? 'Process' : 'Proceso'}</Link>
          <Link href={`${home}#proyectos`}>{en ? 'Work' : 'Proyectos'}</Link>
          <Link href={contact}>
            {en ? 'Start a project' : 'Empezar un proyecto'} <Arrow />
          </Link>
          <span className="eyebrow">Quito, Ecuador · {en ? 'Working everywhere' : 'Sin fronteras'}</span>
        </nav>
      </header>
      <noscript>
        <nav className="no-script-nav" aria-label={en ? 'Section navigation' : 'Navegación por secciones'}>
          <a href={`${home}#proyectos`}>{en ? 'Work' : 'Proyectos'}</a>
          <a href={`${home}#estudio`}>{en ? 'Studio' : 'Estudio'}</a>
          <a href={`${home}#servicios`}>{en ? 'Services' : 'Servicios'}</a>
        </nav>
        <style>{'.menu-toggle{display:none !important}'}</style>
      </noscript>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link className="brand" href={home}>
            <Mark />
            <span>thexify</span>
          </Link>
          <p>
            {en ? 'Thoughtfully designed. Precisely built.' : 'Diseño con intención. Código con precisión.'}
          </p>
          <Link className="text-link" href={contact}>
            {en ? 'Start a conversation' : 'Empecemos a hablar'} <Arrow />
          </Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Thexify Studio</span>
          <span>Quito, Ecuador · {en ? 'Working everywhere' : 'Creamos sin fronteras'}</span>
          <a href={`mailto:${site.email}`}>
            {site.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
      {whatsapp && (
        <a
          className="whatsapp-fab"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            en
              ? 'Talk to Thexify on WhatsApp (opens in a new tab)'
              : 'Hablar con Thexify por WhatsApp (abre en una pestaña nueva)'
          }
        >
          <span aria-hidden="true">WA</span>
          <strong>{en ? 'WhatsApp' : 'Escríbenos'}</strong>
        </a>
      )}
    </>
  );
}
