"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/**
 * Shared header for every page in the 2026 redesign.
 * variant="default" — the CTA pill on the right (home, about, services, work, contact)
 * variant="case-study" — a "← All work" link on the right instead (case study pages)
 * fixed — home overlays its hero with a fixed header; every other page uses sticky.
 */
export default function SiteHeader({ variant = "default", fixed = false }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const active = variant === "case-study" ? "/work" : pathname;

  return (
    <header
      style={{
        position: fixed ? "fixed" : "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        padding: fixed ? "18px clamp(18px, 4vw, 54px)" : "16px clamp(18px, 4vw, 54px)",
        backdropFilter: "blur(14px)",
        background: "oklch(0.975 0.002 285 / 0.72)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src="/assets/unico-mark.png"
          alt="Unico Studios"
          style={{ width: 26, height: 26, objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: "-0.02em",
          }}
        >
          unico studios
        </span>
      </Link>

      <nav
        style={{
          display: "flex",
          gap: "clamp(12px, 2.4vw, 28px)",
          fontFamily: "var(--font-plexmono), monospace",
          fontSize: 11.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {NAV.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              color:
                (variant === "case-study" ? l.href === "/work" : isActive(l.href))
                  ? "var(--ac)"
                  : "var(--ink)",
            }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {variant === "case-study" ? (
        <Link
          href="/work"
          style={{
            fontFamily: "var(--font-plexmono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ← All work
        </Link>
      ) : (
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 999,
            background: "var(--ac)",
            color: "#fff",
            fontSize: 13.5,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Start a project
        </Link>
      )}
    </header>
  );
}
