"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  SENTIMENT_STATES,
  normalizeCount,
  normalizeSentimeterResponse,
} from "@/lib/sentimeter";

import "./sentimeter.css";

const DONUT_RADIUS = 80;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS; // 502.655

export function SentimeterDonut({ reading, status }) {
  const hasReading = status === "success" && Boolean(reading);
  const displayScore = hasReading ? Math.round(reading.score) : "--";
  const mood = hasReading
    ? reading.sentiment.label
    : status === "loading"
      ? "Loading..."
      : "Awaiting data";
  const strokeColor = hasReading ? reading.sentiment.color : "#d1d5db";
  const textColor = hasReading ? reading.sentiment.textColor : "#6b7280";

  const scorePercent = hasReading ? reading.score : 0;
  const strokeDashoffset =
    DONUT_CIRCUMFERENCE - (scorePercent / 100) * DONUT_CIRCUMFERENCE;

  return (
    <div
      className={`sentimeter-donut${status === "loading" ? " is-loading" : ""}`}
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
      <div className="sentimeter-donut__graphic">
        <svg
          viewBox="0 0 200 200"
          aria-hidden="true"
          className="sentimeter-donut__svg"
        >
          {/* Grey unfilled track ring */}
          <circle
            cx="100"
            cy="100"
            r={DONUT_RADIUS}
            className="sentimeter-donut__track"
          />

          {/* Dynamic filled progress ring */}
          <circle
            cx="100"
            cy="100"
            r={DONUT_RADIUS}
            className="sentimeter-donut__progress"
            style={{
              stroke: strokeColor,
              strokeDasharray: DONUT_CIRCUMFERENCE,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        {/* Centered Score Readout */}
        <div className="sentimeter-donut__center">
          <span className="sentimeter-donut__score-caption">SENTIMETER</span>
          <span className="sentimeter-donut__score-val">{displayScore}</span>
          <span
            className="sentimeter-donut__mood-pill"
            style={{
              color: textColor,
              backgroundColor: hasReading
                ? `${reading.sentiment.color}15`
                : undefined,
              borderColor: hasReading
                ? `${reading.sentiment.color}35`
                : undefined,
            }}
          >
            {mood.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

export function BullsVsBears({ bulls, bears, status }) {
  const safeBulls = normalizeCount(bulls);
  const safeBears = normalizeCount(bears);
  const total = safeBulls + safeBears;
  const bullsPercent = total > 0 ? (safeBulls / total) * 100 : 50;
  const bearsPercent = total > 0 ? (safeBears / total) * 100 : 50;

  return (
    <div
      className="sentimeter-bias"
      aria-label={`Market Bias: Bulls ${safeBulls}, Bears ${safeBears}`}
    >
      <div className="sentimeter-bias__header">
        <span className="sentimeter-bias__title">Market Bias</span>
      </div>

      <div className="sentimeter-bias__card">
        <div className="sentimeter-bias__row">
          {/* Bulls Side (Far Left) */}
          <div className="sentimeter-bias__item sentimeter-bias__item--bulls">
            <span className="sentimeter-bias__label">
              <span className="sentimeter-bias__icon" aria-hidden="true">
                ↑
              </span>
              BULLS
            </span>
            <span className="sentimeter-bias__value">
              {status === "loading" && bulls == null ? "--" : safeBulls}
            </span>
          </div>

          {/* Facing Battle Center: Bull SVG | VS | Bear SVG */}
          <div className="sentimeter-bias__battle" aria-hidden="true">
            <div className="sentimeter-bias__avatar sentimeter-bias__avatar--bull">
              <Image
                src="/assets/Images/Bull.svg"
                alt=""
                width={67}
                height={43}
                className="sentimeter-bias__svg"
              />
            </div>
            <div className="sentimeter-bias__vs">
              <span>VS</span>
            </div>
            <div className="sentimeter-bias__avatar sentimeter-bias__avatar--bear">
              <Image
                src="/assets/Images/Bear.svg"
                alt=""
                width={61}
                height={37}
                className="sentimeter-bias__svg"
              />
            </div>
          </div>

          {/* Bears Side (Far Right) */}
          <div className="sentimeter-bias__item sentimeter-bias__item--bears">
            <span className="sentimeter-bias__label">
              <span className="sentimeter-bias__icon" aria-hidden="true">
                ↓
              </span>
              BEARS
            </span>
            <span className="sentimeter-bias__value">
              {status === "loading" && bears == null ? "--" : safeBears}
            </span>
          </div>
        </div>
      </div>

      {/* Proportional Balance Bar */}
      <div className="sentimeter-bias__bar-wrap" aria-hidden="true">
        <div className="sentimeter-bias__bar">
          <div
            className="sentimeter-bias__bar-fill sentimeter-bias__bar-fill--bulls"
            style={{ width: `${bullsPercent}%` }}
          />
          <div
            className="sentimeter-bias__bar-fill sentimeter-bias__bar-fill--bears"
            style={{ width: `${bearsPercent}%` }}
          />
        </div>
      </div>
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
  const activeIndex = reading?.sentiment?.index ?? -1;

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
        {/* Left Column: Explanatory Content */}
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

          <div className="sentimeter-spectrum" aria-label="Sentiment Spectrum">
            {SENTIMENT_STATES.map((state, index) => {
              const isActive = activeIndex === index;
              return (
                <span
                  key={state.label}
                  className={`sentimeter-spectrum__chip${isActive ? " is-active" : ""}`}
                  style={{ "--chip-color": state.color }}
                >
                  <span
                    className="sentimeter-spectrum__dot"
                    aria-hidden="true"
                  />
                  <span>{state.label}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Right Column: Unified Market Sentiment Panel */}
        <div className="sentimeter-panel">
          <div className="sentimeter-panel__grid">
            <div className="sentimeter-panel__donut-col">
              <SentimeterDonut reading={reading} status={status} />
            </div>

            <div className="sentimeter-panel__bias-col">
              <BullsVsBears
                bulls={glanceData?.sentimeter?.bullscore ?? glanceData?.bulls}
                bears={glanceData?.sentimeter?.bearscore ?? glanceData?.bears}
                status={status}
              />
            </div>
          </div>

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
