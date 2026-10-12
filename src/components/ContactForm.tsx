'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { paths, type Lang } from '@/lib/i18n';

interface Props {
  lang: Lang;
  email: string;
  /** Where submissions are POSTed. Empty: open the visitor's mail app instead. */
  endpoint: string;
  whatsapp: string | null;
}

const services = ['software', 'ai', 'website', 'webapp', 'shopify'];

export function ContactForm({ lang, email, endpoint, whatsapp }: Props) {
  const en = lang === 'en';
  const text = en
    ? {
        name: 'Your name',
        email: 'Email address',
        business: 'Business or brand',
        optional: '(optional)',
        service: 'What do you have in mind?',
        description: 'Tell us a little about your project',
        placeholder:
          'What do you do, what would you like to build, and what should your website help you achieve?',
        prepare: 'Send enquiry',
        sending: 'Sending…',
        privacy: 'Your details are used only to reply to this enquiry.',
        privacyLink: 'Privacy policy',
        ready: 'Thanks. Your enquiry has been sent and we’ll reply as soon as possible.',
        error: 'We couldn’t send your enquiry. Please try again or write to us directly.',
        open: 'Write by email',
        whatsapp: 'Talk on WhatsApp',
        nojs: 'To start a conversation, email us directly with a few details about your project.',
      }
    : {
        name: 'Tu nombre',
        email: 'Correo electrónico',
        business: 'Empresa o marca',
        optional: '(opcional)',
        service: '¿Qué tienes en mente?',
        description: 'Cuéntanos un poco sobre tu proyecto',
        placeholder: '¿A qué te dedicas, qué te gustaría construir y qué quieres conseguir con tu web?',
        prepare: 'Enviar consulta',
        sending: 'Enviando…',
        privacy: 'Usaremos tus datos únicamente para responder esta consulta.',
        privacyLink: 'Política de privacidad',
        ready: 'Gracias. Recibimos tu consulta y te responderemos lo antes posible.',
        error: 'No pudimos enviar tu consulta. Inténtalo otra vez o escríbenos directamente.',
        open: 'Escribir por correo',
        whatsapp: 'Hablar por WhatsApp',
        nojs: 'Para empezar la conversación, escríbenos directamente con unos detalles de tu proyecto.',
      };

  const serviceRef = useRef<HTMLSelectElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [fallbackHref, setFallbackHref] = useState(`mailto:${email}`);

  useEffect(() => {
    // ?service=webapp (from the quote buttons) preselects the service.
    const selected = new URLSearchParams(window.location.search).get('service');
    if (serviceRef.current && selected && services.includes(selected)) serviceRef.current.value = selected;
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (result) resultRef.current?.focus({ preventScroll: true });
  }, [result]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const get = (key: string) => String(fields.get(key) ?? '').trim();
    const selectedLabel = serviceRef.current?.selectedOptions[0]?.text ?? '';
    const subject = en
      ? `New project — ${get('business') || get('name')}`
      : `Nuevo proyecto — ${get('business') || get('name')}`;
    const body = en
      ? `Hello Thexify,\n\nI'd like to talk about a project.\n\nName: ${get('name')}\nEmail: ${get('email')}\nBusiness: ${get('business') || '—'}\nService: ${selectedLabel}\n\nProject details:\n${get('description')}\n`
      : `Hola Thexify,\n\nMe gustaría conversar sobre un proyecto.\n\nNombre: ${get('name')}\nCorreo: ${get('email')}\nEmpresa: ${get('business') || '—'}\nServicio: ${selectedLabel}\n\nSobre el proyecto:\n${get('description')}\n`;
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFallbackHref(mailto);
    if (!endpoint) {
      window.location.href = mailto;
      return;
    }
    setSending(true);
    setResult(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: get('name'),
          email: get('email'),
          business: get('business'),
          service: selectedLabel,
          description: get('description'),
          website: get('website'),
          // Measured on the visitor's own clock, so server clock skew does not matter.
          elapsedMs: Date.now() - Number(get('startedAt')),
          lang,
        }),
      });
      if (!response.ok) throw new Error(`Contact request failed with ${response.status}`);
      setResult('success');
      form.reset();
      if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
    } catch {
      setResult('error');
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      className="project-form"
      action={`mailto:${email}`}
      method="post"
      data-project-form
      onSubmit={handleSubmit}
      onInput={() => setResult(null)}
    >
      <label className="form-trap" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" data-form-started />
      <div className="form-pair">
        <label className="form-field">
          <span>
            {text.name}{' '}
            <span className="required" aria-hidden="true">
              *
            </span>
          </span>
          <input type="text" name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label className="form-field">
          <span>
            {text.email}{' '}
            <span className="required" aria-hidden="true">
              *
            </span>
          </span>
          <input type="email" name="email" autoComplete="email" required maxLength={160} />
        </label>
      </div>
      <label className="form-field">
        <span>
          {text.business} <span className="optional">{text.optional}</span>
        </span>
        <input type="text" name="business" autoComplete="organization" maxLength={150} />
      </label>
      <label className="form-field select-field">
        <span>{text.service}</span>
        <select ref={serviceRef} name="service" defaultValue="unsure">
          <option value="unsure">{en ? 'Let’s figure it out together' : 'Lo definimos juntos'}</option>
          <option value="software">{en ? 'A SaaS product or platform' : 'Un producto SaaS o plataforma'}</option>
          <option value="ai">{en ? 'An AI solution' : 'Una solución con IA'}</option>
          <option value="website">{en ? 'A website' : 'Un sitio web'}</option>
          <option value="webapp">
            {en ? 'A web app or admin dashboard' : 'Una web con panel o sistema'}
          </option>
          <option value="shopify">{en ? 'A Shopify store' : 'Una tienda Shopify'}</option>
        </select>
        <span className="select-chevron" aria-hidden="true">
          ⌄
        </span>
      </label>
      <label className="form-field description-field">
        <span>
          {text.description}{' '}
          <span className="required" aria-hidden="true">
            *
          </span>
        </span>
        <textarea
          name="description"
          rows={4}
          placeholder={text.placeholder}
          required
          minLength={15}
          maxLength={2500}
        ></textarea>
      </label>
      <div className="form-submit">
        <button type="submit" data-submit disabled={sending}>
          <span data-submit-label>{sending ? text.sending : text.prepare}</span>
          <span aria-hidden="true">↗</span>
        </button>
        <p>
          {text.privacy} <Link href={paths.privacy(lang)}>{text.privacyLink}</Link>
        </p>
      </div>
      <div
        ref={resultRef}
        className="email-result"
        data-form-result
        data-state={result ?? undefined}
        tabIndex={-1}
        hidden={!result}
      >
        <p role="status" aria-live="polite" data-result-message>
          {result === 'success' ? text.ready : result === 'error' ? text.error : ''}
        </p>
        <div data-result-fallback hidden={result !== 'error'}>
          <a data-email-fallback href={fallbackHref}>
            {text.open}
            <span aria-hidden="true"> ↗</span>
          </a>
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              {text.whatsapp}
              <span aria-hidden="true"> ↗</span>
            </a>
          )}
        </div>
      </div>
      <noscript>
        <p className="no-js-note">
          {text.nojs} <a href={`mailto:${email}`}>{email}</a>
        </p>
      </noscript>
    </form>
  );
}
