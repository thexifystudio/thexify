# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Operating businesses** (owners of small and mid-sized companies in Ecuador, Latin America and the US) that need their own software system, want to automate repetitive work or add AI to their operation.
- **Founders and early-stage startups** that want to launch a SaaS product or web platform.
- Both audiences are primary on the homepage; each needs its own clear path.
- **Second line:** businesses that need a website or a Shopify store, served by a dedicated page (`/webs/`, `/en/websites/`).
- Languages: Spanish (neutral Latin American, close to Ecuador, using `tú`) and English (adapted, never a literal translation).

## Product Purpose

Thexify designs and builds software with AI: SaaS products and web platforms, AI solutions built on Claude (chatbots, automations, assistants), and, as a second line, websites and online stores. Success means a visitor understands what Thexify builds, trusts a small team to deliver it, and starts a conversation (contact form, email or WhatsApp).

## Positioning

- A small studio that builds with Claude (Anthropic) at every stage: research, writing and reviewing code, and testing before launch. AI speeds up the work; design, content and final quality are decided and reviewed by people. This wording was supplied by the founder and is binding.
- Commitments already published: a written proposal with scope, dates and investment before any work starts; direct contact with whoever builds; code, domain, data and accounts in the client's name.
- Thexify is applying to the Claude Startups program, so the site must describe the company truthfully and in a way that can be verified.

## Operating Context

- Site: thexify.com, bilingual (`/` Spanish, `/en/` English), with case pages, contact page, privacy policy (`/privacidad/`, `/en/privacy/`) and a private admin panel.
- Contact form stores enquiries in the database, read at `/admin/mensajes`. Public emails: `hola@thexify.com` (shown on the site; no forwarding rule yet) and `info@thexify.com` (forwards to the founder's inbox). WhatsApp button when the number is configured.
- Based in Quito, Ecuador. Operating since October 2025 (founder's statement). Founder: Pablo Matheo Flores Loor. Whether the founder appears on the site is undecided.
- Not legally registered yet (no RUC or company); the founder decided not to register before the next application.

## Capabilities and Constraints

- Offerings:
  1. **SaaS products and platforms:** web products with users, an admin panel and the client's business logic.
  2. **AI solutions:** Claude-powered chatbots, automations and assistants.
  3. **Websites and online stores:** design and redesign, websites with an admin panel, Shopify stores. Websites include mobile design, SEO + GEO foundations, and hosting and domain for the first year; maintenance and renewal are quoted annually from year two.
- Prices are not approved: amounts are never published (`src/data/pricing.ts` keeps drafts with `showPrices: false`).
- Never promise search rankings, traffic or citations in AI assistants.
- Technical constraints: Next.js 15 on Cloudflare Workers, custom CSS (no Tailwind), public pages prerendered, a Content Security Policy that blocks every external origin (third-party scripts, fonts or embeds require updating it), pages readable without JavaScript, `prefers-reduced-motion` respected.

## Brand Commitments

- Name `thexify` / Thexify; logo is the asymmetric two-direction X plus the lowercase wordmark. Source of truth: the vault note `Empresa/Thexify/Identidad Visual.md` (v1.0) and `public/brand/`.
- Identity constraints from that note: ink, paper and signal green (`#2FD79B`) as brand colors, green used as a signal rather than paint; Manrope as the only family; never stretch, tilt or rebuild the X; no purple, blue or neon gradients on the brand; the editorial asterisk never joins the logo.
- Voice: clear and concrete, business result first and technology second.
- The founder explicitly asked for the redesign to feel as modern and impressive as Vercel and Stripe, and to use Higgsfield-generated visuals.

## Evidence on Hand

- Published cases, both websites: Canangueno Lodge (in development) and SUNSU Cleaning (live). Content in `src/data/projects.ts`, captures in `src/assets/`.
- **No software, SaaS or AI client cases exist yet.** Do not fabricate cases, metrics, testimonials, client logos, user counts or team members.
- Earlier Higgsfield ads in `marketing/higgsfield-ads/` show fictional mock brands; they are not client work.

## Product Principles

1. Truth over impressiveness: every claim must survive verification; nothing invented.
2. Software first, websites second, but the websites line keeps a complete page of its own.
3. Two audiences, two clear paths: operating businesses and founders.
4. Closed scope and ownership: a proposal before work, and the client owns code and data.
5. AI is how we work and what we build, always with human review.

## Accessibility & Inclusion

- WCAG AA contrast, full keyboard use, content readable without JavaScript, reduced-motion alternatives.
- Functional text never below 12px and body text never below 16px (brand rule).
