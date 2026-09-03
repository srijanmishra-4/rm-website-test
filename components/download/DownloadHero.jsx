"use client";

import Image from "next/image";
import { useSectionReveal } from "@/lib/motion";

import "./download-hero.css";

/* ── Inline SVG Icons for App Store / Google Play ──────────── */

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

/* ── Decorative SVG Elements ───────────────────────────────── */

function HeroDecorations() {
  return (
    <div className="dl-hero__decor" aria-hidden="true">
      {/* Subtle market trendline fragment — top right behind secondary phone */}
      <svg
        className="dl-hero__decor-line"
        viewBox="0 0 130 55"
        fill="none"
      >
        <polyline
          points="0,42 18,36 36,40 55,22 75,28 95,12 115,18 130,6"
          stroke="rgba(33,169,71,0.24)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="55" cy="22" r="2.5" fill="rgba(33,169,71,0.28)" />
        <circle cx="95" cy="12" r="2.5" fill="rgba(33,169,71,0.28)" />
      </svg>

      {/* Small data constellation — bottom left near primary phone */}
      <svg
        className="dl-hero__decor-dots"
        viewBox="0 0 70 70"
        fill="none"
      >
        <circle cx="15" cy="18" r="2" fill="rgba(33,169,71,0.22)" />
        <circle cx="40" cy="32" r="2.5" fill="rgba(33,169,71,0.18)" />
        <circle cx="58" cy="14" r="1.5" fill="rgba(33,169,71,0.25)" />
        <line x1="15" y1="18" x2="40" y2="32" stroke="rgba(33,169,71,0.12)" strokeWidth="1" />
        <line x1="40" y1="32" x2="58" y2="14" stroke="rgba(33,169,71,0.12)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function DownloadHero() {
  const [sectionRef, visible] = useSectionReveal("0px 0px -5% 0px");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="dl-hero-heading"
      className={`dl-hero relative isolate mt-[calc(var(--spacing-header)*-1)] overflow-hidden px-[clamp(1.5rem,5vw,4rem)] pt-header lg:mt-[calc(var(--spacing-header-lg)*-1)] lg:pt-[var(--spacing-header-lg)]${visible ? " is-visible" : ""}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[80rem] pt-[clamp(2.5rem,4.5vw,3.75rem)] pb-[clamp(3.5rem,5.5vw,5rem)]">
        <div className="dl-hero__grid">
          {/* ── Left Column: Typography & Badges ── */}
          <div className="dl-hero__text rm-reveal">
            <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
              <span className="h-px w-6 bg-green/40" aria-hidden="true" />
              DOWNLOAD THE RICHMONKS APP
              <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            </span>

            <h1
              id="dl-hero-heading"
              className="m-0 mt-[clamp(0.875rem,1.6vw,1.25rem)] font-display text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.018em] text-text-primary [text-wrap:balance]"
            >
              Nobody can predict
              <br />
              the market.
            </h1>

            <h2
              className="m-0 mt-[clamp(0.75rem,1.2vw,1rem)] font-display text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] font-normal tracking-[-0.01em] text-text-primary/85 [text-wrap:balance]"
            >
              But better data, logical systems and the right tools
              <br />
              can help you understand it better.
            </h2>

            <p className="mt-[clamp(0.875rem,1.4vw,1.25rem)] mb-0 max-w-[32rem] text-[clamp(0.9375rem,1.05vw,1.0625rem)] italic leading-[1.75] text-text-primary/70 [text-wrap:pretty]">
              Powerful market intelligence and F&amp;O insights,<br />
              now available wherever you go.
            </p>

            <div className="mt-[clamp(1.75rem,2.8vw,2.5rem)]">
              <p className="m-0 mb-3 text-[0.6875rem] font-semibold tracking-[0.14em] text-text-primary/55 uppercase">
                DOWNLOAD ON
              </p>

              <div className="dl-hero__badge-row">
                <a
                  href="#"
                  className="dl-hero__badge"
                  aria-label="Download RichMonks on the App Store"
                  {...("#".startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <AppleIcon className="dl-hero__badge-icon" />
                  <span className="dl-hero__badge-text">
                    <span className="dl-hero__badge-label">Download on the</span>
                    <span className="dl-hero__badge-store">App Store</span>
                  </span>
                </a>

                <a
                  href="#"
                  className="dl-hero__badge"
                  aria-label="Get RichMonks on Google Play"
                  {...("#".startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <PlayStoreIcon className="dl-hero__badge-icon" />
                  <span className="dl-hero__badge-text">
                    <span className="dl-hero__badge-label">GET IT ON</span>
                    <span className="dl-hero__badge-store">Google Play</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right Column: Premium Device Mockup ── */}
          <div className="dl-hero__visual">
            <div className="dl-hero__phones-wrapper">
              <HeroDecorations />

              <div className="dl-hero__phones">
                {/* Secondary Phone — RIGHT / BEHIND */}
                <div className="dl-hero__device dl-hero__device--secondary">
                  <div className="dl-hero__device-screen">
                    <Image
                      src="/assets/Images/App-stock-profile-page.png"
                      alt="RichMonks stock profile page displaying strike levels, options data, and RM score"
                      width={325}
                      height={716}
                      sizes="(max-width: 575px) 160px, (max-width: 991px) 205px, 255px"
                      priority
                    />
                  </div>
                </div>

                {/* Primary Phone — LEFT / FRONT, dominant */}
                <div className="dl-hero__device dl-hero__device--primary">
                  <div className="dl-hero__device-screen">
                    <Image
                      src="/assets/Images/App-Home-Page.png"
                      alt="RichMonks app home screen showing market trends, FNO profit meter, and stock rank insights"
                      width={328}
                      height={715}
                      sizes="(max-width: 575px) 185px, (max-width: 991px) 230px, 280px"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
