"use client";

import React from "react";
import {
  BarChart3,
  Compass,
  SlidersHorizontal,
  Crosshair,
} from "lucide-react";
import "./our-pipeline.css";

const STAGES = [
  {
    number: "01",
    stageLabel: "STAGE 01",
    title: "Market State Classification",
    description:
      "Each trading day is evaluated using a combination of quantitative indicators and proprietary variables to determine whether the market state is bullish, bearish, or neutral.",
    icon: BarChart3,
    accent: "blue",
  },
  {
    number: "02",
    stageLabel: "STAGE 02",
    title: "Directional Bias",
    description: "A clear directional stance is established:",
    bullets: [
      { label: "Bullish", outcome: "Long exposure" },
      { label: "Bearish", outcome: "Short exposure" },
      { label: "Neutral", outcome: "Limited participation" },
    ],
    icon: Compass,
    accent: "blue",
  },
  {
    number: "03",
    stageLabel: "STAGE 03",
    title: "Systematic Selection",
    description:
      "Stocks and derivative positions are selected using predefined algorithmic filters aligned with the identified market state.",
    icon: SlidersHorizontal,
    accent: "blue",
  },
  {
    number: "04",
    stageLabel: "STAGE 04",
    title: "Execution Discipline",
    description:
      "Positions are executed within a defined framework — no impulse trading or reactive decision making, structured holding periods, and clearly defined stop losses.",
    icon: Crosshair,
    accent: "green",
  },
];

export default function OurPipeline() {
  return (
    <section aria-labelledby="pipeline-heading" className="pipeline-section">
      {/* Background Subtle Dot Grid & Ambient Glows */}
      <div className="pipeline-dots" aria-hidden="true" />
      <div className="pipeline-ambient" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[80rem]">
        {/* ── Section Header ── */}
        <div className="pipeline-header">
          <span className="pipeline-eyebrow">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            OUR PIPELINE
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          <h2 id="pipeline-heading" className="pipeline-heading">
            A Systematic Path to Performance
          </h2>

          <div className="pipeline-divider" aria-hidden="true" />

          <p className="pipeline-description">
            Four interconnected stages — each designed, tested, and refined to
            work as a unified system.
          </p>
        </div>

        {/* ── Main Pipeline System ── */}
        <div className="pipeline-system">
          {/* ── Horizontal Stage Line Track & Concentric Nodes (Desktop & Tablet) ── */}
          <div className="pipeline-track-container" aria-hidden="true">
            {/* The single continuous line running through the center of 4 nodes */}
            <div className="pipeline-line-track">
              {/* Animated Traveling Data Dots */}
              <span className="pipeline-data-dot pipeline-data-dot--1" />
              <span className="pipeline-data-dot pipeline-data-dot--2" />
              <span className="pipeline-data-dot pipeline-data-dot--3" />
            </div>

            {/* 4 Stage Nodes & Stage Labels */}
            <div className="pipeline-nodes-row">
              {STAGES.map((stage) => {
                const IconComponent = stage.icon;
                const isGreen = stage.accent === "green";

                return (
                  <div key={stage.number} className="pipeline-node-col">
                    {/* Concentric Node Circle */}
                    <div
                      className={`pipeline-node-outer ${
                        isGreen
                          ? "pipeline-node-outer--green"
                          : "pipeline-node-outer--blue"
                      }`}
                    >
                      <div
                        className={`pipeline-node-inner ${
                          isGreen
                            ? "pipeline-node-inner--green"
                            : "pipeline-node-inner--blue"
                        }`}
                      >
                        <IconComponent size={20} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Stage Label */}
                    <span
                      className={`pipeline-stage-label ${
                        isGreen
                          ? "pipeline-stage-label--green"
                          : "pipeline-stage-label--blue"
                      }`}
                    >
                      {stage.stageLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 4 Aligned Cards Grid ── */}
          <div className="pipeline-cards-grid">
            {STAGES.map((stage) => {
              const isGreen = stage.accent === "green";
              const IconComponent = stage.icon;

              return (
                <article
                  key={stage.number}
                  className={`pipeline-card ${
                    isGreen ? "pipeline-card--green" : "pipeline-card--blue"
                  }`}
                >
                  {/* Mobile header (visible only on mobile when track is hidden) */}
                  <div className="pipeline-card-mobile-header">
                    <div
                      className={`pipeline-card-mobile-node ${
                        isGreen
                          ? "pipeline-card-mobile-node--green"
                          : "pipeline-card-mobile-node--blue"
                      }`}
                    >
                      <IconComponent size={20} strokeWidth={2} />
                    </div>
                    <span
                      className={`pipeline-stage-label ${
                        isGreen
                          ? "pipeline-stage-label--green"
                          : "pipeline-stage-label--blue"
                      }`}
                    >
                      {stage.stageLabel}
                    </span>
                  </div>

                  {/* Large Faint Background Number */}
                  <span className="pipeline-card-number" aria-hidden="true">
                    {stage.number}
                  </span>

                  {/* Card Title */}
                  <h3 className="pipeline-card-title">{stage.title}</h3>

                  {/* Card Body */}
                  <p className="pipeline-card-body">{stage.description}</p>

                  {/* Structured Bullets for Stage 02 */}
                  {stage.bullets && (
                    <ul className="pipeline-bullet-list">
                      {stage.bullets.map((item) => (
                        <li key={item.label} className="pipeline-bullet-item">
                          <span className="pipeline-bullet-dot" />
                          <span className="pipeline-bullet-label">
                            {item.label}
                          </span>
                          <span
                            className="pipeline-bullet-arrow"
                            aria-hidden="true"
                          >
                            →
                          </span>
                          <span className="pipeline-bullet-value">
                            {item.outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
