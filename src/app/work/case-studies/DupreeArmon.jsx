"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const FRAMES = ["/assets/opt/dup-1.jpg", "/assets/opt/dup-2.jpg", "/assets/opt/dup-3.jpg", "/assets/opt/dup-4.jpg"];

const COLORS = [
  { name: "PAPER", hex: "#FFFFFF", fg: "#0b0b0b", border: true },
  { name: "INK", hex: "#0E0E0E", fg: "#fff" },
  { name: "QUOTE BLACK", hex: "#1C1B1B", fg: "#fff" },
  { name: "FRAME GREY", hex: "#D9D9D9", fg: "#0b0b0b" },
  { name: "ACCENT VIOLET", hex: "#5F14E0", fg: "#fff" },
];

const RESULTS = [
  ["1", "shoot, art-directed end to end"],
  ["4wk", "shoot to live portfolio"],
  ["30min", "consultation, paid — credited to the project"],
  ["$49.99", "booking fee that filters out tyre-kickers"],
];

/** The Enter-pill splash nav shared by the hero mockup and the file-board tile. */
function SplashNav({ scale = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 * scale }}>
      <img decoding="async" src="/assets/opt/dup-logo.png" alt="Duprée Armon mark" style={{ width: 30 * scale, height: 30 * scale, objectFit: "contain" }} />
      <div style={{ display: "flex", gap: 22 * scale, fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 12 * scale, color: "#000" }}>
        <span>About me</span>
        <span>Home</span>
        <span>My Work</span>
        <span>Contact</span>
      </div>
    </div>
  );
}

