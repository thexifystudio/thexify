import { PrivacyPage } from '@/components/PrivacyPage';
import { SiteFrame } from '@/components/SiteFrame';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Privacy policy — Thexify',
  description:
    'What data the Thexify contact form collects, what it is used for, how long it is kept and how to exercise your rights under Ecuador’s LOPDP.',
  lang: 'en',
  path: '/en/privacy/',
  alternatePath: '/privacidad/',
});

export default function EnglishPrivacyPage() {
  return (
    <SiteFrame lang="en" alternatePath="/privacidad/">
      <PrivacyPage lang="en" />
    </SiteFrame>
  );
}
