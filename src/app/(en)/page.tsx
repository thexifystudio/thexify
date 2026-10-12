import { Home } from '@/components/Home';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Thexify — Software, SaaS and AI solutions in Quito, Ecuador',
  description:
    'We design and build SaaS products, web platforms and AI solutions with Claude by Anthropic. Based in Quito, working with businesses and founders everywhere.',
  lang: 'en',
  path: '/',
  alternatePath: '/es/',
});

export default function EnglishHomePage() {
  return (
    <SiteFrame lang="en" alternatePath="/es/">
      <Home lang="en" />
    </SiteFrame>
  );
}
