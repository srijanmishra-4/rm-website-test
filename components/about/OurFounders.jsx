"use client";

import React from "react";
import { Quote } from "lucide-react";
import { useSectionReveal } from "@/lib/motion";
import "./our-founders.css";

const FOUNDERS_DATA = [
  {
    theme: "blue",
    initial: "RM",
    statValue: "30+ Years",
    statLabel: "FINANCE & TRADING",
    name: "Rajesh Mehra",
    role: "Founder & Market Strategist",
    category: "Markets & Algorithms",
    paragraphs: [
      "Rajesh Mehra brings over three decades of experience in financial markets, with deep expertise in behavioural dynamics, market structure, and systematic trading.",
      "He has developed 50+ proprietary variables — including Profit Meter, SumLong, SumShort, Market Sentimeter, Profit Meter, Call/Put Velocity, Triggerpoint and the FNO Index — each designed to quantify and interpret market behaviour across equities and derivatives.",
      "At Richmonks, he leads the architecture and evolution of structured, rule-based trading systems, ensuring every decision is driven by data, discipline, and repeatable logic.",
    ],
  },
  {
    theme: "green",
    initial: "AK",
    statValue: "Full-Stack",
    statLabel: "IT INFRASTRUCTURE",
    name: "Ayush Kharkia",
    role: "Co-Founder & Chief Technology Officer",
    category: "Technology & Infrastructure",
    paragraphs: [
      "Ayush Kharkia leads the technology and infrastructure backbone of Richmonks.",
      "He has architected scalable, high-performance systems capable of processing large volumes of financial market data with speed and precision, enabling seamless, real-time execution of algorithmic trading strategies.",
      "His work ensures robustness, low-latency performance, and reliable integration of the firm’s quantitative models into a unified, production-grade platform.",
    ],
  },
];

function FounderCard({ founder }) {
  const isBlue = founder.theme === "blue";

  return (
    <article
      className={`founder-card ${
        isBlue ? "founder-card--blue" : "founder-card--green"
      }`}
    >
      {/* Top Header Banner */}
      <header
        className={`founder-card-header ${
          isBlue ? "founder-card-header--blue" : "founder-card-header--green"
        }`}
      >
        {/* Monogram Initial Avatar */}
        <div className="founder-monogram-box">
          <span className="founder-monogram-text">{founder.initial}</span>
        </div>

        {/* Top Statistic & Label */}
        <div className="founder-stat-block">
          <span className="founder-stat-value">{founder.statValue}</span>
          <span className="founder-stat-label">{founder.statLabel}</span>
        </div>
      </header>

      {/* Card Body */}
      <div className="founder-card-body">
        {/* Name & Role */}
        <h3 className="founder-name">{founder.name}</h3>
        <p className="founder-role">{founder.role}</p>

        {/* Category Pill */}
        <div className="founder-category-wrap">
          <span
            className={`founder-category-pill ${
              isBlue
                ? "founder-category-pill--blue"
                : "founder-category-pill--green"
            }`}
          >
            {founder.category}
          </span>
        </div>

        {/* Accent Divider */}
        <div
          className={`founder-card-divider ${
            isBlue
              ? "founder-card-divider--blue"
              : "founder-card-divider--green"
          }`}
          aria-hidden="true"
        />

        {/* Description Paragraphs */}
        <div className="founder-paragraphs">
          {founder.paragraphs.map((paragraph, index) => (
            <p key={index} className="founder-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function OurFounders() {
  const [sectionRef, visible] = useSectionReveal("0px 0px -8% 0px");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="founders-heading"
      className={`founders-section${visible ? " is-visible" : ""}`}
    >
      {/* Subtle Dot Matrix Texture */}
      <div className="founders-dots" aria-hidden="true" />

      {/* Atmospheric Ambient Glow */}
      <div className="founders-ambient" aria-hidden="true" />

      {/* Large Atmospheric Background Watermark */}
      <div className="founders-watermark-wrap" aria-hidden="true">
        <span className="founders-watermark">FOUNDERS</span>
      </div>

      <div className="founders-container rm-reveal">
        {/* ── Section Header ── */}
        <div className="founders-header">
          <div className="founders-eyebrow-wrap">
            <span className="founders-eyebrow-line" aria-hidden="true" />
            <span className="founders-eyebrow">OUR FOUNDERS</span>
            <span className="founders-eyebrow-line" aria-hidden="true" />
          </div>

          <h2 id="founders-heading" className="founders-heading">
            <span className="founders-heading-line">The minds behind</span>
            <span className="founders-heading-line">method.</span>
          </h2>

          <div className="founders-divider" aria-hidden="true" />

          <p className="founders-description">
            Richmonks was built by individuals who have lived the markets —
            combining decades of trading intuition with the precision of modern
            technology.
          </p>
        </div>

        {/* ── Founder Cards with Central Connector ── */}
        <div className="founders-cards-wrap">
          {/* Left Founder Card */}
          <FounderCard founder={FOUNDERS_DATA[0]} />

          {/* Desktop Central Visual Connector */}
          <div className="founders-connector" aria-hidden="true">
            <div className="founders-connector-line" />
            <div className="founders-connector-node">
              <span className="founders-connector-amp">&amp;</span>
            </div>
          </div>

          {/* Mobile Central Visual Connector */}
          <div className="founders-connector-mobile" aria-hidden="true">
            <div className="founders-connector-mobile-line" />
            <div className="founders-connector-mobile-node">
              <span className="founders-connector-mobile-amp">&amp;</span>
            </div>
            <div className="founders-connector-mobile-line" />
          </div>

          {/* Right Founder Card */}
          <FounderCard founder={FOUNDERS_DATA[1]} />
        </div>

        {/* ── Centered Philosophy Quote Panel ── */}
        <div className="founders-quote-panel">
          <div className="founders-quote-icon-wrap" aria-hidden="true">
            <Quote size={22} strokeWidth={2.2} />
          </div>
          <p className="founders-quote-text">
            “Research without technology is incomplete. Technology without
            research is directionless. At Richmonks, the two are inseparable.”
          </p>
          <p className="founders-quote-attribution">
            — The Richmonks Philosophy
          </p>
        </div>
      </div>
    </section>
  );
}
