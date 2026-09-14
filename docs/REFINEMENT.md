# Home refinement — 2026-09-13

The approved hero composition is preserved. Its discovery link now leads to the next section instead of skipping directly to the portfolio.

Below the hero: business problems and practical outcomes, three core services with quote buttons, six reasons to choose Thexify, a four-step process, a pending portfolio, FAQs and a clear closing CTA. Copy is available in Spanish and English.

The portfolio selection is intentionally empty in `src/data/portfolio.ts`. Add the 3 or 6 user-supplied projects there, with real images, localized alt text, categories and links. The component renders at most six entries. The two existing hero previews and case pages are independent and preserved.

Reference screenshot prices were not copied: they belong to a different service model and need confirmation. No fabricated outcomes, reviews or client work were added. No generated images or paid video assets were used.

Checks: Astro check and static build pass (9 routes). Browser checks include desktop 1440, tablet 768 and mobile 390/320 widths, navigation, mobile menu, FAQ disclosure and the quote button preselecting `webapp` on the contact page. Text entrance animations retain full opacity for contrast. No public deployment was performed.
