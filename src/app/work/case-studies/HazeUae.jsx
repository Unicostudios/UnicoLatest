"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const COLORS = [
  { name: "HAZE BLUE", hex: "#0032F0", fg: "#fff" },
  { name: "BLACKOUT", hex: "#000000", fg: "#fff" },
  { name: "SMOKE", hex: "#323232", fg: "#fff" },
  { name: "HOUSE GREY", hex: "#ADADAD", fg: "#0b0b0b" },
  { name: "WHITE", hex: "#FFFFFF", fg: "#0b0b0b", border: true },
];

const RESULTS = [
  ["150%", "increase in event enquiries"],
  ["1st", "page rankings for core capability searches"],
  ["6wk", "brand and site rebuilt end to end"],
];

export default function HazeUae() {
  return (
    <div className="u2026">
      <SiteHeader variant="case-study" />

      <section style={{ padding: "clamp(52px, 9vh, 104px) clamp(18px, 4vw, 54px) clamp(30px, 5vh, 56px)" }}>
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
            Case study 005 · Haze UAE · Dubai · 2025
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(38px, 7.4vw, 112px)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
            }}
          >
            Your vision,
            <br />
            <span style={{ color: "var(--ac)" }}>our expertise.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              Haze is a video production and AV company in the UAE, known for creating captivating visual stories.
              Buyers were treating them like a rental vendor. We rebuilt the brand and the website around the three
              things they actually sell — AV services, video production, live streaming — and event enquiries rose
              150%.
            </p>
            <div
              style={{
                display: "grid",
                gap: 14,
                fontFamily: "var(--font-plexmono), monospace",
                fontSize: 11.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "oklch(0.5 0.01 285)",
              }}
            >
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Identity · Website · SEO · Content</div>
                Scope
              </div>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>6 weeks, 2 designers, 1 dev</div>
                Team
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(48px, 8vh, 96px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <a
            href="https://hazeuae.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              borderRadius: 16,
              overflow: "hidden",
              background: "oklch(0.9 0.004 285)",
              boxShadow: "0 30px 70px oklch(0.22 0.012 285 / 0.16)",
              transition: "transform 0.4s cubic-bezier(0.2,0,0.2,1), box-shadow 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 40px 90px oklch(0.22 0.012 285 / 0.24)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 30px 70px oklch(0.22 0.012 285 / 0.16)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                background: "oklch(0.94 0.003 285)",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.75 0.16 25)" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.83 0.14 85)" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.78 0.15 145)" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  marginLeft: 8,
                  padding: "5px 12px",
                  borderRadius: 6,
                  background: "oklch(0.98 0.002 285)",
                  fontFamily: "var(--font-plexmono), monospace",
                  fontSize: 11,
                  color: "oklch(0.5 0.01 285)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                hazeuae.com
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flex: "0 0 auto",
                  padding: "5px 11px",
                  borderRadius: 999,
                  background: "var(--ac)",
                  color: "#fff",
                  fontFamily: "var(--font-plexmono), monospace",
                  fontSize: 10.5,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Visit live site ↗
              </div>
            </div>
            <div style={{ position: "relative", background: "#000" }}>
              <img
                decoding="async"
                src="/assets/opt/haze-hero.jpg"
                alt="Haze UAE homepage"
                style={{ display: "block", width: "100%", aspectRatio: "1440/900", objectFit: "cover", opacity: 0.62 }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(6px, 1.2vw, 16px)",
                  padding: "0 clamp(16px, 4vw, 70px)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <span style={{ fontFamily: "var(--font-alex-brush), cursive", fontSize: "clamp(20px, 4vw, 62px)", lineHeight: 1, letterSpacing: "0.11em" }}>
                  Your Vision, Our Expertise
                </span>
                <span style={{ maxWidth: 620, fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: "clamp(9px, 1.25vw, 17px)", lineHeight: 1.45 }}>
                  Bring your ideas to life with stunning, high-quality videos. Whether it&rsquo;s capturing special
                  moments or creating compelling content, we deliver visuals that resonate.
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: "clamp(4px, 0.8vw, 10px)",
                    padding: "clamp(6px, 0.9vw, 13px) clamp(8px, 1vw, 14px) clamp(6px, 0.9vw, 13px) clamp(14px, 1.8vw, 26px)",
                    borderRadius: 34,
                    background: "#0032F0",
                    boxShadow: "4px 4px 17px rgba(0,50,240,0.25)",
                    fontFamily: "var(--font-g-montserrat), sans-serif",
                    fontSize: "clamp(9px, 1.05vw, 14px)",
                  }}
                >
                  Get In Touch
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: "clamp(16px, 1.9vw, 26px)",
                      height: "clamp(16px, 1.9vw, 26px)",
                      borderRadius: "50%",
                      background: "#fff",
                      color: "#0032F0",
                      fontSize: "clamp(8px, 1vw, 13px)",
                    }}
                  >
                    ↗
                  </span>
                </span>
              </div>
            </div>
          </a>
          <div
            style={{
              marginTop: 12,
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "oklch(0.52 0.01 285)",
            }}
          >
            Click the mockup to open hazeuae.com in a new tab
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(44px, 8vh, 92px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(24px, 4vw, 56px)" }}>
          <Reveal style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The problem
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              A kit list where a capability story should have been. Procurement teams compared them on day rates
              because nothing on the site gave them another axis.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The move
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Lead with the room, not the rack. Rebuild the site around named event outcomes, write SEO-led content
              for the searches buyers actually run, and simplify the UI so an enquiry is three clicks from anywhere.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The work
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            <div style={{ minWidth: 0, borderRadius: 20, overflow: "hidden", background: "#000", position: "relative" }}>
              <img decoding="async" src="/assets/opt/haze-bg.jpg" alt="Haze services section" style={{ display: "block", width: "100%", height: 320, objectFit: "cover", opacity: 0.5 }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 12,
                  padding: "clamp(20px, 3vw, 40px)",
                  color: "#fff",
                  fontFamily: "var(--font-cormorant), serif",
                }}
              >
                <span style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1 }}>AV SERVICES</span>
                <span style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1, opacity: 0.45 }}>video production</span>
                <span style={{ fontSize: "clamp(22px, 3vw, 40px)", lineHeight: 1, opacity: 0.45 }}>live streaming</span>
              </div>
            </div>
            <div style={{ minWidth: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <img decoding="async" src="/assets/opt/haze-shot-a.jpg" alt="Haze production still" style={{ display: "block", width: "100%", height: 320, objectFit: "cover", borderRadius: 20 }} />
              <img decoding="async" src="/assets/opt/haze-shot-b.jpg" alt="Haze production still" style={{ display: "block", width: "100%", height: 320, objectFit: "cover", borderRadius: 20 }} />
            </div>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 16 }}>
            {COLORS.map((c) => (
              <div
                key={c.name}
                style={{
                  minWidth: 0,
                  height: 96,
                  borderRadius: 16,
                  background: c.hex,
                  color: c.fg,
                  border: c.border ? "1px solid var(--line)" : undefined,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: 12,
                  fontFamily: "var(--font-plexmono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                }}
              >
                <span>{c.name}</span>
                <span style={{ opacity: 0.72 }}>{c.hex}</span>
              </div>
            ))}
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                Display
              </div>
              <div style={{ fontFamily: "var(--font-alex-brush), cursive", fontSize: "clamp(30px, 4.4vw, 56px)", lineHeight: 1.1, letterSpacing: "0.11em", marginBottom: 10 }}>
                Your Vision, Our Expertise
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Alex Brush 64 for the one line that has to feel handmade — used once per page, never twice.
              </div>
            </div>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                Headings &amp; body
              </div>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1, marginBottom: 10 }}>
                Napoli 64 / 24
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Napoli at 64 for section titles, Regular 24 for body, Regular 20 on buttons. Montserrat 16 carries
                the navigation and small print.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, alignItems: "start" }}>
          <Reveal style={{ minWidth: 0 }}>
            <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(24px, 3.4vw, 44px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              The result
            </h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "oklch(0.42 0.01 285)" }}>
              An intuitive UI over SEO-optimised content: three named capabilities instead of a kit list, galleries
              split into photos and videos, and a contact block — info@hazeuae.com, +971 4 3400722, Al Quoz Ind
              Area 1 — repeated wherever an enquiry might start.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0, display: "grid", gap: 12 }} delay={0.08}>
            {RESULTS.map(([num, label]) => (
              <div key={label} style={{ padding: 22, borderRadius: 18, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em" }}>{num}</div>
                <div style={{ fontSize: 14.5, color: "oklch(0.46 0.01 285)" }}>{label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 84px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal
            as="blockquote"
            style={{
              margin: 0,
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(22px, 3.4vw, 42px)",
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
            }}
          >
            &ldquo;Unico built our entire brand identity and website. Within 3 weeks we started getting inbound
            leads from the UAE market.&rdquo;
          </Reveal>
          <Reveal
            style={{
              marginTop: 20,
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 11.5,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "oklch(0.5 0.01 285)",
            }}
          >
            FOUNDER · HAZE UAE
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(20px, 4vh, 40px) clamp(18px, 4vw, 54px) clamp(40px, 7vh, 88px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: "clamp(16px, 2.4vw, 26px)",
            }}
          >
            <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Inside the file
            </h2>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
              Drag to pan · scroll to zoom
            </div>
          </Reveal>
          <Reveal>
            <FileBoard label="HAZE.FIG">
              <BoardTile label="Main page — hero" src="/assets/opt/haze-hero.jpg" style={{ left: 60, top: 90, width: 620 }} imgStyle={{ height: 400 }} />
              <BoardTile label="Services backdrop" src="/assets/opt/haze-bg.jpg" style={{ left: 740, top: 90, width: 480 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Footer band" src="/assets/opt/haze-footer.jpg" style={{ left: 740, top: 440, width: 480 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Still — A" src="/assets/opt/haze-shot-a.jpg" style={{ left: 1280, top: 90, width: 340 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Still — B" src="/assets/opt/haze-shot-b.jpg" style={{ left: 1280, top: 440, width: 340 }} imgStyle={{ height: 300 }} />
              <div style={{ position: "absolute", left: 60, top: 960, width: 1600, padding: 28, border: "1px dashed #0032F066", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>
                  Palette + type — the actual page
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#0032F0", "#000000", "#323232", "#ADADAD", "#FFFFFF"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Napoli
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      Alex Brush 64 · Napoli 64/24 · Montserrat 16
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1740, top: 960, width: 540, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>
                  Scratch — do not ship
                </div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                  Page 1 = &quot;Haze Productions&quot;, abandoned
                  <br />→ Page 2 = the real one
                  <br />→ Alex Brush used exactly once. On purpose.
                </div>
              </div>
            </FileBoard>
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="haze-uae" />
      <SiteFooter />
    </div>
  );
}
