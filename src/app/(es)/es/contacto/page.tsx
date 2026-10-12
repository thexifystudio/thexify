import { ContactPage } from '@/components/ContactPage';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Cuéntanos tu proyecto — Thexify',
  description:
    'Cuéntanos qué quieres construir: un producto SaaS, un asistente con IA o una automatización. Te respondemos con los siguientes pasos.',
  lang: 'es',
  path: '/es/contacto/',
  alternatePath: '/contact/',
});

export default function ContactoPage() {
  return (
    <SiteFrame lang="es" alternatePath="/contact/" current="contact">
      <ContactPage lang="es" />
    </SiteFrame>
  );
}
