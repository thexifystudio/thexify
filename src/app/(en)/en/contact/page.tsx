import { ContactPage } from '@/components/ContactPage';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Tell us about your project — Thexify',
  description:
    "Let's talk about your next website, web app or Shopify store. Share your idea and build a digital presence that does your business justice.",
  lang: 'en',
  path: '/en/contact/',
  alternatePath: '/contacto/',
});

export default function EnglishContactPage() {
  return (
    <SiteFrame lang="en" alternatePath="/contacto/">
      <ContactPage lang="en" />
    </SiteFrame>
  );
}
