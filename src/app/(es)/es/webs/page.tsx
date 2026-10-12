import { SiteFrame } from '@/components/SiteFrame';
import { WebsPage } from '@/components/WebsPage';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Diseño de páginas web en Quito, Ecuador — Thexify',
  description:
    'Webs, landings y tiendas online para negocios. Diseño a la medida, pensado para el celular y para Google, con hosting y dominio el primer año.',
  lang: 'es',
  path: '/es/webs/',
  alternatePath: '/websites/',
});

export default function WebsRoute() {
  return (
    <SiteFrame lang="es" alternatePath="/websites/" current="webs">
      <WebsPage lang="es" />
    </SiteFrame>
  );
}
