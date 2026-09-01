"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  SENTIMENT_STATES,
  normalizeSentimeterResponse,
} from "@/lib/sentimeter";
import {
  SentimeterDonut,
  BullsVsBears,
} from "./SentimeterSection";

import "./sentimeter.css";
import "./fno-glance.css";
import "./market-data.css";

/* ═══════════════════════════════════════════════════════════════════════════
   FNO CARDS — copied verbatim from FnoGlanceSection.jsx internals
   ═══════════════════════════════════════════════════════════════════════════ */

const FNO_CARD_DEFINITIONS = [
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

  const cards = FNO_CARD_DEFINITIONS.map((card) => ({
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
              className={`h-[26px] w-auto max-w-[48px] object-contain ${trend.imageClass}`}
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
            <p className="market-pulse-value m-0 text-right font-display text-[28px] leading-none font-bold tracking-[-0.01em] text-text-primary tabular-nums">
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

/* ═══════════════════════════════════════════════════════════════════════════
   4 NEW MARKET-CONDITION CARDS
   Fixed visual state — green for "Above", red for "Below".
   Data source: NOT yet available in /glance — renders placeholder.
   ═══════════════════════════════════════════════════════════════════════════ */

const CONDITION_CARD_DEFINITIONS = [
  {
    label: "Above Yesterday's High",
    fixedDirection: "up",
    glanceKey: "abv_yesterday_high",
  },
  {
    label: "Below Yesterday's Low",
    fixedDirection: "down",
    glanceKey: "blw_yesterday_low",
  },
  {
    label: "Above Intraday High",
    fixedDirection: "up",
    glanceKey: "abv_intraday_high",
  },
  {
    label: "Below Intraday Low",
    fixedDirection: "down",
    glanceKey: "blw_intraday_low",
  },
];

const FIXED_TREND_UP = {
  src: "/assets/Images/graph_profit.svg",
  width: 88,
  height: 48,
  accentBg: "bg-green",
  accentText: "text-green",
  arrow: "↑",
  alt: "Stocks above threshold",
};

const FIXED_TREND_DOWN = {
  src: "/assets/Images/graph_loss.svg",
  width: 98,
  height: 30,
  imageClass: "h-[22px] w-auto max-w-[50px]",
  accentBg: "bg-red",
  accentText: "text-red",
  arrow: "↓",
  alt: "Stocks below threshold",
};

function MarketConditionCard({ definition, glanceData, loading }) {
  const trend =
    definition.fixedDirection === "up" ? FIXED_TREND_UP : FIXED_TREND_DOWN;

  // Attempt to read count from glanceData if a key is defined
  const rawCount = definition.glanceKey
    ? glanceData?.[definition.glanceKey]
    : undefined;
  const count =
    rawCount !== undefined && rawCount !== null
      ? Number(rawCount)
      : undefined;
  const hasData = Number.isFinite(count);

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
      {/* Fixed-color top border — always green or red based on card identity */}
      <span
        className={`absolute inset-x-0 top-0 h-[4px] rounded-t-[12px] ${trend.accentBg}`}
        aria-hidden="true"
      />

      <h3 className="m-0 mb-[6px] font-body text-[11px] leading-[1.4] font-semibold tracking-[0.6px] text-[#6b7280] uppercase">
        {definition.label}
      </h3>

      <span
        className={`mb-[20px] block h-[2px] w-[20px] rounded-[1px] ${trend.accentBg}`}
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
              className={`block h-[28px] w-[7rem] rounded-[6px] bg-primary/6${loading ? " animate-pulse" : ""}`}
              aria-label={
                loading
                  ? "Loading stock count"
                  : "Stock count unavailable"
              }
            />
          ) : (
            <p className="market-pulse-value m-0 text-right font-display text-[28px] leading-none font-bold tracking-[-0.01em] text-text-primary tabular-nums">
              {count}
              <span className="ml-[6px] text-[14px] font-semibold tracking-normal text-[#6b7280]">
                Stocks
              </span>
            </p>
          )}

          {!hasData ? (
            <span
              className={`mt-[6px] block h-[18px] w-[4.5rem] rounded-[4px] bg-primary/5${loading ? " animate-pulse" : ""}`}
              aria-hidden="true"
            />
          ) : (
            <p
              className={`m-0 mt-[6px] flex items-center justify-end gap-[4px] text-[13px] leading-[1.35] font-bold ${trend.accentText}`}
            >
              {trend.arrow && (
                <span aria-hidden="true" className="text-[12px] leading-none">
                  {trend.arrow}
                </span>
              )}
              {definition.label}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   UNIFIED MARKET-DATA SECTION
   ═══════════════════════════════════════════════════════════════════════════ */

export default function MarketDataSection({
  glanceData,
  glanceStatus,
  onRetry,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  /* Sentimeter */
  const reading = normalizeSentimeterResponse(glanceData);
  const sentimeterStatus =
    glanceStatus === "success" && !reading ? "error" : glanceStatus;
  const activeIndex = reading?.sentiment?.index ?? -1;

  /* FNO cards */
  const cards = cardsFromGlanceData(glanceData);
  const fnoLoading = glanceStatus === "loading";
  const fnoStatus =
    glanceStatus === "success" && !cards ? "error" : glanceStatus;

  /* Intersection observer for fade-in */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`market-data-section${visible ? " is-visible" : ""}`}
      aria-labelledby="fno-glance-heading"
    >
      {/* ── 1. FNO AT A GLANCE heading ── */}
      <div className="market-data-section__heading">
        <h2
          id="fno-glance-heading"
          className="m-0 font-display text-[clamp(2rem,4vw,3.125rem)] leading-[1.12] font-semibold tracking-[-0.015em] text-text-primary"
        >
          FNO at a glance
        </h2>
        <span
          className="market-data-section__heading-line"
          aria-hidden="true"
        />
      </div>

      {/* ── 2. SENTIMETER ── */}
      <div className="market-data-section__sentimeter">
        <div className="sentimeter-section__inner">
          <div className="sentimeter-intro">
            <span className="sentimeter-intro__eyebrow">
              <span aria-hidden="true" />
              Market Sentiment
            </span>

            <h3
              style={{
                margin: "1rem 0 0",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 3.1vw, 2.75rem)",
                fontWeight: 600,
                lineHeight: 1.14,
                letterSpacing: "-0.01em",
                color: "#242424",
              }}
            >
              What&apos;s the market feeling today?
            </h3>

            <p>
              The Sentimeter captures the mood of the market through a backtested
              algorithm, and represents that mood across seven states — from
              Extreme Fear all the way to Extreme Greed.
            </p>

            <div className="sentimeter-spectrum" aria-label="Sentiment Spectrum">
              {SENTIMENT_STATES.map((state, index) => {
                const isActive = activeIndex === index;
                return (
                  <span
                    key={state.label}
                    className={`sentimeter-spectrum__chip${isActive ? " is-active" : ""}`}
                    style={{ "--chip-color": state.color }}
                  >
                    <span
                      className="sentimeter-spectrum__dot"
                      aria-hidden="true"
                    />
                    <span>{state.label}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="sentimeter-panel">
            <div className="sentimeter-panel__grid">
              <div className="sentimeter-panel__donut-col">
                <SentimeterDonut reading={reading} status={sentimeterStatus} />
              </div>

              <div className="sentimeter-panel__bias-col">
                <BullsVsBears
                  bulls={glanceData?.sentimeter?.bullscore ?? glanceData?.bulls}
                  bears={glanceData?.sentimeter?.bearscore ?? glanceData?.bears}
                  status={sentimeterStatus}
                />
              </div>
            </div>

            {sentimeterStatus === "error" && (
              <p className="sentimeter-panel__error" role="status">
                Live reading unavailable.
                <button type="button" onClick={onRetry}>
                  Try again
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. MARKET PULSE: SVG transition + heading + 7-card grid ── */}
      <div className="market-data-section__pulse">
        <div className="market-data-section__pulse-inner">
          {/* Flying men illustration */}
          <div
            className="fno-flight-path relative mx-auto mt-0 mb-[clamp(1.75rem,3.2vw,2.75rem)] h-[clamp(5.5rem,11vw,8.5rem)] max-w-[62rem]"
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

          {/* Market Pulse eyebrow */}
          <div className="mx-auto mb-[clamp(1.75rem,3vw,2.5rem)] max-w-2xl text-center">
            <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.16em] text-secondary uppercase">
              <span className="h-0.5 w-7 rounded-full bg-green" aria-hidden="true" />
              Market Pulse
              <span className="h-0.5 w-7 rounded-full bg-green" aria-hidden="true" />
            </span>
          </div>

          {/* 7-card brick/staggered grid */}
          <div className="market-pulse-grid">
            {/* FNO card 1: Nifty Futures */}
            <div className="market-pulse-grid__fno-1">
              <MarketCard
                card={cards ? cards[0] : FNO_CARD_DEFINITIONS[0]}
                loading={fnoLoading}
              />
            </div>

            {/* Condition card 1: Above Yesterday's High */}
            <div className="market-pulse-grid__cond-1">
              <MarketConditionCard
                definition={CONDITION_CARD_DEFINITIONS[0]}
                glanceData={glanceData}
                loading={fnoLoading}
              />
            </div>

            {/* Condition card 2: Below Yesterday's Low */}
            <div className="market-pulse-grid__cond-2">
              <MarketConditionCard
                definition={CONDITION_CARD_DEFINITIONS[1]}
                glanceData={glanceData}
                loading={fnoLoading}
              />
            </div>

            {/* FNO card 2: Profit meter */}
            <div className="market-pulse-grid__fno-2">
              <MarketCard
                card={cards ? cards[1] : FNO_CARD_DEFINITIONS[1]}
                loading={fnoLoading}
              />
            </div>

            {/* Condition card 3: Above Intraday High */}
            <div className="market-pulse-grid__cond-3">
              <MarketConditionCard
                definition={CONDITION_CARD_DEFINITIONS[2]}
                glanceData={glanceData}
                loading={fnoLoading}
              />
            </div>

            {/* Condition card 4: Below Intraday Low */}
            <div className="market-pulse-grid__cond-4">
              <MarketConditionCard
                definition={CONDITION_CARD_DEFINITIONS[3]}
                glanceData={glanceData}
                loading={fnoLoading}
              />
            </div>

            {/* FNO card 3: Bank Nifty Futures */}
            <div className="market-pulse-grid__fno-3">
              <MarketCard
                card={cards ? cards[2] : FNO_CARD_DEFINITIONS[2]}
                loading={fnoLoading}
              />
            </div>
          </div>

          {/* Error / retry */}
          {fnoStatus === "error" && (
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
      </div>
    </section>
  );
}
