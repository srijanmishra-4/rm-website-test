"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import "./fno-glance.css";

const FNO_PATH = "FNOAtGlance";

const CARD_DEFINITIONS = [
  {
    label: "Nifty Futures",
    valueField: "nifty_close",
    changeField: "nifty_change_percent",
  },
  {
    label: "All Stocks Profit Per Lot",
    valueField: "plp",
    changeField: "plp_per",
    featured: true,
  },
  {
    label: "Bank Nifty Futures",
    valueField: "bn_close",
    changeField: "banknifty_change_percent",
  },
];

function getFnoUrl() {
  const base = process.env.NEXT_PUBLIC_MARKET_API_BASE_URL?.trim();
  return base ? `${base.replace(/\/$/, "")}/${FNO_PATH}` : null;
}

function normalizeFnoResponse(data) {
  const result = data?.result?.[0];
  if (!result) return null;

  const cards = CARD_DEFINITIONS.map((card) => ({
    ...card,
    value: Number(result[card.valueField]),
    change: Number(result[card.changeField]),
  }));

  return cards.every(
    ({ value, change }) => Number.isFinite(value) && Number.isFinite(change),
  )
    ? cards
    : null;
}

async function fetchFnoData(signal) {
  const url = getFnoUrl();
  if (!url) {
    throw new Error("Market API base URL is not configured");
  }

  const response = await fetch(url, { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`FNO request failed with status ${response.status}`);
  }

  const cards = normalizeFnoResponse(await response.json());
  if (!cards) {
    throw new Error("FNO response did not contain the expected market values");
  }

  return cards;
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

function MarketCard({ card, loading }) {
  const hasData =
    Number.isFinite(card?.value) && Number.isFinite(card?.change);
  const isPositive = hasData && card.change >= 0;

  return (
    <article
      className={[
        "group relative min-h-[15.5rem] overflow-hidden rounded-[1.125rem]",
        "border border-primary/10 bg-white px-[clamp(1.4rem,2.5vw,2rem)] py-[clamp(1.5rem,2.8vw,2.15rem)]",
        "shadow-[0_12px_38px_rgba(34,43,120,0.07)] transition-[transform,box-shadow] duration-300",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_42px_rgba(34,43,120,0.1)]",
        card?.featured
          ? "lg:-translate-y-4 lg:motion-safe:hover:-translate-y-5"
          : "",
      ].join(" ")}
    >
      <div
        className={`absolute inset-x-0 top-0 h-[3px] ${
          !hasData
            ? `bg-primary/15${loading ? " animate-pulse" : ""}`
            : isPositive
              ? "bg-green"
              : "bg-red"
        }`}
        aria-hidden="true"
      />

      <div className="flex h-full flex-col">
        <div className="flex min-h-12 items-start justify-between gap-4">
          <h3 className="m-0 max-w-[14rem] font-body text-[0.75rem] leading-[1.55] font-semibold tracking-[0.13em] text-primary uppercase">
            {card?.label}
          </h3>

          {hasData && (
            <span
              className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                isPositive ? "bg-green/10" : "bg-red/8"
              }`}
            >
              <Image
                src={
                  isPositive
                    ? "/assets/Images/graph_profit.svg"
                    : "/assets/Images/graph_loss.svg"
                }
                alt=""
                width={isPositive ? 88 : 98}
                height={isPositive ? 48 : 70}
                className="h-auto w-5"
              />
            </span>
          )}
        </div>

        <div className="mt-auto pt-8">
          {!hasData ? (
            <div
              aria-label={
                loading ? "Loading market value" : "Market value unavailable"
              }
            >
              <div
                className={`h-10 w-36 rounded-md bg-primary/8${loading ? " animate-pulse" : ""}`}
              />
              <div
                className={`mt-3 h-5 w-20 rounded bg-primary/6${loading ? " animate-pulse" : ""}`}
              />
            </div>
          ) : (
            <>
              <p className="m-0 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none font-semibold tracking-[-0.025em] text-text-primary tabular-nums">
                {formatValue(card.value)}
              </p>
              <div
                className={`mt-4 flex items-center gap-2 text-[0.875rem] font-semibold tabular-nums ${
                  isPositive ? "text-green" : "text-red"
                }`}
              >
                <span>{formatChange(card.change)}</span>
                <Image
                  src={
                    isPositive
                      ? "/assets/Images/graph_profit.svg"
                      : "/assets/Images/graph_loss.svg"
                  }
                  alt={isPositive ? "Price increased" : "Price decreased"}
                  width={isPositive ? 88 : 98}
                  height={isPositive ? 48 : 70}
                  className="h-auto w-10"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FnoGlanceSection() {
  const [requestKey, setRequestKey] = useState(0);
  const [state, setState] = useState({
    status: "loading",
    cards: CARD_DEFINITIONS,
  });

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    setState({ status: "loading", cards: CARD_DEFINITIONS });

    fetchFnoData(controller.signal)
      .then((cards) => {
        if (active) setState({ status: "success", cards });
      })
      .catch(() => {
        if (active) setState({ status: "error", cards: CARD_DEFINITIONS });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [requestKey]);

  const loading = state.status === "loading";

  return (
    <section
      aria-labelledby="fno-glance-heading"
      className="overflow-hidden bg-white px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(5rem,9vw,8rem)] pb-[clamp(5rem,9vw,8rem)]"
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
        </div>

        <div
          className="fno-flight-path relative mx-auto mt-[clamp(2.25rem,4.5vw,3.75rem)] mb-[clamp(1.875rem,3vw,2.75rem)] h-[clamp(5.5rem,11vw,8.5rem)] max-w-[62rem]"
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

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {state.cards.map((card, index) => (
            <div
              key={card.label}
              className={
                index === 2
                  ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.875rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                  : ""
              }
            >
              <MarketCard card={card} loading={loading} />
            </div>
          ))}
        </div>

        {state.status === "error" && (
          <p
            className="mt-[clamp(2.25rem,4vw,3.25rem)] flex items-center justify-center gap-2 text-center text-small text-text-primary/60"
            role="status"
          >
            Live market data is temporarily unavailable.
            <button
              type="button"
              onClick={() => setRequestKey((key) => key + 1)}
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
