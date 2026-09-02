import Image from "next/image";
import Link from "next/link";

import "./hero.css";

/**
 * Hero artwork geometry
 *
 * The green graph is a full-bleed illustration, so it doubles as the "stage":
 * it is rendered at 100% of the stage width and every other layer is placed as
 * a percentage of that same box. Scaling the stage therefore moves the shadow,
 * the monk and the money together, and the composition holds at any width.
 *
 * The stage is anchored to the right edge at every breakpoint so the end of
 * the climb — graph, cash, monk — always lands in the lower-right corner.
 *
 * Anything below ~3.8% sits under the fold, so the figures stay above that:
 *   graph   full stage width, hanging ~1.3% of its width below the fold
 *   shadow  same width, offset down by 9.5% of the stage height
 *   monk    7.6% wide, lower-right, ~4% of the stage clear of the right edge
 *   money   5.4% wide, left of the monk and sitting slightly lower
 */

function ArrowIcon() {
  return (
    <svg
      className="h-3 w-3.5 shrink-0 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.75 6h12.5M9.5 1.75 14.25 6l-4.75 4.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate mt-[calc(var(--spacing-header)*-1)] overflow-hidden bg-[linear-gradient(90deg,var(--color-hero-start)_0%,var(--color-hero-mid)_52%,var(--color-hero-end)_100%)] lg:mt-[calc(var(--spacing-header-lg)*-1)]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="hero-art absolute right-[-4%] bottom-[-3vw] w-[240%] sm:right-[-3%] sm:bottom-[-2.6vw] sm:w-[190%] md:right-[-2%] md:bottom-[-2.2vw] md:w-[170%] lg:right-0 lg:bottom-[-1.3vw] lg:w-full">
          <div className="absolute bottom-[-9.5%] left-0 w-full">
            <Image
              src="/assets/Images/green_shadow_illus.png"
              alt=""
              width={1438}
              height={545}
              sizes="(max-width: 1023px) 240vw, 100vw"
              className="h-auto w-full"
              priority
            />
          </div>

          <Image
            src="/assets/Images/green_illus.png"
            alt=""
            width={1440}
            height={514}
            sizes="(max-width: 1023px) 240vw, 100vw"
            className="relative block h-auto w-full"
            priority
          />

          <div className="hero-money absolute bottom-[4.6%] left-[81.3%] w-[5.4%]">
            <Image
              src="/assets/Images/money.png"
              alt=""
              width={158}
              height={103}
              sizes="(max-width: 1023px) 13vw, 6vw"
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="hero-monk absolute bottom-[6.5%] left-[88.5%] w-[7.6%]">
            <Image
              src="/assets/Images/monk.png"
              alt=""
              width={165}
              height={276}
              sizes="(max-width: 1023px) 19vw, 8vw"
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-var(--spacing-ticker))] w-full max-w-[100rem] flex-col px-[clamp(1.25rem,3.5vw,3.5rem)] pt-header md:h-[calc(100svh-var(--spacing-ticker))] md:max-h-[52rem] md:min-h-[34rem] lg:max-h-[60rem] lg:pt-[var(--spacing-header-lg)]">
        <div className="hero-copy max-w-[40rem] pt-[clamp(1.25rem,9vh,5.5rem)]">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] font-semibold tracking-[-0.015em] text-text-primary"
          >
            Trust. Trade. Earn.
          </h1>

          <p className="mt-[clamp(0.7rem,1.2vw,1.15rem)] text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.4] font-semibold text-text-primary">
            Where disciplined research meets intelligent execution.
          </p>

          <p className="mt-[clamp(0.85rem,1.3vw,1.25rem)] max-w-[39rem] text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-text-primary/70">
            Richmonks is a quantitative trading and algorithmic investment firm
            in India, focused on the equity and derivatives (F&amp;O) markets.
          </p>

          <p className="mt-[clamp(1.1rem,2.2vh,1.5rem)] font-display text-[clamp(1.125rem,1.25vw,1.25rem)] leading-[1.6] text-text-primary/75 italic">
            Make your profits grow with RichMonks
          </p>

          <div className="mt-[clamp(1.25rem,2.4vh,1.75rem)] flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex h-[clamp(2.875rem,3.3vw,3.125rem)] min-w-[9.75rem] items-center justify-center rounded-md border border-blue px-6 text-small font-semibold text-blue no-underline transition-[transform,background-color] duration-300 ease-out hover:bg-blue/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-safe:hover:-translate-y-0.5"
            >
              Contact Us
            </Link>

            <a
              href="/download"
              className="group inline-flex h-[clamp(2.875rem,3.3vw,3.125rem)] min-w-[9.75rem] items-center justify-center gap-2.5 rounded-md bg-blue px-6 text-small font-semibold text-text-secondary no-underline transition-[transform,background-color] duration-300 ease-out hover:bg-[#005b87] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-safe:hover:-translate-y-0.5"
            >
              <span>Download App</span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
