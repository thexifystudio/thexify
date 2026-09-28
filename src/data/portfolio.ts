import type { StaticImageData } from 'next/image';
import cananguenoDesktop from '../assets/canangueno-desktop.webp';
import sunsuDesktop from '../assets/sunsu-desktop.webp';
import { projects } from './projects';

export interface PortfolioEntry {
  slug: string;
  name: string;
  category: { es: string; en: string };
  /** Titular del caso. Sale de `projects.ts` para que no puedan contradecirse. */
  summary: { es: string; en: string };
  /** `true` cuando la ficha declara una URL pública: el caso está en línea. */
  live: boolean;
  image: StaticImageData;
  imageAlt: { es: string; en: string };
  href: { es: string; en: string };
}

/**
 * El texto y el estado de cada caso viven en `projects.ts`. La tarjeta del home
 * los lee de ahí en vez de repetirlos, así la grilla y la ficha no se
 * desincronizan. Si el slug no existe, el build falla en vez de publicar una
 * tarjeta a medias.
 */
function detail(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`No hay ficha de proyecto para el slug "${slug}".`);
  return { summary: project.summary, live: Boolean(project.url) };
}

export const portfolio: PortfolioEntry[] = [
  {
    slug: 'canangueno-lodge',
    name: 'Canangueno Lodge',
    category: {
      es: 'Turismo · Cuyabeno, Ecuador',
      en: 'Travel · Cuyabeno, Ecuador',
    },
    ...detail('canangueno-lodge'),
    image: cananguenoDesktop,
    imageAlt: {
      es: 'Interfaz de la web de Canangueno Lodge diseñada por Thexify',
      en: 'Canangueno Lodge website interface designed by Thexify',
    },
    href: {
      es: '/proyectos/canangueno-lodge/',
      en: '/en/work/canangueno-lodge/',
    },
  },
  {
    slug: 'sunsu-cleaning',
    name: 'SUNSU Cleaning',
    category: {
      es: 'Servicios · Quito, Ecuador',
      en: 'Services · Quito, Ecuador',
    },
    ...detail('sunsu-cleaning'),
    image: sunsuDesktop,
    imageAlt: {
      es: 'Interfaz de la web de SUNSU Cleaning diseñada por Thexify',
      en: 'SUNSU Cleaning website interface designed by Thexify',
    },
    href: {
      es: '/proyectos/sunsu-cleaning/',
      en: '/en/work/sunsu-cleaning/',
    },
  },
];
