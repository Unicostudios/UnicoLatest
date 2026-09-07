"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";
import Reveal from "../components/site/Reveal";

/**
 * No source design file (contact.dc.html) was ever provided for this page —
 * it is built from the shared design system (tokens, header/footer, Reveal)
 * rather than converted from a .dc.html export. The submission mechanism
 * (POST to the same Google Apps Script endpoint, Name/Phone/Service fields)
 * is carried over unchanged from the previous site's ContactForm.jsx so the
 * form keeps working exactly as it did before.
 */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzouJfPPBTXs7MXPUgQcGFKjNbD0m66uNr0d6_LfLGG-LFS4eHC4BhJWJUvo-RBVUxT/exec";

const SERVICES = [
  "Web Design and Development",
  "App Design and Development",
  "Branding",
  "SEO",
  "Performance Marketing",
  "AI Automation",
];

const CONTACT_DETAILS = [
  { label: "Email", value: "sreehari@unicostudios.in", href: "mailto:sreehari@unicostudios.in" },
  { label: "Phone", value: "+91 81054 59006", href: "tel:+918105459006" },
  { label: "WhatsApp", value: "Message us", href: "https://wa.me/918147057109" },
  { label: "Address", value: "Bangalore, India", href: null },
];

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 12,
  border: "1px solid var(--line)",
  background: "var(--paper-card)",
  color: "var(--ink)",
  fontFamily: "var(--font-g-montserrat), sans-serif",
  fontSize: 15,
  outline: "none",
};

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontFamily: "var(--font-plexmono), monospace",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "oklch(0.5 0.01 285)",
};

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!service) {
      toast.error("Please select a service!");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Service", service);

    setSubmitting(true);
    const toastId = toast.loading("Sending...");
    try {
      const response = await fetch(SCRIPT_URL, { method: "POST", body: formData });
      if (response.ok) {
        setName("");
        setPhone("");
        setService("");
        toast.success("Sent — we'll be in touch soon.");
      } else {
        toast.error("Failed to send. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      toast.dismiss(toastId);
      setSubmitting(false);
    }
  };

  return (
    <div className="u2026">
      <SiteHeader variant="default" />

      <section style={{ padding: "clamp(56px, 10vh, 120px) clamp(18px, 4vw, 54px) clamp(36px, 6vh, 64px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <p
            style={{
              margin: "0 0 22px",
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "oklch(0.5 0.01 285)",
            }}
          >
            Contact · Bangalore, India
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(38px, 7.4vw, 104px)",
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
            }}
          >
            Let&rsquo;s build something
            <br />
            <span style={{ color: "var(--ac)" }}>unico</span> together.
          </h1>
          <p style={{ margin: "clamp(24px, 4vh, 40px) 0 0", maxWidth: 560, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
            Have a project in mind? Whether it&rsquo;s brand identity, a website or a product interface — tell us
            what you&rsquo;re building and we&rsquo;ll get back within a day.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(56px, 9vh, 104px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(24px, 4vw, 56px)", alignItems: "start" }}>
          <Reveal
            as="form"
            onSubmit={handleSubmit}
            style={{ minWidth: 0, padding: "clamp(24px, 4vw, 40px)", borderRadius: 24, background: "var(--paper-card)", border: "1px solid var(--line)" }}
          >
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle} htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle} htmlFor="contact-phone">Phone</label>
              <input
                id="contact-phone"
                type="text"
                required
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle} htmlFor="contact-service">What do you need?</label>
              <select
                id="contact-service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ ...inputStyle, appearance: "auto", cursor: "pointer" }}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "15px 24px",
                borderRadius: 999,
                background: "var(--ac)",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                border: "none",
                cursor: submitting ? "default" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </Reveal>

          <Reveal style={{ minWidth: 0, display: "grid", gap: 12 }} delay={0.08}>
            {CONTACT_DETAILS.map((c) => (
              <div key={c.label} style={{ padding: 22, borderRadius: 18, background: "oklch(1 0 0)", border: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 8 }}>
                  {c.label}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}
                  >
                    {c.value}
                  </a>
                ) : (
                  <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {c.value}
                  </div>
                )}
              </div>
            ))}
            <a
              href="https://calendly.com/unicostudioss/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 22,
                borderRadius: 18,
                background: "#111",
                color: "#fff",
              }}
            >
              <span style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em" }}>
                Book 30 minutes
              </span>
              <span>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
