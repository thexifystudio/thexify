import Image from 'next/image';
import Link from 'next/link';
import { projects, type Project } from '@/data/projects';
import { paths, type Lang } from '@/lib/i18n';
import '@/styles/case.css';

export function CasePage({ project, lang = 'en' }: { project: Project; lang?: Lang }) {
  const en = lang === 'en';
  const next = projects[(projects.findIndex((entry) => entry.slug === project.slug) + 1) % projects.length];
  const workRoot = paths.work(lang);
  const contactPath = paths.contact(lang);
  const homeWorkPath = `${paths.webs(lang)}#proyectos`;

  return (
    <article className={`case-page case-${project.slug}`}>
      <header className="case-heading">
        <Link className="back-link" href={homeWorkPath}>
          <span aria-hidden="true">↖</span>
          {en ? 'Selected work' : 'Proyectos seleccionados'}
        </Link>
        <div className="case-meta">
          <span>{project.sector[lang]}</span>
          <span className="case-status">
            <i aria-hidden="true"></i>
            {project.status[lang]}
          </span>
        </div>
        <h1>
          {project.title}
          <span className="title-dot" aria-hidden="true">
            .
          </span>
        </h1>
        <div className="case-intro-row">
          <p className="case-tagline">{project.summary[lang]}</p>
          <p className="case-intro">{project.intro[lang]}</p>
        </div>
      </header>

      <figure className="case-cover" data-reveal>
        <div className="browser-frame">
          <div className="browser-bar" aria-hidden="true">
            <span className="browser-dots">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span>{project.client}</span>
            <span className="browser-symbol">↗</span>
          </div>
          <div className="cover-image">
            <Image
              src={project.image}
              alt={
                en
                  ? `${project.client} website, desktop design`
                  : `Diseño de la web de ${project.client} en escritorio`
              }
              sizes="96vw"
              quality={80}
              priority
              data-case-image
            />
          </div>
        </div>
        <figcaption>
          <span>{en ? 'Design & development / Thexify' : 'Diseño y desarrollo / Thexify'}</span>
          <span>{en ? 'Actual project interface' : 'Interfaz real del proyecto'}</span>
        </figcaption>
      </figure>

      <section className="case-story" aria-labelledby="case-context" data-reveal>
        <div className="story-label">
          <span>01 /</span>
          <h2 id="case-context">{en ? 'The starting point' : 'El punto de partida'}</h2>
        </div>
        <div className="story-copy">
          <p>{project.context[lang]}</p>
        </div>
      </section>

      <section className="case-story solution-story" aria-labelledby="case-solution" data-reveal>
        <div className="story-label">
          <span>02 /</span>
          <h2 id="case-solution">{en ? 'The approach' : 'La propuesta'}</h2>
        </div>
        <div className="story-copy">
          <p>{project.solution[lang]}</p>
        </div>
      </section>

      {project.mobileImage && (
        <section className="mobile-study" aria-labelledby="mobile-title">
          <div className="mobile-study-copy" data-reveal>
            <p className="small-label">
              {en ? 'The experience, in your hands' : 'La experiencia, en tus manos'}
            </p>
            <h2 id="mobile-title">{en ? 'Every detail.\nEvery screen.' : 'Cada detalle.\nCada pantalla.'}</h2>
            <p>
              {en
                ? 'The same sense of place, in a different format. Photography, itineraries and contact designed to travel with you.'
                : 'La misma sensación de estar ahí, en otro formato. Fotografía, itinerarios y contacto pensados para acompañarte.'}
            </p>
          </div>
          <div className="mobile-composition" data-reveal>
            <span className="mobile-orbit" aria-hidden="true"></span>
            <div className="phone-frame">
              <div className="phone-camera" aria-hidden="true"></div>
              <Image
                src={project.mobileImage}
                alt={
                  en ? `${project.client} mobile website` : `Web de ${project.client} en un teléfono móvil`
                }
                sizes="255px"
                quality={80}
              />
            </div>
            <span className="device-caption" aria-hidden="true">
              {en ? 'Made to explore' : 'Hecha para explorar'}
              <span>↗</span>
            </span>
          </div>
        </section>
      )}

      <section className="case-deliverables" aria-labelledby="case-scope" data-reveal>
        <div className="story-label">
          <span>03 /</span>
          <h2 id="case-scope">{en ? 'What we worked on' : 'Qué trabajamos'}</h2>
        </div>
        <div className="deliverables-content">
          <ul>
            {project.deliverables[lang].map((item, index) => (
              <li key={item}>
                <span className="deliverable-number">{String(index + 1).padStart(2, '0')}</span>
                <span>{item}</span>
                <span className="deliverable-check" aria-hidden="true">
                  ↗
                </span>
              </li>
            ))}
          </ul>
          {project.url ? (
            <a className="case-external-link" href={project.url} target="_blank" rel="noopener noreferrer">
              {en ? 'Visit the website' : 'Visitar el sitio web'}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">{en ? ' (opens in a new tab)' : ' (abre en una pestaña nueva)'}</span>
            </a>
          ) : (
            <p className="development-note">
              <span aria-hidden="true"></span>
              {en
                ? 'This project is in development. The screens shown document the current design.'
                : 'Este proyecto está en desarrollo. Las pantallas muestran el diseño actual.'}
            </p>
          )}
        </div>
      </section>

      <section className="case-contact" aria-labelledby="case-contact-title">
        <p>{en ? 'Your business has a story of its own.' : 'Tu negocio tiene su propia historia.'}</p>
        <Link href={contactPath}>
          <h2 id="case-contact-title">{en ? 'Let’s build yours.' : 'Construyamos la tuya.'}</h2>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <Link
        className="next-case"
        href={`${workRoot}${next.slug}/`}
        aria-label={en ? `Next project: ${next.title}` : `Siguiente proyecto: ${next.title}`}
      >
        <div className="next-case-info">
          <span className="small-label">{en ? 'Next project' : 'Siguiente proyecto'}</span>
          <span className="next-title">
            {next.title}
            <span aria-hidden="true">↗</span>
          </span>
          <span className="next-sector">{next.sector[lang]}</span>
        </div>
        <div className="next-image">
          <Image src={next.image} alt="" sizes="(max-width: 640px) 100vw, 43vw" quality={80} />
        </div>
      </Link>
    </article>
  );
}
