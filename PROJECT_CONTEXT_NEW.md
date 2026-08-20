# Richmonks — Complete Project Context

> **Purpose of this document:** Permanent technical knowledge for AI-assisted development. It describes architecture, implementation, design system, business content, and known gaps so future assistants can work without re-inspecting the entire codebase.
>
> **Project root:** `richmonks/` inside workspace `Webiste-2/`
> **Production URL:** `https://www.richmonks.in` (hardcoded throughout SEO files)
> **Document generated from:** Full codebase inspection (Next.js App Router marketing site)
> **Language:** JavaScript / JSX (no TypeScript)
> **Deploy model:** Static export (`output: 'export'`)

---

# 1. Project Overview

## Purpose of the application

Richmonks is a **corporate / institutional marketing website** for an India-based **quantitative research and algorithmic trading firm**. The site communicates brand philosophy (**Trust. Trade. Earn.**), explains methodology and risk discipline, introduces founders and team structure, collects professional inquiries via a contact form UI, and publishes legal disclaimers.

It is **not** a trading platform, dashboard, client portal, or investment product. There is no live market data, account login, order entry, or portfolio tooling.

## Target users

| Audience | Intent |
|----------|--------|
| Prospective professional contacts | Research collaborations, partnership inquiries |
| Industry peers / talent | Understand culture, methodology, tech posture |
| General web / SEO visitors | Brand discovery for quant trading in India |
| Compliance-sensitive readers | Legal / disclaimer clarity |

**Explicit non-audience (stated in copy):** The public as investment solicitations. The site repeatedly states it does **not** solicit investment, provide personalized advice, or offer trading services through the website.

## Business domain

- **Industry:** Financial services — quantitative / algorithmic / systematic trading
- **Geography:** India (Mumbai registered address); `geo.region` / `geo.country` set to `IN`
- **Markets referenced in copy:** Equity and Futures & Options (F&O)
- **Brand pillars:** Trust, Trade, Earn
- **Founding year (JSON-LD):** 2025
- **Employee range (JSON-LD):** 10–50 *(schema markup; not independently verified in app code)*

## Main features

1. **Multi-page marketing site** with animated section-based layouts
2. **Brand storytelling** (hero, pillars, edge, testimonials, founders)
3. **Approach / methodology** page (pipeline + risk oversight; some tech sections soft-disabled)
4. **Team** structure visualization (culture section soft-disabled)
5. **Contact** page with client-side inquiry form (no backend submission)
6. **Legal / disclaimer** page with sticky TOC and scroll-spy
7. **SEO** metadata, Open Graph, Twitter cards, Organization JSON-LD, sitemap, robots
8. **Legacy redirect** `/technology` → `/approach`
9. **PWA-ish manifest** (`public/manifest.json`) — display standalone; not a full service-worker PWA

## High-level architecture

```
Browser
  └── Next.js App Router (static export → out/)
        ├── Root layout (metadata, JSON-LD, globals.css)
        ├── Route layouts (page-level metadata only; pass-through children)
        └── Client page components
              ├── Navbar + Footer (per page, not in root layout)
              ├── Section components (page-specific folders)
              └── lib/animations (shared Framer Motion variants)
```

**Architectural character:** Frontend-only, content-hardcoded in JSX, heavily client-rendered for animation. No database, auth, API routes, CMS, or server actions.

**Workspace layout note:** The git/npm project lives in `richmonks/`. The parent folder `Webiste-2/` also contains `Richmonks_Website_Content.docx` (content source document; not part of the Next.js build).

---

# 2. Technology Stack

| Category | Technology | Version / notes |
|----------|------------|-----------------|
| Framework | **Next.js** | `16.2.3` (App Router) |
| UI library | **React** / **React DOM** | `19.2.4` |
| Language | **JavaScript (JSX)** | No TypeScript; `jsconfig.json` only |
| Styling | **Tailwind CSS** | `^3.4.19` |
| CSS processing | **PostCSS** + **Autoprefixer** | `^8.5.9` / `^10.4.27` |
| Animation | **Framer Motion** | `^12.38.0` |
| Icons | **lucide-react** | `^1.8.0` (+ custom X/LinkedIn SVGs in Footer) |
| Class merging | **clsx** + **tailwind-merge** | Via unused `cn()` helper in `lib/utils.js` |
| Fonts (runtime) | **Google Fonts** | DM Serif Display + Inter via CSS `@import` |
| Fonts (installed, unused in source) | `@fontsource/dm-serif-display`, `@fontsource/inter` | `^5.2.8` — packages present; **not imported** in app code |
| UI component library | **None** | No shadcn, MUI, Radix, Chakra, etc. Empty `components/ui/` |
| Form libraries | **None** | Raw controlled inputs + `useState` |
| State management | **React local state only** | No Zustand, Redux, Jotai, Context providers |
| Data fetching | **None** | No React Query, SWR, Apollo, axios |
| Charts | **None** | Canvas/SVG decorative visuals only |
| Authentication | **None** | — |
| Database / ORM | **None** | — |
| API / backend | **None** | Static export precludes Next API routes in this deploy mode |
| Analytics | **None found** | No GA, GTM, Plausible, etc. |
| Lint | **ESLint 9** + `eslint-config-next` (core-web-vitals) | Flat config |
| Prettier | **Not configured** | — |
| Testing | **None** | No Jest, Vitest, Playwright, Cypress |
| Path alias | `@/*` → project root | `jsconfig.json` |

### Build / deploy tools

- **Scripts:** `next dev`, `next build`, `next start`, `eslint`
- **Static export:** `next.config.mjs` → `output: 'export'` writes to `out/`
- **Trailing slashes:** enabled (`trailingSlash: true`) — URLs like `/about/`
- **Images:** `images.unoptimized: true` (required / typical for static export without an image optimizer)
- **Agent notes:** `AGENTS.md` / `CLAUDE.md` warn that Next.js 16 may differ from training data; consult `node_modules/next/dist/docs/` when needed

