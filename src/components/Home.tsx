import Image from 'next/image';
import Link from 'next/link';
import { Commitments } from '@/components/Commitments';
import { ContactForm } from '@/components/ContactForm';
import { Icon, type IconName } from '@/components/Icon';
import { AssistantCard, AutomationCard, MiniChat, MiniDashboard, OrdersCard } from '@/components/home/DemoUI';
import beams from '@/assets/home/beams.webp';
import { site } from '@/data/site';
import { paths, type Lang } from '@/lib/i18n';
import '@/styles/sections.css';
import '@/styles/contact.css';
import '@/styles/home.css';

const copy = {
  es: {
    title: ['Software que', 'hace trabajo', 'real, con IA.'],
    lede: 'Thexify es una startup que construye productos SaaS, herramientas internas y asistentes con IA sobre Claude de Anthropic. Partimos de cómo trabaja tu equipo y entregamos software que usa cada día.',
    cta: 'Empezar un proyecto',
    seeSolutions: 'Ver lo que construimos',
    builtWith: 'Construido con Claude de Anthropic',
    visual:
      'Ejemplos de lo que construimos: un panel de pedidos, una automatización que registra clientes y envía avisos, y un asistente con Claude que responde a un cliente.',
    solutionsTitle: ['Lo que construimos.', 'Dos cosas, bien hechas.'],
    solutionsIntro:
      'No hacemos de todo. Construimos productos de software e inteligencia artificial que le quitan trabajo real a tu equipo.',
    tiles: {
      saas: {
        name: 'Productos SaaS y herramientas internas',
        text: 'Portales para clientes, paneles de gestión y las herramientas con las que opera tu equipo: usuarios, roles, pagos y reportes.',
        cta: 'Hablemos de tu producto',
      },
      ai: {
        name: 'Asistentes con IA y automatizaciones',
        text: 'Asistentes con Claude que atienden clientes, agendan citas, leen documentos y mueven datos entre tus herramientas.',
        cta: 'Hablemos de una solución con IA',
      },
    },
    paths: [
      {
        icon: 'briefcase',
        title: '¿Tu negocio ya está en marcha?',
        text: 'Ordenamos tu operación con un sistema propio, automatizaciones e IA conectados a cómo ya trabajas.',
        cta: 'Hablemos de tu operación',
        service: 'automation',
      },
      {
        icon: 'rocket',
        title: '¿Vas a lanzar un producto?',
        text: 'Diseñamos y construimos tu producto SaaS, del primer prototipo al lanzamiento, sobre una base que puede crecer.',
        cta: 'Hablemos de tu producto',
        service: 'software',
      },
    ],
    about: {
      title: 'Sobre Thexify',
      subtitle: 'Una startup que construye software con IA.',
      text: [
        'Thexify nació en Quito, Ecuador, en octubre de 2025. Somos un equipo pequeño y técnico con una apuesta: trabajando con Claude, pocas personas pueden diseñar, construir y lanzar software que antes necesitaba un equipo mucho más grande.',
        'Construimos productos SaaS para emprendedores, y herramientas internas y asistentes con IA para negocios que ya no dan abasto con hojas de cálculo y copiar y pegar. Claude es parte de cómo construimos y de lo que entregamos.',
      ],
      note: 'La IA acelera el trabajo. Las personas decidimos qué se construye y aprobamos cada entrega.',
      facts: [
        ['Fundada', 'Octubre de 2025'],
        ['Sede', 'Quito, Ecuador'],
        ['Construimos con', 'Claude de Anthropic'],
        ['Idiomas', 'Español e inglés'],
      ],
      flowTitle: 'Así construimos con Claude',
      stages: [
        ['search', 'Entender el problema'],
        ['code', 'Escribir el código'],
        ['check', 'Revisar cada cambio'],
        ['flask', 'Probar antes de lanzar'],
      ],
      final: 'Decisiones y calidad final',
      team: 'Equipo Thexify',
    },
    processTitle: ['Cuatro pasos.', 'Terminamos cuando funciona.'],
    processIntro:
      'Empezamos por entender tu negocio y no cerramos al lanzar: te acompañamos hasta que el sistema funciona en tu día a día.',
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
        'Lanzamos, te enseñamos a usarlo y ajustamos lo que haga falta.',
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
        'Sí, cuando tus herramientas permiten integrarse: formularios, correo, hojas de cálculo o tu sistema actual. Lo revisamos en la primera conversación.',
      ],
      [
        '¿Dónde están y con quién trabajan?',
        'En Quito, Ecuador. Trabajamos en remoto con emprendedores y negocios de Latinoamérica y Estados Unidos, en español y en inglés.',
      ],
    ],
    contactTitle: ['¿Qué quieres', 'construir ahora?'],
    contactText:
      'Cuéntanos sobre tu negocio o tu producto. Leemos cada mensaje y te respondemos con los siguientes pasos.',
    email: '¿Prefieres escribir por correo?',
  },
  en: {
    title: ['AI software', 'that does', 'real work.'],
    lede: 'Thexify is a startup building SaaS products, internal tools and AI assistants on Claude by Anthropic. We start from how your team actually works and ship software it uses every day.',
    cta: 'Start a project',
    seeSolutions: 'See what we build',
    builtWith: 'Built with Claude by Anthropic',
    visual:
      'Examples of what we build: an orders dashboard, an automation that records new customers and sends notifications, and a Claude assistant answering a customer.',
    solutionsTitle: ['What we build.', 'Two things, done properly.'],
    solutionsIntro: 'We do not do everything. We build software products and AI that take real work off your team.',
    tiles: {
      saas: {
        name: 'SaaS products and internal tools',
        text: 'Customer portals, admin panels and the tools your team runs on, with users, roles, payments and reports.',
        cta: 'Discuss a product',
      },
      ai: {
        name: 'AI assistants and automations',
        text: 'Assistants on Claude that answer customers, book appointments, read documents and move data between your tools.',
        cta: 'Discuss an AI solution',
      },
    },
    paths: [
      {
        icon: 'briefcase',
        title: 'Already running a business?',
        text: 'We organize your operation with your own system, automations and AI connected to how you already work.',
        cta: 'Talk about your operation',
        service: 'automation',
      },
      {
        icon: 'rocket',
        title: 'Launching a product?',
        text: 'We design and build your SaaS product, from the first prototype to launch, on a foundation that can grow.',
        cta: 'Talk about your product',
        service: 'software',
      },
    ],
    about: {
      title: 'About Thexify',
      subtitle: 'A startup that builds software with AI.',
      text: [
        'Thexify started in Quito, Ecuador, in October 2025. We are a small, technical team with one bet: working with Claude, a few people can now design, build and launch software that used to need a much larger team.',
        'We build SaaS products for founders, and internal tools and AI assistants for businesses that have outgrown spreadsheets and copy-paste. Claude is part of how we build and part of what we ship.',
      ],
      note: 'AI speeds up the work. People decide what gets built and sign off on every release.',
      facts: [
        ['Founded', 'October 2025'],
        ['Based in', 'Quito, Ecuador'],
        ['Built with', 'Claude by Anthropic'],
        ['Languages', 'English and Spanish'],
      ],
      flowTitle: 'How we build with Claude',
      stages: [
        ['search', 'Understand the problem'],
        ['code', 'Write the code'],
        ['check', 'Review every change'],
        ['flask', 'Test before launch'],
      ],
      final: 'Decisions and final quality',
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
        'Yes, when your tools allow integrations: forms, email, spreadsheets or your current system. We review it in the first conversation.',
      ],
      [
        'Where are you based, and who do you work with?',
        'In Quito, Ecuador. We work remotely with founders and businesses across Latin America and the United States, in English and Spanish.',
      ],
    ],
    contactTitle: ['What do you want', 'to build next?'],
    contactText: 'Tell us about your business or your product. We read every message and reply with clear next steps.',
    email: 'Prefer email?',
  },
} as const;

