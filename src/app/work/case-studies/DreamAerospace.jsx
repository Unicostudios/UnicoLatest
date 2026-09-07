"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import VideoButton from "../../components/site/VideoButton";
import FileBoard, { BoardTile } from "../../components/site/FileBoard";
import NextCaseStudy from "./NextCaseStudy";

const PRODUCTS = [
  { n: "01", name: "ATOM", img: "/assets/opt/da-atom.jpg", desc: "HAN-based green monopropellant thruster engineered for precise spacecraft maneuvering." },
  { n: "02", name: "MOLECULE", img: "/assets/opt/da-molecule.jpg", desc: "Next-gen propulsion solution for in-space manoeuvring and re-entry missions." },
  { n: "03", name: "CUBEHOOD", img: "/assets/opt/da-cubehood.jpg", desc: "A compact 2U propulsion system integrating an ATOM thruster for simplified integration." },
];

const COLORS = [
  { name: "MISSION BLUE", hex: "#26549B", fg: "#fff" },
  { name: "DEEP NAVY", hex: "#112645", fg: "#fff" },
  { name: "ION BLUE", hex: "#9EC9FF", fg: "#0b0b0b" },
  { name: "PLUME", hex: "#FF6A51", fg: "#0b0b0b" },
  { name: "SHELL", hex: "#EEEEEE", fg: "#0b0b0b", border: true },
];

