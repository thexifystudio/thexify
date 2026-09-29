import { SiteMotion } from '@/components/SiteMotion';
import { manrope } from '@/lib/fonts';
import type { Lang } from '@/lib/i18n';
import { jsonLd, siteSchema } from '@/lib/metadata';
import '@/styles/global.css';

/**
 * <html> of the public site. Spanish and English each get their own root layout
 * (route groups) because <html lang> must follow the language; both render this.
 */
export function SiteDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={manrope.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteSchema(lang)) }}
        />
        {children}
        <SiteMotion />
      </body>
    </html>
  );
}
