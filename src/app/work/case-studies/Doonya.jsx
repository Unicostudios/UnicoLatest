"use client";

import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Reveal from "../../components/site/Reveal";
import NextCaseStudy from "./NextCaseStudy";

// Note: the source design file for this case study (doonyacasestudy.dc.html)
// was never provided — this page is built from the one paragraph of copy and
// the four branding images that DO exist (from the work index + the old
// site's case study data), rather than inventing a problem/move narrative,
// stats or a testimonial that were never supplied. Swap in the full case
// study content whenever it's ready.
const GALLERY = [
  "https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744145308/doonyabranding1_s70dnk.jpg",
  "https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744145307/doonyabranding2_k42izm.jpg",
  "https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744145308/doonyabranding3_xwqqf4.jpg",
  "https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744145309/doonyabranding4_hjtdpr.jpg",
];

export default function Doonya() {
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
            Case study 006 · Doonya · India · 2025
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
            Some brands sell jewellery.
            <br />
            Doonya tells <span style={{ color: "var(--ac)" }}>stories.</span>
          </h1>
          <p style={{ margin: "clamp(28px, 5vh, 50px) 0 0", maxWidth: 560, fontSize: "clamp(16px, 1.55vw, 19px)", lineHeight: 1.58, color: "var(--ink-soft)" }}>
            Brand identity work — case notes coming. With a contemporary edge and an eye for detail, Doonya redefines
            elegance, merging craftsmanship with bold creativity.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 clamp(18px, 4vw, 54px) clamp(48px, 8vh, 96px)" }}>
        <Reveal
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {GALLERY.map((src, i) => (
            <img
              key={src}
              decoding="async"
              src={src}
              alt={`Doonya brand identity ${i + 1}`}
              style={{ display: "block", width: "100%", height: 340, objectFit: "cover", borderRadius: 16 }}
            />
          ))}
        </Reveal>
      </section>

      <NextCaseStudy slug="doonya" />
      <SiteFooter />
    </div>
  );
}
