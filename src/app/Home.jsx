"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import SiteHeader from "./components/site/SiteHeader";
import SiteFooter from "./components/site/SiteFooter";
import Reveal from "./components/site/Reveal";
import Marquee from "./components/site/Marquee";
import VideoButton from "./components/site/VideoButton";

const SERVICES = [
  {
    n: "01",
    tag: "IDENTITY",
    title: "A name, a mark, a mouth",
    body: "Positioning, naming, wordmark, type, colour and a voice. Guidelines thin enough that people actually read them.",
    chips: ["Naming", "Logo systems", "Guidelines"],
  },
  {
    n: "02",
    tag: "WEBSITES",
    title: "Sites with a pulse",
    body: "Narrative, art direction, motion and build. Fast on a bad hotel wifi, editable without emailing us.",
    chips: ["Copy + story", "Motion", "Build"],
  },
  {
    n: "03",
    tag: "SAAS",
    title: "Product design with a spine",
    body: "Flows, dashboards, empty states, and a component library your engineers won't quietly rewrite.",
    chips: ["Flows", "UI system", "Handoff"],
  },
];

const WORK = [
  {
    href: "/work/immersified",
    img: "/assets/opt/im-hero.jpg",
    alt: "Immersified",
    name: "Immersified",
    tag: "Identity · Website · Motion",
    width: "min(78vw, 620px)",
    ratio: "4/3",
  },
  {
    href: "/work/aashir-kare",
    img: "/assets/opt/ak-hero.jpg",
    alt: "Aashir Kare",
    name: "Aashir Kare",
    tag: "Brand · Storefront",
    width: "min(62vw, 460px)",
    ratio: "3/4",
    alignEnd: true,
  },
  {
    href: "/work/travel-app",
    img: "/assets/opt/p786-sky.jpg",
    alt: "786P Travels",
    name: "786P Travels",
    tag: "SaaS · Mobile product",
    width: "min(70vw, 560px)",
    ratio: "4/3",
  },
  {
    href: "/work/dupree-armon",
    img: "/assets/opt/dupree.jpg",
    alt: "Dupree",
    name: "Dupree Armon",
    tag: "Media shoot · Portfolio site",
    width: "min(58vw, 420px)",
    ratio: "1/1",
    alignEnd: true,
  },
  {
    href: "/work/dream-aerospace",
    img: "/assets/opt/da-molecule.jpg",
    alt: "Dream Aerospace",
    name: "Dream Aerospace",
    tag: "Website · Design system",
    width: "min(66vw, 520px)",
    ratio: "4/3",
  },
];

const TICKER_CLIENTS = ["Immersified", "Haze UAE", "Aashir Kare", "Dupree Armon"];
const TICKER_KEYWORDS = ["Brand identity", "Websites", "SaaS platforms", "Design systems", "Motion"];

