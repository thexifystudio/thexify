import type { ImageMetadata } from 'astro';
import cananguenoDesktop from '../assets/canangueno-desktop.webp';
import cananguenoMobile from '../assets/canangueno-mobile.webp';
import sunsuDesktop from '../assets/sunsu-desktop.webp';

export type Language = 'es' | 'en';
type Localized<T = string> = Record<Language, T>;

export interface Project {
  slug: string;
  title: string;
  client: string;
  sector: Localized;
  summary: Localized;
  image: ImageMetadata;
  mobileImage?: ImageMetadata;
  status: Localized;
  url?: string;
  intro: Localized;
  context: Localized;
  solution: Localized;
  deliverables: Localized<string[]>;
}

export const projects: Project[] = [
  {
    slug: 'canangueno-lodge',
    title: 'Canangueno Lodge',
    client: 'Canangueno Lodge',
    sector: { es: 'Turismo · Cuyabeno, Ecuador', en: 'Travel · Cuyabeno, Ecuador' },
    summary: {
      es: 'La Amazonía, desde el primer scroll.',
      en: 'The Amazon, from the very first scroll.',
    },
    image: cananguenoDesktop,
    mobileImage: cananguenoMobile,
    status: { es: 'En desarrollo', en: 'In development' },
    intro: {
      es: 'Una ventana al Cuyabeno. Una experiencia digital que acerca el lodge, sus recorridos y la vida en la Amazonía a futuros viajeros.',
      en: 'A window into Cuyabeno. A digital experience that brings the lodge, its adventures and life in the Amazon closer to future guests.',
    },
    context: {
      es: 'Elegir un viaje a la Amazonía empieza mucho antes de llegar. El sitio necesita transmitir el lugar y ayudar a entender la experiencia: cómo es el lodge, qué incluye cada tour y cómo dar el siguiente paso.',
      en: 'An Amazon adventure starts long before arrival. The website needs to capture the place and make the experience easy to understand: the lodge, what each tour includes and how to take the next step.',
    },
    solution: {
      es: 'Un rediseño bilingüe que da protagonismo a la fotografía y organiza tours, itinerarios y galería en una navegación clara. El contacto acompaña al viajero durante el recorrido, también desde el móvil.',
      en: 'A bilingual redesign led by photography, with a clear journey through tours, itineraries and the gallery. Contact is easy to find throughout the experience, on desktop and mobile alike.',
    },
    deliverables: {
      es: [
        'Dirección visual y diseño web',
        'Experiencia en español e inglés',
        'Tours e itinerarios',
        'Galería del destino',
        'Diseño responsive',
        'Canales de contacto',
      ],
      en: [
        'Art direction and web design',
        'Spanish and English experience',
        'Tours and itineraries',
        'Destination gallery',
        'Responsive design',
        'Contact touchpoints',
      ],
    },
  },
  {
    slug: 'sunsu-cleaning',
    title: 'SUNSU Cleaning',
    client: 'SUNSU Cleaning Services',
    sector: { es: 'Servicios · Quito, Ecuador', en: 'Services · Quito, Ecuador' },
    summary: {
      es: 'Una presencia tan clara como su servicio.',
      en: 'A presence as clear as the service itself.',
    },
    image: sunsuDesktop,
    status: { es: 'Sitio web', en: 'Website' },
    url: 'https://sunsucleaningservices.com',
    intro: {
      es: 'Una presencia digital para un servicio cotidiano que depende de la confianza. Clara, cercana y preparada para que el cliente encuentre lo que necesita.',
      en: 'A digital home for an everyday service built on trust. Clear, approachable and designed to help customers find exactly what they need.',
    },
    context: {
      es: 'Para una empresa de limpieza en Quito, la web debe responder preguntas concretas: qué servicios ofrece, dónde trabaja y cómo contactar. La información necesita ser fácil de consultar, especialmente desde el teléfono.',
      en: 'For a cleaning company in Quito, the website has practical questions to answer: what services are available, where the team works and how to get in touch. That information needs to be easy to find, especially on a phone.',
    },
    solution: {
      es: 'Una web desarrollada con Astro que presenta los servicios con una jerarquía sencilla y rutas de contacto visibles. La estructura del contenido ayuda a los buscadores a entender los servicios y la zona de atención del negocio.',
      en: 'An Astro website with a straightforward service structure and clear paths to contact. Its content helps search engines understand the services on offer and the area the business serves.',
    },
    deliverables: {
      es: [
        'Diseño y desarrollo web',
        'Presentación de servicios',
        'Estructura SEO local',
        'Diseño responsive',
        'Optimización de recursos',
        'Accesos directos de contacto',
      ],
      en: [
        'Web design and development',
        'Service presentation',
        'Local SEO structure',
        'Responsive design',
        'Asset optimization',
        'Direct contact links',
      ],
    },
  },
];
