"use client";

import { useState, useEffect, useRef } from "react";
import { Info, AlertTriangle, ShieldCheck, Lock, CheckCircle2, BookOpen } from "lucide-react";
import Link from "next/link";
import "./legal-content.css";

const SECTIONS = [
  { id: "no-solicitation", label: "No Solicitation", num: "01" },
  { id: "intellectual-property", label: "Intellectual Property", num: "02" },
  { id: "privacy-and-data", label: "Privacy and Data", num: "03" },
  { id: "accuracy-of-information", label: "Accuracy of Information", num: "04" },
];

const IP_CHECKLIST = [
  "Written content and editorial material published on this website",
  "Visual design, graphics, and brand identity elements",
  "Algorithmic methodologies, models, and research frameworks",
];

export default function LegalContent() {
  const [activeSection, setActiveSection] = useState("no-solicitation");
  const sectionRefs = useRef({});
  const ticking = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        sectionRefs.current[id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <section
      aria-labelledby="legal-content-heading"
      className="legal-content-section"
    >
      {/* Visually hidden section title for a11y */}
      <h2 id="legal-content-heading" className="sr-only">
        Legal Sections
      </h2>

      <div className="legal-layout">
        {/* ══════════════════════════
            LEFT — Contents Navigation
            ══════════════════════════ */}
        <aside aria-label="Legal contents navigation">
          <div className="legal-nav-card">
            <div className="legal-nav-header">
              <p className="legal-nav-title">Contents</p>
            </div>

            <nav aria-label="Jump to section">
              <ul className="legal-nav-list">
                {SECTIONS.map(({ id, label, num }) => (
                  <li key={id} className="legal-nav-item">
                    <a
                      href={`#${id}`}
                      onClick={scrollTo(id)}
                      className={`legal-nav-link${activeSection === id ? " active" : ""}`}
                      aria-current={activeSection === id ? "true" : undefined}
                    >
                      <span className="legal-nav-num">{num}</span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Legal contact block */}
            <div className="legal-nav-contact">
              <span className="legal-nav-contact-label">Legal inquiries</span>
              <a
                href="mailto:connect@richmonks.in"
                className="legal-nav-contact-link"
              >
                connect@richmonks.in
              </a>
            </div>
          </div>
        </aside>

        {/* ═══════════════════════════
            RIGHT — Legal Sections
            ═══════════════════════════ */}
        <div className="legal-sections">

          {/* ── SECTION 01: NO SOLICITATION ── */}
          <article id="no-solicitation" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">01</span>
              <h2 className="legal-section-title">No Solicitation</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              Richmonks does not solicit investment or provide trading services
              through this website.
            </p>
            <p className="legal-body">
              All content published on this website is educational and for
              informational purposes only. Nothing presented here constitutes an
              offer, solicitation, or recommendation to buy or sell any financial
              instrument, security, or investment product.
            </p>

            {/* Blue informational callout */}
            <div className="legal-callout-blue" role="note">
              <Info
                size={16}
                strokeWidth={2}
                className="legal-callout-blue-icon"
                aria-hidden="true"
              />
              <p>
                This website is intended for informational purposes only and
                does not constitute investment advice of any kind.
              </p>
            </div>
          </article>

          {/* ── SECTION 02: INTELLECTUAL PROPERTY ── */}
          <article id="intellectual-property" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">02</span>
              <h2 className="legal-section-title">Intellectual Property</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              All content, graphics, and algorithms described on this website
              are proprietary to Richmonks.
            </p>
            <p className="legal-body">
              This includes but is not limited to: written content, visual
              design elements, algorithmic methodologies described or referenced,
              brand identity, and all associated intellectual property. All
              rights are protected under applicable intellectual property laws.
            </p>

            {/* Checklist */}
            <ul className="legal-checklist" aria-label="Protected intellectual property">
              {IP_CHECKLIST.map((item) => (
                <li key={item} className="legal-check-row">
                  <CheckCircle2
                    size={16}
                    strokeWidth={2.2}
                    className="legal-check-icon"
                    aria-hidden="true"
                  />
                  <p className="legal-check-text">{item}</p>
                </li>
              ))}
            </ul>
          </article>

          {/* ── SECTION 03: PRIVACY AND DATA ── */}
          <article id="privacy-and-data" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">03</span>
              <h2 className="legal-section-title">Privacy and Data</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              Any data submitted through this website will be handled in
              accordance with our privacy commitments.
            </p>
            <p className="legal-body">
              Richmonks is committed to protecting the confidentiality and
              integrity of all personal and professional information. Data
              submitted via contact forms or other means will not be shared with
              third parties for commercial purposes and will be used solely to
              respond to your inquiry.
            </p>

            {/* Two privacy cards */}
            <div className="legal-cards-grid">
              <div className="legal-card">
                <div className="legal-card-icon-box blue" aria-hidden="true">
                  <ShieldCheck size={18} strokeWidth={1.8} />
                </div>
                <h3 className="legal-card-title">Data Security</h3>
                <p className="legal-card-body">
                  All submitted information is handled with strict
                  confidentiality protocols.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon-box green" aria-hidden="true">
                  <Lock size={18} strokeWidth={1.8} />
                </div>
                <h3 className="legal-card-title">No Third-Party Sharing</h3>
                <p className="legal-card-body">
                  Your information is never sold or shared for commercial
                  purposes.
                </p>
              </div>
            </div>
          </article>

          {/* ── SECTION 04: ACCURACY OF INFORMATION ── */}
          <article id="accuracy-of-information" className="legal-section">
            <div className="legal-section-head">
              <span className="legal-section-num" aria-hidden="true">04</span>
              <h2 className="legal-section-title">Accuracy of Information</h2>
            </div>
            <span className="legal-section-divider" aria-hidden="true" />

            <p className="legal-intro">
              While we strive for accuracy, Richmonks makes no warranties
              regarding the completeness, reliability, or suitability of the
              information provided.
            </p>
            <p className="legal-body">
              Information on this website may be subject to change without
              notice. Richmonks does not guarantee that content is current,
              complete, or free from errors. Users rely on content at their own
              discretion and should seek independent professional advice before
              making any financial decisions.
            </p>

            {/* Warning callout */}
            <div className="legal-callout-warning" role="note">
              <AlertTriangle
                size={16}
                strokeWidth={2}
                className="legal-callout-warning-icon"
                aria-hidden="true"
              />
              <p>
                Users are advised to conduct their own due diligence. Nothing
                on this website should be construed as professional financial,
                legal, or investment advice.
              </p>
            </div>
          </article>

          {/* ── YOUR ACCEPTANCE PANEL ── */}
          <div className="legal-acceptance" role="region" aria-label="Your acceptance">
            <div className="legal-acceptance-icon" aria-hidden="true">
              <BookOpen size={22} strokeWidth={1.6} />
            </div>

            <h2 className="legal-acceptance-title">Your Acceptance</h2>

            <p className="legal-acceptance-body">
              By using this website, you acknowledge and accept the terms and
              conditions outlined above. If you do not agree with any part of
              this disclaimer, please discontinue use of this website.
            </p>

            <span className="legal-acceptance-divider" aria-hidden="true" />

            <p className="legal-acceptance-footer">
              © 2026 Richmonks. All rights reserved.&nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="/connect">Contact Us</Link>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

