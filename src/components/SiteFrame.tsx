import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { BrandSymbol } from '@/components/BrandSymbol';
import { Icon } from '@/components/Icon';
import { site } from '@/data/site';
import { paths, type Lang } from '@/lib/i18n';

interface Props {
  lang?: Lang;
  /** Same page in the other language (language switch). */
  alternatePath?: string;
  /** Marks the matching navigation entry as the current page. */
  current?: 'webs' | 'contact';
  children: React.ReactNode;
}

/**
 * Header, main and footer of the public site (the body of the old Astro Layout).
 * Rendered by each page, not by the layout, because only the page knows its
 * alternate-language URL.
 */
export function SiteFrame({ lang = 'en', alternatePath, current, children }: Props) {
  const en = lang === 'en';
  const home = paths.home(lang);
  const contact = paths.contact(lang);
  const webs = paths.webs(lang);
  // Websites are a second line of business: linked from the footer, not the header.
  const nav = [
    { href: `${home}#solutions`, label: en ? 'What we build' : 'Qué construimos' },
    { href: `${home}#about`, label: en ? 'About us' : 'Nosotros' },
    { href: `${home}#process`, label: en ? 'Process' : 'Proceso' },
    { href: `${home}#faq`, label: 'FAQ' },
  ];
  const alternate = alternatePath ?? paths.home(en ? 'es' : 'en');

  return (
    <>
      <a className="skip-link" href="#main">
        {en ? 'Skip to content' : 'Saltar al contenido'}
      </a>
      <header className="site-header">
        <Link className="brand" href={home} aria-label={en ? 'Thexify, home' : 'Thexify, inicio'}>
          <BrandSymbol />
          <span>Thexify</span>
        </Link>
        <nav className="desktop-nav" aria-label={en ? 'Main navigation' : 'Navegación principal'}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="language-switch"
            href={alternate}
            lang={en ? 'es' : 'en'}
            aria-label={en ? 'Cambiar a español' : 'Switch to English'}
          >
            <Icon name="globe" />
            {en ? 'ES' : 'EN'}
          </Link>
          <Link className="header-cta" href={contact} aria-current={current === 'contact' ? 'page' : undefined}>
            {en ? 'Contact us' : 'Contáctanos'}
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
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href={contact}>
            {en ? 'Contact us' : 'Contáctanos'} <Arrow />
          </Link>
          <span className="eyebrow">Quito, Ecuador · {en ? 'Working everywhere' : 'Sin fronteras'}</span>
        </nav>
      </header>
      <noscript>
        <nav className="no-script-nav" aria-label={en ? 'Section navigation' : 'Navegación por secciones'}>
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <style>{'.menu-toggle{display:none !important}'}</style>
      </noscript>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link className="brand" href={home}>
            <BrandSymbol />
            <span>Thexify</span>
          </Link>
          <p>
            {en
              ? 'A startup building AI-powered software with Claude.'
              : 'Una startup que construye software con IA usando Claude.'}
          </p>
          <Link className="text-link" href={contact}>
            {en ? 'Start a conversation' : 'Empecemos a hablar'} <Arrow />
          </Link>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Thexify</span>
          <span>Quito, Ecuador · {en ? 'Working everywhere' : 'Creamos sin fronteras'}</span>
          <Link href={webs} aria-current={current === 'webs' ? 'page' : undefined}>
            {en ? 'Websites' : 'Webs'}
          </Link>
          <Link href={paths.privacy(lang)}>{en ? 'Privacy policy' : 'Política de privacidad'}</Link>
          <a href={`mailto:${site.email}`}>
            {site.email} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </>
  );
}
