import type { ImageMetadata } from 'astro';
import cananguenoDesktop from '../assets/canangueno-desktop.webp';
import sunsuDesktop from '../assets/sunsu-desktop.webp';

export interface PortfolioEntry {
  name: string;
  category: { es: string; en: string };
  image: ImageMetadata;
  imageAlt: { es: string; en: string };
  href: { es: string; en: string };
}

export const portfolio: PortfolioEntry[] = [
  {
    name: 'Canangueno Lodge',
    category: {
      es: 'Turismo · Diseño y desarrollo web',
      en: 'Travel · Web design and development',
    },
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
    name: 'SUNSU Cleaning',
    category: {
      es: 'Servicios · Web y SEO local',
      en: 'Services · Website and local SEO',
    },
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
