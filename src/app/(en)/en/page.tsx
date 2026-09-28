import { Home } from '@/components/Home';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Thexify — Websites worth remembering',
  description:
    'Independent web design and development studio. Distinctive websites, web platforms and Shopify stores. Based in Quito. Working everywhere.',
  lang: 'en',
  path: '/en/',
  alternatePath: '/',
});

export default function EnglishHomePage() {
  return (
    <SiteFrame lang="en" alternatePath="/">
      <Home lang="en" />
    </SiteFrame>
  );
}
