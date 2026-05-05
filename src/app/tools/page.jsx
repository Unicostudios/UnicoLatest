"use client";
import { useState, useRef, useEffect } from "react";

function renderText(text) {
      return text.split('\n').map(function(line, li) {
              var isHeading = /^#{1,6}\s+/.test(line);
              var cleanLine = line.replace(/^#{1,6}\s+/, '');
              var parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);
              return (
                        <span key={li} style={{ display: 'block', fontWeight: isHeading ? '700' : 'inherit', fontSize: isHeading ? '14px' : 'inherit', marginTop: isHeading ? '8px' : '0' }}>
                            {parts.map(function(p, pi) {
                                      if (/^\*\*[^*]+\*\*$/.test(p)) {
                                                      return <strong key={pi}>{p.slice(2, -2)}</strong>;
                                      }
                                      return p;
                        })}
                        </span>
                      );
});
}

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
    greeting: "Hey! Before you even type anything — here's what I can do for your brand right now:\n\n✍️ Hook #1 (Curiosity): \"Nobody told me running a business in India looked like THIS until I tried it...\"\n✍️ Hook #2 (Pain): \"If you're a founder and you're still posting generic content, this is going to hurt to watch.\"\n✍️ Hook #3 (Result): \"I went from 0 to 50,000 followers in 90 days — here's exactly what changed.\"\n\nThese are just samples. Tell me about YOUR business and I'll generate 3 hooks made specifically for your brand. What do you do?",
    chips: ["I run a D2C skincare brand", "I have a SaaS product for HR teams", "I run a real estate agency", "I own a fashion brand on Instagram"],
    mode: "content",
    limit: 10,
    tag: "Most Popular",
    users: "2,847",
    gateAfter: 5,
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
    greeting: "Most websites lose 80% of their visitors in the first 10 seconds. Not because the product is bad — because the website fails to communicate value fast enough.\n\nShare your website URL or describe what your site is supposed to do and I'll tell you exactly what's costing you leads.",
    chips: ["My website isn't getting leads", "Review my landing page", "I want to build a new website", "Why isn't my site converting?"],
    mode: "code",
    limit: 10,
    tag: "For Founders",
    users: "1,923",
    gateAfter: 5,
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
    greeting: "Hi. I'm Niquo.\n\nIn the next 5 minutes I'll show you exactly how an AI sales assistant works for YOUR business — live and personalised.\n\nTell me: what's your business, who's your customer, and what's the #1 reason deals fall through?",
    chips: ["I run an e-commerce brand selling fashion", "I have a real estate agency in Bangalore", "I run a SaaS product for HR teams", "I own a restaurant chain"],
    mode: "niquo",
    limit: 50,
    tag: "🔥 Fan Favourite",
    users: "3,412",
    gateAfter: 5,
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
    greeting: "I've audited 1000+ websites. The average business bleeds ₹40,000–₹80,000 every month from 5 specific issues — and most owners have no idea.\n\nDrop your website URL and I'll show you exactly where your money is going.",
    chips: ["Audit unicostudios.in", "Audit my competitor's website", "Find my conversion killers", "How much revenue am I losing?"],
    mode: "audit",
    limit: 3,
    tag: "New ✨",
    users: "891",
    gateAfter: 2,
  },
};

const PLANS = [
  { name: "Starter", price: "₹499", period: "/month", color: "#a78bfa", features: ["100 messages/month", "All 4 AI tools", "Priority responses", "Email support"] },
  { name: "Pro", price: "₹999", period: "/month", color: "#22d3ee", features: ["Unlimited messages", "All 4 AI tools", "Fastest responses", "WhatsApp support", "New tools early access"], popular: true },
  { name: "Agency", price: "₹2,999", period: "/month", color: "#fb923c", features: ["Unlimited everything", "5 team members", "Custom AI training", "Dedicated manager", "Monthly strategy call"] },
];

function isValidEmail(e) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e);
}

async function logAnonymousVisit() {
  try {
    const key = "unico_anon_logged";
    const last = localStorage.getItem(key);
    const now = Date.now();
    if (last && now - parseInt(last) < 60 * 60 * 1000) return;
    localStorage.setItem(key, now.toString());
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "anonymous_visitor", phone: "", tool: "Page Visit", country: tz, status: "Visitor" }),
    });
  } catch (_) {}
}

async function logToolClick(toolId) {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "anonymous_visitor", phone: "", tool: "Clicked: " + toolId, country: tz, status: "Tool Click" }),
    });
  } catch (_) {}
}

async function logRecurringVisit(email, toolId) {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, phone: "Returning", tool: "Return: " + toolId, returning: true, status: "Return Visit" }),
    });
  } catch (_) {}
}

function useScrollTracking() {
  useEffect(() => {
    const checkpoints = [25, 50, 75, 100];
    const fired = new Set();
    function handleScroll() {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.round((window.scrollY / scrollable) * 100);
      checkpoints.forEach(function(point) {
        if (pct >= point && !fired.has(point)) {
          fired.add(point);
          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "scroll_depth", { event_category: "engagement", event_label: point + "%", value: point });
          }
          if (typeof window !== "undefined" && window.fbq) {
            window.fbq("trackCustom", "ScrollDepth", { depth: point });
          }
        }
      });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return function() { window.removeEventListener("scroll", handleScroll); };
  }, []);
}

