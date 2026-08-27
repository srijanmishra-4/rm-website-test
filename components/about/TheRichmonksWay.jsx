import React from "react";
import Link from "next/link";
import "./the-richmonks-way.css";

export default function TheRichmonksWay() {
  return (
    <section aria-labelledby="richmonks-way-heading" className="the-way-section">
      {/* Ambient background glows */}
      <div className="the-way-ambient" aria-hidden="true" />

      {/* Subtle micro dot texture */}
      <div className="the-way-texture" aria-hidden="true" />

      <div className="the-way-container">
        {/* Main Heading */}
        <h2 id="richmonks-way-heading" className="the-way-heading">
          The Richmonks Way.
        </h2>

        {/* Description */}
        <p className="the-way-description">
          Our name reflects our identity: professionals who work with quiet
          conviction. Like monks, we value information over noise — like
          markets, we evolve with time. Our algorithms are not just built to trade
          — they are built to think, adapt, and earn trust through consistency.
        </p>

        {/* Centered Short Divider */}
        <div className="the-way-divider" aria-hidden="true" />

        {/* Closing Philosophy Statement */}
        <p className="the-way-closing">
          Trust the process. Trade with precision. Earn through discipline.
        </p>

        {/* CTA Button */}
        <div className="the-way-btn-wrap">
          <Link href="/contact" className="the-way-btn">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
