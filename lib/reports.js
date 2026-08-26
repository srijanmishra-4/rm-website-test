/**
 * RichMonks home-page reports.
 *
 * Every report is served by its own endpoint under
 * NEXT_PUBLIC_API_BASE_URL and returns its own row
 * shape, so each one keeps an explicit normalizer rather than sharing a single
 * generic interface.
 */

/** The section shows a Top 10 only, however many rows the API returns. */
export const MAX_REPORT_ROWS = 10;

function getReportsBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return base ? base.replace(/\/$/, "") : null;
}

/**
 * Absolute URL of a report endpoint, or null when unconfigured.
 * @param {string} path
 * @returns {string|null}
 */
export function getReportUrl(path) {
  const base = getReportsBaseUrl();
  return base ? `${base}/${path}` : null;
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toText(value) {
  return value != null ? String(value).trim() : "";
}

/** topGainer / topLoser row: symbol, price, price_change, today, 5_days. */
function normalizeMoverRow(row) {
  const symbol = toText(row?.symbol);
  if (!symbol) return null;

  return {
    symbol,
    price: toNumber(row.price),
    priceChange: toNumber(row.price_change),
    todayPpl: toNumber(row.today),
    fiveDayPpl: toNumber(row["5_days"]),
  };
}

/** top10 row: rank, price, price_change, price_at_entry, date_at_entry, 5_days_ppl. */
function normalizeTop10Row(row) {
  const symbol = toText(row?.symbol);
  if (!symbol) return null;

  return {
    symbol,
    rank: toNumber(row.rank),
    price: toNumber(row.price),
    priceChange: toNumber(row.price_change),
    priceAtEntry: toNumber(row.price_at_entry),
    dateAtEntry: toText(row.date_at_entry),
    fiveDayPpl: toNumber(row["5_days_ppl"]),
  };
}

/** mostActiveCall / mostActivePut row: strike, trigger_point, price, oi, chg_in_oi, remark. */
function normalizeOptionRow(row) {
  const symbol = toText(row?.symbol);
  if (!symbol) return null;

  return {
    symbol,
    strike: toNumber(row.strike),
    triggerPoint: toNumber(row.trigger_point),
    priceClose: toNumber(row.price),
    openInterest: toNumber(row.oi),
    changeInOi: toNumber(row.chg_in_oi),
    remark: toText(row.remark),
  };
}

/**
 * The five selectable reports, in display order. `variant` decides which card
 * body renders the row; `normalize` maps that report's own API fields.
 */
export const REPORTS = [
  {
    id: "top-gainers",
    label: "Top Gainers",
    path: "topGainer",
    variant: "mover",
    normalize: normalizeMoverRow,
  },
  {
    id: "top-losers",
    label: "Top Losers",
    path: "topLoser",
    variant: "mover",
    normalize: normalizeMoverRow,
  },
  {
    id: "top-10",
    label: "RichMonks Top 10",
    path: "top10",
    variant: "top10",
    normalize: normalizeTop10Row,
  },
  {
    id: "most-active-calls",
    label: "Most Active Calls",
    path: "mostActiveCall",
    variant: "option",
    normalize: normalizeOptionRow,
  },
  {
    id: "most-active-puts",
    label: "Most Active Puts",
    path: "mostActivePut",
    variant: "option",
    normalize: normalizeOptionRow,
  },
];

/**
 * Fetch one report and return at most the first ten rows, keeping the ordering
 * the API sent.
 * @param {(typeof REPORTS)[number]} report
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<Array<Record<string, unknown>>>}
 */
export async function fetchReportRows(report, { signal } = {}) {
  const url = getReportUrl(report.path);
  if (!url) {
    throw new Error("Reports API base URL is not configured");
  }

  const response = await fetch(url, { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(
      `${report.label} request failed with status ${response.status}`,
    );
  }

  const result = (await response.json())?.result;
  if (!Array.isArray(result)) {
    throw new Error(`${report.label} response did not contain a result list`);
  }

  return result
    .map((row) => report.normalize(row))
    .filter((row) => row != null)
    .slice(0, MAX_REPORT_ROWS);
}
