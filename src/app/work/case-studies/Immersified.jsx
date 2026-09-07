"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const COLORS = [
  { name: "CORE BLUE", hex: "#1447E6", fg: "#fff" },
  { name: "DEEP BLUE", hex: "#0D31A1", fg: "#fff" },
  { name: "ROOM BLACK", hex: "#131313", fg: "#fff" },
  { name: "RIG GREY", hex: "#CFCFCF", fg: "#131313" },
  { name: "WHITE", hex: "#FFFFFF", fg: "#131313", border: true },
];

const NAMED_SERVICES = [
  "AVL Solutions",
  "Scenic & Fabrication",
  "Filming & Editing",
  "Immersive design & tech",
  "Consultancy & Special Projects",
];

export default function Immersified() {
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
            Case study 002 · Immersified · Dubai &amp; Riyadh · 2026
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
            25 years of work,
            <br />
            finally <span style={{ color: "var(--ac)" }}>legible.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              Immersified Consultancy brings over 25 years of global experience in event production and project
              management — live events, permanent installations, workshops in Dubai and Riyadh. Enormous capability,
              invisible brand. We rebuilt the identity and the website so the work finally argues for itself.
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
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Identity · Website · Motion · Print</div>
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
            href="https://immersified-me.com"
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
                immersified-me.com
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
            <div style={{ background: "#131313" }}>
              <img
                decoding="async"
                src="/assets/opt/im-hero.jpg"
                alt="Immersified homepage hero"
                style={{ display: "block", width: "100%", aspectRatio: "1440/548", objectFit: "cover" }}
              />
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
            Click the mockup to open immersified-me.com in a new tab
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
              Two decades of spectacular projects, described in a deck nobody finished reading. Procurement teams
              couldn&apos;t tell them apart from an equipment rental company.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The move
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Position them as the consultancy that owns the whole experience — concept to completion — then prove it
              with a site that behaves like one of their installations: dark room, one statement at a time, motion
              doing the talking.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The identity
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {COLORS.map((c) => (
              <div
                key={c.name}
                style={{
                  minWidth: 0,
                  height: 108,
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
                Typeface
              </div>
              <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 10 }}>
                Montserrat
              </div>
              <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Bold 40 for statements, SemiBold 40 for section heads, Medium 24 for eyebrows, Regular 18 for body.
                One family, four jobs — nothing else needed.
              </div>
            </div>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                Positioning line
              </div>
              <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: "clamp(22px, 2.6vw, 34px)", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 12 }}>
                &ldquo;Innovate. Create. Inspire.&rdquo;
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Three words that survive a banner, a badge and a bid document — with &ldquo;Where Vision Meets
                Seamless Execution&rdquo; carrying the longer promise on the homepage.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(20px, 4vh, 40px) clamp(18px, 4vw, 54px) clamp(40px, 7vh, 88px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The five services, named
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 }}>
            {NAMED_SERVICES.map((s, i) => (
              <div key={s} style={{ minWidth: 0, padding: 22, borderRadius: 18, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, color: "var(--ac)", marginBottom: 22 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>{s}</div>
              </div>
            ))}
          </Reveal>
          <Reveal
            as="p"
            style={{ margin: "20px 0 0", maxWidth: 760, fontSize: 15.5, lineHeight: 1.62, color: "oklch(0.44 0.01 285)" }}
          >
            Naming the five capabilities was half the job. Before, everything lived under &ldquo;event
            services&rdquo; — now a buyer arriving for AR, holograms, 3D mapping or drone work lands on a page that
            says exactly that.
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(20px, 4vh, 40px) clamp(18px, 4vw, 54px) clamp(40px, 7vh, 88px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The website
          </Reveal>
          <Reveal style={{ borderRadius: 24, overflow: "hidden", background: "#131313", position: "relative" }}>
            <img
              decoding="async"
              src="/assets/opt/im-band.jpg"
              alt="Immersified section band"
              style={{ display: "block", width: "100%", aspectRatio: "1240/468", objectFit: "cover", opacity: 0.55 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: 20,
                textAlign: "center",
                fontFamily: "var(--font-g-montserrat), sans-serif",
                color: "#fff",
              }}
            >
              <span style={{ fontSize: "clamp(11px, 1.5vw, 22px)", fontWeight: 500 }}>Innovate. Create. Inspire</span>
              <span style={{ fontSize: "clamp(16px, 2.9vw, 40px)", fontWeight: 700, lineHeight: 1.05 }}>
                Where Vision Meets Seamless Execution
              </span>
            </div>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginTop: 16, alignItems: "start" }}>
            <figure style={{ margin: 0, minWidth: 0 }}>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", background: "#131313" }}>
                <img
                  decoding="async"
                  src="/assets/opt/im-gallery.jpg"
                  alt="Immersified closing band"
                  style={{ display: "block", width: "100%", aspectRatio: "1440/557", objectFit: "cover", opacity: 0.6 }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: 16,
                    textAlign: "center",
                    fontFamily: "var(--font-g-montserrat), sans-serif",
                    color: "#fff",
                    height: "100%",
                  }}
                >
                  <span style={{ fontSize: "clamp(14px, 2.4vw, 32px)", fontWeight: 600, lineHeight: 1.05 }}>Ready to Make an Impact?</span>
                  <span style={{ fontSize: "clamp(10px, 1.4vw, 19px)", fontWeight: 500 }}>Let&apos;s collaborate and turn your ideas into reality</span>
                  <span style={{ display: "inline-flex", marginTop: 8, padding: "clamp(5px, 0.8vw, 10px) clamp(14px, 2.2vw, 30px)", borderRadius: 10, background: "#1447E6", fontSize: "clamp(10px, 1.1vw, 15px)", fontWeight: 500 }}>
                    Contact Us
                  </span>
                </div>
              </div>
            </figure>
            <div style={{ minWidth: 0, display: "grid", gap: 12 }}>
              {[
                ["3.4×", "longer average session vs. the old site"],
                ["5", "named capabilities, each with its own page"],
                ["6wk", "from first interview to launch day"],
              ].map(([num, label]) => (
                <div key={label} style={{ padding: 22, borderRadius: 18, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
                  <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em" }}>{num}</div>
                  <div style={{ fontSize: 14.5, color: "oklch(0.46 0.01 285)" }}>{label}</div>
                </div>
              ))}
            </div>
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
            &ldquo;The five service pages did more for us than any pitch deck. Buyers arrive already knowing what
            they want — so the first call starts at <span style={{ color: "var(--ac)" }}>scope</span>, not
            introductions.&rdquo;
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
            MANAGING DIRECTOR · IMMERSIFIED CONSULTANCY
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
            <FileBoard label="IMMERSIFIED.FIG">
              <BoardTile label="Homepage — hero" src="/assets/opt/im-hero.jpg" style={{ left: 60, top: 90, width: 620 }} imgStyle={{ height: 400 }} />
              <BoardTile label="Section band" src="/assets/opt/im-band.jpg" style={{ left: 740, top: 90, width: 520 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Closing band" src="/assets/opt/im-gallery.jpg" style={{ left: 740, top: 440, width: 520 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Identity — card" src="/assets/opt/immersified-card.jpg" style={{ left: 1320, top: 90, width: 440 }} imgStyle={{ height: 300 }} />
              <BoardTile label="About page" src="/assets/opt/immersified-about.jpg" style={{ left: 1320, top: 440, width: 440 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Colour study" src="/assets/opt/immersified-teal.jpg" style={{ left: 60, top: 560, width: 620 }} imgStyle={{ height: 340 }} />
              <div style={{ position: "absolute", left: 60, top: 960, width: 1600, padding: 28, border: "1px dashed #1447E666", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>
                  Palette + type — the actual page
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#1447E6", "#0D31A1", "#131313", "#CFCFCF", "#FFFFFF"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Montserrat
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      Bold 40 · SemiBold 40 · Medium 24 · Regular 18
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1740, top: 960, width: 540, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>
                  Scratch — do not ship
                </div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                  16 logo glyphs, no single export
                  <br />→ five capabilities renamed three times
                  <br />→ &quot;event services&quot; survived until v4
                </div>
              </div>
            </FileBoard>
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="immersified" />
      <SiteFooter />
    </div>
  );
}
