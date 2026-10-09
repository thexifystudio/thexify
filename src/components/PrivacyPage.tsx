import { site } from '@/data/site';
import type { Lang } from '@/lib/i18n';
import '@/styles/legal.css';

interface Section {
  title: string;
  body: React.ReactNode[];
  list?: string[];
  after?: React.ReactNode[];
}

export function PrivacyPage({ lang = 'es' }: { lang?: Lang }) {
  const en = lang === 'en';
  const mail = (
    <a href={`mailto:${site.privacyEmail}`}>
      {site.privacyEmail}
    </a>
  );

  const t: { title: string; updated: string; intro: string; sections: Section[] } = en
    ? {
        title: 'Privacy policy',
        updated: 'Last updated: October 9, 2026',
        intro:
          'This policy explains what we do with the information you send us through the contact form on thexify.com, in line with Ecuador’s Organic Law on Personal Data Protection (LOPDP).',
        sections: [
          {
            title: 'Who is responsible',
            body: [
              'Thexify, a web design and development studio based in Quito, Ecuador, is responsible for processing your data.',
              <>For anything related to your data, write to us at {mail}.</>,
            ],
          },
          {
            title: 'What we collect',
            body: ['When you send the contact form, we receive:'],
            list: [
              'Your name.',
              'Your email address.',
              'Your business or brand name, if you include it.',
              'The service you are interested in.',
              'What you tell us about your project.',
              'The date and time you sent it.',
            ],
            after: [
              'We do not ask for sensitive data (health, ethnic origin, beliefs, financial details or similar). Please do not include it in your message.',
              'Cloudflare, our infrastructure provider, also processes technical connection data such as your IP address to deliver the site and protect it from abuse. Those records are kept for a short period.',
            ],
          },
          {
            title: 'What we use it for',
            body: ['We use your data only to:'],
            list: [
              'Reply to your enquiry.',
              'Prepare and send you a proposal, if you ask for one.',
              'Follow up on that conversation.',
            ],
            after: [
              'We do not use it for advertising, we do not add you to newsletters without your permission, we do not sell it or hand it to third parties for their own purposes, and we do not make automated decisions about you.',
            ],
          },
          {
            title: 'Legal basis',
            body: [
              'We process your data because you send it to us so we can reply. That is your consent and the pre-contractual steps you request, two of the bases recognised in article 7 of the LOPDP. You can withdraw your consent at any time by writing to us; this does not affect anything we did before you withdrew it.',
            ],
          },
          {
            title: 'Where it is stored and who sees it',
            body: [
              'Form messages are stored in a database run by Cloudflare, Inc., which acts as our data processor. Only the Thexify team can read them, from a private, password-protected dashboard.',
              'Cloudflare’s servers may be located outside Ecuador, for example in the United States, so this involves an international data transfer. Cloudflare is contractually committed to protecting the data it processes on behalf of its customers.',
              'If you email us directly, your message is delivered through Cloudflare and stored in Gmail (Google). If you message us on WhatsApp, that conversation is also governed by WhatsApp’s (Meta’s) policies.',
            ],
          },
          {
            title: 'How long we keep it',
            body: [
              'We keep messages for 12 months from our last contact and then delete them. If we end up working together, we keep the data the project needs for as long as the relationship lasts and for as long as legal obligations require, such as tax rules.',
            ],
          },
          {
            title: 'Your rights',
            body: ['Under the LOPDP, you can:'],
            list: [
              'Access the data we hold about you.',
              'Correct or update it.',
              'Ask us to delete it.',
              'Object to its processing or ask us to suspend it.',
              'Request its portability.',
              'Not be subject to decisions based solely on automated processing.',
            ],
            after: [
              <>
                To exercise them, write to {mail} from the email address you contacted us with and tell us
                what you need. We will reply within 15 days at most.
              </>,
              'If you believe we did not handle your request properly, you can file a complaint with Ecuador’s Superintendency of Personal Data Protection.',
            ],
          },
          {
            title: 'Security',
            body: [
              'The site always runs over an encrypted connection (HTTPS), the dashboard where we read messages has restricted access, and we limit automated form submissions. No system is infallible: if a breach ever affects your data, we will let you know and notify the authority within the time limits set by law.',
            ],
          },
          {
            title: 'Cookies',
            body: [
              'The public site does not use advertising or analytics cookies. Cloudflare may use strictly necessary technical cookies to protect the site. The private dashboard uses a session cookie only for the people who manage it.',
            ],
          },
          {
            title: 'Changes to this policy',
            body: ['If we change this policy, we will publish the new version on this page with its update date.'],
          },
        ],
      }
    : {
        title: 'Política de privacidad',
        updated: 'Última actualización: 9 de octubre de 2026',
        intro:
          'Esta política explica qué hacemos con los datos que nos envías desde el formulario de contacto de thexify.com, de acuerdo con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP).',
        sections: [
          {
            title: 'Quién es responsable',
            body: [
              'Thexify, estudio de diseño y desarrollo web con sede en Quito, Ecuador, es responsable del tratamiento de tus datos.',
              <>Para cualquier tema relacionado con tus datos, escríbenos a {mail}.</>,
            ],
          },
          {
            title: 'Qué datos recogemos',
            body: ['Cuando envías el formulario de contacto, recibimos:'],
            list: [
              'Tu nombre.',
              'Tu correo electrónico.',
              'El nombre de tu empresa o marca, si lo indicas.',
              'El servicio que te interesa.',
              'Lo que nos cuentas sobre tu proyecto.',
              'La fecha y hora del envío.',
            ],
            after: [
              'No te pedimos datos sensibles (salud, origen étnico, creencias, datos financieros u otros similares). Te pedimos no incluirlos en tu mensaje.',
              'Además, Cloudflare, nuestro proveedor de infraestructura, procesa datos técnicos de la conexión, como tu dirección IP, para entregarte el sitio y protegerlo de abusos. Esos registros se conservan por un período corto.',
            ],
          },
          {
            title: 'Para qué los usamos',
            body: ['Usamos tus datos solo para:'],
            list: [
              'Responder tu consulta.',
              'Preparar y enviarte una propuesta, si la pides.',
              'Dar seguimiento a esa conversación.',
            ],
            after: [
              'No los usamos para publicidad, no te inscribimos en boletines sin tu permiso, no los vendemos ni los cedemos a terceros para sus propios fines, y no tomamos decisiones automatizadas sobre ti.',
            ],
          },
          {
            title: 'Base legal',
            body: [
              'Tratamos tus datos porque tú nos los envías para que te respondamos. Eso corresponde a tu consentimiento y a la ejecución de medidas precontractuales solicitadas por ti, dos de las bases que reconoce el artículo 7 de la LOPDP. Puedes retirar tu consentimiento en cualquier momento escribiéndonos; eso no afecta lo que hicimos antes de que lo retiraras.',
            ],
          },
          {
            title: 'Dónde se guardan y quién los ve',
            body: [
              'Los mensajes del formulario se guardan en una base de datos de Cloudflare, Inc., que actúa como encargado del tratamiento. Solo el equipo de Thexify puede leerlos, desde un panel privado protegido con contraseña.',
              'Los servidores de Cloudflare pueden estar fuera del Ecuador, por ejemplo en Estados Unidos, por lo que existe una transferencia internacional de datos. Cloudflare se compromete contractualmente a proteger los datos que procesa por cuenta de sus clientes.',
              'Si nos escribes directamente por correo, tu mensaje llega a través de Cloudflare y se guarda en Gmail (Google). Si nos escribes por WhatsApp, esa conversación se rige además por las políticas de WhatsApp (Meta).',
            ],
          },
          {
            title: 'Cuánto tiempo los conservamos',
            body: [
              'Conservamos los mensajes durante 12 meses desde nuestro último contacto y después los eliminamos. Si llegamos a trabajar juntos, guardamos los datos necesarios para el proyecto mientras dure la relación y durante el tiempo que exijan las obligaciones legales, por ejemplo las tributarias.',
            ],
          },
          {
            title: 'Tus derechos',
            body: ['Conforme a la LOPDP, puedes:'],
            list: [
              'Acceder a los datos que tenemos sobre ti.',
              'Rectificarlos o actualizarlos.',
              'Pedir que los eliminemos.',
              'Oponerte a su tratamiento o pedir que lo suspendamos.',
              'Solicitar su portabilidad.',
              'No ser objeto de decisiones basadas únicamente en tratamientos automatizados.',
            ],
            after: [
              <>
                Para ejercerlos, escríbenos a {mail} desde el correo con el que nos contactaste e indica qué
                necesitas. Te responderemos en un plazo máximo de 15 días.
              </>,
              'Si consideras que no atendimos tu solicitud correctamente, puedes presentar un reclamo ante la Superintendencia de Protección de Datos Personales.',
            ],
          },
          {
            title: 'Seguridad',
            body: [
              'El sitio funciona siempre con conexión cifrada (HTTPS), el panel donde leemos los mensajes tiene acceso restringido y limitamos los envíos automatizados del formulario. Ningún sistema es infalible: si ocurriera una vulneración que afecte tus datos, te avisaremos y lo notificaremos a la autoridad en los plazos que fija la ley.',
            ],
          },
          {
            title: 'Cookies',
            body: [
              'El sitio público no usa cookies de publicidad ni de analítica. Cloudflare puede usar cookies técnicas estrictamente necesarias para proteger el sitio. El panel privado usa una cookie de sesión solo para quienes lo administramos.',
            ],
          },
          {
            title: 'Cambios en esta política',
            body: [
              'Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización.',
            ],
          },
        ],
      };

  return (
    <article className="legal-page" aria-labelledby="legal-title">
      <header className="legal-heading">
        <p className="legal-updated">{t.updated}</p>
        <h1 id="legal-title">
          {t.title}
          <span className="title-dot" aria-hidden="true">
            .
          </span>
        </h1>
        <p className="legal-intro">{t.intro}</p>
      </header>
      {t.sections.map((section, i) => {
        const id = `legal-${i + 1}`;
        return (
          <section key={section.title} className="legal-section" aria-labelledby={id}>
            <div className="legal-label">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h2 id={id}>{section.title}</h2>
            </div>
            <div className="legal-copy">
              {section.body.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.after?.map((paragraph, j) => (
                <p key={j}>{paragraph}</p>
              ))}
            </div>
          </section>
        );
      })}
    </article>
  );
}
