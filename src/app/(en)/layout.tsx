import { SiteDocument } from '@/components/SiteDocument';
import { siteViewport } from '@/lib/metadata';

export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}
