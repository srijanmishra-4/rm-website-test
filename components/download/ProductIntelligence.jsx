"use client";

import { useSectionReveal } from "@/lib/motion";

import "./product-intelligence.css";

/* ── Purposeful SVG Motif Components ───────────────────────── */

/** 1. RichMonks Ranks — small ascending ranking bars */
function RanksMotif() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="15" width="4" height="6" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="8" y="11" width="4" height="10" rx="1" fill="currentColor" opacity="0.65" />
      <rect x="13.5" y="7" width="4" height="14" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="19" y="3" width="4" height="18" rx="1" fill="currentColor" />
    </svg>
  );
}

/** 2. RichMonks Score — consolidated multi-parameter score ring & rating badge */
function ScoreMotif() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Track circle */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.2"
      />
      {/* Active score arc ~80% */}
      <path
        d="M12 3a9 9 0 1 1-8.2 12.7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Score indicator center node */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

/** 3. Call/Put Velocity — directional call/put strength & speed vectors */
function VelocityMotif() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Upward Call vector */}
      <path
        d="M7 16V6M7 6L4 9M7 6l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Downward Put vector */}
      <path
        d="M17 8v10M17 18l-3-3M17 18l3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </svg>
  );
}

/** 4. RichMonks Sentimeter — prevailing market mood sentiment arc dial */
function SentimeterMotif() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Gauge arc track */}
      <path
        d="M3.5 17a9 9 0 0 1 17 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* Active sentiment range arc */}
      <path
        d="M3.5 17a9 9 0 0 1 13-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Dial needle pointing to market mood */}
      <line
        x1="12"
        y1="17"
        x2="15.5"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="2" fill="currentColor" />
    </svg>
  );
}

/** 5. Profit Per Lot — performance trend curve across strike lots */
function ProfitMotif() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 18l5-5 4 3 6-9 3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="7" r="2" fill="currentColor" />
    </svg>
  );
}

/** 6. Trigger Point — reference threshold crosshair & pivot point */
function TriggerMotif() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        opacity="0.35"
      />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/* ── Capability Data (Exact Product Names & Descriptions) ──── */

const CAPABILITIES = [
  {
    title: "RichMonks Ranks",
    description: "Daily quantitative F&O rankings.",
    motif: RanksMotif,
  },
  {
    title: "RichMonks Score",
    description: "Multi-parameter consolidated score.",
    motif: ScoreMotif,
  },
  {
    title: "Call/Put Velocity",
    description: "Call and put strength & speed.",
    motif: VelocityMotif,
  },
  {
    title: "RichMonks Sentimeter",
    description: "Prevailing market mood indicator.",
    motif: SentimeterMotif,
  },
  {
    title: "Profit Per Lot",
    description: "Profit pulse across strike lots.",
    motif: ProfitMotif,
  },
  {
    title: "Trigger Point",
    description: "Key reference for strength & shifts.",
    motif: TriggerMotif,
  },
];

export default function ProductIntelligence() {
  const [sectionRef, visible] = useSectionReveal("0px 0px -8% 0px");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="dl-intel-heading"
      className={`dl-intel px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4.5rem,7vw,6.5rem)]${visible ? " is-visible" : ""}`}
    >
      <div className="mx-auto w-full max-w-[80rem]">
        {/* ── Section Header ── */}
        <div className="rm-reveal mx-auto max-w-[48rem] text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            MARKET INTELLIGENCE
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          <h2
            id="dl-intel-heading"
            className="m-0 mt-3 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.2] font-semibold tracking-[-0.015em] text-text-primary [text-wrap:balance]"
          >
            Everything you need to read the market.
          </h2>

          <p className="mx-auto mt-3 mb-0 max-w-[36rem] text-[clamp(0.9375rem,1.05vw,1rem)] leading-[1.7] text-text-primary/65 [text-wrap:pretty]">
            RichMonks brings powerful market intelligence and F&amp;O-specific
            insights together, helping you cut through the noise and understand
            the market with greater clarity.
          </p>
        </div>

        {/* ── 6 Cards in 1 Row on Desktop ── */}
        <div className="dl-intel__grid rm-reveal rm-reveal--delay-1">
          {CAPABILITIES.map(({ title, description, motif: Motif }) => (
            <div key={title} className="dl-intel__card">
              {/* Icon and Title on the exact same horizontal line */}
              <div className="dl-intel__card-header">
                <div className="dl-intel__motif">
                  <Motif />
                </div>
                <h3 className="dl-intel__card-title">{title}</h3>
              </div>
              <p className="dl-intel__card-desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
