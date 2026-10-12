import { GraphicIcon } from '@/components/GraphicIcon';
import type { Lang } from '@/lib/i18n';
import '@/styles/sections.css';
import '@/styles/graphics.css';

const copy = {
  en: {
    label: 'Our commitments',
    title: ['Three commitments.', 'One for each stage.'],
    intro: 'One before we start, one while we build, one for after your project is live.',
    reasons: [
      {
        index: '01',
        stage: 'Before we start',
        visual: 'proposal',
        title: 'You approve everything first',
        text: 'A written proposal with the scope, delivery dates and investment. If it does not convince you, it ends there and you have paid nothing.',
      },
      {
        index: '02',
        stage: 'While we build',
        visual: 'conversation',
        title: 'You talk to the people building it',
        text: 'A direct line to whoever designs and develops your project. No account managers repeating what you already said.',
      },
      {
        index: '03',
        stage: 'After launch',
        visual: 'handover',
        title: 'It stays yours',
        text: 'Domain, code, data and accounts in your name. We show you how to manage it and where everything lives.',
      },
    ],
    conversation: ['You', 'I have an idea for my business', "Let's define the best way forward."],
    proposal: ['Project proposal', 'Scope', 'Delivery dates', 'Investment'],
    handover: ['Tested', 'Published', 'Your accounts'],
  },
  es: {
    label: 'Nuestros compromisos',
    title: ['Tres compromisos.', 'Uno para cada etapa.'],
    intro: 'Uno antes de empezar, uno mientras construimos y uno para cuando tu proyecto ya esté publicado.',
    reasons: [
      {
        index: '01',
        stage: 'Antes de empezar',
        visual: 'proposal',
        title: 'Apruebas todo antes de que arranquemos',
        text: 'Una propuesta escrita con alcance, fechas e inversión. Si no te convence, ahí termina y no pagaste nada.',
      },
      {
        index: '02',
        stage: 'Mientras construimos',
        visual: 'conversation',
        title: 'Hablas con quienes lo construyen',
        text: 'Trato directo con quien diseña y programa tu proyecto. Sin intermediarios que repitan lo que ya dijiste.',
      },
      {
        index: '03',
        stage: 'Después de publicar',
        visual: 'handover',
        title: 'Queda a tu nombre',
        text: 'Dominio, código, datos y cuentas son tuyos. Te enseñamos a manejarlo y dónde está cada cosa.',
      },
    ],
    conversation: ['Tú', 'Tengo una idea para mi negocio', 'Definamos la mejor forma de hacerla.'],
    proposal: ['Propuesta del proyecto', 'Alcance', 'Fechas de entrega', 'Inversión'],
    handover: ['Probado', 'Publicado', 'Tus accesos'],
  },
} as const;

/** The three published commitments, shared by the homepage and the websites page. */
export function Commitments({ lang, kicker }: { lang: Lang; kicker?: string }) {
  const t = copy[lang];
  const [you, question, answer] = t.conversation;
  const [proposalTitle, ...proposalItems] = t.proposal;

  return (
    <section id="compromisos" className="reasons-section section-pad" aria-labelledby="reasons-title">
      <div className="commercial-heading" data-reveal>
        {kicker && <span className="section-kicker">{`${kicker} / ${t.label}`}</span>}
        <h2 id="reasons-title">
          {t.title[0]}
          <br />
          <span>{t.title[1]}</span>
        </h2>
        <p>{t.intro}</p>
      </div>
      <div className="trust-grid">
        {t.reasons.map((reason, i) => (
          <article key={reason.title} className={`trust-card trust-card--${i + 1}`} data-graphic>
            <div className="trust-card-top">
              <span className="trust-index">{reason.index}</span>
              <span className="trust-card-label">{reason.stage}</span>
            </div>
            {reason.visual === 'conversation' ? (
              <div className="conversation-visual" aria-hidden="true">
                <div className="conversation-person">
                  <span>{you}</span>
                  <i></i>
                </div>
                <div className="conversation-messages">
                  <span>{question}</span>
                  <span>{answer}</span>
                </div>
              </div>
            ) : reason.visual === 'proposal' ? (
              <div className="proposal-visual" aria-hidden="true">
                <div className="proposal-title">
                  <GraphicIcon name="document" />
                  <span>{proposalTitle}</span>
                </div>
                {proposalItems.map((label) => (
                  <div key={label}>
                    <GraphicIcon name="check" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="handover-visual" aria-hidden="true">
                <div className="handover-browser">
                  <i></i>
                  <i></i>
                  <i></i>
                  <span></span>
                  <strong></strong>
                </div>
                <div className="handover-items">
                  {t.handover.map((label) => (
                    <span key={label}>
                      <GraphicIcon name="check" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
