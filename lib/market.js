const SCORE_CARD_PATH = "viewFinsparcScoreCard/all/all";

/**
 * Base URL of the RichMonks market API. Configured per environment via
 * NEXT_PUBLIC_MARKET_API_BASE_URL (see .env.example); never hardcoded here.
 * @returns {string|null}
 */
function getApiBaseUrl() {
  const base = process.env.NEXT_PUBLIC_MARKET_API_BASE_URL?.trim();
  return base ? base.replace(/\/$/, "") : null;
}

/**
 * Absolute URL of the score-card endpoint, or null when unconfigured.
 * @returns {string|null}
 */
export function getScoreCardUrl() {
  const base = getApiBaseUrl();
  return base ? `${base}/${SCORE_CARD_PATH}` : null;
}

/**
 * Build CDN logo URL for a stock symbol.
 * Uses NEXT_PUBLIC_CDN_BASE_URL; trailing slash is optional.
 * @param {string} symbol
 * @returns {string|null}
 */
export function getStockLogoUrl(symbol) {
  const base = process.env.NEXT_PUBLIC_CDN_BASE_URL?.trim();
  if (!base || !symbol) return null;

  const normalized = base.replace(/\/$/, "");
  return `${normalized}/${String(symbol).toUpperCase()}.png`;
}

/**
 * Normalize one score-card row into ticker item shape.
 * @param {Record<string, unknown>} row
 * @returns {{ symbol: string, price: number, changePct: number, isUp: boolean }|null}
 */
export function normalizeScoreCardItem(row) {
  if (!row || typeof row !== "object") return null;

  const symbol = row.symbol != null ? String(row.symbol).trim() : "";
  if (!symbol) return null;

  const price = Number(row.price_close);
  const changePct = Number(row.percent_price_change);

  if (!Number.isFinite(price) || !Number.isFinite(changePct)) return null;

  return {
    symbol,
    price,
    changePct,
    isUp: changePct >= 0,
  };
}

/**
 * Normalize API payload → ticker items.
 * Expects `result[0].current_expiry_score_card`.
 * @param {unknown} data
 * @returns {Array<{ symbol: string, price: number, changePct: number, isUp: boolean }>}
 */
export function normalizeScoreCardResponse(data) {
  const card = data?.result?.[0]?.current_expiry_score_card;
  if (!Array.isArray(card)) return [];

  return card
    .map(normalizeScoreCardItem)
    .filter((item) => item != null);
}

/**
 * Fetch and normalize the market score card for the ticker.
 * Returns [] on network/parse/empty errors (caller should render empty strip).
 * @returns {Promise<Array<{ symbol: string, price: number, changePct: number, isUp: boolean }>>}
 */
export async function fetchMarketTickerItems() {
  const url = getScoreCardUrl();

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[market] NEXT_PUBLIC_MARKET_API_BASE_URL is not set — ticker will stay empty.",
      );
    }
    return [];
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];

    const data = await res.json();
    return normalizeScoreCardResponse(data);
  } catch {
    return [];
  }
}
