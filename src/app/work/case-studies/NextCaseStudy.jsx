import Link from "next/link";
import { getNextCaseStudy } from "./registry";

/** The "Next case study →" + "Start a project like this" band shared by every case study. */
export default function NextCaseStudy({ slug }) {
  const next = getNextCaseStudy(slug);
  return (
    <section style={{ padding: "clamp(52px, 9vh, 112px) clamp(18px, 4vw, 54px)", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-plexmono), monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "oklch(0.5 0.01 285)",
              marginBottom: 12,
            }}
          >
            Next case study
          </div>
          <Link
            href={`/work/${next.slug}`}
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(28px, 5vw, 62px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {next.name} →
          </Link>
        </div>
        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            padding: "15px 24px",
            borderRadius: 999,
            background: "var(--ac)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Start a project like this
        </Link>
      </div>
    </section>
  );
}
