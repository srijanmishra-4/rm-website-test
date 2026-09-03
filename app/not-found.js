import Link from "next/link";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Page Not Found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-var(--spacing-header)-var(--spacing-ticker))] flex-col items-center justify-center overflow-hidden px-[clamp(1.5rem,5vw,4rem)] py-[clamp(4rem,8vw,8rem)] text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45rem_20rem_at_50%_40%,rgba(33,169,71,0.06),transparent_70%)]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[36rem]">
          <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
            404 ERROR
            <span className="h-px w-6 bg-green/40" aria-hidden="true" />
          </span>

          <h1 className="mt-3 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold leading-[1.12] tracking-[-0.018em] text-text-primary">
            Page Not Found
          </h1>

          <p className="mt-4 font-body text-[clamp(0.9375rem,1.05vw,1.0625rem)] leading-[1.7] text-text-primary/70">
            The page you are looking for does not exist, has been removed, or has moved to a new destination.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-md bg-blue px-6 text-small font-semibold text-text-secondary no-underline transition-colors duration-200 hover:bg-[#005b87] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-blue/30 px-6 text-small font-semibold text-blue no-underline transition-colors duration-200 hover:bg-blue/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
