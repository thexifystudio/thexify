import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { portfolio } from '@/data/portfolio';
import type { Lang } from '@/lib/i18n';
import '@/styles/sections.css';

const copy = {
  en: {
    label: 'Our work',
    title: ['Every case, in full.', 'What they needed and what we built.'],
    intro:
      'We would rather tell a few projects completely, with the context, the decisions and what we delivered, than fill a grid with logos. Each card says where the project stands.',
    view: 'Explore project',
    live: 'Live',
    building: 'In development',
  },
  es: {
    label: 'Nuestros proyectos',
    title: ['Cada caso, completo.', 'Qué necesitaban y qué construimos.'],
    intro:
      'Preferimos contar pocos proyectos enteros, con el contexto, las decisiones y lo que entregamos, antes que llenar una grilla de logos. Cada tarjeta dice en qué punto está.',
    view: 'Ver proyecto',
    live: 'En línea',
    building: 'En desarrollo',
  },
} as const;

/** Published cases, shared by the homepage and the websites page. */
export function Projects({ lang, kicker }: { lang: Lang; kicker?: string }) {
  const t = copy[lang];
  return (
    <section id="proyectos" className="portfolio-section section-pad" aria-labelledby="portfolio-title">
      <div className="commercial-heading" data-reveal>
        {kicker && <span className="section-kicker">{`${kicker} / ${t.label}`}</span>}
        <h2 id="portfolio-title">
          {t.title[0]}
          <br />
          <span>{t.title[1]}</span>
        </h2>
        <p>{t.intro}</p>
      </div>
      <div className="portfolio-grid">
        {portfolio.slice(0, 6).map((project) => (
          <article key={project.slug} className="portfolio-card" data-reveal>
            <Link
              className={`portfolio-image portfolio-image--${project.slug}`}
              href={project.href[lang]}
              aria-label={`${t.view}: ${project.name}`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt[lang]}
                sizes="(max-width: 900px) 100vw, 50vw"
                quality={80}
              />
              <span aria-hidden="true">
                <Arrow />
              </span>
            </Link>
            <div className="portfolio-meta">
              <p className="section-kicker">{project.category[lang]}</p>
              <span className={`portfolio-status${project.live ? ' portfolio-status--live' : ''}`}>
                {project.live ? t.live : t.building}
              </span>
            </div>
            <h3>{project.name}</h3>
            <p className="portfolio-summary">{project.summary[lang]}</p>
            <Link className="action-button action-button--outline" href={project.href[lang]}>
              {t.view}
              <Arrow />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