export default function DupreeArmon() {
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
            Case study 008 · Dupree Armon · India · 2025
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
            A portfolio that
            <br />
            opens with <span style={{ color: "var(--ac)" }}>one word.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              Duprée Armon is a brand and fashion photographer. The whole site starts on a single white screen
              with her name, a hairline &ldquo;Enter&rdquo; pill and nothing else — because the work should be the
              first thing you see, not a nav bar. Media shoot, art direction and the portfolio it lives on,
              directed as one piece.
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
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Media shoot · Art direction · Portfolio site</div>
                Scope
              </div>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>4 weeks, 1 designer, 1 shoot</div>
                Team
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(48px, 8vh, 96px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ borderRadius: 16, overflow: "hidden", background: "oklch(0.9 0.004 285)", boxShadow: "0 30px 70px oklch(0.22 0.012 285 / 0.16)" }}>
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
                Duprée Armon — splash screen
              </div>
            </div>
            <div style={{ position: "relative", background: "#fff", aspectRatio: "1440/746" }}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "clamp(8px, 1.8vw, 26px) clamp(10px, 3.2vw, 47px)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <img decoding="async" src="/assets/opt/dup-logo.png" alt="Duprée Armon mark" style={{ width: "clamp(18px, 3vw, 44px)", height: "clamp(18px, 3vw, 44px)", objectFit: "contain" }} />
                  <div style={{ display: "flex", gap: "clamp(10px, 2vw, 34px)", fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: "clamp(7px, 0.95vw, 14px)", color: "#000" }}>
                    <span>About me</span>
                    <span>Home</span>
                    <span>My Work</span>
                    <span>Contact</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "clamp(10px, 1.6vw, 22px)",
                      padding: "clamp(5px, 0.9vw, 13px) clamp(6px, 1vw, 14px) clamp(5px, 0.9vw, 13px) clamp(14px, 2vw, 29px)",
                      borderRadius: 50,
                      border: "1px solid #000",
                      fontFamily: "var(--font-blinker), sans-serif",
                      fontSize: "clamp(9px, 1.2vw, 17px)",
                      letterSpacing: "0.05em",
                      color: "#000",
                    }}
                  >
                    Enter
                    <span
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: "clamp(18px, 2.4vw, 34px)",
                        height: "clamp(18px, 2.4vw, 34px)",
                        borderRadius: "50%",
                        border: "1px solid #000",
                        fontSize: "clamp(8px, 1vw, 14px)",
                      }}
                    >
                      ↗
                    </span>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: "clamp(6.5px, 0.85vw, 12px)", color: "#000" }}>
                  <span>Duprée Armon</span>
                  <span>Designed by unico studios</span>
                </div>
              </div>
            </div>
          </div>
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
            Splash — 1440 × 746, Blinker 24 on white, one 50px pill
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
              Strong individual images with no through-line, sitting on a site that framed them like a mood board
              rather than a body of work — and no way to book her without an email chain.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The move
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Direct the shoot and the site together: one lighting language, one crop logic, one grid. Hold
              everything back behind a single Enter screen, then let the frames run full-bleed on black — and put
              a paid consultation booking at the end so enquiries arrive qualified.
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
            <div style={{ minWidth: 0, gridColumn: "1 / -1", borderRadius: 20, overflow: "hidden", background: "#0E0E0E", padding: "clamp(18px, 3vw, 44px)" }}>
              <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontWeight: 600, fontSize: "clamp(24px, 4vw, 54px)", letterSpacing: "-0.01em", color: "#fff", marginBottom: "clamp(16px, 2.4vw, 30px)" }}>
                MY WORK
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "clamp(10px, 1.6vw, 20px)" }}>
                {FRAMES.map((src) => (
                  <img key={src} decoding="async" src={src} alt="Duprée Armon frame" style={{ display: "block", width: "100%", aspectRatio: "4/5", objectFit: "cover", borderRadius: 12 }} />
                ))}
              </div>
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
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16, alignItems: "stretch" }}>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                Typeface
              </div>
              <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontWeight: 500, fontSize: "clamp(30px, 4vw, 54px)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 10 }}>
                Meet Duprée
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Montserrat Medium 128 for the about-page title, Bold 52 for section heads, Regular 22–24 body.
                Blinker 24 appears once — on the Enter pill.
              </div>
            </div>
            <div style={{ minWidth: 0, display: "flex", gap: 16, alignItems: "stretch" }}>
              <img decoding="async" src="/assets/opt/dup-about.jpg" alt="Duprée Armon portrait" style={{ display: "block", width: "42%", minWidth: 0, objectFit: "cover", borderRadius: 20 }} />
              <div style={{ flex: 1, minWidth: 0, padding: 26, borderRadius: 30, background: "#1C1B1B", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 12 }}>
                  CEO | Founder of rufescentlips
                </div>
                <p style={{ margin: 0, fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 15, lineHeight: 1.5, opacity: 0.9 }}>
                  &ldquo;Friend, you&rsquo;re the absolute best at this. I appreciate your professionalism,
                  attention to detail, and your perfectionism when it comes to brand storytelling. You see past the
                  surface and it shows in every project you deliver.&rdquo;
                </p>
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
              Full-bleed frames, minimal chrome and type that stays out of the way — the site is a frame around the
              photographs, not a competing design.
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
            <FileBoard label="DUPREE.FIG">
              <BoardTile label="About me — portrait" src="/assets/opt/dup-about.jpg" style={{ left: 60, top: 90, width: 420 }} imgStyle={{ height: 420 }} />
              <BoardTile label="Frame 01" src={FRAMES[0]} style={{ left: 540, top: 90, width: 340 }} imgStyle={{ height: 420 }} />
              <BoardTile label="Frame 02" src={FRAMES[1]} style={{ left: 940, top: 90, width: 340 }} imgStyle={{ height: 420 }} />
              <BoardTile label="Frame 03" src={FRAMES[2]} style={{ left: 1340, top: 90, width: 340 }} imgStyle={{ height: 420 }} />
              <BoardTile label="Frame 04" src={FRAMES[3]} style={{ left: 1740, top: 90, width: 340 }} imgStyle={{ height: 420 }} />

              <div style={{ position: "absolute", left: 60, top: 560, width: 620 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 8 }}>Splash — Enter</div>
                <div style={{ position: "relative", height: 330, borderRadius: 3, background: "#fff", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", padding: "22px 26px" }}>
                  <SplashNav />
                  <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 18,
                        padding: "11px 12px 11px 26px",
                        borderRadius: 50,
                        border: "1px solid #000",
                        fontFamily: "var(--font-blinker), sans-serif",
                        fontSize: 17,
                        letterSpacing: "0.05em",
                        color: "#000",
                      }}
                    >
                      Enter
                      <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: "50%", border: "1px solid #000", fontSize: 13 }}>↗</span>
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 11, color: "#000" }}>
                    <span>Duprée Armon</span>
                    <span>Designed by unico studios</span>
                  </div>
                </div>
              </div>

              <div style={{ position: "absolute", left: 740, top: 560, width: 620 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 8 }}>MY WORK — gallery</div>
                <div style={{ height: 330, borderRadius: 3, background: "#0E0E0E", padding: 24, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
                  <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontWeight: 600, fontSize: 30, color: "#fff", marginBottom: 18 }}>MY WORK</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                    {FRAMES.map((src) => (
                      <img key={src} decoding="async" src={src} alt="" style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 6 }} />
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ position: "absolute", left: 1420, top: 560, width: 620 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 8 }}>Testimonial block — r30</div>
                <div style={{ height: 330, borderRadius: 30, background: "#1C1B1B", padding: 34, boxShadow: "0 12px 40px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
                  <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontWeight: 600, fontSize: 20, color: "#fff" }}>CEO | Founder of rufescentlips</div>
                  <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>
                    &ldquo;Friend, you&rsquo;re the absolute best at this. You see past the surface and it shows in
                    every project you deliver.&rdquo;
                  </div>
                </div>
              </div>

              <div style={{ position: "absolute", left: 60, top: 960, width: 1600, padding: 28, border: "1px dashed #5F14E066", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>
                  Palette + type — the actual page
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#FFFFFF", "#0E0E0E", "#1C1B1B", "#D9D9D9", "#5F14E0"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Montserrat
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      Medium 128 · Bold 52 · Blinker 24 (once)
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1740, top: 960, width: 540, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>
                  Scratch — do not ship
                </div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                  Blog page built, never launched
                  <br />→ $49.99 consultation was the whole strategy
                  <br />→ &quot;Designed by unico studios&quot; stays in the footer
                </div>
              </div>
            </FileBoard>
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="dupree-armon" />
      <SiteFooter />
    </div>
  );
}
