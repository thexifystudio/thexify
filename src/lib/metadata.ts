import type { Metadata, Viewport } from 'next';
import type { StaticImageData } from 'next/image';
import type { Project } from '@/data/projects';
import { site } from '@/data/site';
import type { Lang } from '@/lib/i18n';

const defaultDescription =
  'Diseño y desarrollo web en Quito para negocios que quieren dar el siguiente paso. Sitios web, plataformas con panel y tiendas Shopify. Desde Quito, para el mundo.';

export const siteViewport: Viewport = { themeColor: '#101110' };

const ORGANIZATION_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

interface PageMeta {
  title: string;
  description?: string;
  lang?: Lang;
  /** Path of this page, with trailing slash. */
  path: string;
  /** Same page in the other language. */
  alternatePath?: string;
  /** Share image; defaults to the brand card /og.png. */
  image?: { url: string; width: number; height: number; alt: string };
  errorPage?: boolean;
}

/** Canonical, hreflang, Open Graph, Twitter and icons for a public page. */
export function pageMetadata({
  title,
  description = defaultDescription,
  lang = 'es',
  path,
  alternatePath = lang === 'es' ? '/en/' : '/',
  image,
  errorPage = false,
}: PageMeta): Metadata {
  const en = lang === 'en';
  const esPath = en ? alternatePath : path;
  const enPath = en ? path : alternatePath;
  const shareImage = image ?? {
    url: '/og.png',
    width: 1200,
    height: 630,
    alt: en
      ? 'Thexify — Thoughtfully designed. Precisely built.'
      : 'Thexify — Diseño con intención. Código con precisión.',
  };

  return {
    metadataBase: new URL(site.url),
    title: { absolute: title },
    description,
    applicationName: site.name,
    robots: errorPage ? { index: false, follow: true } : { index: true, follow: true, 'max-image-preview': 'large' },
    alternates: errorPage
      ? undefined
      : { canonical: path, languages: { es: esPath, en: enPath, 'x-default': esPath } },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
      other: [{ rel: 'mask-icon', url: '/brand/mask-icon.svg', color: '#101110' }],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: site.name,
      url: path,
      locale: en ? 'en_US' : 'es_EC',
      alternateLocale: en ? ['es_EC'] : ['en_US'],
      images: [shareImage],
    },
    twitter: { card: 'summary_large_image', title, description, images: [shareImage.url] },
  };
}

/** Share image built from a project capture. */
export function projectImage(image: StaticImageData, alt: string) {
  return { url: image.src, width: image.width, height: image.height, alt };
}

/** Serialize JSON-LD so no string inside can close the <script> tag. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const absolute = (path: string) => new URL(path, site.url).toString();

/** Studio + website, present on every public page. */
export function siteSchema(lang: Lang) {
  const en = lang === 'en';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ORGANIZATION_ID,
        name: site.name,
        url: site.url,
        logo: absolute('/icon-512.png'),
        image: absolute('/og.png'),
        description: en
          ? 'Independent web design and development studio in Quito, Ecuador. Websites, admin platforms and Shopify stores for businesses.'
          : 'Estudio independiente de diseño y desarrollo web en Quito, Ecuador. Sitios web, plataformas con panel y tiendas Shopify para negocios.',
        email: site.email,
        areaServed: ['Ecuador', 'Latin America', 'United States'],
        address: { '@type': 'PostalAddress', addressLocality: 'Quito', addressCountry: 'EC' },
        knowsLanguage: ['es', 'en'],
        serviceType: en
          ? ['Web design', 'Web development', 'Shopify stores']
          : ['Diseño web', 'Desarrollo web', 'Tiendas Shopify'],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: site.email,
          url: absolute(en ? '/en/contact/' : '/contacto/'),
          availableLanguage: ['es', 'en'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: site.name,
        url: site.url,
        inLanguage: ['es', 'en'],
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };
}

/** Case page: the project as a creative work, plus its breadcrumb trail. */
export function projectSchema(project: Project, lang: Lang, path: string) {
  const en = lang === 'en';
  const url = absolute(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: project.title,
        headline: project.summary[lang],
        description: project.intro[lang],
        url,
        image: absolute(project.image.src),
        genre: project.sector[lang],
        inLanguage: lang,
        creator: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': WEBSITE_ID },
        ...(project.url ? { sameAs: project.url } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: en ? 'Home' : 'Inicio', item: absolute(en ? '/en/' : '/') },
          { '@type': 'ListItem', position: 2, name: project.title, item: url },
        ],
      },
    ],
  };
}
