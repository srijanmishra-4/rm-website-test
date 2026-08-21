import "./our-foundation.css";

const PRINCIPLES = [
  {
    number: "01",
    title: "Trust",
    pill: "Built Through Structure",
    description:
      "Rule-based decisions. Data-backed models. Fully auditable process. Consistency is the foundation of trust.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3.5 4.5 7v5.5c0 4.2 3.2 8.1 7.5 9 4.3-.9 7.5-4.8 7.5-9V7L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9.25 12.25 11 14l3.75-3.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Trade",
    pill: "Executed with Discipline",
    description:
      "Systematic execution across equity and derivatives markets. No discretionary overrides. No intraday trading. No reactive decisions.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 18.5h16M6.5 14.5l3-6 3.5 4 4.5-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Earn",
    pill: "Outcome of Process",
    description:
      "Returns are not predicted or chased. They are a result of structured participation, disciplined execution, and risk control over time.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 4v16M8.5 7.5 12 4l3.5 3.5M8.5 16.5 12 20l3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function PrincipleCard({ principle, index }) {
  return (
    <article
      className="foundation-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top row: icon + decorative number */}
      <div className="flex items-start justify-between">
        <div className="foundation-icon-box">{principle.icon}</div>
        <span className="foundation-number" aria-hidden="true">
          {principle.number}
        </span>
      </div>

      {/* Title */}
      <h3 className="foundation-title">{principle.title}</h3>

      {/* Status pill */}
      <span className="foundation-pill">{principle.pill}</span>

      {/* Accent divider */}
      <span className="foundation-divider" aria-hidden="true" />

      {/* Description */}
      <p className="foundation-body">{principle.description}</p>
    </article>
  );
}

export default function OurFoundation() {
  return (
    <section
      aria-labelledby="foundation-heading"
      className="foundation-section"
    >
      <div className="foundation-dots" aria-hidden="true" />
      <div className="foundation-ambient" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[76rem]">
        {/* Header */}
        <div className="mx-auto max-w-[44rem] text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            OUR FOUNDATION
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          <h2 id="foundation-heading" className="foundation-heading">
            Three Principles at the core of Richmonks
          </h2>
        </div>

        {/* Cards */}
        <div className="foundation-grid">
          {PRINCIPLES.map((principle, index) => (
            <PrincipleCard
              key={principle.number}
              principle={principle}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