---

# 3. Folder Structure

## Workspace

```
Webiste-2/
├── Richmonks_Website_Content.docx   # Editorial content (outside app)
└── richmonks/                       # ← Next.js application root
```

## Application root (`richmonks/`)

```
richmonks/
├── app/                 # App Router: pages, layouts, SEO files, app icon
├── components/          # UI sections grouped by page domain
│   ├── layout/          # Navbar, Footer
│   ├── home/
│   ├── about/
│   ├── approach/
│   ├── technology/      # Risk + Innovation (used from Approach page)
│   ├── team/
│   ├── contact/
│   ├── legal/
│   └── ui/              # Empty placeholder (.gitkeep only)
├── lib/                 # Shared helpers (animations, cn)
├── styles/              # globals.css design system
├── public/              # Static assets + manifest
├── out/                 # Static export output (build artifact; gitignored)
├── .next/               # Build cache (gitignored)
├── node_modules/
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
├── eslint.config.mjs
├── jsconfig.json
├── package.json
├── AGENTS.md / CLAUDE.md / README.md
└── PROJECT_CONTEXT_NEW.md  # This document
```

### Folder responsibilities

| Folder | Responsibility | Interactions |
|--------|----------------|--------------|
| `app/` | Routes, root/nested layouts, metadata, sitemap, robots | Imports components; imports `styles/globals.css` in root layout |
| `components/` | Presentational + interactive UI sections | Import `@/lib/animations`, lucide, framer-motion; pages import these |
| `lib/` | Shared animation variants + `cn()` utility | Consumed by components/pages; `cn` currently unused |
| `styles/` | Global CSS variables, component classes, utilities | Imported once from `app/layout.jsx` |
| `public/` | Logos, icons, manifest, leftover template SVGs | Referenced as absolute paths (`/logo-v2.png`) |

### Folders that do **not** exist

`hooks/`, `utils/` (top-level), `services/`, `actions/`, `context/`, `providers/`, `store/`, `types/`, `api/`, `pages/` (Pages Router), `middleware.js(ts)`.

---

# 4. App Router Structure

**Router:** App Router only. No `pages/` directory.

**Pattern:** Almost every route page is a **Client Component** (`'use client'`) that wraps content in Framer Motion `AnimatePresence` + `pageTransition`, and **includes Navbar + Footer locally** (not in root layout). Nested layouts are **Server Components** that only export `metadata` and return `children`.

| URL | File(s) | Purpose | Layout | Components rendered | RSC / Client | Data source | Dynamic | Metadata |
|-----|---------|---------|--------|---------------------|--------------|-------------|---------|----------|
| `/` | `app/page.jsx` | Home / brand landing | Root only | Navbar, HeroSection, PillarsSection, MarketStateSection, TestimonialsSection, DisclaimerStrip, Footer | Client | Hardcoded JSX | No | Root defaults |
| `/about/` | `app/about/page.jsx` + `layout.jsx` | Philosophy, founders, brand story | About metadata layout | Navbar, AboutHero, WhyItWorks, FoundersSection, RichmonksWay, Footer | Client page | Hardcoded | No | About title/description/OG/Twitter/canonical |
| `/approach/` | `app/approach/page.jsx` + `layout.jsx` | Methodology + risk | Approach metadata layout | Navbar, ApproachHero, PipelineSection, RiskOversightSection, ClosingThought, Footer; **imports but comments out** PhilosophyDeep, InnovationSection | Client page | Hardcoded | No | Approach SEO |
| `/team/` | `app/team/page.jsx` + `layout.jsx` | Org structure + closing CTA | Team metadata layout | Navbar, TeamHero, TeamStructure, TeamClosing, Footer; **TeamCulture commented out** | Client page | Hardcoded | No | Team SEO |
| `/contact/` | `app/contact/page.jsx` + `layout.jsx` | Contact info + form | Contact metadata layout | Navbar, ContactHero, ContactMain, Footer | Client page | Local form state | No | Contact SEO |
| `/legal/` | `app/legal/page.jsx` + `layout.jsx` | Disclaimers & legal | Legal metadata layout | Navbar, LegalHero, LegalContent, LegalClosing, Footer | Client page | Hardcoded legal copy | No | Legal SEO |
| `/technology/` | `app/technology/page.jsx` + `layout.jsx` | **Legacy redirect** to `/approach` | Technology layout sets `robots.index: false`, canonical → approach | `useRouter().replace('/approach')`; returns `null` | Client | N/A | No | Noindex; canonical approach |

### SEO route helpers

| File | Role |
|------|------|
| `app/sitemap.js` | Static sitemap (`force-static`); routes: `/`, `/about/`, `/approach/`, `/team/`, `/contact/`, `/legal/` — **excludes** `/technology/` |
| `app/robots.js` | Allow `/`; disallow `/api/`, `/_next/`; sitemap + host = richmonks.in |
| `app/icon.jpg` | App Router icon asset (alongside `public/icon-white.jpg` referenced in metadata) |

### Missing App Router special files

No `loading.jsx`, `error.jsx`, `global-error.jsx`, `not-found.jsx`, or `template.jsx`. Defaults apply.

---

# 5. Layout Architecture

## Root layout (`app/layout.jsx`)

- **Server Component** (no `'use client'`)
- Imports `@/styles/globals.css`
- Sets `lang="en"` `dir="ltr"`
- Injects Google Fonts preconnect links
- Injects **Organization JSON-LD** via `dangerouslySetInnerHTML`
- Renders `{children}` only — **no Navbar, Footer, or providers**
- Exports comprehensive `metadata` and `viewport` (`themeColor: #1A6FA8`)

