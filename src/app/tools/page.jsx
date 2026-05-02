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
    greeting: `Hey! Before you even type anything — here's what I can do for your brand right now:

✍️ Hook #1 (Curiosity): "Nobody told me running a business in India looked like THIS until I tried it..."
✍️ Hook #2 (Pain): "If you're a founder and you're still posting generic content, this is going to hurt to watch."
✍️ Hook #3 (Result): "I went from 0 to 50,000 followers in 90 days — here's exactly what changed."

These are just samples. Tell me about YOUR business and I'll generate 3 hooks made specifically for your brand, your audience, your platform. What do you do?`,
    chips: ["I run a D2C skincare brand", "I have a SaaS product for HR teams", "I run a real estate agency", "I own a fashion brand on Instagram"],
    mode: "content",
    limit: 10,
    tag: "Most Popular",
    users: "2,847",
  },
  code: {
    id: "code",
    name: "Website & Landing Page Consultant",
    shortName: "Page Consultant",
    desc: "Fix your website or landing page — no tech skills needed",
    longDesc: "Not converting visitors? Get a plain-English diagnosis of exactly what's wrong with your website and how to fix it — from a senior digital strategist.",
    icon: "🌐",
    color: "#f472b6",
    bgActive: "rgba(244,114,182,0.08)",
    borderActive: "rgba(244,114,182,0.22)",
    borderFaint: "rgba(244,114,182,0.15)",
    headerBg: "rgba(244,114,182,0.10)",
    userBg: "rgba(244,114,182,0.06)",
    chipBg: "rgba(244,114,182,0.05)",
    chipBorder: "rgba(244,114,182,0.18)",
    greeting: `Most websites lose 80% of their visitors in the first 10 seconds. Not because the product is bad — because the website fails to communicate value fast enough.

I help business owners diagnose exactly what's broken and fix it — in plain English. No tech knowledge needed.

Share your website URL or describe what your site is supposed to do and I'll tell you exactly what's costing you leads.`,
    chips: ["My website isn't getting leads", "Review my landing page", "I want to build a new website", "Why isn't my site converting?"],
    mode: "code",
    limit: 10,
    tag: "For Founders",
    users: "1,923",
  },
  niquo: {
    id: "niquo",
    name: "Niquo — AI Sales Demo",
    shortName: "Niquo",
    desc: "See how AI closes clients for your specific business",
    longDesc: "Experience a live demo of an AI sales assistant built specifically for YOUR business. See how it handles objections and closes deals 24/7.",
    icon: "⚡",
    color: "#22d3ee",
    bgActive: "rgba(34,211,238,0.07)",
    borderActive: "rgba(34,211,238,0.20)",
    borderFaint: "rgba(34,211,238,0.13)",
    headerBg: "rgba(34,211,238,0.09)",
    userBg: "rgba(34,211,238,0.05)",
    chipBg: "rgba(34,211,238,0.04)",
    chipBorder: "rgba(34,211,238,0.16)",
    greeting: `Hi. I'm Niquo.

In the next 5 minutes, I'm going to show you exactly how an AI sales assistant would work for YOUR specific business — not a demo, not a simulation. A live, personalised experience.

I'll become your sales rep. I'll speak your customer's language. I'll handle the objections your team struggles with every day.

To start — tell me: what's your business, who's your customer, and what's the #1 reason deals fall through for you?`,
    chips: ["I run an e-commerce brand selling fashion", "I have a real estate agency in Bangalore", "I run a SaaS product for HR teams", "I own a restaurant chain"],
    mode: "niquo",
    limit: 50,
    tag: "🔥 Fan Favourite",
    users: "3,412",
  },
  audit: {
    id: "audit",
    name: "Website Revenue Audit",
    shortName: "Revenue Audit",
    desc: "Find out exactly how much revenue your website is losing",
    longDesc: "Get a brutal, no-sugarcoat audit of your website. Find out exactly where revenue is bleeding — with real ₹ numbers, real fixes and real competitor benchmarks.",
    icon: "🔍",
    color: "#fb923c",
    bgActive: "rgba(251,146,60,0.08)",
    borderActive: "rgba(251,146,60,0.22)",
    borderFaint: "rgba(251,146,60,0.15)",
    headerBg: "rgba(251,146,60,0.10)",
    userBg: "rgba(251,146,60,0.06)",
    chipBg: "rgba(251,146,60,0.05)",
    chipBorder: "rgba(251,146,60,0.18)",
    greeting: `I've audited 1000+ websites. The average business is bleeding ₹40,000–₹80,000 every month from 5 specific issues — and most owners have no idea.

Drop your website URL below.

I'll show you exactly where your revenue is bleeding, how much it's costing you per day, what your competitors are doing instead, and the exact fix for each issue.

No fluff. No generic advice. Just brutal, specific truth about YOUR website.`,
    chips: ["Audit unicostudios.in", "Audit my competitor's website", "Find my conversion killers", "How much revenue am I losing?"],
    mode: "audit",
    limit: 3,
    tag: "New ✨",
    users: "891",
  },
};

