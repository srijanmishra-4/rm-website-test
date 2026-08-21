import React from "react";
import {
  Search,
  BarChart3,
  TrendingUp,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import "./approach-hero.css";

const BADGES = [
  { label: "Research-Led", icon: Search },
  { label: "Quantitative", icon: BarChart3 },
  { label: "Predictive Analytics", icon: TrendingUp },
  { label: "Real-Time Data", icon: Zap },
  { label: "Risk-Aware", icon: ShieldCheck },
  { label: "Evidence-Based", icon: CheckCircle2 },
];

export default function ApproachHero() {
  return (
    <section
      aria-labelledby="approach-hero-heading"
      className="approach-hero-section relative isolate mt-[calc(var(--spacing-header)*-1)] overflow-hidden px-[clamp(1.5rem,5vw,4rem)] pt-header lg:mt-[calc(var(--spacing-header-lg)*-1)] lg:pt-[var(--spacing-header-lg)]"
    >
      {/* Greenish ambient gradients */}
      <div className="approach-hero-ambient" aria-hidden="true" />

      {/* Subtle dot texture */}
      <div className="approach-hero-dots" aria-hidden="true" />

      {/* Full-width faded watermark spread edge-to-edge */}
      <div className="approach-hero-watermark-wrap" aria-hidden="true">
        <span className="approach-hero-watermark">RICHMONKS</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[80rem] pt-[clamp(2.5rem,5vw,4.25rem)] pb-[clamp(3.25rem,6vw,5rem)]">
        <div className="mx-auto max-w-[56rem] text-center">
          {/* Eyebrow / Top Label */}
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            METHODOLOGY × TECHNOLOGY
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          {/* Main Heading */}
          <div className="relative mt-[clamp(1rem,1.8vw,1.5rem)]">
            <h1
              id="approach-hero-heading"
              className="relative m-0 font-display text-[clamp(1.9rem,5.2vw,3.75rem)] leading-[1.1] font-semibold tracking-[-0.018em] text-balance text-text-primary"
            >
              <span className="block">From Quantitative Modelling</span>
              <span className="block text-green">to Disciplined Execution.</span>
            </h1>
          </div>

          {/* Accent Divider */}
          <span
            aria-hidden="true"
            className="mx-auto mt-[clamp(1.25rem,2.2vw,1.85rem)] block h-0.5 w-9 rounded-full bg-green"
          />

          {/* Description Paragraph */}
          <p className="mx-auto mt-[clamp(1rem,1.8vw,1.35rem)] mb-0 max-w-[42rem] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.75] text-text-primary/70">
            Richmonks integrates proprietary quantitative research—with
            backtested algorithms to generate risk-controlled strategies for
            superior alpha generation
          </p>

          {/* Process Pill / Pipeline Label */}
          <div className="mt-[clamp(1.5rem,2.2vw,2rem)] flex justify-center">
            <div className="approach-process-capsule" role="status" aria-label="Process Flow">
              <span className="approach-process-step">RESEARCH</span>
              <span className="approach-process-arrow" aria-hidden="true">→</span>
              <span className="approach-process-step">MODEL</span>
              <span className="approach-process-arrow" aria-hidden="true">→</span>
              <span className="approach-process-step">EXECUTE</span>
              <span className="approach-process-arrow" aria-hidden="true">→</span>
              <span className="approach-process-step">REFINE</span>
            </div>
          </div>

          {/* Badges in ONE horizontal row on desktop */}
          <ul className="m-0 mt-[clamp(1.5rem,2.6vw,2.15rem)] flex list-none flex-wrap items-center justify-center gap-2.5 p-0">
            {BADGES.map(({ label, icon: Icon }) => (
              <li key={label} className="approach-badge">
                <Icon
                  size={14}
                  className="shrink-0 text-green"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