export default function Home() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  // Skip / show the loading curtain before paint, so a repeat visit within
  // the same session never flashes the intro.
  useLayoutEffect(() => {
    const loader = document.getElementById("u-load");
    if (!loader) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("unico-intro") === "1";
    } catch (e) {}
    if (seen) {
      loader.style.display = "none";
    } else {
      try {
        sessionStorage.setItem("unico-intro", "1");
      } catch (e) {}
      const t = setTimeout(() => {
        loader.style.display = "none";
      }, 2700);
      return () => clearTimeout(t);
    }
  }, []);

  // Cursor-following spotlight glow.
  useEffect(() => {
    const spot = document.getElementById("u-spot");
    if (!spot) return;
    const move = (e) => {
      spot.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Draggable "selected work" track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let down = false;
    let sx = 0;
    let sl = 0;
    const onDown = (e) => {
      down = true;
      sx = e.clientX;
      sl = track.scrollLeft;
      track.style.cursor = "grabbing";
    };
    const onUp = () => {
      down = false;
      track.style.cursor = "grab";
    };
    const onMove = (e) => {
      if (down) track.scrollLeft = sl - (e.clientX - sx);
    };
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    track.addEventListener("pointermove", onMove);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointermove", onMove);
    };
  }, []);

  const slide = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    const from = t.scrollLeft;
    const to = Math.max(
      0,
      Math.min(t.scrollWidth - t.clientWidth, from + dir * Math.min(560, t.clientWidth * 0.8))
    );
    const t0 = Date.now();
    clearInterval(tweenRef.current);
    tweenRef.current = setInterval(() => {
      const k = Math.min(1, (Date.now() - t0) / 460);
      t.scrollLeft = from + (to - from) * (1 - Math.pow(1 - k, 3));
      if (k >= 1) clearInterval(tweenRef.current);
    }, 16);
  };

  return (
    <div className="u2026" style={{ position: "relative" }}>
      {/* Cursor spotlight */}
      <div
        id="u-spot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 620,
          height: 620,
          margin: "-310px 0 0 -310px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--ac) 0%, transparent 62%)",
          opacity: 0.14,
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 3,
          transform: "translate3d(-1000px, -1000px, 0)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Loading intro */}
      <div
        id="u-load"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
          animation: "uLoadOut calc(var(--dur, 1) * 2600ms) linear forwards",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0 50% 0 0",
            background: "oklch(0.955 0.003 285)",
            animation: "uCurtainL calc(var(--dur, 1) * 2600ms) cubic-bezier(0.76,0,0.24,1) forwards",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "0 0 0 50%",
            background: "oklch(0.955 0.003 285)",
            animation: "uCurtainR calc(var(--dur, 1) * 2600ms) cubic-bezier(0.76,0,0.24,1) forwards",
          }}
        />
        <div style={{ position: "relative", display: "grid", placeItems: "center", gap: 26 }}>
          <img
            src="/assets/unico-mark.png"
            alt=""
            style={{
              width: 54,
              height: 54,
              objectFit: "contain",
              animation: "uMarkSpin calc(var(--dur, 1) * 2600ms) cubic-bezier(0.6,0,0.3,1) forwards",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 13,
              letterSpacing: "0.16em",
              color: "oklch(0.5 0.01 285)",
            }}
          >
            <span>LOADING</span>
            <span style={{ display: "inline-block", height: 16, overflow: "hidden" }}>
              <span style={{ display: "block", animation: "uCount calc(var(--dur, 1) * 1600ms) steps(11) forwards" }}>
                {["000", "010", "020", "030", "040", "050", "060", "070", "080", "090", "100"].map((n) => (
                  <span key={n} style={{ display: "block", height: 16 }}>
                    {n}
                  </span>
                ))}
              </span>
            </span>
          </div>
        </div>
      </div>

      <SiteHeader fixed />

      <section
        id="top"
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(96px, 14vh, 150px) clamp(18px, 4vw, 54px) 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "-10%",
            width: "min(52vw, 620px)",
            aspectRatio: "1",
            borderRadius: "50%",
            border: "1px solid oklch(0.22 0.012 285 / 0.1)",
            animation: "uPulse calc(var(--dur, 1) * 9s) ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", width: "100%" }}>
          <p
            style={{
              margin: "0 0 clamp(18px, 3vh, 34px)",
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "oklch(0.5 0.01 285)",
              animation: "uRise calc(var(--dur, 1) * 900ms) 2.5s ease both",
            }}
          >
            Bangalore, India · Working with founders in Bangalore, Mumbai, Dubai &amp; Singapore
          </p>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(46px, 9.6vw, 148px)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              animation: "uRise calc(var(--dur, 1) * 1000ms) 2.6s ease both",
            }}
          >
            <span style={{ display: "block" }}>We design</span>
            <span style={{ display: "block", height: "1.12em", overflow: "hidden" }}>
              <span
                style={{
                  display: "block",
                  animation: "uWordCycle calc(var(--dur, 1) * 12s) 3.4s cubic-bezier(0.7,0,0.2,1) infinite",
                }}
              >
                <span style={{ display: "block", height: "1.12em", lineHeight: 1.12, color: "var(--ac)" }}>
                  brand identity
                </span>
                <span style={{ display: "block", height: "1.12em", lineHeight: 1.12, color: "var(--ink)" }}>
                  websites
                </span>
                <span style={{ display: "block", height: "1.12em", lineHeight: 1.12, color: "var(--ac)" }}>
                  SaaS platforms
                </span>
                <span style={{ display: "block", height: "1.12em", lineHeight: 1.12, color: "var(--ink)" }}>
                  the whole system
                </span>
              </span>
            </span>
          </h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "clamp(20px, 4vw, 60px)",
              marginTop: "clamp(28px, 5vh, 54px)",
              animation: "uRise calc(var(--dur, 1) * 1000ms) 2.8s ease both",
            }}
          >
            <p style={{ margin: 0, maxWidth: 520, fontSize: "clamp(16px, 1.55vw, 19.5px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
              Most studios hand you a logo and wish you luck. We stay on the pitch until the identity, the website
              and the product screens behind the login all look like the same company — because the same small team
              made all three.
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
              {[
                ["15+", "brands transformed"],
                ["6wk", "identity → live"],
                ["23+", "projects shipped"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "var(--font-bricolage), sans-serif",
                      fontSize: 34,
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "var(--ink)",
                    }}
                  >
                    {num}
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            margin: "clamp(30px, 6vh, 64px) auto 26px",
            fontFamily: "var(--font-plexmono), monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "oklch(0.52 0.01 285)",
            animation: "uNudge calc(var(--dur, 1) * 2.6s) ease-in-out infinite",
          }}
        >
          Scroll to enter ↓
        </div>
      </section>

      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          padding: "18px 0",
        }}
      >
        <Marquee
          duration={30}
          gap={52}
          items={TICKER_CLIENTS.flatMap((c, i) => [
            <span
              key={`c-${i}`}
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontSize: "clamp(18px, 2vw, 26px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "oklch(0.5 0.01 285)",
              }}
            >
              {c}
            </span>,
            <span key={`s-${i}`} style={{ color: "var(--ac)" }}>
              ✳
            </span>,
          ])}
        />
      </div>

      <section id="services" style={{ padding: "clamp(72px, 12vh, 140px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: "clamp(28px, 5vh, 56px)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-bricolage), sans-serif",
                fontSize: "clamp(28px, 4.4vw, 62px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
              }}
            >
              Three services, one thread
            </h2>
            <p style={{ margin: 0, maxWidth: 340, fontSize: 15, lineHeight: 1.6, color: "oklch(0.48 0.01 285)" }}>
              Take one, take all three. The work compounds when you take all three.
            </p>
            <Link
              href="/services"
              style={{
                fontFamily: "var(--font-plexmono), monospace",
                fontSize: 11.5,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ac)",
                whiteSpace: "nowrap",
              }}
            >
              All capabilities →
            </Link>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {SERVICES.map((s) => (
              <Reveal key={s.n} as="div">
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" style={{ position: "relative", padding: "clamp(40px, 7vh, 90px) 0 clamp(56px, 9vh, 110px)", borderTop: "1px solid var(--line)" }}>
        <div>
          <Reveal
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              padding: "0 clamp(18px, 4vw, 54px) clamp(18px, 3vh, 34px)",
            }}
          >
            <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(28px, 4.4vw, 62px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Selected work
            </h2>
            <Link
              href="/work"
              style={{
                fontFamily: "var(--font-plexmono), monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ac)",
                whiteSpace: "nowrap",
              }}
            >
              All nine projects →
            </Link>
          </Reveal>
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "clamp(14px, 1.6vw, 24px)",
              padding: "0 clamp(18px, 4vw, 54px) 10px",
              overflowX: "auto",
              overscrollBehaviorX: "contain",
              cursor: "grab",
              scrollbarWidth: "none",
            }}
          >
            {WORK.map((w) => (
              <Link
                key={w.href}
                href={w.href}
                style={{ display: "block", width: w.width, flex: "none", alignSelf: w.alignEnd ? "flex-end" : undefined }}
              >
                <div style={{ overflow: "hidden", borderRadius: 20, background: "oklch(0.94 0.003 285)" }}>
                  <img
                    decoding="async"
                    src={w.img}
                    alt={w.alt}
                    style={{ display: "block", width: "100%", aspectRatio: w.ratio, objectFit: "cover" }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, marginTop: 14 }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(19px, 1.8vw, 24px)", fontWeight: 600 }}>
                      {w.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
                      {w.tag}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "18px clamp(18px, 4vw, 54px) 0" }}>
            <button type="button" onClick={() => slide(-1)} style={arrowBtnStyle} aria-label="Previous">
              ←
            </button>
            <button type="button" onClick={() => slide(1)} style={arrowBtnStyle} aria-label="Next">
              →
            </button>
          </div>
        </div>
      </section>

      <section id="voices" style={{ padding: "clamp(60px, 10vh, 120px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: "clamp(24px, 4vh, 44px)",
            }}
          >
            <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(28px, 4.4vw, 62px)", fontWeight: 800, letterSpacing: "-0.035em" }}>
              Don&apos;t take our word
            </h2>
            <p style={{ margin: 0, maxWidth: 300, fontSize: 15, lineHeight: 1.6, color: "oklch(0.48 0.01 285)" }}>
              Two founders, unscripted, one take each. Tap to play.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              {
                quote: "“They rebuilt how we talk about ourselves, then built the site to prove it.”",
                who: "Dupree Armon · Media Shoot",
                video: "/assets/testimonial-1.mp4",
                poster: "/assets/opt/poster-1.jpg",
              },
              {
                quote: "“Six weeks from a blank page to something our investors screenshotted.”",
                who: "Founder · Aashir Kare",
                video: "/assets/testimonial-2.mp4",
                poster: "/assets/opt/poster-2.jpg",
              },
            ].map((t) => (
              <Reveal
                key={t.who}
                as="figure"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 20,
                  margin: 0,
                  minWidth: 0,
                  padding: 18,
                  borderRadius: 22,
                  background: "var(--paper-card)",
                  border: "1px solid var(--line)",
                }}
              >
                <VideoButton src={t.video} poster={t.poster} width={200} aspectRatio="9/16" borderRadius={14} />
                <figcaption style={{ flex: "1 1 180px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ margin: "0 0 12px", fontSize: "clamp(16px, 1.5vw, 19px)", lineHeight: 1.5, color: "var(--ink)" }}>
                    {t.quote}
                  </p>
                  <div style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
                    {t.who}
                  </div>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div style={{ overflow: "hidden", padding: "14px 0", background: "var(--paper-card)" }}>
        <Marquee
          reverse
          duration={26}
          gap={40}
          items={TICKER_KEYWORDS.flatMap((k, i) => [
            <span
              key={`k-${i}`}
              style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.48 0.01 285)" }}
            >
              {k}
            </span>,
            <span key={`d-${i}`} style={{ fontFamily: "var(--font-plexmono), monospace", fontSize: 12, color: "oklch(0.48 0.01 285)" }}>
              —
            </span>,
          ])}
        />
      </div>

      <section id="brief" style={{ padding: "clamp(64px, 11vh, 130px) clamp(18px, 4vw, 54px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
          <div>
            <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(30px, 5.4vw, 76px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92 }}>
              Tell us what
              <br />
              you&apos;re making.
            </h2>
            <p style={{ margin: 0, maxWidth: 440, fontSize: 16, lineHeight: 1.6, color: "var(--ink-soft)" }}>
              Two minutes to send a brief, a real reply from a human within a day.
            </p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <Link
              href="/contact"
              style={{ display: "inline-flex", justifyContent: "center", padding: "16px 26px", borderRadius: 999, background: "var(--ac)", color: "#fff", fontSize: 15.5, fontWeight: 600 }}
            >
              Send us a brief
            </Link>
            <a
              href="https://calendly.com/unicostudioss/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", justifyContent: "center", padding: "16px 26px", borderRadius: 999, border: "1px solid oklch(0.22 0.012 285 / 0.28)", fontSize: 15.5, fontWeight: 600 }}
            >
              Book 30 minutes
            </a>
            <div style={{ display: "grid", gap: 4, fontFamily: "var(--font-plexmono), monospace", fontSize: 12, color: "oklch(0.48 0.01 285)", textAlign: "center" }}>
              <a href="mailto:sreehari@unicostudios.in">sreehari@unicostudios.in</a>
              <a href="tel:+918105459006">+91 81054 59006</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ServiceCard({ n, tag, title, body, chips }) {
  return (
    <div
      style={{
        minWidth: 0,
        height: "100%",
        padding: "clamp(22px, 2.4vw, 34px)",
        borderRadius: 20,
        background: "var(--paper-card)",
        border: "1px solid var(--line)",
        transition: "background 0.35s ease, transform 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "oklch(0.965 0.004 285)";
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--paper-card)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-plexmono), monospace",
          fontSize: 11.5,
          letterSpacing: "0.12em",
          color: "var(--ac)",
          marginBottom: "clamp(28px, 6vh, 64px)",
        }}
      >
        <span>{n}</span>
        <span>{tag}</span>
      </div>
      <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-bricolage), sans-serif", fontSize: "clamp(21px, 2vw, 28px)", fontWeight: 600, letterSpacing: "-0.025em" }}>
        {title}
      </h3>
      <p style={{ margin: "0 0 18px", fontSize: 15, lineHeight: 1.62, color: "oklch(0.46 0.01 285)" }}>{body}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, fontFamily: "var(--font-plexmono), monospace", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "oklch(0.5 0.01 285)" }}>
        {chips.map((c) => (
          <span key={c} style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid oklch(0.22 0.012 285 / 0.14)" }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

const arrowBtnStyle = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "1px solid oklch(0.22 0.012 285 / 0.18)",
  background: "transparent",
  color: "var(--ink)",
  fontSize: 16,
  cursor: "pointer",
};
