"use client";
import { useState, useRef, useEffect } from "react";

const TOOLS = {
  content: {
    id: "content",
    name: "Startup Content Engine",
    shortName: "Content Engine",
    desc: "Hooks, scripts, reels & CTAs — all done for you",
    longDesc: "Generate viral reel scripts, powerful hooks, high-converting CTAs and thumbnail concepts for your brand in seconds.",
    icon: "✍️",
    color: "#a78bfa",
    bgActive: "rgba(167,139,250,0.08)",
    borderActive: "rgba(167,139,250,0.22)",
    borderFaint: "rgba(167,139,250,0.15)",
    headerBg: "rgba(167,139,250,0.10)",
    userBg: "rgba(167,139,250,0.06)",
    chipBg: "rgba(167,139,250,0.05)",
    chipBorder: "rgba(167,139,250,0.18)",
    greeting: "Hey! I generate high-conversion content for your startup — reel scripts, hook ideas, CTA lines, thumbnail concepts. What's your brand about?",
    chips: ["Write me a reel hook for a SaaS product", "Write 5 CTA lines for a landing page", "Write a 30-second reel script for a D2C brand", "Give me 3 thumbnail concepts for my startup"],
    mode: "content",
    limit: 10,
    tag: "Most Popular",
  },
  code: {
    id: "code",
    name: "Vibe Code Fixer",
    shortName: "Vibe Code Fixer",
    desc: "Paste messy code, get back clean production-ready code",
    longDesc: "Fix bugs, clean up architecture, optimize performance. Paste any code and get back production-ready, well-structured code instantly.",
    icon: "💻",
    color: "#f472b6",
    bgActive: "rgba(244,114,182,0.08)",
    borderActive: "rgba(244,114,182,0.22)",
    borderFaint: "rgba(244,114,182,0.15)",
    headerBg: "rgba(244,114,182,0.10)",
    userBg: "rgba(244,114,182,0.06)",
    chipBg: "rgba(244,114,182,0.05)",
    chipBorder: "rgba(244,114,182,0.18)",
    greeting: "Paste your messy, broken, or unoptimized code and I'll give it back clean, readable, and production-ready. What are we fixing today?",
    chips: ["Fix the bugs in my JavaScript", "Clean up and optimize this React component", "Review my code architecture and suggest improvements", "Make this code faster and more performant"],
    mode: "code",
    limit: 10,
    tag: "For Developers",
  },
  niquo: {
    id: "niquo",
    name: "Niquo — AI Sales Demo",
    shortName: "Niquo",
    desc: "See how AI closes clients for your specific business",
    longDesc: "Experience a live demo of an AI sales assistant built specifically for YOUR business. See how it handles objections and closes deals.",
    icon: "⚡",
    color: "#22d3ee",
    bgActive: "rgba(34,211,238,0.07)",
    borderActive: "rgba(34,211,238,0.20)",
    borderFaint: "rgba(34,211,238,0.13)",
    headerBg: "rgba(34,211,238,0.09)",
    userBg: "rgba(34,211,238,0.05)",
    chipBg: "rgba(34,211,238,0.04)",
    chipBorder: "rgba(34,211,238,0.16)",
    greeting: "Hi! I'm Niquo. I'll show you exactly how an AI sales assistant would work for YOUR business. To get started — what's your company name and what do you sell?",
    chips: ["I run an e-commerce brand selling fashion", "I have a real estate agency in Bangalore", "I run a SaaS product for HR teams", "I own a restaurant chain"],
    mode: "niquo",
    limit: 50,
    tag: "🔥 Fan Favourite",
  },
  audit: {
    id: "audit",
    name: "Website Audit Tool",
    shortName: "Site Audit",
    desc: "Get a free AI audit of your website in 60 seconds",
    longDesc: "Get a premium ₹50,000 consultant-level audit of your website covering SEO, UX, conversion rate, content and mobile performance.",
    icon: "🔍",
    color: "#fb923c",
    bgActive: "rgba(251,146,60,0.08)",
    borderActive: "rgba(251,146,60,0.22)",
    borderFaint: "rgba(251,146,60,0.15)",
    headerBg: "rgba(251,146,60,0.10)",
    userBg: "rgba(251,146,60,0.06)",
    chipBg: "rgba(251,146,60,0.05)",
    chipBorder: "rgba(251,146,60,0.18)",
    greeting: "Hi! I'm your Website Audit AI. Give me your website URL and I'll analyse it for SEO, design, conversion gaps, speed issues and more — in 60 seconds. What's your website URL?",
    chips: ["Audit unicostudios.in", "Check my landing page conversion", "Analyse my competitor's website", "Give me an SEO audit"],
    mode: "audit",
    limit: 3,
    tag: "New ✨",
  },
};

