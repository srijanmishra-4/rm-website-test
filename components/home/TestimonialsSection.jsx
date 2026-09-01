"use client";

import { useSectionReveal } from "@/lib/motion";

const TESTIMONIALS = [
  {
    initial: "A",
    quote:
      "Trading in derivative markets is tricky. You need a robust system to provide a logical base to your trades. RichMonks fulfills that requirement competently.",
    role: "Verified Trader",
    type: "Derivatives Trader",
  },
  {
    initial: "S",
    quote:
      "RichMonks has been built with a lot of passion. I find its Call Put Velocity tables extremely useful for my options trades.",
    role: "Verified Trader",
    type: "Options Trader",
  },
  {
    initial: "R",
    quote:
      "RichMonks Algo based approach is a boon for someone who believes in passive trading. You have a target and a stop loss and ROI is fantastic.",
    role: "Verified Trader",
    type: "Passive Trader",
  },
  {
    initial: "P",
    quote:
      "I would strongly recommend RichMonks to those who are happy to follow a system diligently for a relaxed and rewarding trading experience.",
    role: "Verified Trader",
    type: "Systematic Trader",
  },
];

/** Cards alternate between the two RichMonks accents: blue, green, blue, green. */
const ACCENTS = {
  blue: {
    bar: "bg-blue/70",
    tint: "bg-[linear-gradient(180deg,rgba(0,113,169,0.045),rgba(0,113,169,0))]",
    quote: "text-blue/35",
    avatar: "border-blue/15 bg-blue/[0.07] text-blue",
  },
  green: {
    bar: "bg-green/70",
    tint: "bg-[linear-gradient(180deg,rgba(33,169,71,0.05),rgba(33,169,71,0))]",
    quote: "text-green/40",
    avatar: "border-green/15 bg-green/[0.08] text-green-dark",
  },
};

function TestimonialCard({ testimonial, visible, index }) {
  const accent = ACCENTS[index % 2 === 0 ? "blue" : "green"];

  return (
    <article
      style={{ transitionDelay: `${index * 70}ms` }}
      className={`relative isolate flex h-full flex-col overflow-hidden rounded-[0.875rem] border border-primary/8 bg-white px-[clamp(1.25rem,1.9vw,1.5rem)] pt-[clamp(1.15rem,1.8vw,1.375rem)] pb-[clamp(1.15rem,1.8vw,1.375rem)] shadow-[0_1px_2px_rgba(34,43,120,0.04),0_10px_28px_-18px_rgba(34,43,120,0.28)] transition-[opacity,transform,box-shadow,border-color] duration-500 ease-out hover:border-primary/12 hover:shadow-[0_1px_2px_rgba(34,43,120,0.05),0_16px_34px_-18px_rgba(34,43,120,0.34)] motion-safe:hover:-translate-y-0.5 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-[2px] ${accent.bar}`}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-24 ${accent.tint}`}
        aria-hidden="true"
      />

      <span
        className={`mb-1.5 block font-display text-[2rem] leading-[0.8] select-none ${accent.quote}`}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p className="m-0 flex-1 font-body text-[0.9375rem] leading-[1.75] text-text-primary/80">
        {testimonial.quote}
      </p>

      <div
        className="mt-[clamp(1.15rem,1.8vw,1.375rem)] h-px w-full bg-[linear-gradient(90deg,rgba(34,43,120,0.11),rgba(34,43,120,0.04))]"
        aria-hidden="true"
      />

      <div className="mt-[0.9375rem] flex items-center gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border font-body text-[0.8125rem] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ${accent.avatar}`}
          aria-hidden="true"
        >
          {testimonial.initial}
        </span>

        <div className="flex min-w-0 flex-col gap-[0.1875rem]">
          <p className="m-0 font-body text-[0.8125rem] leading-snug font-semibold tracking-[-0.005em] text-text-primary">
            {testimonial.role}
          </p>
          <p className="m-0 font-body text-[0.75rem] leading-snug text-text-primary/50">
            {testimonial.type}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  const [sectionRef, visible] = useSectionReveal("0px 0px -10% 0px");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="relative isolate overflow-hidden bg-white px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(4rem,7vw,6.5rem)] pb-[clamp(4rem,7vw,6.5rem)]"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_28rem_at_50%_-6rem,rgba(33,169,71,0.05),transparent_70%),radial-gradient(48rem_24rem_at_92%_108%,rgba(34,43,120,0.04),transparent_72%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[80rem]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            Client Testimonials
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          <h2
            id="testimonials-heading"
            className="mx-auto mt-[clamp(1rem,1.8vw,1.5rem)] mb-0 max-w-[24ch] text-balance font-display text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.2] font-semibold tracking-[-0.018em] text-text-primary"
          >
            Trusted by traders.
            <br className="hidden sm:inline" /> Proven by{" "}
            <span className="text-green">results.</span>
          </h2>

          <p className="mx-auto mt-[clamp(0.9rem,1.6vw,1.35rem)] mb-0 max-w-[36rem] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.75] text-text-primary/65">
            Hear from traders who have experienced the Richmonks difference —
            disciplined systems, consistent execution.
          </p>
        </div>

        <div className="mt-[clamp(2.25rem,4.5vw,3.5rem)] grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.initial}
              testimonial={testimonial}
              visible={visible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
