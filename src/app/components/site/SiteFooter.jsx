import Link from "next/link";
import { CASE_STUDIES } from "../../work/case-studies/registry";

const FOOTER_WORK = ["dream-aerospace", "immersified", "g2-interiors", "travel-app"]
  .map((slug) => CASE_STUDIES.find((c) => c.slug === slug))
  .filter(Boolean);

/** Shared footer for every page in the 2026 redesign. */
export default function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--paper-card)" }}>
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "clamp(40px, 6vh, 68px) clamp(18px, 4vw, 54px) clamp(24px, 3vh, 34px)",
          display: "grid",
          gridTemplateColumns:
            "minmax(min(240px, 100%), 1.4fr) repeat(3, minmax(min(150px, 100%), 1fr))",
          gap: "clamp(28px, 4vw, 48px)",
        }}
      >
        <div style={{ minWidth: 0, maxWidth: 380 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <img src="/assets/unico-mark.png" alt="" style={{ width: 30, height: 30, objectFit: "contain" }} />
            <span
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: "-0.02em",
              }}
            >
              unico studios
            </span>
          </div>
          <p style={{ margin: "0 0 20px", fontSize: 15, lineHeight: 1.6, color: "var(--ink-softer)" }}>
            Brand identity, websites and SaaS platforms — one team from the first sketch to the live build.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
              borderRadius: 999,
              background: "var(--ac)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Start a project →
          </Link>
        </div>

        <FooterCol title="Studio">
          <Link href="/">Home</Link>
          <Link href="/about">About us</Link>
          <Link href="/services">Services</Link>
          <Link href="/work">Our work</Link>
        </FooterCol>

        <FooterCol title="Selected work">
          {FOOTER_WORK.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Get in touch">
          <a href="mailto:sreehari@unicostudios.in">sreehari@unicostudios.in</a>
          <a href="tel:+918105459006">+91 81054 59006</a>
          <a href="https://wa.me/918147057109" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer">
            Book 30 minutes
          </a>
        </FooterCol>
      </div>

      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "20px clamp(18px, 4vw, 54px) 34px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-plexmono), monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--ink-mute)",
          }}
        >
          © 2026 Unico Studios · Bangalore, India
        </span>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            fontFamily: "var(--font-plexmono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}
        >
          <a href="https://www.instagram.com/unico.studioss" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://www.linkedin.com/company/unicostudios" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div style={{ minWidth: 0, display: "grid", gap: 10, alignContent: "start" }}>
      <div
        style={{
          fontFamily: "var(--font-plexmono), monospace",
          fontSize: 10.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "oklch(0.54 0.008 285)",
        }}
      >
        {title}
      </div>
      <div style={{ display: "grid", gap: 8, fontSize: 14.5 }}>{children}</div>
    </div>
  );
}
