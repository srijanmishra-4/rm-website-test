"use client";

import Image from "next/image";

import "./fno-glance.css";

const CARD_DEFINITIONS = [
  {
    label: "Nifty Futures",
    resultKey: "NIFTY",
  },
  {
    label: "Profit meter",
    resultKey: "ppl",
  },
  {
    label: "Bank Nifty Futures",
    resultKey: "BANKNIFTY",
  },
];

function cardsFromGlanceData(glanceData) {
  if (!glanceData) return null;

  const cards = CARD_DEFINITIONS.map((card) => ({
    ...card,
    value: Number(glanceData[card.resultKey]?.price),
    change: Number(glanceData[card.resultKey]?.price_change),
  }));

  return cards.every(
    ({ value, change }) => Number.isFinite(value) && Number.isFinite(change),
  )
    ? cards
    : null;
}

function formatValue(value) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatChange(change) {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

/**
 * Direction is driven solely by price_change — never by the price itself.
 * >= 0 is green (profit/up), < 0 is red (loss/down).
 */
function trendState(change) {
  if (change >= 0) {
    return {
      src: "/assets/Images/graph_profit.svg",
      width: 88,
      height: 48,
      imageClass: "",
      accentBg: "bg-green",
      accentText: "text-green",
      arrow: "↑",
      alt: "Price increased",
    };
  }

  return {
    src: "/assets/Images/graph_loss.svg",
    width: 98,
    height: 30,
    imageClass: "h-[22px] w-auto max-w-[50px]",
    accentBg: "bg-red",
    accentText: "text-red",
    arrow: "↓",
    alt: "Price decreased",
  };
}

function MarketCard({ card, loading }) {
  const hasData =
    Number.isFinite(card?.value) && Number.isFinite(card?.change);
  const trend = trendState(hasData ? card.change : 0);

  return (
    <article
      className={[
        "relative flex h-full flex-col overflow-hidden rounded-[12px]",
        "border border-[#ececef] bg-[#fafafb] px-[24px] pt-[24px] pb-[20px]",
        "shadow-[0_1px_3px_rgba(16,24,40,0.06),0_1px_2px_rgba(16,24,40,0.04)]",
        "transition-[transform,box-shadow] duration-300",
        "hover:shadow-[0_2px_6px_rgba(16,24,40,0.08),0_1px_2px_rgba(16,24,40,0.05)]",
        "motion-safe:hover:-translate-y-0.5",
      ].join(" ")}
    >
      <span
        className={`absolute inset-x-0 top-0 h-[4px] rounded-t-[12px] ${
          hasData ? trend.accentBg : `bg-[#e4e6ea]${loading ? " animate-pulse" : ""}`
        }`}
        aria-hidden="true"
      />

      <h3 className="m-0 mb-[6px] font-body text-[11px] leading-[1.4] font-semibold tracking-[0.6px] text-[#6b7280] uppercase">
        {card?.label}
      </h3>

      <span
        className={`mb-[20px] block h-[2px] w-[20px] rounded-[1px] ${
          hasData ? trend.accentBg : "bg-[#e4e6ea]"
        }`}
        aria-hidden="true"
      />

      <div className="flex w-full items-center justify-between gap-[16px]">
        <span className="flex shrink-0 items-center">
          {!hasData ? (
            <span
              className={`block h-[26px] w-[46px] rounded-[4px] bg-primary/6${loading ? " animate-pulse" : ""}`}
            />
          ) : (
            <Image
              src={trend.src}
              alt={trend.alt}
              width={trend.width}
              height={trend.height}
              className={`h-[26px] w-auto max-w-[48px] object-contain ${trend.imageClass || ""}`}
            />
          )}
        </span>

        <div className="flex flex-col items-end">
          {!hasData ? (
            <span
              className={`block h-[28px] w-[9rem] rounded-[6px] bg-primary/6${loading ? " animate-pulse" : ""}`}
              aria-label={
                loading ? "Loading market value" : "Market value unavailable"
              }
            />
          ) : (
            <p className="m-0 text-right font-display text-[28px] leading-none font-bold tracking-[-0.01em] text-text-primary tabular-nums">
              ₹{formatValue(card.value)}
            </p>
          )}

          {!hasData ? (
            <span
              className={`mt-[6px] block h-[18px] w-[4.5rem] rounded-[4px] bg-primary/5${loading ? " animate-pulse" : ""}`}
              aria-hidden="true"
            />
          ) : (
            <p
              className={`m-0 mt-[6px] flex items-center justify-end gap-[4px] text-[13px] leading-[1.35] font-bold tabular-nums ${trend.accentText}`}
            >
              {formatChange(card.change)}
              {trend.arrow && (
                <span aria-hidden="true" className="text-[12px] leading-none">
                  {trend.arrow}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FnoGlanceSection({
  glanceData,
  glanceStatus,
  onRetry,
}) {
  const cards = cardsFromGlanceData(glanceData);
  const loading = glanceStatus === "loading";
  const status =
    glanceStatus === "success" && !cards ? "error" : glanceStatus;

  return (
    <section
      aria-labelledby="fno-glance-heading"
      className="overflow-hidden bg-white px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(2.75rem,4.5vw,4rem)] pb-[clamp(4.5rem,8vw,7rem)]"
    >
      <div className="mx-auto w-full max-w-[78rem]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.16em] text-secondary uppercase">
            <span className="h-0.5 w-7 rounded-full bg-green" aria-hidden="true" />
            Market Pulse
            <span className="h-0.5 w-7 rounded-full bg-green" aria-hidden="true" />
          </span>
          <h2
            id="fno-glance-heading"
            className="mt-[clamp(1rem,1.8vw,1.5rem)] mb-0 font-display text-[clamp(2rem,4vw,3.125rem)] leading-[1.12] font-semibold tracking-[-0.015em] text-text-primary"
          >
            FNO at a glance
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-3 block h-[3px] w-11 rounded-full bg-green"
          />
        </div>

        <div
          className="fno-flight-path relative mx-auto mt-[clamp(1.75rem,3.4vw,2.75rem)] mb-[clamp(1.5rem,2.6vw,2.25rem)] h-[clamp(5.5rem,11vw,8.5rem)] max-w-[62rem]"
          aria-hidden="true"
        >
          <Image
            src="/assets/Images/man1.svg"
            alt=""
            width={111}
            height={80}
            className="fno-flyer fno-flyer--one absolute left-[7%] top-[24%] h-auto w-[clamp(4.5rem,8vw,6.25rem)]"
          />
          <Image
            src="/assets/Images/man2.svg"
            alt=""
            width={159}
            height={87}
            className="fno-flyer fno-flyer--two absolute left-1/2 top-[6%] h-auto w-[clamp(6.5rem,11vw,8.75rem)] -translate-x-1/2"
          />
          <Image
            src="/assets/Images/man3.svg"
            alt=""
            width={170}
            height={94}
            className="fno-flyer fno-flyer--three absolute right-[5%] top-[32%] h-auto w-[clamp(6.5rem,11vw,9rem)]"
          />
        </div>

        <div className="mx-auto grid w-full max-w-[70.5rem] grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
          {(cards ?? CARD_DEFINITIONS).map((card, index) => (
            <div
              key={card.label}
              className={
                index === 2
                  ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                  : ""
              }
            >
              <MarketCard card={card} loading={loading} />
            </div>
          ))}
        </div>

        {status === "error" && (
          <p
            className="mt-[clamp(2.25rem,4vw,3.25rem)] flex items-center justify-center gap-2 text-center text-small text-text-primary/60"
            role="status"
          >
            Live market data is temporarily unavailable.
            <button
              type="button"
              onClick={onRetry}
              className="cursor-pointer border-0 border-b border-primary bg-transparent p-0 font-body text-small font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Try again
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