function downloadAuditPDF(messages, url) {
  const auditMessages = messages.filter(function(m) { return m.role === "assistant"; });
  const fullText = auditMessages.map(function(m) { return m.content; }).join("\n\n---\n\n");
  const date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Website Revenue Audit — ${url || "Your Website"}</title><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Inter',sans-serif;background:#fff;color:#1a1a1a;padding:48px;max-width:760px;margin:0 auto;}.header{border-bottom:2px solid #f97316;padding-bottom:24px;margin-bottom:32px;display:flex;justify-content:space-between;align-items:flex-start;}.brand{font-size:13px;font-weight:700;color:#f97316;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;}.title{font-size:24px;font-weight:700;color:#0a0a0a;line-height:1.2;}.subtitle{font-size:13px;color:#888;margin-top:6px;}.meta{text-align:right;font-size:12px;color:#aaa;line-height:1.8;}.content{font-size:14px;line-height:1.85;color:#333;white-space:pre-wrap;word-break:break-word;}.footer{margin-top:48px;padding-top:20px;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;}.footer-brand{font-size:12px;font-weight:700;color:#f97316;}.footer-cta{font-size:12px;color:#888;}.footer-url{color:#f97316;text-decoration:none;font-weight:600;}@media print{body{padding:32px;}}</style></head><body><div class="header"><div><div class="brand">∂ Unico Studios — Website Revenue Audit</div><div class="title">Revenue Audit Report<br/>${url ? url.replace(/https?:\/\//, "") : "Your Website"}</div><div class="subtitle">Prepared by Unico Studios AI Audit Engine</div></div><div class="meta"><div>${date}</div><div>unicostudios.in</div><div>Confidential</div></div></div><div class="content">${fullText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}</div><div class="footer"><div class="footer-brand">∂ Unico Studios — India's First AI-Powered Growth Agency</div><div class="footer-cta">Ready to fix this? <a class="footer-url" href="https://calendly.com/unicostudioss/30min">Book a free call →</a></div></div></body></html>`;
  const blob = new Blob([htmlContent], { type: "text/html" });
  const blobUrl = URL.createObjectURL(blob);
  const printWindow = window.open(blobUrl, "_blank");
  if (printWindow) {
    printWindow.onload = function() {
      setTimeout(function() { printWindow.print(); URL.revokeObjectURL(blobUrl); }, 500);
    };
  }
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
  const [emailError, setEmailError] = useState("");
  const [showGate, setShowGate] = useState(false);
  const [gateSuccess, setGateSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [demoCompleted, setDemoCompleted] = useState(false);
  const [auditPart1Done, setAuditPart1Done] = useState(false);
  const [auditPdfReady, setAuditPdfReady] = useState(false);
  const [auditUrl, setAuditUrl] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(function() {
    logAnonymousVisit();
    const saved = sessionStorage.getItem("unico_tools_email");
    const savedTime = sessionStorage.getItem("unico_tools_time");
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;
    if (saved && savedTime && now - parseInt(savedTime) < ONE_HOUR) {
      setEmail(saved);
    } else {
      sessionStorage.removeItem("unico_tools_email");
      sessionStorage.removeItem("unico_tools_time");
    }
  }, []);

  useScrollTracking();

  useEffect(function() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const tool = currentTool ? TOOLS[currentTool] : null;
  const currentUses = currentTool ? uses[currentTool] : 0;
  const currentLimit = tool ? tool.limit : 10;
  const gateAfter = tool ? tool.gateAfter : 5;

  function openTool(toolId) {
    setCurrentTool(toolId);
    setDemoCompleted(false);
    setAuditPart1Done(false);
    setAuditPdfReady(false);
    setAuditUrl("");
    setScreen("chat");
    if (!email) { logToolClick(toolId); } else { logRecurringVisit(email, toolId); }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "tool_opened", { event_category: "tools", event_label: toolId });
    }
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "ToolOpened", { tool: toolId });
    }
    setTimeout(function() { if (textareaRef.current) textareaRef.current.focus(); }, 100);
  }

  function goBack() {
    setScreen("landing");
    setCurrentTool(null);
    setInput("");
  }

  async function handleSubmit() {
    setEmailError("");
    if (!emailInput) { setEmailError("Please enter your email address"); return; }
    if (!isValidEmail(emailInput)) { setEmailError("Please enter a valid email address"); return; }
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          phone: "",
          tool: currentTool ? "Gate: " + currentTool : "Tools Page",
          country: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        }),
      });
      sessionStorage.setItem("unico_tools_email", emailInput);
      sessionStorage.setItem("unico_tools_time", Date.now().toString());
      setEmail(emailInput);
      setGateSuccess(true);
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", { currency: "INR", value: 0 });
      }
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", { event_category: "gate", event_label: currentTool || "tools", value: 0, currency: "INR" });
      }
    } catch (err) {
      setEmailError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  }

  function closeGate() {
    setShowGate(false);
    setGateSuccess(false);
  }

  async function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg || !currentTool) return;
    const exchangesSoFar = messages[currentTool].filter(function(m) { return m.role === "assistant"; }).length;
    if (!email && exchangesSoFar >= gateAfter) {
      setShowGate(true);
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "ViewContent", { content_name: "Delayed Gate", content_category: currentTool });
      }
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "gate_viewed", { event_category: "gate", event_label: currentTool });
      }
      return;
    }
    if (currentUses >= currentLimit) { setShowUpgrade(true); return; }
    if (currentTool === "audit" && !auditUrl) {
      const urlMatch = msg.match(/https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/[^\s]*)?/);
      if (urlMatch) setAuditUrl(urlMatch[0]);
    }
    const userMsg = { role: "user", content: msg };
    setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], userMsg] }; });
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    setUses(function(prev) { return { ...prev, [currentTool]: prev[currentTool] + 1 }; });
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "message_sent", { event_category: "tools", event_label: currentTool, value: uses[currentTool] + 1 });
    }
    try {
      const history = [...messages[currentTool], userMsg];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: history.slice(0, -1), mode: tool.mode, email: email }),
      });
      const data = await res.json();
      const reply = data.reply || "";
      setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: reply }] }; });
      if (data.demoCompleted) setDemoCompleted(true);
      if (currentTool === "audit" && reply.includes("Want to see them?")) setAuditPart1Done(true);
      if (data.pdfReady && currentTool === "audit") setAuditPdfReady(true);
    } catch (err) {
      setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: "Something went wrong. Please try again." }] }; });
    }
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  function gateCountdown() {
    if (email || !currentTool || !tool) return null;
    const exchanges = messages[currentTool].filter(function(m) { return m.role === "assistant"; }).length;
    const remaining = gateAfter - exchanges;
    if (remaining > gateAfter - 1 || remaining <= 0) return null;
    return remaining === 1 ? "1 free message left" : remaining + " free messages left";
  }

  function gateTitle() {
    if (currentTool === "audit") return "You've seen Part 1. Want the rest?";
    if (currentTool === "niquo") return "Niquo is just getting warmed up.";
    return "You're getting somewhere good.";
  }

  function gateSub() {
    if (currentTool === "audit") return "Enter your email to unlock <strong>Bleeds #4 and #5</strong> — the two most critical issues on your site.";
    if (currentTool === "niquo") return "Enter your email to keep the demo going and get your <strong>full personalised close.</strong>";
    return "Enter your email to keep this conversation going — and get your full report when we're done.";
  }

  const currentMessages = currentTool ? messages[currentTool] : [];
  const countdown = gateCountdown();

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080808;}
        .tp-nav{width:100%;padding:18px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #111;position:sticky;top:0;background:#080808;z-index:50;}
        .tp-logo{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#fff;letter-spacing:-1px;text-decoration:none;}
        .tp-nav-right{display:flex;align-items:center;gap:16px;}
        .tp-back-btn{display:flex;align-items:center;gap:6px;font-size:13px;color:#555;background:none;border:none;cursor:pointer;padding:0;font-family:'DM Sans',sans-serif;}
        .tp-back-btn:hover{color:#e8e8e8;}
        .tp-nav-cta{font-size:12px;font-weight:600;color:#080808;background:#a78bfa;border:none;border-radius:8px;padding:7px 14px;cursor:pointer;font-family:'Syne',sans-serif;text-decoration:none;}

        /* ── DESKTOP LANDING (unchanged) ── */
        .tp-landing{max-width:1000px;margin:0 auto;padding:56px 24px 80px;font-family:'DM Sans',sans-serif;}
        .tp-hero{text-align:center;margin-bottom:24px;}
        .tp-badge{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:500;letter-spacing:0.04em;color:#a78bfa;background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.18);border-radius:100px;padding:5px 14px;margin-bottom:20px;}
        .tp-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:#a78bfa;animation:tpblink 2s ease infinite;}
        .tp-h1{font-family:'Syne',sans-serif;font-size:clamp(32px,5vw,56px);font-weight:700;letter-spacing:-0.02em;line-height:1.08;color:#fff;margin-bottom:16px;}
        .tp-h1 span{background:linear-gradient(90deg,#a78bfa 0%,#f472b6 60%,#22d3ee 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .tp-sub{font-size:16px;color:#555;font-weight:300;max-width:480px;margin:0 auto 32px;line-height:1.6;}
        .tp-stats{display:flex;align-items:center;justify-content:center;gap:32px;margin-bottom:48px;}
        .tp-stat{text-align:center;}
        .tp-stat-num{font-family:'Syne',sans-serif;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.01em;}
        .tp-stat-label{font-size:11px;color:#444;margin-top:2px;}
        .tp-stat-divider{width:1px;height:28px;background:#1e1e1e;}
        .tp-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:32px;}
        .tp-card{background:#0d0d0d;border:1px solid #1a1a1a;border-radius:18px;padding:22px 20px;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;}
        .tp-card:hover{transform:translateY(-3px);}
        .tp-card-tag{position:absolute;top:14px;right:14px;font-size:10px;font-weight:700;letter-spacing:0.06em;padding:3px 10px;border-radius:100px;}
        .tp-card-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:14px;}
        .tp-card-name{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:5px;}
        .tp-card-desc{font-size:12px;color:#444;line-height:1.55;margin-bottom:16px;font-weight:300;}
        .tp-card-footer{display:flex;align-items:center;justify-content:space-between;}
        .tp-card-users{font-size:11px;color:#333;display:flex;align-items:center;gap:4px;}
        .tp-card-users::before{content:'';width:5px;height:5px;border-radius:50%;background:#22c55e;display:inline-block;}
        .tp-card-cta{font-size:12px;font-weight:600;}
        .tp-sp{background:#0d0d0d;border:1px solid #1a1a1a;border-radius:14px;padding:18px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px;}
        .tp-sp-text{font-size:13px;color:#555;line-height:1.5;}
        .tp-sp-text strong{color:#777;}
        .tp-sp-avs{display:flex;}
        .tp-sp-av{width:28px;height:28px;border-radius:50%;border:2px solid #080808;margin-left:-7px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;}

        /* ── MOBILE HERO — shown only on mobile, replaces full hero ── */
        /* On mobile the order is: compact hook → tool cards → stats → social proof */
        /* This puts a tappable tool card in the first 2 seconds of viewing */
        .tp-mobile-hook{display:none;}

        .tp-chat{max-width:720px;margin:0 auto;padding:20px 16px 40px;display:flex;flex-direction:column;min-height:calc(100vh - 65px);font-family:'DM Sans',sans-serif;}
        .tp-chat-win{background:#0d0d0d;border:1px solid #1a1a1a;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;flex:1;box-shadow:0 40px 100px rgba(0,0,0,0.7);}
        .tp-chat-hdr{padding:14px 18px;border-bottom:1px solid #1a1a1a;display:flex;align-items:center;gap:12px;background:#111;}
        .tp-chat-ico{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
        .tp-chat-inf{flex:1;}
        .tp-chat-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#fff;}
        .tp-chat-desc{font-size:11px;color:#444;margin-top:1px;}
        .tp-chat-live{display:flex;align-items:center;gap:5px;font-size:11px;color:#333;}
        .tp-countdown{font-size:10px;color:#fb923c;font-weight:600;letter-spacing:0.04em;animation:tpblink 2s ease infinite;}
        .tp-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:tpblink 2s ease infinite;}
        .tp-msgs{flex:1;min-height:300px;max-height:calc(100vh - 260px);overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:14px;scrollbar-width:thin;}
        .tp-msg{display:flex;gap:8px;animation:tpfadeup 0.25s ease both;}
        .tp-msg.user{flex-direction:row-reverse;}
        .tp-msg.user .tp-msg-body{align-items:flex-end;}
        .tp-av{width:26px;height:26px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;margin-top:2px;}
        .tp-msg-body{display:flex;flex-direction:column;gap:3px;max-width:85%;}
        .tp-msg-name{font-size:10px;font-weight:500;color:#333;letter-spacing:0.06em;text-transform:uppercase;}
        .tp-bubble{font-size:14px;line-height:1.7;color:#aaa;background:#111;border:1px solid #1d1d1d;border-radius:4px 12px 12px 12px;padding:11px 14px;white-space:pre-wrap;}
        .tp-msg.user .tp-bubble{border-radius:12px 4px 12px 12px;color:#ddd;}
        .tp-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}
        .tp-chip{font-size:12px;border-radius:100px;padding:5px 12px;cursor:pointer;border:1px solid;font-family:'DM Sans',sans-serif;}
        .tp-typing{display:flex;gap:4px;align-items:center;padding:4px 0;}
        .tp-typing span{width:5px;height:5px;border-radius:50%;background:#333;animation:tpbounce 1.2s ease infinite;}
        .tp-typing span:nth-child(2){animation-delay:0.2s;}
        .tp-typing span:nth-child(3){animation-delay:0.4s;}
        .tp-banner{border-radius:12px;padding:14px 18px;margin-bottom:10px;text-align:center;}
        .tp-banner-title{font-weight:700;font-size:14px;margin-bottom:5px;}
        .tp-banner-sub{font-size:12px;margin-bottom:10px;}
        .tp-banner-btn{display:inline-block;padding:8px 18px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;}
        .tp-inp-area{border-top:1px solid #1a1a1a;padding:12px 14px;background:#080808;}
        .tp-inp-row{display:flex;align-items:flex-end;gap:8px;}
        .tp-inp-wrap{flex:1;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:12px;padding:10px 14px;transition:border-color 0.2s;}
        .tp-textarea{width:100%;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#ccc;resize:none;line-height:1.55;max-height:100px;min-height:20px;overflow-y:auto;}
        .tp-textarea::placeholder{color:#252525;}
        .tp-send{width:34px;height:34px;border-radius:9px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .tp-hint{text-align:center;font-size:10px;color:#222;margin-top:8px;}
        .tp-gate{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;animation:tpGateBgIn 0.4s ease both;}
        .tp-gate::before{content:'';position:absolute;inset:0;animation:tpGateBlur 0.55s cubic-bezier(0.16,1,0.3,1) both;pointer-events:none;}
        .tp-gate-modal{position:relative;background:rgba(16,16,18,0.95);border:1px solid rgba(255,255,255,0.07);border-radius:28px;padding:40px 36px;width:100%;max-width:400px;text-align:center;max-height:92vh;overflow-y:auto;box-shadow:0 48px 100px rgba(0,0,0,0.75),0 0 0 0.5px rgba(255,255,255,0.03) inset;animation:tpModalIn 0.6s cubic-bezier(0.16,1,0.3,1) both;transform-origin:center 60%;}
        .tp-gate-ico{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,rgba(167,139,250,0.15),rgba(34,211,238,0.08));border:1px solid rgba(167,139,250,0.18);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 20px;animation:tpItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both;}
        .tp-gate-title{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#efefef;margin-bottom:10px;letter-spacing:-0.01em;line-height:1.35;animation:tpItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both;}
        .tp-gate-sub{font-size:13px;color:#484848;line-height:1.65;margin-bottom:24px;font-weight:400;animation:tpItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.19s both;}
        .tp-gate-sub strong{color:#8b70d8;}
        .tp-gate-inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:13px 16px;font-family:'DM Sans',sans-serif;font-size:14px;color:#ccc;outline:none;transition:border-color 0.25s,background 0.25s;margin-bottom:10px;animation:tpItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.23s both;}
        .tp-gate-inp::placeholder{color:#2e2e2e;}
        .tp-gate-inp:focus{border-color:rgba(167,139,250,0.45);background:rgba(167,139,250,0.03);}
        .tp-gate-inp.err{border-color:rgba(248,113,113,0.45);}
        .tp-gate-err{font-size:12px;color:#f87171;margin-bottom:8px;text-align:left;}
        .tp-gate-btn{width:100%;background:linear-gradient(135deg,#a78bfa,#8b5cf6);border:none;border-radius:12px;padding:13px;font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#fff;cursor:pointer;margin-top:2px;letter-spacing:0.01em;transition:opacity 0.2s,transform 0.15s;animation:tpItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.27s both;}
        .tp-gate-btn:hover{opacity:0.87;transform:translateY(-1px);}
        .tp-gate-btn:active{transform:translateY(0);}
        .tp-gate-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
        .tp-gate-fine{font-size:11px;color:#1e1e1e;margin-top:12px;animation:tpItemIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.31s both;}
        .tp-ok-ico{width:48px;height:48px;border-radius:50%;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.18);display:flex;align-items:center;justify-content:center;font-size:20px;margin:0 auto 16px;}
        .tp-upgrade{position:fixed;inset:0;background:rgba(0,0,0,0.9);backdrop-filter:blur(10px);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;}
        .tp-upgrade-modal{background:#0d0d0d;border:1px solid #1e1e1e;border-radius:22px;padding:30px 26px;width:100%;max-width:460px;text-align:center;max-height:92vh;overflow-y:auto;}
        .tp-upgrade-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff;margin-bottom:8px;}
        .tp-upgrade-sub{font-size:13px;color:#555;margin-bottom:24px;line-height:1.6;}
        .tp-plans{display:flex;flex-direction:column;gap:8px;margin-bottom:16px;}
        .tp-plan{background:#111;border:1px solid #1e1e1e;border-radius:12px;padding:14px 16px;text-align:left;position:relative;text-decoration:none;display:block;}
        .tp-plan.pop{border-color:rgba(34,211,238,0.3);background:rgba(34,211,238,0.04);}
        .tp-plan-pop-tag{position:absolute;top:-8px;right:14px;font-size:10px;font-weight:700;background:#22d3ee;color:#000;padding:2px 9px;border-radius:100px;}
        .tp-plan-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
        .tp-plan-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#fff;}
        .tp-plan-price{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;}
        .tp-plan-price span{font-size:11px;font-weight:400;color:#444;}
        .tp-plan-feats{display:flex;flex-wrap:wrap;gap:5px;}
        .tp-plan-feat{font-size:11px;color:#555;background:#1a1a1a;padding:2px 7px;border-radius:100px;}
        .tp-or{font-size:12px;color:#2a2a2a;margin:8px 0;}
        .tp-cal-btn{display:block;width:100%;padding:12px;background:#1a1a1a;border:1px solid #222;border-radius:11px;color:#888;font-size:13px;text-decoration:none;text-align:center;}
        .tp-pdf-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px;background:linear-gradient(135deg,#fb923c,#f97316);border:none;border-radius:11px;font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#fff;cursor:pointer;margin-top:12px;animation:tpfadeup 0.4s ease both;}
        .tp-pdf-btn:hover{opacity:0.9;}
        @keyframes tpblink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes tpbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
        @keyframes tpfadeup{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes tpGateBgIn{from{opacity:0}to{opacity:1}}
        @keyframes tpGateBlur{from{background:rgba(0,0,0,0);backdrop-filter:blur(0px)}to{background:rgba(0,0,0,0.84);backdrop-filter:blur(22px)}}
        @keyframes tpModalIn{from{opacity:0;transform:scale(0.93) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes tpItemIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

        /* ── MOBILE OVERRIDES ─────────────────────────────────────────────
           On mobile (<640px):
           - Hide the full hero (badge + h1 + sub + stats)
           - Show a compact 2-line hook above the cards instead
           - Tool cards go single column and appear immediately
           - Stats appear BELOW the cards so they don't push cards down
           This means the first thing a Reels visitor sees is a tool card
           they can tap — not text they need to read first.           */
        @media(max-width:640px){
          .tp-hero{display:none;}
          .tp-stats{display:none;}
          .tp-mobile-hook{
            display:block;
            padding:20px 16px 14px;
            text-align:center;
          }
          .tp-mobile-hook-title{
            font-family:'Syne',sans-serif;
            font-size:22px;
            font-weight:700;
            color:#fff;
            letter-spacing:-0.02em;
            line-height:1.15;
            margin-bottom:6px;
          }
          .tp-mobile-hook-title span{
            background:linear-gradient(90deg,#a78bfa 0%,#f472b6 60%,#22d3ee 100%);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
            background-clip:text;
          }
          .tp-mobile-hook-sub{
            font-size:13px;
            color:#444;
            font-family:'DM Sans',sans-serif;
            font-weight:300;
          }
          .tp-landing{padding:0 0 48px;}
          .tp-grid{
            grid-template-columns:1fr;
            gap:10px;
            padding:0 16px;
            margin-bottom:20px;
          }
          .tp-card{
            padding:18px 16px;
            border-radius:16px;
            /* Bigger tap target on mobile */
            min-height:80px;
          }
          .tp-card-icon{
            width:36px;
            height:36px;
            font-size:17px;
            margin-bottom:10px;
          }
          .tp-card-name{font-size:14px;}
          .tp-card-desc{font-size:12px;margin-bottom:12px;}
          /* Stats appear below cards on mobile as supporting context */
          .tp-mobile-stats{
            display:flex;
            align-items:center;
            justify-content:center;
            gap:20px;
            padding:16px;
            margin-bottom:16px;
          }
          .tp-mobile-stat{text-align:center;}
          .tp-mobile-stat-num{
            font-family:'Syne',sans-serif;
            font-size:16px;
            font-weight:700;
            color:#fff;
          }
          .tp-mobile-stat-label{font-size:10px;color:#444;margin-top:1px;}
          .tp-mobile-stat-divider{width:1px;height:22px;background:#1e1e1e;}
          .tp-sp{flex-direction:column;text-align:center;margin:0 16px;}
          .tp-gate-modal{padding:28px 20px;}
          .tp-chat{padding:10px 10px 28px;}
        }
      `}</style>

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
          <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="tp-nav-cta">Book a Call</a>
        </div>
      </nav>

      {screen === "landing" && (
        <div className="tp-landing">

          {/* ── DESKTOP HERO (hidden on mobile) ── */}
          <div className="tp-hero">
            <div className="tp-badge">Free AI Tools by Unico Studios</div>
            <h1 className="tp-h1">AI Tools That<br /><span>Actually Work</span></h1>
            <p className="tp-sub">4 free AI tools built for founders and brands who are serious about growth. No fluff. No generic output. Just results.</p>
          </div>

          {/* ── DESKTOP STATS (hidden on mobile) ── */}
          <div className="tp-stats">
            <div className="tp-stat"><div className="tp-stat-num">9,073+</div><div className="tp-stat-label">Founders using these tools</div></div>
            <div className="tp-stat-divider" />
            <div className="tp-stat"><div className="tp-stat-num">₹4.2Cr</div><div className="tp-stat-label">Revenue audited this month</div></div>
            <div className="tp-stat-divider" />
            <div className="tp-stat"><div className="tp-stat-num">340%</div><div className="tp-stat-label">Avg lead increase with Niquo</div></div>
          </div>

          {/* ── MOBILE HOOK (shown only on mobile, above cards) ──
               2 lines max. First line: what it is. Second line: why tap now.
               No badge, no long sub — just enough to give context before the cards. */}
          <div className="tp-mobile-hook">
            <div className="tp-mobile-hook-title">4 Free AI Tools<br />for <span>Indian Founders</span></div>
            <div className="tp-mobile-hook-sub">Tap any tool — no signup needed to start</div>
          </div>

          {/* ── TOOL CARDS (same on both, but single column on mobile) ── */}
          <div className="tp-grid">
            {Object.values(TOOLS).map(function(t) {
              return (
                <div key={t.id} className="tp-card"
                  onClick={function() { openTool(t.id); }}
                  onMouseEnter={function(e) { e.currentTarget.style.borderColor = t.color + "55"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.borderColor = "#1a1a1a"; }}>
                  {t.tag && <div className="tp-card-tag" style={{ background: t.bgActive, color: t.color, border: "1px solid " + t.borderFaint }}>{t.tag}</div>}
                  <div className="tp-card-icon" style={{ background: t.headerBg, border: "1px solid " + t.borderFaint }}>{t.icon}</div>
                  <div className="tp-card-name">{t.name}</div>
                  <div className="tp-card-desc">{t.longDesc}</div>
                  <div className="tp-card-footer">
                    <div className="tp-card-users" style={{ color: "#333" }}>{t.users} using this</div>
                    <div className="tp-card-cta" style={{ color: t.color }}>Try free →</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── MOBILE STATS (shown only on mobile, below cards as trust signal) ── */}
          <div className="tp-mobile-stats">
            <div className="tp-mobile-stat">
              <div className="tp-mobile-stat-num">9,073+</div>
              <div className="tp-mobile-stat-label">Founders</div>
            </div>
            <div className="tp-mobile-stat-divider" />
            <div className="tp-mobile-stat">
              <div className="tp-mobile-stat-num">₹4.2Cr</div>
              <div className="tp-mobile-stat-label">Audited</div>
            </div>
            <div className="tp-mobile-stat-divider" />
            <div className="tp-mobile-stat">
              <div className="tp-mobile-stat-num">Free</div>
              <div className="tp-mobile-stat-label">No card needed</div>
            </div>
          </div>

          <div className="tp-sp">
            <div className="tp-sp-avs">
              {["S","R","A","P","M"].map(function(l, i) {
                var bgs = ["#a78bfa","#f472b6","#22d3ee","#fb923c","#a78bfa"];
                return <div key={i} className="tp-sp-av" style={{ background: bgs[i] }}>{l}</div>;
              })}
            </div>
            <div className="tp-sp-text"><strong>9,073+ founders</strong> from India, UAE, Singapore and 18 other countries are already using these tools. Completely free.</div>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
              style={{ flexShrink:0, padding:"9px 18px", background:"linear-gradient(135deg,#a78bfa,#8b5cf6)", borderRadius:9, color:"#fff", textDecoration:"none", fontSize:13, fontWeight:700, fontFamily:"'Syne',sans-serif", whiteSpace:"nowrap" }}>
              Book a Call →
            </a>
          </div>
        </div>
      )}

      {screen === "chat" && tool && (
        <div className="tp-chat">
          <div className="tp-chat-win">
            <div className="tp-chat-hdr">
              <div className="tp-chat-ico" style={{ background: tool.headerBg, border: "1px solid " + tool.borderFaint }}>{tool.icon}</div>
              <div className="tp-chat-inf">
                <div className="tp-chat-name">{tool.name}</div>
                <div className="tp-chat-desc">{tool.users} founders have used this</div>
              </div>
              {countdown ? (
                <div className="tp-countdown">⚡ {countdown}</div>
              ) : (
                <div className="tp-chat-live"><div className="tp-dot" />Live</div>
              )}
            </div>
            <div className="tp-msgs">
              {demoCompleted && currentTool === "niquo" && (
                <div className="tp-banner" style={{ background:"rgba(34,211,238,0.05)", border:"1px solid rgba(34,211,238,0.2)" }}>
                  <div className="tp-banner-title" style={{ color:"#22d3ee" }}>⚡ Demo Complete!</div>
                  <div className="tp-banner-sub" style={{ color:"#555" }}>Ready to build this for your business?</div>
                  <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
                    className="tp-banner-btn" style={{ background:"rgba(34,211,238,0.1)", border:"1px solid rgba(34,211,238,0.25)", color:"#22d3ee" }}>
                    📅 Book Your Free Call with Saurav →
                  </a>
                </div>
              )}
              {auditPart1Done && currentTool === "audit" && !auditPdfReady && (
                <div className="tp-banner" style={{ background:"rgba(251,146,60,0.05)", border:"1px solid rgba(251,146,60,0.2)" }}>
                  <div className="tp-banner-title" style={{ color:"#fb923c" }}>🔥 Part 1 Complete</div>
                  <div className="tp-banner-sub" style={{ color:"#555" }}>Reply "yes" to see the 2 most critical issues.</div>
                </div>
              )}
              {auditPdfReady && currentTool === "audit" && (
                <div className="tp-banner" style={{ background:"rgba(251,146,60,0.06)", border:"1px solid rgba(251,146,60,0.25)" }}>
                  <div className="tp-banner-title" style={{ color:"#fb923c" }}>✅ Full Audit Complete</div>
                  <div className="tp-banner-sub" style={{ color:"#666" }}>Your complete revenue audit is ready. Download it as a PDF to share with your team or act on later.</div>
                  <button className="tp-pdf-btn" onClick={function() { downloadAuditPDF(currentMessages, auditUrl); }}>
                    ⬇️ Download Full Audit Report (PDF)
                  </button>
                </div>
              )}
              <div className="tp-msg">
                <div className="tp-av" style={{ background: tool.headerBg }}>{tool.icon}</div>
                <div className="tp-msg-body">
                  <div className="tp-msg-name">{tool.shortName}</div>
                  <div className="tp-bubble">{tool.greeting}</div>
                  <div className="tp-chips">
                    {tool.chips.map(function(chip) {
                      return (
                        <span key={chip} className="tp-chip"
                          onClick={function() { sendMessage(chip); }}
                          style={{ color: tool.color, background: tool.chipBg, borderColor: tool.chipBorder }}>
                          ↗ {chip}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              {currentMessages.map(function(msg, i) {
                return (
                  <div key={i} className={"tp-msg" + (msg.role === "user" ? " user" : "")}>
                    <div className="tp-av" style={{ background: msg.role === "user" ? "rgba(255,255,255,0.03)" : tool.headerBg }}>
                      {msg.role === "user" ? "👤" : tool.icon}
                    </div>
                    <div className="tp-msg-body">
                      <div className="tp-msg-name">{msg.role === "user" ? "You" : tool.shortName}</div>
                      <div className="tp-bubble" style={msg.role === "user" ? { background: tool.userBg, borderColor: tool.borderActive, color: "#ddd", borderRadius: "12px 4px 12px 12px" } : {}}>
                          {renderText(msg.content)}
                      </div>
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="tp-msg">
                  <div className="tp-av" style={{ background: tool.headerBg }}>{tool.icon}</div>
                  <div className="tp-msg-body">
                    <div className="tp-msg-name">{tool.shortName}</div>
                    <div className="tp-bubble"><div className="tp-typing"><span /><span /><span /></div></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="tp-inp-area">
              <div className="tp-inp-row">
                <div className="tp-inp-wrap" style={{ borderColor: input ? tool.color + "88" : "#1a1a1a" }}>
                  <textarea ref={textareaRef} className="tp-textarea" rows={1} value={input}
                    onChange={function(e) { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"; }}
                    onKeyDown={handleKeyDown} placeholder="Type your message…" />
                </div>
                <button className="tp-send" style={{ background: tool.color }} onClick={function() { sendMessage(); }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
              <p className="tp-hint">Free · No credit card · No spam ever</p>
            </div>
          </div>
        </div>
      )}

      {showGate && (
        <div className="tp-gate">
          <div className="tp-gate-modal">
            {!gateSuccess ? (
              <div>
                <div className="tp-gate-ico">{currentTool === "audit" ? "🔍" : currentTool === "niquo" ? "⚡" : "🚀"}</div>
                <h2 className="tp-gate-title">{gateTitle()}</h2>
                <p className="tp-gate-sub" dangerouslySetInnerHTML={{ __html: gateSub() }} />
                <input type="email" className={"tp-gate-inp" + (emailError ? " err" : "")}
                  placeholder="your@email.com" value={emailInput}
                  onChange={function(e) { setEmailInput(e.target.value); setEmailError(""); }}
                  onKeyDown={function(e) { if (e.key === "Enter") handleSubmit(); }}
                  autoComplete="email" autoFocus />
                {emailError && <p className="tp-gate-err">⚠️ {emailError}</p>}
                <button
                  className="tp-gate-btn"
                  onClick={function() {
                    if (typeof window !== "undefined" && window.fbq) {
                      window.fbq("trackCustom", "ButtonClick", { button_name: "gate_continue" });
                    }
                    handleSubmit();
                  }}
                  disabled={submitting}
                >
                  {submitting ? "One moment..." : "Continue →"}
                </button>
                <p className="tp-gate-fine">🔒 No spam. No credit card. Unsubscribe anytime.</p>
              </div>
            ) : (
              <div>
                <div className="tp-ok-ico">✓</div>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:700, color:"#efefef", marginBottom:8, letterSpacing:"-0.01em" }}>You're in. Let's keep going.</h2>
                <p style={{ color:"#484848", fontSize:13, marginBottom:24, lineHeight:1.65 }}>Your conversation is saved. Pick up exactly where you left off.</p>
                <button className="tp-gate-btn" onClick={closeGate}>Continue the conversation →</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showUpgrade && tool && (
        <div className="tp-upgrade">
          <div className="tp-upgrade-modal">
            <div style={{ fontSize:38, marginBottom:10 }}>
              {currentTool === "niquo" ? "⚡" : currentTool === "audit" ? "🔍" : "🔥"}
            </div>
            <div className="tp-upgrade-title">
              {currentTool === "niquo" ? "You've seen what Niquo can do!" : currentTool === "audit" ? "Audit credits used up!" : "You've hit your free limit!"}
            </div>
            <div className="tp-upgrade-sub">
              {currentTool === "niquo" ? "Ready to build a custom AI sales system?" : currentTool === "audit" ? "Want unlimited audits and all other tools?" : "Upgrade to keep going."}
            </div>
            <div className="tp-plans">
              {PLANS.map(function(plan) {
                return (
                  <a key={plan.name} href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer"
                    className={"tp-plan" + (plan.popular ? " pop" : "")}>
                    {plan.popular && <div className="tp-plan-pop-tag">MOST POPULAR</div>}
                    <div className="tp-plan-hdr">
                      <div className="tp-plan-name" style={{ color: plan.popular ? plan.color : "#fff" }}>{plan.name}</div>
                      <div className="tp-plan-price" style={{ color: plan.color }}>{plan.price}<span>{plan.period}</span></div>
                    </div>
                    <div className="tp-plan-feats">
                      {plan.features.map(function(f) { return <span key={f} className="tp-plan-feat">{f}</span>; })}
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="tp-or">— or —</div>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="tp-cal-btn">
              📅 Book a Free Strategy Call with Saurav
            </a>
            <button onClick={function() { setShowUpgrade(false); }}
              style={{ background:"none", border:"none", color:"#333", cursor:"pointer", fontSize:12, marginTop:12, display:"block", width:"100%" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
