# PROJECT_CONTEXT.md — RichMonks Website

> **Purpose of this document:** Permanent technical knowledge base for AI assistants and developers migrating this application from PHP/Twig to Next.js.  
> **Do not summarize this file when using it as context — treat it as source of truth.**

---

## Source Analysis Notes

| Workspace folder | Status | Role |
|---|---|---|
| `website/` | **Primary source analyzed** | Live PHP + Twig + Gulp marketing/product website |
| `webiste/` | **Empty (0 files)** | Named by user as target folder; currently unused |
| `website-html/` | Static HTML mirror | Prototype / export with extra legal pages (`terms-of-use`, `contact`, `refund-and-cancellation-policy`) not present as routes in the PHP app |

**Inference:** The user instruction “use the folder webiste not website-html” likely meant the PHP application under `website/` (typo: *webiste* ↔ *website*). Documentation below is based entirely on `website/src` (source of truth) and supporting root configs. `dist/` is the Gulp build output and mirrors `src/` after build.

**Production domain (inferred/confirmed in code):** `https://richmonks.in/`  
**Backend market-data API base URL (confirmed):** `https://richmonks.in:7005/`  
**Company / product:** RichMonks (also styled RichMonk's / RichMonks) — F&O analytics app by **Finspark** (copyright footer: `© Finspark 2021`). Built by **Pixolo Productions** (footer SVG credit).  
**Founder (confirmed in About page):** Rajesh Mehra.

---

# 1. Project Overview

## What this application does

RichMonks is a **marketing + light product website** for an Indian **Futures & Options (F&O)** stock-market analytics mobile application. The website:

1. Markets the RichMonks mobile app (“Download App” CTAs throughout).
2. Displays **live / near-live market intelligence** pulled from a separate Finsparc/RichMonks HTTP API:
   - Fear & Greed style “Sentimeter”
   - FNO at a glance (Nifty / Bank Nifty / Profit Per Lot)
   - Tabbed market tables (Top Gainers, Top Losers, RichMonks Top 10, Most Active Calls/Puts)
   - A scrolling **stock ticker** in the header
   - Per-stock **Stock Profile** pages (Key Indicators + RichMonks Summary; other tabs gated behind “download app”)
3. Educates users via **Learn** (concepts + YouTube videos) and **About the App**.
4. Provides **Support/FAQ** and a **Privacy Policy**.
5. Optionally syncs CMS-like content (testimonials, FAQs, meta) from a **Google Sheet** into `data/data.json`.

It is **not** a full trading platform, broker, or authenticated web app. Trading decisions and deeper data are pushed to the native mobile app.

## Purpose of the website

- Acquisition / conversion funnel toward the mobile app.
- Public showcase of proprietary analytics concepts (Ranks, Score, Call/Put Velocity, Sentimeter, Profit Per Lot, Trigger Point).
- SEO / brand presence for RichMonks / Finspark.
- Lightweight free preview of market data to demonstrate product value.

## Primary users

1. **Retail F&O traders** in India looking for algo-assisted signals and market mood.
2. **Prospective app users** evaluating RichMonks before download.
3. **Existing app users** who land on stock-profile deep links from search or share.
4. **Internal / agency operators** (Pixolo) who run `/renew` to refresh Google Sheet → JSON content.

There is **no end-user login** on this website (confirmed by codebase inspection). Privacy Policy text *describes* app registration/social login, but that belongs to the **mobile Service**, not this PHP site.

## Business domain

- Indian equity derivatives (NSE F&O stocks, Nifty, Bank Nifty).
- Proprietary scoring / ranking / velocity / fear-greed analytics.
- Fintech / market-data SaaS wrapped as a consumer mobile app brand.

## Main workflow

```
Visitor lands on Home (/)
  → Sees hero + Download App CTA
  → Scrolls: Sentimeter, FNO glance, market tables (API-lazy-loaded)
  → Uses header search → Stock Profile /{SYMBOL}
  → Or navigates About / Learn / Support
  → CTAs push toward mobile app download
```

Content refresh (CMS path):

```
Operator hits /renew
  → Google Sheets API reads spreadsheet
  → PHP converts sheet → data/data.json
  → Home/Support Twig pages read JSON for FAQs/testimonials
```

---

# 2. Technology Stack

## PHP version

- **Not explicitly pinned** in repo (no `composer.json` platform config, no Dockerfile).
- **Inferred:** PHP 7.x–8.x compatible style. Uses `Twig_Environment` (Twig 1.x class alias style) while Composer requires `twig/twig: ^2.0` — environment may be transitional.
- Uses classic `require` / procedural PHP, not typed PHP 8 attributes.

## Framework used

- **Custom micro-framework**, not Laravel/WordPress/CodeIgniter.
- **Twig 2.x** for server-side HTML templates (`composer require twig/twig ^2.0`).
- Apache **mod_rewrite** via `.htaccess` for pretty URLs.
- Pattern: controller PHP file → `$twig->render('pages/....html', $data)`.

## Frontend libraries / CSS / JS

| Layer | Technology |
|---|---|
| CSS architecture | **SCSS** (Dart Sass via `gulp-sass`) |
| CSS framework | Partial **Bootstrap 3**-style grid/utilities (`modules/_bootstrap3.scss`) — not full Bootstrap UI kit |
| JS runtime libs | **jQuery 1.11.2**, jQuery Form, jQuery Validate |
| Carousel | **Slick** carousel |
| Scroll animation | **ScrollOut** |
| Full-page scroll | **fullPage.js** (loaded globally; **usage on pages is unconfirmed** — may be dead dependency) |
| Icons/fonts | Custom **Recoleta** display fonts; **Poppins** (self-hosted via Google Fonts CDN woff2); Font Awesome font files present under `assets/fonts/fa/` (**usage sparse / possibly unused in Twig**) |
| HTTP from browser | Native `fetch()` in `api.js` |

## Build tools

| Tool | Role |
|---|---|
| **Gulp 4** | Primary build pipeline (`gulpfile.js`) |
| `gulp-sass` + `sass` | Compile SCSS → compressed CSS |
| `gulp-autoprefixer` | Last 2 browser versions |
| `gulp-uglify` | Minify site + vendor JS |
| `gulp-clean-css` | Minify vendor CSS |
| `gulp-twig` | Compile Twig templates into `dist/templates` (also used for static preview path) |
| `gulp-changed` | Incremental copy |
| `del` | Clean `dist/` |
| `browser-sync` | Dev proxy to `localhost/richmonks-website/dist/` |
| `gulp-connect-php` | Listed as devDependency; **not wired** in current gulp tasks |
| npm package name | `"twig-framework"` |

**Build commands (inferred from gulpfile):**

- `gulp` / `gulp default` → build + watch + browser-sync
- `gulp build` → clean + copy + css + js + images + twig
- `gulp watch` → watch + browser-sync

## Third-party PHP packages (Composer)

From `composer.json`:

```json
{
  "require": {
    "twig/twig": "^2.0",
    "google/apiclient": "^2.0"
  }
}
```

Vendor tree also includes transitive deps: `guzzlehttp`, `monolog`, `phpseclib`, `psr/*`, `symfony/*`, `paragonie`, `ralouphie`, `firebase` (JWT — **inferred** transitive of Google client, not app Firebase SDK usage).

Custom vendor module (not Packagist): `src/vendor/google-sheet-data/` — Pixolo sheet→JSON engine.

## External services

| Service | Usage |
|---|---|
| **RichMonks/Finsparc API** `https://richmonks.in:7005/` | All live market data |
| **Google Sheets API** | CMS content sync via service account |
| **YouTube** | Learn page video links |
| **Google Fonts CDN** (`fonts.gstatic.com`) | Poppins woff2 files |
| **Pixolo Productions** | Agency credit link |
| App stores | Referenced in copy (“Play Store / App Store”) — **CTA buttons currently have no store URLs** |

---

# 3. Folder Structure

```
RM Website/
├── website/                 ← PHP application (ANALYZE & MIGRATE FROM HERE)
│   ├── package.json
│   ├── package-lock.json
│   ├── composer.json
│   ├── composer.lock
│   ├── gulpfile.js
│   ├── README.md
│   ├── .gitignore
│   ├── node_modules/        ← npm deps (do not migrate)
│   ├── src/                 ← SOURCE OF TRUTH
│   └── dist/                ← BUILD OUTPUT (mirrors src after gulp)
├── website-html/            ← Static HTML export / earlier prototype
└── webiste/                 ← EMPTY; ignore unless populated later
```

## `website/src/` detailed responsibilities

### `src/config.php`
Bootstrap: loads `config/constants.php` + `config/twig.php`.

### `src/config/`
- `constants.php` — path constants (`ROOT`, `AUTOLOADER`, `ASSETS_PATH`, `CONTROLLERS_PATH`, `DATA_PATH`, `LIB_PATH`, `TEMPLATES_PATH`, `ENGINE_PATH`).
- `twig.php` — Twig filesystem loader + environment (`cache: false`, `debug: false`, `strict_variables: false`).

### `src/controllers/`
PHP route handlers (page controllers + shared helpers).

| File | Role |
|---|---|
| `index.php` | Home |
| `example.php` | Front-controller router: `$_GET['tm']` → `include "./{$tm}.php"` |
| `about.php` | About |
| `learn.php` | Learn |
| `support.php` | Support/FAQ |
| `stock-profile.php` | Stock profile |
| `privacy-policy.php` | Privacy policy |
| `functions.php` | `getWebsiteJson()` helper |

### `src/templates/`
Twig templates.

- `components/` — head, library loaders, spinners.
- `sections/` — reusable page sections (header, footer, tables, FAQs, etc.).
- `pages/` — full HTML documents per route.

### `src/assets/`
- `scss/` — design system + page styles.
- `js/` — application JS.
- `images/` — raster/SVG images by page.
- `fonts/` — Recoleta, Poppins-related, FA, slick/lightgallery leftovers.
- `svg/` — brand/market iconography used in tables & hero.

### `src/lib/`
Vendored frontend libraries (jQuery, Slick, ScrollOut, fullPage) copied to `dist/lib` by Gulp.

### `src/data/`
- `data.json` — CMS content (meta, menu, testimonials, faqs). Written by `/renew`.

### `src/vendor/`
Composer packages + custom `google-sheet-data` engine.

### `src/.htaccess`
URL rewriting rules (see Routing).

### `src/vendor/google-sheet-data/`
| File | Role |
|---|---|
| `credentials.json` | Google service-account credentials (**SECRET — must not ship to client or public Next.js repo without rotation**) |
| `structure.php` | Schema for expected sheet→JSON shape |
| `sheet-data.php` | Google Sheets client + `getValuesFromSheet()` |
| `sheet-to-json.php` | Sheet rows → nested JSON transformer |
| `renew.php` | Entry point that writes `data.json` |

### `website/dist/`
Deployable Apache document root (inferred). Same structure as `src` plus compiled `assets/css/*.css`.

---

# 4. Routing

Routing is Apache rewrite → PHP controllers. Document root is expected to be `dist/` (or `src/` in some setups).

## Rewrite rules (from `src/.htaccess`)

```
RewriteEngine on
RewriteCond %{REQUEST_URI} !\.(?:css|js|jpe?g|gif|png|svg)$ [NC]

RewriteRule ^learn controllers/example.php?tm=learn [L]
RewriteRule ^about controllers/example.php?tm=about [L]
RewriteRule ^support controllers/example.php?tm=support [L]
RewriteRule ^stock-profile controllers/example.php?tm=stock-profile [L]
RewriteRule ^privacy-policy controllers/example.php?tm=privacy-policy [L]
RewriteRule ^renew vendor/google-sheet-data/pixrenew.php [L]   # NOTE: filename mismatch — actual file is renew.php
RewriteRule ^$ controllers/index.php [L]
```

**Confirmed bug:** rule points to `pixrenew.php` but file on disk is `renew.php`. Renew may be broken unless an alias exists on server.

**Confirmed gap:** No rewrite for `/stock-profile/{SYMBOL}`. Search links to `stock-profile/${symbol}`. Symbol is read client-side from `window.location.href` last path segment. Apache may still hit `stock-profile` rule if configured as prefix, or 404 depending on server — **behavior environment-dependent; inferred fragile**.

## Route inventory

### `/` — Home
- **PHP:** `controllers/index.php` (direct, not via example.php)
- **Template:** `templates/pages/index.html`
- **Purpose:** Marketing hero, Sentimeter, FNO glance, market tables, learn teaser, testimonials, FAQs
- **Components/sections:** `_head`, `_header`, `_download_app`, Sentimeter (inline), FNO (inline), `_tables`, Learn teaser (inline), `_testimonials`, `_faqs`, `_footer`, `_library-loader`, `index.js`
- **Data dependencies:**
  - Server: `data.json` via `getWebsiteJson()` → FAQs & testimonials (but see verbatim bug)
  - Client API: stock prices, sentimeter, FNO, table endpoints

### `/about` — About the App
- **PHP:** `controllers/example.php?tm=about` → `about.php`
- **Template:** `pages/about.html`
- **Purpose:** Product pitch, 6 “Elements”, founder quote, download CTA
- **Components:** header, footer, download_app; elements array defined in Twig
- **Data:** Static Twig only (no JSON, no API required for render)

### `/learn` — Learn
- **PHP:** `learn.php` via example router
- **Template:** `pages/learn.html`
- **Purpose:** YouTube video grid + long-form concept explanations (Ranks, Score/GBR, Velocity, Sentimeter, PPL, Trigger Point)
- **Components:** header, footer; inline View More JS
- **Data:** Static; YouTube URLs hardcoded

### `/support` — Support / FAQ
- **PHP:** `support.php`
- **Template:** `pages/support.html`
- **Purpose:** FAQ accordion only
- **Components:** `_faqs`, header, footer
- **Data:** `websiteData` from `data.json`

### `/stock-profile` and `/stock-profile/{SYMBOL}` — Stock Profile
- **PHP:** `stock-profile.php`
- **Template:** `pages/stock-profile.html`
- **Purpose:** Per-symbol analytics preview; upsell locked tabs
- **Components:** tabs; `_stockP_key_indicator`, `_stockP_locked` (×4), `_stockP_richmonks_summary`; `stock-profile.js`
- **Data:** Client APIs `viewKeyIndicators/{symbol}`, `viewStockprofileReview/{symbol}`; symbol from URL basename
- **Title:** PHP passes `basename($actual_link)` as Twig `title` (often literally `stock-profile` or the symbol)

### `/privacy-policy` — Privacy Policy
- **PHP:** `privacy-policy.php`
- **Template:** `pages/privacy-policy.html`
- **Purpose:** Legal privacy text (long-form static HTML inside Twig)
- **Data:** None

### `/renew` — Content refresh (internal)
- **PHP:** intended `vendor/google-sheet-data/renew.php` (htaccess name mismatch)
- **Purpose:** Pull Google Sheet → overwrite `data/data.json`
- **Auth:** **None in code** — open endpoint if publicly reachable (**security risk**)

### Not routed in PHP (exist only in `website-html/`)
- `contact.html`
- `terms-of-use.html`
- `refund-and-cancellation-policy.html`

Footer links many of these as `javascript:void(0)` placeholders.

### Dev / unused template
- `pages/example.html` — colored fullpage-style API playground listing; not confirmed as a live route.

---

# 5. Layout System

## Pattern

There is **no Twig base layout / `{% extends %}`**. Every page is a **full HTML document** that manually includes shared pieces:

```
<!DOCTYPE html>
<html>
  <head>{% include '_head.html' %}</head>
  <body>
    {% include '_header.html' %}
    <main id="{page}_page"> ... sections ... </main>
    {% include '_footer.html' %}
    {% include '_library-loader.html' with {library:{...}} %}
    [page-specific scripts]
  </body>
</html>
```

## Header (`sections/_header.html`)
Two bands:
1. **Top header** — stock ticker strip (`.stock_rate_wrap`), lazy-loaded via `scroll-view="setStocksOnTopHeader"`.
2. **Bottom header** — logo, search autocomplete, nav links (About / Learn / Support), mobile search icon + hamburger `#nav-icon3`.

On scroll (`global.js`), `.header` gets `.add_bg`.

## Footer (`sections/_footer.html`)
Three bands:
1. Delayed-price disclaimer.
2. Logo + description + Download CTA + link columns (Pages / Information / Other Links / Social — many placeholders).
3. Copyright `© Finspark 2021` + Pixolo SVG.

## Navigation
- Primary: header link_section.
- Mobile: hamburger toggles `.link_section.open` (not a separate sidebar component in Twig; SCSS also defines `.sidebar_wrap` which appears **legacy/unused in templates**).
- Search results navigate to stock profiles.

## Sidebars
- No content sidebar on pages.
- Stock Profile uses **horizontal tabs**, not a sidebar.

## Shared includes / template system
- Twig includes for components & sections.
- Per-page `headData` sets `title`, `description`, `css` (maps to `assets/css/{css}.css`).
- Per-page `{% set root="" %}` (production relative paths) or hardcoded `https://richmonks.in/` on stock-profile.
- Library flags passed to `_library-loader.html`: `slick`, `api`, `data_table`, `scroll_view`.

## Template compile dual-path
Gulp also runs `gulp-twig` compiling templates into `dist/templates`. Runtime PHP Twig renders from `TEMPLATES_PATH` independently. **Two Twig pipelines exist** (build-time vs request-time) — migration should pick one (Next.js App Router).

---

# 6. UI Components

| Component | Location | Used on | Notes |
|---|---|---|---|
| **Head / Meta / Fonts** | `components/_head.html` | All pages | OG tags, favicon, Recoleta + Poppins `@font-face`, page CSS link |
| **Library Loader** | `components/_library-loader.html` | All pages | Conditionally loads jQuery stack, fullPage, ScrollOut, Slick, api/data-table/scroll-view, always `global.js` |
| **Slick Loader** | `components/_slick-loader.html` | When `library.slick` | CSS + JS |
| **Page Loader Overlay** | `components/_loader.html` + SCSS | Defined; **include usage not confirmed on pages** | Full-screen spinner |
| **Data Loader Spinner** | `components/_data-loader.html` | Inside empty table bodies | `.lds-roller` placeholder until API fills rows |
| **Header / Navbar** | `sections/_header.html` | All | Logo, search, nav, ticker |
| **Footer** | `sections/_footer.html` | All | |
| **Download App Widget** | `sections/_download_app.html` | Home, About | Green promo bar + CTA |
| **Button** | `.btn_default`, `.btn_white`, `.btn_green` | Everywhere | Div-based often, sometimes `<a>` |
| **Hero / Banner** | Inline in `index.html` `#banner_area` | Home | Headline + monk SVG + money image + green illus parallax |
| **Sentimeter Gauge** | Inline + `assets/svg/sentimeter.svg` | Home | Rotating pointer by score |
| **FNO Cards** | Inline `#fno_at_glance_section` | Home | 3 metric cards + plane SVG animations |
| **Market Data Tables** | `sections/_tables.html` | Home | Tabbed/slider tables |
| **Testimonials Slider** | `sections/_testimonials.html` | Home | Slick center mode |
| **FAQ Accordion** | `sections/_faqs.html` | Home, Support | Plus/minus icons |
| **Feature List (Elements)** | Inline About | About | Numbered feature items from Twig array |
| **Video Cards** | Inline Learn | Learn | Thumbnail + play overlay |
| **Concept Blocks** | Inline Learn `#concept_of_richmonks` | Learn | Text + screenshot pairs |
| **Stock Profile Banner** | Filled by JS into `.banner_section_inner` | Stock Profile | Date, symbol, lot, trigger, close, breakout |
| **Key Indicators Panel** | `_stockP_key_indicator.html` + JS | Stock Profile | Rank, score bar, PPL, 4 doughnut gauges |
| **Locked Content Gate** | `_stockP_locked.html` | Stock Profile tabs | Upsell to download app |
| **RichMonks Summary List** | `_stockP_richmonks_summary.html` + JS | Stock Profile | Narrative bullet cards (profit/loss styling) |
| **Tabs** | `.tab_wrap` pattern in `global.js` | Stock Profile | |
| **Search Autocomplete** | Header + `global.js` | All | |
| **Stock Ticker Flip** | Header + `global.js` | All | Flip animation cycling symbols |
| **Alerts / Modals** | — | **None found** | |
| **Forms / Contact Form** | — | **None found** on PHP site | |
| **Social Icons** | Footer images | Footer | Links are void |

---

# 7. Design System

Source of truth: `assets/scss/variables.scss`, `modules/_base.scss`, `modules/_mixins.scss`, page SCSS.

## Colors (CSS variables)

| Token | Value | Role |
|---|---|---|
| `--color-primary` | `#222b78` | Brand indigo/navy |
| `--color-primary-light` | `#384086` | |
| `--color-primary-dark` | `#1e266a` | |
| `--color-secondary` | `#c30c69` | Magenta accent |
| `--color-text-primary` | `#242424` | Body text / dark buttons |
| `--color-text-secondary` | `#fefefe` | Light text |
| `--color-blue` | `#0071a9` | Doughnut / accents |
| `--color-green` | `#21a947` | Profit / success (also `#45BE67` used in SVGs) |
| `--color-green-light` | `#41de6d` | |
| `--color-green-dark` | `#06591d` | |
| `--color-red` | `#E20D1A` | Loss |
| `--color-table-head` | `#2c333b` | Table headers |
| Theme color meta | `#000` | |

Semantic classes: `.text-profit` (green), `.text-loss` (red), `.inProfit` / `.inLoss` on ticker/FNO/search.

## Typography

| Role | Family |
|---|---|
| Display / headings | **Recoleta** (`recoletaSemibold` primary; Bold/Medium/Regular faces loaded) |
| Body / UI | **Poppins** 200–800 |

Root font-size scales: 16px → 15px (`md-down`) → 14px (`sm-down`).

## Font sizes

| Class / token | Size |
|---|---|
| `--font-tiny` / `.text_tiny` | 0.75rem (12px) |
| `--font-small` / `.text_small` | 0.875rem (14px) |
| `--font-regular` / `.text_regular` | 1rem (16px) |
| `--font-medium` / `.text_medium` | 1.25rem (20px) |
| `--font-large` / `.text_large` | 1.625rem (26px) |
| `--font-xlarge` / `.text_xlarge` | 3.125rem (50px), responsive down to 2.5rem |
| `--font-xxlarge` / `.text_xxlarge` | 4.375rem (70px), down to 3rem on small |

Heading mapping: `h6→medium`, `h5→large`, `h4→xlarge`, `h3→xxlarge`.

## Spacing

| Token | Value |
|---|---|
| `--space-tiny` | 5px |
| `--space-small` | 10px |
| `--space-regular` | 15px |
| `--space-medium` | 20px |
| `--space-large` | 30px |
| `--space-xlarge` | 45px |
| `--space-xxlarge` | 60px |
| `--stock_item_width` | 300px (dynamically overwritten for ticker) |

## Shadows

Examples from SCSS (not centralized tokens):
- Header scrolled: `box-shadow: 0px 10px 30px 0px transparentize(black, 0.9)`
- FNO cards: `0px 0px 19px rgba(0, 0, 0, 0.08)`
- Learn thumbs: soft black transparentize shadows
- Mobile navbar (legacy): `0px 0px 14px -10px #333`

## Border radius

Common values observed: `3px` (search), `9px`, `10px` (download widget), `12px`, `18px` (FNO cards), `22px` (testimonials), `50%` / `50px` (pills, circles, scrollbar). **No single radius token.**

## Icons

- Custom SVG set under `assets/svg/` and `assets/images/icons/`.
- Inline SVG arrows for profit indicators.
- Lock icon on stock-profile tabs.
- Font Awesome files present; **prefer custom SVGs in templates**.

## Branding

- Logo: `assets/images/brand/logo.png`
- Favicon: `assets/images/brand/favicon.png`
- Mascot: `big-monk.svg`, `small-monk.svg`, money PNG, green growth illustrations
- Visual vibe: light background, green growth/profit metaphor, navy/magenta brand tokens, playful plane animations on FNO section

## Animations / motion

| Motion | Where |
|---|---|
| Loader spin `spin_360` | Page loader |
| Button hover scale 1.05 + arrow translateX | `.btn_default` |
| Banner parallax (translateY + blur + opacity on scroll) | Home hero illustrations (`transformGraphShadows`) |
| Plane horizontal loop `plane_animation` | FNO section man SVGs (30s–100s) |
| Sentimeter rotate-animation class then pointer rotate | Home |
| Stock ticker flip `.fp_rotate` | Header |
| Slick autoplay testimonials (5s) | Home |
| Accordion slideUp/Down 300ms | FAQs |
| Mobile nav open class | Header |

## Responsive breakpoints (`_mixins.scss`)

| Name | px |
|---|---|
| xxxs | 320 |
| xxs | 480 |
| xs | 640 |
| sm | 768 |
| md | 992 |
| mdl | 1025 |
| lg | 1200 |
| xl | 1366 |
| xxl | 1440 |
| xxxl | 1700 |

Most layouts key off **`sm-down` (<768)** and **`md-down` (<992)**. Picture sources for hero use `(min-width:480px)`.

Container: Bootstrap3-like `.container` / `.row` patterns.

---

# 8. Assets

## Brand
| Asset | Path | Usage |
|---|---|---|
| Logo | `images/brand/logo.png` | Header, footer |
| Favicon | `images/brand/favicon.png` | Head |

## Home
| Asset | Usage |
|---|---|
| `green_illus.png` / `_mobile` | Hero growth graphic |
| `green_shadow_illus.png` / `_mobile` | Parallax shadow layer |
| `money.png` | Hero |
| `monk.png` | Present; usage less central than SVG monk |
| `clouds_bg.svg` | FNO section background |
| `man1.svg`, `man2.svg`, `man3.svg` | Animated “planes” |
| `graph_profit.svg`, `graph_loss.svg` | FNO card state |
| `learn-algo.svg`, `research-*.svg` | Learn teaser |
| `question-mark.svg` | FAQ title (path may be wrong in `_faqs` — uses `{{imagePath}}question-mark.svg` vs `home/`) |
| Table icon SVGs under `images/home/*_svg.svg` | Alternate icons; tables prefer `assets/svg/` |

## About
`main.jpg`, `man.png`, `team.jpg`, `dots.svg`, `spiral_main.*`, `wave.svg`, `zig-zags.svg` — some team/founder imagery commented out in Twig.

## Learn
`video_img.jpg`, `play_icon.svg`, `man.svg`, `ranks.png`, `score.png`, `velocity.png`, `sentimeter.png`, `ppl.png`, `mobile_body.png`.

## Stock profile
`banner_bg.png`, `locked_bg_img.jpg`.

## Testimonials
`testimonial-img.png` (shared placeholder for all users in JSON).

## Icons
`search-icon.svg`, `arrow-icon.svg`, social (`fb`, `linkedin`, `yt`, `insta`), `quotes.svg`, `plus.png`, `minus.png`.

## SVG library (`assets/svg/`)
`big-monk`, `small-monk`, `sentimeter`, `sentimeter1`, `call`, `put`, `top-gainers`, `top-losers`, `richmonk-top-bottom`, `most-active-calls/puts`, doughnuts, `lock_icon`, `market-rate-status`, `circular_triangle_arrow`.

## Fonts
- Recoleta: Bold, Medium, SemiBold, Regular demo OTF
- Poppins: loaded from gstatic in `_head.html`
- FA brands/regular/solid webfonts
- Slick / lightgallery (`lg.*`) leftover fonts

## Videos
No self-hosted videos; Learn embeds **YouTube** links (`https://www.youtube.com/watch?v=5hnyb78_sMc` repeated placeholder).

## Misc / cruft
- `home/sentimeter.html`, `home/tinified.zip` — non-image artifacts in images folder
- `fonts/helvetica/dummy.ttf`

---

# 9. Data Flow

## Where data comes from

1. **Static Twig content** — marketing copy, Learn concepts, Privacy Policy, About elements.
2. **`data/data.json`** — testimonials, FAQs, (intended) meta/menu; optionally regenerated from Google Sheets.
3. **Remote REST API** `https://richmonks.in:7005/` — all market numbers.
4. **URL path** — stock symbol for profile pages.
5. **No SQL database** in this codebase.

## How pages receive data

| Page | Server data | Client data |
|---|---|---|
| Home | `websiteData` JSON → Twig | API via scroll-view lazy load |
| Support | `websiteData` | Header ticker/search API |
| About/Learn/Privacy | none | Header ticker/search API |
| Stock Profile | `title` from URL basename | Key indicators + summary APIs on `window.load` |
| Renew | writes JSON file | n/a |

## Database queries

**None.** No MySQL/Postgres/SQLite usage in application PHP.

## APIs (browser → RichMonks backend)

Defined in `assets/js/api.js`:

| Function | Method | Endpoint |
|---|---|---|
| `getAllStocks` | GET | `viewFinsparcStockList/all ` *(trailing space in path — possible bug)* |
| `getAllStockPrices` | GET | `viewFinsparcScoreCard/all/all` |
| `getSentimeterScore` | GET | `viewFearGreedIndex` |
| `getFNOPulse` | GET | `FNOAtGlance` |
| `getTopGainers` | GET | `viewPerlotProfit/1` |
| `getTopLosers` | GET | `viewPerlotProfit` |
| `getMostActiveCalls` | GET | `viewFinsparcCallReport/current` |
| `getMostActivePuts` | GET | `viewFinsparcPutReport/current` |
| `getRichmonksTopBottomTen` | GET | `viewfinsparcstockrankingTopBottom20` |
| `getKeyIndicatorsOfStock(name)` | GET | `viewKeyIndicators/{stockName}` |
| `getRichmonkSummary(name)` | GET | `viewStockprofileReview/{stockName}` |

Typical success shapes (inferred from JS):
- Many endpoints: `{ status: 200, message: "sucess", result: [...] }` (note typo **sucess**).
- Ranking: `{ rankData: [ { top_20: [...] } ] }`.

CORS: Google sheet PHP sets `Access-Control-Allow-Origin: *`; browser API calls assume the `:7005` API allows the website origin.

## AJAX calls

- Modern `fetch` (not jQuery.ajax) for market APIs.
- jQuery Form / Validate are loaded but **no forms use them** on current pages.

## Sessions / Cookies / Authentication

- **No PHP `session_start()`** anywhere in app controllers.
- **No auth cookies** set by this website.
- Privacy Policy discusses cookies for the **Service/App**, not implemented here.
- Stock search/ticker state is **in-memory JS** (`var stocks = []`).

## Google Sheet sync flow

```
renew.php
  → sheet-data.php Google_Client + Spreadsheet ID 1uDBt4FpZ17EzkE6Kffzx5eq_f-gIuuEVXlXiNUwvru8
  → reads tabs named after structure keys: meta, menu, testimonials, faqs (range A1:W)
  → sheet-to-json.php getDataJson()
  → file_put_contents(data/data.json)
```

Application name in Google client still says **“SV Inspection”** (leftover from another Pixolo project).

---

# 10. Database

## Tables / relationships / views / stored procedures

**Not applicable.** This website has **no database layer**.

Market data persistence lives in the external API/backend (outside this repo) — schema unknown from this codebase.

CMS persistence is **file-based JSON** (+ Google Sheet as source of truth for that JSON).

### `data.json` schema (from `structure.php` + file)

```
meta: { logo, main-logo, loader-img, name, short-name, favicon, title, keywords, description, canonical, url, template, analytic-code, desktop-layer, mobile-layer, layer-background, contact, mail }
menu: [{ menu-name, is-visible, href }]
testimonials: [{ id, user_name, user_image, company, content }]
faqs: [{ question, answer }]
version: string (in current file)
```

**Confirmed problem:** Current `data.json` `meta` still describes **“SVOG Inspections Pvt Ltd”** / skorostunited.com — leftover from another project. Menu items reference soccer-club anchors. Testimonials/FAQs are RichMonks-ish but FAQ questions are duplicated placeholders.

---

# 11. Forms

## Inventory

**No HTML forms** exist in the PHP Twig pages for contact, login, newsletter, or search submit.

| Interaction | Type | Validation | Submission | Backend | Redirect |
|---|---|---|---|---|---|
| Stock search | `<input oninput>` | Client regex filter on `stocks[]` | None (filters in memory) | None | Navigates via `<a href="stock-profile/SYMBOL">` |
| Download App buttons | `<div class="btn_default">` | None | **No href / no handler** | None | None |
| FAQ accordion | click | None | UI only | None | None |
| Learn View More | click | None | Toggles CSS class | None | None |
| `/renew` | GET URL hit | None | Writes JSON | Google Sheets | Echoes success HTML |

jQuery Validate is loaded preemptively — **dead code for current UX**.

Emails: **not sent** by this website.

---

# 12. Authentication

## Website

| Concern | Status |
|---|---|
| Login | **Does not exist** |
| Logout | **Does not exist** |
| Sessions | **Not used** |
| Authorization | **Not used** |
| Roles / permissions | **Not used** |
| `/renew` protection | **None** — anyone who can hit the URL can refresh/overwrite JSON |

## Stock Profile “locks”

UI-only gating: tabs with class `locked` still switch via JS tabs, but content is the locked upsell partial. **Not real auth** — deeper data simply not rendered; Key Indicators + Summary are publicly fetched from API.

## Mobile app (described only in Privacy Policy)

Privacy Policy references email registration, Facebook/Google social login, passwords — those belong to the **native app / separate service**, not this PHP site. Do not assume they exist in the Next.js marketing site unless product requirements say so.

---

# 13. Admin Features

There is **no admin panel UI**.

### Operator tooling that exists

1. **`/renew` Google Sheet sync** — the only “admin” capability.
2. Manual editing of Twig templates / SCSS / `data.json`.
3. Gulp build for deployment.

### Admin features that do **not** exist

- User management
- Content CMS UI
- Analytics dashboard
- Stock data editing
- Role-based access
- Media library

---

# 14. JavaScript

## Application scripts (`src/assets/js/`)

### `api.js`
- Defines `baseUrl` and all `fetch` wrappers listed in §9.
- No auth headers.

### `global.js`
- Document ready: ScrollOut init; mobile nav toggle; mobile search toggle; testimonials Slick; accordion; generic tabs.
- Window scroll: header `.add_bg`.
- Stock ticker: `setStocksOnTopHeader`, `addStockToFlip`, `changeStocksOnInterval` (1s).
- Search: Levenshtein helpers (`editDist`) exist but **search uses regex `symbol.search`**, not edit distance; autocomplete HTML; blur hide with 500ms delay.

### `index.js`
- Data-table Slick sliders (table body, titles, tabs) with desktop click sync vs mobile swipe + `eval(onclick)` (**dangerous pattern**).
- Sentimeter: score→7 mood buckets, pointer degrees −125..125, DOM text placement via SVG offsets.
- FNO render: profit/loss classes, show graph SVG, format close + change%.
- Parallax banner transforms.
- Data table body height = viewport − header − head − 50.

### `data-table.js`
- Row HTML factories for 5 table types.
- `formTable` injects HTML into `#id .dt_body`.
- Setters call APIs and check `message == "sucess"` (typo must be preserved when talking to API unless backend fixed).
- RichMonks Top 10: takes `rankData[0].top_20.slice(0, 10)`.

### `scroll-view.js`
- Custom lazy invocation: elements with `[scroll-view]` + `.lazy-loaded-content` call `window[fnName]()` once when near viewport (top within viewport+30px).
- Used for ticker, sentimeter, FNO, first table tab.

### `stock-profile.js`
- Parses symbol from URL.
- Loads key indicators → banner + KI panel + doughnut stroke math.
- Loads summary → many `.rs_item` cards with conditional `.isLoss`.
- Business thresholds encoded in UI (see §18).

## Vendor JS (`src/lib/`)

| Lib | Version (inferred) | Purpose |
|---|---|---|
| jQuery | 1.11.2 | DOM, events, Slick dependency |
| jquery.form | — | Unused |
| jquery.validate | — | Unused |
| slick | — | Carousels |
| scroll-out | — | CSS scroll props (light use) |
| fullpage.js | — | Loaded; page usage unconfirmed |

## Events summary

- `click` — nav, accordion, tabs, table tabs, view more
- `scroll` — header bg, parallax, scroll-view
- `input` / `blur` — search
- `swipe` (Slick) — mobile tables
- `window.load` — stock profile APIs; scroll-view initial pass

---

# 15. SEO

## Meta tags (`_head.html`)

| Tag | Status |
|---|---|
| charset / viewport / X-UA-Compatible | Present |
| `theme-color` | `#000` |
| `<title>` | Conditional on Twig `title`; stock-profile uses broken/verbatim dual title approach |
| `meta description` | Twig `{{description}}` — pages pass placeholder strings like `"Home description"` |
| Keywords | In `data.json` meta but **not rendered** into head |
| Canonical | In JSON meta pointing to wrong domain; **not rendered** in head |
| Robots meta | **Absent** |
| Favicon | Present |

## Open Graph

Hardcoded placeholders:

```
og:title = Richmonks
og:description = Richmonks
og:url = https://domainname.in/
og:type = website
og:image = img/og-image.jpg   ← path likely broken
```

## Schema.org JSON-LD

**Not present.**

## Robots / Sitemap

**No `robots.txt` or `sitemap.xml`** found in `src` (gulp misc copy comments mention xml/txt but not active).

## SEO quality (current)

Poor: placeholder descriptions, wrong OG URL, leftover SVOG meta in JSON, duplicate FAQ content, stock profile titles unreliable, many `javascript:void(0)` links.

---

# 16. Performance

## What exists

- SCSS compiled **compressed**.
- JS **uglify**’d in build.
- Vendor CSS cleaned.
- `font-display: swap` on faces.
- Custom **scroll-view lazy API loading** (does not fetch all tables until visible / clicked).
- `<picture>` with mobile/desktop hero assets.
- Commented-out font `preload` links in head.

## What does not exist / bottlenecks

| Issue | Detail |
|---|---|
| No image CDN / Next Image | PNGs served as-is; large learn screenshots 180–300KB each |
| jQuery 1.11.2 | Old, blocks modern perf practices |
| fullPage + validate + form always loaded | Extra unused weight |
| Twig cache disabled | `cache => false` every request recompiles |
| Ticker interval 1s DOM churn | Continuous reflows |
| Recursive `editDist` dead code | Harmless but noisy |
| `eval(onclick)` on mobile swipe | Perf + security smell |
| API waterfall | Multiple sequential fetches on home |
| No HTTP caching headers in PHP | Relies on server config unknown |
| No service worker | |
| Google credentials + Composer vendor in web tree | Deploy risk / weight |
| Sourcemaps disabled in output | Fine for prod; harder debug |

---

# 17. External Integrations

| Integration | Details |
|---|---|
| **RichMonks Market API** | `https://richmonks.in:7005/` — primary data dependency |
| **Google Sheets API** | Spreadsheet `1uDBt4FpZ17EzkE6Kffzx5eq_f-gIuuEVXlXiNUwvru8`; service account JSON on disk |
| **YouTube** | Learn videos |
| **Google Fonts (gstatic)** | Poppins files |
| **Pixolo** | Footer link `https://www.pixoloproductions.com/` |
| Analytics | `analytic-code` field in JSON is `null`; **no GA/GTM snippet in templates** |
| Payment gateways | **None** |
| Social login | Described in privacy policy only |
| Maps | **None** |
| Chat widgets | **None** |
| Email providers | **None** on site |
| App Store / Play Store | Mentioned in copy; **links missing** |

---

# 18. Business Logic

## Product concepts (content rules taught to users)

1. **RichMonks Ranks** — Daily rank of FNO stocks by consistency, momentum, performance. Higher = stronger. Top 20 recommended for longs.
2. **RichMonks Score** — Composite 0–100 of highs/lows, MAs, OI, IV, options, etc.
   - **≥55 strength; ≤45 weakness** (Learn copy).
   - UI also uses **60** as average threshold on Stock Profile score styling and summary (“below/better than average”).
3. **GBR (Green / Blue / Red)** — Score + filters (velocity, momentum) → trade color. Green long, Red short (with stop loss).
4. **Call Velocity / Put Velocity** — Strength/weakness.
   - Learn: **> 1.1** Call Vel = gained strength; **> 1.1** Put Vel = weaker.
   - Doughnut gauges use `data-out-of="2"` (normalize to 0–2 scale).
5. **Sentimeter / Fear & Greed** — Score 0–100 mapped to 7 moods:
   - Buckets via `Math.floor(score / (100/7))` → Extreme Fear, Fear, Mild Fear, Cautious, Mild Greed, Greed, Extreme Greed.
   - Learn: **≥80** Extreme Greed (expect fall); **≤20** Extreme Fear (expect bounce).
6. **Profit Per Lot (PPL)** — Pulse of broader FNO market vs index move.
7. **Trigger Point** — Short-term strength reference; price above = strength.
8. **FAQ investment rule (placeholder JSON):** shares with points **> 50** are “must buy” — **treat as unverified marketing copy**, duplicated, possibly outdated vs Score thresholds above.

## UI / front-end enforced rules

| Rule | Location |
|---|---|
| Profit vs loss coloring | `percent_price_change >= 0`, `change < 0`, `diff_in_close`, etc. |
| Rank up/down arrow | `rank > stock_count / 2` ⇒ down else up |
| Score bar color | `tot_score > 60` green else red |
| PPL bar color | `plp_5_day > 0` green else red |
| Summary cards loss state | trigger `con_color == "red"`; score `<= 60`; rank `>= stock_count/2`; NTM call/put `> 0`; expiry `== -1` below; `percent_10`; contract signs |
| Top 10 only | `top_20.slice(0, 10)` |
| Numeric display | `toFixed(2)` / `getRoundOff` default 2 decimals |
| Search match | Case-insensitive substring on `symbol`; sort by match index |
| Ticker count | `floor(screenWidth / stock_item_width)` |
| Locked tabs | Content withheld; encourage app download |
| API success string | `"sucess"` typo required |

## User flows with conditions

- Home tables: first tab auto-fetches on scroll-view; other tabs fetch on click/swipe.
- Stock profile: public KI + summary; other analytics app-only.
- Download CTAs: currently non-functional (no store URLs) — **product gap**.

## Rules enforced in PHP

Minimal:
- Load Twig + optional JSON.
- Stock profile title = URL basename.
- Renew overwrites JSON if sheet readable.

Almost all domain logic is **client-side JS** or **remote API**.

---

# 19. UX Flow

## Landing → Home
1. User opens `/`.
2. Sees hero “Make your profits grow with RichMonks” + Download CTA (non-linked).
3. Header may begin loading ticker when top strip enters view.
4. Scroll to Sentimeter → API paints gauge + mood text.
5. Scroll to FNO → Nifty / All Stocks PPL / Bank Nifty cards fill.
6. Tables section → Top Gainers loads; user switches tabs for losers / top 10 / calls / puts.
7. Learn teaser → `/learn`.
8. Testimonials carousel autoplays.
9. FAQ accordion expands answers (if Twig verbatim bug fixed / data present).
10. Footer disclaimer + links.

## Search → Stock Profile
1. User types in “Search Stock”.
2. Autocomplete lists matching symbols with price + profit/loss color.
3. Click → `/stock-profile/SYMBOL`.
4. Banner + Key Indicators populate from API.
5. User can open RichMonks Summary tab (public).
6. Other tabs show locked image + Download App pitch.

## About
Marketing narrative → Elements list → Founder quote → Download widget.

## Learn
Watch videos (YouTube new tab) → View More toggles hidden videos → scroll concept deep-dives with app screenshots.

## Support
FAQ-only help center.

## Privacy
Long legal scroll; references Terms URL `https://richmonks.com/Terms` (domain inconsistency with `richmonks.in`).

## Dead ends
Contact Us, blog, social, Terms, FNO info links in footer → `javascript:void(0)`.

---

# 20. Existing Problems

## Duplicate / leftover code
- `data.json` meta/menu from **SVOG Inspections / Skorost** project.
- Google client app name “SV Inspection”.
- `website-html` parallel static site diverging from PHP.
- Unused `example.html`, fullPage, jquery.form/validate.
- Duplicate FAQ entries identical text.
- Levenshtein search unused.

## Technical debt
- No Twig `{% extends %}` — copy-paste page shells.
- `{% verbatim %}` wrapping FAQ/testimonial loops **prevents Twig interpolation** of `websiteData` (critical bug unless a non-Twig preprocessor replaces it — **inferred broken on Home/Support**).
- `{% set imagePath="{{root}}assets/images/"%}` often stores literal `{{root}}...` string rather than concatenated path (Twig nesting mistake) — works only when `root=""` empty.
- Stock-profile hardcodes production `root` differently from other pages.
- `ASSETS_PATH` constant concatenates filesystem root with a localhost URL string (nonsensical).
- htaccess `/renew` → wrong filename `pixrenew.php`.
- API path trailing space in `getAllStocks`.
- `message == "sucess"` typo coupling.
- `eval()` on mobile table swipe.
- Mixed `http://` URL building in stock-profile PHP (`HTTP_HOST`).

## Security concerns
- **Google service account `credentials.json` in web-accessible vendor path.**
- **Unauthenticated `/renew` can overwrite CMS JSON.**
- CORS `*` on sheet-data.php.
- No CSRF (no forms) but open write endpoint.
- Outdated jQuery 1.11.2.
- XSS risk: API data inserted via `innerHTML` / `insertAdjacentHTML` / jQuery `.html()` without sanitization.
- `eval(onclick)` execution.

## Performance issues
See §16. Especially ticker DOM thrash, unused libs, uncached Twig, large PNGs.

## Maintainability
- Business thresholds duplicated across Learn copy vs JS (50 vs 55/45 vs 60).
- Magic spreadsheet ID and base URL hardcoded.
- No tests (`npm test` stub).
- No env-based config (dev/stage/prod).
- SCSS + Twig + PHP + imperative jQuery — hard to reason about data loading order.
- Footer/legal links incomplete vs `website-html` pages.

## Product gaps
- Download App CTAs have no store URLs.
- Social links empty.
- Terms / Contact / Refund not in PHP routes.
- Analytics not wired.
- OG image path invalid.

---

# 21. Next.js Migration Suggestions

## Recommended folder structure (App Router)

```
apps/web/   (or repo root)
├── app/
│   ├── layout.tsx                 # fonts, header/footer shell
│   ├── page.tsx                   # Home
│   ├── about/page.tsx
│   ├── learn/page.tsx
│   ├── support/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-of-use/page.tsx      # port from website-html
│   ├── contact/page.tsx           # if required
│   ├── refund-and-cancellation-policy/page.tsx
│   ├── stock-profile/
│   │   └── [symbol]/page.tsx
│   ├── api/
│   │   ├── cms/route.ts           # optional: read JSON / CMS
│   │   └── renew/route.ts         # protected sheet sync OR move off public web
│   ├── robots.ts
│   ├── sitemap.ts
│   └── opengraph-image.tsx
├── components/
│   ├── layout/Header.tsx, Footer.tsx, MobileNav.tsx
│   ├── home/Hero.tsx, Sentimeter.tsx, FnoGlance.tsx, MarketTables.tsx, DownloadApp.tsx
│   ├── stock/KeyIndicators.tsx, Summary.tsx, LockedPanel.tsx, StockBanner.tsx
│   ├── shared/Button.tsx, Accordion.tsx, Tabs.tsx, SearchAutocomplete.tsx, StockTicker.tsx
│   └── learn/...
├── lib/
│   ├── api/richmonks.ts           # typed fetch wrappers (server + client)
│   ├── business/sentimeter.ts     # mood mapping, thresholds
│   ├── business/format.ts         # round, profit class
│   └── cms.ts
├── content/                       # MDX or JSON for FAQs, legal, learn
├── styles/ / tailwind or CSS modules preserving design tokens
└── public/assets/...
```

## App Router organization
- **Server Components by default** for static marketing pages (About, Learn, Privacy, legal).
- **Client Components** for: ticker, search, Sentimeter, FNO, tables, stock profile live panels, accordions if animated client-side.
- Prefer **Server-side fetch** for stock profile when SEO matters (`generateMetadata` per symbol), with client refresh optional.
- Use **Route Handlers** only as BFF if you must hide API quirks or aggregate calls — or call `:7005` from server with caching.

## State management
- No Redux needed.
- React Query / SWR for client market data.
- URL state for stock symbol (`[symbol]`).
- Light client state for UI (tabs, accordion, mobile nav).

## API routes
- Mirror `api.js` in `lib/api` with shared types.
- Fix trailing spaces / typos at the adapter boundary.
- Protect any renew/CMS write with secret header or move to CI cron.

## Image optimization
- `next/image` for all PNGs/JPGs; convert promotional art to WebP/AVIF.
- Inline critical SVGs as React components.

## SEO improvements
- Real titles/descriptions per page.
- `generateMetadata` for stock profiles.
- JSON-LD `Organization` + `WebSite` + `FAQPage`.
- `sitemap.ts` including top symbols if desired.
- Canonical `https://richmonks.in/...`.
- Fix OG image.

## Code splitting
- Dynamic import Slick alternative (Embla/Swiper) only on Home.
- Do **not** load jQuery.
- Split stock-profile client bundle from marketing pages.

## Reusable component structure
- Map Twig sections → React components 1:1 initially, then merge duplicates (DownloadApp, Button).
- Centralize design tokens as CSS variables (already exist — port `:root` from `variables.scss`).
- Replace Recoleta/Poppins via `next/font/local` + `next/font/google`.

## Content / CMS
- Replace Google Sheet sync with: MDX, headless CMS, or sanitized JSON in repo.
- If keeping Sheets: run sync in GitHub Action, commit JSON — never expose service account to edge runtime publicly.

## Auth
- Keep marketing site public.
- If later adding member area, use separate auth — do not port non-existent PHP sessions.

---

# 22. Components to Rebuild (Checklist)

## App shell
- [ ] Root layout (html/body/fonts/CSS variables)
- [ ] Header (logo, nav, mobile menu)
- [ ] Stock ticker
- [ ] Search autocomplete
- [ ] Footer (links, social, disclaimer, copyright)
- [ ] Button (default / white / green)
- [ ] Download App CTA (wire real store URLs)

## Home
- [ ] Hero / banner + parallax (or simplified motion)
- [ ] Sentimeter gauge
- [ ] FNO at a glance cards
- [ ] Market tables (5 tabs) + loaders
- [ ] Learn teaser section
- [ ] Testimonials carousel
- [ ] FAQ accordion (shared)

## About
- [ ] Main pitch section
- [ ] Elements / features list
- [ ] Founder quote
- [ ] Download widget reuse

## Learn
- [ ] Video grid + View More
- [ ] Concept sections (Ranks, Score/GBR, Velocity, Sentimeter, PPL, Trigger)
- [ ] Illustration blocks

## Support
- [ ] FAQ page composition

## Stock Profile
- [ ] Dynamic `[symbol]` route
- [ ] Banner metrics
- [ ] Tabs
- [ ] Key Indicators (rank, score, PPL, doughnuts)
- [ ] Locked panel upsell
- [ ] RichMonks Summary cards
- [ ] Metadata per symbol

## Legal / extra (from website-html + footer intent)
- [ ] Privacy Policy
- [ ] Terms of Use
- [ ] Refund & Cancellation (if still required)
- [ ] Contact (if required)

## Data / infra
- [ ] Typed RichMonks API client
- [ ] CMS content source (FAQs, testimonials, meta)
- [ ] Sentimeter + formatting business utils
- [ ] robots.txt / sitemap
- [ ] Analytics
- [ ] Env-based API base URL
- [ ] Remove secrets from public tree; rotate Google key if exposed

## Explicitly do **not** rebuild as-is
- [ ] jQuery / fullPage / jquery.validate stack
- [ ] Gulp pipeline
- [ ] Twig page duplication
- [ ] Unprotected `/renew` on public internet
- [ ] `eval`-based table swipe

---

# 23. Final Architecture Summary

RichMonks’ current website is a **custom PHP + Twig marketing front-end** with a **Gulp/SCSS asset pipeline**, deployed as a static-ish PHP app under Apache rewrite rules. Pages are full Twig HTML documents composing shared header/footer sections. Almost no server-side business logic exists: controllers either render static templates or pass a JSON CMS blob. Live market intelligence is fetched **in the browser** from `https://richmonks.in:7005/` using jQuery-era DOM code and a custom scroll-based lazy loader. Optional CMS content (FAQs/testimonials) can be refreshed from **Google Sheets** into `data.json` via an unauthenticated renew script. There is **no database, no user authentication, and no admin UI** on this site; “locked” stock-profile tabs are UX upsells to the mobile app, not access control. The visual system is Recoleta + Poppins with navy/magenta brand colors and green/red profit semantics. The codebase shows clear agency-template lineage (leftover SVOG meta, Pixolo credits) and several production bugs (verbatim Twig loops, renew rewrite mismatch, placeholder SEO, dead Download CTAs).

**End-to-end path:**  
`Browser → Apache/.htaccess → PHP controller → Twig HTML → Browser JS → RichMonks API (:7005) → DOM paint`  
plus optional `Operator → /renew → Google Sheets → data.json → Twig`.

**Migration north star:** Next.js App Router site that preserves routes, design tokens, and API-driven widgets; replaces jQuery with React client islands; moves secrets and CMS off the public PHP tree; completes legal/nav/CTA product gaps; and uses Server Components + metadata for SEO while keeping interactive market widgets as Client Components.

---

## Appendix A — API response field map (inferred from JS usage)

### Score card / ticker stock object
`symbol`, `price_close`, `percent_price_change`, … inside `result[0].current_expiry_score_card`.

### Sentimeter `result[0]`
`curr_score`, `curr_mmi` (MMI label may be unused if UI recomputes from score).

### FNO `result[0]`
`nifty_close`, `nifty_change_percent`, `bn_close`, `banknifty_change_percent`, `plp`, `plp_per`.

### Top gainers/losers row
`symbol`, `lot`, `ltp`, `percent_change`, `diff_in_close`, `diff_in_close_5`.

### Ranking row
`rank`, `symbol`, `one_week_change`, `four_week_change`, `future_closing`.

### Active call/put row
`symbol`, `expiry_dt`, `stike_pr` (typo in API), `trigger_price`, `close`, `price_diff`, `change_in_price_5_days`, `change_in_oi_5_days`; nested under `result[0].most_active_indices`.

### Key indicators `result[0]`
`cdate`, `symbol_par`, `lot`, `trigger_point`, `future_closing`, `price_difference`, `breakout_point`, `rank`, `stock_count`, `tot_score`, `plp_5_day`, `plp_5_day_change`, `call_velocity`, `put_velocity`, `momentum_ratio`, `implied_volatility`.

### Summary (`result[0].review[0]` and nested review)
`con_color`, `total_score`, `rank`, `stock_count`, `itm_call_strike`, `itm_put_strike`, `expiry`, `percent_10`, `max_contract_ce`, `min_contract_pe`, `ce_contract`, `pe_contract`, `review[0].price_high`, `review[0].price_low`.

---

## Appendix B — Page ↔ CSS ↔ JS matrix

| Page | CSS entry (`assets/scss/pages`) | Extra JS |
|---|---|---|
| Home | `index.scss` | `index.js` + api + data-table + scroll-view + global |
| About | `about.scss` | global (+ api/scroll-view loaded unnecessarily) |
| Learn | `learn.scss` | inline View More + global |
| Support | `support.scss` | global |
| Stock Profile | `stock_profile.scss` | `stock-profile.js` + api + scroll-view + global |
| Privacy | `privacy-policy.scss` | global |

Global SCSS bundle also pulls header, footer, loader via `global.scss` imports, while page SCSS files are compiled **separately per page** by Gulp (`src/assets/scss/pages/*` → `dist/assets/css/*.css`).

---

## Appendix C — Confidence legend

| Claim type | Meaning |
|---|---|
| **Confirmed** | Directly observed in source |
| **Inferred** | Strongly suggested by code/config but not runtime-verified |
| **Unknown** | Cannot determine from this repo (e.g., production PHP version, API auth, real app store URLs, backend DB) |

When future agents implement features, **verify API contracts against live `:7005` responses** before locking TypeScript types — field names include historical typos (`stike_pr`, `sucess`) that must be handled deliberately.

---

*Generated from static analysis of `website/` for the RichMonks → Next.js revamp. Primary path analyzed: `website/src`. Empty folder `webiste/` noted. Static sibling `website-html/` referenced only for missing legal/contact pages.*