## Nested layouts

Each of `about`, `approach`, `team`, `contact`, `legal`, `technology` has a layout that:

```jsx
export const metadata = { /* page SEO */ }
export default function XLayout({ children }) {
  return children
}
```

These exist solely so **Client page components** can still have route-level metadata (metadata must be exported from a Server Component).

## Providers / theme

- **No React Context providers**, ThemeProvider, or dark-mode toggle
- Theme is **light-only**, encoded in CSS variables + Tailwind tokens
- No next-themes

## Navigation

- Implemented in `components/layout/Navbar.jsx` (fixed, scroll-aware)
- Duplicated link lists also live in Footer
- Active route via `usePathname()`

## Shared layouts

There is **no shared marketing layout** wrapping Navbar/Footer. Every page re-imports them. This is intentional or residual — either way, changing chrome requires editing each page (or extracting a shared layout later).

## Loading / Error / Not Found

| Concern | Status |
|---------|--------|
| Loading UI | Not implemented |
| Error boundaries | Not implemented (no `error.jsx`) |
| Not found | Next.js default only |

---

# 6. Component Architecture

**Convention:** Almost all components are `'use client'`, take **no props**, and own their section markup + hardcoded content arrays.

**Reusable system components:** Minimal — there is no shared Button/Card/Input component module. Buttons use global CSS classes (`.btn-primary`, etc.). Cards often use `.card` or inline styles.

---

## Layout

### `Navbar` — `components/layout/Navbar.jsx`

| Aspect | Detail |
|--------|--------|
| Purpose | Fixed top navigation with desktop links, CTA, mobile drawer |
| Props | None |
| State | `scrolled` (scrollY > 60), `mobileOpen` |
| Dependencies | `next/link`, `usePathname`, framer-motion, lucide Menu/X, animation stagger variants |
| Used on | Every content page |
| Reusability | Site-wide chrome; not parameterized |

### `Footer` — `components/layout/Footer.jsx`

| Aspect | Detail |
|--------|--------|
| Purpose | Dark 4-column footer: brand, nav, contact, legal |
| Props | None |
| Dependencies | next/link, framer-motion, lucide Mail/MapPin, custom XIcon/LinkedInIcon |
| Used on | Every content page |
| Notes | Social Twitter/LinkedIn `href: '#'` placeholders; email `info@richmonks.in` |

---

## Navigation (related)

Navigation is only Navbar + Footer link lists. No breadcrumbs, sidebars (except Legal TOC), or mega-menus.

---

## Hero sections

| Component | Page | Purpose / key content |
|-----------|------|----------------------|
| `HeroSection` | Home | Full-viewport “Trust. Trade. Earn.”; ParticleNetwork; CTAs to Approach/About; scroll to `#pillars` |
| `AboutHero` | About | “Where Markets Meet Mathematical Precision.”; badges Research-Led / System-Driven / Data-Grounded |
| `ApproachHero` | Approach | “From Quantitaive Modelling…” *(typo)*; flow RESEARCH→MODEL→EXECUTE→REFINE; tech badges |
| `TeamHero` | Team | “The People Behind the Process.”; Researchers / Engineers / Market Specialists |
| `ContactHero` | Contact | “Connect With Us.”; professional inquiries / discretion badges |
| `LegalHero` | Legal | Legal intro; “Last Updated: 2025”; balance-scale visual |

---

## Sections — Home

| Component | Purpose | Key data |
|-----------|---------|----------|
| `PillarsSection` | Three brand principles | Trust / Trade / Earn cards with tags |
| `MarketStateSection` | “Our Edge” stats + advantages | 2,400+ days; 75+ variables; 4 edge cards; SVG connector |
| `TestimonialsSection` | Social proof | 4 anonymized trader testimonials + trust strip |
| `DisclaimerStrip` | Compact legal banner | Informational only / not advice |
| `ParticleNetwork` | Canvas particle graph | Used **only** by HeroSection |
| `PhilosophySection` | Split philosophy + SVG pipeline | **ORPHAN — not imported by any page** |

---

## Sections — About

| Component | Purpose | Key data |
|-----------|---------|----------|
| `WhyItWorks` | Dark statement + data-grid canvas | “Markets Follow Phases…”; unused `statPills` defined |
| `FoundersSection` | Two founder cards + quote | Rajesh Mehra; Ayush Kharkia; proprietary variable names |
| `RichmonksWay` | Name etymology + CTA band | Trust/Trade/Earn tagline; link to Approach |
| `PhilosophyDeep` | Market-state philosophy cards | Soft orphan — imported on Approach but **commented out** |
| `WhoWeAre` | Firm profile split | **ORPHAN — never imported** |

---

## Sections — Approach / Technology

| Component | Purpose | Status |
|-----------|---------|--------|
| `PipelineSection` | 4-stage trading pipeline | Active |
| `RiskOversightSection` | Risk philosophy + 7 items + marquee | Active on Approach; CSS/IO animations (no framer) |
| `ClosingThought` | Dark CTA to Contact / Team | Active |
| `InnovationSection` | Continuous innovation 4 cards | Soft orphan (commented on Approach) |

---

## Sections — Team

| Component | Purpose | Status |
|-----------|---------|--------|
| `TeamStructure` | Leadership + 3 role cards + org connectors | Active |
| `TeamCulture` | Culture pillars + hex visual | Soft orphan (commented on Team page) |
| `TeamClosing` | Gradient CTA band | Active |

---

## Contact

| Component | Purpose |
|-----------|---------|
| `ContactMain` | Contact cards + inquiry form + success UI |

---

## Legal

