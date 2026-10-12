import { Home } from '@/components/Home';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Thexify — Software, SaaS y soluciones con IA en Quito, Ecuador',
  description:
    'Diseñamos y construimos productos SaaS, plataformas web y soluciones con inteligencia artificial con Claude de Anthropic. Desde Quito, para negocios y emprendedores de todo el mundo.',
  lang: 'es',
  path: '/',
  alternatePath: '/en/',
});

export default function HomePage() {
  return (
    <SiteFrame lang="es" alternatePath="/en/">
      <Home lang="es" />
    </SiteFrame>
  );
}
