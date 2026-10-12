import { ContactPage } from '@/components/ContactPage';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Tell us about your project — Thexify',
  description:
    'Tell us what you want to build: a SaaS product, an AI assistant or an automation. We will reply with clear next steps.',
  lang: 'en',
  path: '/contact/',
  alternatePath: '/es/contacto/',
});

export default function EnglishContactPage() {
  return (
    <SiteFrame lang="en" alternatePath="/es/contacto/" current="contact">
      <ContactPage lang="en" />
    </SiteFrame>
  );
}
