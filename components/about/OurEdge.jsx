"use client";

import React from "react";
import {
  Database,
  SlidersHorizontal,
  Compass,
  Layers,
  Activity,
  Crosshair,
} from "lucide-react";
import "./our-edge.css";

const ADVANTAGES = [
  {
    number: "01",
    title: "Market State First",
    description:
      "Participation is based on defined market conditions, not isolated signals.",
    icon: Layers,
    accent: "green",
  },
  {
    number: "02",
    title: "Behavioural Extremes",
    description:
      "Periods of excessive fear and greed create distortions. Our framework identifies these conditions and participates decisively when probabilities are favourable.",
    icon: Activity,
    accent: "blue",
  },
  {
    number: "03",
    title: "Selective Participation",
    description:
      "Capital is deployed only when conditions are favourable, improving probability of outcomes.",
    icon: Crosshair,
    accent: "green",
  },
  {
    number: "04",
    title: "Positional",
    description:
      "We avoid constant intraday churn. Once the market bias is set, our systems automatically identify and execute stock-specific opportunities aligned with it.",
    icon: Crosshair,
    accent: "blue",
  },
];

export default function OurEdge() {
  return (
    <section aria-labelledby="edge-heading" className="edge-section">
      <div className="edge-container">
        {/* ── Eyebrow Label ── */}
        <div className="edge-eyebrow-wrap">
          <span className="edge-eyebrow">OUR EDGE</span>
        </div>

        {/* ── Main Heading ── */}
        <h2 id="edge-heading" className="edge-heading">
          We Interpret the Market First.
        </h2>

        {/* ── Sub-line ── */}
        <p className="edge-subline">
          <em>Disciplined.</em> · <em>Data-driven.</em> · <em>State-aware.</em>
        </p>

        {/* ── Short Accent Divider ── */}
        <div className="edge-divider" aria-hidden="true" />

        {/* ── Body Paragraph ── */}
        <p className="edge-body">
          At Richmonks, our algorithms are tailored to interpret the market.
          While most quantitative strategies focus on scalping, high-frequency
          setups, or isolated technical signals, our approach is fundamentally
          different: we begin by comprehending the state of the market.
        </p>

        {/* ── Stat Cards Row ── */}
        <div className="edge-stats-row">
          {/* Stat 1: 2,400+ Days */}
          <div className="edge-stat-card edge-stat-card--green">
            <div className="edge-stat-accent-strip edge-stat-accent-strip--green" />
            <div className="edge-stat-icon-wrap edge-stat-icon-wrap--green">
              <Database className="edge-stat-icon" size={24} strokeWidth={2} />
            </div>
            <div className="edge-stat-text">
              <span className="edge-stat-value edge-stat-value--green">
                2,400+
              </span>
              <span className="edge-stat-caption">
                Trading Days of Data Analysed
              </span>
            </div>
          </div>

          {/* Stat 2: 75+ Variables */}
          <div className="edge-stat-card edge-stat-card--blue">
            <div className="edge-stat-accent-strip edge-stat-accent-strip--blue" />
            <div className="edge-stat-icon-wrap edge-stat-icon-wrap--blue">
              <SlidersHorizontal
                className="edge-stat-icon"
                size={24}
                strokeWidth={2}
              />
            </div>
            <div className="edge-stat-text">
              <span className="edge-stat-value edge-stat-value--blue">
                75+
              </span>
              <span className="edge-stat-caption">
                Market &amp; Proprietary Variables built
              </span>
            </div>
          </div>
        </div>

        {/* ── Pill Button ── */}
        <div className="edge-pill-wrap">
          <div className="edge-pill">
            <Compass className="edge-pill-icon" size={16} strokeWidth={2.2} />
            <span className="edge-pill-label">
              Where the Advantage Comes From
            </span>
          </div>
        </div>

        {/* ── Four-Feature Grid (2x2) with Seam Connectors ── */}
        <div className="edge-grid-container">
          {/* Connector Circles along central vertical seam */}
          <div className="edge-seam-connectors" aria-hidden="true">
            {/* Circle A: Top row midline hollow outline */}
            <div className="edge-connector-circle edge-connector-circle--top" />
            {/* Circle B: Exact center solid accent dot */}
            <div className="edge-connector-dot edge-connector-dot--center" />
            {/* Circle C: Bottom row midline hollow outline */}
            <div className="edge-connector-circle edge-connector-circle--bottom" />
          </div>

          {/* 2x2 Grid of Cards */}
          <div className="edge-grid">
            {ADVANTAGES.map((item) => {
              const IconComponent = item.icon;
              const isGreen = item.accent === "green";

              return (
                <div
                  key={item.number}
                  className={`edge-card ${
                    isGreen ? "edge-card--green" : "edge-card--blue"
                  }`}
                >
                  {/* Left 4px accent strip */}
                  <div
                    className={`edge-card-accent-strip ${
                      isGreen
                        ? "edge-card-accent-strip--green"
                        : "edge-card-accent-strip--blue"
                    }`}
                  />

                  {/* Decorative top-right quarter circle */}
                  <div className="edge-card-quarter-circle" aria-hidden="true" />

                  {/* Top row: Icon box + Number label */}
                  <div className="edge-card-top-row">
                    <div
                      className={`edge-card-icon-box ${
                        isGreen
                          ? "edge-card-icon-box--green"
                          : "edge-card-icon-box--blue"
                      }`}
                    >
                      <IconComponent size={20} strokeWidth={2} />
                    </div>
                    <span className="edge-card-number">{item.number}</span>
                  </div>

                  {/* Heading in bold serif */}
                  <h3 className="edge-card-heading">{item.title}</h3>

                  {/* Description in sans-serif */}
                  <p className="edge-card-description">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
