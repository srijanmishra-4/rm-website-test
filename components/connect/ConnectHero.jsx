import React from "react";
import { ShieldCheck, Lock } from "lucide-react";
import "./connect-hero.css";

const BADGES = [
  { label: "Professional Inquiries Only", icon: ShieldCheck },
  { label: "Responded with Discretion", icon: Lock },
];

export default function ConnectHero() {
  return (
    <section
      aria-labelledby="connect-hero-heading"
      className="connect-hero-section relative isolate mt-[calc(var(--spacing-header)*-1)] overflow-hidden px-[clamp(1.5rem,5vw,4rem)] pt-header lg:mt-[calc(var(--spacing-header-lg)*-1)] lg:pt-[var(--spacing-header-lg)]"
    >
      {/* Ambient cool-toned gradients */}
      <div className="connect-hero-ambient" aria-hidden="true" />

      {/* Subtle dot texture */}
      <div className="connect-hero-dots" aria-hidden="true" />

      {/* Top-right subtle decorative envelope outline */}
      <div
        className="pointer-events-none absolute top-16 right-8 lg:top-24 lg:right-20 select-none opacity-[0.14] text-primary"
        aria-hidden="true"
      >
        <svg
          className="h-16 w-16 -rotate-12 transform lg:h-20 lg:w-20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>

      {/* Sparse subtle decorative dots */}
      <div
        className="connect-dot top-28 left-[12%] h-1.5 w-1.5 bg-blue/25"
        aria-hidden="true"
      />
      <div
        className="connect-dot top-44 left-[22%] h-1 w-1 bg-green/30"
        aria-hidden="true"
      />
      <div
        className="connect-dot top-36 right-[28%] h-2 w-2 bg-blue/20"
        aria-hidden="true"
      />
      <div
        className="connect-dot bottom-24 left-[18%] h-1.5 w-1.5 bg-green/25"
        aria-hidden="true"
      />
      <div
        className="connect-dot bottom-32 right-[14%] h-1.5 w-1.5 bg-blue/25"
        aria-hidden="true"
      />

      {/* Very large low-opacity CONNECT watermark behind content */}
      <div className="connect-hero-watermark-wrap" aria-hidden="true">
        <span className="connect-hero-watermark">CONNECT</span>
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[76rem] pt-[clamp(2.5rem,5vw,4.25rem)] pb-[clamp(3.5rem,6vw,5.5rem)]">
        <div className="mx-auto max-w-[50rem] text-center">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            GET IN TOUCH
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          {/* Main Heading in a single line */}
          <div className="relative mt-[clamp(1rem,1.8vw,1.5rem)]">
            <h1
              id="connect-hero-heading"
              className="relative m-0 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.15] tracking-[-0.018em] text-balance text-text-primary"
            >
              Connect <span className="text-green">With Us.</span>
            </h1>
          </div>

          {/* Centered short horizontal accent divider */}
          <span
            aria-hidden="true"
            className="mx-auto mt-[clamp(1.25rem,2.2vw,1.85rem)] block h-0.5 w-12 rounded-full bg-gradient-to-r from-blue to-green"
          />

          {/* Description */}
          <p className="mx-auto mt-[clamp(1rem,1.8vw,1.35rem)] mb-0 max-w-[40rem] font-body text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.75] text-text-primary/70">
            Richmonks welcomes professional inquiries and collaborations related
            to quantitative research, algorithmic systems, and technological
            innovation.
          </p>

          {/* Exactly two badges */}
          <div className="mt-[clamp(1.5rem,2.6vw,2.15rem)] flex flex-wrap items-center justify-center gap-3">
            {BADGES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#ececef] bg-white/85 px-4 py-2 font-body text-[0.8125rem] font-semibold text-text-primary/75 shadow-[0_1px_2px_rgba(16,24,40,0.04)] backdrop-blur-xs transition-colors hover:border-green/30"
              >
                <Icon
                  size={14}
                  className="shrink-0 text-green"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
