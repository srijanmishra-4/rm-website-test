import "./legal-hero.css";

export default function LegalHero({
  eyebrow = "LEGAL & COMPLIANCE",
  title = "Disclaimer &\nLegal Information.",
  description = "The information presented on this website is for general informational purposes only. It is not intended to provide investment advice, a recommendation, or an offer to buy or sell any security or financial instrument.",
  lastUpdated = "2026",
  watermark = "LEGAL",
}) {
  return (
    <section
      aria-labelledby="legal-hero-heading"
      className="legal-hero-section relative isolate mt-[calc(var(--spacing-header)*-1)] overflow-hidden px-[clamp(1.5rem,5vw,4rem)] pt-header lg:mt-[calc(var(--spacing-header-lg)*-1)] lg:pt-[var(--spacing-header-lg)]"
    >
      {/* Ambient gradients */}
      <div className="legal-hero-ambient" aria-hidden="true" />

      {/* Dot texture */}
      <div className="legal-hero-dots" aria-hidden="true" />

      {/* Oversized faded watermark */}
      <div className="legal-hero-watermark-wrap" aria-hidden="true">
        <span className="legal-hero-watermark">{watermark}</span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[80rem] pt-[clamp(2.5rem,5vw,4.25rem)] pb-[clamp(3.25rem,6vw,5rem)]">
        <div className="mx-auto max-w-[52rem] text-center">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            {eyebrow}
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          {/* Heading */}
          <div className="relative mt-[clamp(1rem,1.8vw,1.5rem)]">
            <h1
              id="legal-hero-heading"
              className="relative m-0 font-serif text-[clamp(2rem,5.2vw,3.75rem)] leading-[1.12] font-semibold tracking-[-0.018em] text-balance text-text-primary"
            >
              {typeof title === "string" && title.includes("\n") ? (
                title.split("\n").map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))
              ) : (
                <span className="block">{title}</span>
              )}
            </h1>
          </div>

          {/* Accent divider */}
          <span
            aria-hidden="true"
            className="mx-auto mt-[clamp(1.25rem,2.2vw,1.85rem)] block h-0.5 w-12 rounded-full bg-gradient-to-r from-blue to-green"
          />

          {/* Description */}
          {description && (
            <p className="mx-auto mt-[clamp(1rem,1.8vw,1.35rem)] mb-0 max-w-[40rem] font-body text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.75] text-text-primary/80">
              {description}
            </p>
          )}

          {/* Last Updated pill */}
          <div className="mt-[clamp(1.35rem,2vw,1.85rem)] flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c8d6e5] bg-white/90 px-3.5 py-1.5 font-body text-[0.75rem] font-medium text-text-primary/65 shadow-[0_1px_3px_rgba(16,24,40,0.07)] backdrop-blur-xs">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                aria-hidden="true"
              />
              Last Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

