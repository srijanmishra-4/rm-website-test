"use client";

import { useEffect, useRef, useState } from "react";

import { useSectionReveal } from "@/lib/motion";
import { getStockLogoUrl } from "@/lib/market";
import { REPORTS, fetchAllMarketReports } from "@/lib/reports";

import "./reports-section.css";

const decimalFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const integerFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

function formatPrice(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return "₹0";
  return `₹${decimalFormatter.format(num)}`;
}

function formatPercent(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num) || num === 0) return "0%";
  const sign = num > 0 ? "+" : "-";
  return `${sign}${decimalFormatter.format(Math.abs(num))}%`;
}

function formatSignedCount(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num) || num === 0) return "0";
  const sign = num > 0 ? "+" : "-";
  return `${sign}${integerFormatter.format(Math.abs(num))}`;
}

function formatCount(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return "0";
  return integerFormatter.format(num);
}

function formatStrike(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return "0";
  return integerFormatter.format(num);
}

function formatCurrencyValue(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num)) return "₹0";
  return `₹${decimalFormatter.format(num)}`;
}

function toneClass(value) {
  const num = Number(value ?? 0);
  if (!Number.isFinite(num) || num === 0) return "text-text-primary";
  return num > 0 ? "text-green" : "text-red";
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
  const safeSymbol = (symbol != null ? String(symbol) : "0").trim() || "0";
  const logoUrl = getStockLogoUrl(safeSymbol);

  if (!logoUrl || failed) {
    return (
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/6 font-body text-[0.6875rem] font-semibold text-primary"
        aria-hidden="true"
      >
        {safeSymbol.slice(0, 2).toUpperCase()}
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

function getRemarkStyle(remark) {
  if (!remark) return "";
  const code = String(remark).trim().toUpperCase();
  switch (code) {
    case "S":
      return "bg-green/10 text-green-dark border border-green/20";
    case "W":
      return "bg-red/10 text-red border border-red/20";
    case "N":
      return "bg-blue/10 text-blue border border-blue/20";
    default:
      return "bg-primary/8 text-primary border border-primary/15";
  }
}

function CardShell({ children }) {
  return (
    <article className="flex h-full w-full max-w-[24rem] flex-col rounded-xl border border-primary/10 bg-white px-4 py-[1.125rem] shadow-[0_6px_20px_rgba(34,43,120,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:border-green/25 hover:shadow-[0_12px_30px_rgba(34,43,120,0.09)] motion-safe:hover:-translate-y-0.5 md:max-w-none">
      {children}
    </article>
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

/**
 * Type A Card: Futures / Market Report Card.
 * Uses dynamic key/value first row determined by backend object.key / object.value.
 */
function MarketReportCard({ row }) {
  const safeRow = row || {};
  const symbol = safeRow.symbol || "0";
  const priceChange = safeRow.price_change ?? 0;

  return (
    <CardShell>
      {/* TOP AREA */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <CompanyLogo symbol={symbol} />
          <span className="truncate font-body text-[0.8125rem] font-semibold tracking-[0.03em] text-text-primary uppercase">
            {symbol}
          </span>
        </div>
        <div className="text-right shrink-0">
          <p className="m-0 font-display text-[1.0625rem] leading-none font-semibold tracking-[-0.01em] text-text-primary tabular-nums">
            {formatPrice(safeRow.price)}
          </p>
          <div
            className={`mt-1.5 inline-flex items-center justify-end gap-1 font-body text-[0.75rem] leading-none font-semibold tabular-nums ${toneClass(priceChange)}`}
          >
            {formatPercent(priceChange)}
            <DirectionChevron isUp={Number(priceChange) >= 0} />
          </div>
        </div>
      </div>

      {/* STAT ROWS */}
      <StatList>
        <StatRow
          label={safeRow.key || "VALUE"}
          value={formatCurrencyValue(safeRow.value)}
        />
        <StatRow label="VOLUME" value={formatCount(safeRow.volume)} />
        <StatRow
          label="ΔVOLUME"
          value={formatSignedCount(safeRow.chg_in_volume)}
          tone={toneClass(safeRow.chg_in_volume)}
        />
        <StatRow label="OI" value={formatCount(safeRow.oi)} />
        <StatRow
          label="ΔOI"
          value={formatSignedCount(safeRow.chg_in_oi)}
          tone={toneClass(safeRow.chg_in_oi)}
        />
      </StatList>
    </CardShell>
  );
}

/**
 * Type B Card: Most Active Call / Put Option Card.
 * Header displays Symbol and Price on top line, [strike - CE/PE] + compact Remark badge and Price Change on second line.
 * Stat rows display TRIGGER PRICE (tp), VOLUME, ΔVOLUME, OI, ΔOI.
 */
function OptionReportCard({ row, optionType }) {
  const safeRow = row || {};
  const symbol = safeRow.symbol || "0";
  const priceChange = safeRow.price_change ?? 0;

  return (
    <CardShell>
      {/* TOP AREA */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <CompanyLogo symbol={symbol} />
          <div className="min-w-0 flex-1">
            <span className="block truncate font-body text-[0.8125rem] font-semibold tracking-[0.03em] text-text-primary uppercase">
              {symbol}
            </span>
            <div className="mt-0.5 flex items-center gap-1.5 min-w-0">
              <span className="truncate font-body text-[0.6875rem] font-medium text-text-primary/60 tabular-nums">
                {formatStrike(safeRow.strike_pr)}{optionType ? ` - ${optionType}` : ""}
              </span>
              {safeRow.remark ? (
                <span
                  className={`inline-flex items-center justify-center shrink-0 rounded-[3px] px-1.25 py-[2px] font-body text-[0.5625rem] leading-none font-bold uppercase tracking-wider ${getRemarkStyle(safeRow.remark)}`}
                  title={`Remark: ${safeRow.remark}`}
                >
                  {safeRow.remark}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="m-0 font-display text-[1.0625rem] leading-none font-semibold tracking-[-0.01em] text-text-primary tabular-nums">
            {formatPrice(safeRow.price)}
          </p>
          <div
            className={`mt-1.5 inline-flex items-center justify-end gap-1 font-body text-[0.75rem] leading-none font-semibold tabular-nums ${toneClass(priceChange)}`}
          >
            {formatPercent(priceChange)}
            <DirectionChevron isUp={Number(priceChange) >= 0} />
          </div>
        </div>
      </div>

      {/* STAT ROWS */}
      <StatList>
        <StatRow
          label="TRIGGER PRICE"
          value={formatCurrencyValue(safeRow.tp)}
        />
        <StatRow label="VOLUME" value={formatCount(safeRow.volume)} />
        <StatRow
          label="ΔVOLUME"
          value={formatSignedCount(safeRow.chg_in_volume)}
          tone={toneClass(safeRow.chg_in_volume)}
        />
        <StatRow label="OI" value={formatCount(safeRow.oi)} />
        <StatRow
          label="ΔOI"
          value={formatSignedCount(safeRow.chg_in_oi)}
          tone={toneClass(safeRow.chg_in_oi)}
        />
      </StatList>
    </CardShell>
  );
}

function ReportCard({ variant, reportId, row }) {
  if (variant === "typeB") {
    const optionType = reportId === "mostActiveCall" ? "CE" : reportId === "mostActivePut" ? "PE" : "";
    return <OptionReportCard row={row} optionType={optionType} />;
  }
  return <MarketReportCard row={row} />;
}

function SkeletonCard() {
  return (
    <div
      className="flex h-full w-full max-w-[24rem] flex-col rounded-xl border border-primary/8 bg-white px-4 py-[1.125rem] md:max-w-none"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-primary/8" />
          <div className="h-3 w-16 animate-pulse rounded bg-primary/8" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-3.5 w-14 animate-pulse rounded bg-primary/8" />
          <div className="h-3 w-10 animate-pulse rounded bg-primary/6" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-primary/8 pt-3">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="h-2.5 w-20 animate-pulse rounded bg-primary/6" />
            <div className="h-2.5 w-12 animate-pulse rounded bg-primary/8" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Hook to dynamically calculate display limit based on responsive viewport width:
 * Desktop (>= 1280px): 10 items
 * Tablet/Medium (>= 768px): 8 items
 * Mobile (< 768px): 5 items
 */
function useDisplayLimit() {
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    function updateLimit() {
      if (window.innerWidth >= 1280) {
        setLimit(10);
      } else if (window.innerWidth >= 768) {
        setLimit(8);
      } else {
        setLimit(5);
      }
    }

    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  return limit;
}

const ROW_1_REPORTS = REPORTS.slice(0, 6);
const ROW_2_REPORTS = REPORTS.slice(6, 10);

export default function ReportsSection() {
  const [activeId, setActiveId] = useState(REPORTS[0].id);
  const [requestKey, setRequestKey] = useState(0);
  const [state, setState] = useState({ status: "loading", data: null });
  const [sectionRef, sectionVisible] = useSectionReveal("0px 0px -8% 0px");
  const displayLimit = useDisplayLimit();

  const activeReport = REPORTS.find((report) => report.id === activeId) || REPORTS[0];

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    setState({ status: "loading", data: null });

    fetchAllMarketReports({ signal: controller.signal })
      .then((data) => {
        if (active) setState({ status: "success", data });
      })
      .catch(() => {
        if (active) setState({ status: "error", data: null });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [requestKey]);

  const { status, data } = state;

  // Selected report array from the single cached API response, sliced to responsive limit.
  // Backend array order is strictly preserved.
  const activeRows = data && Array.isArray(data[activeId])
    ? data[activeId].slice(0, displayLimit)
    : [];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reports-heading"
      className={`reports-section bg-hero-start/45 px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(4rem,7vw,6.5rem)] pb-[clamp(4rem,7vw,6.5rem)]${sectionVisible ? " is-visible" : ""}`}
    >
      <div className="mx-auto w-full max-w-[84rem]">
        <div className="reports-section__inner-reveal rm-reveal">
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

          {/* 10 Selectable Reports Navigation */}
          <div
            role="group"
            aria-label="Select a report"
            className="mx-auto mt-[clamp(1.75rem,3vw,2.5rem)] w-full max-w-full"
          >
            {/* Desktop / Large Screen Layout (>= 1024px): Approved 6 + 4 Row Split */}
            <div className="hidden lg:flex flex-col gap-2">
              {/* Row 1: 6 report options — compact centered group */}
              <div className="flex justify-center gap-[1.2rem]">
                {ROW_1_REPORTS.map((report) => {
                  const isActive = report.id === activeId;

                  return (
                    <button
                      key={report.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(report.id)}
                      className={`relative flex items-center justify-center text-center cursor-pointer border-0 bg-transparent px-2 pt-2.5 pb-3 font-body text-[0.75rem] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isActive
                        ? "text-green-dark"
                        : "text-text-primary/50 hover:text-primary"
                        }`}
                    >
                      <span>{report.label}</span>
                      <span
                        className={`absolute inset-x-2 -bottom-px h-[2px] rounded-full transition-opacity duration-200 ${isActive ? "bg-green opacity-100" : "opacity-0"
                          }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              {/* Row 2: 4 report options — compact centered group */}
              <div className="flex justify-center gap-[1.2rem]">
                {ROW_2_REPORTS.map((report) => {
                  const isActive = report.id === activeId;

                  return (
                    <button
                      key={report.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(report.id)}
                      className={`relative flex items-center justify-center text-center cursor-pointer border-0 bg-transparent px-1.5 pt-2.5 pb-3 font-body text-[0.75rem] font-semibold tracking-[0.06em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isActive
                        ? "text-green-dark"
                        : "text-text-primary/50 hover:text-primary"
                        }`}
                    >
                      <span>{report.label}</span>
                      <span
                        className={`absolute inset-x-2 -bottom-px h-[2px] rounded-full transition-opacity duration-200 ${isActive ? "bg-green opacity-100" : "opacity-0"
                          }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet Responsive Layout (< 1024px): 2-column outward flow from center */}
            <div className="grid lg:hidden grid-cols-2 gap-x-2.5 sm:gap-x-5 gap-y-1.5 sm:gap-y-2 w-full max-w-[34rem] mx-auto">
              {REPORTS.map((report, idx) => {
                const isActive = report.id === activeId;
                const isLeft = idx % 2 === 0;

                return (
                  <button
                    key={report.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(report.id)}
                    className={`relative flex items-center cursor-pointer border-0 bg-transparent px-2 pt-2 pb-2.5 font-body text-[0.75rem] font-semibold tracking-[0.05em] whitespace-nowrap uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      isLeft ? "justify-self-end text-right" : "justify-self-start text-left"
                    } ${isActive
                      ? "text-green-dark"
                      : "text-text-primary/50 hover:text-primary"
                      }`}
                  >
                    <span>{report.label}</span>
                    <span
                      className={`absolute inset-x-2 -bottom-px h-[2px] rounded-full transition-opacity duration-200 ${isActive ? "bg-green opacity-100" : "opacity-0"
                        }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {status === "error" ? (
          <p
            className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap items-center justify-center gap-2 text-center text-small text-text-primary/60"
            role="status"
          >
            Unable to load market reports.
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
            key={activeId}
            className="reports-cards-grid mt-[clamp(1.75rem,3vw,2.5rem)] grid grid-cols-1 justify-items-center gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-5"
            aria-busy={status === "loading"}
          >
            {status === "loading"
              ? Array.from({ length: displayLimit }, (_, index) => (
                <SkeletonCard key={index} />
              ))
              : activeRows.map((row, index) => (
                <ReportCard
                  key={`${activeId}-${row.symbol}-${index}`}
                  variant={activeReport.variant}
                  reportId={activeId}
                  row={row}
                />
              ))}
          </div>
        )}

        {status === "success" && activeRows.length === 0 && (
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
