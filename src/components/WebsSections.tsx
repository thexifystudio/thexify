import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { Commitments } from '@/components/Commitments';
import { GraphicIcon } from '@/components/GraphicIcon';
import { Mark } from '@/components/Mark';
import { Projects } from '@/components/Projects';
import { ServiceVisual } from '@/components/ServiceVisual';
import { pricing, type ServiceKey } from '@/data/pricing';
import { site } from '@/data/site';
import { paths, type Lang } from '@/lib/i18n';
import '@/styles/sections.css';
import '@/styles/graphics.css';

export function WebsSections({ lang = 'es' }: { lang?: Lang }) {
  const en = lang === 'en';
  const contact = paths.contact(lang);
  const extras = en
    ? [
        ['mail', 'Business email', 'Your brand in every conversation.'],
        ['brand', 'Visual identity', 'A consistent look across every touchpoint.'],
        ['automation', 'Automations', 'Connected tools and Claude by Anthropic. Fewer repetitive tasks.'],
        ['chat', 'Chatbots', 'Powered by Claude by Anthropic. Guide visitors and answer common questions.'],
      ]
    : [
        ['mail', 'Correo empresarial', 'Tu marca en cada conversación.'],
        ['brand', 'Identidad visual', 'Una imagen coherente en cada detalle.'],
        [
          'automation',
          'Automatizaciones',
          'Herramientas conectadas con Claude de Anthropic. Menos tareas repetidas.',
        ],
        ['chat', 'Chatbots', 'Con Claude de Anthropic: orienta a tus visitas y responde dudas frecuentes.'],
      ];
  const t = en
    ? {
        problemLabel: 'A website with a purpose',
        problemTitle: ['Your website should', 'work for your business.'],
        problemIntro:
          'Looking good is the beginning. The real job is helping people find you, understand your offer and get in touch.',
        pains: [
          [
            'Visitors, but no enquiries?',
            'We make your offer easy to understand and the next step easy to find.',
          ],
          [
            'Hard to find on Google?',
            'Search-friendly content, a clear structure and a business profile when your business is eligible.',
          ],
          [
            'Outgrown your old website?',
            'We build a visual identity that reflects the quality of the business you run today.',
          ],
        ],
        changeLabel: 'What changes',
        changeTitle: ['Clear from the first look.', 'Easy to take the next step.'],
        changes: [
          'People understand what you offer.',
          'It works well on phones, too.',
          'Contact is always easy to find.',
          'Your customers’ questions have answers.',
        ],
        problemCta: 'Improve my website',
        serviceLabel: 'Our services',
        serviceTitle: ['What your business needs.', 'Built the way it should be.'],
        serviceIntro:
          'A new website or a fresh start. Choose what fits your business; we’ll help define the details.',
        services: [
          {
            name: 'Website design',
            tagline: 'Make your business stand out',
            description:
              'Business websites, landing pages and portfolios that present your work clearly and encourage people to get in touch.',
            includes: ['Design tailored to your brand', 'Responsive pages', 'Clear paths to contact'],
            cta: 'Discuss my website',
            key: 'website' as const,
          },
          {
            name: 'Websites with a dashboard',
            tagline: 'Put you in control',
            description:
              'Update prices, photos and content from your own dashboard. Add the features your day-to-day work actually needs.',
            includes: ['Content and catalog management', 'Database and custom forms', 'Access for your team'],
            cta: 'Discuss my platform',
            key: 'webapp' as const,
          },
          {
            name: 'Shopify stores',
            tagline: 'Turn your products into a store',
            description:
              'A store built around your products, with a clear catalog, a straightforward checkout and the tools to manage it.',
            includes: [
              'Storefront and product catalog',
              'Payments and shipping setup',
              'Inventory and order management',
            ],
            cta: 'Discuss my store',
            key: 'shopify' as const,
          },
        ],
        includedLabel: 'Included from the start',
        includedText: 'Mobile design, SEO + GEO foundations, hosting and domain for the first year.',
        extrasTitle: 'Want to take it further?',
        extrasCta: 'Discuss the extras',
        maintenance:
          'Annual maintenance and renewal are quoted separately from year two. Shopify subscriptions and paid integrations are detailed in your proposal.',
        processLabel: 'How we work',
        processTitle: ['Four steps.', 'We finish when it works.'],
        processIntro:
          'The project does not close at launch. We publish, then check that your site shows up when someone searches for what you do, and adjust what is needed.',
        steps: [
          [
            'A half-hour conversation',
            'Your business, your customers and what they ask you before they buy.',
            'An honest read on what you actually need',
            'Half an hour of your time',
          ],
          [
            'A closed proposal',
            'Pages, features, price and delivery date, in writing. Nothing starts before you approve it.',
            'Scope, price and date, in writing',
            'Read it and decide',
          ],
          [
            'Design and build',
            'With your real content from day one, never filler text. Tested on phone, tablet and desktop.',
            'A private link to follow the progress',
            'Logo, photos and any text you have',
          ],
          [
            'Launch and check',
            'We publish, set up your Google listing and search your own keywords to see where you land.',
            'Your site live, plus the accounts in your name',
            'Use it and tell us what to adjust',
          ],
        ],
        deliverable: 'What you get',
        clientTask: 'Your part',
        faqLabel: 'Before we begin',
        faqTitle: 'A few useful answers.',
        faqs: [
          [
            'How much does a website cost?',
            'The cost depends on the pages, content and features. We send a written proposal with the scope and costs before starting.',
          ],
          [
            'Can you redesign my current website?',
            'Yes. We review what works, what needs to change and what you want to achieve, then build a clear plan for the redesign.',
          ],
          [
            'Can I update the content myself?',
            'Yes, when your project includes an admin dashboard or Shopify. If the content rarely changes, a simpler static website may be the right fit.',
          ],
          [
            'What happens after launch?',
            'Hosting and domain are included for the first year. From year two, maintenance and renewal are charged annually. Ongoing SEO and new features are scoped separately.',
          ],
        ],
        ctaLabel: 'Let’s start with your idea',
        ctaTitle: ['What do you want', 'to build next?'],
        ctaText: 'Tell us about your business. We’ll help shape the next step.',
        ctaButton: 'Tell us about your project',
        email: 'Email us directly',
      }
    : {
        problemLabel: 'Una web con propósito',
        problemTitle: ['Tu web tiene que', 'trabajar por tu negocio.'],
        problemIntro:
          'Verse bien es el comienzo. Lo importante es que te encuentren, entiendan lo que ofreces y sepan cómo contactarte.',
        pains: [
          [
            '¿Te visitan, pero no te escriben?',
            'Ordenamos tu oferta y hacemos que dar el siguiente paso sea fácil.',
          ],
          [
            '¿No te encuentran en Google?',
            'Contenido pensado para búsquedas reales, una estructura clara y tu ficha de negocio cuando corresponda.',
          ],
          [
            '¿Tu web ya no refleja lo que haces?',
            'Creamos una presencia que esté a la altura de la calidad de tu negocio.',
          ],
        ],
        changeLabel: 'Qué cambia en la práctica',
        changeTitle: ['Se entiende a la primera.', 'Es fácil dar el siguiente paso.'],
        changes: [
          'Tu oferta se entiende rápidamente.',
          'Funciona bien, también en el celular.',
          'Contactarte siempre es sencillo.',
          'Las dudas importantes tienen respuesta.',
        ],
        problemCta: 'Quiero mejorar mi web',
        serviceLabel: 'Nuestros servicios',
        serviceTitle: ['Lo que tu negocio necesita.', 'Bien diseñado. Bien hecho.'],
        serviceIntro:
          'Una web nueva o un nuevo comienzo. Elige lo que se parece a tu negocio; juntos definimos los detalles.',
        services: [
          {
            name: 'Diseño y rediseño web',
            tagline: 'Para presentar tu negocio',
            description:
              'Webs corporativas, landings y portafolios que muestran lo que haces y facilitan que tus clientes te escriban.',
            includes: [
              'Diseño adaptado a tu marca',
              'Páginas para cualquier pantalla',
              'Contacto claro y accesible',
            ],
            cta: 'Cotizar mi web',
            key: 'website' as const,
          },
          {
            name: 'Webs con panel',
            tagline: 'Para gestionar tu contenido',
            description:
              'Cambia precios, fotos y contenidos desde tu propio panel. Añadimos las funciones que tu operación necesita.',
            includes: [
              'Gestión de contenido y catálogo',
              'Base de datos y formularios',
              'Accesos para tu equipo',
            ],
            cta: 'Cotizar mi web con panel',
            key: 'webapp' as const,
          },
          {
            name: 'Tiendas online',
            tagline: 'Para vender tus productos',
            description:
              'Tu tienda en Shopify, con un catálogo claro, un proceso de compra sencillo y las herramientas para administrarla.',
            includes: [
              'Diseño de tienda y catálogo',
              'Configuración de pagos y envíos',
              'Gestión de stock y pedidos',
            ],
            cta: 'Cotizar mi tienda',
            key: 'shopify' as const,
          },
        ],
        includedLabel: 'Incluido desde el principio',
        includedText: 'Diseño móvil, base SEO + GEO, hosting y dominio durante el primer año.',
        extrasTitle: '¿Quieres ir un paso más allá?',
        extrasCta: 'Consultar complementos',
        maintenance:
          'Desde el segundo año, mantenimiento y renovación se cotizan anualmente. La suscripción de Shopify y las integraciones de pago se detallan en tu propuesta.',
        processLabel: 'Cómo trabajamos',
        processTitle: ['Cuatro pasos.', 'Terminamos cuando funciona.'],
        processIntro:
          'El proyecto no se cierra al publicar: revisamos que tu web aparezca cuando alguien busca lo que haces y ajustamos lo que haga falta.',
        steps: [
          [
            'Media hora de conversación',
            'Tu negocio, tus clientes y qué te preguntan siempre antes de comprarte.',
            'Un diagnóstico honesto de qué necesitas',
            'Media hora de tu tiempo',
          ],
          [
            'Una propuesta cerrada',
            'Páginas, funciones, precio y fecha, por escrito. Nada arranca antes de que la apruebes.',
            'Alcance, precio y fecha por escrito',
            'Leerla y decidir',
          ],
          [
            'Diseño y construcción',
            'Con tu contenido real desde el primer día, nunca con texto de relleno. Probada en celular, tablet y computadora.',
            'Un enlace privado para seguir el avance',
            'Logo, fotos y textos que ya tengas',
          ],
          [
            'Publicación y comprobación',
            'Publicamos, configuramos tu ficha de Google y buscamos tus palabras clave para ver dónde apareces.',
            'Tu web publicada y los accesos a tu nombre',
            'Usarla y decirnos qué ajustar',
          ],
        ],
        deliverable: 'Lo que recibes',
        clientTask: 'De tu lado',
        faqLabel: 'Antes de empezar',
        faqTitle: 'Respuestas que te ayudan.',
        faqs: [
          [
            '¿Cuánto cuesta una página web?',
            'Depende de las páginas, el contenido y las funciones. Antes de empezar recibirás una propuesta por escrito con el alcance y los costos.',
          ],
          [
            '¿Pueden rediseñar mi web actual?',
            'Sí. Revisamos qué funciona, qué necesita cambiar y qué quieres conseguir para plantear el rediseño.',
          ],
          [
            '¿Puedo actualizar el contenido por mi cuenta?',
            'Sí, si tu proyecto incluye un panel de administración o una tienda Shopify. Si el contenido cambia poco, un sitio estático puede ser lo indicado.',
          ],
          [
            '¿Qué ocurre después del lanzamiento?',
            'Hosting y dominio se incluyen el primer año. Desde el segundo, mantenimiento y renovación se cobran anualmente. El SEO continuo y las nuevas funciones se cotizan por separado.',
          ],
        ],
        ctaLabel: 'Empecemos por tu idea',
        ctaTitle: ['¿Qué quieres', 'construir ahora?'],
        ctaText: 'Cuéntanos sobre tu negocio. Te ayudamos a definir el siguiente paso.',
        ctaButton: 'Cuéntanos tu proyecto',
        email: 'Escribir por correo',
      };

  return (
    <div className="home-sections">
      <section id="enfoque" className="business-section section-pad" aria-labelledby="business-title">
        <div className="commercial-heading" data-reveal>
          <span className="section-kicker">01 / {t.problemLabel}</span>
          <h2 id="business-title">
            {t.problemTitle[0]}
            <br />
            <span>{t.problemTitle[1]}</span>
          </h2>
          <p>{t.problemIntro}</p>
        </div>
        <div className="business-grid">
          <div className="pain-list">
            {t.pains.map(([heading, description], i) => (
              <article key={heading} className="pain-item" data-reveal>
                <span className="item-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3>{heading}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className="outcome-panel" data-reveal>
            <div className="outcome-top">
              <span className="section-kicker">{t.changeLabel}</span>
              <Mark />
            </div>
            <h3>
              {t.changeTitle[0]}
              <br />
              <span>{t.changeTitle[1]}</span>
            </h3>
            <ul>
              {t.changes.map((item) => (
                <li key={item}>
                  <span className="check-mark" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link className="action-button action-button--ink" href={`${contact}?service=website`}>
              {t.problemCta}
              <Arrow />
            </Link>
          </aside>
        </div>
      </section>

      <section id="servicios" className="offer-section section-pad" aria-labelledby="offer-title">
        <div className="commercial-heading" data-reveal>
          <span className="section-kicker">02 / {t.serviceLabel}</span>
          <h2 id="offer-title">
            {t.serviceTitle[0]}
            <br />
            <span>{t.serviceTitle[1]}</span>
          </h2>
          <p>{t.serviceIntro}</p>
        </div>
        <div className="offer-grid">
          {t.services.map((service, i) => (
            <article key={service.key} className="offer-card offer-card--graphic" data-reveal>
              <ServiceVisual kind={service.key} lang={lang} />
              <div className="offer-index">
                <span>0{i + 1}</span>
                <span>{service.tagline}</span>
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              {pricing.showPrices ? (
                <div className="offer-price">
                  <span>{en ? 'From' : 'Desde'}</span>
                  <div>
                    <strong>
                      ${pricing.amounts[service.key as ServiceKey].toLocaleString(en ? 'en-US' : 'es-EC')}
                    </strong>
                    <span>{pricing.currency}</span>
                  </div>
                </div>
              ) : (
                <div className="offer-price offer-price--quote">
                  <span>{en ? 'Investment' : 'Inversión'}</span>
                  <strong>{en ? 'Defined for your scope' : 'Definida según el alcance'}</strong>
                  <small>
                    {en
                      ? 'You receive a clear written quote before we begin.'
                      : 'Recibes una cotización clara antes de empezar.'}
                  </small>
                </div>
              )}
              <ul>
                {service.includes.map((item) => (
                  <li key={item}>
                    <span className="check-mark" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link className="action-button" href={`${contact}?service=${service.key}`}>
                {service.cta}
                <Arrow />
              </Link>
            </article>
          ))}
        </div>
        <div className="included-strip">
          <span className="section-kicker">{t.includedLabel}</span>
          <p>{t.includedText}</p>
          <span className="check-mark" aria-hidden="true">
            ✓
          </span>
        </div>
        <div className="extras-composition" data-graphic>
          <div className="extras-intro">
            <span className="section-kicker">
              {en ? 'Connected to your business' : 'Conectado a tu negocio'}
            </span>
            <h3>{t.extrasTitle}</h3>
            <p>
              {en
                ? 'Your website is the starting point. Connect the tools that make your day-to-day work easier.'
                : 'Tu web es el punto de partida. Conecta las herramientas que hacen más fácil tu día a día.'}
            </p>
            <Link className="action-button action-button--outline" href={contact}>
              {t.extrasCta}
              <Arrow />
            </Link>
          </div>
          <div className="extras-network">
            <div className="network-source">
              <Mark />
              <span>{en ? 'Your website' : 'Tu web'}</span>
              <span className="network-plus" aria-hidden="true">
                +
              </span>
            </div>
            <svg className="network-lines" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M300 0V20H150V40 M300 20H450V40" pathLength="1" data-draw />
            </svg>
            <div className="extras-modules">
              {extras.map(([icon, title, description]) => (
                <article key={icon} className="extra-module" data-graphic-item>
                  <div className="module-icon">
                    <GraphicIcon name={icon} />
                  </div>
                  <h4>{title}</h4>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="renewal-note">
          <GraphicIcon name="document" />
          <div>
            <strong>{en ? 'Clear costs, from the start.' : 'Costos claros, desde el inicio.'}</strong>
            <p className="offer-footnote">{t.maintenance}</p>
          </div>
        </div>
      </section>

      <Commitments lang={lang} kicker="03" />

      <section id="proceso" className="roadmap-section section-pad" aria-labelledby="roadmap-title">
        <div className="commercial-heading" data-reveal>
          <span className="section-kicker">04 / {t.processLabel}</span>
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

      <Projects lang={lang} kicker="05" />

      <section className="answers-section section-pad" aria-labelledby="answers-title">
        <div className="commercial-heading">
          <span className="section-kicker">{t.faqLabel}</span>
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

      <section className="closing-section section-pad" aria-labelledby="closing-title">
        <span className="section-kicker">{t.ctaLabel}</span>
        <div className="closing-heading">
          <h2 id="closing-title">
            {t.ctaTitle[0]}
            <br />
            <span>{t.ctaTitle[1]}</span>
          </h2>
          <Mark />
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
  );
}
