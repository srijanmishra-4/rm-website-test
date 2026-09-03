import "./about-hero.css";

const BADGES = ["Research-Led", "System-Driven", "Data-Grounded"];

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="about-hero-section relative isolate mt-[calc(var(--spacing-header)*-1)] overflow-hidden px-[clamp(1.5rem,5vw,4rem)] pt-header lg:mt-[calc(var(--spacing-header-lg)*-1)] lg:pt-[var(--spacing-header-lg)]"
    >
      {/* Greenish ambient gradients in hero */}
      <div className="about-hero-ambient" aria-hidden="true" />

      {/* Subtle dot texture */}
      <div className="about-hero-dots" aria-hidden="true" />

      {/* Full-width faded watermark spread edge-to-edge */}
      <div className="about-hero-watermark-wrap" aria-hidden="true">
        <span className="about-hero-watermark">RICHMONKS</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[80rem] pt-[clamp(2.5rem,5vw,4.25rem)] pb-[clamp(3.25rem,6vw,5rem)]">
        <div className="mx-auto max-w-[52rem] text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            ABOUT RICHMONKS
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          <div className="relative mt-[clamp(1rem,1.8vw,1.5rem)]">
            <h1
              id="about-hero-heading"
              className="relative m-0 font-display text-[clamp(1.9rem,5.2vw,3.75rem)] leading-[1.1] font-semibold tracking-[-0.018em] text-balance text-text-primary"
            >
              <span className="block">Where Markets Meet</span>{" "}
              <span className="block">
                Mathematical <span className="text-green">Precision.</span>
              </span>
            </h1>
          </div>

          <span
            aria-hidden="true"
            className="mx-auto mt-[clamp(1.25rem,2.2vw,1.85rem)] block h-0.5 w-9 rounded-full bg-green"
          />

          <p className="mx-auto mt-[clamp(1rem,1.8vw,1.35rem)] mb-0 max-w-[38rem] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.75] text-text-primary/65">
            Richmonks is a quantitative trading and algorithmic investment firm
            in India, focused on the equity and derivatives (F&amp;O) markets.
          </p>

          <ul className="m-0 mt-[clamp(1.5rem,2.6vw,2.15rem)] flex list-none flex-wrap items-center justify-center gap-2.5 p-0">
            {BADGES.map((label) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-[10px] border border-[#ececef] bg-white/85 backdrop-blur-xs px-3.5 py-2 font-body text-[0.8125rem] leading-none font-semibold text-text-primary/75 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