| Component | Purpose |
|-----------|---------|
| `LegalContent` | Sticky TOC + 4 legal sections + acceptance |
| `LegalClosing` | Summary cards + return home |

---

## Forms / Inputs / Buttons / Cards / Modals / etc.

| Category | Implementation |
|----------|----------------|
| **Forms** | Only ContactMain form (see §15) |
| **Inputs** | Inline styled `<input>` / `<textarea>` in ContactMain — no shared Input component |
| **Buttons** | Global CSS `.btn-primary`, `.btn-outline`, `.btn-accent`; often applied to `<Link>` or `motion.div` |
| **Cards** | Global `.card`; many one-off styled cards; philosophy glass cards; edge blocks |
| **Tables** | None |
| **Charts** | None (decorative SVG/canvas only) |
| **Modals / Dialogs** | None |
| **Alerts** | Inline disclaimer callouts (Info icon blocks); no toast system |
| **Loaders** | None |

---

## Internal subcomponents (not separate files)

Several files define local helpers: `StatCard`, `EdgeAdvantageCard`, `FounderCard`, `DataGridCanvas`, `SectionHeader`, stage renderers in Pipeline, icon helpers in Footer, etc. These are **not** exported for reuse.

---

# 7. Design System

## Brand positioning (visual)

Light institutional fintech look: cool blue primary, green accent, soft gray-blue surfaces, serif display headlines + Inter body. **Not** dark-mode-first (though some sections use dark ink backgrounds for drama).

## Color palette

### CSS variables (`styles/globals.css` `:root`)

| Token | Hex / value | Role |
|-------|-------------|------|
| `--color-primary` | `#1A6FA8` | Brand blue |
| `--color-primary-light` | `#4DA3DB` | Light blue |
| `--color-primary-dark` | `#104368` | Dark blue |
| `--color-accent` | `#2EAA4A` | Brand green |
| `--color-accent-light` | `#55C672` | Light green |
| `--color-accent-dark` | `#1A6630` | Dark green |
| `--color-bg` | `#F2F5F9` | Page background |
| `--color-surface` | `#FFFFFF` | Cards / surfaces |
| `--color-surface-2` | `#E4EAF3` | Secondary surface |
| `--color-surface-3` | `#CDD8E8` | Tertiary surface |
| `--color-border` | `#D0DCE8` | Borders |
| `--color-border-subtle` | `rgba(26,111,168,0.12)` | Soft borders |
| `--color-ink` | `#0F1C2E` | Primary text / dark footer bg |
| `--color-ink-light` | `#2C3E55` | Body text |
| `--color-ink-muted` | `#5A7184` | Muted text |
| `--color-ink-faint` | `#9EB3C2` | Faintest text |

### Tailwind mirrors

Extended `blue`/`green` scales (50–950), `surface`, `ink`, aliases `primary`, `accent`, `background`.

### Section-specific accents

- Philosophy section uses teal `#2E9E82` (slightly different from brand accent)
- Risk oversight uses near-black `#080d1a` with neon-green cyber aesthetic

## Typography

| Role | Family | Source |
|------|--------|--------|
| Display / headings | **DM Serif Display** | Google Fonts `@import` + Tailwind `font-display` |
| Body / UI | **Inter** (300–800) | Google Fonts + `font-body` |

### Heading clamp sizes (globals)

- h1: `clamp(2.5rem, 5vw, 4.5rem)`
- h2: `clamp(2rem, 4vw, 3rem)`
- h3: `clamp(1.5rem, 3vw, 2rem)`
- h4: `clamp(1.25rem, 2vw, 1.5rem)`

### Tailwind display sizes

`display-2xl` (4.5rem) … `display-sm` (1.875rem) with tight letter-spacing.

### Weights

Inter used at medium/semibold/bold for UI; section labels often `font-weight: 700` uppercase tracking.

## Border radius

| Use | Typical value |
|-----|----------------|
| Buttons | `4px` |
| Cards (`.card`) | `8px` |
| Larger panels | `12px`–`16px` (`rounded-xl` / `rounded-2xl`) |
| Data badges / pills | `100px` (pill) |
| Philosophy glass | `14px` |

## Shadows

| Token | Value |
|-------|--------|
| `--shadow-card` | `0 2px 20px rgba(26,111,168,0.08)` |
| `--shadow-card-hover` | `0 8px 40px rgba(26,111,168,0.16)` |
| `--shadow-blue-glow` | `0 0 30px rgba(26,111,168,0.25)` |
| `--shadow-green-glow` | `0 0 30px rgba(46,170,74,0.25)` |

Tailwind also defines `shadow-card`, `shadow-card-hover`, `shadow-blue-glow`, `shadow-green-glow`, `shadow-inner-blue`.

## Spacing scale

- Section padding: `--section-padding-y: 6rem` (3.5rem ≤640px); `--section-padding-x: 2rem` (1.25rem mobile)
- Container max: `--container-max: 1280px` via `.container-richmonks`
- Tailwind default spacing used heavily in components

## Animations

### Shared Framer variants (`lib/animations.js`)

`fadeIn`, `fadeInUp/Down/Left/Right`, `scaleIn`, `scaleInSpring`, `staggerContainer`, `staggerContainerSlow`, `staggerItem`, `slideInLeft/Right`, `cardHover`, `drawLine`, `drawLineDelayed`, `timelineItem`, `pipelineNode`, `floatAnimation`, `floatAnimationSlow`, `glowPulse`, `accentGlowPulse`, `particleDrift`, `counterVariant`, `pageTransition`, `viewportConfig` (`once: true`, `margin: '-80px'`).

### Tailwind keyframe animations

`float`, `pulse-slow`, `slide-up`, `fade-in`, `draw-line`, `ticker`, `glow-pulse`, `data-flow`.

### CSS-only specialty animations

