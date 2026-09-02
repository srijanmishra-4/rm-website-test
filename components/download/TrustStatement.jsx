"use client";

import { useSectionReveal } from "@/lib/motion";

import "./trust-statement.css";

export default function TrustStatement() {
  const [sectionRef, visible] = useSectionReveal("0px 0px -8% 0px");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="dl-trust-heading"
      className={`dl-trust px-[clamp(1.5rem,5vw,4rem)] py-[clamp(3.75rem,5.5vw,5rem)]${visible ? " is-visible" : ""}`}
    >
      <div className="dl-trust__content rm-reveal mx-auto max-w-[42rem] text-center">
        {/* Subtle decorative market trendline */}
        <div className="dl-trust__trendline" aria-hidden="true">
          <svg viewBox="0 0 160 24" fill="none" className="dl-trust__trend-svg">
            <polyline
              points="0,18 25,16 50,19 75,9 105,12 135,4 160,2"
              stroke="rgba(33,169,71,0.3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="75" cy="9" r="2" fill="rgba(33,169,71,0.4)" />
            <circle cx="135" cy="4" r="2" fill="rgba(33,169,71,0.4)" />
          </svg>
        </div>

        <h2 id="dl-trust-heading" className="dl-trust__statement [text-wrap:balance]">
          Nobody can predict the market.
        </h2>

        <p className="dl-trust__support [text-wrap:pretty]">
          But better data, logical systems and the right tools can help you
          understand it better.
        </p>
      </div>
    </section>
  );
}
