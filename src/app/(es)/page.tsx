import { Home } from '@/components/Home';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Thexify — Diseño web que deja huella',
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
