"use client";

// PATH: src/app/Home.jsx
// ALL FIXES APPLIED:
// 1. Hero headline now leads with Niquo
// 2. Hero CTA → /niquo
// 3. Stats fixed (use CountUpStats component)
// 4. Niquo card in AIToolsSection → /niquo
// 5. NiquoTeaser replaced with premium NiquoSection
// 6. FiftyFiftyHero defensive copy removed
// 7. FoldingLogos now has Niquo testimonials

import React, { useEffect, useState } from "react";
import GridHoverHero from "./components/GridHoverHero";
import CountUpStats from "./components/CountUpStats";
import { FiftyFiftyHero } from "./components/FiftyFiftyHero";
import { FeatureToggles } from "./components/feature-toggles/FeatureToggles";
import { FoldingLogos } from "./components/FoldingLogos";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { DarkGridHero } from "./components/DarkGridHero";
import LeadForm from "./components/LeadForm";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// SPRING MODAL — unchanged
// ─────────────────────────────────────────────────────────────
const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black/50 backdrop-blur fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
          >
            <LeadForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─────────────────────────────────────────────────────────────
// AI TOOLS SECTION
// FIX: Niquo card → /niquo, primary CTA → /niquo
// ─────────────────────────────────────────────────────────────
const AIToolsSection = () => {
  const tools = [
    {
      icon: "⚡",
      name: "Niquo — AI Sales Agent",
      desc: "Watch an AI become your best salesperson — live, personalised to your business, handling real objections in real time. No script. No bot.",
      color: "#22d3ee",
      tag: "🔥 Star Product",
      href: "/niquo",
    },
    {
      icon: "🔍",
      name: "Website Revenue Audit",
      desc: "We read your actual website — every headline, every CTA — then tell you exactly where money is bleeding with real ₹ numbers and a PDF report.",
      color: "#fb923c",
      tag: "Most Unique ✦",
      href: "/tools",
    },
    {
      icon: "✍️",
      name: "Startup Content Engine",
      desc: "Generate viral hooks, reel scripts and CTAs built specifically for YOUR brand — not a generic template that could belong to any business.",
      color: "#a78bfa",
      tag: "Popular",
      href: "/tools",
    },
    {
      icon: "🌐",
      name: "Website & Landing Page Consultant",
      desc: "We read your actual website and give you a plain-English diagnosis of exactly what's broken — with specific fixes, not generic advice.",
      color: "#f472b6",
      tag: "For Founders",
      href: "/tools",
    },
  ];

  return (
    <section style={{ background: "#080808", padding: "64px 24px 56px", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .ais-inner { max-width: 900px; margin: 0 auto; }
        .ais-badge { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:600; letter-spacing:0.07em; color:#a78bfa; background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.2); border-radius:100px; padding:4px 12px; margin-bottom:16px; text-transform:uppercase; }
        .ais-badge::before { content:''; width:5px; height:5px; border-radius:50%; background:#a78bfa; animation:aisblink 2s ease infinite; }
        .ais-h2 { font-family:'Syne',sans-serif; font-size:clamp(24px,3.5vw,40px); font-weight:700; color:#fff; letter-spacing:-0.025em; line-height:1.15; margin-bottom:12px; }
        .ais-h2 span { background:linear-gradient(90deg,#a78bfa,#f472b6 60%,#22d3ee); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ais-sub { font-size:15px; color:#555; font-weight:300; max-width:460px; line-height:1.6; margin-bottom:36px; }
        .ais-stats { display:flex; gap:28px; margin-bottom:36px; flex-wrap:wrap; align-items:center; }
        .ais-stat-num { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:#fff; letter-spacing:-0.01em; }
        .ais-stat-label { font-size:11px; color:#3a3a3a; margin-top:1px; }
        .ais-stat-div { width:1px; height:28px; background:#1e1e1e; }
        .ais-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-bottom:32px; }
        .ais-card { background:#0f0f0f; border:1px solid #1a1a1a; border-radius:16px; padding:20px 18px; transition:all 0.25s; text-decoration:none; display:block; }
        .ais-card:hover { border-color:#2a2a2a; transform:translateY(-2px); }
        .ais-card-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px; }
        .ais-card-icon { width:40px; height:40px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:18px; }
        .ais-card-tag { font-size:10px; font-weight:700; letter-spacing:0.05em; padding:2px 8px; border-radius:100px; }
        .ais-card-name { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#fff; margin-bottom:5px; letter-spacing:-0.01em; }
        .ais-card-desc { font-size:12px; color:#444; line-height:1.55; font-weight:300; }
        .ais-cta-row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .ais-btn-primary { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#080808; background:#22d3ee; border:none; border-radius:9px; padding:11px 24px; cursor:pointer; transition:opacity 0.15s; text-decoration:none; display:inline-block; }
        .ais-btn-primary:hover { opacity:0.88; }
        .ais-btn-secondary { font-family:'Syne',sans-serif; font-size:13px; font-weight:500; color:#444; background:none; border:1px solid #1e1e1e; border-radius:9px; padding:11px 24px; cursor:pointer; transition:all 0.15s; text-decoration:none; display:inline-block; }
        .ais-btn-secondary:hover { border-color:#333; color:#666; }
        .ais-trust { font-size:13px; color:#333; margin-top:20px; font-weight:300; line-height:1.6; }
        .ais-trust strong { color:#555; }
        @keyframes aisblink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media(max-width:600px) { .ais-grid{grid-template-columns:1fr;} .ais-stats{gap:16px;} }
      `}</style>
      <div className="ais-inner">
        <div className="ais-badge">Unico AI Tools</div>
        <h2 className="ais-h2">AI That Actually<br /><span>Sells For You</span></h2>
        <p className="ais-sub">Not generic AI. Not another chatbot. Tools that read your actual business and work like your sharpest employee — completely free.</p>

        <div className="ais-stats">
          <div>
            <div className="ais-stat-num">12+</div>
            <div className="ais-stat-label">Industries using Niquo</div>
          </div>
          <div className="ais-stat-div" />
          <div>
            <div className="ais-stat-num">₹0</div>
            <div className="ais-stat-label">Cost to start — completely free</div>
          </div>
          <div className="ais-stat-div" />
          <div>
            <div className="ais-stat-num">60 sec</div>
            <div className="ais-stat-label">To see Niquo close your first lead</div>
          </div>
        </div>

        <div className="ais-grid">
          {tools.map((t) => (
            <Link key={t.name} href={t.href} className="ais-card">
              <div className="ais-card-top">
                <div className="ais-card-icon" style={{ background: `${t.color}12`, border: `1px solid ${t.color}22` }}>{t.icon}</div>
                <span className="ais-card-tag" style={{ background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}22` }}>{t.tag}</span>
              </div>
              <div className="ais-card-name">{t.name}</div>
              <div className="ais-card-desc">{t.desc}</div>
            </Link>
          ))}
        </div>

        <div className="ais-cta-row">
          <Link href="/niquo" className="ais-btn-primary">→ Watch Niquo sell your business</Link>
          <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="ais-btn-secondary">Book a Strategy Call</a>
        </div>

        <p className="ais-trust">
          Used by founders in <strong>real estate, D2C, SaaS, restaurants and agencies</strong> across India, UAE and Singapore.
        </p>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// NIQUO SECTION — premium black takeover, replaces NiquoTeaser
// ─────────────────────────────────────────────────────────────
const NiquoSection = () => {
  const STATS = [
    { n: "60s",  l: "URL to first result" },
    { n: "24/7", l: "Never misses a lead" },
    { n: "12+",  l: "Industries active"   },
  ];
  const CHAT_BUBBLES = [
    { r: "p", t: "Hi, looking for a coworking space in Indiranagar" },
    { r: "n", t: "Hey! We have a great spot there 🙌 Dedicated desk or hot desk?" },
    { r: "p", t: "Hot desk, maybe 8 days a month" },
    { r: "n", t: "Perfect — that's our Day Pass at ₹499/day. Want me to check this week's availability?" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300&display=swap');
        @keyframes ns-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes ns-tyb   { 0%,70%,100%{transform:translateY(0)} 35%{transform:translateY(-4px)} }
        .ns-ty { width:4px; height:4px; border-radius:50%; background:rgba(245,245,247,0.45); animation:ns-tyb 1.1s infinite; }
        .ns-ty:nth-child(2){ animation-delay:0.18s; }
        .ns-ty:nth-child(3){ animation-delay:0.36s; }
        .ns-section { background:#000; padding:120px 24px; overflow:hidden; position:relative; border-top:0.5px solid #111; border-bottom:0.5px solid #111; }
        .ns-section::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 40% at 50% 50%, rgba(48,209,88,0.05) 0%, transparent 70%); pointer-events:none; }
        .ns-inner { max-width:1020px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; position:relative; z-index:1; }
        .ns-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(48,209,88,0.08); border:0.5px solid rgba(48,209,88,0.2); color:#30d158; font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:11px; font-weight:500; letter-spacing:1.5px; text-transform:uppercase; padding:6px 14px; border-radius:100px; margin-bottom:28px; }
        .ns-badge-dot { width:5px; height:5px; border-radius:50%; background:#30d158; animation:ns-pulse 2s infinite; }
        .ns-h2 { font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:clamp(38px,4.5vw,64px); font-weight:700; letter-spacing:-0.04em; line-height:1.05; color:#f5f5f7; margin-bottom:18px; }
        .ns-body { font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:clamp(16px,1.8vw,20px); font-weight:300; color:#6e6e73; line-height:1.55; letter-spacing:-0.02em; margin-bottom:14px; max-width:420px; }
        .ns-body2 { font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:14px; font-weight:300; color:#6e6e73; line-height:1.65; letter-spacing:-0.01em; margin-bottom:40px; max-width:400px; }
        .ns-stats { display:flex; gap:36px; padding-top:28px; border-top:0.5px solid rgba(245,245,247,0.08); margin-bottom:40px; }
        .ns-stat-n { font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:clamp(24px,3vw,36px); font-weight:700; letter-spacing:-0.04em; color:#f5f5f7; line-height:1; margin-bottom:4px; display:block; }
        .ns-stat-l { font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:12px; font-weight:300; color:#6e6e73; letter-spacing:-0.01em; display:block; }
        .ns-actions { display:flex; gap:16px; align-items:center; flex-wrap:wrap; }
        .ns-btn-primary { background:#0071e3; color:#fff; font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:15px; font-weight:400; padding:11px 24px; border-radius:980px; border:none; cursor:pointer; text-decoration:none; transition:background 0.2s; letter-spacing:-0.01em; display:inline-block; }
        .ns-btn-primary:hover { background:#0077ed; }
        .ns-btn-link { font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif; font-size:15px; font-weight:400; color:#2997ff; text-decoration:none; letter-spacing:-0.01em; transition:opacity 0.2s; }
        .ns-btn-link:hover { opacity:0.8; }
        .ns-phone-wrap { display:flex; justify-content:center; align-items:center; position:relative; }
        .ns-phone-glow { position:absolute; width:280px; height:280px; background:radial-gradient(ellipse, rgba(48,209,88,0.1) 0%, transparent 70%); border-radius:50%; pointer-events:none; }
        .ns-phone { width:256px; height:510px; background:linear-gradient(160deg,#1c1c1e 0%,#0a0a0a 100%); border-radius:44px; border:1.5px solid rgba(255,255,255,0.12); box-shadow:0 60px 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05); overflow:hidden; position:relative; flex-shrink:0; }
        .ns-notch { width:88px; height:24px; background:#000; border-radius:0 0 16px 16px; margin:0 auto; position:relative; z-index:2; }
        .ns-screen { padding:6px 14px 16px; height:calc(100% - 24px); display:flex; flex-direction:column; }
        .ns-status { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding:2px 4px; }
        .ns-time { font-size:12px; font-weight:600; color:#f5f5f7; }
        .ns-bars { display:flex; gap:3px; align-items:flex-end; }
        .ns-bar  { width:3px; border-radius:1px; background:#f5f5f7; }
        .ns-wa-head { display:flex; align-items:center; gap:8px; padding-bottom:10px; border-bottom:0.5px solid rgba(255,255,255,0.07); margin-bottom:12px; }
        .ns-wa-avatar { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,#25d366,#128c7e); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; color:#fff; flex-shrink:0; }
        .ns-wa-name   { font-size:12px; font-weight:500; color:#f5f5f7; line-height:1.2; }
        .ns-wa-status { font-size:10px; color:#25d366; }
        .ns-bubbles { flex:1; display:flex; flex-direction:column; gap:7px; justify-content:flex-end; overflow:hidden; }
        .ns-bubble-p { align-self:flex-start; background:#1c1c1e; color:#f5f5f7; padding:7px 10px; border-radius:4px 10px 10px 10px; font-size:11px; line-height:1.45; max-width:80%; }
        .ns-bubble-n { align-self:flex-end; background:#0b5d2e; color:#f5f5f7; padding:7px 10px; border-radius:10px 10px 4px 10px; font-size:11px; line-height:1.45; max-width:80%; }
        .ns-typing { align-self:flex-end; background:#0b5d2e; padding:8px 12px; border-radius:10px 10px 4px 10px; display:flex; gap:3px; align-items:center; }
        @media(max-width:768px){ .ns-inner{grid-template-columns:1fr !important; gap:56px !important;} .ns-phone-wrap{display:none !important;} .ns-section{padding:80px 20px;} }
      `}</style>

      <section className="ns-section">
        <div className="ns-inner">
          <div>
            <div className="ns-badge"><span className="ns-badge-dot" />New · AI Sales Agent</div>
            <h2 className="ns-h2">Meet Niquo.</h2>
            <p className="ns-body">The AI that reads your business, learns your pitch, and closes leads on WhatsApp, chat, and calls — 24/7.</p>
            <p className="ns-body2">Not a chatbot. Not an FAQ bot. A closer — that handles price objections, follows up ghosts, and qualifies every lead before it reaches you.</p>
            <div className="ns-stats">
              {STATS.map((s) => (
                <div key={s.n}>
                  <span className="ns-stat-n">{s.n}</span>
                  <span className="ns-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
            <div className="ns-actions">
              <Link href="/niquo" className="ns-btn-primary">Watch Niquo sell your business</Link>
              <Link href="/niquo#demo" className="ns-btn-link">Try the demo ›</Link>
            </div>
          </div>

          <div className="ns-phone-wrap">
            <div className="ns-phone-glow" />
            <div className="ns-phone">
              <div className="ns-notch" />
              <div className="ns-screen">
                <div className="ns-status">
                  <span className="ns-time">9:41</span>
                  <div className="ns-bars">
                    {[6,9,12,9].map((h,i) => <div key={i} className="ns-bar" style={{ height:`${h}px` }} />)}
                  </div>
                </div>
                <div className="ns-wa-head">
                  <div className="ns-wa-avatar">N</div>
                  <div>
                    <div className="ns-wa-name">Your Business</div>
                    <div className="ns-wa-status">● Powered by Niquo</div>
                  </div>
                </div>
                <div className="ns-bubbles">
                  {CHAT_BUBBLES.map((m,i) => (
                    <div key={i} className={m.r === "p" ? "ns-bubble-p" : "ns-bubble-n"}>{m.t}</div>
                  ))}
                  <div className="ns-typing">
                    <div className="ns-ty" /><div className="ns-ty" /><div className="ns-ty" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// ─────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────
export default function Home() {
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth > 767) {
      const isFirstLoad = sessionStorage.getItem("firstLoad");
      if (!isFirstLoad) {
        setLoaderVisible(true);
        sessionStorage.setItem("firstLoad", "true");
        setTimeout(() => setLoaderVisible(false), 1200);
      }
    }
  }, []);

  return (
    <>
      {loaderVisible && (
        <div style={{ position:"fixed", inset:0, background:"#191919", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", animation:"loaderFadeOut 1.2s ease forwards", pointerEvents:"none" }}>
          <style>{`@keyframes loaderFadeOut{0%{opacity:1}60%{opacity:1}100%{opacity:0}}`}</style>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:700, color:"#fff", letterSpacing:"-0.02em" }}>∂ Unico</div>
        </div>
      )}

      <Navbar />
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* FIX: Hero headline + CTA now leads with Niquo */}
      <GridHoverHero
        h1={"We Built Niquo — India's First AI Sales Agent"}
        p={"Paste your URL. Watch it qualify leads, handle objections, and close deals on WhatsApp — while you sleep."}
        btn={"Watch Niquo sell your business"}
        href={"/niquo"}
      />

      {/* FIX: Stats now always show with count-up animation */}
      <CountUpStats />

      <AIToolsSection />

      {/* FIX: NiquoTeaser replaced with premium Apple-style NiquoSection */}
      <NiquoSection />

      <FiftyFiftyHero />
      <FeatureToggles />

      {/* FIX: FoldingLogos now has Niquo testimonials */}
      <FoldingLogos />

      <DarkGridHero
        h={"Ready to grow with AI?"}
        p={"Book a free 30-minute strategy call with Saurav and Sreehari. Walk away with a clear plan — no pitch, no pressure."}
        btn={"Book Free Strategy Call"}
        href={"https://calendly.com/unicostudioss/30min"}
      />
      <Footer />
    </>
  );
}