const COUNTRIES = [
  { code: "+91", name: "India", flag: "🇮🇳", country: "India" },
  { code: "+1", name: "USA/Canada", flag: "🇺🇸", country: "United States" },
  { code: "+44", name: "UK", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+61", name: "Australia", flag: "🇦🇺", country: "Australia" },
  { code: "+971", name: "UAE", flag: "🇦🇪", country: "UAE" },
  { code: "+65", name: "Singapore", flag: "🇸🇬", country: "Singapore" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾", country: "Malaysia" },
  { code: "+49", name: "Germany", flag: "🇩🇪", country: "Germany" },
  { code: "+33", name: "France", flag: "🇫🇷", country: "France" },
  { code: "+81", name: "Japan", flag: "🇯🇵", country: "Japan" },
  { code: "+55", name: "Brazil", flag: "🇧🇷", country: "Brazil" },
  { code: "+52", name: "Mexico", flag: "🇲🇽", country: "Mexico" },
  { code: "+27", name: "South Africa", flag: "🇿🇦", country: "South Africa" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", country: "Nigeria" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩", country: "Indonesia" },
  { code: "+63", name: "Philippines", flag: "🇵🇭", country: "Philippines" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰", country: "Pakistan" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩", country: "Bangladesh" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰", country: "Sri Lanka" },
  { code: "+977", name: "Nepal", flag: "🇳🇵", country: "Nepal" },
];

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export default function ToolsPage() {
  const [screen, setScreen] = useState("landing"); // landing | chat
  const [currentTool, setCurrentTool] = useState(null);
  const [messages, setMessages] = useState({ content: [], code: [], niquo: [], audit: [] });
  const [uses, setUses] = useState({ content: 0, code: 0, niquo: 0, audit: 0 });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [phoneInput, setPhoneInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showGate, setShowGate] = useState(true);
  const [gateSuccess, setGateSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const ONE_HOUR = 60 * 60 * 1000;

  useEffect(() => {
    const saved = sessionStorage.getItem("unico_tools_email");
    const savedTime = sessionStorage.getItem("unico_tools_time");
    const now = Date.now();
    if (saved && savedTime && (now - parseInt(savedTime)) < ONE_HOUR) {
      setEmail(saved);
      setShowGate(false);
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: saved, phone: "Returning", tool: "Tools Page", returning: true }),
      }).catch(() => {});
    } else {
      sessionStorage.removeItem("unico_tools_email");
      sessionStorage.removeItem("unico_tools_time");
      setShowGate(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const openTool = (toolId) => {
    setCurrentTool(toolId);
    setDemoCompleted(false);
    setScreen("chat");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const goBack = () => {
    setScreen("landing");
    setCurrentTool(null);
    setInput("");
  };

  const tool = currentTool ? TOOLS[currentTool] : null;
  const currentUses = currentTool ? uses[currentTool] : 0;
  const currentLimit = tool ? tool.limit : 10;

  const handleSubmit = async () => {
    setEmailError("");
    setPhoneError("");
    let valid = true;
    if (!emailInput) { setEmailError("Please enter your email address"); valid = false; }
    else if (!isValidEmail(emailInput)) { setEmailError("Please enter a valid email address"); valid = false; }
    if (!phoneInput) { setPhoneError("Please enter your phone number"); valid = false; }
    else if (phoneInput.length < 6) { setPhoneError("Please enter a valid phone number"); valid = false; }
    if (!valid) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          phone: `${selectedCountry.code}${phoneInput}`,
          tool: "Tools Page",
          country: selectedCountry.country,
        }),
      });
      sessionStorage.setItem("unico_tools_email", emailInput);
      sessionStorage.setItem("unico_tools_time", Date.now().toString());
      setEmail(emailInput);
      setGateSuccess(true);
    } catch {
      setEmailError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const closeGate = () => {
    setShowGate(false);
    setGateSuccess(false);
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || !currentTool) return;
    if (currentUses >= currentLimit) { setShowUpgrade(true); return; }
    const userMsg = { role: "user", content: msg };
    setMessages((prev) => ({ ...prev, [currentTool]: [...prev[currentTool], userMsg] }));
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    setUses((prev) => ({ ...prev, [currentTool]: prev[currentTool] + 1 }));
    try {
      const history = [...messages[currentTool], userMsg];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: history.slice(0, -1), mode: tool.mode, email }),
      });
      const data = await res.json();
      setMessages((prev) => ({ ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: data.reply }] }));
      if (data.demoCompleted) setDemoCompleted(true);
    } catch {
      setMessages((prev) => ({ ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: "Something went wrong. Please try again." }] }));
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (!showGate) sendMessage(); }
  };

  const currentMessages = currentTool ? messages[currentTool] : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }
        .tp { min-height:100vh; background:#080808; color:#e8e8e8; font-family:'DM Sans',sans-serif; -webkit-font-smoothing:antialiased; }

        /* NAV */
        .tp-nav { width:100%; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #111; }
        .tp-logo { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:#fff; letter-spacing:-1px; text-decoration:none; }
        .tp-back-btn { display:flex; align-items:center; gap:6px; font-size:13px; color:#555; background:none; border:none; cursor:pointer; transition:color 0.2s; padding:0; }
        .tp-back-btn:hover { color:#e8e8e8; }

        /* LANDING */
        .tp-landing { max-width:960px; margin:0 auto; padding:60px 24px 80px; }
        .tp-hero { text-align:center; margin-bottom:64px; }
        .tp-badge { display:inline-flex; align-items:center; gap:7px; font-size:12px; font-weight:500; letter-spacing:0.04em; color:#a78bfa; background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.18); border-radius:100px; padding:5px 14px; margin-bottom:20px; }
        .tp-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:#a78bfa; animation:blink 2s ease infinite; }
        .tp-h1 { font-family:'Syne',sans-serif; font-size:clamp(32px,6vw,64px); font-weight:800; letter-spacing:-0.04em; line-height:1.05; color:#fff; margin-bottom:16px; }
        .tp-h1 span { background:linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#22d3ee 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .tp-sub { font-size:17px; color:#555; font-weight:300; max-width:480px; margin:0 auto; line-height:1.6; }

        /* TOOL CARDS GRID */
        .tp-grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; }
        .tp-card { background:#0f0f0f; border:1px solid #1e1e1e; border-radius:20px; padding:28px 24px; cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden; }
        .tp-card:hover { transform:translateY(-3px); border-color:#2e2e2e; box-shadow:0 20px 60px rgba(0,0,0,0.4); }
        .tp-card-tag { position:absolute; top:16px; right:16px; font-size:10px; font-weight:600; letter-spacing:0.05em; padding:3px 10px; border-radius:100px; }
        .tp-card-icon { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:18px; }
        .tp-card-name { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; color:#fff; letter-spacing:-0.01em; margin-bottom:8px; }
        .tp-card-desc { font-size:13px; color:#555; line-height:1.6; margin-bottom:20px; font-weight:300; }
        .tp-card-footer { display:flex; align-items:center; justify-content:space-between; }
        .tp-card-limit { font-size:11px; color:#3a3a3a; letter-spacing:0.03em; }
        .tp-card-cta { font-size:12px; font-weight:600; display:flex; align-items:center; gap:4px; transition:gap 0.2s; }
        .tp-card:hover .tp-card-cta { gap:8px; }

        /* CHAT SCREEN */
        .tp-chat { max-width:720px; margin:0 auto; padding:20px 16px 40px; display:flex; flex-direction:column; min-height:calc(100vh - 65px); }
        .tp-chat-window { background:#0f0f0f; border:1px solid #1e1e1e; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; flex:1; box-shadow:0 0 0 1px rgba(255,255,255,0.03),0 32px 80px rgba(0,0,0,0.6); }
        .tp-chat-header { padding:16px 20px; border-bottom:1px solid #1e1e1e; display:flex; align-items:center; gap:12px; background:#141414; }
        .tp-chat-icon { width:38px; height:38px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
        .tp-chat-name { font-family:'Syne',sans-serif; font-size:14px; font-weight:600; color:#fff; }
        .tp-chat-desc { font-size:11px; color:#555; margin-top:1px; }
        .tp-chat-status { display:flex; align-items:center; gap:5px; font-size:11px; color:#3a3a3a; margin-left:auto; }
        .tp-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:blink 2s ease infinite; }
        .tp-messages { flex:1; min-height:300px; max-height:calc(100vh - 280px); overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:16px; scrollbar-width:thin; scrollbar-color:#222 transparent; }
        .tp-messages::-webkit-scrollbar { width:3px; }
        .tp-messages::-webkit-scrollbar-thumb { background:#222; border-radius:3px; }
        .tp-msg { display:flex; gap:8px; animation:fadeUp 0.25s ease both; }
        .tp-msg.user { flex-direction:row-reverse; }
        .tp-msg.user .tp-msg-body { align-items:flex-end; }
        .tp-avatar { width:28px; height:28px; border-radius:8px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:14px; margin-top:2px; }
        .tp-msg-body { display:flex; flex-direction:column; gap:4px; max-width:84%; }
        .tp-msg-name { font-size:10px; font-weight:500; color:#3a3a3a; letter-spacing:0.05em; text-transform:uppercase; }
        .tp-bubble { font-size:14px; line-height:1.65; color:#b0b0b0; background:#111; border:1px solid #1d1d1d; border-radius:4px 12px 12px 12px; padding:11px 14px; white-space:pre-wrap; }
        .tp-msg.user .tp-bubble { border-radius:12px 4px 12px 12px; color:#ddd; }
        .tp-chips { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
        .tp-chip { font-size:12px; border-radius:100px; padding:5px 12px; cursor:pointer; transition:all 0.15s; border:1px solid; font-family:'DM Sans',sans-serif; }
        .tp-chip:hover { transform:translateY(-1px); }
        .tp-typing { display:flex; gap:4px; align-items:center; padding:4px 0; }
        .tp-typing span { width:5px; height:5px; border-radius:50%; background:#3a3a3a; animation:bounce 1.2s ease infinite; }
        .tp-typing span:nth-child(2) { animation-delay:0.2s; }
        .tp-typing span:nth-child(3) { animation-delay:0.4s; }
        .tp-input-area { border-top:1px solid #1e1e1e; padding:14px 16px; background:#080808; }
        .tp-input-row { display:flex; align-items:flex-end; gap:8px; }
        .tp-input-wrap { flex:1; background:#0f0f0f; border:1px solid #222; border-radius:12px; padding:10px 14px; transition:border-color 0.2s; }
        .tp-textarea { width:100%; background:none; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:14px; color:#ccc; resize:none; line-height:1.55; max-height:100px; min-height:20px; overflow-y:auto; }
        .tp-textarea::placeholder { color:#2e2e2e; }
        .tp-send { width:34px; height:34px; border-radius:9px; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:opacity 0.15s,transform 0.1s; }
        .tp-send:hover { opacity:0.82; transform:scale(0.96); }
        .tp-hint { text-align:center; font-size:11px; color:#2a2a2a; margin-top:8px; }
        .tp-demo-banner { background:rgba(34,211,238,0.05); border:1px solid rgba(34,211,238,0.15); border-radius:12px; padding:14px 18px; margin-bottom:12px; text-align:center; }

        /* GATE */
        .tp-gate { position:fixed; inset:0; background:rgba(0,0,0,0.8); backdrop-filter:blur(8px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
        .tp-gate-modal { background:#0f0f0f; border:1px solid #222; border-radius:20px; padding:36px 32px; width:100%; max-width:440px; text-align:center; box-shadow:0 40px 100px rgba(0,0,0,0.8); animation:slideUp 0.3s cubic-bezier(0.16,1,0.3,1); max-height:90vh; overflow-y:auto; }
        .tp-gate-icon { width:56px; height:56px; border-radius:16px; background:rgba(167,139,250,0.10); border:1px solid rgba(167,139,250,0.18); display:flex; align-items:center; justify-content:center; font-size:26px; margin:0 auto 20px; }
        .tp-gate-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:#fff; margin-bottom:8px; }
        .tp-gate-sub { font-size:14px; color:#555; line-height:1.6; margin-bottom:24px; }
        .tp-gate-sub strong { color:#a78bfa; }
        .tp-gate-perks { display:flex; flex-direction:column; gap:8px; margin-bottom:24px; text-align:left; }
        .tp-gate-perk { display:flex; align-items:center; gap:10px; font-size:13px; color:#777; }
        .tp-gate-perk-dot { width:6px; height:6px; border-radius:50%; background:#a78bfa; flex-shrink:0; }
        .tp-gate-input { width:100%; background:#111; border:1px solid #242424; border-radius:10px; padding:12px 16px; font-family:'DM Sans',sans-serif; font-size:14px; color:#ccc; outline:none; transition:border-color 0.2s; margin-bottom:8px; }
        .tp-gate-input::placeholder { color:#333; }
        .tp-gate-input:focus { border-color:#a78bfa; }
        .tp-gate-input.error { border-color:#f87171; }
        .tp-gate-error { font-size:12px; color:#f87171; margin-bottom:8px; text-align:left; }
        .tp-phone-row { display:flex; gap:8px; margin-bottom:8px; }
        .tp-country-btn { background:#111; border:1px solid #242424; border-radius:10px; padding:12px 10px; color:#ccc; cursor:pointer; font-size:13px; white-space:nowrap; display:flex; align-items:center; gap:5px; flex-shrink:0; transition:border-color 0.2s; }
        .tp-country-btn:hover { border-color:#a78bfa; }
        .tp-country-dropdown { position:absolute; top:100%; left:0; right:0; background:#1a1a1a; border:1px solid #333; border-radius:10px; max-height:180px; overflow-y:auto; z-index:200; margin-top:4px; }
        .tp-country-option { padding:10px 14px; cursor:pointer; font-size:13px; color:#ccc; display:flex; align-items:center; gap:8px; }
        .tp-country-option:hover { background:#222; color:#fff; }
        .tp-gate-btn { width:100%; background:linear-gradient(135deg,#a78bfa,#8b5cf6); border:none; border-radius:10px; padding:13px; font-family:'Syne',sans-serif; font-size:14px; font-weight:600; color:#fff; cursor:pointer; transition:opacity 0.15s,transform 0.1s; margin-top:4px; }
        .tp-gate-btn:hover { opacity:0.88; transform:translateY(-1px); }
        .tp-gate-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .tp-gate-fine { font-size:11px; color:#2e2e2e; margin-top:12px; }
        .tp-success-icon { width:52px; height:52px; border-radius:50%; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.2); display:flex; align-items:center; justify-content:center; font-size:22px; margin:0 auto 16px; }

        /* UPGRADE */
        .tp-upgrade { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(6px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
        .tp-upgrade-modal { background:#0f0f0f; border:1px solid #222; border-radius:20px; padding:36px 32px; width:100%; max-width:400px; text-align:center; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        @media(max-width:600px) {
          .tp-grid { grid-template-columns:1fr; }
          .tp-landing { padding:40px 16px 60px; }
          .tp-gate-modal { padding:28px 20px; }
          .tp-chat { padding:12px 12px 32px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="tp-nav">
        <a href="/" className="tp-logo">∂</a>
        {screen === "chat" ? (
          <button className="tp-back-btn" onClick={goBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            All Tools
          </button>
        ) : (
          <a href="/" className="tp-back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Unico
          </a>
        )}
      </nav>

      {/* LANDING SCREEN */}
      {screen === "landing" && (
        <div className="tp-landing">
          <div className="tp-hero">
            <div className="tp-badge">Free AI Tools by Unico Studios</div>
            <h1 className="tp-h1">AI Tools That<br /><span>Actually Work</span></h1>
            <p className="tp-sub">Pick a tool and get started — completely free. Built for founders, startups and brands.</p>
          </div>
          <div className="tp-grid">
            {Object.values(TOOLS).map((t) => (
              <div key={t.id} className="tp-card" onClick={() => openTool(t.id)}
                style={{ "--tool-color": t.color }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.color + "44"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1e1e1e"; }}>
                {t.tag && (
                  <div className="tp-card-tag" style={{ background: t.bgActive, color: t.color, border: `1px solid ${t.borderFaint}` }}>
                    {t.tag}
                  </div>
                )}
                <div className="tp-card-icon" style={{ background: t.headerBg, border: `1px solid ${t.borderFaint}` }}>
                  {t.icon}
                </div>
                <div className="tp-card-name">{t.name}</div>
                <div className="tp-card-desc">{t.longDesc}</div>
                <div className="tp-card-footer">
                  <div className="tp-card-limit" style={{ color: "#3a3a3a" }}>
                    {t.limit === 3 ? "3 free audits" : t.limit === 50 ? "50 free messages" : "10 free messages"}
                  </div>
                  <div className="tp-card-cta" style={{ color: t.color }}>
                    Try it free →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHAT SCREEN */}
      {screen === "chat" && tool && (
        <div className="tp-chat">
          <div className="tp-chat-window">
            <div className="tp-chat-header">
              <div className="tp-chat-icon" style={{ background: tool.headerBg, border: `1px solid ${tool.borderFaint}` }}>{tool.icon}</div>
              <div>
                <div className="tp-chat-name">{tool.name}</div>
                <div className="tp-chat-desc">{tool.desc}</div>
              </div>
              <div className="tp-chat-status"><div className="tp-dot" />Live</div>
            </div>
            <div className="tp-messages">
              {demoCompleted && currentTool === "niquo" && (
                <div className="tp-demo-banner">
                  <p style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 6 }}>⚡ Demo Complete!</p>
                  <p style={{ color: "#555", fontSize: 13, marginBottom: 10 }}>Ready to build this for your business?</p>
                  <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", padding: "8px 18px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 8, color: "#22d3ee", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                    📅 Book a Free Call with Saurav →
                  </a>
                </div>
              )}
              <div className="tp-msg">
                <div className="tp-avatar" style={{ background: tool.headerBg }}>{tool.icon}</div>
                <div className="tp-msg-body">
                  <div className="tp-msg-name">{tool.shortName}</div>
                  <div className="tp-bubble">{tool.greeting}</div>
                  <div className="tp-chips">
                    {tool.chips.map((chip) => (
                      <span key={chip} className="tp-chip" onClick={() => { if (!showGate) sendMessage(chip); }}
                        style={{ color: tool.color, background: tool.chipBg, borderColor: tool.chipBorder }}>
                        ↗ {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {currentMessages.map((msg, i) => (
                <div key={i} className={`tp-msg ${msg.role === "user" ? "user" : ""}`}>
                  <div className="tp-avatar" style={{ background: msg.role === "user" ? "rgba(255,255,255,0.04)" : tool.headerBg }}>
                    {msg.role === "user" ? "👤" : tool.icon}
                  </div>
                  <div className="tp-msg-body">
                    <div className="tp-msg-name">{msg.role === "user" ? "You" : tool.shortName}</div>
                    <div className="tp-bubble" style={msg.role === "user" ? { background: tool.userBg, borderColor: tool.borderActive, color: "#ddd", borderRadius: "12px 4px 12px 12px" } : {}}>
                      {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, j) =>
                        part.match(/^https?:\/\//) ? (
                          <a key={j} href={part} target="_blank" rel="noopener noreferrer"
                            style={{ color: tool.color, textDecoration: "underline", display: "block", marginTop: 4, fontWeight: 600 }}>
                            👉 Click here to book your call
                          </a>
                        ) : <span key={j}>{part}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="tp-msg">
                  <div className="tp-avatar" style={{ background: tool.headerBg }}>{tool.icon}</div>
                  <div className="tp-msg-body">
                    <div className="tp-msg-name">{tool.shortName}</div>
                    <div className="tp-bubble"><div className="tp-typing"><span /><span /><span /></div></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="tp-input-area">
              <div className="tp-input-row">
                <div className="tp-input-wrap" style={{ borderColor: input ? tool.color : "#222" }}>
                  <textarea ref={textareaRef} className="tp-textarea" rows={1} value={input}
                    onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"; }}
                    onKeyDown={handleKeyDown} placeholder="Type your message…" />
                </div>
                <button className="tp-send" style={{ background: tool.color }} onClick={() => sendMessage()}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
              <p className="tp-hint">{email ? `${currentLimit - currentUses} free uses remaining` : "Free · No credit card · No spam"}</p>
            </div>
          </div>
        </div>
      )}

      {/* GATE */}
      {showGate && (
        <div className="tp-gate">
          <div className="tp-gate-modal">
            {!gateSuccess ? (
              <>
                <div className="tp-gate-icon">🚀</div>
                <h2 className="tp-gate-title">Get Free Access</h2>
                <p className="tp-gate-sub">Enter your details to unlock <strong>all 4 AI tools</strong> — completely free.</p>
                <div className="tp-gate-perks">
                  <div className="tp-gate-perk"><div className="tp-gate-perk-dot" />Access all 4 AI tools instantly</div>
                  <div className="tp-gate-perk"><div className="tp-gate-perk-dot" />New tools added every month</div>
                  <div className="tp-gate-perk"><div className="tp-gate-perk-dot" />Early access to Unico product drops</div>
                </div>
                <input type="email" className={`tp-gate-input ${emailError ? "error" : ""}`}
                  placeholder="your@email.com" value={emailInput}
                  onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  autoComplete="email" autoFocus />
                {emailError && <p className="tp-gate-error">⚠️ {emailError}</p>}
                <div style={{ position: "relative" }}>
                  <div className="tp-phone-row">
                    <button className="tp-country-btn" onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                      {selectedCountry.flag} {selectedCountry.code} ▾
                    </button>
                    <input type="tel" className={`tp-gate-input ${phoneError ? "error" : ""}`}
                      style={{ margin: 0, flex: 1 }}
                      placeholder="Phone number" value={phoneInput}
                      onChange={(e) => { setPhoneInput(e.target.value.replace(/\D/g, "")); setPhoneError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      autoComplete="tel" />
                  </div>
                  {showCountryDropdown && (
                    <div className="tp-country-dropdown">
                      {COUNTRIES.map((c) => (
                        <div key={c.code} className="tp-country-option"
                          onClick={() => { setSelectedCountry(c); setShowCountryDropdown(false); }}>
                          {c.flag} {c.name} ({c.code})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {phoneError && <p className="tp-gate-error">⚠️ {phoneError}</p>}
                <button className="tp-gate-btn" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Getting access..." : "→ Unlock Free Access"}
                </button>
                <p className="tp-gate-fine">No spam. No credit card. Just free tools.</p>
              </>
            ) : (
              <>
                <div className="tp-success-icon">✓</div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>You're in! 🎉</h2>
                <p style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>Welcome to Unico Tools. Pick a tool and let's get to work!</p>
                <button className="tp-gate-btn" onClick={closeGate}>Explore the Tools →</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* UPGRADE */}
      {showUpgrade && tool && (
        <div className="tp-upgrade">
          <div className="tp-upgrade-modal">
            <div style={{ fontSize: 44, marginBottom: 14 }}>🔥</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 10 }}>
              {currentTool === "niquo" ? "You've seen what Niquo can do!" : currentTool === "audit" ? "Audit complete!" : "You're on a roll!"}
            </h2>
            <p style={{ color: "#555", marginBottom: 22, lineHeight: 1.6, fontSize: 14 }}>
              {currentTool === "niquo" ? "Ready to build this for your business?" : currentTool === "audit" ? "Want us to fix everything in your audit?" : "Upgrade to keep going!"}
            </p>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", width: "100%", padding: 13, background: tool.color, borderRadius: 12, color: "#000", fontSize: 15, fontWeight: 600, textDecoration: "none", textAlign: "center", marginBottom: 10 }}>
              📅 Book a Free Call with Saurav
            </a>
            <button style={{ width: "100%", padding: 13, background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, color: "#fff", fontSize: 14, cursor: "pointer", marginBottom: 10 }}>
              🚀 Upgrade — Coming Soon
            </button>
            <button onClick={() => setShowUpgrade(false)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 13 }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
