import { ContactPage } from '@/components/ContactPage';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Cuéntanos tu proyecto — Thexify',
  description:
    'Hablemos de tu próxima web, aplicación o tienda Shopify. Cuéntanos tu idea y construyamos una presencia digital a la altura de tu negocio.',
  lang: 'es',
  path: '/contacto/',
  alternatePath: '/en/contact/',
});

export default function ContactoPage() {
  return (
    <SiteFrame lang="es" alternatePath="/en/contact/">
      <ContactPage lang="es" />
    </SiteFrame>
  );
}
