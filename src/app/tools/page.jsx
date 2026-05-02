No! The `otp/route.js` is already created and ready. 

Now I need to give you the updated `tools/page.jsx` with:
- Country code selector
- OTP send + verify flow
- Country auto-detection from country code

This is a big file so let me build it properly. Here is the complete `src/app/tools/page.jsx`:

```jsx
"use client";
import { useState, useRef, useEffect } from "react";

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
  { code: "+82", name: "South Korea", flag: "🇰🇷", country: "South Korea" },
  { code: "+55", name: "Brazil", flag: "🇧🇷", country: "Brazil" },
  { code: "+52", name: "Mexico", flag: "🇲🇽", country: "Mexico" },
  { code: "+27", name: "South Africa", flag: "🇿🇦", country: "South Africa" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", country: "Nigeria" },
  { code: "+20", name: "Egypt", flag: "🇪🇬", country: "Egypt" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "+90", name: "Turkey", flag: "🇹🇷", country: "Turkey" },
  { code: "+7", name: "Russia", flag: "🇷🇺", country: "Russia" },
  { code: "+86", name: "China", flag: "🇨🇳", country: "China" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩", country: "Indonesia" },
  { code: "+63", name: "Philippines", flag: "🇵🇭", country: "Philippines" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰", country: "Pakistan" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩", country: "Bangladesh" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰", country: "Sri Lanka" },
  { code: "+977", name: "Nepal", flag: "🇳🇵", country: "Nepal" },
];

const TOOLS = {
  content: {
    id: "content",
    name: "Startup Content Engine",
    shortName: "Content Engine",
    desc: "Hooks, scripts, reels & CTAs — all done for you",
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
  },
  code: {
    id: "code",
    name: "Vibe Code Fixer",
    shortName: "Vibe Code Fixer",
    desc: "Paste messy code, get back clean production-ready code",
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
  },
  niquo: {
    id: "niquo",
    name: "Niquo — AI Sales Demo",
    shortName: "Niquo",
    desc: "See how AI closes clients for your specific business",
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
  },
};

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export default function ToolsPage() {
  const [currentTool, setCurrentTool] = useState("content");
  const [messages, setMessages] = useState({ content: [], code: [], niquo: [] });
  const [uses, setUses] = useState({ content: 0, code: 0, niquo: 0 });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [phoneInput, setPhoneInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showGate, setShowGate] = useState(true);
  const [gateStep, setGateStep] = useState("details");
  const [submitting, setSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
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

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const tool = TOOLS[currentTool];
  const currentUses = uses[currentTool];
  const currentLimit = tool.limit;
  const fullPhone = `${selectedCountry.code}${phoneInput}`;

  const handleSendOTP = async () => {
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
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", phone: fullPhone }),
      });
      const data = await res.json();
      if (data.success) {
        setGateStep("otp");
        setResendTimer(60);
      } else {
        setPhoneError(data.error || "Failed to send OTP. Please try again.");
      }
    } catch {
      setPhoneError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const handleVerifyOTP = async () => {
    setOtpError("");
    if (!otpInput || otpInput.length !== 6) { setOtpError("Please enter the 6-digit OTP"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", phone: fullPhone, otp: otpInput }),
      });
      const data = await res.json();
      if (data.success) {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailInput,
            phone: fullPhone,
            tool: tool.name,
            country: selectedCountry.country,
          }),
        });
        sessionStorage.setItem("unico_tools_email", emailInput);
        sessionStorage.setItem("unico_tools_time", Date.now().toString());
        setEmail(emailInput);
        setGateStep("success");
      } else {
        setOtpError(data.error || "Incorrect OTP. Please try again.");
      }
    } catch {
      setOtpError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  const closeGate = () => {
    setShowGate(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
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

  const currentMessages = messages[currentTool];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
        .tools-page * { box-sizing: border-box; }
        .tools-page { min-height:100vh; background:#080808; color:#e8e8e8; font-family:'DM Sans',sans-serif; -webkit-font-smoothing:antialiased; display:flex; flex-direction:column; align-items:center; padding:40px 20px 60px; }
        .t-nav { width:100%; max-width:900px; display:flex; align-items:center; justify-content:space-between; margin-bottom:56px; }
        .t-logo { font-family:'Syne',sans-serif; font-size:20px; font-weight:700; color:#fff; letter-spacing:-1px; }
        .t-back { font-size:13px; color:#555; text-decoration:none; display:flex; align-items:center; gap:6px; transition:color 0.2s; }
        .t-back:hover { color:#e8e8e8; }
        .t-hero { text-align:center; margin-bottom:48px; }
        .t-badge { display:inline-flex; align-items:center; gap:7px; font-size:12px; font-weight:500; letter-spacing:0.04em; color:#a78bfa; background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.18); border-radius:100px; padding:5px 14px; margin-bottom:20px; }
        .t-badge::before { content:''; width:6px; height:6px; border-radius:50%; background:#a78bfa; }
        .t-title { font-family:'Syne',sans-serif; font-size:clamp(28px,5vw,52px); font-weight:700; letter-spacing:-0.03em; line-height:1.1; color:#fff; margin-bottom:14px; }
        .t-title span { background:linear-gradient(135deg,#a78bfa 0%,#f472b6 50%,#22d3ee 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .t-sub { font-size:16px; color:#555; font-weight:300; max-width:400px; margin:0 auto; line-height:1.6; }
        .t-selector { display:flex; gap:10px; margin-bottom:28px; background:#0f0f0f; border:1px solid #1e1e1e; border-radius:14px; padding:6px; }
        .t-btn { display:flex; align-items:center; gap:8px; padding:10px 18px; border-radius:10px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; color:#555; background:none; border:none; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
        .t-btn:hover { color:#aaa; }
        .t-window { width:100%; max-width:720px; background:#0f0f0f; border:1px solid #1e1e1e; border-radius:20px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 0 0 1px rgba(255,255,255,0.03),0 32px 80px rgba(0,0,0,0.6); }
        .t-header { padding:18px 22px; border-bottom:1px solid #1e1e1e; display:flex; align-items:center; gap:14px; background:#141414; }
        .t-header-icon { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
        .t-header-name { font-family:'Syne',sans-serif; font-size:15px; font-weight:600; color:#fff; letter-spacing:-0.01em; }
        .t-header-desc { font-size:12px; color:#555; margin-top:2px; font-weight:300; }
        .t-status { display:flex; align-items:center; gap:6px; font-size:12px; color:#3a3a3a; margin-left:auto; }
        .t-dot { width:7px; height:7px; border-radius:50%; background:#22c55e; animation:blink 2s ease infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .t-messages { flex:1; min-height:360px; max-height:500px; overflow-y:auto; padding:24px 22px; display:flex; flex-direction:column; gap:18px; scrollbar-width:thin; scrollbar-color:#222 transparent; }
        .t-messages::-webkit-scrollbar { width:4px; }
        .t-messages::-webkit-scrollbar-thumb { background:#222; border-radius:4px; }
        .t-msg { display:flex; gap:10px; animation:fadeUp 0.25s ease both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .t-msg.user { flex-direction:row-reverse; }
        .t-msg.user .t-msg-body { align-items:flex-end; }
        .t-avatar { width:30px; height:30px; border-radius:9px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:15px; margin-top:2px; }
        .t-msg-body { display:flex; flex-direction:column; gap:5px; max-width:82%; }
        .t-msg-name { font-size:11px; font-weight:500; color:#3a3a3a; letter-spacing:0.05em; text-transform:uppercase; }
        .t-bubble { font-size:14px; line-height:1.65; color:#b0b0b0; background:#111; border:1px solid #1d1d1d; border-radius:4px 12px 12px 12px; padding:12px 15px; white-space:pre-wrap; }
        .t-msg.user .t-bubble { border-radius:12px 4px 12px 12px; color:#ddd; }
        .t-chips { display:flex; flex-wrap:wrap; gap:7px; margin-top:10px; }
        .t-chip { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:400; border-radius:100px; padding:6px 13px; cursor:pointer; transition:background 0.15s,transform 0.1s; white-space:nowrap; letter-spacing:0.01em; border:1px solid; }
        .t-chip:hover { transform:translateY(-1px); }
        .t-typing { display:flex; gap:4px; align-items:center; padding:4px 0; }
        .t-typing span { width:5px; height:5px; border-radius:50%; background:#3a3a3a; animation:bounce 1.2s ease infinite; }
        .t-typing span:nth-child(2) { animation-delay:0.2s; }
        .t-typing span:nth-child(3) { animation-delay:0.4s; }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        .t-input-area { border-top:1px solid #1e1e1e; padding:16px 18px; background:#080808; }
        .t-input-row { display:flex; align-items:flex-end; gap:10px; }
        .t-input-wrap { flex:1; background:#0f0f0f; border:1px solid #222; border-radius:12px; padding:11px 14px; transition:border-color 0.2s; }
        .t-textarea { width:100%; background:none; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:14px; color:#ccc; resize:none; line-height:1.55; max-height:120px; min-height:22px; overflow-y:auto; }
        .t-textarea::placeholder { color:#2e2e2e; }
        .t-send { width:36px; height:36px; border-radius:9px; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:opacity 0.15s,transform 0.1s; }
        .t-send:hover { opacity:0.82; transform:scale(0.96); }
        .t-hint { text-align:center; font-size:11px; color:#2a2a2a; margin-top:10px; letter-spacing:0.03em; }
        .t-gate { position:fixed; inset:0; background:rgba(0,0,0,0.75); backdrop-filter:blur(6px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; animation:fadeIn 0.2s ease; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .t-gate-modal { background:#0f0f0f; border:1px solid #222; border-radius:20px; padding:40px 36px; width:100%; max-width:440px; text-align:center; box-shadow:0 0 0 1px rgba(255,255,255,0.04),0 40px 100px rgba(0,0,0,0.8); animation:slideUp 0.3s cubic-bezier(0.16,1,0.3,1); }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .t-gate-icon { width:60px; height:60px; border-radius:16px; background:rgba(167,139,250,0.10); border:1px solid rgba(167,139,250,0.18); display:flex; align-items:center; justify-content:center; font-size:28px; margin:0 auto 22px; }
        .t-gate-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:#fff; letter-spacing:-0.02em; margin-bottom:10px; }
        .t-gate-sub { font-size:14px; color:#555; line-height:1.6; margin-bottom:24px; font-weight:300; }
        .t-gate-sub strong { color:#a78bfa; font-weight:500; }
        .t-gate-input { width:100%; background:#111; border:1px solid #242424; border-radius:10px; padding:13px 16px; font-family:'DM Sans',sans-serif; font-size:14px; color:#ccc; outline:none; transition:border-color 0.2s; margin-bottom:8px; }
        .t-gate-input::placeholder { color:#333; }
        .t-gate-input:focus { border-color:#a78bfa; }
        .t-gate-input.error { border-color:#f87171; }
        .t-gate-error { font-size:12px; color:#f87171; margin-bottom:8px; text-align:left; }
        .t-gate-btn { width:100%; background:linear-gradient(135deg,#a78bfa 0%,#8b5cf6 100%); border:none; border-radius:10px; padding:13px 20px; font-family:'Syne',sans-serif; font-size:14px; font-weight:600; color:#fff; cursor:pointer; letter-spacing:0.01em; transition:opacity 0.15s,transform 0.1s; margin-top:4px; }
        .t-gate-btn:hover { opacity:0.88; transform:translateY(-1px); }
        .t-gate-btn:disabled { opacity:0.5; cursor:not-allowed; transform:none; }
        .t-gate-fine { font-size:11px; color:#2e2e2e; margin-top:14px; letter-spacing:0.03em; }
        .t-phone-row { display:flex; gap:8px; margin-bottom:8px; }
        .t-country-btn { background:#111; border:1px solid #242424; border-radius:10px; padding:13px 12px; color:#ccc; cursor:pointer; font-size:14px; white-space:nowrap; display:flex; align-items:center; gap:6px; transition:border-color 0.2s; flex-shrink:0; }
        .t-country-btn:hover { border-color:#a78bfa; }
        .t-country-dropdown { position:absolute; top:100%; left:0; right:0; background:#111; border:1px solid #333; border-radius:10px; max-height:200px; overflow-y:auto; z-index:200; margin-top:4px; }
        .t-country-option { padding:10px 14px; cursor:pointer; font-size:13px; color:#ccc; display:flex; align-items:center; gap:8px; transition:background 0.15s; }
        .t-country-option:hover { background:#1a1a1a; color:#fff; }
        .t-otp-input { width:100%; background:#111; border:1px solid #242424; border-radius:10px; padding:16px; font-family:'Syne',sans-serif; font-size:24px; color:#fff; outline:none; transition:border-color 0.2s; margin-bottom:8px; text-align:center; letter-spacing:8px; }
        .t-otp-input:focus { border-color:#a78bfa; }
        .t-otp-input.error { border-color:#f87171; }
        .t-resend { background:none; border:none; color:#555; cursor:pointer; font-size:13px; margin-top:8px; transition:color 0.2s; }
        .t-resend:hover { color:#a78bfa; }
        .t-success-icon { width:56px; height:56px; border-radius:50%; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.2); display:flex; align-items:center; justify-content:center; font-size:24px; margin:0 auto 18px; }
        .t-upgrade { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(6px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
        .t-upgrade-modal { background:#0f0f0f; border:1px solid #222; border-radius:20px; padding:40px 36px; width:100%; max-width:420px; text-align:center; }
        .t-demo-banner { background:rgba(34,211,238,0.05); border:1px solid rgba(34,211,238,0.15); border-radius:12px; padding:16px 20px; margin-bottom:16px; text-align:center; }
        @media(max-width:600px) { .t-selector{gap:4px;padding:4px;} .t-btn{padding:9px 12px;font-size:12px;} .t-gate-modal{padding:32px 24px;} }
      `}</style>

      <div className="tools-page">
        <nav className="t-nav">
          <div className="t-logo">∂</div>
          <a href="/" className="t-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Unico
          </a>
        </nav>
        <div className="t-hero">
          <div className="t-badge">Free AI Tools by Unico Studios</div>
          <h1 className="t-title">AI Tools That <span>Actually Work</span></h1>
          <p className="t-sub">Free tools built for founders, startups and brands who want to grow faster.</p>
        </div>
        <div className="t-selector">
          {Object.values(TOOLS).map((t) => (
            <button key={t.id} className="t-btn" onClick={() => setCurrentTool(t.id)}
              style={currentTool === t.id ? { background: t.bgActive, color: t.color, boxShadow: `0 0 0 1px ${t.borderActive}` } : {}}>
              {t.icon} {t.shortName}
              {currentTool === t.id && <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.color, marginLeft: 2 }} />}
            </button>
          ))}
        </div>
        <div className="t-window">
          <div className="t-header">
            <div className="t-header-icon" style={{ background: tool.headerBg, border: `1px solid ${tool.borderFaint}` }}>{tool.icon}</div>
            <div>
              <div className="t-header-name">{tool.name}</div>
              <div className="t-header-desc">{tool.desc}</div>
            </div>
            <div className="t-status"><div className="t-dot" />Live</div>
          </div>
          <div className="t-messages">
            {demoCompleted && currentTool === "niquo" && (
              <div className="t-demo-banner">
                <p style={{ color: "#22d3ee", fontWeight: 600, marginBottom: 8 }}>⚡ Demo Complete!</p>
                <p style={{ color: "#555", fontSize: 13 }}>Ready to build this for your business?</p>
                <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: 10, padding: "10px 20px", background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 8, color: "#22d3ee", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
                  📅 Book a Free Call with Naveen →
                </a>
              </div>
            )}
            <div className="t-msg">
              <div className="t-avatar" style={{ background: tool.headerBg }}>{tool.icon}</div>
              <div className="t-msg-body">
                <div className="t-msg-name">{tool.name}</div>
                <div className="t-bubble">{tool.greeting}</div>
                <div className="t-chips">
                  {tool.chips.map((chip) => (
                    <span key={chip} className="t-chip" onClick={() => { if (!showGate) sendMessage(chip); }}
                      style={{ color: tool.color, background: tool.chipBg, borderColor: tool.chipBorder }}>
                      ↗ {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {currentMessages.map((msg, i) => (
              <div key={i} className={`t-msg ${msg.role === "user" ? "user" : ""}`}>
                <div className="t-avatar" style={{ background: msg.role === "user" ? "rgba(255,255,255,0.04)" : tool.headerBg }}>
                  {msg.role === "user" ? "👤" : tool.icon}
                </div>
                <div className="t-msg-body">
                  <div className="t-msg-name">{msg.role === "user" ? "You" : tool.name}</div>
                  <div className="t-bubble" style={msg.role === "user" ? { background: tool.userBg, borderColor: tool.borderActive, color: "#ddd", borderRadius: "12px 4px 12px 12px" } : {}}>
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
              <div className="t-msg">
                <div className="t-avatar" style={{ background: tool.headerBg }}>{tool.icon}</div>
                <div className="t-msg-body">
                  <div className="t-msg-name">{tool.name}</div>
                  <div className="t-bubble"><div className="t-typing"><span /><span /><span /></div></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="t-input-area">
            <div className="t-input-row">
              <div className="t-input-wrap" style={{ borderColor: input ? tool.color : "#222" }}>
                <textarea ref={textareaRef} className="t-textarea" rows={1} value={input}
                  onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
                  onKeyDown={handleKeyDown} placeholder="Type your message…" />
              </div>
              <button className="t-send" style={{ background: tool.color }} onClick={() => sendMessage()}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="t-hint">{email ? `${currentLimit - currentUses} free uses remaining · ${tool.shortName}` : "Free · No credit card · No spam"}</p>
          </div>
        </div>
      </div>

      {showGate && (
        <div className="t-gate">
          <div className="t-gate-modal">
            {gateStep === "details" && (
              <>
                <div className="t-gate-icon">{tool.icon}</div>
                <h2 className="t-gate-title">Get Free Access</h2>
                <p className="t-gate-sub">Enter your details to unlock <strong>{tool.name}</strong> — completely free.</p>
                <input type="email" className={`t-gate-input ${emailError ? "error" : ""}`}
                  placeholder="your@email.com" value={emailInput}
                  onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }}
                  autoComplete="email" autoFocus />
                {emailError && <p className="t-gate-error">⚠️ {emailError}</p>}
                <div style={{ position: "relative" }}>
                  <div className="t-phone-row">
                    <button className="t-country-btn" onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                      {selectedCountry.flag} {selectedCountry.code} ▾
                    </button>
                    <input type="tel" className={`t-gate-input ${phoneError ? "error" : ""}`}
                      style={{ margin: 0, flex: 1 }}
                      placeholder="Phone number" value={phoneInput}
                      onChange={(e) => { setPhoneInput(e.target.value.replace(/\D/g, "")); setPhoneError(""); }}
                      autoComplete="tel" />
                  </div>
                  {showCountryDropdown && (
                    <div className="t-country-dropdown">
                      {COUNTRIES.map((c) => (
                        <div key={c.code} className="t-country-option"
                          onClick={() => { setSelectedCountry(c); setShowCountryDropdown(false); }}>
                          {c.flag} {c.name} ({c.code})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {phoneError && <p className="t-gate-error">⚠️ {phoneError}</p>}
                <button className="t-gate-btn" onClick={handleSendOTP} disabled={submitting}>
                  {submitting ? "Sending OTP..." : "→ Send Verification Code"}
                </button>
                <p className="t-gate-fine">We'll send a 6-digit OTP to verify your number.</p>
              </>
            )}

            {gateStep === "otp" && (
              <>
                <div className="t-gate-icon">📱</div>
                <h2 className="t-gate-title">Verify Your Number</h2>
                <p className="t-gate-sub">We sent a 6-digit code to <strong>{fullPhone}</strong></p>
                <input type="number" className={`t-otp-input ${otpError ? "error" : ""}`}
                  placeholder="000000" value={otpInput} maxLength={6}
                  onChange={(e) => { setOtpInput(e.target.value.slice(0, 6)); setOtpError(""); }}
                  autoFocus />
                {otpError && <p className="t-gate-error">⚠️ {otpError}</p>}
                <button className="t-gate-btn" onClick={handleVerifyOTP} disabled={submitting}>
                  {submitting ? "Verifying..." : "→ Verify & Get Access"}
                </button>
                <div style={{ marginTop: 12 }}>
                  {resendTimer > 0 ? (
                    <p style={{ color: "#555", fontSize: 13 }}>Resend OTP in {resendTimer}s</p>
                  ) : (
                    <button className="t-resend" onClick={() => { setGateStep("details"); setOtpInput(""); }}>
                      ← Change number or resend
                    </button>
                  )}
                </div>
                <button style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: 12, marginTop: 8 }}
                  onClick={() => setGateStep("details")}>
                  ← Go back
                </button>
              </>
            )}

            {gateStep === "success" && (
              <>
                <div className="t-success-icon">✓</div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                  You're verified! 🎉
                </h2>
                <p style={{ color: "#555", fontSize: 14, marginBottom: 24 }}>
                  Welcome to Unico Tools. Let's get to work!
                </p>
                <button className="t-gate-btn" onClick={closeGate}>
                  Start using {tool.shortName} →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showUpgrade && (
        <div className="t-upgrade">
          <div className="t-upgrade-modal">
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔥</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              {currentTool === "niquo" ? "You've seen what Niquo can do!" : "You're on a roll!"}
            </h2>
            <p style={{ color: "#555", marginBottom: 24, lineHeight: 1.6, fontSize: 14 }}>
              {currentTool === "niquo" ? "Ready to build this for your business?" : "Upgrade to keep going!"}
            </p>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", width: "100%", padding: 14, background: tool.color, borderRadius: 12, color: "#000", fontSize: 16, fontWeight: 600, textDecoration: "none", textAlign: "center", marginBottom: 12 }}>
              📅 Book a Free Call with Naveen
            </a>
            <button style={{ width: "100%", padding: 14, background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, color: "#fff", fontSize: 14, cursor: "pointer", marginBottom: 12 }}>
              🚀 Upgrade — Coming Soon
            </button>
            <button onClick={() => setShowUpgrade(false)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 14 }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
```

---

Also update `src/app/api/leads/route.js` to accept the `country` field:

```javascript
export async function POST(request) {
  try {
    const { email, phone, tool, returning, country } = await request.json();

    if (!email || !tool) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const date = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const checkRes = await fetch(
      `${process.env.SHEETDB_API_URL}/search?Email=${encodeURIComponent(email)}`,
      { headers: { "Accept": "application/json" } }
    );
    const existing = await checkRes.json();
    const isReturning = returning || (Array.isArray(existing) && existing.length > 0);

    const rowData = {
      Email: email,
      Phone: isReturning ? (existing[0]?.Phone || "Returning") : (phone || "Not provided"),
      Tool: tool,
      Date: date,
      Status: isReturning ? "Return Visit" : "New Lead",
      "Demo Completed": "No",
      Country: isReturning ? (existing[0]?.Country || "Unknown") : (country || "Unknown"),
    };

    console.log("Saving:", JSON.stringify(rowData));

    const sheetRes = await fetch(process.env.SHEETDB_API_URL, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ data: [rowData] }),
    });

    const result = await sheetRes.json();
    console.log("SheetDB:", JSON.stringify(result));

    return Response.json({ success: true, isReturning });

  } catch (error) {
    console.error("Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

Commit both files and tell me when done! 🚀
