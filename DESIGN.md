---
name: Thexify
description: Software with AI, shown working in green-black glass over crossing emerald light.
colors:
  signal-green: "#2fd79b"
  signal-green-lift: "#5fe3b4"
  ink: "#101110"
  ground: "#090a09"
  paper: "#eeefeb"
  headline-white: "#f3f2f2"
  copy: "#c2c8bd"
  muted: "#aeb2aa"
  lede-grey: "#a6abb0"
  surface: "#191d19"
  surface-raised: "#222822"
  glass-edge: "rgba(110, 200, 165, 0.16)"
  hairline: "rgba(238, 239, 235, 0.18)"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(42px, 5.21vw, 104px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(34px, 4.25vw, 65px)"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(22px, 1.9vw, 30px)"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  lede:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(16px, 1.265vw, 21px)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-intro:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 650
    lineHeight: 1.4
rounded:
  card: "12px"
  tile: "16px"
  panel: "18px"
  device: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(22px, 4.4vw, 88px)"
  header: "clamp(64px, 5.2vw, 84px)"
  section: "100px"
  grid-gap: "20px"
  tile-pad: "30px"
  panel-pad: "28px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 clamp(20px, 1.71vw, 28px)"
    height: "clamp(44px, 3.35vw, 54px)"
  button-primary-hover:
    backgroundColor: "{colors.signal-green-lift}"
    textColor: "{colors.ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "14px 22px"
    height: "54px"
  button-outline-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  header-cta:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "clamp(38px, 3.05vw, 48px)"
  solution-tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "{spacing.tile-pad}"
  path-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.tile}"
    padding: "26px 28px"
  claude-chip:
    backgroundColor: "transparent"
    textColor: "{colors.signal-green}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: Thexify

## Overview

**Creative North Star: "Software Shown Working"**

Thexify's world is a near-black, grain-textured ground where real-looking product interfaces float in depth while two emerald beams cross behind them. The crossing beams are the brand's two-direction X drawn as light. The system shows the product doing its job; it doesn't describe it with abstraction. Dashboards, automation flows and a Claude assistant are drawn as illustrative interfaces in deep green-black glass, so the page reads like a product at work and not like a marketing poster.

The type does the talking: Manrope only, heavy weight, tight tracking, off-white on ink. Signal green is rare and functional. It marks the primary action, active and live states, the Claude stage markers and the light itself. Everything else lives in a narrow band of green-tinted neutrals. Density is calm. Sections breathe at 100px, cards are generous, and the interface illustrations carry the detail.

The world refuses the centered gradient-blob SaaS hero, stock "AI" imagery, and any purple, blue or neon gradient. Illustrative interfaces are always examples: they never present invented customers, logos or metrics as Thexify's own.

