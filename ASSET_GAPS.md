# Asset & config drop-in paths

Place files at these **exact** paths. No code changes required once they land
(logo uses `/assets/Brand/logo.png`; Recoleta is already wired in
`styles/globals.css`).

## Required (currently missing)

| File | Drop-in path | Used by |
|---|---|---|
| Brand logo | `public/assets/Brand/logo.png` | Navbar (falls back to a “RichMonks / TRUST. TRADE. EARN.” wordmark until present) |
| Recoleta Regular (400) | `public/fonts/Recoleta-Regular.woff2` | Display / headlines (`@font-face` in `styles/globals.css`) |
| Recoleta Medium (500) | `public/fonts/Recoleta-Medium.woff2` | Same |
| Recoleta SemiBold (600) | `public/fonts/Recoleta-SemiBold.woff2` | Same |
| Recoleta Bold (700) | `public/fonts/Recoleta-Bold.woff2` | Same |

Until Recoleta files exist the browser falls back to `serif`, so the hero
headline renders a few percent narrower than the live site.

## Already present (no action)

| Asset | Path |
|---|---|
| Green graph | `public/assets/Images/green_illus.png` |
| Graph shadow | `public/assets/Images/green_shadow_illus.png` |
| Monk | `public/assets/Images/monk.png` |
| Money | `public/assets/Images/money.png` |

## Environment configuration

Copy `.env.example` to `.env.local` and fill in:

| Variable | Value | Used by |
|---|---|---|
| `NEXT_PUBLIC_MARKET_API_BASE_URL` | `https://richmonks.in:7005` | `lib/market.js` → `{BASE}/viewFinsparcScoreCard/all/all` |
| `NEXT_PUBLIC_CDN_BASE_URL` | **unknown — needs supplying** | Ticker stock logos: `{BASE}/{SYMBOL}.png`. Empty ⇒ initial-letter badge fallback |

The ticker renders an empty strip (never fake data) when the API base is unset
or the endpoint is unreachable.

## Still open

| Item | Where |
|---|---|
| App store CTAs | Hero + navbar “Download App” point at `#download` until real Play / App Store URLs exist |
| `/about`, `/learn`, `/support` routes | Navbar links to them; pages not built yet |
