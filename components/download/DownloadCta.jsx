"use client";

import { useSectionReveal } from "@/lib/motion";
import "./download-cta.css";

/* ── Inline SVG Icons ──────────────────────────────────────── */

function TrendlineIcon({ className = "dl-cta__trend-svg" }) {
  return (
    <svg viewBox="0 0 54 18" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 14L13 11.5L24 15L36 6L44 8.5L52 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="6" r="2.5" fill="currentColor" />
      <circle cx="52" cy="2.5" r="2" fill="currentColor" />
    </svg>
  );
}

function AppleIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  );
}

function PlayStoreIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92Zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635ZM17.7 8.448l3.142 1.818a1 1 0 0 1 0 1.736L17.7 13.82l-2.534-2.534L17.7 8.448ZM5.864 3.469l10.937 6.333-2.302 2.302-8.635-8.635Z" />
    </svg>
  );
}

export default function DownloadCta() {
  const [sectionRef, visible] = useSectionReveal("0px 0px -5% 0px");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="dl-unified-heading"
      className={`dl-cta px-[clamp(1.5rem,5vw,4rem)] py-[clamp(6rem,8vw,7.5rem)]${visible ? " is-visible" : ""}`}
    >
      {/* Premium ambient atmosphere backgrounds */}
      <div className="dl-cta__ambient-top" aria-hidden="true" />
      <div className="dl-cta__ambient-bottom" aria-hidden="true" />

      <div className="dl-cta__container rm-reveal mx-auto max-w-[48rem] text-center">
        {/* ══════════════════════════════════════════════════════════
            BLOCK 1: EDITORIAL TRUST STATEMENT
            ══════════════════════════════════════════════════════════ */}
        <div className="dl-cta__trust-block">
          {/* Eyebrow with integrated subtle trendline badge */}
          <div className="dl-cta__eyebrow-wrap">
            <span className="dl-cta__eyebrow-badge">
              <TrendlineIcon className="dl-cta__trend-svg" />
              <span className="dl-cta__eyebrow-text">WHY RICHMONKS</span>
            </span>
          </div>

          {/* Trust Headline */}
          <h2 id="dl-unified-heading" className="dl-cta__trust-headline [text-wrap:balance]">
            Nobody can predict the market.
          </h2>

          {/* Trust Supporting Line */}
          <p className="dl-cta__trust-support [text-wrap:pretty]">
            But better data, logical systems and the right tools can help you
            understand it better.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            DIVIDER MOMENT: SUBTLE GRADIENT RULE
            ══════════════════════════════════════════════════════════ */}
        <div className="dl-cta__divider-wrap" aria-hidden="true">
          <div className="dl-cta__divider" />
        </div>

        {/* ══════════════════════════════════════════════════════════
            BLOCK 2: DOWNLOAD CTA MOMENT
            ══════════════════════════════════════════════════════════ */}
        <div className="dl-cta__action-block">
          {/* App CTA Headline */}
          <h3 className="dl-cta__action-headline [text-wrap:balance]">
            Take the market with you.
          </h3>

          {/* App CTA Subtext */}
          <p className="dl-cta__action-subtext [text-wrap:pretty]">
            Get RichMonks on your phone and stay connected to the insights that matter.
          </p>

          {/* Download Label */}
          <p className="dl-cta__download-label">DOWNLOAD ON</p>

          {/* Store Badges */}
          <div className="dl-cta__badges">
            <a
              href="#"
              className="dl-cta__badge"
              aria-label="Download RichMonks on the App Store"
            >
              <AppleIcon className="dl-cta__badge-icon" />
              <span className="dl-cta__badge-text">
                <span className="dl-cta__badge-label">Download on the</span>
                <span className="dl-cta__badge-store">App Store</span>
              </span>
            </a>

            <a
              href="#"
              className="dl-cta__badge"
              aria-label="Get RichMonks on Google Play"
            >
              <PlayStoreIcon className="dl-cta__badge-icon" />
              <span className="dl-cta__badge-text">
                <span className="dl-cta__badge-label">GET IT ON</span>
                <span className="dl-cta__badge-store">Google Play</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