export function Home({ lang = 'en' }: { lang?: Lang }) {
  const t = copy[lang];
  const contact = paths.contact(lang);

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
            <a className="hx-button" href="#contact">
              {t.cta}
              <Icon name="arrowRight" />
            </a>
            <a className="hx-link" href="#solutions">
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
        <section id="solutions" className="hx-solutions section-pad" aria-labelledby="solutions-title">
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

        <section id="about" className="hx-studio section-pad" aria-labelledby="about-title">
          <div className="hx-studio-copy" data-reveal>
            <h2 id="about-title">
              {t.about.title}
              <br />
              <span>{t.about.subtitle}</span>
            </h2>
            {t.about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl className="hx-facts">
              {t.about.facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="hx-studio-note">
              <span aria-hidden="true"></span>
              {t.about.note}
            </p>
          </div>
          <div className="hx-flow" data-graphic>
            <h3 className="hx-flow-title">{t.about.flowTitle}</h3>
            <ol>
              {t.about.stages.map(([icon, label]) => (
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
                <span>{t.about.final}</span>
                <em>{t.about.team}</em>
              </li>
            </ol>
          </div>
        </section>

        <Commitments lang={lang} />

        <section id="process" className="roadmap-section section-pad" aria-labelledby="roadmap-title">
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

        <section id="faq" className="answers-section section-pad" aria-labelledby="answers-title">
          <div className="commercial-heading">
            <h2 id="answers-title">{t.faqTitle}</h2>
          </div>
          <div className="answers-list">
            {t.faqs.map(([question, answer]) => (
              <details key={question} className="answer" name="questions">
                <summary>
                  <h3>{question}</h3>
                  <span className="disclosure-symbol" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="section-pad hx-contact" aria-labelledby="contact-title">
          <div className="hx-closing-light" aria-hidden="true">
            <Image src={beams} alt="" fill sizes="70vw" quality={80} />
          </div>
          <div className="hx-contact-intro">
            <h2 id="contact-title">
              {t.contactTitle[0]}
              <br />
              <span>{t.contactTitle[1]}</span>
            </h2>
            <p>{t.contactText}</p>
            <p className="hx-contact-direct">
              {t.email} <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <ContactForm lang={lang} email={site.email} endpoint={site.contactEndpoint} />
        </section>
      </div>
    </div>
  );
}
