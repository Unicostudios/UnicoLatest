"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const HERO = "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1400,q_auto,f_auto/v1744119305/gohar_uttjee.jpg";

const GALLERY = [
  { src: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_900,q_auto,f_auto/v1744145310/goharbranding1_esee2x.jpg", alt: "Gohar packaging box" },
  { src: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_900,q_auto,f_auto/v1744145310/goharbranding2_fk4zra.jpg", alt: "Gohar poster" },
  { src: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_900,q_auto,f_auto/v1744145310/goharbranding3_xefjrt.jpg", alt: "Gohar jewellery set" },
  { src: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_900,q_auto,f_auto/v1744145307/goharbranding4_lymvne.jpg", alt: "Gohar open jewellery box" },
  { src: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_900,q_auto,f_auto/v1744145308/goharbranding5_lcbyk5.jpg", alt: "Gohar bag" },
  { src: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_900,q_auto,f_auto/v1744145311/goharbranding6_bjpjja.jpg", alt: "Gohar stationery" },
];

const COLORS = [
  { name: "GOLD LEAF", hex: "oklch(0.72 0.13 85)", fg: "oklch(0.12 0.012 280)" },
  { name: "DEEP ESPRESSO", hex: "oklch(0.16 0.02 30)", fg: "oklch(0.98 0.004 280)" },
  { name: "IVORY", hex: "oklch(0.95 0.012 85)", fg: "oklch(0.12 0.012 280)" },
  { name: "ROSE CLAY", hex: "oklch(0.58 0.04 25)", fg: "oklch(0.12 0.012 280)" },
];

const RESULTS = [
  ["Premium", "positioning, away from trend-led competitors"],
  ["1", "coherent system across identity, web and social"],
  ["5wk", "from first interview to launch"],
];

export default function Gohar() {
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
            Case study 004 · Gohar · India · 2025
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
            Fine jewellery,
            <br />
            finally <span style={{ color: "var(--ac)" }}>worth its weight.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              Some brands sell jewellery. Gohar crafts stories in stone. Rooted in elegance and refined
              craftsmanship, it is where timeless design meets modern allure — so we built an identity that mirrors
              that essence. No excess, no distractions: a refined, expressive system where the pieces take centre
              stage.
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
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Identity · Website · Art direction</div>
                Scope
              </div>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>5 weeks, 2 designers</div>
                Team
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(48px, 8vh, 96px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ borderRadius: 24, overflow: "hidden" }}>
            <img decoding="async" src={HERO} alt="Gohar" style={{ display: "block", width: "100%", aspectRatio: "16/10", objectFit: "cover" }} />
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
              Beautiful pieces photographed like inventory. Nothing on the shelf or the screen told a buyer why this
              was the jeweller to trust with a milestone purchase.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The move
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Build a visual language rather than a logo: quiet, generous, precise. Every surface — box, bag,
              poster, stationery — set up so the heritage comes alive and the piece is the only loud thing in the
              frame.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The work
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {GALLERY.map((g) => (
              <img
                key={g.src}
                decoding="async"
                src={g.src}
                alt={g.alt}
                style={{ minWidth: 0, width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 20 }}
              />
            ))}
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
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 12,
                  fontFamily: "var(--font-plexmono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                }}
              >
                {c.name}
              </div>
            ))}
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
              Product photography given room to breathe, type set tight and small, and a colour palette borrowed
              from the metal itself — so the site feels like the jewellery rather than describing it.
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
            &ldquo;We finally look like the brand we always were.&rdquo;
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
            FOUNDER · GOHAR
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
            <FileBoard label="GOHAR.FIG">
              <BoardTile label="Hero — brand film still" src={HERO} style={{ left: 60, top: 90, width: 620 }} imgStyle={{ height: 400 }} />
              <BoardTile label="Packaging — box" src={GALLERY[0].src} style={{ left: 740, top: 90, width: 420 }} imgStyle={{ height: 280 }} />
              <BoardTile label="Poster" src={GALLERY[1].src} style={{ left: 1220, top: 90, width: 420 }} imgStyle={{ height: 280 }} />
              <BoardTile label="Jewellery set" src={GALLERY[2].src} style={{ left: 740, top: 420, width: 420 }} imgStyle={{ height: 280 }} />
              <BoardTile label="Open box" src={GALLERY[3].src} style={{ left: 1220, top: 420, width: 420 }} imgStyle={{ height: 280 }} />
              <BoardTile label="Bag" src={GALLERY[4].src} style={{ left: 60, top: 560, width: 400 }} imgStyle={{ height: 280 }} />
              <BoardTile label="Stationery" src={GALLERY[5].src} style={{ left: 1700, top: 90, width: 460 }} imgStyle={{ height: 300 }} />
              <div style={{ position: "absolute", left: 60, top: 960, width: 1600, padding: 28, border: "1px dashed #C6A24A66", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>
                  Palette + type — the actual page
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#C6A24A", "#241512", "#F3EBDD", "#8C6A5E", "#FFFFFF"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Serif display
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      Timeless design meets modern allure
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1740, top: 960, width: 540, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>
                  Scratch — do not ship
                </div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                  Six applications, one language
                  <br />→ &quot;no excess, no distractions&quot; was the whole brief
                  <br />→ the piece is the only loud thing in frame
                </div>
              </div>
            </FileBoard>
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="gohar" />
      <SiteFooter />
    </div>
  );
}
