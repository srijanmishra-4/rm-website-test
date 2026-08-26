"use client";

import { useEffect, useState } from "react";

import { fetchMarketTickerItems, getStockLogoUrl } from "@/lib/market";

import "./market-ticker.css";

function formatPrice(price) {
  return price.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatChangePct(changePct) {
  return `${changePct >= 0 ? "+" : "-"}${Math.abs(changePct).toFixed(2)}%`;
}

function DirectionChevron({ isUp }) {
  return (
    <svg
      className="h-[0.4rem] w-[0.55rem] shrink-0"
      viewBox="0 0 10 6"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={isUp ? "M5 0L10 6H0L5 0Z" : "M5 6L0 0H10L5 6Z"} />
    </svg>
  );
}

function StockLogo({ symbol }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = getStockLogoUrl(symbol);

  if (!logoUrl || failed) {
    return (
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/12 text-[0.55rem] leading-none font-semibold text-white/70"
        aria-hidden="true"
      >
        {symbol.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={logoUrl}
      alt=""
      width={16}
      height={16}
      loading="lazy"
      decoding="async"
      className="h-4 w-4 shrink-0 rounded-full bg-white/90 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

function TickerItem({ item }) {
  return (
    <span className="flex h-ticker shrink-0 items-center gap-2 border-r border-white/8 px-5 text-[0.6875rem] leading-none transition-colors duration-200 hover:bg-white/5">
      <StockLogo symbol={item.symbol} />
      <span className="font-semibold tracking-[0.04em] text-white/90 uppercase">
        {item.symbol}
      </span>
      <span className="tabular-nums text-white/55">
        {formatPrice(item.price)}
      </span>
      <span
        className={`inline-flex items-center gap-1 font-medium tabular-nums ${
          item.isUp ? "text-green-light" : "text-red"
        }`}
      >
        {formatChangePct(item.changePct)}
        <DirectionChevron isUp={item.isUp} />
      </span>
    </span>
  );
}

function TickerTrack({ items, duplicate = false }) {
  return (
    <div
      className={`flex shrink-0 items-center ${duplicate ? "market-ticker-duplicate" : ""}`}
      aria-hidden={duplicate || undefined}
    >
      {items.map((item) => (
        <TickerItem
          key={`${duplicate ? "dup" : "main"}-${item.symbol}`}
          item={item}
        />
      ))}
    </div>
  );
}

export default function MarketTicker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchMarketTickerItems().then((data) => {
      if (!cancelled) setItems(data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const durationSec = Math.max(45, items.length * 2.4);

  return (
    <div
      role="region"
      aria-label="Market ticker"
      className="market-ticker h-ticker w-full overflow-hidden bg-text-primary text-white"
    >
      {items.length > 0 && (
        <div
          className="market-ticker-track flex h-full w-max items-center"
          style={{ "--ticker-duration": `${durationSec}s` }}
        >
          <TickerTrack items={items} />
          <TickerTrack items={items} duplicate />
        </div>
      )}
    </div>
  );
}
