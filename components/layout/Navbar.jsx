"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Approach", href: "/approach" },
  // { label: "Team", href: "/team" }, // Removed per request
  { label: "Contact", href: "/connect" },
];

const DOWNLOAD_HREF = "#download";
const SCROLL_THRESHOLD = 24;

/* Header and hero share one fluid shell so the logo starts on the same left
   edge as the hero copy. */
const SHELL = "mx-auto w-full max-w-[100rem] px-[clamp(1.25rem,3.5vw,3.5rem)]";

function isActivePath(pathname, href) {
  if (!pathname) return false;
  const normalized = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  if (target === "/") {
    return normalized === "/";
  }
  return normalized === target || normalized.startsWith(`${target}/`);
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BrandLogo({
  onNavigate,
  className = "w-[clamp(8.5rem,11vw,10.5rem)]",
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="RichMonks home"
      className={`inline-flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${className}`}
    >
      <Image
        src="/assets/Brand/logo.png"
        alt="RichMonks — Trust. Trade. Earn."
        width={204}
        height={66}
        priority
        className="h-auto w-full"
      />
    </Link>
  );
}

function NavLink({ href, label, active, onNavigate, className = "" }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`relative text-small font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
        active
          ? "text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-primary"
          : "text-text-primary/85 hover:text-primary"
      } ${className}`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
  setScrolled(window.scrollY > SCROLL_THRESHOLD);
  // Close mobile drawer if open to avoid overlay appearing on scroll
  if (mobileOpen) setMobileOpen(false);
};

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  return (
    <header
      className={`sticky top-0 z-50 h-header transition-[background-color,backdrop-filter] duration-300 lg:h-[var(--spacing-header-lg)] ${
        scrolled ? "bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`${SHELL} flex h-full items-center justify-between gap-[clamp(1.5rem,6vw,5rem)]`}
      >
        <BrandLogo onNavigate={closeMobile} />

        <nav
          className="hidden items-center gap-[clamp(1.5rem,2.4vw,2.5rem)] lg:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActivePath(pathname, link.href)}
            />
          ))}
          <Link
            href={DOWNLOAD_HREF}
            className="ml-[clamp(0.5rem,1.2vw,1.25rem)] inline-flex items-center rounded-md bg-blue px-5 py-2.5 text-small font-semibold whitespace-nowrap text-text-secondary no-underline transition-colors duration-200 hover:bg-[#005b87] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            Download App
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="-mr-2 inline-flex items-center justify-center rounded-sm p-2 text-text-primary transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/35 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={closeMobile}
      />

      <div
        id={menuId}
        ref={drawerRef}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Site navigation"
        inert={!mobileOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-[min(20rem,86vw)] flex-col bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.12)] transition-[transform,visibility] duration-300 ease-out lg:hidden ${
          mobileOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <BrandLogo onNavigate={closeMobile} className="w-[8.5rem]" />
          <button
            type="button"
            className="-mr-2 inline-flex items-center justify-center rounded-sm p-2 text-text-primary transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Close menu"
            onClick={closeMobile}
          >
            <CloseIcon />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col gap-2 px-5 py-6"
          aria-label="Site navigation"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={isActivePath(pathname, link.href)}
              onNavigate={closeMobile}
              className="py-2 after:hidden"
            />
          ))}
          <Link
            href={DOWNLOAD_HREF}
            onClick={closeMobile}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-blue px-6 py-3 text-small font-semibold text-text-secondary no-underline transition-colors hover:bg-[#005b87] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            Download App
          </Link>
        </nav>
      </div>
    </header>
  );
}
