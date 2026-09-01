"use client";

import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Info,
  User,
  Building2,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useSectionReveal } from "@/lib/motion";
import "./connect-details.css";

const ADDRESS_LINES = [
  "702, Sunil Enclave",
  "Off Andheri Kurla Road",
  "Andheri (E), Mumbai - 400099",
  "India",
];

export default function ConnectDetails() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.organization.trim()) {
      newErrors.organization = "Organization is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const [sectionRef, visible] = useSectionReveal("0px 0px -8% 0px");

  return (
    <section
      ref={sectionRef}
      aria-labelledby="connect-details-heading"
      className={`connect-details-section py-[clamp(3.5rem,6vw,5.5rem)] px-[clamp(1.5rem,5vw,4rem)]${visible ? " is-visible" : ""}`}
    >
      <div className="mx-auto w-full max-w-[78rem] rm-reveal">
        <div className="grid grid-cols-1 gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[46%_54%] items-start">
          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN — OUR DETAILS
              ══════════════════════════════════════════════════════════ */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-green-dark uppercase">
              OUR DETAILS
            </span>

            {/* Main Details Heading */}
            <h2
              id="connect-details-heading"
              className="mt-2.5 mb-0 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-semibold leading-[1.2] text-text-primary"
            >
              Let&apos;s start a conversation.
            </h2>

            {/* Short Accent Line */}
            <span
              aria-hidden="true"
              className="mt-4 block h-0.5 w-12 rounded-full bg-gradient-to-r from-green to-blue"
            />

            {/* Paragraph */}
            <p className="mt-4.5 mb-8 max-w-[34rem] font-body text-[0.9375rem] leading-[1.75] text-text-primary/70">
              We do not provide personalized investment advice or solicit
              investment from the public. All correspondence will be handled
              with discretion and professionalism.
            </p>

            {/* Contact Information Cards Stack */}
            <div className="flex flex-col gap-4">
              {/* Email Card */}
              <div className="connect-info-card">
                <div className="connect-icon-box blue" aria-hidden="true">
                  <Mail className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-body text-[0.6875rem] font-semibold tracking-[0.14em] text-text-primary/60 uppercase">
                    EMAIL
                  </span>
                  <a
                    href="mailto:info@richmonks.in"
                    className="mt-0.5 block font-body text-[1.0625rem] font-semibold text-primary transition-colors hover:text-blue"
                  >
                    info@richmonks.in
                  </a>
                  <span className="mt-0.5 block font-body text-[0.8125rem] text-text-primary/55">
                    For professional inquiries
                  </span>
                </div>
              </div>

              {/* Address Card */}
              <div className="connect-info-card">
                <div className="connect-icon-box green" aria-hidden="true">
                  <MapPin className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-body text-[0.6875rem] font-semibold tracking-[0.14em] text-text-primary/60 uppercase">
                    ADDRESS
                  </span>
                  <address className="mt-1 font-body text-[0.9375rem] font-medium leading-[1.65] text-text-primary not-italic">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <span className="mt-1.5 block font-body text-[0.8125rem] text-text-primary/55">
                    Registered firm location
                  </span>
                </div>
              </div>

              {/* Disclaimer Box */}
              <div className="connect-disclaimer mt-1">
                <Info
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <p className="m-0 font-body text-[0.8125rem] leading-[1.65] text-text-primary/70">
                  Richmonks does not solicit investment or provide trading
                  services through this website. All content is educational and
                  for informational purposes only.
                </p>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN — FORM CARD
              ══════════════════════════════════════════════════════════ */}
          <div className="connect-form-card p-[clamp(1.75rem,3.5vw,2.75rem)]">
            {/* Subtle top horizontal gradient bar */}
            <div className="connect-form-top-accent" aria-hidden="true" />

            {/* Form Heading & Subtitle */}
            <h3 className="m-0 font-display text-[clamp(1.35rem,2vw,1.75rem)] font-semibold text-text-primary">
              Send us a message
            </h3>
            <p className="mt-1.5 mb-7 font-body text-[0.875rem] text-text-primary/60">
              All fields are required. We&apos;ll respond within 2 business days.
            </p>

            {submitted ? (
              <div className="rounded-xl border border-green/20 bg-green/[0.04] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green mb-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="font-display text-lg font-semibold text-text-primary m-0">
                  Message Prepared
                </h4>
                <p className="font-body text-sm text-text-primary/70 mt-2 mb-4 leading-relaxed">
                  Thank you, {formData.fullName}. Your inquiry details have been
                  captured. You can also reach our team directly at{" "}
                  <a
                    href="mailto:info@richmonks.in"
                    className="font-medium text-blue hover:underline"
                  >
                    info@richmonks.in
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      organization: "",
                      message: "",
                    });
                  }}
                  className="text-xs font-semibold text-blue hover:underline uppercase tracking-wider cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4.5">
                {/* 1. Full Name */}
                <div className="connect-input-group">
                  <label
                    htmlFor="fullName"
                    className="font-body text-[0.8125rem] font-medium text-text-primary/85"
                  >
                    Full Name
                  </label>
                  <div className="connect-input-wrapper">
                    <span className="connect-input-icon" aria-hidden="true">
                      <User size={16} strokeWidth={1.8} />
                    </span>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`connect-input-field ${
                        errors.fullName ? "error" : ""
                      }`}
                      aria-invalid={errors.fullName ? "true" : undefined}
                      aria-describedby={
                        errors.fullName ? "fullName-error" : undefined
                      }
                    />
                  </div>
                  {errors.fullName && (
                    <span
                      id="fullName-error"
                      className="font-body text-[0.75rem] text-red"
                    >
                      {errors.fullName}
                    </span>
                  )}
                </div>

                {/* 2. Email Address */}
                <div className="connect-input-group">
                  <label
                    htmlFor="email"
                    className="font-body text-[0.8125rem] font-medium text-text-primary/85"
                  >
                    Email Address
                  </label>
                  <div className="connect-input-wrapper">
                    <span className="connect-input-icon" aria-hidden="true">
                      <Mail size={16} strokeWidth={1.8} />
                    </span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`connect-input-field ${
                        errors.email ? "error" : ""
                      }`}
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </div>
                  {errors.email && (
                    <span
                      id="email-error"
                      className="font-body text-[0.75rem] text-red"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* 3. Organization */}
                <div className="connect-input-group">
                  <label
                    htmlFor="organization"
                    className="font-body text-[0.8125rem] font-medium text-text-primary/85"
                  >
                    Organization
                  </label>
                  <div className="connect-input-wrapper">
                    <span className="connect-input-icon" aria-hidden="true">
                      <Building2 size={16} strokeWidth={1.8} />
                    </span>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your firm or company name"
                      className={`connect-input-field ${
                        errors.organization ? "error" : ""
                      }`}
                      aria-invalid={errors.organization ? "true" : undefined}
                      aria-describedby={
                        errors.organization ? "organization-error" : undefined
                      }
                    />
                  </div>
                  {errors.organization && (
                    <span
                      id="organization-error"
                      className="font-body text-[0.75rem] text-red"
                    >
                      {errors.organization}
                    </span>
                  )}
                </div>

                {/* 4. Message */}
                <div className="connect-input-group">
                  <label
                    htmlFor="message"
                    className="font-body text-[0.8125rem] font-medium text-text-primary/85"
                  >
                    Message
                  </label>
                  <div className="connect-input-wrapper">
                    <span
                      className="connect-input-icon top"
                      aria-hidden="true"
                    >
                      <MessageSquare size={16} strokeWidth={1.8} />
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your inquiry or collaboration interest..."
                      className={`connect-textarea-field ${
                        errors.message ? "error" : ""
                      }`}
                      aria-invalid={errors.message ? "true" : undefined}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                  </div>
                  {errors.message && (
                    <span
                      id="message-error"
                      className="font-body text-[0.75rem] text-red"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  className="connect-submit-btn mt-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  <span>Send Message</span>
                  <Send size={16} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
