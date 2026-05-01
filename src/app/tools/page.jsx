"use client";
import { useState, useRef, useEffect } from "react";

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
    chipHover: "rgba(167,139,250,0.11)",
    greeting: "Hey! I generate high-conversion content for your startup — reel scripts, hook ideas, CTA lines, thumbnail concepts. What's your brand about?",
    chips: [
      "Write me a reel hook for a SaaS product",
      "Write 5 CTA lines for a landing page",
      "Write a 30-second reel script for a D2C brand",
      "Give me 3 thumbnail concepts for my startup",
    ],
    mode: "content",
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
    chipHover: "rgba(244,114,182,0.11)",
    greeting: "Paste your messy, broken, or unoptimized code and I'll give it back clean, readable, and production-ready. What are we fixing today?",
    chips: [
      "Fix the bugs in my JavaScript",
      "Clean up and optimize this React component",
      "Review my code architecture and suggest improvements",
      "Make this code faster and more performant",
    ],
    mode: "code",
  },
  aria: {
    id: "aria",
    name: "Aria — AI Sales Assistant",
    shortName: "Aria",
    desc: "Understands your business and helps you grow faster",
    icon: "🤖",
    color: "#22d3ee",
    bgActive: "rgba(34,211,238,0.07)",
    borderActive: "rgba(34,211,238,0.20)",
    borderFaint: "rgba(34,211,238,0.13)",
    headerBg: "rgba(34,211,238,0.09)",
    userBg: "rgba(34,211,238,0.05)",
    chipBg: "rgba(34,211,238,0.04)",
    chipBorder: "rgba(34,211,238,0.16)",
    chipHover: "rgba(34,211,238,0.09)",
    greeting: "Hi! I'm Aria, your AI sales assistant from Unico Studios. Tell me about your business and I'll help you with growth strategy, sales analysis, or booking a call with our team.",
    chips: [
      "Analyze my business and suggest growth strategies",
      "Help me build a sales strategy for my startup",
      "I want to book a free consultation with Unico",
      "What services does Unico Studios offer?",
    ],
    mode: "sales",
  },
};

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

