import { PrivacyPage } from '@/components/PrivacyPage';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Política de privacidad — Thexify',
  description:
    'Qué datos recoge el formulario de contacto de Thexify, para qué se usan, cuánto tiempo se guardan y cómo ejercer tus derechos según la LOPDP del Ecuador.',
  lang: 'es',
  path: '/es/privacidad/',
  alternatePath: '/privacy/',
});

export default function PrivacidadPage() {
  return (
    <SiteFrame lang="es" alternatePath="/privacy/">
      <PrivacyPage lang="es" />
    </SiteFrame>
  );
}
