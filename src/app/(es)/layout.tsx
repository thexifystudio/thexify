import { SiteDocument } from '@/components/SiteDocument';
import { siteViewport } from '@/lib/metadata';

export const viewport = siteViewport;

export default function SpanishLayout({ children }: { children: React.ReactNode }) {
  return <SiteDocument lang="es">{children}</SiteDocument>;
}
