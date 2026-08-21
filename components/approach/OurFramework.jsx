"use client";

import React from "react";
import Link from "next/link";
import "./our-framework.css";

export default function OurFramework() {
  return (
    <section
      id="our-framework"
      aria-labelledby="our-framework-heading"
      className="our-framework-section"
    >
      {/* Ambient gradient layer */}
      <div className="our-framework-ambient" aria-hidden="true" />

      {/* Decorative Technical & Geometric Background Network */}
      <svg
        className="our-framework-geo-svg"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle line gradient */}
          <linearGradient id="ofw-line-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.01" />
            <stop offset="50%" stopColor="#21a947" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0071a9" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="ofw-line-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0071a9" stopOpacity="0.09" />
            <stop offset="60%" stopColor="#21a947" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* ── Oversized Subtle Arc Outlines (partially cropped) ── */}
        <circle
          cx="1360"
          cy="120"
          r="360"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="1360"
          cy="120"
          r="480"
          stroke="rgba(0, 113, 169, 0.04)"
          strokeWidth="1"
        />
        <circle
          cx="80"
          cy="520"
          r="420"
          stroke="rgba(33, 169, 71, 0.04)"
          strokeWidth="1"
        />
        <circle
          cx="80"
          cy="520"
          r="260"
          stroke="rgba(255, 255, 255, 0.025)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        {/* ── Subtle Geometric / Network Connecting Lines ── */}
        {/* Left Network Cluster */}
        <path
          d="M 60 140 L 190 230 L 130 380 L 280 430"
          stroke="url(#ofw-line-grad-1)"
          strokeWidth="1"
        />
        <path
          d="M 190 230 L 320 200"
          stroke="rgba(255, 255, 255, 0.035)"
          strokeWidth="1"
        />
        <path
          d="M -40 280 L 130 380"
          stroke="rgba(0, 113, 169, 0.05)"
          strokeWidth="1"
        />

        {/* Right Network Cluster */}
        <path
          d="M 1160 180 L 1280 280 L 1380 200"
          stroke="url(#ofw-line-grad-2)"
          strokeWidth="1"
        />
        <path
          d="M 1280 280 L 1210 420 L 1360 490"
          stroke="url(#ofw-line-grad-2)"
          strokeWidth="1"
        />
        <path
          d="M 1120 340 L 1210 420"
          stroke="rgba(33, 169, 71, 0.045)"
          strokeWidth="1"
        />

        {/* Top/Center subtle distant connectors */}
        <line
          x1="380"
          y1="80"
          x2="520"
          y2="40"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="1"
        />
        <line
          x1="940"
          y1="50"
          x2="1080"
          y2="90"
          stroke="rgba(255, 255, 255, 0.03)"
          strokeWidth="1"
        />

        {/* ── Scattered Small Static Nodes / Dots ── */}
        {/* Left nodes */}
        <circle cx="60" cy="140" r="2.5" fill="rgba(33, 169, 71, 0.25)" />
        <circle cx="190" cy="230" r="3" fill="rgba(255, 255, 255, 0.3)" />
        <circle cx="130" cy="380" r="2.5" fill="rgba(0, 113, 169, 0.3)" />
        <circle cx="280" cy="430" r="2" fill="rgba(33, 169, 71, 0.25)" />
        <circle cx="320" cy="200" r="2" fill="rgba(255, 255, 255, 0.2)" />

        {/* Right nodes */}
        <circle cx="1160" cy="180" r="2" fill="rgba(255, 255, 255, 0.2)" />
        <circle cx="1280" cy="280" r="3" fill="rgba(33, 169, 71, 0.3)" />
        <circle cx="1380" cy="200" r="2.5" fill="rgba(0, 113, 169, 0.25)" />
        <circle cx="1210" cy="420" r="2.5" fill="rgba(255, 255, 255, 0.25)" />
        <circle cx="1360" cy="490" r="2" fill="rgba(33, 169, 71, 0.2)" />

        {/* Distant peripheral nodes */}
        <circle cx="380" cy="80" r="1.5" fill="rgba(255, 255, 255, 0.2)" />
        <circle cx="520" cy="40" r="2" fill="rgba(0, 113, 169, 0.25)" />
        <circle cx="940" cy="50" r="2" fill="rgba(33, 169, 71, 0.25)" />
        <circle cx="1080" cy="90" r="1.5" fill="rgba(255, 255, 255, 0.2)" />
      </svg>

      <div className="our-framework-container">
        {/* ── Eyebrow ── */}
        <span className="our-framework-eyebrow">OUR FRAMEWORK</span>

        {/* ── Main Heading ── */}
        <h2 id="our-framework-heading" className="our-framework-heading">
          Technology is not a tool — it is the framework that allows research
          to translate into consistent, measured action.
        </h2>

        {/* ── Centered Accent Divider ── */}
        <div className="our-framework-divider" aria-hidden="true" />

        {/* ── Description ── */}
        <p className="our-framework-description">
          At Richmonks, we convert research into actionable, accurate
          execution — turning insight into structured performance, one
          algorithm at a time.
        </p>

        {/* ── Action Button ── */}
        <div className="our-framework-actions">
          <Link
            href="/contact"
            className="our-framework-btn our-framework-btn--primary"
          >
            Connect With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
