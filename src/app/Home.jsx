"use client";
import React, { useEffect, useState } from "react";
import GridHoverHero from "./components/GridHoverHero";
import CountUpStats from "./components/CountUpStats";
import Loader from "./components/ui/StartAnimation";
import { FiftyFiftyHero } from "./components/FiftyFiftyHero";
import { FeatureToggles } from "./components/feature-toggles/FeatureToggles";
import { FoldingLogos } from "./components/FoldingLogos";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { DarkGridHero } from "./components/DarkGridHero";
import LeadForm from "./components/LeadForm";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

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
      icon: "✍️",
      name: "Startup Content Engine",
      desc: "Generate viral hooks, reel scripts and CTAs for your brand in seconds.",
      color: "#a78bfa",
      tag: "Most Popular",
    },
    {
      icon: "⚡",
      name: "Niquo — AI Sales Demo",
      desc: "See a live demo of an AI sales assistant built for YOUR specific business.",
      color: "#22d3ee",
      tag: "🔥 Fan Favourite",
    },
    {
      icon: "🔍",
      name: "Website Revenue Audit",
      desc: "Find exactly how much revenue your website is bleeding — with real ₹ numbers.",
      color: "#fb923c",
      tag: "New ✨",
    },
    {
      icon: "🌐",
      name: "Website Consultant",
      desc: "Fix your website or landing page in plain English — no tech skills needed.",
      color: "#f472b6",
      tag: "For Founders",
    },
  ];

  return (
    <section style={{ background: "#080808", padding: "80px 24px", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .ai-section-inner { max-width: 960px; margin: 0 auto; }
        .ai-section-badge { display:inline-flex; align-items:center; gap:7px; font-size:12px; font-weight:500; letter-spacing:0.06em; color:#a78bfa; background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.18); border-radius:100px; padding:5px 14px; margin-bottom:20px; text-transform:uppercase; }
        .ai-section-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:#a78bfa; animation:aiblink 2s ease infinite; }
        .ai-section-h2 { font-family:'Syne',sans-serif; font-size:clamp(28px,4vw,48px); font-weight:800; color:#fff; letter-spacing:-0.03em; line-height:1.1; margin-bottom:16px; }
        .ai-section-h2 span { background:linear-gradient(90deg,#a78bfa,#f472b6 60%,#22d3ee); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .ai-section-sub { font-size:16px; color:#555; font-weight:300; max-width:480px; line-height:1.6; margin-bottom:48px; }
        .ai-tools-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin-bottom:40px; }
        .ai-tool-card { background:#0f0f0f; border:1px solid #1a1a1a; border-radius:18px; padding:24px 20px; transition:all 0.3s; cursor:default; }
        .ai-tool-card:hover { border-color:#333; transform:translateY(-2px); }
        .ai-tool-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; margin-bottom:14px; }
        .ai-tool-tag { font-size:10px; font-weight:700; letter-spacing:0.06em; padding:2px 8px; border-radius:100px; float:right; margin-top:2px; }
        .ai-tool-name { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#fff; margin-bottom:6px; }
        .ai-tool-desc { font-size:13px; color:#444; line-height:1.6; font-weight:300; }
        .ai-cta-row { display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
        .ai-cta-primary { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#080808; background:#a78bfa; border:none; border-radius:10px; padding:13px 28px; cursor:pointer; transition:opacity 0.15s; text-decoration:none; display:inline-block; }
        .ai-cta-primary:hover { opacity:0.88; }
        .ai-cta-secondary { font-family:'Syne',sans-serif; font-size:14px; font-weight:600; color:#555; background:none; border:1px solid #1e1e1e; border-radius:10px; padding:13px 28px; cursor:pointer; transition:all 0.15s; text-decoration:none; display:inline-block; }
        .ai-cta-secondary:hover { border-color:#333; color:#888; }
        .ai-stats-row { display:flex; gap:32px; margin-bottom:48px; flex-wrap:wrap; }
        .ai-stat { text-align:left; }
        .ai-stat-num { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#fff; letter-spacing:-0.02em; }
        .ai-stat-label { font-size:12px; color:#444; margin-top:2px; }
        @keyframes aiblink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media(max-width:640px) { .ai-tools-grid{grid-template-columns:1fr;} .ai-stats-row{gap:20px;} }
      `}</style>
      <div className="ai-section-inner">
        <div className="ai-section-badge">Introducing Unico AI Tools</div>
        <h2 className="ai-section-h2">
          4 Free AI Tools That<br />
          <span>Grow Your Business</span>
        </h2>
        <p className="ai-section-sub">
          Most agencies charge ₹15,000/month for what we're giving you free. Content, sales, website diagnosis, revenue audits — all AI-powered, all free.
        </p>

        <div className="ai-stats-row">
          <div className="ai-stat">
            <div className="ai-stat-num">9,073+</div>
            <div className="ai-stat-label">Founders using these tools</div>
          </div>
          <div style={{ width: 1, background: "#1e1e1e", alignSelf: "stretch" }} />
          <div className="ai-stat">
            <div className="ai-stat-num">₹4.2Cr</div>
            <div className="ai-stat-label">Revenue audited this month</div>
          </div>
          <div style={{ width: 1, background: "#1e1e1e", alignSelf: "stretch" }} />
          <div className="ai-stat">
            <div className="ai-stat-num">340%</div>
            <div className="ai-stat-label">Avg lead increase with Niquo</div>
          </div>
        </div>

        <div className="ai-tools-grid">
          {tools.map((t) => (
            <div key={t.name} className="ai-tool-card">
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div className="ai-tool-icon" style={{ background: `${t.color}15`, border: `1px solid ${t.color}25` }}>
                  {t.icon}
                </div>
                <span className="ai-tool-tag" style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}25` }}>
                  {t.tag}
                </span>
              </div>
              <div className="ai-tool-name">{t.name}</div>
              <div className="ai-tool-desc">{t.desc}</div>
            </div>
          ))}
        </div>

        <div className="ai-cta-row">
          <Link href="/tools" className="ai-cta-primary">
            → Try All 4 Tools Free
          </Link>
          <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="ai-cta-secondary">
            Book a Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
};

const NiquoTeaser = () => {
  return (
    <section style={{ background: "#050505", padding: "80px 24px", fontFamily: "'DM Sans', sans-serif", borderTop: "1px solid #111" }}>
      <style>{`
        .niquo-inner { max-width: 960px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .niquo-badge { display:inline-flex; align-items:center; gap:7px; font-size:11px; font-weight:600; letter-spacing:0.08em; color:#22d3ee; background:rgba(34,211,238,0.08); border:1px solid rgba(34,211,238,0.18); border-radius:100px; padding:4px 12px; margin-bottom:16px; text-transform:uppercase; }
        .niquo-h2 { font-family:'Syne',sans-serif; font-size:clamp(24px,3.5vw,40px); font-weight:800; color:#fff; letter-spacing:-0.03em; line-height:1.1; margin-bottom:14px; }
        .niquo-h2 span { color:#22d3ee; }
        .niquo-p { font-size:15px; color:#555; line-height:1.7; margin-bottom:24px; font-weight:300; }
        .niquo-features { display:flex; flex-direction:column; gap:12px; margin-bottom:28px; }
        .niquo-feature { display:flex; align-items:flex-start; gap:12px; font-size:14px; color:#666; }
        .niquo-feature-dot { width:6px; height:6px; border-radius:50%; background:#22d3ee; flex-shrink:0; margin-top:6px; }
        .niquo-cta { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:#000; background:#22d3ee; border:none; border-radius:10px; padding:13px 28px; cursor:pointer; text-decoration:none; display:inline-block; transition:opacity 0.15s; }
        .niquo-cta:hover { opacity:0.88; }
        .niquo-demo-window { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:20px; overflow:hidden; box-shadow:0 40px 100px rgba(0,0,0,0.6); }
        .niquo-demo-header { background:#111; border-bottom:1px solid #1a1a1a; padding:14px 18px; display:flex; align-items:center; gap:10px; }
        .niquo-demo-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:aiblink 2s ease infinite; }
        .niquo-demo-title { font-family:'Syne',sans-serif; font-size:13px; font-weight:600; color:#fff; }
        .niquo-demo-body { padding:20px; display:flex; flex-direction:column; gap:12px; }
        .niquo-msg { display:flex; gap:8px; }
        .niquo-msg.user { flex-direction:row-reverse; }
        .niquo-msg-bubble { font-size:13px; line-height:1.6; padding:10px 13px; border-radius:4px 12px 12px 12px; max-width:80%; }
        .niquo-msg.user .niquo-msg-bubble { border-radius:12px 4px 12px 12px; }
        @media(max-width:768px) { .niquo-inner{grid-template-columns:1fr;gap:40px;} }
      `}</style>
      <div className="niquo-inner">
        <div>
          <div className="niquo-badge">⚡ Meet Niquo</div>
          <h2 className="niquo-h2">Your AI Sales Rep.<br /><span>Available 24/7.</span></h2>
          <p className="niquo-p">
            Niquo doesn't just answer questions — it qualifies leads, handles objections, detects buyer personality, and closes deals. All in real time. All for your specific business.
          </p>
          <div className="niquo-features">
            <div className="niquo-feature"><div className="niquo-feature-dot" />Detects 5 buyer personality types and adapts its entire approach</div>
            <div className="niquo-feature"><div className="niquo-feature-dot" />Handles objections better than most human sales reps</div>
            <div className="niquo-feature"><div className="niquo-feature-dot" />Works for ANY industry — e-commerce, real estate, SaaS, D2C</div>
            <div className="niquo-feature"><div className="niquo-feature-dot" />Live demo built specifically for YOUR business in 5 minutes</div>
          </div>
          <Link href="/tools" className="niquo-cta">
            Try Niquo Free →
          </Link>
        </div>
        <div className="niquo-demo-window">
          <div className="niquo-demo-header">
            <div className="niquo-demo-dot" />
            <div className="niquo-demo-title">Niquo — AI Sales Demo</div>
          </div>
          <div className="niquo-demo-body">
            <div className="niquo-msg">
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(34,211,238,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>⚡</div>
              <div className="niquo-msg-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", color: "#888" }}>
                Hi! Tell me about your business and I'll show you exactly how AI would close your clients.
              </div>
            </div>
            <div className="niquo-msg user">
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>👤</div>
              <div className="niquo-msg-bubble" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", color: "#ccc" }}>
                I run a real estate agency in Bangalore
              </div>
            </div>
            <div className="niquo-msg">
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(34,211,238,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>⚡</div>
              <div className="niquo-msg-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", color: "#888" }}>
                Perfect. Activating as your AI Sales Rep now. Send me a message as if you're a potential buyer looking for a 2BHK in Whitefield...
              </div>
            </div>
            <div className="niquo-msg user">
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>👤</div>
              <div className="niquo-msg-bubble" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", color: "#ccc" }}>
                Hi, I'm looking for a 2BHK under 80L
              </div>
            </div>
            <div className="niquo-msg">
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "rgba(34,211,238,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>⚡</div>
              <div className="niquo-msg-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", color: "#888" }}>
                Great timing! We have 3 units in Whitefield under 78L — all ready to move. Are you looking for investment or self-use? That'll help me show you the best fit. 🏠
              </div>
            </div>
            <div style={{ textAlign: "center", paddingTop: 8 }}>
              <Link href="/tools" style={{ fontSize: 12, color: "#22d3ee", textDecoration: "none", fontWeight: 600 }}>
                Continue this demo on the tools page →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const isFirstLoad = sessionStorage.getItem("firstLoad");
    const screenWidth = window.innerWidth;
    if (screenWidth > 767 && !isFirstLoad) {
      setLoading(true);
      sessionStorage.setItem("firstLoad", "true");
      setTimeout(() => setLoading(false), 3500);
    }
  }, []);

  if (!isClient) return null;

  return (
    <>
      {loading ? (
        <div className="hidden md:flex justify-center w-screen items-center font-montserrat-bold bg-[#191919] text-white h-[calc(100vh-10px)]">
          <Loader />
        </div>
      ) : (
        <>
          <Navbar />
          <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <GridHoverHero
            h1={"India's First AI-Powered Growth Agency"}
            p={"We don't just do marketing. We build AI systems that generate leads, close clients and grow your revenue — while you sleep."}
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
      )}
    </>
  );
}
