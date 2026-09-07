"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const PRODUCTS = [
  { name: "Spring Rain", price: "$19.99", src: "/assets/opt/ak-pack.jpg" },
  { name: "Pure", price: "$19.99", src: "/assets/opt/ak-pack-2.jpg" },
  { name: "Comfort", price: "$19.99", src: "/assets/opt/ak-pack-3.jpg" },
];

const SHOTS = ["/assets/opt/ak-shot-1.jpg", "/assets/opt/ak-shot-2.jpg", "/assets/opt/ak-shot-3.jpg"];

const COLORS = [
  { name: "SAGE", hex: "#63735E", fg: "#fff" },
  { name: "WAX CREAM", hex: "#F1E6D3", fg: "#0b0b0b" },
  { name: "INK", hex: "#000000", fg: "#fff" },
  { name: "SMOKE", hex: "#929292", fg: "#0b0b0b" },
  { name: "WHITE", hex: "#FFFFFF", fg: "#0b0b0b", border: true },
];

const RESULTS = [
  ["6wk", "blank page to live storefront"],
  ["1", "team on brand and build, no handoff"],
  ["0", "templates used"],
];

/**
 * Note: Times New Roman is deliberately used as the serif display face
 * throughout this case study — the source design specifies it explicitly,
 * "on purpose" (see the Scratch note in the file board below). It is not a
 * fallback and should not be swapped for a webfont.
 */
