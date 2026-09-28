import type { Metadata, Viewport } from 'next';
import { site } from '@/data/site';
import type { Lang } from '@/lib/i18n';

const defaultDescription =
  'Diseño y desarrollo web para negocios que quieren dar el siguiente paso. Sitios web, plataformas con panel y tiendas Shopify. Desde Quito, para el mundo.';

export const siteViewport: Viewport = { themeColor: '#101110' };

interface PageMeta {
  title: string;
  description?: string;
  lang?: Lang;
  /** Path of this page, with trailing slash. */
  path: string;
  /** Same page in the other language. */
  alternatePath?: string;
  errorPage?: boolean;
}

/** Same head tags the Astro Layout produced: canonical, hreflang, Open Graph, icons. */
export function pageMetadata({
  title,
  description = defaultDescription,
  lang = 'es',
  path,
  alternatePath = lang === 'es' ? '/en/' : '/',
  errorPage = false,
}: PageMeta): Metadata {
  const en = lang === 'en';
  const esPath = en ? alternatePath : path;
  const enPath = en ? path : alternatePath;

  return {
    metadataBase: new URL(site.url),
    title: { absolute: title },
    description,
    robots: errorPage ? { index: false, follow: true } : undefined,
    alternates: errorPage
      ? undefined
      : { canonical: path, languages: { es: esPath, en: enPath, 'x-default': esPath } },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      other: [{ rel: 'mask-icon', url: '/brand/mask-icon.svg', color: '#101110' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title,
      description,
      type: 'website',
      url: path,
      locale: en ? 'en_US' : 'es_EC',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: en
            ? 'Thexify — Thoughtfully designed. Precisely built.'
            : 'Thexify — Diseño con intención. Código con precisión.',
        },
      ],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export function organizationSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    description:
      lang === 'en'
        ? 'Independent web design and development studio in Quito, Ecuador. Websites, admin platforms and Shopify stores for businesses.'
        : 'Estudio independiente de diseño y desarrollo web en Quito, Ecuador. Sitios web, plataformas con panel y tiendas Shopify para negocios.',
    email: site.email,
    areaServed: ['Ecuador', 'Latin America', 'United States'],
    address: { '@type': 'PostalAddress', addressLocality: 'Quito', addressCountry: 'EC' },
    knowsLanguage: ['es', 'en'],
    serviceType: ['Web design', 'Web development', 'Shopify development'],
  };
}
