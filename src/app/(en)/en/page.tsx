import { Home } from '@/components/Home';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Thexify — Web design & development studio in Quito, Ecuador',
  description:
    'Independent web design and development studio. Websites worth remembering: business sites, web platforms with an admin panel and Shopify stores. Based in Quito, working everywhere.',
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
