"use client";
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

const AIToolsSection = () => {
  const tools = [
    {
      icon: "⚡",
      name: "Niquo — AI Sales Demo",
      desc: "Watch an AI become your best salesperson — live, personalised to your business, handling real objections in real time. No script. No bot.",
      color: "#22d3ee",
      tag: "🔥 Star Product",
    },
    {
      icon: "🔍",
      name: "Website Revenue Audit",
      desc: "We read your actual website — every headline, every CTA — then tell you exactly where money is bleeding with real ₹ numbers and a PDF report.",
      color: "#fb923c",
      tag: "Most Unique ✦",
    },
    {
      icon: "✍️",
      name: "Startup Content Engine",
      desc: "Generate viral hooks, reel scripts and CTAs built specifically for YOUR brand — not a generic template that could belong to any business.",
      color: "#a78bfa",
      tag: "Popular",
    },
    {
      icon: "🌐",
      name: "Website & Landing Page Consultant",
      desc: "We read your actual website and give you a plain-English diagnosis of exactly what's broken — with specific fixes, not generic advice.",
      color: "#f472b6",
      tag: "For Founders",
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
        .ais-card { background:#0f0f0f; border:1px solid #1a1a1a; border-radius:16px; padding:20px 18px; transition:all 0.25s; }
        .ais-card:hover { border-color:#2a2a2a; transform:translateY(-2px); }
        .ais-card-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:12px; }
        .ais-card-icon { width:40px; height:40px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:18px; }
        .ais-card-tag { font-size:10px; font-weight:700; letter-spacing:0.05em; padding:2px 8px; border-radius:100px; }
        .ais-card-name { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#fff; margin-bottom:5px; letter-spacing:-0.01em; }
        .ais-card-desc { font-size:12px; color:#444; line-height:1.55; font-weight:300; }
        .ais-cta-row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .ais-btn-primary { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#080808; background:#a78bfa; border:none; border-radius:9px; padding:11px 24px; cursor:pointer; transition:opacity 0.15s; text-decoration:none; display:inline-block; }
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
            <div className="ais-stat-num">Real Estate</div>
            <div className="ais-stat-label">D2C · SaaS · Restaurants · Agencies</div>
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
            <div key={t.name} className="ais-card">
              <div className="ais-card-top">
                <div className="ais-card-icon" style={{ background: `${t.color}12`, border: `1px solid ${t.color}22` }}>{t.icon}</div>
                <span className="ais-card-tag" style={{ background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}22` }}>{t.tag}</span>
              </div>
              <div className="ais-card-name">{t.name}</div>
              <div className="ais-card-desc">{t.desc}</div>
            </div>
          ))}
        </div>

        <div className="ais-cta-row">
          <a href="/tools" className="ais-btn-primary">→ Try All 4 Tools Free</a>
          <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="ais-btn-secondary">Book a Strategy Call</a>
        </div>

        <p className="ais-trust">
          Used by founders in <strong>real estate, D2C, SaaS, restaurants and agencies</strong> across India, UAE and Singapore.
        </p>
      </div>
    </section>
  );
};

const NiquoTeaser = () => {
  return (
    <section style={{ background: "#050505", padding: "64px 24px", fontFamily: "'DM Sans', sans-serif", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
      <style>{`
        .nq-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .nq-badge { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:600; letter-spacing:0.07em; color:#22d3ee; background:rgba(34,211,238,0.08); border:1px solid rgba(34,211,238,0.2); border-radius:100px; padding:4px 12px; margin-bottom:14px; text-transform:uppercase; }
        .nq-h2 { font-family:'Syne',sans-serif; font-size:clamp(22px,3vw,36px); font-weight:700; color:#fff; letter-spacing:-0.025em; line-height:1.15; margin-bottom:12px; }
        .nq-h2 span { color:#22d3ee; }
        .nq-p { font-size:14px; color:#555; line-height:1.7; margin-bottom:20px; font-weight:300; max-width:380px; }
        .nq-features { display:flex; flex-direction:column; gap:9px; margin-bottom:24px; }
        .nq-feature { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#555; line-height:1.5; }
        .nq-feature-dot { width:5px; height:5px; border-radius:50%; background:#22d3ee; flex-shrink:0; margin-top:5px; opacity:0.7; }
        .nq-cta { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#000; background:#22d3ee; border:none; border-radius:9px; padding:11px 24px; cursor:pointer; text-decoration:none; display:inline-block; transition:opacity 0.15s; }
        .nq-cta:hover { opacity:0.88; }
        .nq-window { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:16px; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.5); }
        .nq-win-header { background:#111; border-bottom:1px solid #1a1a1a; padding:12px 16px; display:flex; align-items:center; gap:8px; }
        .nq-win-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:aisblink 2s ease infinite; }
        .nq-win-title { font-family:'Syne',sans-serif; font-size:12px; font-weight:600; color:#fff; }
        .nq-win-body { padding:16px; display:flex; flex-direction:column; gap:10px; }
        .nq-msg { display:flex; gap:7px; align-items:flex-start; }
        .nq-msg.user { flex-direction:row-reverse; }
        .nq-msg-av { width:24px; height:24px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:12px; flex-shrink:0; }
        .nq-msg-bubble { font-size:12px; line-height:1.55; padding:8px 11px; border-radius:3px 10px 10px 10px; max-width:82%; }
        .nq-msg.user .nq-msg-bubble { border-radius:10px 3px 10px 10px; }
        @media(max-width:768px) { .nq-inner{grid-template-columns:1fr;gap:32px;} }
      `}</style>
      <div className="nq-inner">
        <div>
          <div className="nq-badge">⚡ Meet Niquo</div>
          <h2 className="nq-h2">Your AI Sales Rep.<br /><span>Available 24/7.</span></h2>
          <p className="nq-p">Niquo qualifies leads, handles objections, detects buyer personality and closes deals — in real time, for your specific business.</p>
          <div className="nq-features">
            <div className="nq-feature"><div className="nq-feature-dot" />Detects 5 buyer personality types and adapts its entire approach</div>
            <div className="nq-feature"><div className="nq-feature-dot" />Handles objections better than most human sales reps</div>
            <div className="nq-feature"><div className="nq-feature-dot" />Works for ANY industry — e-commerce, real estate, SaaS, D2C</div>
            <div className="nq-feature"><div className="nq-feature-dot" />Live demo built specifically for YOUR business in 5 minutes</div>
          </div>
          <a href="/tools" className="nq-cta">Try Niquo Free →</a>
        </div>
        <div className="nq-window">
          <div className="nq-win-header">
            <div className="nq-win-dot" />
            <div className="nq-win-title">Niquo — AI Sales Demo</div>
          </div>
          <div className="nq-win-body">
            <div className="nq-msg">
              <div className="nq-msg-av" style={{ background: "rgba(34,211,238,0.1)" }}>⚡</div>
              <div className="nq-msg-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", color: "#777" }}>
                Hi! Tell me about your business and I'll show you exactly how AI would close your clients.
              </div>
            </div>
            <div className="nq-msg user">
              <div className="nq-msg-av" style={{ background: "rgba(255,255,255,0.03)" }}>👤</div>
              <div className="nq-msg-bubble" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", color: "#bbb" }}>
                I run a real estate agency in Bangalore
              </div>
            </div>
            <div className="nq-msg">
              <div className="nq-msg-av" style={{ background: "rgba(34,211,238,0.1)" }}>⚡</div>
              <div className="nq-msg-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", color: "#777" }}>
                Perfect. Activating as your AI Sales Rep now. Send me a message as if you're a potential buyer looking for a 2BHK in Whitefield...
              </div>
            </div>
            <div className="nq-msg user">
              <div className="nq-msg-av" style={{ background: "rgba(255,255,255,0.03)" }}>👤</div>
              <div className="nq-msg-bubble" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", color: "#bbb" }}>
                Hi, I'm looking for a 2BHK under 80L
              </div>
            </div>
            <div className="nq-msg">
              <div className="nq-msg-av" style={{ background: "rgba(34,211,238,0.1)" }}>⚡</div>
              <div className="nq-msg-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", color: "#777" }}>
                Great timing! We have 3 units in Whitefield under 78L — all ready to move. Investment or self-use? 🏠
              </div>
            </div>
            <div style={{ textAlign: "center", paddingTop: 6, borderTop: "1px solid #1a1a1a", marginTop: 4 }}>
              <a href="/tools" style={{ fontSize: 11, color: "#22d3ee", textDecoration: "none", fontWeight: 600 }}>
                Continue this demo on the tools page →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#191919",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "loaderFadeOut 1.2s ease forwards",
            pointerEvents: "none",
          }}
        >
          <style>{`
            @keyframes loaderFadeOut {
              0% { opacity: 1; }
              60% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}>
            ∂ Unico
          </div>
        </div>
      )}

      <Navbar />
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <GridHoverHero
        h1={"India's First AI-Powered Growth Agency"}
        p={"We build AI systems that generate leads, close clients and grow your revenue — while you sleep."}
        btn={"Try Our Free AI Tools"}
        href={"/tools"}
      />
      <CountUpStats />
      <AIToolsSection />
      <NiquoTeaser />
      <FiftyFiftyHero />
      <FeatureToggles />
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
