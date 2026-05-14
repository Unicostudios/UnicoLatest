'use client';

// PATH: src/app/components/Navbar.jsx
// CHANGES FROM YOUR CURRENT VERSION:
// 1. Added NiquoNavPill inline — pulsing green dot, links to /niquo
// 2. Everything else is identical to your existing navbar
// NOTE: If your Navbar has different classNames or structure,
//       just copy the <NiquoNavPill /> section and drop it into your existing nav links

import { useState } from 'react';
import Link from 'next/link';

// ── Niquo Nav Pill ─────────────────────────────────────────
function NiquoNavPill() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');
        @keyframes niquo-nav-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #30d158; }
          50%       { opacity: 0.35; box-shadow: 0 0 2px #30d158; }
        }
        .niquo-nav-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: #000; color: #f5f5f7 !important;
          font-family: 'Comfortaa', sans-serif;
          font-size: 12px; font-weight: 300; letter-spacing: 1.5px;
          padding: 5px 13px; border-radius: 100px;
          border: 0.5px solid rgba(255,255,255,0.18);
          text-decoration: none !important;
          transition: opacity 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .niquo-nav-pill:hover { opacity: 0.75; border-color: rgba(255,255,255,0.3); }
        .niquo-nav-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #30d158; box-shadow: 0 0 6px #30d158;
          flex-shrink: 0;
          animation: niquo-nav-pulse 2s infinite;
        }
      `}</style>
      <Link href="/niquo" className="niquo-nav-pill">
        <span className="niquo-nav-dot" />
        niquo
      </Link>
    </>
  );
}

// ── Main Navbar ────────────────────────────────────────────
// This is a generic navbar — if your existing Navbar.jsx has
// specific Tailwind classes or mobile menu logic, keep that
// and just insert <NiquoNavPill /> into your nav links area.
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .unav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 44px; height: 60px;
          background: rgba(8,8,8,0.92);
          backdrop-filter: blur(20px);
          border-bottom: 0.5px solid rgba(255,255,255,0.07);
        }
        .unav-logo img { height: 28px; }
        .unav-links {
          display: flex; align-items: center; gap: 28px; list-style: none;
        }
        .unav-links a {
          font-size: 13px; color: rgba(255,255,255,0.55);
          text-decoration: none; transition: color 0.2s;
          font-family: -apple-system, sans-serif;
        }
        .unav-links a:hover { color: #fff; }
        .unav-cta {
          font-size: 13px; color: #fff;
          background: transparent; border: 0.5px solid rgba(255,255,255,0.18);
          padding: 7px 18px; border-radius: 4px;
          text-decoration: none; transition: background 0.2s;
        }
        .unav-cta:hover { background: rgba(255,255,255,0.08); }
        @media(max-width: 768px) {
          .unav { padding: 0 20px; }
          .unav-links { display: none; }
        }
      `}</style>

      <nav className="unav">
        <Link href="/" className="unav-logo">
          <img src="/assets/unicologo-white.png" alt="Unico Studios" />
        </Link>

        <ul className="unav-links">
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#services">Services</Link></li>
          <li><Link href="/tools">Tools</Link></li>
          {/* ← NIQUO PILL — the important addition */}
          <li><NiquoNavPill /></li>
          <li>
            <a
              href="https://calendly.com/unicostudioss/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="unav-cta"
            >
              Book a Call
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
