const SENTIMETER_PATH = "viewFearGreedIndex";

/**
 * Seven market moods, ordered fear -> greed.
 * `color` paints the gauge arc; `textColor` is the readable variant used for
 * label text, where the arc tone alone would not carry enough contrast.
 */
export const SENTIMENT_STATES = [
  { label: "Extreme Fear", color: "#e20d1a", textColor: "#b80a14" },
  { label: "Fear", color: "#ef5a28", textColor: "#c4451b" },
  { label: "Mild Fear", color: "#f2a81c", textColor: "#a3700b" },
  { label: "Cautious", color: "#384086", textColor: "#222b78" },
  { label: "Mild Greed", color: "#41de6d", textColor: "#1f9a4a" },
  { label: "Greed", color: "#21a947", textColor: "#188a39" },
  { label: "Extreme Greed", color: "#06591d", textColor: "#06591d" },
];

export function normalizeSentimeterScore(value) {
  const score = Number(value);
  if (!Number.isFinite(score)) return null;
  return Math.min(100, Math.max(0, score));
}

export function getSentimentForScore(value) {
  const score = normalizeSentimeterScore(value);
  if (score == null) return null;

  // Preserve the original seven-bucket calculation. A score of exactly 100
  // yields index 7, so it is capped to the final business state.
  const index = Math.min(
    SENTIMENT_STATES.length - 1,
    Math.floor(score / (100 / SENTIMENT_STATES.length)),
  );

  return { ...SENTIMENT_STATES[index], index };
}

export function getNeedleAngle(value) {
  const score = normalizeSentimeterScore(value);
  return score == null ? -90 : score * 1.8 - 90;
}

export function normalizeSentimeterResponse(data) {
  const reading = data?.result?.[0];
  const score = normalizeSentimeterScore(reading?.curr_score);
  if (score == null) return null;

  return {
    score,
    mmi: reading?.curr_mmi ?? null,
    sentiment: getSentimentForScore(score),
  };
}

function getSentimeterUrl() {
  const configuredBase = process.env.NEXT_PUBLIC_MARKET_API_BASE_URL?.trim();
  const base = configuredBase || "https://richmonks.in:7005";
  return `${base.replace(/\/$/, "")}/${SENTIMETER_PATH}`;
}

export async function fetchSentimeterReading({ signal } = {}) {
  const response = await fetch(getSentimeterUrl(), {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`Sentimeter request failed with status ${response.status}`);
  }

  const reading = normalizeSentimeterResponse(await response.json());
  if (!reading) {
    throw new Error("Sentimeter response did not contain a valid score");
  }

  return reading;
}