const PLANS = [
  {
    name: "Starter",
    price: "₹499",
    period: "/month",
    color: "#a78bfa",
    features: ["100 messages/month", "All 4 AI tools", "Priority responses", "Email support"],
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    color: "#22d3ee",
    features: ["Unlimited messages", "All 4 AI tools", "Fastest responses", "WhatsApp support", "New tools early access"],
    popular: true,
  },
  {
    name: "Agency",
    price: "₹2,999",
    period: "/month",
    color: "#fb923c",
    features: ["Unlimited everything", "5 team members", "Custom AI training", "Dedicated manager", "Monthly strategy call"],
  },
];

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
function LiveCounter({ base, delta, interval, prefix, suffix }) {
  const [value, setValue] = useState(base);
  const directionRef = useRef(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => {
        const change = Math.floor(Math.random() * delta) + 1;
        const next = prev + (directionRef.current * change);
        if (next > base + delta * 4) directionRef.current = -1;
        if (next < base - delta * 2) directionRef.current = 1;
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [base, delta, interval]);

  const formatted = value >= 1000 ? value.toLocaleString("en-IN") : value;
  return <span>{prefix}{formatted}{suffix}</span>;
}
export default function ToolsPage() {
  const [screen, setScreen] = useState("landing");
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
  const [auditPart1Done, setAuditPart1Done] = useState(false);
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
    setAuditPart1Done(false);
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
  const usagePercent = Math.round((currentUses / currentLimit) * 100);

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
      const reply = data.reply || "";
      setMessages((prev) => ({ ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: reply }] }));
      if (data.demoCompleted) setDemoCompleted(true);
      if (currentTool === "audit" && reply.includes("Want to see them?")) setAuditPart1Done(true);
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

        .tp-nav { width:100%; padding:18px 24px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #111; position:sticky; top:0; background:#080808; z-index:50; }
        .tp-logo { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; color:#fff; letter-spacing:-1px; text-decoration:none; }
        .tp-nav-right { display:flex; align-items:center; gap:16px; }
        .tp-back-btn { display:flex; align-items:center; gap:6px; font-size:13px; color:#555; background:none; border:none; cursor:pointer; transition:color 0.2s; padding:0; font-family:'DM Sans',sans-serif; }
        .tp-back-btn:hover { color:#e8e8e8; }
        .tp-nav-cta { font-size:12px; font-weight:600; color:#080808; background:#a78bfa; border:none; border-radius:8px; padding:7px 14px; cursor:pointer; font-family:'Syne',sans-serif; transition:opacity 0.15s; text-decoration:none; }
        .tp-nav-cta:hover { opacity:0.88; }

        .tp-landing { max-width:1000px; margin:0 auto; padding:56px 24px 80px; font-family:'DM Sans',sans-serif; }

        .tp-hero { text-align:center; margin-bottom:24px; }
        .tp-badge { display:inline-flex; align-items:center; gap:7px; font-size:12px; font-weight:500; letter-spacing:0.04em; color:#a78bfa; background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.18); border-radius:100px; padding:5px 14px; margin-bottom:20px; }
        .tp-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:#a78bfa; animation:blink 2s ease infinite; }
        .tp-h1 { font-family:'Syne',sans-serif; font-size:clamp(32px,5vw,58px); font-weight:700; letter-spacing:-0.02em; line-height:1.08; color:#fff; margin-bottom:16px; }
        .tp-h1 span { background:linear-gradient(90deg,#a78bfa 0%,#f472b6 60%,#22d3ee 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .tp-sub { font-size:17px; color:#555; font-weight:300; max-width:520px; margin:0 auto 32px; line-height:1.6; }

        .tp-stats { display:flex; align-items:center; justify-content:center; gap:32px; margin-bottom:56px; }
        .tp-stat { text-align:center; }
        .tp-stat-num { font-family:'Syne',sans-serif; font-size:24px; font-weight:700; color:#fff; letter-spacing:-0.01em; }
        .tp-stat-label { font-size:12px; color:#444; margin-top:2px; }
        .tp-stat-divider { width:1px; height:32px; background:#1e1e1e; }

        .tp-grid { display:grid; grid-template-columns:repeat(2, 1fr); gap:14px; margin-bottom:40px; }
        .tp-card { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:20px; padding:26px 22px; cursor:pointer; transition:all 0.3s; position:relative; overflow:hidden; }
        .tp-card::before { content:''; position:absolute; inset:0; opacity:0; transition:opacity 0.3s; border-radius:20px; }
        .tp-card:hover { transform:translateY(-4px); }
        .tp-card-tag { position:absolute; top:14px; right:14px; font-size:10px; font-weight:700; letter-spacing:0.06em; padding:3px 10px; border-radius:100px; }
        .tp-card-icon { width:50px; height:50px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:16px; }
        .tp-card-name { font-family:'Syne',sans-serif; font-size:16px; font-weight:700; color:#fff; letter-spacing:-0.01em; margin-bottom:6px; }
        .tp-card-desc { font-size:13px; color:#4a4a4a; line-height:1.6; margin-bottom:18px; font-weight:300; }
        .tp-card-footer { display:flex; align-items:center; justify-content:space-between; }
        .tp-card-users { font-size:11px; color:#333; display:flex; align-items:center; gap:4px; }
        .tp-card-users::before { content:''; width:5px; height:5px; border-radius:50%; background:#22c55e; display:inline-block; }
        .tp-card-cta { font-size:12px; font-weight:600; display:flex; align-items:center; gap:4px; transition:gap 0.2s; }
        .tp-card:hover .tp-card-cta { gap:8px; }

        .tp-social-proof { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:16px; padding:20px 24px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
        .tp-sp-text { font-size:13px; color:#555; line-height:1.5; }
        .tp-sp-text strong { color:#888; }
        .tp-sp-avatars { display:flex; }
        .tp-sp-avatar { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#a78bfa,#22d3ee); border:2px solid #080808; margin-left:-8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#fff; flex-shrink:0; }

        .tp-chat { max-width:740px; margin:0 auto; padding:20px 16px 40px; display:flex; flex-direction:column; min-height:calc(100vh - 65px); font-family:'DM Sans',sans-serif; }
        .tp-chat-window { background:#0d0d0d; border:1px solid #1a1a1a; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; flex:1; box-shadow:0 0 0 1px rgba(255,255,255,0.02),0 40px 100px rgba(0,0,0,0.7); }
        .tp-chat-header { padding:14px 18px; border-bottom:1px solid #1a1a1a; display:flex; align-items:center; gap:12px; background:#111; }
        .tp-chat-icon { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
        .tp-chat-info { flex:1; }
        .tp-chat-name { font-family:'Syne',sans-serif; font-size:14px; font-weight:600; color:#fff; }
        .tp-chat-desc { font-size:11px; color:#444; margin-top:1px; }
        .tp-chat-status { display:flex; align-items:center; gap:5px; font-size:11px; color:#333; }
        .tp-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:blink 2s ease infinite; }

        .tp-progress-bar { height:2px; background:#1a1a1a; position:relative; }
        .tp-progress-fill { height:100%; transition:width 0.5s ease; border-radius:0; }
        .tp-progress-label { position:absolute; right:12px; top:6px; font-size:10px; color:#333; }

        .tp-messages { flex:1; min-height:300px; max-height:calc(100vh - 300px); overflow-y:auto; padding:18px; display:flex; flex-direction:column; gap:14px; scrollbar-width:thin; scrollbar-color:#1a1a1a transparent; }
        .tp-messages::-webkit-scrollbar { width:3px; }
        .tp-messages::-webkit-scrollbar-thumb { background:#1a1a1a; border-radius:3px; }
        .tp-msg { display:flex; gap:8px; animation:fadeUp 0.25s ease both; }
        .tp-msg.user { flex-direction:row-reverse; }
        .tp-msg.user .tp-msg-body { align-items:flex-end; }
        .tp-avatar { width:26px; height:26px; border-radius:7px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:13px; margin-top:2px; }
        .tp-msg-body { display:flex; flex-direction:column; gap:3px; max-width:85%; }
        .tp-msg-name { font-size:10px; font-weight:500; color:#333; letter-spacing:0.06em; text-transform:uppercase; }
        .tp-bubble { font-size:14px; line-height:1.7; color:#aaa; background:#111; border:1px solid #1d1d1d; border-radius:4px 12px 12px 12px; padding:11px 14px; white-space:pre-wrap; }
        .tp-msg.user .tp-bubble { border-radius:12px 4px 12px 12px; color:#ddd; }
        .tp-chips { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
        .tp-chip { font-size:12px; border-radius:100px; padding:5px 12px; cursor:pointer; transition:all 0.15s; border:1px solid; font-family:'DM Sans',sans-serif; }
        .tp-chip:hover { transform:translateY(-1px); opacity:0.8; }
        .tp-typing { display:flex; gap:4px; align-items:center; padding:4px 0; }
        .tp-typing span { width:5px; height:5px; border-radius:50%; background:#333; animation:bounce 1.2s ease infinite; }
        .tp-typing span:nth-child(2) { animation-delay:0.2s; }
        .tp-typing span:nth-child(3) { animation-delay:0.4s; }

        .tp-banner { border-radius:12px; padding:14px 18px; margin-bottom:10px; text-align:center; }
        .tp-banner-title { font-weight:700; font-size:15px; margin-bottom:6px; }
        .tp-banner-sub { font-size:12px; margin-bottom:12px; }
        .tp-banner-btn { display:inline-block; padding:9px 20px; border-radius:8px; font-size:13px; font-weight:600; text-decoration:none; transition:opacity 0.15s; }
        .tp-banner-btn:hover { opacity:0.85; }

        .tp-input-area { border-top:1px solid #1a1a1a; padding:12px 14px; background:#080808; }
        .tp-input-row { display:flex; align-items:flex-end; gap:8px; }
        .tp-input-wrap { flex:1; background:#0d0d0d; border:1px solid #1a1a1a; border-radius:12px; padding:10px 14px; transition:border-color 0.2s; }
        .tp-textarea { width:100%; background:none; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:14px; color:#ccc; resize:none; line-height:1.55; max-height:100px; min-height:20px; overflow-y:auto; }
        .tp-textarea::placeholder { color:#252525; }
        .tp-send { width:34px; height:34px; border-radius:9px; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:opacity 0.15s,transform 0.1s; }
        .tp-send:hover { opacity:0.82; transform:scale(0.96); }
        .tp-hint { text-align:center; font-size:10px; color:#222; margin-top:8px; }

        .tp-gate { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
        .tp-gate-modal { background:#0d0d0d; border:1px solid #222; border-radius:24px; padding:36px 32px; width:100%; max-width:460px; text-align:center; box-shadow:0 60px 120px rgba(0,0,0,0.9); animation:slideUp 0.3s cubic-bezier(0.16,1,0.3,1); max-height:92vh; overflow-y:auto; }
        .tp-gate-icon { width:60px; height:60px; border-radius:18px; background:linear-gradient(135deg,rgba(167,139,250,0.15),rgba(34,211,238,0.1)); border:1px solid rgba(167,139,250,0.2); display:flex; align-items:center; justify-content:center; font-size:28px; margin:0 auto 22px; }
        .tp-gate-title { font-family:'Syne',sans-serif; font-size:24px; font-weight:800; color:#fff; margin-bottom:8px; letter-spacing:-0.02em; }
        .tp-gate-sub { font-size:14px; color:#555; line-height:1.6; margin-bottom:6px; }
        .tp-gate-sub strong { color:#a78bfa; }
        .tp-gate-value { font-size:12px; color:#333; margin-bottom:24px; }
        .tp-gate-perks { display:flex; flex-direction:column; gap:8px; margin-bottom:24px; text-align:left; background:#111; border-radius:12px; padding:16px; }
        .tp-gate-perk { display:flex; align-items:center; gap:10px; font-size:13px; color:#666; }
        .tp-gate-perk-icon { font-size:14px; flex-shrink:0; }
        .tp-gate-input { width:100%; background:#111; border:1px solid #222; border-radius:10px; padding:13px 16px; font-family:'DM Sans',sans-serif; font-size:14px; color:#ccc; outline:none; transition:border-color 0.2s; margin-bottom:8px; }
        .tp-gate-input::placeholder { color:#2a2a2a; }
        .tp-gate-input:focus { border-color:#a78bfa; }
        .tp-gate-input.error { border-color:#f87171; }
        .tp-gate-error { font-size:12px; color:#f87171; margin-bottom:8px; text-align:left; }
        .tp-phone-row { display:flex; gap:8px; margin-bottom:8px; }
        .tp-country-btn { background:#111; border:1px solid #222; border-radius:10px; padding:13px 10px; color:#ccc; cursor:pointer; font-size:13px; white-space:nowrap; display:flex; align-items:center; gap:5px; flex-shrink:0; transition:border-color 0.2s; }
        .tp-country-btn:hover { border-color:#a78bfa; }
        .tp-country-dropdown { position:absolute; top:100%; left:0; right:0; background:#161616; border:1px solid #2a2a2a; border-radius:10px; max-height:180px; overflow-y:auto; z-index:200; margin-top:4px; box-shadow:0 20px 40px rgba(0,0,0,0.5); }
        .tp-country-option { padding:10px 14px; cursor:pointer; font-size:13px; color:#aaa; display:flex; align-items:center; gap:8px; }
        .tp-country-option:hover { background:#1e1e1e; color:#fff; }
        .tp-gate-btn { width:100%; background:linear-gradient(135deg,#a78bfa,#8b5cf6); border:none; border-radius:12px; padding:14px; font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#fff; cursor:pointer; transition:opacity 0.15s,transform 0.1s; margin-top:4px; letter-spacing:0.01em; }
        .tp-gate-btn:hover { opacity:0.88; transform:translateY(-1px); }
        .tp-gate-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .tp-gate-fine { font-size:11px; color:#252525; margin-top:12px; }
        .tp-success-icon { width:56px; height:56px; border-radius:50%; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.25); display:flex; align-items:center; justify-content:center; font-size:24px; margin:0 auto 18px; }

        .tp-upgrade { position:fixed; inset:0; background:rgba(0,0,0,0.9); backdrop-filter:blur(10px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
        .tp-upgrade-modal { background:#0d0d0d; border:1px solid #1e1e1e; border-radius:24px; padding:32px 28px; width:100%; max-width:480px; text-align:center; max-height:92vh; overflow-y:auto; }
        .tp-upgrade-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:#fff; margin-bottom:8px; letter-spacing:-0.02em; }
        .tp-upgrade-sub { font-size:14px; color:#555; margin-bottom:28px; line-height:1.6; }
        .tp-plans { display:flex; flex-direction:column; gap:10px; margin-bottom:20px; }
        .tp-plan { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:16px 18px; text-align:left; cursor:pointer; transition:all 0.2s; position:relative; text-decoration:none; display:block; }
        .tp-plan:hover { border-color:#333; transform:translateY(-1px); }
        .tp-plan.popular { border-color:rgba(34,211,238,0.3); background:rgba(34,211,238,0.04); }
        .tp-plan-popular-tag { position:absolute; top:-8px; right:16px; font-size:10px; font-weight:700; background:#22d3ee; color:#000; padding:2px 10px; border-radius:100px; }
        .tp-plan-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .tp-plan-name { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; color:#fff; }
        .tp-plan-price { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; }
        .tp-plan-price span { font-size:11px; font-weight:400; color:#444; }
        .tp-plan-features { display:flex; flex-wrap:wrap; gap:6px; }
        .tp-plan-feature { font-size:11px; color:#555; background:#1a1a1a; padding:3px 8px; border-radius:100px; }
        .tp-or { font-size:12px; color:#333; margin:8px 0; }
        .tp-calendly-btn { display:block; width:100%; padding:13px; background:#1a1a1a; border:1px solid #2a2a2a; border-radius:12px; color:#fff; font-size:14px; font-weight:500; text-decoration:none; text-align:center; transition:background 0.15s; }
        .tp-calendly-btn:hover { background:#222; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        @media(max-width:640px) {
          .tp-grid { grid-template-columns:1fr; }
          .tp-landing { padding:32px 16px 60px; }
          .tp-gate-modal { padding:28px 20px; }
          .tp-chat { padding:10px 10px 28px; }
          .tp-stats { gap:20px; }
          .tp-stat-num { font-size:22px; }
          .tp-social-proof { flex-direction:column; text-align:center; }
          .tp-plans { gap:8px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="tp-nav">
        <a href="/" className="tp-logo">∂ Unico</a>
        <div className="tp-nav-right">
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
          <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="tp-nav-cta">
            Book a Call
          </a>
        </div>
      </nav>

      {/* LANDING */}
      {screen === "landing" && (
        <div className="tp-landing">
          <div className="tp-hero">
            <div className="tp-badge">Free AI Tools by Unico Studios</div>
            <h1 className="tp-h1">AI Tools That<br /><span>Actually Work</span></h1>
            <p className="tp-sub">4 free AI tools built for founders and brands who are serious about growth. No fluff. No generic output. Just results.</p>
          </div>

          {/* Stats */}
          <div className="tp-stats">
            <div className="tp-stat">
              <div className="tp-stat-num">
                <LiveCounter base={9073} delta={3} interval={2800} prefix="" suffix="" />
              </div>
              <div className="tp-stat-label">Founders using these tools</div>
            </div>
            <div className="tp-stat-divider" />
            <div className="tp-stat">
              <div className="tp-stat-num">
                <LiveCounter base={420} delta={2} interval={3200} prefix="₹" suffix="L" />
              </div>
              <div className="tp-stat-label">Revenue audited this month</div>
            </div>
            <div className="tp-stat-divider" />
            <div className="tp-stat">
              <div className="tp-stat-num">
                <LiveCounter base={340} delta={5} interval={2400} prefix="" suffix="%" />
              </div>
              <div className="tp-stat-label">Avg lead increase with Niquo</div>
            </div>
          </div>
          
          {/* Tool Cards */}
          <div className="tp-grid">
            {Object.values(TOOLS).map((t) => (
              <div key={t.id} className="tp-card" onClick={() => openTool(t.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = t.color + "55";
                  e.currentTarget.style.boxShadow = `0 20px 60px ${t.color}11`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#1a1a1a";
                  e.currentTarget.style.boxShadow = "none";
                }}>
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
                  <div className="tp-card-users" style={{ color: "#333" }}>
                    {t.users} using this
                  </div>
                  <div className="tp-card-cta" style={{ color: t.color }}>
                    Try free →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="tp-social-proof">
            <div className="tp-sp-avatars">
              {["S", "R", "A", "P", "M"].map((l, i) => (
                <div key={i} className="tp-sp-avatar" style={{ background: `linear-gradient(135deg, ${["#a78bfa","#f472b6","#22d3ee","#fb923c","#a78bfa"][i]}, ${["#8b5cf6","#e879f9","#06b6d4","#f97316","#8b5cf6"][i]})` }}>
                  {l}
                </div>
              ))}
            </div>
            <div className="tp-sp-text">
              <strong>9,073+ founders</strong> from India, UAE, Singapore and 18 other countries are already using these tools. Join them — it's completely free.
            </div>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
              style={{ flexShrink: 0, padding: "10px 20px", background: "linear-gradient(135deg,#a78bfa,#8b5cf6)", borderRadius: 10, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 700, fontFamily: "'Syne',sans-serif", whiteSpace: "nowrap" }}>
              Book a Call →
            </a>
          </div>
        </div>
      )}

      {/* CHAT SCREEN */}
      {screen === "chat" && tool && (
        <div className="tp-chat">
          <div className="tp-chat-window">
            {/* Header */}
            <div className="tp-chat-header">
              <div className="tp-chat-icon" style={{ background: tool.headerBg, border: `1px solid ${tool.borderFaint}` }}>{tool.icon}</div>
              <div className="tp-chat-info">
                <div className="tp-chat-name">{tool.name}</div>
                <div className="tp-chat-desc">{tool.users} founders have used this</div>
              </div>
              <div className="tp-chat-status"><div className="tp-dot" />Live</div>
            </div>

            {/* Usage Progress Bar */}
            {email && (
              <div className="tp-progress-bar">
                <div className="tp-progress-fill" style={{
                  width: `${usagePercent}%`,
                  background: usagePercent > 80 ? "#ef4444" : usagePercent > 50 ? tool.color : tool.color,
                  opacity: 0.7
                }} />
              </div>
            )}

            {/* Messages */}
            <div className="tp-messages">
              {/* Niquo demo completed banner */}
              {demoCompleted && currentTool === "niquo" && (
                <div className="tp-banner" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.2)" }}>
                  <div className="tp-banner-title" style={{ color: "#22d3ee" }}>⚡ Demo Complete!</div>
                  <div className="tp-banner-sub" style={{ color: "#555" }}>You just experienced what Niquo can do for YOUR business. Ready to make it real?</div>
                  <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
                    className="tp-banner-btn" style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee" }}>
                    📅 Book Your Free Call with Saurav →
                  </a>
                </div>
              )}

              {/* Audit Part 1 completed banner */}
              {auditPart1Done && currentTool === "audit" && !demoCompleted && (
                <div className="tp-banner" style={{ background: "rgba(251,146,60,0.05)", border: "1px solid rgba(251,146,60,0.2)" }}>
                  <div className="tp-banner-title" style={{ color: "#fb923c" }}>🔥 Part 1 Complete — 2 more bleeds to go</div>
                  <div className="tp-banner-sub" style={{ color: "#555" }}>Reply "yes" to see the 2 most critical issues — including the one that's costing you the most leads right now.</div>
                </div>
              )}

              {/* Greeting */}
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

              {/* Messages */}
              {currentMessages.map((msg, i) => (
                <div key={i} className={`tp-msg ${msg.role === "user" ? "user" : ""}`}>
                  <div className="tp-avatar" style={{ background: msg.role === "user" ? "rgba(255,255,255,0.03)" : tool.headerBg }}>
                    {msg.role === "user" ? "👤" : tool.icon}
                  </div>
                  <div className="tp-msg-body">
                    <div className="tp-msg-name">{msg.role === "user" ? "You" : tool.shortName}</div>
                    <div className="tp-bubble" style={msg.role === "user" ? { background: tool.userBg, borderColor: tool.borderActive, color: "#ddd", borderRadius: "12px 4px 12px 12px" } : {}}>
                      {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, j) =>
                        part.match(/^https?:\/\//) ? (
                          part.includes("calendly") ? (
                            <a key={j} href={part} target="_blank" rel="noopener noreferrer"
                              style={{ color: tool.color, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, padding: "8px 14px", background: tool.bgActive, border: `1px solid ${tool.borderActive}`, borderRadius: 8, fontWeight: 600, fontSize: 13 }}>
                              📅 Click here to book your call
                            </a>
                          ) : (
                            <a key={j} href={part} target="_blank" rel="noopener noreferrer"
                              style={{ color: tool.color, textDecoration: "underline" }}>
                              {part}
                            </a>
                          )
                        ) : <span key={j}>{part}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
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

            {/* Input */}
            <div className="tp-input-area">
              <div className="tp-input-row">
                <div className="tp-input-wrap" style={{ borderColor: input ? tool.color + "88" : "#1a1a1a" }}>
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
              <p className="tp-hint">
                {email ? `${currentLimit - currentUses} of ${currentLimit} free uses remaining · ${tool.shortName}` : "Free · No credit card · No spam ever"}
              </p>
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
                <h2 className="tp-gate-title">Unlock Free Access</h2>
                <p className="tp-gate-sub">Get instant access to <strong>all 4 AI tools</strong> — completely free.</p>
                <p className="tp-gate-value">Worth ₹15,000/month if you hired humans to do this.</p>
                <div className="tp-gate-perks">
                  <div className="tp-gate-perk"><span className="tp-gate-perk-icon">✍️</span> Startup Content Engine — viral hooks & scripts</div>
                  <div className="tp-gate-perk"><span className="tp-gate-perk-icon">🌐</span> Website Consultant — diagnose conversion issues</div>
                  <div className="tp-gate-perk"><span className="tp-gate-perk-icon">⚡</span> Niquo — live AI sales demo for your business</div>
                  <div className="tp-gate-perk"><span className="tp-gate-perk-icon">🔍</span> Revenue Audit — find your website's money leaks</div>
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
                  {submitting ? "Getting access..." : "→ Get Free Access Now"}
                </button>
                <p className="tp-gate-fine">🔒 No spam. No credit card. Unsubscribe anytime.</p>
              </>
            ) : (
              <>
                <div className="tp-success-icon">✓</div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}>Welcome to Unico Tools! 🎉</h2>
                <p style={{ color: "#555", fontSize: 14, marginBottom: 8, lineHeight: 1.6 }}>You now have access to 4 AI tools that most businesses pay ₹15,000/month for.</p>
                <p style={{ color: "#333", fontSize: 12, marginBottom: 28 }}>Check your email — we sent you a quick guide on how to get max value.</p>
                <button className="tp-gate-btn" onClick={closeGate}>Explore the Tools →</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* UPGRADE MODAL WITH PRICING */}
      {showUpgrade && tool && (
        <div className="tp-upgrade">
          <div className="tp-upgrade-modal">
            <div style={{ fontSize: 40, marginBottom: 12 }}>
              {currentTool === "niquo" ? "⚡" : currentTool === "audit" ? "🔍" : "🔥"}
            </div>
            <div className="tp-upgrade-title">
              {currentTool === "niquo" ? "You've seen what Niquo can do!" : currentTool === "audit" ? "Audit credits used up!" : "You've hit your free limit!"}
            </div>
            <div className="tp-upgrade-sub">
              {currentTool === "niquo" ? "Ready to build a custom AI sales system for your business?" : currentTool === "audit" ? "Want unlimited audits + all other tools?" : `Upgrade to keep using ${tool.name} and all other tools.`}
            </div>

            <div className="tp-plans">
              {PLANS.map((plan) => (
                <a key={plan.name} href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
                  className={`tp-plan ${plan.popular ? "popular" : ""}`}>
                  {plan.popular && <div className="tp-plan-popular-tag">MOST POPULAR</div>}
                  <div className="tp-plan-header">
                    <div className="tp-plan-name" style={{ color: plan.popular ? plan.color : "#fff" }}>{plan.name}</div>
                    <div className="tp-plan-price" style={{ color: plan.color }}>{plan.price}<span>{plan.period}</span></div>
                  </div>
                  <div className="tp-plan-features">
                    {plan.features.map((f) => (
                      <span key={f} className="tp-plan-feature">{f}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            <div className="tp-or">— or —</div>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="tp-calendly-btn">
              📅 Book a Free Strategy Call with Saurav Instead
            </a>
            <button onClick={() => setShowUpgrade(false)}
              style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 12, marginTop: 14, display: "block", width: "100%" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
