"use client";
import React, { useEffect, useState } from "react";
import { useAnimate, motion } from "framer-motion";
import Link from "next/link";
import { SiWhatsapp } from "react-icons/si";

export default function GridHoverHero({ h1, p, btn, href, target, click }) {
  const [scope, animate] = useAnimate();
  const [size, setSize] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    generateGridCount();
    window.addEventListener("resize", generateGridCount);
    return () => window.removeEventListener("resize", generateGridCount);
  }, []);

  const generateGridCount = () => {
    const columns = Math.floor(window.innerWidth / 75);
    const rows = Math.floor(window.innerHeight / 75);
    setSize({ columns, rows });
  };

  const handleMouseLeave = (e) => {
    const id = `#${e.target.id}`;
    animate(id, { background: "rgba(129, 140, 248, 0)" }, { duration: 1.5 });
  };

  const handleMouseEnter = (e) => {
    const id = `#${e.target.id}`;
    animate(id, { background: "rgba(129, 140, 248, 1)" }, { duration: 0.15 });
  };

  return (
    <div className="bg-neutral-950">
      <style>{`
        @media(max-width:640px){
          .gh-badge{font-size:10px;padding:3px 10px;white-space:nowrap;}
          .gh-trust{display:none;}
          .gh-cta-row{flex-direction:column;gap:10px;align-items:center;}
        }
      `}</style>
      <div
        ref={scope}
        className="grid h-screen w-full grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] grid-rows-[repeat(auto-fit,_minmax(75px,_1fr))]"
      >
        {[...Array(size.rows * size.columns)].map((_, i) => (
          <div
            key={i}
            id={`square-${i}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="h-full w-full border-[1px] border-neutral-900"
          />
        ))}
      </div>

      <motion.div className="font-montserrat-regular pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 z-0 mt-5">
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.07em",
          color: "#a78bfa",
          background: "rgba(167,139,250,0.08)",
          border: "1px solid rgba(167,139,250,0.2)",
          borderRadius: 100,
          padding: "4px 14px",
          marginBottom: 16,
          textTransform: "uppercase",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
          India's First AI-Powered Agency
        </div>

        <h1 className="font-montserrat-bold text-center text-3xl text-white sm:text-4xl md:text-5xl">
          {h1}
        </h1>
        <p className="mb-6 mt-4 text-center px-5 text-sm xs:text-base max-w-4xl sm:text-lg md:text-xl text-white">
          {p}
        </p>

        {/* CTA buttons row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {href && (
            <Link href={href} target={target}>
              <button className="pointer-events-auto rounded-full bg-[#5F14E0] px-10 py-2 text-xs xs:text-sm md:text-base text-white font-montserrat-medium cursor-pointer">
                {btn}
              </button>
            </Link>
          )}
          {click && (
            <button
              onClick={click}
              className="pointer-events-auto rounded-full bg-[#5F14E0] px-10 py-2 text-xs xs:text-sm md:text-base text-white font-montserrat-medium cursor-pointer"
            >
              {btn}
            </button>
          )}

          {/* WhatsApp CTA — secondary button on hero */}
          <a
            href="https://wa.me/918147057109?text=Hi%20Saurav%2C%20I%20saw%20Unico%20Studios%20and%20want%20to%20know%20more"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              borderRadius: 100,
              border: "1px solid rgba(37,211,102,0.4)",
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#25D366",
              background: "rgba(37,211,102,0.06)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(37,211,102,0.12)";
              e.currentTarget.style.borderColor = "rgba(37,211,102,0.7)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(37,211,102,0.06)";
              e.currentTarget.style.borderColor = "rgba(37,211,102,0.4)";
            }}
          >
            <SiWhatsapp size={14} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Trust line */}
        <p style={{
          marginTop: 20,
          fontSize: 12,
          color: "rgba(255,255,255,0.25)",
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
        }}>
          Trusted by founders in Bangalore, Mumbai, Dubai & Singapore
        </p>
      </motion.div>
    </div>
  );
}