export default function DreamAerospace() {
  return (
    <div className="u2026">
      <SiteHeader variant="case-study" />

      <section style={{ padding: "clamp(52px, 9vh, 104px) clamp(18px, 4vw, 54px) clamp(30px, 5vh, 56px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <p style={{ margin: "0 0 22px", fontFamily: "var(--font-plexmono), monospace", fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
            Case study 001 · Dream Aerospace · Chennai &amp; IIT Kanpur · 2026
          </p>
          <h1 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 800, fontSize: "clamp(38px, 7.4vw, 112px)", lineHeight: 0.9, letterSpacing: "-0.045em" }}>
            Rocket science,
            <br />
            made <span style={{ color: "var(--ac)" }}>legible.</span>
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px, 4vw, 56px)", marginTop: "clamp(28px, 5vh, 50px)" }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              Dream Aerospace builds indigenous green propulsion for spacecraft — thrusters, propellant chemistry,
              in-orbit refuelling. Their buyers are satellite engineers who need specifications, not adjectives. We
              built a site that leads with the physics and still reads as a company you&apos;d trust with a launch.
            </p>
            <div style={{ display: "grid", gap: 14, fontFamily: "var(--font-plexmono), monospace", fontSize: 11.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Website · Product pages · Design system</div>
                Scope
              </div>
              <div>
                <div style={{ color: "var(--ink)", fontSize: 13, letterSpacing: "0.04em" }}>Low-fi to hi-fi, 9 page templates</div>
                Team
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(48px, 8vh, 96px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <a
            href="https://dreamaerospace.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", borderRadius: 16, overflow: "hidden", background: "oklch(0.9 0.004 285)", boxShadow: "0 30px 70px oklch(0.22 0.012 285 / 0.16)", transition: "transform 0.4s cubic-bezier(0.2,0,0.2,1), box-shadow 0.4s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 40px 90px oklch(0.22 0.012 285 / 0.24)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 30px 70px oklch(0.22 0.012 285 / 0.16)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "oklch(0.94 0.003 285)", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.75 0.16 25)" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.83 0.14 85)" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "oklch(0.78 0.15 145)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0, marginLeft: 8, padding: "5px 12px", borderRadius: 6, background: "oklch(0.98 0.002 285)", fontFamily: "var(--font-plexmono), monospace", fontSize: 11, color: "oklch(0.5 0.01 285)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                dreamaerospace.in
              </div>
              <div style={{ flex: "0 0 auto", padding: "5px 11px", borderRadius: 999, background: "var(--ac)", color: "#fff", fontFamily: "var(--font-plexmono), monospace", fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Visit live site ↗
              </div>
            </div>
            <div style={{ position: "relative", background: "#000", aspectRatio: "1440/720", overflow: "hidden" }}>
              <img decoding="async" src="/assets/opt/da-hero.jpg" alt="Dream Aerospace homepage" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "clamp(8px, 1.4vw, 20px) clamp(8px, 1.3vw, 18px)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "clamp(6px, 0.9vw, 12px) clamp(10px, 1.4vw, 20px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <img decoding="async" src="/assets/opt/da-logo.png" alt="Dream Aerospace" style={{ height: "clamp(9px, 1.3vw, 19px)", width: "auto", objectFit: "contain" }} />
                  <div style={{ display: "flex", gap: "clamp(8px, 1.5vw, 24px)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(6px, 0.75vw, 11px)", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
                    <span>About</span>
                    <span>Products</span>
                    <span>Newsroom</span>
                  </div>
                  <span style={{ padding: "clamp(3px, 0.45vw, 7px) clamp(8px, 1.1vw, 15px)", border: "1px solid rgba(255,255,255,0.4)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(6px, 0.7vw, 10px)", letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
                    Get in touch
                  </span>
                </div>
                <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "0 clamp(12px, 3vw, 48px)" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(14px, 3.1vw, 46px)", lineHeight: 1, letterSpacing: "-0.01em", textTransform: "uppercase", color: "#fff" }}>
                      Enabling mobility
                      <br />
                      beyond Earth
                    </div>
                    <p style={{ margin: "clamp(8px, 1.4vw, 20px) auto 0", maxWidth: 620, fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "clamp(7px, 0.95vw, 14px)", lineHeight: 1.5, color: "rgba(255,255,255,0.8)" }}>
                      Accelerating cleaner, safer, and more efficient InSpace operations through indigenous green
                      propulsion technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
          <div style={{ marginTop: 12, fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.52 0.01 285)" }}>
            Click the mockup to open dreamaerospace.in in a new tab
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(44px, 8vh, 92px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(24px, 4vw, 56px)" }}>
          <Reveal style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>The problem</div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Deep-tech companies default to one of two failures: a wall of specifications nobody can navigate, or a
              glossy space-startup site with no numbers in it. Dream Aerospace had real technology and no way to show
              it.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0 }} delay={0.08}>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ac)", marginBottom: 14 }}>The move</div>
            <p style={{ margin: 0, fontSize: "clamp(17px, 1.8vw, 22px)", lineHeight: 1.5, color: "oklch(0.26 0.012 285)" }}>
              Structure the whole site around the questions a satellite engineer actually asks — what does this
              company do, how do you validate it, why you over the incumbent, what&apos;s my next step — and give
              every product its own page with a real spec table.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 7vh, 88px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            Four products, one platform
          </Reveal>
          <Reveal style={{ borderRadius: 24, background: "#112645", padding: "clamp(22px, 3.4vw, 48px)" }}>
            <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9EC9FF", marginBottom: 10 }}>
              Our products
            </div>
            <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 38px)", lineHeight: 1.1, color: "#fff", marginBottom: "clamp(20px, 3vw, 34px)" }}>
              Where propulsion meets possibilities
            </div>
            <div style={{ display: "grid" }}>
              {PRODUCTS.map((p) => (
                <div key={p.n} style={{ display: "grid", gridTemplateColumns: "132px minmax(0, 1fr)", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "center", padding: "clamp(16px, 2vw, 24px) 0", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
                  <img decoding="async" src={p.img} alt={p.name} style={{ width: 132, height: 108, objectFit: "cover", borderRadius: 10 }} />
                  <div style={{ minWidth: 0, display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "6px 20px" }}>
                    <div style={{ flex: "0 0 auto", display: "flex", alignItems: "baseline", gap: 14, minWidth: 190 }}>
                      <span style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, color: "#9EC9FF" }}>{p.n}</span>
                      <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(19px, 2.2vw, 28px)", letterSpacing: "0.04em", color: "#fff" }}>{p.name}</span>
                    </div>
                    <div style={{ flex: "1 1 240px", minWidth: 0, fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 14.5, lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>{p.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "132px minmax(0, 1fr)", gap: "clamp(16px, 2.4vw, 30px)", alignItems: "center", padding: "clamp(16px, 2vw, 24px) 0", borderBottom: "1px solid transparent" }}>
                <VideoButton src="/assets/prism-docking.mp4" width={132} aspectRatio="132/108" borderRadius={10} />
                <div style={{ minWidth: 0, display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "6px 20px" }}>
                  <div style={{ flex: "0 0 auto", display: "flex", alignItems: "baseline", gap: 14, minWidth: 190 }}>
                    <span style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, color: "#9EC9FF" }}>04</span>
                    <span style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(19px, 2.2vw, 28px)", letterSpacing: "0.04em", color: "#fff" }}>PRISM</span>
                  </div>
                  <div style={{ flex: "1 1 240px", minWidth: 0, fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 14.5, lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
                    Autonomous in-space refueling system that extends spacecraft life beyond the initial mission.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: "clamp(20px, 4vh, 40px) clamp(18px, 4vw, 54px) clamp(40px, 7vh, 88px)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <Reveal
            style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: "clamp(16px, 2.4vw, 26px)" }}
          >
            <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Inside the file
            </h2>
            <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
              Drag to pan · scroll to zoom
            </div>
          </Reveal>
          <Reveal>
            <FileBoard label="DREAM-AEROSPACE.FIG">
              <BoardTile label="Homepage — hi-fi" src="/assets/opt/da-hero.jpg" style={{ left: 60, top: 90, width: 620 }} imgStyle={{ height: 400 }} />
              <BoardTile label="ATOM — product page" src="/assets/opt/da-atom.jpg" style={{ left: 740, top: 90, width: 400 }} imgStyle={{ height: 250 }} />
              <BoardTile label="MOLECULE — 200N" src="/assets/opt/da-molecule.jpg" style={{ left: 740, top: 400, width: 400 }} imgStyle={{ height: 250 }} />
              <BoardTile label="CUBEHOOD — 2U system" src="/assets/opt/da-cubehood.jpg" style={{ left: 1200, top: 90, width: 460 }} imgStyle={{ height: 280 }} />
              <BoardTile label="Product index" src="/assets/opt/da-product.jpg" style={{ left: 1200, top: 430, width: 460 }} imgStyle={{ height: 300 }} />
              <BoardTile label="Section band — in-orbit" src="/assets/opt/da-band.jpg" style={{ left: 60, top: 560, width: 620 }} imgStyle={{ height: 300 }} />
              <div style={{ position: "absolute", left: 740, top: 710, width: 400 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 8 }}>PRISM — docking test</div>
                <video
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/assets/opt/da-band.jpg"
                  style={{ display: "block", width: "100%", height: 250, objectFit: "cover", borderRadius: 3, boxShadow: "0 12px 40px rgba(0,0,0,0.5)", background: "#0b1526" }}
                />
              </div>
              <div style={{ position: "absolute", left: 1200, top: 770, width: 460 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 8 }}>Logo — primary white</div>
                <div style={{ display: "grid", placeItems: "center", height: 190, borderRadius: 3, background: "#112645", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}>
                  <img decoding="async" src="/assets/opt/da-logo.png" alt="" style={{ width: "60%", objectFit: "contain" }} />
                </div>
              </div>
              <div style={{ position: "absolute", left: 1720, top: 430, width: 560, padding: 24, border: "1px dashed rgba(158,201,255,0.35)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 14 }}>Page templates — 9</div>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 15, lineHeight: 1.9, color: "rgba(255,255,255,0.6)" }}>
                  Homepage · Products · ATOM · MOLECULE
                  <br />
                  CUBEHOOD · PRISM · Propellant &amp; Catalyst
                  <br />
                  About · Careers · Newsroom · Contact
                </div>
              </div>
              <div style={{ position: "absolute", left: 60, top: 940, width: 1600, padding: 28, border: "1px dashed rgba(158,201,255,0.4)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "rgba(255,255,255,0.78)", marginBottom: 16 }}>Palette + type — the actual page</div>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {["#26549B", "#112645", "#9EC9FF", "#FF6A51", "#EEEEEE"].map((hex) => (
                    <div key={hex} style={{ width: 150, height: 90, borderRadius: 3, background: hex }} />
                  ))}
                  <div style={{ flex: 1, minWidth: 260, fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: 46, lineHeight: 1, color: "#fff", alignSelf: "center" }}>
                    Space Grotesk
                    <span style={{ display: "block", fontWeight: 400, fontSize: 18, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>
                      Geist · Google Sans Flex · Satoshi
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", left: 1720, top: 90, width: 560, padding: 28, border: "1px dashed rgba(255,106,81,0.5)", borderRadius: 4 }}>
                <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 13, color: "#FF6A51", marginBottom: 14 }}>Scratch — do not ship</div>
                <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry…
                  <br />
                  <br />→ replaced with real propellant copy in v3
                  <br />→ 44 button variants, 8 survived
                  <br />→ 108,473 nodes. Yes, really.
                </div>
              </div>
            </FileBoard>
          </Reveal>
          <Reveal as="p" style={{ margin: "14px 0 clamp(28px, 4vh, 48px)", fontSize: 15, lineHeight: 1.6, color: "oklch(0.46 0.01 285)", maxWidth: 640 }}>
            108,473 nodes, 44 button variants and a lot of lorem ipsum before the real copy landed. This is what the
            work actually looks like before it looks like anything.
          </Reveal>
          <Reveal as="h2" style={{ margin: "0 0 clamp(20px, 4vh, 36px)", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(26px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
            The system
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {COLORS.map((c) => (
              <div key={c.name} style={{ minWidth: 0, height: 96, borderRadius: 16, background: c.hex, color: c.fg, border: c.border ? "1px solid var(--line)" : undefined, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 12, fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.08em" }}>
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
              <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 10 }}>
                Space Grotesk
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Grotesk for the interface and data — its numerals hold up in a spec table. Geist Bold 56 uppercase
                for the hero, Google Sans Flex for long-form body.
              </div>
            </div>
            <div style={{ minWidth: 0, padding: 26, borderRadius: 20, background: "var(--paper-card)", border: "1px solid var(--line)" }}>
              <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)", marginBottom: 18 }}>
                Hairline, not filled
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                <span style={{ padding: "8px 18px", border: "1px solid oklch(0.22 0.012 285 / 0.4)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Contact sales
                </span>
                <span style={{ padding: "8px 18px", border: "1px solid oklch(0.22 0.012 285 / 0.4)", fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Request specification
                </span>
              </div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "oklch(0.44 0.01 285)" }}>
                Square hairline buttons and a 1px nav rule at 15% white — the chrome reads like instrumentation, so
                the hardware photography carries all the weight.
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
            <p style={{ margin: "0 0 14px", fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Nine page templates from one system — homepage, product index, four product pages, propellant and
              catalyst, about, careers, newsroom and contact. Every product page ends the same way: a spec table and
              one line, &ldquo;Send your mission parameters or your question, and the right team follows up
              directly.&rdquo;
            </p>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              The proprietary technology — RH521 propellant and the ARC26 bimetallic catalyst — got named pages of
              their own rather than being buried in a footnote. That is the moat, so it reads like one.
            </p>
          </Reveal>
          <Reveal style={{ minWidth: 0, display: "grid", gap: 12 }} delay={0.08}>
            {[
              ["9", "page templates, one component set"],
              ["48h", "engineering reply promise, stated on every form"],
              ["2022", "founded; incubated at IIT Kanpur from 2023"],
            ].map(([num, label]) => (
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
          <Reveal as="blockquote" style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(22px, 3.4vw, 42px)", fontWeight: 600, lineHeight: 1.18, letterSpacing: "-0.03em" }}>
            &ldquo;The site finally explains what we&apos;ve built. Engineers land on a product page and go straight
            to the <span style={{ color: "var(--ac)" }}>spec table</span> — that&apos;s exactly the conversation we
            want.&rdquo;
          </Reveal>
          <Reveal style={{ marginTop: 20, fontFamily: "var(--font-plexmono), monospace", fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
            Founding team · Dream Aerospace
          </Reveal>
        </div>
      </section>

      <NextCaseStudy slug="dream-aerospace" />
      <SiteFooter />
    </div>
  );
}