export default function ToolsPage() {
  const [currentTool, setCurrentTool] = useState("content");
  const [messages, setMessages] = useState({
    content: [],
    code: [],
    aria: [],
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uses, setUses] = useState(0);
  const [email, setEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showGate, setShowGate] = useState(true);
  const [gateSuccess, setGateSuccess] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const FREE_LIMIT = 10;

  useEffect(() => {
    const saved = localStorage.getItem("unico_tools_email");
    if (saved) {
      setEmail(saved);
      setShowGate(false);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const tool = TOOLS[currentTool];

  const handleEmailSubmit = async () => {
    setEmailError("");
    if (!emailInput) { setEmailError("Please enter your email address"); return; }
    if (!isValidEmail(emailInput)) { setEmailError("Please enter a valid email address"); return; }
    setSubmittingEmail(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput, tool: tool.name }),
      });
      localStorage.setItem("unico_tools_email", emailInput);
      setEmail(emailInput);
      setGateSuccess(true);
    } catch {
      setEmailError("Something went wrong. Please try again.");
    }
    setSubmittingEmail(false);
  };

  const closeGate = () => {
    setShowGate(false);
    setGateSuccess(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    if (uses >= FREE_LIMIT) { setShowUpgrade(true); return; }

    const userMsg = { role: "user", content: msg };
    setMessages((prev) => ({ ...prev, [currentTool]: [...prev[currentTool], userMsg] }));
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    setUses((u) => u + 1);

    try {
      const history = [...messages[currentTool], userMsg];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: history.slice(0, -1),
          mode: tool.mode,
        }),
      });
      const data = await res.json();
      setMessages((prev) => ({
        ...prev,
        [currentTool]: [...prev[currentTool], { role: "assistant", content: data.reply }],
      }));
    } catch {
      setMessages((prev) => ({
        ...prev,
        [currentTool]: [...prev[currentTool], { role: "assistant", content: "Something went wrong. Please try again." }],
      }));
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!showGate) sendMessage();
      else if (showGate && !gateSuccess) handleEmailSubmit();
    }
  };

  const switchTool = (id) => {
    setCurrentTool(id);
    setInput("");
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
        .t-messages { flex:1; min-height:360px; max-height:420px; overflow-y:auto; padding:24px 22px; display:flex; flex-direction:column; gap:18px; scrollbar-width:thin; scrollbar-color:#222 transparent; }
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
        .t-gate-modal { background:#0f0f0f; border:1px solid #222; border-radius:20px; padding:40px 36px; width:100%; max-width:420px; text-align:center; box-shadow:0 0 0 1px rgba(255,255,255,0.04),0 40px 100px rgba(0,0,0,0.8); animation:slideUp 0.3s cubic-bezier(0.16,1,0.3,1); }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .t-gate-icon { width:60px; height:60px; border-radius:16px; background:rgba(167,139,250,0.10); border:1px solid rgba(167,139,250,0.18); display:flex; align-items:center; justify-content:center; font-size:28px; margin:0 auto 22px; }
        .t-gate-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:700; color:#fff; letter-spacing:-0.02em; margin-bottom:10px; }
        .t-gate-sub { font-size:14px; color:#555; line-height:1.6; margin-bottom:28px; font-weight:300; }
        .t-gate-sub strong { color:#a78bfa; font-weight:500; }
        .t-gate-perks { display:flex; flex-direction:column; gap:8px; margin-bottom:28px; text-align:left; }
        .t-gate-perk { display:flex; align-items:center; gap:10px; font-size:13px; color:#777; }
        .t-gate-perk-dot { width:6px; height:6px; border-radius:50%; background:#a78bfa; flex-shrink:0; opacity:0.7; }
        .t-gate-input { width:100%; background:#111; border:1px solid #242424; border-radius:10px; padding:13px 16px; font-family:'DM Sans',sans-serif; font-size:14px; color:#ccc; outline:none; transition:border-color 0.2s; }
        .t-gate-input::placeholder { color:#333; }
        .t-gate-input:focus { border-color:#a78bfa; }
        .t-gate-input.error { border-color:#f87171; }
        .t-gate-error { font-size:12px; color:#f87171; margin-top:8px; text-align:left; }
        .t-gate-btn { width:100%; background:linear-gradient(135deg,#a78bfa 0%,#8b5cf6 100%); border:none; border-radius:10px; padding:13px 20px; font-family:'Syne',sans-serif; font-size:14px; font-weight:600; color:#fff; cursor:pointer; letter-spacing:0.01em; transition:opacity 0.15s,transform 0.1s; margin-top:12px; }
        .t-gate-btn:hover { opacity:0.88; transform:translateY(-1px); }
        .t-gate-fine { font-size:11px; color:#2e2e2e; margin-top:14px; letter-spacing:0.03em; }
        .t-success-icon { width:56px; height:56px; border-radius:50%; background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.2); display:flex; align-items:center; justify-content:center; font-size:24px; margin:0 auto 18px; }
        .t-success-title { font-family:'Syne',sans-serif; font-size:20px; font-weight:700; color:#fff; margin-bottom:8px; }
        .t-success-sub { font-size:14px; color:#555; margin-bottom:24px; }
        .t-continue-btn { background:rgba(167,139,250,0.1); border:1px solid rgba(167,139,250,0.22); border-radius:10px; padding:11px 24px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; color:#a78bfa; cursor:pointer; transition:background 0.15s; }
        .t-continue-btn:hover { background:rgba(167,139,250,0.16); }
        .t-upgrade { position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(6px); z-index:100; display:flex; align-items:center; justify-content:center; padding:20px; }
        .t-upgrade-modal { background:#0f0f0f; border:1px solid #222; border-radius:20px; padding:40px 36px; width:100%; max-width:420px; text-align:center; }
        @media(max-width:600px) { .t-selector{gap:4px;padding:4px;} .t-btn{padding:9px 12px;font-size:12px;} .t-btn-icon{display:none;} .t-gate-modal{padding:32px 24px;} }
      `}</style>

      <div className="tools-page">
        {/* Nav */}
        <nav className="t-nav">
          <div className="t-logo">∂</div>
          <a href="/" className="t-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Unico
          </a>
        </nav>

        {/* Hero */}
        <div className="t-hero">
          <div className="t-badge">Free AI Tools by Unico Studios</div>
          <h1 className="t-title">AI Tools That <span>Actually Work</span></h1>
          <p className="t-sub">Free tools built for founders, startups and brands who want to grow faster.</p>
        </div>

        {/* Tool Switcher */}
        <div className="t-selector">
          {Object.values(TOOLS).map((t) => (
            <button
              key={t.id}
              className="t-btn"
              onClick={() => switchTool(t.id)}
              style={currentTool === t.id ? {
                background: t.bgActive,
                color: t.color,
                boxShadow: `0 0 0 1px ${t.borderActive}`,
              } : {}}
            >
              <span className="t-btn-icon">{t.icon}</span>
              {t.shortName}
              {currentTool === t.id && (
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.color, marginLeft: 2 }} />
              )}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="t-window">
          {/* Header */}
          <div className="t-header">
            <div className="t-header-icon" style={{ background: tool.headerBg, border: `1px solid ${tool.borderFaint}` }}>
              {tool.icon}
            </div>
            <div>
              <div className="t-header-name">{tool.name}</div>
              <div className="t-header-desc">{tool.desc}</div>
            </div>
            <div className="t-status">
              <div className="t-dot" />
              Live
            </div>
          </div>

          {/* Messages */}
          <div className="t-messages">
            {/* Greeting */}
            <div className="t-msg">
              <div className="t-avatar" style={{ background: tool.headerBg }}>{tool.icon}</div>
              <div className="t-msg-body">
                <div className="t-msg-name">{tool.name}</div>
                <div className="t-bubble">{tool.greeting}</div>
                <div className="t-chips">
                  {tool.chips.map((chip) => (
                    <span
                      key={chip}
                      className="t-chip"
                      onClick={() => { if (!showGate) sendMessage(chip); else setShowGate(true); }}
                      style={{ color: tool.color, background: tool.chipBg, borderColor: tool.chipBorder }}
                    >
                      ↗ {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Messages */}
            {currentMessages.map((msg, i) => (
              <div key={i} className={`t-msg ${msg.role === "user" ? "user" : ""}`}>
                <div className="t-avatar" style={{
                  background: msg.role === "user" ? "rgba(255,255,255,0.04)" : tool.headerBg,
                }}>
                  {msg.role === "user" ? "👤" : tool.icon}
                </div>
                <div className="t-msg-body">
                  <div className="t-msg-name">{msg.role === "user" ? "You" : tool.name}</div>
                  <div className="t-bubble" style={msg.role === "user" ? {
                    background: tool.userBg,
                    borderColor: tool.borderActive,
                    color: "#ddd",
                    borderRadius: "12px 4px 12px 12px",
                  } : {}}>
                    {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, j) =>
                      part.match(/^https?:\/\//) ? (
                        <a key={j} href={part} target="_blank" rel="noopener noreferrer" style={{ color: tool.color, textDecoration: "underline", display: "block", marginTop: 4 }}>
                          👉 Click here to book your call
                        </a>
                      ) : <span key={j}>{part}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing */}
            {loading && (
              <div className="t-msg">
                <div className="t-avatar" style={{ background: tool.headerBg }}>{tool.icon}</div>
                <div className="t-msg-body">
                  <div className="t-msg-name">{tool.name}</div>
                  <div className="t-bubble">
                    <div className="t-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="t-input-area">
            <div className="t-input-row">
              <div className="t-input-wrap" style={{ borderColor: input ? tool.color : "#222" }}>
                <textarea
                  ref={textareaRef}
                  className="t-textarea"
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={showGate ? "Enter your email to start…" : "Type your message…"}
                  onClick={() => { if (showGate) setShowGate(true); }}
                />
              </div>
              <button
                className="t-send"
                style={{ background: tool.color }}
                onClick={() => showGate ? setShowGate(true) : sendMessage()}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.8)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="t-hint">
              {email ? `${FREE_LIMIT - uses} free uses remaining · ${email}` : "Free · No credit card · No spam"}
            </p>
          </div>
        </div>
      </div>

      {/* Email Gate */}
      {showGate && (
        <div className="t-gate">
          <div className="t-gate-modal">
            {!gateSuccess ? (
              <>
                <div className="t-gate-icon">{tool.icon}</div>
                <h2 className="t-gate-title">Get Free Access</h2>
                <p className="t-gate-sub">
                  Enter your email to unlock <strong>{tool.name}</strong> and all other AI tools — completely free.
                </p>
                <div className="t-gate-perks">
                  <div className="t-gate-perk"><div className="t-gate-perk-dot" />Access all 3 AI tools instantly</div>
                  <div className="t-gate-perk"><div className="t-gate-perk-dot" />New tools added every month</div>
                  <div className="t-gate-perk"><div className="t-gate-perk-dot" />Early access to Unico product drops</div>
                </div>
                <input
                  type="email"
                  className={`t-gate-input ${emailError ? "error" : ""}`}
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }}
                  onKeyDown={handleKeyDown}
                  autoComplete="email"
                  autoFocus
                />
                {emailError && <p className="t-gate-error">⚠️ {emailError}</p>}
                <button className="t-gate-btn" onClick={handleEmailSubmit} disabled={submittingEmail}>
                  {submittingEmail ? "Getting access..." : "→ Unlock Free Access"}
                </button>
                <p className="t-gate-fine">No spam. No credit card. Just free tools.</p>
              </>
            ) : (
              <>
                <div className="t-success-icon">✓</div>
                <div className="t-success-title">You're in!</div>
                <p className="t-success-sub">Welcome to Unico Tools. Let's get to work.</p>
                <button className="t-continue-btn" onClick={closeGate}>
                  Start using {tool.shortName} →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="t-upgrade">
          <div className="t-upgrade-modal">
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔥</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
              You're on a roll!
            </h2>
            <p style={{ color: "#555", marginBottom: 24, lineHeight: 1.6, fontSize: 14 }}>
              You've used all your free credits. Upgrade to keep going!
            </p>
            <button style={{ width: "100%", padding: 14, background: tool.color, border: "none", borderRadius: 12, color: "#000", fontSize: 16, fontWeight: 600, cursor: "pointer", marginBottom: 12 }}>
              🚀 Upgrade — Coming Soon
            </button>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", padding: 14, background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, color: "#fff", fontSize: 14, textDecoration: "none", marginBottom: 12 }}>
              📅 Book a Free Call Instead
            </a>
            <button onClick={() => setShowUpgrade(false)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 14 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