`scanLine`, `edgeSpinePulse`, Risk Oversight marquee / card reveals, ParticleNetwork RAF canvas.

### Easing

CSS: `--transition-base`, `--transition-spring`, `--transition-slow`. Tailwind: `spring`, `smooth`, `sharp`.

## Icons

- Primary: **lucide-react**
- Custom inline SVGs: X (Twitter), LinkedIn in Footer; custom philosophy icons in PhilosophyDeep

## Responsive breakpoints

Uses Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, etc.

Custom media in globals:

- `max-width: 640px` — section padding shrink
- `max-width: 480px` — body font slightly smaller
- `max-width: 768px` — philosophy mobile stacking

Navbar switches at `lg` (hamburger below).

## Button styles

| Class | Look |
|-------|------|
| `.btn-primary` | Blue fill, white text, hover darken + glow + lift |
| `.btn-outline` | Transparent + blue border, hover fill |
| `.btn-accent` | Green fill, hover darken + green glow |

Shared: Inter 600, ~0.9375rem, padding `0.875rem 2rem`, radius 4px, border 2px.

## Input styles

Contact form only: surface background, 2px border, focus primary border + soft blue ring (`0 0 0 3px rgba(26,111,168,0.1)`), left icon inset for text fields.

## Card styles

`.card`: white, subtle blue border, 8px radius, card shadow; hover: stronger shadow, `-4px` translateY.

Also: glass cards (philosophy), edge-block hover bars, cyber glass risk cards.

## Hover effects

Lift (`translateY`), glow shadows, underline scale on nav, color morph on footer links, Framer `cardHover`, philosophy accent underlines, edge accent bar growth.

---

# 8. Styling Architecture

## Tailwind organization

- Config: `tailwind.config.js` with `content` scanning `app/`, `components/`, `lib/`
- Theme **extended** (not replaced) with brand tokens
- No Tailwind plugins
- Utility-first in JSX, supplemented by global component classes

## Global CSS (`styles/globals.css`)

Layers:

1. Google Fonts `@import`
2. `@tailwind base/components/utilities`
3. `:root` CSS variables
4. Mobile variable overrides
5. Base resets + typography + selection + scrollbar
6. `@layer components` — container, section padding, buttons, card, labels, gradients, badges, noise
7. Outside-layer specialty classes (scan-line, edge-*, philosophy-*)
8. `@layer utilities` — text-balance, text-pretty, no-scrollbar

## Custom utilities

`.text-balance`, `.text-pretty`, `.no-scrollbar`, plus many named component classes listed above.

## CSS variables

Centralized in `:root`; widely used via `style={{ color: 'var(--color-…)' }}` inline styles (heavy pattern in this codebase).

## Theme handling

Static light theme only. Dark sections are **local background choices**, not a theme mode.

## Reusable styling patterns

1. `container-richmonks` + `section-padding`
2. `section-label` uppercase accent eyebrow
3. `divider-blue` short gradient rule
4. Hero pattern: watermark word + particles + float shapes + fadeIn splits
5. Closing CTA bands: primary gradient or ink dark + particles + dual CTAs
6. Mix of Tailwind classes and inline CSS variables (inconsistent but pervasive)

---

# 9. State Management

| Approach | Used? | Where / for what |
|----------|-------|------------------|
| React `useState` / `useEffect` / `useRef` | **Yes** | Navbar scroll/menu; form fields; particles; legal TOC active section; IntersectionObservers; canvas dims |
| React Context | **No** | — |
| Zustand | **No** | — |
| Redux | **No** | — |
| React Query | **No** | — |
| SWR | **No** | — |
| URL state | Minimal | `usePathname` for active nav; `/technology` redirect via router |

**Conclusion:** Ephemeral UI state only. No global store. No persisted client state.

---

# 10. Data Fetching

| Mechanism | Status |
|-----------|--------|
| Server Components data fetch | Not used for content (layouts are metadata-only) |
| Client `fetch()` | **Not found** in source |
| API routes | **None** |
| Server Actions | **None** |
| React Query / SWR | **None** |
| Caching / revalidation / ISR | N/A for content — **static export** |
| SSR | Root layout + nested metadata layouts are server-rendered; pages are client |
| SSG / static export | **Primary model** — entire site prebuilt to `out/` |

All marketing copy and structured lists are **hardcoded in component modules**.

Contact form “submit” does **not** call a network API; it only flips local `submitted` state.

---

# 11. API Layer

## API routes

**None.** `app/api/` does not exist. `robots.js` disallows `/api/` preemptively.

Static export (`output: 'export'`) means traditional Next.js Route Handlers would not run on a static host anyway without a separate backend.

## Server actions

**None.**

## External APIs

| External resource | Use |
|-------------------|-----|
| Google Fonts | CSS `@import` + preconnect |
| Mailto links | `info@richmonks.in` |
| Social placeholders | `#` |

## Request / response / error handling

N/A for application data. Form validation is client-side emptiness checks only (see §15).

---

# 12. Authentication

**Not implemented.**

| Concern | Status |
|---------|--------|
| Login / Logout | None |
| Session management | None |
| Middleware | No `middleware.js` |
| Protected routes | None |
| Roles / permissions | None |
| Tokens | None |

The contact page language (“professional inquiries,” “discretion”) is **copy**, not access control.

---

# 13. Database

**Not implemented.**

| Concern | Status |
|---------|--------|
| Database | None |
| ORM | None |
| Models / relations | None |
| Migrations | None |
| Queries | None |

All “business data” (founders, testimonials, pipeline stages, legal sections) lives as **constants inside JSX files**.

---

# 14. Business Logic

This site’s “business logic” is **editorial and compliance messaging**, not computational trading logic.

## Brand / product narrative

