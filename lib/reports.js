/**
 * RichMonks home-page market reports.
 *
 * All 10 market reports are fetched together in a single API call to
 * /website/market_reports.
 */

export const REPORTS = [
  {
    id: "crossing2PercentDayLow",
    label: "Crossing 2% from day’s low",
    variant: "typeA",
  },
  {
    id: "breaching2PercentDayHigh",
    label: "Breaching 2% from day’s high",
    variant: "typeA",
  },
  {
    id: "aboveIntradayHigh",
    label: "Above Intraday High",
    variant: "typeA",
  },
  {
    id: "belowIntradayLow",
    label: "Below Intraday Low",
    variant: "typeA",
  },
  {
    id: "aboveYesterdayHigh",
    label: "Above Yesterday’s High",
    variant: "typeA",
  },
  {
    id: "belowYesterdayLow",
    label: "Below Yesterday’s Low",
    variant: "typeA",
  },
  {
    id: "abovePrevWeekHigh",
    label: "Above Prev Week’s High",
    variant: "typeA",
  },
  {
    id: "belowPrevWeekLow",
    label: "Below Prev Week’s Low",
    variant: "typeA",
  },
  {
    id: "mostActiveCall",
    label: "Most Active Calls",
    variant: "typeB",
  },
  {
    id: "mostActivePut",
    label: "Most Active Puts",
    variant: "typeB",
  },
];

function getReportsBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return base ? base.replace(/\/$/, "") : null;
}

/**
 * Absolute URL of the market_reports endpoint, or null when unconfigured.
 * @returns {string|null}
 */
export function getMarketReportsUrl() {
  const base = getReportsBaseUrl();
  if (!base) return null;
  if (base.endsWith("/website")) {
    return `${base}/market_reports`;
  }
  return `${base}/website/market_reports`;
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toText(value) {
  return value != null ? String(value).trim() : "";
}

/**
 * Normalize a single Type A market report row.
 * Preserves backend dynamic key and value, plus volume, chg_in_volume, oi, chg_in_oi.
 */
function normalizeTypeARow(row) {
  if (!row || typeof row !== "object") return null;
  const symbol = toText(row.symbol);
  if (!symbol) return null;

  return {
    symbol,
    price: toNumber(row.price),
    price_change: toNumber(row.price_change ?? row.priceChange),
    key: toText(row.key),
    value: row.value != null ? row.value : null,
    volume: toNumber(row.volume),
    chg_in_volume: toNumber(row.chg_in_volume ?? row.changeInVolume ?? row.change_in_volume),
    oi: toNumber(row.oi),
    chg_in_oi: toNumber(row.chg_in_oi ?? row.changeInOi ?? row.change_in_oi),
  };
}

/**
 * Normalize a single Type B option report row (mostActiveCall / mostActivePut).
 * Preserves strike_pr, remark, tp, volume, chg_in_volume, oi, chg_in_oi.
 */
function normalizeTypeBRow(row) {
  if (!row || typeof row !== "object") return null;
  const symbol = toText(row.symbol);
  if (!symbol) return null;

  return {
    symbol,
    price: toNumber(row.price),
    price_change: toNumber(row.price_change ?? row.priceChange),
    strike_pr: row.strike_pr ?? row.strike ?? row.strike_price ?? null,
    remark: toText(row.remark),
    tp: row.tp ?? row.trigger_point ?? row.triggerPoint ?? null,
    volume: toNumber(row.volume),
    chg_in_volume: toNumber(row.chg_in_volume ?? row.changeInVolume ?? row.change_in_volume),
    oi: toNumber(row.oi),
    chg_in_oi: toNumber(row.chg_in_oi ?? row.changeInOi ?? row.change_in_oi),
  };
}

/**
 * Fetch all 10 market reports from the single /website/market_reports endpoint.
 * Returns an object keyed by report IDs, maintaining the exact backend array ordering.
 *
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<Record<string, Array<Record<string, unknown>>>>}
 */
export async function fetchAllMarketReports({ signal } = {}) {
  const url = getMarketReportsUrl();
  if (!url) {
    throw new Error("Market Reports API base URL is not configured");
  }

  const response = await fetch(url, { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`Market reports request failed with status ${response.status}`);
  }

  const json = await response.json();
  const data = json?.result && typeof json.result === "object" ? json.result : json;

  if (!data || typeof data !== "object") {
    throw new Error("Market reports response did not contain data");
  }

  const normalized = {};

  for (const report of REPORTS) {
    const rawArray = data[report.id];
    if (Array.isArray(rawArray)) {
      const normalizer = report.variant === "typeB" ? normalizeTypeBRow : normalizeTypeARow;
      normalized[report.id] = rawArray
        .map(normalizer)
        .filter((row) => row != null);
    } else {
      normalized[report.id] = [];
    }
  }

  return normalized;
}
