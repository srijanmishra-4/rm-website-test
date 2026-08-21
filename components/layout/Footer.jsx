import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Approach", href: "/approach" },
  // { label: "Team", href: "/team" }, // Removed per request
  { label: "Contact", href: "/contact" },
];

const EMAIL = "info@richmonks.in";

const ADDRESS_LINES = [
  "702, Sunil Enclave",
  "Off Andheri Kurla Road",
  "Andheri (E), Mumbai - 400099",
  "India",
];

const SOCIAL_LINKS = [
  { label: "RichMonks on X", href: "#", icon: XIcon },
  { label: "RichMonks on LinkedIn", href: "#", icon: LinkedInIcon },
  { label: `Email RichMonks at ${EMAIL}`, href: `mailto:${EMAIL}`, icon: MailIcon },
];

/* Same label + body treatments the light sections use, recoloured for the dark
   surface: #0d2430 ground, #f5f7f8 headings, #c7d1d6 content, #91a3ac secondary. */
const HEADING =
  "m-0 font-body text-[0.75rem] leading-[1.55] font-semibold tracking-[0.13em] text-[#f5f7f8] uppercase";
const LINK =
  "font-body text-[0.875rem] text-[#c7d1d6] no-underline transition-colors duration-200 hover:text-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green";

function XIcon() {
  return (
    <svg className="h-[0.9375rem] w-[0.9375rem]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.207-6.817-5.96 6.817H1.7l7.73-8.836L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 9.75h5.16V21H2.4V9.75Zm7.74 0h4.95v1.54h.07c.69-1.2 2.2-2.02 3.9-2.02 3.2 0 4.54 1.93 4.54 5.36V21h-5.16v-5.42c0-1.36-.28-2.6-1.83-2.6-1.5 0-2.31 1.06-2.31 2.6V21H10.14V9.75Z" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.5 8 6.6 4.7a1.6 1.6 0 0 0 1.8 0L19.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.6 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.4" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0d2430] px-[clamp(1.5rem,5vw,4rem)] pt-[clamp(2.5rem,4.5vw,3.5rem)] pb-[clamp(1.5rem,2.5vw,2rem)]">
      <div className="mx-auto w-full max-w-[80rem]">
        <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,4vw,3rem)] gap-y-[clamp(1.875rem,3vw,2.5rem)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.35fr_1.15fr]">
          <div>
            <Link
              href="/"
              aria-label="RichMonks home"
              className="inline-flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
            >
              <Image
                src="/assets/Brand/logo.png"
                alt="RichMonks — Trust. Trade. Earn."
                width={204}
                height={66}
                className="h-auto w-[8.25rem]"
              />
            </Link>

            <p className="mt-[clamp(0.9rem,1.5vw,1.15rem)] mb-0 max-w-[17rem] font-body text-[0.875rem] leading-[1.7] text-[#c7d1d6]">
              A quantitative research and algorithmic trading firm.
            </p>

            <ul className="mt-[clamp(1rem,1.8vw,1.25rem)] mb-0 flex list-none items-center gap-2 p-0">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/12 bg-white/[0.05] text-[#c7d1d6] transition-colors duration-200 hover:border-green/40 hover:bg-green/10 hover:text-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className={HEADING}>Navigation</h2>
            <ul className="mt-[0.9375rem] mb-0 flex list-none flex-col gap-2.5 p-0">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={LINK}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={HEADING}>Contact</h2>
            <ul className="mt-[0.9375rem] mb-0 flex list-none flex-col gap-3 p-0">
              <li className="flex items-start gap-2.5">
                <MailIcon className="mt-[0.15rem] h-4 w-4 shrink-0 text-green/80" />
                <a href={`mailto:${EMAIL}`} className={LINK}>
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <PinIcon className="mt-[0.15rem] h-4 w-4 shrink-0 text-green/80" />
                <address className="m-0 font-body text-[0.875rem] leading-[1.7] text-[#c7d1d6] not-italic">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={HEADING}>Legal</h2>
            <ul className="mt-[0.9375rem] mb-0 flex list-none flex-col gap-2.5 p-0">
              <li>
                <Link href="/legal" className={LINK}>
                  Disclaimer &amp; Legal
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={LINK}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className={LINK}>
                  Terms of Use
                </Link>
              </li>
            </ul>
            <p className="mt-3 mb-0 max-w-[16rem] font-body text-[0.75rem] leading-[1.7] text-[#91a3ac]">
              This website is for informational purposes only and does not
              constitute investment advice.
            </p>
          </div>
        </div>

        {/* ── Legal & Disclaimer footer summary ── */}
        <div className="mt-[clamp(1.5rem,2.5vw,2rem)] border-t border-white/10 pt-[clamp(1.125rem,1.8vw,1.5rem)]">
          <p className="m-0 mb-1.5 font-body text-[0.6875rem] font-semibold tracking-[0.12em] text-[#91a3ac] uppercase">
            Legal &amp; Disclaimer
          </p>
          <p className="m-0 max-w-[52rem] font-body text-[0.75rem] leading-[1.72] text-[#6b7e87]">
            Richmonks does not solicit investment or provide trading services through this website. All content is provided for informational and educational purposes only. For full legal terms, disclaimers, privacy information, and intellectual-property notices, please review our Legal &amp; Disclaimer page.
          </p>
          <p className="m-0 mt-2">
            <Link
              href="/legal"
              className="font-body text-[0.75rem] font-medium text-green/75 no-underline transition-colors hover:text-green"
            >
              Read Full Legal &amp; Disclaimer →
            </Link>
          </p>
        </div>

        <div className="mt-[clamp(1.25rem,2vw,1.75rem)] flex flex-col gap-1.5 border-t border-white/8 pt-[clamp(0.875rem,1.4vw,1rem)] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 font-body text-[0.75rem] text-[#91a3ac]">
            © 2026 Richmonks. All rights reserved.
          </p>
          <p className="m-0 font-body text-[0.75rem] text-[#91a3ac]">
            Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
