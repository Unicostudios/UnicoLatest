"use client";

import Link from "next/link";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";
import Reveal from "../components/site/Reveal";

const STATS = [
  ["15+", "brands transformed"],
  ["23+", "projects shipped"],
  ["4", "countries served"],
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Strategy before pixels",
    body: "We interrogate the business first. A mood board can't fix an unclear offer.",
  },
  {
    n: "02",
    title: "Two real options, never five",
    body: "Filler concepts exist to make one look good. We'd rather defend two.",
  },
  {
    n: "03",
    title: "Design that survives handoff",
    body: "If engineering has to rebuild it, it wasn't finished. We hand over code and a system.",
  },
  {
    n: "04",
    title: "Small on purpose",
    body: "Staying small is why the work stays consistent and the replies stay fast.",
  },
];

const TICKER_ITEMS = ["Immersified", "Haze UAE", "Gohar", "Aashir Kare", "Dupree Armon"];

export default function About() {
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
            About us · Bangalore, India
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 8vw, 118px)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
          >
            Started in a dorm room.
            <br />
            Still <span style={{ color: "var(--ac)" }}>allergic to layers.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 52px)" }}>
            <p style={{ margin: 0, maxWidth: 540, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              The idea started in my first year of college. No co-founders, no money — just a belief that design,
              strategy and storytelling could build something. Unico now ships brand identities, websites and
              product interfaces for founders across Bangalore, Mumbai, Dubai and Singapore.
            </p>
            <div
              style={{
                display: "flex",
                gap: "clamp(18px, 3vw, 42px)",
                fontFamily: "var(--font-plexmono), monospace",
                fontSize: 11.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "oklch(0.5 0.01 285)",
              }}
            >
              {STATS.map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" }}>
                    {num}
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 84px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(24px, 4vw, 56px)", alignItems: "center" }}>
          <Reveal style={{ minWidth: 0, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
            <img
              decoding="async"
              src="/assets/opt/sreehari.jpg"
              alt="Sreehari, founder of Unico Studios"
              style={{ width: 230, height: 300, objectFit: "cover", objectPosition: "50% 22%", borderRadius: 18 }}
            />
            <div style={{ flex: "1 1 180px", minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 600, letterSpacing: "-0.025em" }}>
                Sreehari
              </div>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ac)", marginTop: 6 }}>
                Founder
              </div>
              <div style={{ display: "grid", gap: 4, marginTop: 14, fontFamily: "var(--font-plexmono), monospace", fontSize: 12, color: "oklch(0.48 0.01 285)" }}>
                <a href="mailto:sreehari@unicostudios.in">sreehari@unicostudios.in</a>
                <a href="https://www.linkedin.com/company/unicostudios" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 14 }}>
              Why the studio exists
            </div>
            <p style={{ margin: "0 0 16px", fontSize: "clamp(16px, 1.7vw, 20px)", lineHeight: 1.55, color: "oklch(0.26 0.012 285)" }}>
              I kept meeting founders who had paid for a logo, paid again for a website that didn&apos;t match it,
              and were about to pay a third time for an app that matched neither.
            </p>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.62, color: "oklch(0.46 0.01 285)" }}>
              So Unico does all three in one continuous system. One team holds the identity, the site and the
              product screens — which is the only way they end up looking like the same company.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(48px, 8vh, 100px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(26px, 5vh, 48px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(28px, 4.4vw, 60px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            How we think
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(min(240px, 100%), 1fr))", gap: 14 }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "oklch(1 0 0)", border: "1px solid var(--line)" }} delay={i * 0.06}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11.5, letterSpacing: "0.12em", color: "var(--ac)", marginBottom: 36 }}>
                  {p.n}
                </div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-bricolage), sans-serif", fontSize: 22, fontWeight: 600, letterSpacing: "-0.025em" }}>
                  {p.title}
                </h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "oklch(0.46 0.01 285)" }}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div style={{ overflow: "hidden", padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div
          style={{
            display: "flex",
            width: "max-content",
            gap: 52,
            animation: "uTicker 28s linear infinite",
            fontFamily: "var(--font-bricolage), sans-serif",
            fontSize: "clamp(18px, 2vw, 26px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "oklch(0.5 0.01 285)",
          }}
        >
          {[0, 1].flatMap((rep) =>
            TICKER_ITEMS.flatMap((item) => [
              <span key={`${rep}-${item}-label`}>{item}</span>,
              <span key={`${rep}-${item}-mark`} style={{ color: "var(--ac)" }}>✳</span>,
            ])
          )}
        </div>
      </div>

      <section style={{ padding: "clamp(56px, 10vh, 118px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(28px, 5vw, 62px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.94 }}>
            Want to see the work?
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/work" style={{ padding: "15px 24px", borderRadius: 999, background: "var(--ac)", color: "#fff", fontSize: 15, fontWeight: 600 }}>
              See selected work
            </Link>
            <Link href="/contact" style={{ padding: "15px 24px", borderRadius: 999, border: "1px solid oklch(0.22 0.012 285 / 0.28)", fontSize: 15, fontWeight: 600 }}>
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