1. Richmonks is a **systematic / algorithmic** firm — not discretionary day-trading marketing.
2. Tagline triad: **Trust → Trade → Earn** (process before outcomes).
3. Focus: **equity & F&O** in India.
4. Claimed research scale (marketing numbers in UI): **2,400+** trading sessions/days analysed; **75+** market & proprietary variables.
5. Proprietary concepts named in founder bio (inferred as brand IP, not implemented code): Profit Meter, SumLong, SumShort, Market Sentimeter, Call/Put Velocity, Triggerpoint, FNO Index.
6. Market-state-first philosophy: classify regime → set directional bias → select systematically → execute with discipline.
7. Explicit exclusions in messaging: **no discretion**, **no intraday / reactive trading**, **no forced activity**, capital preservation / process stability.

## User flows

### Browse marketing content

Landing → About / Approach / Team → Contact or Legal via nav/footer.

### Contact inquiry (UI-only)

1. User fills name, email, organization, message (all required by client check).
2. Clicks “Send Message” (`motion.div` onClick — **not** a native form submit).
3. If all fields non-empty → success view (“Message Received”).
4. **No email is sent; no data is stored or transmitted.**
5. “Send Another” resets state.

### Legacy technology URL

Visit `/technology` → client `router.replace('/approach')`; page is noindexed.

## Validation

- Contact: non-empty check only (no email regex, no length limits, no spam protection).
- No schema validation libraries.

## Calculations / filtering / search / sorting

**None** in the application sense. Legal TOC uses IntersectionObserver for active section highlighting (UI, not search).

## Permissions

None. All routes public.

## Compliance / legal business rules (content)

From Legal page + repeated disclaimers:

1. **No solicitation** of investment; no trading services via website; educational/informational only.
2. **IP protection** of written content, visual brand, methodologies/models.
3. **Privacy:** confidentiality claim; no third-party commercial sharing claim (no actual privacy backend).
4. **Accuracy:** no warranties; content may change; users should do due diligence.
5. **Acceptance:** continued use implies acceptance.
6. Testimonials shown as “Verified Trader” with roles — **inferred** marketing; verification mechanism not in code.

## Contact / address facts (hardcoded)

- Emails: `info@richmonks.in` (Footer, Contact); `connect@richmonks.in` (Legal TOC + JSON-LD) — **inconsistency**
- Address: 702, Sunil Enclave, Off Andheri Kurla Road, Andheri (E), Mumbai - 400099, India
- Copyright year in Footer/Legal: **2025**

## Founders (content)

| Name | Role | Highlights |
|------|------|------------|
| Rajesh Mehra | Founder & Market Strategist | 30+ years finance/trading; proprietary variables; rule-based systems |
| Ayush Kharkia | Co-Founder & CTO | Full-stack IT / scalable real-time algo infrastructure |

## Team structure (content)

Leadership (Founders) → Quantitative Research / Technology & Infrastructure / Risk & Compliance teams with skill tags.

## Pipeline stages (content)

1. Market State Classification  
2. Directional Bias (Long / Short / Limited)  
3. Systematic Selection  
4. Execution Discipline (stops, structured holds)

## Risk items (content)

Exposure Control; No Forced Activity; Alignment-Based Control; Defined Risk Per Trade; Defined Holding Structure; Process Stability; Risk Philosophy statement + ticker marquee phrases.

---

# 15. Forms

## Contact inquiry form (`ContactMain.jsx`)

| Field | Type | Required (client) |
|-------|------|-------------------|
| Full Name | text | Yes (non-empty) |
| Email Address | email input type | Yes (non-empty; **no format validation**) |
| Organization | text | Yes |
| Message | textarea | Yes |

### Validation

```js
if (formData.name && formData.email && formData.organization && formData.message) {
  setSubmitted(true)
}
```

No error messages if incomplete — button click simply does nothing visible when fields are empty *(inferred UX gap)*.

### Submission

- Trigger: `onClick` on styled `motion.div` (not `<form onSubmit>`)
- Backend: **none**
- Success: AnimatePresence swaps to CheckCircle success panel
- Reset: `handleReset` clears fields and `submitted`

### Error handling

No network errors possible. No field-level error UI.

---

# 16. Custom Hooks

**None.** No `hooks/` directory and no shared `use*` modules.

Hooks used inline inside components include: `useState`, `useEffect`, `useRef`, `useCallback` (ParticleNetwork), `usePathname`, `useRouter`, Framer Motion `useInView` (in several sections).

---

# 17. Utility Functions

## `lib/utils.js`

