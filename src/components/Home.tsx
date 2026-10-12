import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { Commitments } from '@/components/Commitments';
import { Icon, type IconName } from '@/components/Icon';
import { Projects } from '@/components/Projects';
import { AssistantCard, AutomationCard, MiniChat, MiniDashboard, OrdersCard } from '@/components/home/DemoUI';
import beams from '@/assets/home/beams.webp';
import cananguenoMobile from '@/assets/canangueno-mobile.webp';
import { site } from '@/data/site';
import { paths, type Lang } from '@/lib/i18n';
import '@/styles/sections.css';
import '@/styles/home.css';

const copy = {
  es: {
    title: ['Software', 'con IA para', 'tu negocio.'],
    lede: 'Diseñamos y construimos productos SaaS, plataformas web y soluciones con inteligencia artificial. De la idea al lanzamiento, rápido y bien hecho.',
    cta: 'Cuéntanos tu idea',
    seeSolutions: 'Ver soluciones',
    builtWith: 'Construido con Claude de Anthropic',
    visual:
      'Ejemplos de lo que construimos: un panel de pedidos, una automatización que registra clientes y envía avisos, y un asistente con Claude que responde a un cliente.',
    solutionsTitle: ['Lo que construimos.', 'Software a la medida de tu negocio.'],
    solutionsIntro:
      'Productos y sistemas hechos para tu operación, con inteligencia artificial donde de verdad ahorra tiempo.',
    tiles: {
      saas: {
        name: 'Productos SaaS y plataformas',
        text: 'Productos web con usuarios, panel de gestión y la lógica de tu negocio.',
        cta: 'Cotizar mi plataforma',
      },
      ai: {
        name: 'Soluciones con IA',
        text: 'Chatbots, automatizaciones y asistentes con Claude de Anthropic.',
        cta: 'Cotizar una solución con IA',
      },
      web: {
        name: 'Webs y tiendas',
        text: 'Webs, landings y tiendas Shopify para presentar y vender.',
        cta: 'Ver webs',
        caption: 'Canangueno Lodge · en desarrollo',
      },
    },
    paths: [
      {
        icon: 'briefcase',
        title: '¿Tu negocio ya está en marcha?',
        text: 'Ordenamos tu operación con un sistema propio, automatizaciones e IA conectados a cómo ya trabajas.',
        cta: 'Hablemos de tu operación',
        service: 'ai',
      },
      {
        icon: 'rocket',
        title: '¿Vas a lanzar un producto?',
        text: 'Diseñamos y construimos tu producto SaaS, del primer prototipo al lanzamiento, sobre una base que puede crecer.',
        cta: 'Hablemos de tu producto',
        service: 'software',
      },
    ],
    studio: {
      title: 'Somos Thexify',
      subtitle: 'Un estudio moderno que construye con IA.',
      text: 'Usamos inteligencia artificial, principalmente Claude de Anthropic, en cada etapa del proyecto: para investigar, escribir y revisar código y probar tu web antes de publicarla. Así entregamos más rápido y dedicamos más tiempo a entender tu negocio.',
      note: 'La IA acelera el trabajo. El diseño, el contenido y la calidad final los decidimos y revisamos nosotros.',
      flowTitle: 'Así trabajamos con Claude',
      stages: [
        ['search', 'Investigar'],
        ['code', 'Escribir código'],
        ['check', 'Revisar código'],
        ['flask', 'Probar antes de publicar'],
      ],
      final: 'Diseño, contenido y calidad final',
      team: 'Equipo Thexify',
    },
    processTitle: ['Cuatro pasos.', 'Terminamos cuando funciona.'],
    processIntro:
      'Empezamos por entender tu negocio y no cerramos al publicar: te acompañamos hasta que el sistema funciona en tu día a día.',
    steps: [
      [
        'Media hora de conversación',
        'Tu negocio, tu idea y el problema que tiene que resolver.',
        'Un diagnóstico honesto de qué necesitas',
        'Media hora de tu tiempo',
      ],
      [
        'Una propuesta cerrada',
        'Funciones, precio y fecha, por escrito. Nada arranca antes de que la apruebes.',
        'Alcance, precio y fecha por escrito',
        'Leerla y decidir',
      ],
      [
        'Diseño y construcción',
        'Avances que puedes probar desde el principio, con la información real de tu negocio.',
        'Un enlace privado para probar el avance',
        'Tu información y tus comentarios',
      ],
      [
        'Lanzamiento y acompañamiento',
        'Publicamos, te enseñamos a usarlo y ajustamos lo que haga falta.',
        'Tu sistema en marcha y los accesos a tu nombre',
        'Usarlo y decirnos qué ajustar',
      ],
    ],
    deliverable: 'Lo que recibes',
    clientTask: 'De tu lado',
    faqTitle: 'Respuestas que te ayudan.',
    faqs: [
      [
        '¿Cuánto cuesta un proyecto de software?',
        'Depende del alcance: usuarios, funciones e integraciones. Antes de empezar recibes una propuesta cerrada con alcance, precio y fechas.',
      ],
      ['¿De quién es el código?', 'Tuyo. El código, los datos, el dominio y las cuentas quedan a tu nombre.'],
      [
        '¿Qué IA usan y qué pasa con mis datos?',
        'Usamos principalmente Claude de Anthropic. La información de tu negocio solo se usa para tu proyecto. Las soluciones que construimos usan la API de Claude y, según los términos comerciales de Anthropic, lo que se envía por la API no se usa para entrenar sus modelos.',
      ],
      [
        '¿Pueden sumar IA a lo que ya uso?',
        'Sí, cuando tus herramientas permiten integrarse: formularios, correo, hojas de cálculo, tu web o tu sistema actual. Lo revisamos en la primera conversación.',
      ],
      [
        '¿También hacen páginas web?',
        'Sí. Webs, landings y tiendas Shopify tienen su propia página, con todo lo que incluyen.',
      ],
    ],
    faqWebs: 'Ver webs y tiendas',
    ctaTitle: ['¿Qué quieres', 'construir ahora?'],
    ctaText: 'Cuéntanos sobre tu negocio o tu producto. Te ayudamos a definir el siguiente paso.',
    ctaButton: 'Cuéntanos tu proyecto',
    email: 'Escribir por correo',
  },
  en: {
    title: ['AI-powered', 'software for', 'your business.'],
    lede: 'We design and build SaaS products, web platforms and AI solutions. From idea to launch, fast and done right.',
    cta: 'Tell us your idea',
    seeSolutions: 'See solutions',
    builtWith: 'Built with Claude by Anthropic',
    visual:
      'Examples of what we build: an orders dashboard, an automation that records new customers and sends notifications, and a Claude assistant answering a customer.',
    solutionsTitle: ['What we build.', 'Software shaped around your business.'],
    solutionsIntro: 'Products and systems made for the way you work, with AI where it genuinely saves time.',
    tiles: {
      saas: {
        name: 'SaaS products and platforms',
        text: 'Web products with users, an admin panel and your business logic.',
        cta: 'Discuss my platform',
      },
      ai: {
        name: 'AI solutions',
        text: 'Chatbots, automations and assistants built on Claude by Anthropic.',
        cta: 'Discuss an AI solution',
      },
      web: {
        name: 'Websites and stores',
        text: 'Websites, landing pages and Shopify stores to present and sell.',
        cta: 'See websites',
        caption: 'Canangueno Lodge · in development',
      },
    },
    paths: [
      {
        icon: 'briefcase',
        title: 'Already running a business?',
        text: 'We organize your operation with your own system, automations and AI connected to how you already work.',
        cta: 'Talk about your operation',
        service: 'ai',
      },
      {
        icon: 'rocket',
        title: 'Launching a product?',
        text: 'We design and build your SaaS product, from the first prototype to launch, on a foundation that can grow.',
        cta: 'Talk about your product',
        service: 'software',
      },
    ],
    studio: {
      title: 'We are Thexify',
      subtitle: 'A modern studio that builds with AI.',
      text: 'We use artificial intelligence, mainly Claude by Anthropic, at every stage of a project: to research, to write and review code, and to test your website before it goes live. That lets us deliver faster and spend more time understanding your business.',
      note: 'AI speeds up the work. We decide on and review the design, the content and the final quality.',
      flowTitle: 'How we work with Claude',
      stages: [
        ['search', 'Research'],
        ['code', 'Write code'],
        ['check', 'Review code'],
        ['flask', 'Test before launch'],
      ],
      final: 'Design, content and final quality',
      team: 'Thexify team',
    },
    processTitle: ['Four steps.', 'We finish when it works.'],
    processIntro:
      'We start by understanding your business, and we do not close at launch: we stay with you until the system works in your day-to-day.',
    steps: [
      [
        'A half-hour conversation',
        'Your business, your idea and the problem it has to solve.',
        'An honest read on what you actually need',
        'Half an hour of your time',
      ],
      [
        'A closed proposal',
        'Features, price and delivery date, in writing. Nothing starts before you approve it.',
        'Scope, price and date, in writing',
        'Read it and decide',
      ],
      [
        'Design and build',
        'Progress you can try from the start, with your business’s real information.',
        'A private link to try the progress',
        'Your information and your feedback',
      ],
      [
        'Launch and support',
        'We launch it, show you how to use it and adjust what is needed.',
        'Your system running, with the accounts in your name',
        'Use it and tell us what to adjust',
      ],
    ],
    deliverable: 'What you get',
    clientTask: 'Your part',
    faqTitle: 'A few useful answers.',
    faqs: [
      [
        'How much does a software project cost?',
        'It depends on the scope: users, features and integrations. Before we start you receive a closed proposal with scope, price and dates.',
      ],
      ['Who owns the code?', 'You do. The code, data, domain and accounts are in your name.'],
      [
        'Which AI do you use, and what happens to my data?',
        'We mainly use Claude by Anthropic. Your business information is only used for your project. The solutions we build use the Claude API and, under Anthropic’s commercial terms, what is sent through the API is not used to train its models.',
      ],
      [
        'Can you add AI to the tools I already use?',
        'Yes, when your tools allow integrations: forms, email, spreadsheets, your website or your current system. We review it in the first conversation.',
      ],
      [
        'Do you also build websites?',
        'Yes. Websites, landing pages and Shopify stores have their own page, with everything they include.',
      ],
    ],
    faqWebs: 'See websites and stores',
    ctaTitle: ['What do you want', 'to build next?'],
    ctaText: 'Tell us about your business or your product. We will help you shape the next step.',
    ctaButton: 'Tell us about your project',
    email: 'Email us directly',
  },
} as const;

