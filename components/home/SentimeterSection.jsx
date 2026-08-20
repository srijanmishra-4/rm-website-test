"use client";

import { useEffect, useRef, useState } from "react";

import {
  SENTIMENT_STATES,
  getNeedleAngle,
  normalizeSentimeterResponse,
} from "@/lib/sentimeter";

import "./sentimeter.css";

/**
 * Gauge geometry, in viewBox units.
 *
 * The dial is a semicircle drawn from 180deg (left) to 360deg (right) in SVG
 * coordinates. Everything else — ticks, pointer, readout — is derived from the
 * same centre so the whole visual scales with the container.
 */
const GAUGE = {
  centerX: 160,
  centerY: 136,
  radius: 118,
  tickInner: 100,
  tickOuter: 106,
  segmentAngle: 180 / SENTIMENT_STATES.length,
};

const TICK_COUNT = 15;

function polarPoint(angle, radius) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: GAUGE.centerX + radius * Math.cos(radians),
    y: GAUGE.centerY + radius * Math.sin(radians),
  };
}

function arcPath(startAngle, endAngle) {
  const start = polarPoint(startAngle, GAUGE.radius);
  const end = polarPoint(endAngle, GAUGE.radius);
  return `M ${start.x} ${start.y} A ${GAUGE.radius} ${GAUGE.radius} 0 0 1 ${end.x} ${end.y}`;
}

function SentimeterGauge({ reading, status }) {
  const hasReading = status === "success" && Boolean(reading);
  const activeIndex = hasReading ? reading.sentiment.index : -1;
  const displayScore = hasReading ? Math.round(reading.score) : "--";
  const mood = hasReading ? reading.sentiment.label : "Awaiting data";

  return (
    <div
      className={`sentimeter-gauge${status === "loading" ? " is-loading" : ""}`}
      role="meter"
      aria-label={
        hasReading
          ? `Market Sentimeter: ${displayScore} out of 100, ${mood}`
          : "Market Sentimeter reading unavailable"
      }
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={hasReading ? reading.score : undefined}
      aria-valuetext={hasReading ? `${displayScore} — ${mood}` : undefined}
    >
      <svg viewBox="0 0 320 162" aria-hidden="true">
        <path d={arcPath(180, 360)} className="gauge-track" />

        {SENTIMENT_STATES.map((state, index) => {
          const gap = 1.4;
          const start = 180 + index * GAUGE.segmentAngle + gap / 2;
          const end = 180 + (index + 1) * GAUGE.segmentAngle - gap / 2;

          return (
            <path
              key={state.label}
              d={arcPath(start, end)}
              className={`gauge-zone${index === activeIndex ? " is-active" : ""}`}
              style={{ stroke: state.color }}
            />
          );
        })}

        {Array.from({ length: TICK_COUNT }, (_, index) => {
          const angle = 180 + index * (180 / (TICK_COUNT - 1));
          const inner = polarPoint(angle, GAUGE.tickInner);
          const outer = polarPoint(angle, GAUGE.tickOuter);

          return (
            <line
              key={angle}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              className="gauge-tick"
            />
          );
        })}

        <g
          className={`gauge-pointer${hasReading ? " has-reading" : ""}`}
          style={{ transform: `rotate(${getNeedleAngle(reading?.score)}deg)` }}
        >
          <path d="M 160 26 L 153.5 42 L 166.5 42 Z" />
        </g>

        <text x="160" y="118" className="gauge-score">
          {displayScore}
        </text>
        <text x="160" y="132" className="gauge-caption">
          CURRENT SCORE
        </text>
        <text
          x="160"
          y="154"
          className="gauge-mood"
          style={{ fill: hasReading ? reading.sentiment.textColor : undefined }}
        >
          {mood.toUpperCase()}
        </text>

        <text x="26" y="154" className="gauge-endpoint">
          FEAR
        </text>
        <text x="294" y="154" textAnchor="end" className="gauge-endpoint">
          GREED
        </text>
      </svg>
    </div>
  );
}

export default function SentimeterSection({
  glanceData,
  glanceStatus,
  onRetry,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const reading = normalizeSentimeterResponse(glanceData);
  const status =
    glanceStatus === "success" && !reading ? "error" : glanceStatus;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`sentimeter-section${visible ? " is-visible" : ""}`}
      aria-labelledby="sentimeter-heading"
    >
      <div className="sentimeter-section__inner">
        <div className="sentimeter-intro">
          <span className="sentimeter-intro__eyebrow">
            <span aria-hidden="true" />
            Market Sentiment
          </span>

          <h2 id="sentimeter-heading">What&apos;s the market feeling today?</h2>

          <p>
            The Sentimeter captures the mood of the market through a backtested
            algorithm, and represents that mood across seven states — from
            Extreme Fear all the way to Extreme Greed.
          </p>
        </div>

        <div className="sentimeter-panel">
          <div className="sentimeter-panel__head">
            <span className="sentimeter-panel__title">Sentimeter</span>
            <span className="sentimeter-panel__status">
              <span
                className={status === "success" ? "is-live" : ""}
                aria-hidden="true"
              />
              {status === "success" ? "Live" : "Market reading"}
            </span>
          </div>

          <SentimeterGauge reading={reading} status={status} />

          {status === "error" && (
            <p className="sentimeter-panel__error" role="status">
              Live reading unavailable.
              <button type="button" onClick={onRetry}>
                Try again
              </button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
