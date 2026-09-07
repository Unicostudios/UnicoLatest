"use client";

import Link from "next/link";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";
import Reveal from "../components/site/Reveal";

const OFFERINGS = [
  {
    n: "01",
    title: "Brand identity",
    tagline: "Who you are, said so clearly a stranger repeats it correctly.",
    timeline: "Typically 3 weeks",
    items: [
      ["Positioning & messaging", "One page you can argue with, before anything is drawn."],
      ["Logo & type system", "Marks, typography and colour that hold up small and in motion."],
      ["Guidelines", "Thin enough that your team actually reads them."],
      ["Applied to real surfaces", "Packaging, print, decks — not a logo floating on a grey square."],
    ],
  },
  {
    n: "02",
    title: "Websites",
    tagline: "A site that loads fast, reads well and brings you real enquiries.",
    timeline: "Typically 4–6 weeks",
    items: [
      ["Narrative & copy", "We write the page. Design can't fix a vague sentence."],
      ["Art direction & motion", "Decided while it's being built, not bolted on at the end."],
      ["Build & CMS", "Responsive, quick on bad wifi, editable by your team."],
      ["SEO foundations", "Structure, speed and content that search engines can read."],
    ],
  },
  {
    n: "03",
    title: "SaaS platforms",
    tagline: "The screens behind the login — designed so engineering can ship them.",
    timeline: "Scoped per product",
    items: [
      ["Flows & prototypes", "Clickable before it's pretty, so you find the problems early."],
      ["UI design", "Dashboards, settings and the empty states everyone forgets."],
      ["Design system", "A component library your devs build from instead of rewriting."],
      ["Handoff & QA", "We stay in the build until the screens match the file."],
    ],
  },
];

const RETAINER = [
  "Social media design",
  "Media shoots",
  "Short-form video",
  "SEO & content",
  "Pitch decks",
  "Packaging",
];

const PROCESS = [
  ["Week 1", "Dig", "Founder interviews and a competitor teardown. We interrogate the business, not the mood board."],
  ["Week 2–3", "Shape", "Two directions, both real, no filler concepts — shown on the surfaces you'll actually use."],
  ["Week 4–5", "Build", "Design and code in the same room, so motion and detail survive the build."],
  ["Week 6", "Hand over", "Files, code, component library, a walkthrough — then a month of us on call."],
];

export default function Services() {
  return (
    <div className="u2026">
      <SiteHeader />

      <section style={{ padding: "clamp(56px, 10vh, 116px) clamp(18px, 4vw, 54px) clamp(36px, 6vh, 70px)" }}>
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
            Services
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
            Three things.
            <br />
            <span style={{ color: "var(--ac)" }}>Done properly.</span>
          </h1>
          <p style={{ margin: "clamp(26px, 5vh, 46px) 0 0", maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
            Take one or take all three. Most projects start with the brand and grow into the site and the product —
            that&apos;s where it compounds.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          {OFFERINGS.map((o, i) => (
            <Reveal
              key={o.n}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "clamp(22px, 4vw, 64px)",
                padding: "clamp(30px, 5vh, 56px) 0",
                borderTop: "1px solid oklch(0.22 0.012 285 / 0.12)",
                borderBottom: i === OFFERINGS.length - 1 ? "1px solid oklch(0.22 0.012 285 / 0.12)" : undefined,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-plexmono), monospace",
                    fontSize: 11.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ac)",
                    marginBottom: 14,
                  }}
                >
                  {o.n}
                </div>
                <h2
                  style={{
                    margin: "0 0 14px",
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontSize: "clamp(30px, 4.6vw, 64px)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 0.95,
                  }}
                >
                  {o.title}
                </h2>
                <p style={{ margin: 0, maxWidth: 400, fontSize: "clamp(16px, 1.6vw, 19px)", lineHeight: 1.55, color: "oklch(0.4 0.01 285)" }}>
                  {o.tagline}
                </p>
              </div>
              <div style={{ minWidth: 0, display: "grid", gap: 18, alignContent: "start" }}>
                <div style={{ display: "grid", gap: 14 }}>
                  {o.items.map(([t, d]) => (
                    <div key={t}>
                      <div style={{ fontSize: 16.5, fontWeight: 600, marginBottom: 3 }}>{t}</div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.55, color: "oklch(0.48 0.01 285)" }}>{d}</div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-plexmono), monospace",
                    fontSize: 11.5,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "oklch(0.52 0.01 285)",
                    paddingTop: 6,
                    borderTop: "1px solid oklch(0.22 0.012 285 / 0.1)",
                  }}
                >
                  {o.timeline}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ padding: "clamp(36px, 6vh, 68px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 24px" }}>
          <span
            style={{
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 11.5,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "oklch(0.52 0.01 285)",
            }}
          >
            Also, on retainer
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 14, color: "oklch(0.32 0.012 285)" }}>
            {RETAINER.map((r) => (
              <span key={r} style={{ padding: "8px 14px", borderRadius: 999, border: "1px solid oklch(0.22 0.012 285 / 0.14)" }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 84px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(24px, 4vh, 44px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 3.6vw, 48px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Six weeks, four steps
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
            {PROCESS.map(([week, title, body]) => (
              <Reveal key={week} style={{ minWidth: 0, paddingTop: 18, borderTop: "2px solid var(--ac)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-plexmono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.52 0.01 285)",
                    marginBottom: 10,
                  }}
                >
                  {week}
                </div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-bricolage), sans-serif", fontSize: 21, fontWeight: 600, letterSpacing: "-0.025em" }}>
                  {title}
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "oklch(0.46 0.01 285)" }}>{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(56px, 10vh, 118px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(28px, 5vw, 62px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.94 }}>
              Not sure what you need?
            </h2>
            <p style={{ margin: 0, maxWidth: 460, fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Book thirty minutes. We&apos;ll tell you which of these you need and which you can skip.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href="https://calendly.com/unicostudioss/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "15px 24px", borderRadius: 999, background: "var(--ac)", color: "#fff", fontSize: 15, fontWeight: 600 }}
            >
              Book a call
            </a>
            <Link href="/contact" style={{ padding: "15px 24px", borderRadius: 999, border: "1px solid oklch(0.22 0.012 285 / 0.28)", fontSize: 15, fontWeight: 600 }}>
              Send a brief
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