**Key Characteristics:**
- Ink ground (#090a09) with tiled film grain (269x152 CSS px plate).
- Manrope 750-800 headlines at -0.03em to -0.04em tracking.
- Signal green as a signal, never as paint.
- Green-black glass cards: a hairline emerald-tinted edge, a soft deep drop shadow, a faint green halo.
- 3D perspective in the hero, with a pointer tilt and scroll drift, and every motion disabled under reduced motion.
- Raster light plates (crossing beams) masked into the ground, never framed.

## Colors

A monochrome green-black world in which a single emerald works as the signal.

### Primary
- **Signal Green** (#2fd79b): The brand's signal color, used for the primary pill buttons and header CTA, active nav and chip states, live dots, the Claude markers in the studio flow, link underlines, icons inside interface nodes, focus rings and text selection. It's also the color of the light plates.
- **Signal Green Lift** (#5fe3b4): Hover state of the green pills only, paired with a soft green glow shadow.

### Neutral
- **Ground** (#090a09): The homepage canvas under the grain plate. It's darker than ink so the glass cards lift without any added light.
- **Ink** (#101110): The root background and the text color on green.
- **Paper** (#eeefeb): Primary text, section titles and the hover fill of outline buttons.
- **Headline White** (#f3f2f2): The hero display line only.
- **Copy** (#c2c8bd): Body paragraphs, footer text and secondary headline lines.
- **Muted** (#aeb2aa) and **Lede Grey** (#a6abb0): Status labels and the hero lede.
- **Surface** (#191d19) / **Surface Raised** (#222822): Solid fallbacks for tiles and panels. On the homepage, tiles use vertical gradients in this range (rgba(25,30,26,0.92) to rgba(14,19,17,0.94)).
- **Glass Edge** (rgba(110, 200, 165, 0.16)): The 1px border on every glass card, tile and path card.
- **Hairline** (rgba(238, 239, 235, 0.18)): Dividers, the footer rule and the studio note rule.

### Named Rules
**The Signal Rule.** Green marks action, state or light, never decoration or large fills. The one solid green surface on a screen is the primary button. Inside illustrations, green appears only as tinted fills (0.07 to 0.16 alpha) or as a mark.

**The Brand Palette Rule.** Ink, paper and signal green are the brand. No purple, blue or neon gradients may touch the brand or the light.

## Typography

**Display Font:** Manrope Variable (self-hosted, weights 200-800), sans-serif fallback
**Body Font:** Manrope
**Label/Mono Font:** none; Manrope covers every role

**Character:** One geometric-humanist family carries the whole system through weight and tracking. Headlines are heavy and tight, while body text stays regular and loose enough to read.

### Hierarchy
- **Display** (800, clamp(42px, 5.21vw, 104px), line-height 1, -0.04em): The hero headline only. It's set as three stacked lines, and on mobile it scales to clamp(42px, 11.5vw, 72px).
- **Headline** (750, clamp(34px, 4.25vw, 65px), 1.1, -0.04em): Section titles. They're written as two sentences, with the second on its own line in Copy grey. The closing heading grows to clamp(42px, 6.5vw, 98px).
- **Title** (750, clamp(22px, 1.9vw, 30px), 1.15, -0.03em): Bento tile titles. Smaller card titles (17-23px, 600-700) follow the same tracking direction.
- **Lede** (400, clamp(16px, 1.265vw, 21px), 1.45): The hero paragraph, capped at about 25em.
- **Body Intro** (400, 18px, 1.75): Section intros and the studio paragraph, capped at 600-680px.
- **Body** (400, 16px, 1.55): Card and path copy, capped at about 34em.
- **Label** (650-700, 12-15px): Chip text, tile links, captions and the "built with" line. Sentence case.

### Named Rules
**The Weight-Not-Family Rule.** Manrope is the only family. Use weight (750-800) and negative tracking for hierarchy. Don't add a second face or a serif accent.

**The Legibility Floor Rule.** Functional text never goes below 12px, and body text never goes below 16px. The one exception is the interface illustrations, which scale with their container and are aria-hidden.

## Layout

Edge-to-edge sections sit inside a fluid gutter (clamp(22px, 4.4vw, 88px)). Past 1800px, the content centers at 1680px. Sections are padded 100px vertically. The hero is a split: copy in the left ~40%, and the visual absolutely fills the right 60% as a container-query box (font-size in cqw so the interface stack scales as one object).

The solutions bento uses a 1.95fr / 1fr / 1fr grid with a 20px gap. It becomes a two-column grid at 1100px (with the SaaS tile spanning both columns) and a single column at 900px. Below the bento, two path cards sit in a 2-up grid with the same gap. The studio section is a 50/50 grid with a 6vw gap.

At 900px the hero stacks: copy first, then a visual band min(118vw, 640px) tall that bleeds to the screen edges, with the cards re-laid as a diagonal cascade. Touch targets stay at a 44px minimum.

## Elevation & Depth

Depth comes from three layered effects: a darker ground, translucent green-black glass with a hairline emerald edge, and soft, long, low-opacity drop shadows. A 3D perspective (1700px) on the hero stack sets the cards at -24px, 0 and +24px in Z, all at a shared rotation (rotateX 5deg, rotateY -6deg, rotateZ -2.3deg). The light plates add atmosphere behind everything and are masked into the ground with linear-gradient masks on both axes.

### Shadow Vocabulary
- **Glass float** (`box-shadow: 0 2.6em 5em -1.4em rgba(0,0,0,0.88), 0 0 2.6em -0.8em rgba(47,215,155,0.22)`): Hero interface cards only. A deep drop shadow plus a faint emerald halo.
- **Panel rest** (`box-shadow: 0 30px 60px -30px rgba(0,0,0,0.85)`): The studio flow panel and the commitment cards.
- **Embedded UI** (`box-shadow: 0 24px 50px -28px rgba(0,0,0,0.9)`): Mini interfaces inside bento tiles.
- **Signal glow** (`box-shadow: 0 10px 28px -10px rgba(47,215,155,0.65)`): Hover state of the green pill buttons. The header CTA uses a lighter version (0 6px 20px -6px, 0.55).

### Named Rules
**The Soft Shadow Rule.** Every shadow is blurred, negatively spread and tinted only black or emerald. Hard offset shadows don't belong to this world.

**The Glass Rule.** Cards are translucent green-black (around 0.9 alpha) with a backdrop blur of 8px and a 1px glass-edge border. Never use opaque grey cards on the homepage.

## Shapes

Corners are gently rounded and scale with importance: 12px for embedded interfaces and icon wells, 16px for tiles and path cards, 18px for the studio panel and 28px for the phone device frame. Every action is a full pill (999px). Interface illustrations use em-based radii (0.9em on cards, 0.7em on nodes) so they scale with the stack. Chat bubbles cut one corner to 0.2em on the speaker's side. The only lines are 1px hairlines, and the studio flow uses dashed hairlines between steps.

## Components

### Buttons
Confident pills, heavy text and an arrow that moves.
- **Shape:** full pill (999px).
- **Primary:** Signal Green fill with ink text at weight 800 and 18px trailing arrow icon. The height is clamp(44px, 3.35vw, 54px).
- **Hover / Focus:** On hover, the fill lightens to Signal Green Lift, a signal glow appears and the arrow moves 3px right (0.24s, cubic-bezier(0.22, 1, 0.36, 1)). Focus shows a 2px green outline offset 6px.
- **Outline:** transparent, a 1px grey border, paper text. On hover it fills with paper and ink text. It's used as the secondary closing action.
- **Text link (secondary):** grey text with a 1.5px green underline offset 6px. On hover the text turns paper.

### Chips
- **Claude chip:** a 1px emerald border at 0.35 alpha, an emerald fill at 0.08 alpha, green 13px/650 text and a 14px spark icon. The final human step inverts it to a paper fill with ink text.
- **Interface chips/status:** em-scaled pills inside illustrations. Active and done states use green tints (0.10 to 0.16 alpha), and pending states use a white tint at 0.07 alpha.

### Cards / Containers
- **Corner Style:** 16px for tiles and path cards, 18px for the panel.
- **Background:** a vertical green-black gradient (tiles, panel) or rgba(19,25,21,0.72) for path cards.
- **Shadow Strategy:** see Elevation & Depth. Tiles rest flat, while panels and interface cards carry soft shadows.
- **Border:** a 1px glass edge. On path card hover, the border turns to emerald at 0.5 alpha.
- **Internal Padding:** 30px for tiles (24px under 900px), 26px 28px for path cards and 28px for the panel.

### Navigation
A sticky header at clamp(64px, 5.2vw, 84px) on rgba(9,10,9,0.84) with an 18px backdrop blur and a 0.1-alpha bottom hairline. On the left sits the official symbol (the X on a green rounded square) plus a lowercase wordmark at weight 750. Links are grey (#b5b9bf) and turn paper on hover or when current. A 1px green underline scales in from the left (0.25s). The language switch carries a globe icon, and a green pill CTA sits on the right. Under 900px the links collapse into a two-line toggle and a full-width dropdown with 28px rows.

### Interface Illustrations (signature)
Example dashboards, automation flows and Claude chats are built in HTML and CSS, not screenshots. They're em-scaled, aria-hidden and described once for screen readers. They use the glass card, an icon rail or sidebar, hairline tables, green wires with node dots, and speaker-cornered chat bubbles. In the hero they stack in 3D. In the bento they sit flat as embedded UI at 11px base. They show plausible example data only and never use the Thexify name as a fake customer.

### Icons
One stroke family on a 24px grid: 1.6 stroke, round caps and joins, currentColor. They're drawn at 14-24px. Icon wells are 44-48px rounded squares (12px) with a 1px border, and the green variant uses an emerald fill at 0.1 alpha.

### Motion
On first paint, the hero copy rises 18px with a 0.06-0.26s stagger (0.75s). The beams fade in from 1.05 scale (1.4s). The cards arrive from 48px down and -90px Z with a 0.28/0.40/0.52s stagger (1s). Every entrance uses cubic-bezier(0.22, 1, 0.36, 1). On desktop pointers the stack tilts up to 7deg Y and 5deg X, and it drifts -56px on scroll. Lower sections reveal on scroll (0.8s). With reduced motion, all of it is removed.

## Do's and Don'ts

### Do:
- **Do** keep Signal Green to action, state, live markers and light. The one solid green surface per view is the primary pill.
- **Do** set headlines in Manrope 750-800 with -0.03em to -0.04em tracking. Write section titles as two lines, with the second in Copy grey.
- **Do** build cards as green-black glass: a 1px glass edge, 12-18px radius and a soft negatively-spread shadow.
- **Do** show the product working through illustrative HTML interfaces, and mark them as examples for screen readers.
- **Do** mask raster light plates into the ground on both axes so they have no visible edge.
- **Do** use the official symbol as supplied (ink X on a green rounded square, rx 15/64).
- **Do** ease every entrance with cubic-bezier(0.22, 1, 0.36, 1) and drop all motion under prefers-reduced-motion.

### Don't:
- **Don't** use a second typeface, a serif accent or a system display face.
- **Don't** put uppercase labels or kickers above headlines. Headlines open their sections directly.
- **Don't** use hard offset shadows or opaque grey cards on the homepage.
- **Don't** use purple, blue or neon gradients, centered gradient-blob heroes or stock "AI" imagery.
- **Don't** stretch, tilt or rebuild the X symbol. The tilt in the hero belongs to the interface cards, never to the logo.
- **Don't** show invented customers, logos, metrics or testimonials as Thexify's own in any illustration.
- **Don't** set functional text below 12px or body text below 16px.

## Known Divergent Surface

`/webs/` and `/en/websites/` (WebsPage, WebsSections, hero.css) intentionally keep the previous editorial direction, described in DIRECTION.md. That direction includes eyebrow labels, a 6px control radius and olive-green panels. It isn't this system, and new surfaces must not copy from it.
