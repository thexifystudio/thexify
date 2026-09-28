import { ContactForm } from '@/components/ContactForm';
import { site, whatsappHref } from '@/data/site';
import type { Lang } from '@/lib/i18n';
import '@/styles/contact.css';

export function ContactPage({ lang = 'es' }: { lang?: Lang }) {
  const en = lang === 'en';
  const email = site.email;
  const whatsapp = whatsappHref(
    en
      ? 'Hello Thexify, I would like to discuss a project.'
      : 'Hola Thexify, quisiera conversar sobre un proyecto.',
  );
  const text = en
    ? {
        eyebrow: 'A good project starts with a conversation',
        title: 'Let’s make',
        accent: 'it happen.',
        intro:
          'A new business, a website that needs a fresh start, or an idea you can’t stop thinking about. Tell us what’s next.',
        direct: 'Prefer to write directly?',
        note: 'A few details are enough to start. We’ll talk through the scope, timing and a proposal for your project.',
        whatsapp: 'Talk on WhatsApp',
      }
    : {
        eyebrow: 'Un buen proyecto empieza con una conversación',
        title: 'Hagamos',
        accent: 'que pase.',
        intro:
          'Un negocio que empieza, una web que necesita un cambio o una idea que no te deja de dar vueltas. Cuéntanos qué viene.',
        direct: '¿Prefieres escribir directamente?',
        note: 'Con unos detalles podemos empezar. Conversamos sobre el alcance, los tiempos y una propuesta para tu proyecto.',
        whatsapp: 'Hablar por WhatsApp',
      };

  return (
    <section className="contact-page" aria-labelledby="contact-title">
      <div className="contact-heading">
        <p className="contact-eyebrow">
          <span aria-hidden="true"></span>
          {text.eyebrow}
        </p>
        <h1 id="contact-title">
          {text.title}
          <br />
          <span>{text.accent}</span>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path d="M14 86 86 14M16 14h70v70" />
          </svg>
        </h1>
      </div>
      <div className="contact-body">
        <aside className="contact-intro">
          <p className="contact-lead">{text.intro}</p>
          <div className="contact-direct">
            <p>{text.direct}</p>
            <a href={`mailto:${email}`}>
              {email}
              <span aria-hidden="true"> ↗</span>
            </a>
            {whatsapp && (
              <a className="contact-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer">
                {text.whatsapp}
                <span aria-hidden="true"> ↗</span>
              </a>
            )}
          </div>
          <p className="contact-note">{text.note}</p>
        </aside>
        <ContactForm lang={lang} email={email} endpoint={site.contactEndpoint} whatsapp={whatsapp} />
      </div>
    </section>
  );
}
