"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const COLORS = [
  { name: "SAGE", hex: "#6D8E4C", fg: "#fff" },
  { name: "FOREST", hex: "#182420", fg: "#fff" },
  { name: "BRASS", hex: "#C6A666", fg: "#111" },
  { name: "LINEN", hex: "#FFF9EE", fg: "#111", border: true },
  { name: "INK", hex: "#111111", fg: "#fff" },
];

const SERVICES = [
  { title: "Modular Aluminium Kitchens", body: "Elegant, durable and built to last a lifetime", src: "/assets/opt/g2-svc-1.jpg" },
  { title: "Aluminium Wardrobes", body: "Custom designed aluminium wardrobes that blend style and utility", src: "/assets/opt/g2-svc-2.jpg" },
  { title: "Office Partitions", body: "Sleek, professional aluminium partitions and workstations", src: "/assets/opt/g2-svc-3.jpg" },
];

export default function G2Interiors() {
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
            Case study 003 · G2 Interiors · India · 2026
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
            Transform spaces,
            <br />
            <span style={{ color: "var(--ac)" }}>inspire lives.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              G2 Interiors design premium aluminium interiors — modular kitchens, wardrobes, office partitions.
              Aluminium reads as industrial to most buyers, so the whole job was making strength, style and
              sustainability feel like the same decision. Identity, art direction and the website the projects live on.
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
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Identity · Website</div>
                Scope
              </div>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Identity + website, in-house</div>
                Team
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(48px, 8vh, 96px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <a
            href="https://g2interior.com/"
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
                g2interior.com
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
            <div style={{ background: "#fff" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "clamp(8px, 1.4vw, 18px) clamp(12px, 2.4vw, 42px)",
                  background: "#FFF9EE",
                }}
              >
                <img
                  decoding="async"
                  src="/assets/opt/g2-logo.png"
                  alt="G2 Interiors"
                  style={{ height: "clamp(14px, 2vw, 30px)", width: "auto", objectFit: "contain" }}
                />
                <div style={{ display: "flex", gap: "clamp(8px, 1.6vw, 28px)", fontFamily: "Archivo, sans-serif", fontSize: "clamp(7px, 0.85vw, 12px)", color: "#111" }}>
                  <span>Home</span>
                  <span>Services</span>
                  <span>Projects</span>
                  <span>About Us</span>
                  <span>Contact</span>
                </div>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "clamp(5px, 0.7vw, 11px) clamp(9px, 1.2vw, 18px)",
                    borderRadius: 6,
                    background: "#6D8E4C",
                    color: "#fff",
                    fontFamily: "Archivo, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(7px, 0.85vw, 12px)",
                  }}
                >
                  Contact us →
                </span>
              </div>
              <div style={{ padding: "clamp(16px, 3vw, 52px) clamp(12px, 2.4vw, 42px) clamp(12px, 2vw, 34px)" }}>
                <div style={{ fontFamily: "Archivo, sans-serif", fontSize: "clamp(20px, 4.4vw, 68px)", lineHeight: 0.96, letterSpacing: "-0.055em", color: "#000" }}>
                  Transform Spaces
                  <br />
                  Inspire Lives
                </div>
                <p
                  style={{
                    maxWidth: 620,
                    margin: "clamp(8px, 1.4vw, 20px) 0 0",
                    fontFamily: "Archivo, sans-serif",
                    fontSize: "clamp(7.5px, 0.95vw, 14px)",
                    lineHeight: 1.4,
                    color: "#000",
                    textAlign: "justify",
                  }}
                >
                  Welcome to G2 Interiors, where innovation meets elegance. We design premium aluminium interiors
                  that blend strength, style, and sustainability. Unlike traditional wood, our aluminium solutions
                  are modern, durable, and eco-friendly — perfect for homes, offices, and commercial spaces.
                </p>
                <div style={{ display: "flex", gap: "clamp(6px, 1vw, 14px)", marginTop: "clamp(10px, 1.6vw, 22px)" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "clamp(6px, 0.9vw, 14px) clamp(12px, 1.8vw, 28px)",
                      borderRadius: 56,
                      background: "#6D8E4C",
                      color: "#fff",
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(7px, 0.85vw, 12px)",
                    }}
                  >
                    Book a Consultation
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "clamp(6px, 0.9vw, 14px) clamp(12px, 1.8vw, 28px)",
                      borderRadius: 56,
                      border: "1px solid #6D8E4C",
                      color: "#6D8E4C",
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(7px, 0.85vw, 12px)",
                    }}
                  >
                    View Services
                  </span>
                </div>
              </div>
              <div style={{ padding: "0 clamp(12px, 2.4vw, 42px) clamp(14px, 2.4vw, 40px)" }}>
                <img
                  decoding="async"
                  src="/assets/opt/g2-hero.jpg"
                  alt="G2 Interiors hero"
                  style={{ display: "block", width: "100%", aspectRatio: "1238/480", objectFit: "cover", borderRadius: "clamp(12px, 2.6vw, 50px)" }}
                />
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
            Click the mockup to open g2interior.com in a new tab
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
              Strong project work with no consistent way to present it — every proposal and every listing looked
              like it came from a different practice.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The move
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              One system for the whole practice: an identity that holds up against the photography rather than
              competing with it, and a site built around the projects instead of the services list.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The work
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
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
                Typeface
              </div>
              <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 500, fontSize: "clamp(30px, 4vw, 54px)", lineHeight: 1, letterSpacing: "-0.05em", marginBottom: 10 }}>
                Archivo
              </div>
              <div style={{ fontFamily: "Archivo, sans-serif", fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                93px at −5.28 tracking for the headline, Italic 46 for section titles, Regular 20 body, Medium 16
                on buttons. Urbanist carries the numerals.
              </div>
            </div>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                The 50px radius
              </div>
              <div style={{ height: 74, borderRadius: 50, background: "#182420", marginBottom: 12 }} />
              <div style={{ fontFamily: "Archivo, sans-serif", fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Every photo panel, CTA block and pill shares one 50px corner. It is the whole visual signature —
                aluminium softened, not styled.
              </div>
            </div>
          </Reveal>
          <Reveal style={{ marginTop: 16, borderRadius: 24, background: "#182420", padding: "clamp(24px, 4vw, 56px)" }}>
            <div style={{ fontFamily: "Archivo, sans-serif", fontStyle: "italic", fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.2, letterSpacing: "-0.05em", color: "#fff", textTransform: "capitalize" }}>
              Our Services
            </div>
            <p style={{ margin: "10px 0 clamp(22px, 3vw, 38px)", maxWidth: 589, fontFamily: "Archivo, sans-serif", fontSize: 17, lineHeight: 1.35, color: "#fff", opacity: 0.85 }}>
              With our expertise and tailored solutions, we&rsquo;re here to support you in achieving your goals and
              taking your vision to the next level.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(16px, 2.4vw, 30px)" }}>
              {SERVICES.map((s) => (
                <div key={s.title} style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  <img
                    decoding="async"
                    src={s.src}
                    alt={s.title}
                    style={{ display: "block", width: "100%", aspectRatio: "407/388", objectFit: "cover", borderRadius: 20 }}
                  />
                  <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 600, fontSize: 19, letterSpacing: "-0.01em", color: "#fff" }}>{s.title}</div>
                  <div style={{ fontFamily: "Archivo, sans-serif", fontWeight: 300, fontSize: 15, lineHeight: 1.4, color: "#fff", opacity: 0.85 }}>{s.body}</div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 19px",
                      borderRadius: 40,
                      border: "1px solid #fff",
                      fontFamily: "Archivo, sans-serif",
                      fontWeight: 300,
                      fontSize: 15,
                      color: "#fff",
                    }}
                  >
                    View Service ↗
                  </span>
                </div>
              ))}
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
              Interior photography given the room it needs, quiet typography, and project pages that let the
              spaces do the talking — closing on &ldquo;Let&rsquo;s create something beautiful together&rdquo;.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }} delay={0.08}>
            <img decoding="async" src="/assets/opt/g2-work.jpg" alt="G2 Interiors recent work" style={{ display: "block", width: "100%", height: 300, objectFit: "cover", borderRadius: 20 }} />
            <img decoding="async" src="/assets/opt/g2-extra.jpg" alt="G2 Interiors detail" style={{ display: "block", width: "100%", height: 300, objectFit: "cover", borderRadius: 20 }} />
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
            <FileBoard label="G2-INTERIOR.FIG">
              <BoardTile label="Homepage — hero" src="/assets/opt/g2-hero.jpg" style={{ left: 60, top: 90, width: 620 }} imgStyle={{ height: 400 }} />
              <BoardTile label="Kitchens" src="/assets/opt/g2-svc-1.jpg" style={{ left: 740, top: 90, width: 400 }} imgStyle={{ height: 250 }} />
              <BoardTile label="Wardrobes" src="/assets/opt/g2-svc-2.jpg" style={{ left: 740, top: 390, width: 400 }} imgStyle={{ height: 250 }} />
              <BoardTile label="Partitions" src="/assets/opt/g2-svc-3.jpg" style={{ left: 1200, top: 90, width: 460 }} imgStyle={{ height: 280 }} />
              <BoardTile label="Recent work" src="/assets/opt/g2-work.jpg" style={{ left: 1200, top: 420, width: 460 }} imgStyle={{ height: 320 }} />
              <BoardTile label="Detail" src="/assets/opt/g2-extra.jpg" style={{ left: 60, top: 560, width: 620 }} imgStyle={{ height: 340 }} />
              <div style={{ position: "absolute", left: 60, top: 960, width: 1600, padding: 28, border: "1px dashed #6D8E4C66", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>
                  Palette + type — the actual page
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#6D8E4C", "#182420", "#C6A666", "#FFF9EE", "#111111"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Archivo
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      93px at −5.28 tracking · Italic 46 · Urbanist
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1740, top: 960, width: 540, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>
                  Scratch — do not ship
                </div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                  5,538 nodes across 3 pages
                  <br />→ 2nd iteration folder, never deleted
                  <br />→ the 50px radius survived every round
                </div>
              </div>
            </FileBoard>
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="g2-interiors" />
      <SiteFooter />
    </div>
  );
}
