import { SiteFrame } from '@/components/SiteFrame';
import { WebsPage } from '@/components/WebsPage';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Web design in Quito, Ecuador — Thexify',
  description:
    'Websites, landing pages and online stores for businesses. Custom design built for phones and for Google, with hosting and domain included for the first year.',
  lang: 'en',
  path: '/websites/',
  alternatePath: '/es/webs/',
});

export default function WebsitesRoute() {
  return (
    <SiteFrame lang="en" alternatePath="/es/webs/" current="webs">
      <WebsPage lang="en" />
    </SiteFrame>
  );
}