```js
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

**Status:** Present for Tailwind class merging; **not imported anywhere in current source** (dead utility).

## `lib/animations.js`

Shared Framer Motion variant factory/objects (listed in §7). Heavily imported across pages and components.

## `generateParticles()` (local in multiple heroes)

Client-only random particle position generators inside Hero/About/Team/Contact/RichmonksWay/TeamClosing to avoid SSR mismatch — typically set in `useEffect`.

## Constants

Most constants are **colocated** with components (pillars, stages, founders, testimonials, tocLinks, RISK_ITEMS, etc.) rather than centralized in `lib/constants`.

## Date utilities / API helpers / validation libs

**None.**

---

# 18. Assets

## `public/`

| File | Use |
|------|-----|
| `logo-v2.png` | Navbar, Footer, Open Graph / Twitter / JSON-LD logo |
| `icon-white.jpg` | Favicon/apple icons in metadata; PWA manifest icons (192 & 512 entries point to same file) |
| `manifest.json` | Web app manifest |
| `file.svg`, `globe.svg`, `window.svg` | Default create-next-app leftovers; **not referenced** in app source |

## `app/icon.jpg`

App Router metadata icon (duplicate of brand icon family).

## Fonts

Loaded from Google Fonts CDN in CSS — not self-hosted despite `@fontsource/*` packages in `package.json`.

## Images in components

Logos use raw `<img src="/logo-v2.png">` — **not** `next/image` (consistent with `images.unoptimized` / static export simplicity).

No photography of people/office beyond monogram avatars (CSS initials for founders).

---

# 19. Performance Optimizations

| Technique | Status |
|-----------|--------|
| Dynamic `import()` / `next/dynamic` | **Not used** |
| Lazy loading components | Not used |
| `next/image` optimization | Disabled (`unoptimized: true`); `<img>` used |
| React.memo / useMemo | Essentially unused; `useCallback` only in ParticleNetwork |
| Suspense / streaming | Not used in app code |
| Framer `viewport={{ once: true }}` | Used widely — animations run once |
| ParticleNetwork mobile particle count | Reduced (22 vs 55) |
| prefers-reduced-motion | Honored in RiskOversightSection (inferred good practice there) |
| Bundle | Full client pages pull framer-motion per route; no code-splitting strategy beyond route segments |
| Static export | Fast CDN hosting possible; no server runtime |

**Note:** Making nearly every page `'use client'` for page transitions increases client JS vs a Server Component shell + client islands pattern.

---

# 20. SEO

## Metadata (root)

- Title template: `%s | Richmonks`
- Default title includes “Quantitative Trading Firm India”
- Keywords: quantitative/algo/systematic trading, fintech India, etc.
- Canonical: `/`
- Icons + manifest
- Open Graph: `en_IN`, siteName Richmonks, logo image
- Twitter: `summary` card
- Robots: index/follow with googleBot previews
- Other: geo IN, content-language en-IN

## Per-route metadata

Each nested layout sets title, description, canonical absolute URL, OG, Twitter.

Technology layout: **`robots: { index: false, follow: true }`** + canonical to approach.

## Structured data

Organization JSON-LD in root layout: name, url, logo, description, email `connect@richmonks.in`, addressCountry IN, foundingDate 2025, employee range 10–50, industry, knowsAbout topics. `sameAs: []` empty.

## Sitemap / robots

- `app/sitemap.js` — static list with priorities
- `app/robots.js` — allow site, disallow `/api/` and `/_next/`

## Gaps / notes

- No FAQ/BreadcrumbList schema beyond Organization
- Social `sameAs` empty
- README still mentions Geist/`page.js` from create-next-app — outdated relative to actual app

---

# 21. Error Handling

| Area | Behavior |
|------|----------|
| Error boundaries | Not defined |
| API errors | N/A |
| Validation errors | Silent no-op on incomplete contact form |
| Loading states | None |
| Empty states | N/A (static content) |
| Redirect failure | Technology page returns `null` until replace runs — brief blank flash possible |

---

# 22. Configuration

## `next.config.mjs`

```js
{
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
```

## `jsconfig.json`

Path alias `@/*` → `./*`. No strict TS options (JS project).

## ESLint (`eslint.config.mjs`)

Flat config extending `eslint-config-next/core-web-vitals`; ignores `.next`, `out`, `build`, `next-env.d.ts`.

## Prettier

Not present.

## Environment variables

- No `.env` / `.env.example` in repo
- No `process.env` usage in source
- Site URL hardcoded as `https://www.richmonks.in`
- `.gitignore` ignores `.env*` for future use

## Middleware

None.

## `package.json` scripts

| Script | Command |
|--------|---------|
| `dev` | `next dev` |
| `build` | `next build` (produces static `out/`) |
| `start` | `next start` *(less relevant for pure static hosting; still present)* |
| `lint` | `eslint` |

---

# 23. Code Patterns

## Naming

- Components: **PascalCase** filenames matching default export (`HeroSection.jsx`)
- Folders: lowercase domain names (`home`, `about`, …)
- CSS variables: `--color-*`, `--shadow-*`, `--section-*`
- Animation exports: camelCase verbs (`fadeInUp`)

## Component organization

- **By page domain**, not by atomic design
- Page files are thin composers of sections
- Little shared UI kit; duplication of hero/particle patterns is common

## File organization

- Colocate content arrays with the section that renders them
- Soft-disable features by commenting JSX while leaving imports

## Import strategy

- Absolute `@/` alias preferred for lib/components/styles
- Relative import for sibling (`./ParticleNetwork`)

## Reusable patterns

1. Client page + `AnimatePresence` + `pageTransition` + Navbar/Footer
2. Hero: particles + watermark + badges + fade splits
3. `whileInView` + `viewportConfig` section reveals
4. Metadata-only nested layouts for SEO with client pages
5. Inline `style={{ color: 'var(--color-…)' }}` mixed with Tailwind

## Architectural decisions (confirmed / inferred)

| Decision | Rationale (inferred) |
|----------|----------------------|
| Static export | Simple hosting, no Node server |
| Client-heavy pages | Framer Motion page/section animations |
| Hardcoded content | Small marketing site; no CMS yet |
| Merge Approach + Technology | Technology redirects; approach owns methodology+risk |
| Empty `components/ui` | Prepared for future design system |

## Known content typos / inconsistencies (for maintainers)

- ApproachHero: “Quantitaive” → should be “Quantitative”
- Email split: `info@` vs `connect@`
- Footer social links are `#`
- README outdated (Geist / page.js)

---

# 24. Dependencies

| Package | Why it exists | Core / optional / replaceable |
|---------|---------------|-------------------------------|
| `next` | Framework, routing, static export, metadata | **Core** |
| `react` / `react-dom` | UI runtime | **Core** |
| `tailwindcss` + `postcss` + `autoprefixer` | Styling pipeline | **Core** |
| `framer-motion` | Page/section/micro animations | **Core** to current UX; replaceable with CSS |
| `lucide-react` | Icon set | **Core** for UI icons; replaceable |
| `clsx` + `tailwind-merge` | Intended for `cn()` | **Optional** today (unused); keep if adopting class composition |
| `@fontsource/*` | Self-host fonts | **Optional / currently unused** — replaceable by keeping Google Fonts or wiring these imports |
| `eslint` + `eslint-config-next` | Lint | **Dev core** |

No other major runtime libraries.

---

# 25. Project Strengths

1. **Clear domain folder structure** for a marketing site (home/about/approach/…)
2. **Cohesive design tokens** duplicated thoughtfully across CSS variables and Tailwind
3. **Shared animation vocabulary** in `lib/animations.js` keeps motion consistent
4. **Strong SEO baseline** (metadata, OG, Twitter, JSON-LD, sitemap, robots, canonicals, geo tags)
5. **Compliance messaging** repeated consistently (no solicitation / informational only)
6. **Static export** is operationally simple and CDN-friendly
7. **Responsive nav** with accessibility basics (`aria-label` on menu toggle, body scroll lock)
8. **Risk section** implements reduced-motion awareness
9. **Legacy URL handling** for `/technology` with noindex
10. **Brand narrative** (Trust/Trade/Earn + market-state pipeline) is coherent across pages

---

# 26. Improvement Opportunities

1. **Contact form is non-functional** — needs Formspree, serverless function, email API, or CMS form; users believe messages are sent
2. **Dead / soft-orphaned components** — `WhoWeAre`, `PhilosophySection`, commented PhilosophyDeep / InnovationSection / TeamCulture increase maintenance cost
3. **Unused dependencies/utilities** — `@fontsource/*`, `cn()`, template SVGs
4. **Navbar/Footer not in a shared layout** — duplication across every page
5. **Client-everything pages** — consider Server Component shells + client islands for less JS
6. **No `next/image`** — even with unoptimized, consistent Image component could help responsive attrs
7. **Email inconsistency** (`info@` vs `connect@`) and placeholder social `#` links
8. **No loading/error/not-found** custom UX
9. **Form UX gaps** — no validation messages; not a real `<form>`; no honeypot/CAPTCHA
10. **Content centralization** — magic strings scattered; a `content/` or CMS would scale better
11. **README stale** relative to actual stack
12. **No tests** for critical legal copy or form behavior
13. **Typo** in ApproachHero headline
14. **Accessibility** — some interactive `motion.div`/`span` click handlers should be buttons; verify focus management in mobile drawer
15. **Scalability** — static hardcoded site is fine until bilingual content, blog, careers CMS, or authenticated portal is needed — those require architecture change (and possibly abandoning pure `output: 'export'` if APIs are required on the same host)

---

# 27. Architecture Summary

## Startup → first paint

1. User requests a URL on the static host (or `next dev`).
2. Next serves the prebuilt HTML for that route (static export) with root layout shell.
3. Root layout applies global CSS, fonts preconnect, metadata, and Organization JSON-LD.
4. Nested layout (if any) contributed route metadata at build time.
5. Client JS hydrates the page component.

## Rendering a typical page

1. Client page mounts with `AnimatePresence` / `pageTransition`.
2. `Navbar` attaches scroll listener; highlights active path.
3. Section components mount; many register `whileInView` observers and/or generate decorative particles after mount.
4. `Footer` renders contact/legal chrome.
5. No data fetching occurs.

## User interaction

- Navigation uses Next.js `<Link>` client transitions between static pages.
- Mobile menu toggles local state and locks body scroll.
- Contact form mutates React state only; success UI is local.
- Legal TOC smooth-scrolls and updates `activeSection` via IntersectionObserver.
- `/technology` immediately replaces to `/approach`.

## Business logic layer

There is **no separate business/service layer**. Domain rules exist as:

- Marketing copy and structured arrays in components
- Legal disclaimer sections
- Client-side “all fields required” gate on the contact UI

## End-to-end mental model

```
Static files (out/)
    → HTML/CSS/JS for each route
        → Root layout chrome (meta + CSS + JSON-LD)
            → Client page composer
                → Navbar / Sections / Footer
                    → Framer Motion + CSS design system
                    → Hardcoded Richmonks content
                    → Optional local UI state (nav, form, TOC)
```

**In one sentence:** Richmonks is a statically exported, animation-rich Next.js 16 marketing website for an India-based quantitative trading firm, with SEO-complete public pages, compliance-forward copy, and no backend, auth, or database — the only interactive “application” feature is a contact form UI that does not yet persist or send data.

---

## Quick reference — Active route → section map

| Route | Active sections (in order) |
|-------|----------------------------|
| `/` | Hero → Pillars → MarketState → Testimonials → DisclaimerStrip |
| `/about/` | AboutHero → WhyItWorks → Founders → RichmonksWay |
| `/approach/` | ApproachHero → Pipeline → RiskOversight → ClosingThought |
| `/team/` | TeamHero → TeamStructure → TeamClosing |
| `/contact/` | ContactHero → ContactMain |
| `/legal/` | LegalHero → LegalContent → LegalClosing |
| `/technology/` | Redirect only |

---

## Quick reference — Orphan inventory

| Component | Status |
|-----------|--------|
| `home/PhilosophySection.jsx` | Unused |
| `about/WhoWeAre.jsx` | Unused |
| `about/PhilosophyDeep.jsx` | Imported, JSX commented |
| `technology/InnovationSection.jsx` | Imported, JSX commented |
| `team/TeamCulture.jsx` | Imported, JSX commented |
| `home/ParticleNetwork.jsx` | Used by Hero only (not orphan) |
| `lib/utils.js` `cn()` | Unused |
| `@fontsource/*` | Unused |
| `public/{file,globe,window}.svg` | Unused |

---

*End of PROJECT_CONTEXT_NEW.md*
