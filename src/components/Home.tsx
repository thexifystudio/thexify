import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { Mark } from '@/components/Mark';
import { HomeSections } from '@/components/HomeSections';
import cananguenoSmall from '@/assets/canangueno-small.webp';
import sunsuSmall from '@/assets/sunsu-small.webp';
import { paths, type Lang } from '@/lib/i18n';
import '@/styles/hero.css';

export function Home({ lang = 'es' }: { lang?: Lang }) {
  const en = lang === 'en';
  const contact = paths.contact(lang);
  const workPath = paths.work(lang);
  const t = en
    ? {
        label: 'Independent digital studio',
        location: 'Based in Quito. Built for everywhere.',
        title1: 'Make an impression.',
        title2: 'Make it digital.',
        heroCopy: 'We turn what makes your business different into a website worth remembering.',
        start: 'Tell us your idea',
        work: 'Explore our work',
        scroll: 'Scroll to discover',
        design: 'Design with intention.',
        engineering: 'Built with precision.',
        case: 'Explore project',
      }
    : {
        label: 'Estudio digital independiente',
        location: 'Desde Quito. Para donde quieras.',
        title1: 'Deja una huella.',
        title2: 'Hazla digital.',
        heroCopy: 'Convertimos lo que hace único a tu negocio en una web que vale la pena recordar.',
        start: 'Cuéntanos tu idea',
        work: 'Explorar proyectos',
        scroll: 'Hay más por descubrir',
        design: 'Diseño con intención.',
        engineering: 'Código con precisión.',
        case: 'Explorar proyecto',
      };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-eyebrow">
          <span className="eyebrow">
            <i className="status-dot"></i>
            {t.label}
          </span>
          <span className="eyebrow hero-location">{t.location}</span>
        </div>
        <h1 id="hero-title" className="hero-title">
          <span>{t.title1}</span>
          <span className="hero-title-last">
            {t.title2}
            <Mark className="hero-star" />
          </span>
        </h1>
        <div className="hero-collage">
          <div className="hero-aside">
            <p>{t.heroCopy}</p>
            <Link className="pill-link pill-link--green" href={contact}>
              {t.start}
              <Arrow />
            </Link>
          </div>
          <Link
            className="hero-shot hero-shot--one"
            href={`${workPath}canangueno-lodge/`}
            aria-label={`${t.case}: Canangueno Lodge`}
          >
            <div className="browser-chrome">
              <span className="browser-dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span>canangueno lodge</span>
              <Arrow />
            </div>
            <Image
              src={cananguenoSmall}
              alt={
                en
                  ? 'The Canangueno Lodge website designed by Thexify'
                  : 'La web de Canangueno Lodge diseñada por Thexify'
              }
              sizes="(max-width: 600px) 85vw, 48vw"
              quality={80}
              priority
            />
            <span className="shot-caption">01 / CANANGUENO LODGE</span>
          </Link>
          <Link
            className="hero-shot hero-shot--two"
            href={`${workPath}sunsu-cleaning/`}
            aria-label={`${t.case}: SUNSU Cleaning`}
          >
            <div className="browser-chrome browser-chrome--light">
              <span className="browser-dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span>sunsu cleaning</span>
              <Arrow />
            </div>
            <Image
              src={sunsuSmall}
              alt={
                en
                  ? 'The SUNSU Cleaning website designed by Thexify'
                  : 'La web de SUNSU Cleaning diseñada por Thexify'
              }
              sizes="(max-width: 600px) 55vw, 29vw"
              quality={80}
            />
            <span className="shot-caption">02 / SUNSU CLEANING</span>
          </Link>
          <span className="collage-cross" aria-hidden="true">
            +
          </span>
          <a className="hero-work-link text-link" href="#proyectos">
            {t.work}
            <Arrow />
          </a>
        </div>
        <div className="hero-wordmark" aria-hidden="true">
          thexify<span>✳</span>
        </div>
        <div className="hero-bottom eyebrow">
          <span>
            {t.design}
            <br />
            {t.engineering}
          </span>
          <a href="#enfoque">
            {t.scroll}
            <span aria-hidden="true">↓</span>
          </a>
          <span>
            EST. ECUADOR
            <br />
            DIGITAL, EVERYWHERE.
          </span>
        </div>
      </section>

      <HomeSections lang={lang} />
    </>
  );
}
