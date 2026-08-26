"use client";

import { useEffect, useState } from "react";

import { getStockLogoUrl } from "@/lib/market";
import { MAX_REPORT_ROWS, REPORTS, fetchReportRows } from "@/lib/reports";

const decimalFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const EMPTY_VALUE = "—";

function formatPrice(value) {
  return value == null ? EMPTY_VALUE : `₹${decimalFormatter.format(value)}`;
}

function formatPercent(value) {
  if (value == null) return EMPTY_VALUE;
  const sign = value >= 0 ? "+" : "-";
  return `${sign}${decimalFormatter.format(Math.abs(value))}%`;
}

function formatSignedCount(value) {
  if (value == null) return EMPTY_VALUE;
  const sign = value >= 0 ? "+" : "-";
  return `${sign}${integerFormatter.format(Math.abs(value))}`;
}

function formatCount(value) {
  return value == null ? EMPTY_VALUE : integerFormatter.format(value);
}

function toneClass(value) {
  if (value == null) return "text-text-primary";
  return value >= 0 ? "text-green" : "text-red";
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

function CompanyLogo({ symbol }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = getStockLogoUrl(symbol);

  if (!logoUrl || failed) {
    return (
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/6 font-body text-[0.6875rem] font-semibold text-primary"
        aria-hidden="true"
      >
        {symbol.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={logoUrl}
      alt=""
      width={36}
      height={36}
      loading="lazy"
      decoding="async"
      className="h-9 w-9 shrink-0 rounded-full border border-primary/8 bg-white object-contain p-[3px]"
      onError={() => setFailed(true)}
    />
  );
}

function CardShell({ children }) {
  return (
    <article className="flex h-full w-full max-w-[22rem] flex-col rounded-xl border border-primary/10 bg-white px-4 py-[1.125rem] shadow-[0_6px_20px_rgba(34,43,120,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:border-green/25 hover:shadow-[0_12px_30px_rgba(34,43,120,0.09)] motion-safe:hover:-translate-y-0.5 md:max-w-none">
      {children}
    </article>
  );
}

function CardHeader({ symbol, badge }) {
  return (
    <div className="flex items-center gap-2.5">
      <CompanyLogo symbol={symbol} />
      <span className="min-w-0 flex-1 truncate font-body text-[0.8125rem] font-semibold tracking-[0.03em] text-text-primary uppercase">
        {symbol}
      </span>
      {badge}
    </div>
  );
}

function PriceBlock({ label, value, change }) {
  return (
    <div className="mt-4">
      <div className="flex w-full items-center justify-between gap-2">
        <p className="m-0 font-display text-[1.375rem] leading-none font-semibold tracking-[-0.01em] text-text-primary tabular-nums">
          {value}
        </p>
        {change != null && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 font-body text-[0.8125rem] leading-none font-semibold tabular-nums ${toneClass(change)}`}
          >
            {formatPercent(change)}
            <DirectionChevron isUp={change >= 0} />
          </span>
        )}
      </div>
      <span className="mt-2 block font-body text-[0.625rem] font-medium tracking-[0.09em] text-text-primary/45 uppercase">
        {label}
      </span>
    </div>
  );
}

function StatList({ children }) {
  return (
    <dl className="mt-4 flex flex-col gap-2 border-t border-primary/8 pt-3">
      {children}
    </dl>
  );
}

function StatRow({ label, value, tone = "text-text-primary" }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="font-body text-[0.625rem] font-medium tracking-[0.07em] text-text-primary/45 uppercase">
        {label}
      </dt>
      <dd
        className={`m-0 font-body text-[0.8125rem] font-semibold tabular-nums ${tone}`}
      >
        {value}
      </dd>
    </div>
  );
}

/** Top Gainers and Top Losers share this card: LTP, price change, both PPLs. */
function MoverCard({ row }) {
  return (
    <CardShell>
      <CardHeader symbol={row.symbol} />
      <PriceBlock label="LTP" value={formatPrice(row.price)} change={row.priceChange} />
      <StatList>
        <StatRow
          label="Today's PPL"
          value={formatSignedCount(row.todayPpl)}
          tone={toneClass(row.todayPpl)}
        />
        <StatRow
          label="Last 5 Days PPL"
          value={formatSignedCount(row.fiveDayPpl)}
          tone={toneClass(row.fiveDayPpl)}
        />
      </StatList>
    </CardShell>
  );
}

function Top10Card({ row }) {
  return (
    <CardShell>
      <CardHeader
        symbol={row.symbol}
        badge={
          row.rank != null && (
            <span className="shrink-0 rounded-md bg-green/10 px-2 py-1 font-body text-[0.6875rem] leading-none font-semibold text-green-dark tabular-nums">
              #{row.rank}
            </span>
          )
        }
      />
      <PriceBlock label="Price" value={formatPrice(row.price)} change={row.priceChange} />
      <StatList>
        <StatRow label="Price At Entry" value={formatPrice(row.priceAtEntry)} />
        <StatRow label="Date At Entry" value={row.dateAtEntry || EMPTY_VALUE} />
        <StatRow
          label="5 Days PPL"
          value={formatSignedCount(row.fiveDayPpl)}
          tone={toneClass(row.fiveDayPpl)}
        />
      </StatList>
    </CardShell>
  );
}

/** Most Active Calls and Puts share this card: strike, trigger, OI and S/W. */
function OptionActivityCard({ row }) {
  const remarkTone =
    row.remark === "S"
      ? "bg-green/10 text-green-dark"
      : row.remark === "W"
        ? "bg-red/8 text-red"
        : "bg-primary/6 text-primary";

  return (
    <CardShell>
      <CardHeader
        symbol={row.symbol}
        badge={
          row.remark && (
            <span
              className={`shrink-0 rounded-md px-2 py-1 font-body text-[0.6875rem] leading-none font-semibold ${remarkTone}`}
              title="S/W"
            >
              {row.remark}
            </span>
          )
        }
      />
      <PriceBlock label="Price Close" value={formatPrice(row.priceClose)} />
      <StatList>
        <StatRow label="Strike Price" value={formatCount(row.strike)} />
        <StatRow
          label="Trigger Point"
          value={
            row.triggerPoint == null
              ? EMPTY_VALUE
              : decimalFormatter.format(row.triggerPoint)
          }
        />
        <StatRow label="OI" value={formatCount(row.openInterest)} />
        <StatRow
          label="ΔOI"
          value={formatSignedCount(row.changeInOi)}
          tone={toneClass(row.changeInOi)}
        />
      </StatList>
    </CardShell>
  );
}

function ReportCard({ variant, row }) {
  if (variant === "top10") return <Top10Card row={row} />;
  if (variant === "option") return <OptionActivityCard row={row} />;
  return <MoverCard row={row} />;
}

function SkeletonCard({ rows }) {
  return (
    <div
      className="flex h-full w-full max-w-[22rem] flex-col rounded-xl border border-primary/8 bg-white px-4 py-[1.125rem] md:max-w-none"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2.5">
        <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-primary/8" />
        <div className="h-3 w-20 animate-pulse rounded bg-primary/8" />
      </div>
      <div className="mt-4 h-6 w-24 animate-pulse rounded-md bg-primary/8" />
      <div className="mt-3 h-3 w-16 animate-pulse rounded bg-primary/6" />
      <div className="mt-4 flex flex-col gap-2 border-t border-primary/8 pt-3">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="h-2.5 w-20 animate-pulse rounded bg-primary/6" />
            <div className="h-2.5 w-12 animate-pulse rounded bg-primary/8" />
          </div>
        ))}
      </div>
    </div>
  );
}

const SKELETON_ROWS = { mover: 2, top10: 3, option: 4 };

export default function ReportsSection() {
  const [activeId, setActiveId] = useState(REPORTS[0].id);
  const [requestKey, setRequestKey] = useState(0);
  const [state, setState] = useState({ status: "loading", rows: [] });

  const activeReport = REPORTS.find((report) => report.id === activeId);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    setState({ status: "loading", rows: [] });

    fetchReportRows(activeReport, { signal: controller.signal })
      .then((rows) => {
        if (active) setState({ status: "success", rows });
      })
      .catch(() => {
        if (active) setState({ status: "error", rows: [] });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [activeReport, requestKey]);

  const { status, rows } = state;

  return (
    <section
      aria-labelledby="reports-heading"
      className="bg-hero-start/45 px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(4rem,7vw,6.5rem)] pb-[clamp(4rem,7vw,6.5rem)]"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <h2
          id="reports-heading"
          className="m-0 text-center font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.015em] text-text-primary"
        >
          Market Reports
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-3 block h-[3px] w-11 rounded-full bg-green"
        />

        <div
          role="group"
          aria-label="Select a report"
          className="mx-auto mt-[clamp(1.75rem,3vw,2.5rem)] flex max-w-full gap-1 overflow-x-auto border-b border-primary/10 [scrollbar-width:none] sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden"
        >
          {REPORTS.map((report) => {
            const isActive = report.id === activeId;

            return (
              <button
                key={report.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveId(report.id)}
                className={`relative cursor-pointer border-0 bg-transparent px-[clamp(0.75rem,1.6vw,1.15rem)] pt-2 pb-3 font-body text-[0.75rem] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive
                    ? "text-green-dark"
                    : "text-text-primary/50 hover:text-primary"
                }`}
              >
                {report.label}
                <span
                  className={`absolute inset-x-[clamp(0.75rem,1.6vw,1.15rem)] -bottom-px h-[2px] rounded-full transition-opacity duration-200 ${
                    isActive ? "bg-green opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        {status === "error" ? (
          <p
            className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap items-center justify-center gap-2 text-center text-small text-text-primary/60"
            role="status"
          >
            Unable to load this report.
            <button
              type="button"
              onClick={() => setRequestKey((key) => key + 1)}
              className="cursor-pointer border-0 border-b border-primary bg-transparent p-0 font-body text-small font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Try again
            </button>
          </p>
        ) : (
          <div
            className="mt-[clamp(1.75rem,3vw,2.5rem)] grid grid-cols-1 justify-items-center gap-x-[1.08rem] gap-y-4 md:grid-cols-2 xl:grid-cols-5"
            aria-busy={status === "loading"}
          >
            {status === "loading"
              ? Array.from({ length: MAX_REPORT_ROWS }, (_, index) => (
                  <SkeletonCard
                    key={index}
                    rows={SKELETON_ROWS[activeReport.variant]}
                  />
                ))
              : rows.map((row, index) => (
                  <ReportCard
                    key={`${activeReport.id}-${row.symbol}-${index}`}
                    variant={activeReport.variant}
                    row={row}
                  />
                ))}
          </div>
        )}

        {status === "success" && rows.length === 0 && (
          <p
            className="mt-6 text-center text-small text-text-primary/55"
            role="status"
          >
            No entries are available for this report right now.
          </p>
        )}
      </div>
    </section>
  );
}