export function Home({ lang = 'es' }: { lang?: Lang }) {
  const t = copy[lang];
  const contact = paths.contact(lang);
  const webs = paths.webs(lang);

  return (
    <div className="home">
      <section className="hx-hero" aria-labelledby="hero-title">
        <div className="hx-copy">
          <h1 id="hero-title" className="hx-title">
            {t.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hx-lede">{t.lede}</p>
          <div className="hx-actions">
            <Link className="hx-button" href={contact}>
              {t.cta}
              <Icon name="arrowRight" />
            </Link>
            <a className="hx-link" href="#soluciones">
              {t.seeSolutions}
            </a>
          </div>
          <p className="hx-built">{t.builtWith}</p>
        </div>
        <div className="hx-visual">
          <div className="hx-beams-box">
          <Image
            className="hx-beams"
            src={beams}
            alt=""
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
            quality={80}
          />
          </div>
          <p className="sr-only">{t.visual}</p>
          <div className="hx-stack" aria-hidden="true" data-hero-stack>
            <div className="hx-stack-tilt" data-hero-tilt>
            <div className="hx-card hx-card--orders" data-hero-card>
              <OrdersCard lang={lang} />
            </div>
            <div className="hx-card hx-card--automation" data-hero-card>
              <AutomationCard lang={lang} />
            </div>
            <div className="hx-card hx-card--assistant" data-hero-card>
              <AssistantCard lang={lang} />
            </div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-sections">
        <section id="soluciones" className="hx-solutions section-pad" aria-labelledby="solutions-title">
          <div className="commercial-heading" data-reveal>
            <h2 id="solutions-title">
              {t.solutionsTitle[0]}
              <br />
              <span>{t.solutionsTitle[1]}</span>
            </h2>
            <p>{t.solutionsIntro}</p>
          </div>

          <div className="hx-bento">
            <article className="hx-tile hx-tile--saas" data-reveal>
              <div className="hx-tile-head">
                <h3>{t.tiles.saas.name}</h3>
                <p>{t.tiles.saas.text}</p>
              </div>
              <div className="hx-tile-ui" aria-hidden="true">
                <MiniDashboard lang={lang} />
              </div>
              <Link className="hx-tile-link" href={`${contact}?service=software`}>
                {t.tiles.saas.cta}
                <Icon name="arrowRight" />
              </Link>
            </article>

            <article className="hx-tile hx-tile--ai" data-reveal>
              <div className="hx-tile-head">
                <h3>{t.tiles.ai.name}</h3>
                <p>{t.tiles.ai.text}</p>
              </div>
              <div className="hx-tile-ui" aria-hidden="true">
                <MiniChat lang={lang} />
              </div>
              <Link className="hx-tile-link" href={`${contact}?service=ai`}>
                {t.tiles.ai.cta}
                <Icon name="arrowRight" />
              </Link>
            </article>

            <article className="hx-tile hx-tile--web" data-reveal>
              <div className="hx-tile-head">
                <h3>{t.tiles.web.name}</h3>
                <p>{t.tiles.web.text}</p>
              </div>
              <div className="hx-tile-phone" aria-hidden="true">
                <span className="hx-phone">
                  <Image src={cananguenoMobile} alt="" sizes="(max-width: 900px) 60vw, 16vw" quality={80} />
                </span>
                <span className="hx-phone-caption">{t.tiles.web.caption}</span>
              </div>
              <Link className="hx-tile-link" href={webs}>
                {t.tiles.web.cta}
                <Icon name="arrowRight" />
              </Link>
            </article>
          </div>

          <div className="hx-paths">
            {t.paths.map((path) => (
              <Link
                key={path.title}
                className="hx-path"
                href={`${contact}?service=${path.service}`}
                data-reveal
              >
                <span className="hx-path-icon">
                  <Icon name={path.icon as IconName} />
                </span>
                <span className="hx-path-copy">
                  <strong>{path.title}</strong>
                  <span>{path.text}</span>
                </span>
                <span className="hx-path-cta">
                  {path.cta}
                  <Icon name="arrowRight" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="estudio" className="hx-studio section-pad" aria-labelledby="studio-title">
          <div className="hx-studio-copy" data-reveal>
            <h2 id="studio-title">
              {t.studio.title}
              <br />
              <span>{t.studio.subtitle}</span>
            </h2>
            <p>{t.studio.text}</p>
            <p className="hx-studio-note">
              <span aria-hidden="true"></span>
              {t.studio.note}
            </p>
          </div>
          <div className="hx-flow" data-graphic>
            <h3 className="hx-flow-title">{t.studio.flowTitle}</h3>
            <ol>
              {t.studio.stages.map(([icon, label]) => (
                <li key={label} data-graphic-item>
                  <span className="hx-flow-icon">
                    <Icon name={icon as IconName} />
                  </span>
                  <span>{label}</span>
                  <em>
                    <Icon name="spark" />
                    Claude
                  </em>
                </li>
              ))}
              <li className="hx-flow-final" data-graphic-item>
                <span className="hx-flow-icon">
                  <Icon name="user" />
                </span>
                <span>{t.studio.final}</span>
                <em>{t.studio.team}</em>
              </li>
            </ol>
          </div>
        </section>

        <Commitments lang={lang} />

        <section id="proceso" className="roadmap-section section-pad" aria-labelledby="roadmap-title">
          <div className="commercial-heading" data-reveal>
            <h2 id="roadmap-title">
              {t.processTitle[0]}
              <br />
              <span>{t.processTitle[1]}</span>
            </h2>
            <p>{t.processIntro}</p>
          </div>
          <ol className="roadmap">
            {t.steps.map(([heading, description, result, client], i) => (
              <li key={heading} data-reveal>
                <div className="roadmap-marker">
                  <span>0{i + 1}</span>
                  <i aria-hidden="true"></i>
                </div>
                <h3>{heading}</h3>
                <p>{description}</p>
                <div className="roadmap-result">
                  <span className="section-kicker">{t.deliverable}</span>
                  <strong>{result}</strong>
                </div>
                <div className="roadmap-client">
                  <span className="section-kicker">{t.clientTask}</span>
                  <p>{client}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Projects lang={lang} />

        <section className="answers-section section-pad" aria-labelledby="answers-title">
          <div className="commercial-heading">
            <h2 id="answers-title">{t.faqTitle}</h2>
          </div>
          <div className="answers-list">
            {t.faqs.map(([question, answer], i) => (
              <details key={question} className="answer" name="questions">
                <summary>
                  <h3>{question}</h3>
                  <span className="disclosure-symbol" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>
                  {answer}
                  {i === t.faqs.length - 1 && (
                    <>
                      {' '}
                      <Link href={webs}>{t.faqWebs}</Link>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing-section section-pad hx-closing" aria-labelledby="closing-title">
          <div className="hx-closing-light" aria-hidden="true">
            <Image src={beams} alt="" fill sizes="70vw" quality={80} />
          </div>
          <div className="closing-heading">
            <h2 id="closing-title">
              {t.ctaTitle[0]}
              <br />
              <span>{t.ctaTitle[1]}</span>
            </h2>
          </div>
          <div className="closing-bottom">
            <p>{t.ctaText}</p>
            <div className="closing-actions">
              <Link className="action-button" href={contact}>
                {t.ctaButton}
                <Arrow />
              </Link>
              <a className="action-button action-button--outline" href={`mailto:${site.email}`}>
                {t.email}
                <Arrow />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
