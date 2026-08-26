"use client";

import React from "react";
import "./risk-oversight.css";

const RISK_CARDS = [
  {
    number: "01",
    title: "Exposure Control",
    description:
      "Capital allocation varies based on clarity of market conditions.",
    gridClass: "risk-card--span-3",
  },
  {
    number: "02",
    title: "No Forced Activity",
    description:
      "Trading is avoided in low-conviction or uncertain environments.",
    gridClass: "risk-card--span-3",
  },
  {
    number: "03",
    title: "Alignment-Based Control",
    description:
      "Positions are taken only in line with the defined market direction.",
    gridClass: "risk-card--span-3",
  },
  {
    number: "04",
    title: "Defined Risk Per Trade",
    description:
      "All trades are governed by predefined stop-loss parameters, ensuring that downside is controlled at the position level.",
    gridClass: "risk-card--span-3",
  },
  {
    number: "05",
    title: "Defined Holding Structure",
    description:
      "Positions follow predefined rules, avoiding premature exits or reactive extensions.",
    gridClass: "risk-card--span-2",
  },
  {
    number: "06",
    title: "Process Stability",
    description:
      "The framework is not altered to chase short-term performance.",
    gridClass: "risk-card--span-2",
  },
  {
    number: "07",
    title: "Risk Philosophy",
    description:
      "Consistency of process is the primary control on risk.",
    gridClass: "risk-card--span-2",
  },
];

export default function RiskOversight() {
  return (
    <section
      id="risk-oversight"
      aria-labelledby="risk-oversight-heading"
      className="risk-oversight-section"
    >
      {/* Background ambient lighting */}
      <div className="risk-oversight-ambient" aria-hidden="true" />

      <div className="risk-oversight-container">
        <div className="risk-oversight-layout">
          {/* ── LEFT COLUMN: Editorial Risk Statement ── */}
          <div className="risk-oversight-left">
            <span className="risk-oversight-eyebrow">RISK & OVERSIGHT</span>

            <h2
              id="risk-oversight-heading"
              className="risk-oversight-heading"
            >
              Risk Is Embedded
              <br className="risk-heading-br" />
              in the Process
            </h2>

            <div className="risk-oversight-divider" aria-hidden="true" />

            <p className="risk-oversight-body">
              Risk is not managed after the fact. It is built into every
              decision, structure, and position — before a trade is placed.
            </p>
          </div>

          {/* ── RIGHT COLUMN: 2 + 2 + 3 Card Grid ── */}
          <div className="risk-oversight-grid" role="list">
            {RISK_CARDS.map((card) => (
              <article
                key={card.number}
                className={`risk-card ${card.gridClass}`}
                role="listitem"
              >
                {/* Subtle Left Accent Edge */}
                <span className="risk-card-accent-strip" aria-hidden="true" />

                {/* Decorative Faint Background Number */}
                <span className="risk-card-number" aria-hidden="true">
                  {card.number}
                </span>

                {/* Card Content */}
                <h3 className="risk-card-title">{card.title}</h3>
                <p className="risk-card-description">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
