"use client";

import Link from "next/link";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";
import Reveal from "../components/site/Reveal";
import { CASE_STUDIES } from "./case-studies/registry";

export default function Work() {
  return (
    <div className="u2026">
      <SiteHeader />

      <section style={{ padding: "clamp(56px, 10vh, 110px) clamp(18px, 4vw, 54px) clamp(30px, 5vh, 54px)" }}>
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
            Selected work · 2024—2026
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
            Proof, not
            <br />
            <span style={{ color: "var(--ac)" }}>promises.</span>
          </h1>
          <p style={{ margin: "clamp(26px, 5vh, 48px) 0 0", maxWidth: 540, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
            Twenty-three projects across four countries. These nine show best how identity, web and product hold
            together when the same team makes all three.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(20px, 4vh, 40px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gap: "clamp(18px, 3vh, 34px)" }}>
          {CASE_STUDIES.map((c) => (
            <Reveal key={c.slug} as="div">
              <Link
                href={`/work/${c.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "clamp(18px, 3vw, 40px)",
                  alignItems: "center",
                  padding: "clamp(18px, 2vw, 26px)",
                  borderRadius: 24,
                  background: "var(--paper-card)",
                  border: "1px solid var(--line)",
                  transition: "background 0.35s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.965 0.004 285)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--paper-card)")}
              >
                <img
                  decoding="async"
                  src={c.heroImage}
                  alt={c.name}
                  style={{
                    minWidth: 0,
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    borderRadius: 16,
                    order: c.imageOrder === "right" ? 2 : 1,
                  }}
                />
                <div style={{ minWidth: 0, order: c.imageOrder === "right" ? 1 : 2 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-plexmono), monospace",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "oklch(0.5 0.01 285)",
                    }}
                  >
                    {c.number} · {c.year} · {c.location}
                  </div>
                  <h2
                    style={{
                      margin: "10px 0 12px",
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontSize: "clamp(26px, 3.4vw, 44px)",
                      fontWeight: 800,
                      letterSpacing: "-0.035em",
                    }}
                  >
                    {c.name}
                  </h2>
                  <p style={{ margin: "0 0 18px", fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{c.description}</p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 7,
                      fontFamily: "var(--font-plexmono), monospace",
                      fontSize: 10.5,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "oklch(0.5 0.01 285)",
                    }}
                  >
                    {c.tags.map((t) => (
                      <span key={t} style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid oklch(0.22 0.012 285 / 0.14)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      fontFamily: "var(--font-plexmono), monospace",
                      fontSize: 11.5,
                      letterSpacing: "0.1em",
                      color: "var(--ac)",
                    }}
                  >
                    READ THE CASE STUDY →
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "clamp(56px, 10vh, 118px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(28px, 5vw, 62px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.94 }}>
            Yours could be 024.
          </h2>
          <Link href="/contact" style={{ padding: "15px 24px", borderRadius: 999, background: "var(--ac)", color: "#fff", fontSize: 15, fontWeight: 600 }}>
            Send us a brief
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