export default function AashirKare() {
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
            Case study 007 · Aashir Kare · India · 2025
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
            Where self care
            <br />
            and connection <span style={{ color: "var(--ac)" }}>meets.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              Aashir Kare makes handcrafted candles — premium soy and coconut wax, infused with fragrance oils. A
              product ready to sell with no brand to sell it under. We built the identity and the storefront
              together, so the shop launched looking like a brand rather than a template with a logo dropped in.
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
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Identity · E-commerce · Content</div>
                Scope
              </div>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>6 weeks, 2 designers</div>
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
                Aashir Kare — home page
              </div>
            </div>
            <div style={{ position: "relative", background: "#000" }}>
              <img decoding="async" src="/assets/opt/ak-hero.jpg" alt="Aashir Kare homepage" style={{ display: "block", width: "100%", aspectRatio: "1440/839", objectFit: "cover" }} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(8px, 1.4vw, 20px)",
                  padding: "0 clamp(16px, 4vw, 70px)",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: "italic", fontSize: "clamp(17px, 3.3vw, 48px)", lineHeight: 1.01 }}>
                  Where self care and connection meets
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "clamp(64px, 11vw, 164px)",
                    padding: "clamp(5px, 0.6vw, 8px) clamp(14px, 2vw, 28px)",
                    borderRadius: 25,
                    border: "1px solid #fff",
                    boxShadow: "0 4px 4px rgba(0,0,0,0.25)",
                    fontFamily: "var(--font-g-montserrat), sans-serif",
                    fontSize: "clamp(8px, 1.1vw, 16px)",
                  }}
                >
                  Shop
                </span>
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
            Homepage — Times New Roman Italic 48, Montserrat 16, 25px pill
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
              A product ready to sell, no brand to sell it under — and candles are bought on feeling, so a generic
              storefront would have killed it.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>
              The move
            </div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Let the photography carry the whole brand. Serif italic for the one emotional line, hairline outlined
              buttons over the images, and one solid block of wax cream reserved for the single action that
              matters — Add To Cart.
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
            <div style={{ minWidth: 0, gridColumn: "1 / -1", borderRadius: 20, background: "#1a1a1a", padding: "clamp(20px, 3vw, 40px)" }}>
              <div style={{ fontFamily: "'Times New Roman', serif", fontSize: "clamp(22px, 3vw, 40px)", color: "#fff", marginBottom: "clamp(16px, 2.4vw, 28px)" }}>
                The collection
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "clamp(14px, 2vw, 24px)" }}>
                {PRODUCTS.map((p) => (
                  <div key={p.name} style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                    <img decoding="async" src={p.src} alt={`${p.name} candle`} style={{ display: "block", width: "100%", aspectRatio: "400/475", objectFit: "cover" }} />
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, fontFamily: "'Times New Roman', serif", fontSize: 20, color: "#fff" }}>
                      <span>{p.name}</span>
                      <span>{p.price}</span>
                    </div>
                    <div style={{ borderRadius: 7, background: "#F1E6D3", padding: 10, textAlign: "center", fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 16, color: "#000" }}>
                      Add To Cart
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ minWidth: 0, gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {SHOTS.map((src) => (
                <img key={src} decoding="async" src={src} alt="Aashir Kare candle" style={{ display: "block", width: "100%", height: 300, objectFit: "cover", borderRadius: 20 }} />
              ))}
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
                Typefaces
              </div>
              <div style={{ fontFamily: "'Times New Roman', serif", fontStyle: "italic", fontSize: "clamp(28px, 3.6vw, 46px)", lineHeight: 1.05, marginBottom: 6 }}>
                Times New Roman
              </div>
              <div style={{ fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 20, marginBottom: 12 }}>Montserrat 20</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Serif italic 48 for the one romantic line, Bold 96 for product names, Roman 40 for section heads.
                Montserrat 20 does every functional job — nav, prices, buttons.
              </div>
            </div>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                Outlined, never filled
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                <span style={{ padding: "8px 22px", borderRadius: 25, border: "1px solid #000", fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 14 }}>Shop</span>
                <span style={{ padding: "8px 22px", borderRadius: 30, border: "1px solid #000", fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 14 }}>Enter Email</span>
                <span style={{ padding: "8px 22px", borderRadius: 7, background: "#F1E6D3", color: "#000", fontFamily: "var(--font-g-montserrat), sans-serif", fontSize: 14 }}>Add To Cart</span>
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Hairline pills over photography everywhere — the only solid button on the site is Add To Cart, in
                wax cream at a 7px radius. The interface never competes with the candle.
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
              Product-first pages, honest photography and a checkout that gets out of the way — built to sell
              without a sales team standing next to it.
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
            &ldquo;Six weeks from a blank page to something our investors screenshotted.&rdquo;
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
            FOUNDER · AASHIR KARE
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
            <FileBoard label="AASHIR.FIG">
              <BoardTile label="Homepage" src="/assets/opt/ak-hero.jpg" style={{ left: 60, top: 90, width: 620 }} imgStyle={{ height: 400 }} />
              <BoardTile label="Spring Rain" src="/assets/opt/ak-pack.jpg" style={{ left: 740, top: 90, width: 340 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Pure" src="/assets/opt/ak-pack-2.jpg" style={{ left: 1120, top: 90, width: 340 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Comfort" src="/assets/opt/ak-pack-3.jpg" style={{ left: 1500, top: 90, width: 340 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Product shot" src="/assets/opt/ak-shot-1.jpg" style={{ left: 740, top: 440, width: 340 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Product shot" src="/assets/opt/ak-shot-2.jpg" style={{ left: 1120, top: 440, width: 340 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Product shot" src="/assets/opt/ak-shot-3.jpg" style={{ left: 1500, top: 440, width: 340 }} imgStyle={{ height: 300 }} />
              <div style={{ position: "absolute", left: 60, top: 960, width: 1600, padding: 28, border: "1px dashed #63735E66", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>
                  Palette + type — the actual page
                </div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#63735E", "#F1E6D3", "#000000", "#929292", "#FFFFFF"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Times New Roman
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      Italic 48 · Bold 96 · Montserrat 20
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1740, top: 960, width: 540, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>
                  Scratch — do not ship
                </div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)" }}>
                  Three product page variants, one shipped
                  <br />→ Times New Roman. Yes, on purpose.
                  <br />→ 387 nodes. Small file, whole brand.
                </div>
              </div>
            </FileBoard>
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="aashir-kare" />
      <SiteFooter />
    </div>
  );
}
