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
          if (/^\*\*[^*]+\*\*$/.test(p)) return <strong key={pi}>{p.slice(2, -2)}</strong>;
          return p;
        })}
      </span>
    );
  });
}

const TOOLS = {
  niquo: {
    id: "niquo",
    name: "Niquo — AI Sales Demo",
    shortName: "Niquo",
    desc: "See how AI closes clients for your specific business",
    longDesc: "Watch an AI become YOUR best salesperson — live, personalised to your business, handling real objections in real time. No script. No bot. Pure sales intelligence.",
    icon: "⚡",
    color: "#22d3ee",
    bgActive: "rgba(34,211,238,0.07)",
    borderActive: "rgba(34,211,238,0.20)",
    borderFaint: "rgba(34,211,238,0.13)",
    headerBg: "rgba(34,211,238,0.09)",
    userBg: "rgba(34,211,238,0.05)",
    chipBg: "rgba(34,211,238,0.04)",
    chipBorder: "rgba(34,211,238,0.16)",
    // ── NEW SHORT GREETING ───────────────────────────────────────────────
    greeting: "I'm Niquo.\n\nWhat's your business?",
    chips: ["I run a real estate agency in Bangalore", "I have a D2C fashion brand", "I run a SaaS product for HR teams", "I own a restaurant chain"],
    mode: "niquo",
    limit: 50,
    tag: "🔥 Star Product",
    users: "Used across real estate, D2C, SaaS & restaurants",
    gateAfter: 5,
  },
  audit: {
    id: "audit",
    name: "Website Revenue Audit",
    shortName: "Revenue Audit",
    desc: "Find out exactly how much revenue your website is losing",
    longDesc: "We actually READ your website — every headline, every CTA, every page — then tell you exactly where money is bleeding. With real ₹ numbers, competitor benchmarks and a downloadable PDF report.",
    icon: "🔍",
    color: "#fb923c",
    bgActive: "rgba(251,146,60,0.08)",
    borderActive: "rgba(251,146,60,0.22)",
    borderFaint: "rgba(251,146,60,0.15)",
    headerBg: "rgba(251,146,60,0.10)",
    userBg: "rgba(251,146,60,0.06)",
    chipBg: "rgba(251,146,60,0.05)",
    chipBorder: "rgba(251,146,60,0.18)",
    // ── NEW SHORT GREETING ───────────────────────────────────────────────
    greeting: "Drop your website URL.\n\nI'll tell you exactly how much money it's losing — and why.",
    chips: ["Audit unicostudios.in", "Audit my competitor's website", "Find my conversion killers", "How much revenue am I losing?"],
    mode: "audit",
    limit: 3,
    tag: "Most Unique ✦",
    users: "Audits websites across 12+ industries",
    gateAfter: 2,
  },
  content: {
    id: "content",
    name: "Startup Content Engine",
    shortName: "Content Engine",
    desc: "Hooks, scripts, reels & CTAs — all done for you",
    longDesc: "Generate viral reel scripts, powerful hooks, high-converting CTAs and thumbnail concepts built specifically for YOUR brand — not a generic template.",
    icon: "✍️",
    color: "#a78bfa",
    bgActive: "rgba(167,139,250,0.08)",
    borderActive: "rgba(167,139,250,0.22)",
    borderFaint: "rgba(167,139,250,0.15)",
    headerBg: "rgba(167,139,250,0.10)",
    userBg: "rgba(167,139,250,0.06)",
    chipBg: "rgba(167,139,250,0.05)",
    chipBorder: "rgba(167,139,250,0.18)",
    // ── NEW SHORT GREETING ───────────────────────────────────────────────
    greeting: "Tell me what your business does — one line.\n\nI'll generate 3 hooks your competitors wish they'd written first.",
    chips: ["I run a D2C skincare brand", "I have a SaaS product for HR teams", "I run a real estate agency", "I own a fashion brand on Instagram"],
    mode: "content",
    limit: 10,
    tag: "Popular",
    users: "Built for Indian founders & brands",
    gateAfter: 5,
  },
  code: {
    id: "code",
    name: "Website & Landing Page Consultant",
    shortName: "Page Consultant",
    desc: "Fix your website or landing page — no tech skills needed",
    longDesc: "Not converting visitors? We read your actual website and give you a plain-English diagnosis of exactly what's broken — with specific fixes, not generic advice.",
    icon: "🌐",
    color: "#f472b6",
    bgActive: "rgba(244,114,182,0.08)",
    borderActive: "rgba(244,114,182,0.22)",
    borderFaint: "rgba(244,114,182,0.15)",
    headerBg: "rgba(244,114,182,0.10)",
    userBg: "rgba(244,114,182,0.06)",
    chipBg: "rgba(244,114,182,0.05)",
    chipBorder: "rgba(244,114,182,0.18)",
    // ── NEW SHORT GREETING ───────────────────────────────────────────────
    greeting: "Share your website URL.\n\nI'll tell you exactly why it's not converting — and what to fix first.",
    chips: ["My website isn't getting leads", "Review my landing page", "I want to build a new website", "Why isn't my site converting?"],
    mode: "code",
    limit: 10,
    tag: "For Founders",
    users: "Reads your actual website live",
    gateAfter: 5,
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
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "anonymous_visitor", phone: "", tool: "Page Visit", country: tz, status: "Visitor" }) });
  } catch (_) {}
}

async function logToolClick(toolId) {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "anonymous_visitor", phone: "", tool: "Clicked: " + toolId, country: tz, status: "Tool Click" }) });
  } catch (_) {}
}

async function logRecurringVisit(email, toolId) {
  try {
    await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, phone: "Returning", tool: "Return: " + toolId, returning: true, status: "Return Visit" }) });
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
          if (window.gtag) window.gtag("event", "scroll_depth", { event_category: "engagement", event_label: point + "%", value: point });
          if (window.fbq) window.fbq("trackCustom", "ScrollDepth", { depth: point });
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
  if (printWindow) { printWindow.onload = function() { setTimeout(function() { printWindow.print(); URL.revokeObjectURL(blobUrl); }, 500); }; }
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
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationDone, setSimulationDone] = useState(false);
  const [activeScenario, setActiveScenario] = useState(null);
  const [auditPart1Done, setAuditPart1Done] = useState(false);
  const [auditPdfReady, setAuditPdfReady] = useState(false);
  const [auditUrl, setAuditUrl] = useState("");
  // ── NEW STATE: file upload & website confirmation ──────────────────────
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [uploadedContent, setUploadedContent] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [pendingWebsiteUrl, setPendingWebsiteUrl] = useState(null);
  const [confirmedUrl, setConfirmedUrl] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(function() {
    logAnonymousVisit();

    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // ── RESTORE EMAIL (extended to 24 hours) ──────────────────────────
    const savedEmail = localStorage.getItem("unico_email");
    const savedEmailTime = localStorage.getItem("unico_email_time");
    if (savedEmail && savedEmailTime && now - parseInt(savedEmailTime) < ONE_DAY) {
      setEmail(savedEmail);
    } else {
      localStorage.removeItem("unico_email");
      localStorage.removeItem("unico_email_time");
    }

    // ── RESTORE CONVERSATION STATE ────────────────────────────────────
    // Each tool's messages, uploaded content, confirmed URL all persisted
    try {
      const persistedTime = localStorage.getItem("unico_persist_time");
      if (persistedTime && now - parseInt(persistedTime) < ONE_DAY) {

        // Restore messages for all tools
        var restoredMessages = { content: [], code: [], niquo: [], audit: [] };
        ["content", "code", "niquo", "audit"].forEach(function(toolId) {
          var saved = localStorage.getItem("unico_msgs_" + toolId);
          if (saved) restoredMessages[toolId] = JSON.parse(saved);
        });
        setMessages(restoredMessages);

        // Restore uses count
        var savedUses = localStorage.getItem("unico_uses");
        if (savedUses) setUses(JSON.parse(savedUses));

        // Restore Niquo-specific state
        var savedUploadContent = localStorage.getItem("unico_upload_content");
        var savedUploadName = localStorage.getItem("unico_upload_name");
        var savedConfirmedUrl = localStorage.getItem("unico_confirmed_url");
        var savedAuditUrl = localStorage.getItem("unico_audit_url");
        if (savedUploadContent) setUploadedContent(savedUploadContent);
        if (savedUploadName) setUploadedFileName(savedUploadName);
        if (savedConfirmedUrl) setConfirmedUrl(savedConfirmedUrl);
        if (savedAuditUrl) setAuditUrl(savedAuditUrl);

        // ── RESTORE LAST OPEN TOOL + inject welcome back message ─────
        var savedTool = localStorage.getItem("unico_last_tool");
        if (savedTool && TOOLS[savedTool]) {
          var toolMessages = restoredMessages[savedTool];
          // Only restore if there's a real conversation (not just the greeting)
          if (toolMessages && toolMessages.length > 0) {
            setCurrentTool(savedTool);
            setScreen("chat");

            // Extract business name from conversation for personalised welcome
            var businessContext = "";
            var firstUserMsg = toolMessages.find(function(m) { return m.role === "user"; });
            if (firstUserMsg) businessContext = firstUserMsg.content.slice(0, 60);

            // Inject welcome back system notice
            var welcomeMsg = {
              role: "system-notice",
              content: savedTool === "niquo"
                ? "👋 Welcome back. Niquo remembers your conversation — picking up where you left off."
                : savedTool === "audit"
                ? "👋 Welcome back. Your audit session is restored."
                : "👋 Welcome back. Your conversation is restored.",
            };
            setMessages(function(prev) {
              return {
                ...prev,
                [savedTool]: [...(restoredMessages[savedTool] || []), welcomeMsg],
              };
            });
          }
        }
      }
    } catch (e) {
      // localStorage parse error — start fresh
      console.error("Persistence restore error:", e);
    }
  }, []);

  useScrollTracking();

  // ── PERSIST MESSAGES whenever they change ────────────────────────────
  useEffect(function() {
    try {
      ["content", "code", "niquo", "audit"].forEach(function(toolId) {
        var msgs = messages[toolId];
        if (msgs && msgs.length > 0) {
          // Don't save system-notice messages — they're transient
          var toSave = msgs.filter(function(m) { return m.role !== "system-notice"; });
          localStorage.setItem("unico_msgs_" + toolId, JSON.stringify(toSave));
        }
      });
      localStorage.setItem("unico_persist_time", Date.now().toString());
    } catch (e) {}
  }, [messages]);

  // ── PERSIST USES COUNT ────────────────────────────────────────────────
  useEffect(function() {
    try { localStorage.setItem("unico_uses", JSON.stringify(uses)); } catch (e) {}
  }, [uses]);

  // ── PERSIST NIQUO SPECIFIC STATE ─────────────────────────────────────
  useEffect(function() {
    try {
      if (uploadedContent) localStorage.setItem("unico_upload_content", uploadedContent);
      if (uploadedFileName) localStorage.setItem("unico_upload_name", uploadedFileName);
    } catch (e) {}
  }, [uploadedContent, uploadedFileName]);

  useEffect(function() {
    try {
      if (confirmedUrl) localStorage.setItem("unico_confirmed_url", confirmedUrl);
    } catch (e) {}
  }, [confirmedUrl]);

  useEffect(function() {
    try {
      if (auditUrl) localStorage.setItem("unico_audit_url", auditUrl);
    } catch (e) {}
  }, [auditUrl]);

  // ── PERSIST LAST OPEN TOOL ────────────────────────────────────────────
  useEffect(function() {
    try {
      if (currentTool) localStorage.setItem("unico_last_tool", currentTool);
    } catch (e) {}
  }, [currentTool]);

  useEffect(function() {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Close plus menu when clicking outside
  useEffect(function() {
    function handleClickOutside(e) {
      if (showPlusMenu && !e.target.closest(".tp-plus-menu") && !e.target.closest(".tp-plus-btn")) {
        setShowPlusMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function() { document.removeEventListener("mousedown", handleClickOutside); };
  }, [showPlusMenu]);

  const tool = currentTool ? TOOLS[currentTool] : null;
  const currentUses = currentTool ? uses[currentTool] : 0;
  const currentLimit = tool ? tool.limit : 10;
  const gateAfter = tool ? tool.gateAfter : 5;

  // ── FILE UPLOAD HANDLER ────────────────────────────────────────────────
  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setShowPlusMenu(false);
    setUploadingFile(true);

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async function(ev) {
        const base64 = ev.target.result.split(",")[1];
        const mimeType = file.type;

        const res = await fetch("/api/niquo-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileData: base64, fileName: file.name, mimeType }),
        });
        const data = await res.json();

        if (data.success && data.content) {
          setUploadedContent(data.content);
          setUploadedFileName(file.name);
          // Show a system message in chat
          setMessages(function(prev) {
            return {
              ...prev,
              [currentTool]: [...prev[currentTool], {
                role: "system-notice",
                content: "📎 " + file.name + " uploaded. Niquo has read your document.",
              }]
            };
          });
        } else {
          setMessages(function(prev) {
            return {
              ...prev,
              [currentTool]: [...prev[currentTool], {
                role: "system-notice",
                content: "⚠️ Couldn't read that file. Try a PDF or image.",
              }]
            };
          });
        }
        setUploadingFile(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploadingFile(false);
    }
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── WEBSITE CONFIRMATION HANDLER ──────────────────────────────────────
  function confirmWebsite(confirmed) {
    if (confirmed) {
      setConfirmedUrl(pendingWebsiteUrl);
      setPendingWebsiteUrl(null);
      // Send a silent confirmation to trigger scraping
      sendMessage("Yes, that's correct", true, pendingWebsiteUrl);
    } else {
      setPendingWebsiteUrl(null);
      setMessages(function(prev) {
        return {
          ...prev,
          [currentTool]: [...prev[currentTool], {
            role: "system-notice",
            content: "No problem — what's your website URL?",
          }]
        };
      });
    }
  }

  function openTool(toolId) {
    setCurrentTool(toolId);
    setDemoCompleted(false);
    setAuditPart1Done(false);
    setAuditPdfReady(false);
    setAuditUrl("");
    setUploadedContent(null);
    setUploadedFileName(null);
    setPendingWebsiteUrl(null);
    setConfirmedUrl(null);
    setScreen("chat");
    if (!email) { logToolClick(toolId); } else { logRecurringVisit(email, toolId); }
    if (window.gtag) window.gtag("event", "tool_opened", { event_category: "tools", event_label: toolId });
    if (window.fbq) window.fbq("trackCustom", "ToolOpened", { tool: toolId });
    setTimeout(function() { if (textareaRef.current) textareaRef.current.focus(); }, 100);
  }

  function goBack() {
    setScreen("landing");
    setCurrentTool(null);
    setInput("");
    setPendingWebsiteUrl(null);
    // Note: we do NOT clear uploadedContent, confirmedUrl, messages here
    // Those persist so the user can return to any tool and continue
    try { localStorage.removeItem("unico_last_tool"); } catch (e) {}
  }

  function clearToolHistory(toolId) {
    // Explicit clear — only when user wants a fresh start
    setMessages(function(prev) { return { ...prev, [toolId]: [] }; });
    setUses(function(prev) { return { ...prev, [toolId]: 0 }; });
    if (toolId === "niquo") {
      setUploadedContent(null);
      setUploadedFileName(null);
      setConfirmedUrl(null);
      try {
        localStorage.removeItem("unico_upload_content");
        localStorage.removeItem("unico_upload_name");
        localStorage.removeItem("unico_confirmed_url");
      } catch (e) {}
    }
    if (toolId === "audit") {
      setAuditUrl("");
      setAuditPart1Done(false);
      setAuditPdfReady(false);
      try { localStorage.removeItem("unico_audit_url"); } catch (e) {}
    }
    try { localStorage.removeItem("unico_msgs_" + toolId); } catch (e) {}
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
        body: JSON.stringify({ email: emailInput, phone: "", tool: currentTool ? "Gate: " + currentTool : "Tools Page", country: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown" }),
      });
      localStorage.setItem("unico_email", emailInput);
      localStorage.setItem("unico_email_time", Date.now().toString());
      // Keep sessionStorage for backwards compatibility
      sessionStorage.setItem("unico_tools_email", emailInput);
      sessionStorage.setItem("unico_tools_time", Date.now().toString());
      setEmail(emailInput);
      setGateSuccess(true);
      if (window.fbq) window.fbq("track", "Lead", { currency: "INR", value: 0 });
      if (window.gtag) window.gtag("event", "generate_lead", { event_category: "gate", event_label: currentTool || "tools", value: 0, currency: "INR" });
    } catch (err) {
      setEmailError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  }

  function closeGate() { setShowGate(false); setGateSuccess(false); }

  async function sendMessage(text, isConfirmation, urlToConfirm, scenarioOverride) {
    const msg = text || input.trim();
    // If this is a scenario run, inject the scenario tag
    const currentScenario = scenarioOverride || activeScenario;
    const scenarioTag = currentScenario ? " SCENARIO " + currentScenario : "";
    if (!msg || !currentTool) return;
    const exchangesSoFar = messages[currentTool].filter(function(m) { return m.role === "assistant"; }).length;
    if (!email && exchangesSoFar >= gateAfter) {
      setShowGate(true);
      if (window.fbq) window.fbq("track", "ViewContent", { content_name: "Delayed Gate", content_category: currentTool });
      if (window.gtag) window.gtag("event", "gate_viewed", { event_category: "gate", event_label: currentTool });
      return;
    }
    if (currentUses >= currentLimit) { setShowUpgrade(true); return; }
    if (currentTool === "audit" && !auditUrl) {
      const urlMatch = msg.match(/https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/[^\s]*)?/);
      if (urlMatch) setAuditUrl(urlMatch[0]);
    }

    // Don't show confirmation message as a user bubble
    if (!isConfirmation) {
      const userMsg = { role: "user", content: msg };
      setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], userMsg] }; });
    }

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    setUses(function(prev) { return { ...prev, [currentTool]: prev[currentTool] + 1 }; });
    if (window.gtag) window.gtag("event", "message_sent", { event_category: "tools", event_label: currentTool, value: uses[currentTool] + 1 });

    try {
      // ── HISTORY FIX ─────────────────────────────────────────────────────
      // Get all real messages BEFORE the current one (userMsg not yet in state)
      // Do NOT slice — send the full history so Niquo never loses context
      const history = messages[currentTool].filter(m => m.role === "user" || m.role === "assistant");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg + scenarioTag,
          history: history,
          mode: tool.mode,
          email: email,
          // ── Pass uploaded content and confirmed URL to backend ──────
          uploadedContent: uploadedContent || null,
          confirmedUrl: urlToConfirm || confirmedUrl || null,
        }),
      });
      const data = await res.json();
      const reply = data.reply || "";

      // ── SIMULATION PARSER ────────────────────────────────────────────
      // If reply contains END_SIMULATION, parse and stream it message by message
      if (currentTool === "niquo" && reply.includes("END_SIMULATION")) {
        setSimulationRunning(true);
        const parts = reply.split("END_SIMULATION");
        const simBlock = parts[0];
        const afterSim = parts[1] ? parts[1].trim() : "";

        // Parse simulation into alternating messages
        const lines = simBlock.split("\n").filter(l => l.trim());
        const simMessages = [];
        for (const line of lines) {
          if (line.startsWith("PROSPECT:")) {
            simMessages.push({ role: "prospect", content: line.replace("PROSPECT:", "").trim() });
          } else if (line.startsWith("NIQUO:")) {
            simMessages.push({ role: "assistant", content: line.replace("NIQUO:", "").trim() });
          } else if (line.startsWith("Watch how")) {
            // The intro line — show as assistant message first
            setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: line }] }; });
          }
        }

        // Stream simulation messages with typing delays
        let delay = 800;
        for (const simMsg of simMessages) {
          await new Promise(resolve => {
            setTimeout(() => {
              if (simMsg.role === "prospect") {
                // Show prospect messages as special sim-prospect role
                setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], { role: "sim-prospect", content: simMsg.content }] }; });
              } else {
                setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: simMsg.content }] }; });
              }
              resolve();
            }, delay);
            delay += 600 + Math.random() * 400; // stagger with slight randomness
          });
        }

        // Show the after-simulation commentary
        if (afterSim) {
          await new Promise(resolve => setTimeout(resolve, 1200));
          setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: afterSim }] }; });
        }

        if (data.demoCompleted) setDemoCompleted(true);
        setSimulationRunning(false);
        setSimulationDone(true);
        setLoading(false);
        return;
      }

      // Normal (non-simulation) reply
      setMessages(function(prev) { return { ...prev, [currentTool]: [...prev[currentTool], { role: "assistant", content: reply }] }; });
      if (data.demoCompleted) setDemoCompleted(true);
      if (currentTool === "audit" && reply.includes("Want to see them?")) setAuditPart1Done(true);
      if (data.pdfReady && currentTool === "audit") setAuditPdfReady(true);
      // ── Set pending website URL for confirmation banner ──────────────
      if (data.pendingWebsiteUrl && currentTool === "niquo" && !confirmedUrl) {
        setPendingWebsiteUrl(data.pendingWebsiteUrl);
      }
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
    if (currentTool === "audit") return "Your revenue bleed report is half done.";
    if (currentTool === "niquo") return "Niquo just read your buyer. The close is next.";
    if (currentTool === "content") return "Your brand hooks are ready. Want the full pack?";
    return "You're getting somewhere real.";
  }

  function gateSub() {
    if (currentTool === "audit") return "Enter your email to unlock <strong>Bleeds #4 and #5</strong> — the ones costing you the most high-intent buyers.";
    if (currentTool === "niquo") return "Enter your email to see Niquo deliver the <strong>full personalised close</strong> for your exact buyer type.";
    if (currentTool === "content") return "Enter your email to get your <strong>complete content pack</strong> — scripts, CTAs, thumbnail concepts and a 30-day calendar.";
    return "Enter your email to keep this going and get everything we've built so far sent to you.";
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
        .tp-preview{background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;padding:20px;margin-bottom:28px;position:relative;overflow:hidden;}
        .tp-preview::before{content:'LIVE PREVIEW';position:absolute;top:12px;right:14px;font-size:9px;font-weight:700;letter-spacing:0.1em;color:#22d3ee;opacity:0.6;}
        .tp-preview-label{font-size:11px;color:#333;margin-bottom:12px;font-family:'DM Sans',sans-serif;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;}
        .tp-preview-convo{display:flex;flex-direction:column;gap:8px;}
        .tp-preview-msg{display:flex;gap:8px;align-items:flex-start;}
        .tp-preview-msg.user{flex-direction:row-reverse;}
        .tp-preview-av{width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;}
        .tp-preview-bubble{font-size:12px;line-height:1.55;padding:8px 11px;border-radius:3px 10px 10px 10px;max-width:80%;color:#888;}
        .tp-preview-msg.user .tp-preview-bubble{border-radius:10px 3px 10px 10px;}
        .tp-preview-cta{margin-top:14px;display:flex;align-items:center;justify-content:space-between;}
        .tp-preview-cta-text{font-size:12px;color:#333;font-family:'DM Sans',sans-serif;}
        .tp-preview-cta-btn{font-size:12px;font-weight:700;color:#22d3ee;font-family:'Syne',sans-serif;background:none;border:none;cursor:pointer;padding:0;}
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
        .tp-mobile-hook{display:none;}
        .tp-chat{max-width:720px;margin:0 auto;padding:20px 16px 40px;display:flex;flex-direction:column;min-height:calc(100dvh - 65px);font-family:'DM Sans',sans-serif;}
        .tp-chat-win{background:#0d0d0d;border:1px solid #1a1a1a;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;flex:1;box-shadow:0 40px 100px rgba(0,0,0,0.7);}
        .tp-chat-hdr{padding:14px 18px;border-bottom:1px solid #1a1a1a;display:flex;align-items:center;gap:12px;background:#111;}
        .tp-chat-ico{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
        .tp-chat-inf{flex:1;}
        .tp-chat-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#fff;}
        .tp-chat-desc{font-size:11px;color:#444;margin-top:1px;}
        .tp-chat-live{display:flex;align-items:center;gap:5px;font-size:11px;color:#333;}
        .tp-countdown{font-size:10px;color:#fb923c;font-weight:600;letter-spacing:0.04em;animation:tpblink 2s ease infinite;}
        .tp-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:tpblink 2s ease infinite;}
        .tp-msgs{flex:1;min-height:300px;max-height:calc(100vh - 280px);overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:14px;scrollbar-width:thin;}
        .tp-msg{display:flex;gap:8px;animation:tpfadeup 0.25s ease both;}
        .tp-msg.user{flex-direction:row-reverse;}
        .tp-msg.user .tp-msg-body{align-items:flex-end;}
        .tp-av{width:26px;height:26px;border-radius:7px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;margin-top:2px;}
        .tp-msg-body{display:flex;flex-direction:column;gap:3px;max-width:85%;}
        .tp-msg-name{font-size:10px;font-weight:500;color:#333;letter-spacing:0.06em;text-transform:uppercase;}
        .tp-bubble{font-size:14px;line-height:1.7;color:#aaa;background:#111;border:1px solid #1d1d1d;border-radius:4px 12px 12px 12px;padding:11px 14px;white-space:pre-wrap;}
        .tp-msg.user .tp-bubble{border-radius:12px 4px 12px 12px;color:#ddd;}
        .tp-system-notice{font-size:11px;color:#333;text-align:center;padding:6px 12px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid #1a1a1a;margin:0 auto;}
        .tp-sim-label{font-size:9px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#333;margin-bottom:3px;}
        .tp-sim-banner{background:rgba(34,211,238,0.03);border:1px solid rgba(34,211,238,0.12);border-radius:10px;padding:8px 14px;margin:0 18px 10px;font-size:11px;color:#444;text-align:center;letter-spacing:0.02em;}
        .tp-scenarios{padding:12px 16px;border-top:1px solid #111;}
        .tp-scenarios-label{font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#333;margin-bottom:10px;}
        .tp-scenario-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;}
        .tp-scenario-btn{background:#0d0d0d;border:1px solid #1e1e1e;border-radius:10px;padding:8px 10px;cursor:pointer;text-align:left;transition:all 0.2s;}
        .tp-scenario-btn:hover{border-color:#22d3ee44;background:rgba(34,211,238,0.04);}
        .tp-scenario-btn.active{border-color:rgba(34,211,238,0.4);background:rgba(34,211,238,0.06);}
        .tp-scenario-title{font-size:11px;font-weight:600;color:#ccc;margin-bottom:2px;font-family:'Syne',sans-serif;}
        .tp-scenario-desc{font-size:10px;color:#444;line-height:1.4;}
        .tp-sim-banner span{color:#22d3ee;font-weight:600;}
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

        /* ── WEBSITE CONFIRMATION BANNER ─────────────────────────────── */
        .tp-confirm-banner{background:rgba(34,211,238,0.04);border:1px solid rgba(34,211,238,0.15);border-radius:12px;padding:12px 16px;margin:0 18px 10px;display:flex;align-items:center;justify-content:space-between;gap:12px;animation:tpfadeup 0.3s ease both;}
        .tp-confirm-text{font-size:12px;color:#555;font-family:'DM Sans',sans-serif;line-height:1.5;}
        .tp-confirm-text strong{color:#22d3ee;}
        .tp-confirm-btns{display:flex;gap:8px;flex-shrink:0;}
        .tp-confirm-yes{font-size:11px;font-weight:700;color:#000;background:#22d3ee;border:none;border-radius:7px;padding:5px 12px;cursor:pointer;font-family:'Syne',sans-serif;}
        .tp-confirm-no{font-size:11px;font-weight:500;color:#444;background:none;border:1px solid #222;border-radius:7px;padding:5px 12px;cursor:pointer;font-family:'DM Sans',sans-serif;}

        /* ── INPUT AREA WITH PLUS BUTTON ─────────────────────────────── */
        .tp-inp-area{border-top:1px solid #1a1a1a;padding:12px 14px;background:#080808;position:relative;}
        .tp-inp-row{display:flex;align-items:flex-end;gap:8px;}
        .tp-plus-btn{width:34px;height:34px;border-radius:9px;border:1px solid #1e1e1e;background:#0d0d0d;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#444;font-size:18px;transition:all 0.2s;line-height:1;}
        .tp-plus-btn:hover{border-color:#333;color:#888;}
        .tp-plus-btn.active{border-color:#22d3ee44;color:#22d3ee;background:rgba(34,211,238,0.05);}
        .tp-plus-menu{position:absolute;bottom:58px;left:14px;background:#111;border:1px solid #1e1e1e;border-radius:12px;padding:6px;min-width:180px;z-index:20;animation:tpfadeup 0.2s ease both;box-shadow:0 16px 40px rgba(0,0,0,0.6);}
        .tp-plus-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:#888;font-family:'DM Sans',sans-serif;transition:all 0.15s;}
        .tp-plus-item:hover{background:rgba(255,255,255,0.04);color:#ccc;}
        .tp-plus-item-icon{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
        .tp-uploaded-chip{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:#22d3ee;background:rgba(34,211,238,0.06);border:1px solid rgba(34,211,238,0.15);border-radius:100px;padding:3px 10px;margin-bottom:6px;}

        .tp-inp-wrap{flex:1;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:12px;padding:10px 14px;transition:border-color 0.2s;}
        .tp-textarea{width:100%;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:#ccc;resize:none;line-height:1.55;max-height:100px;min-height:20px;overflow-y:auto;}
        .tp-textarea::placeholder{color:#252525;}
        .tp-send{width:34px;height:34px;border-radius:9px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .tp-hint{text-align:center;font-size:10px;color:#222;margin-top:8px;}
        .tp-gate{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;animation:tpGateBgIn 0.4s ease both;}
        .tp-gate::before{content:'';position:absolute;inset:0;animation:tpGateBlur 0.55s cubic-bezier(0.16,1,0.3,1) both;pointer-events:none;}
        .tp-gate-modal{position:relative;background:rgba(16,16,18,0.95);border:1px solid rgba(255,255,255,0.07);border-radius:28px;padding:40px 36px;width:100%;max-width:400px;text-align:center;max-height:92vh;overflow-y:auto;box-shadow:0 48px 100px rgba(0,0,0,0.75);animation:tpModalIn 0.6s cubic-bezier(0.16,1,0.3,1) both;transform-origin:center 60%;}
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
        .tp-gate-btn:disabled{opacity:0.4;cursor:not-allowed;}
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
        @media(max-width:640px){
          .tp-hero{display:none;} .tp-stats{display:none;} .tp-preview{display:none;}
          .tp-mobile-hook{display:block;padding:20px 16px 14px;text-align:center;}
          .tp-mobile-hook-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.02em;line-height:1.15;margin-bottom:6px;}
          .tp-mobile-hook-title span{background:linear-gradient(90deg,#a78bfa 0%,#f472b6 60%,#22d3ee 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
          .tp-mobile-hook-sub{font-size:13px;color:#444;font-family:'DM Sans',sans-serif;font-weight:300;}
          .tp-landing{padding:0 0 48px;}
          .tp-grid{grid-template-columns:1fr;gap:10px;padding:0 16px;margin-bottom:20px;}
          .tp-card{padding:18px 16px;border-radius:16px;min-height:80px;}
          .tp-card-icon{width:36px;height:36px;font-size:17px;margin-bottom:10px;}
          .tp-card-name{font-size:14px;} .tp-card-desc{font-size:12px;margin-bottom:12px;}
          .tp-mobile-stats{display:flex;align-items:center;justify-content:center;gap:20px;padding:16px;margin-bottom:16px;}
          .tp-mobile-stat{text-align:center;}
          .tp-mobile-stat-num{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#fff;}
          .tp-mobile-stat-label{font-size:10px;color:#444;margin-top:1px;}
          .tp-mobile-stat-divider{width:1px;height:22px;background:#1e1e1e;}
          .tp-sp{flex-direction:column;text-align:center;margin:0 16px;}
          .tp-gate-modal{padding:28px 20px;} .tp-chat{padding:10px 10px 28px;}
          .tp-confirm-banner{margin:0 10px 10px;}
        }
      `}</style>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

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
          <div className="tp-hero">
            <div className="tp-badge">Free AI Tools by Unico Studios</div>
            <h1 className="tp-h1">AI That Actually<br /><span>Sells For You</span></h1>
            <p className="tp-sub">Not generic AI. Not another chatbot. Tools that read your actual business and work like your sharpest employee.</p>
          </div>
          <div className="tp-stats">
            <div className="tp-stat"><div className="tp-stat-num">Real Estate</div><div className="tp-stat-label">D2C · SaaS · Restaurants · Agencies</div></div>
            <div className="tp-stat-divider" />
            <div className="tp-stat"><div className="tp-stat-num">₹0</div><div className="tp-stat-label">Cost to start — completely free</div></div>
            <div className="tp-stat-divider" />
            <div className="tp-stat"><div className="tp-stat-num">60 sec</div><div className="tp-stat-label">To see Niquo close your first lead</div></div>
          </div>
          <div className="tp-mobile-hook">
            <div className="tp-mobile-hook-title">AI That<br /><span>Sells For You</span></div>
            <div className="tp-mobile-hook-sub">Tap Niquo — see it close a real lead in 60 seconds</div>
          </div>
          <div className="tp-preview">
            <div className="tp-preview-label">⚡ Niquo — Live conversation with a real estate buyer</div>
            <div className="tp-preview-convo">
              <div className="tp-preview-msg">
                <div className="tp-preview-av" style={{ background: "rgba(34,211,238,0.1)" }}>⚡</div>
                <div className="tp-preview-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", borderRadius: "3px 10px 10px 10px" }}>I'm Niquo. What's your business?</div>
              </div>
              <div className="tp-preview-msg user">
                <div className="tp-preview-av" style={{ background: "rgba(255,255,255,0.03)" }}>👤</div>
                <div className="tp-preview-bubble" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px 3px 10px 10px" }}>I run PropStar Realty in Bangalore. Most leads ghost us after the first call.</div>
              </div>
              <div className="tp-preview-msg">
                <div className="tp-preview-av" style={{ background: "rgba(34,211,238,0.1)" }}>⚡</div>
                <div className="tp-preview-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", borderRadius: "3px 10px 10px 10px" }}>Found your website — propstarrealty.com. Is this correct?</div>
              </div>
              <div className="tp-preview-msg user">
                <div className="tp-preview-av" style={{ background: "rgba(255,255,255,0.03)" }}>👤</div>
                <div className="tp-preview-bubble" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: "10px 3px 10px 10px" }}>Yes</div>
              </div>
              <div className="tp-preview-msg">
                <div className="tp-preview-av" style={{ background: "rgba(34,211,238,0.1)" }}>⚡</div>
                <div className="tp-preview-bubble" style={{ background: "#111", border: "1px solid #1d1d1d", borderRadius: "3px 10px 10px 10px" }}>I'm stepping into PropStar now. Send me a message exactly like a buyer would. Let's run it live.</div>
              </div>
            </div>
            <div className="tp-preview-cta">
              <span className="tp-preview-cta-text">Niquo finds your website automatically. No setup needed.</span>
              <button className="tp-preview-cta-btn" onClick={function() { openTool("niquo"); }}>Try it now →</button>
            </div>
          </div>
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
                    <div className="tp-card-users" style={{ color: "#333" }}>{t.users}</div>
                    <div className="tp-card-cta" style={{ color: t.color }}>Try free →</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="tp-mobile-stats">
            <div className="tp-mobile-stat"><div className="tp-mobile-stat-num">Free</div><div className="tp-mobile-stat-label">No card needed</div></div>
            <div className="tp-mobile-stat-divider" />
            <div className="tp-mobile-stat"><div className="tp-mobile-stat-num">60s</div><div className="tp-mobile-stat-label">To first result</div></div>
            <div className="tp-mobile-stat-divider" />
            <div className="tp-mobile-stat"><div className="tp-mobile-stat-num">Real</div><div className="tp-mobile-stat-label">Reads your business</div></div>
          </div>
          <div className="tp-sp">
            <div className="tp-sp-avs">
              {["S","R","A","P","M"].map(function(l, i) {
                var bgs = ["#a78bfa","#f472b6","#22d3ee","#fb923c","#a78bfa"];
                return <div key={i} className="tp-sp-av" style={{ background: bgs[i] }}>{l}</div>;
              })}
            </div>
            <div className="tp-sp-text">Used by founders in <strong>real estate, D2C, SaaS, restaurants and agencies</strong> across India, UAE and Singapore.</div>
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
                <div className="tp-chat-desc">
                  {uploadedFileName ? (
                    <span className="tp-uploaded-chip">📎 {uploadedFileName}</span>
                  ) : tool.users}
                </div>
              </div>
              {countdown ? (
                <div className="tp-countdown">⚡ {countdown}</div>
              ) : (
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <button
                    onClick={function() { if (window.confirm("Start a fresh conversation?")) { clearToolHistory(currentTool); setDemoCompleted(false); setAuditPart1Done(false); setAuditPdfReady(false); } }}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"#2a2a2a", fontSize:11, fontFamily:"'DM Sans',sans-serif", padding:0 }}
                    title="Start fresh"
                  >
                    ↺ Fresh start
                  </button>
                  <div className="tp-chat-live"><div className="tp-dot" />Live</div>
                </div>
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
                  <div className="tp-banner-sub" style={{ color:"#666" }}>Your complete revenue audit is ready. Download it as a PDF.</div>
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
                if (msg.role === "system-notice") {
                  return <div key={i} className="tp-system-notice">{msg.content}</div>;
                }

                // ── SIMULATION PROSPECT MESSAGE ──────────────────────────
                if (msg.role === "sim-prospect") {
                  return (
                    <div key={i} className="tp-msg user">
                      <div className="tp-av" style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}>👤</div>
                      <div className="tp-msg-body" style={{ alignItems: "flex-end" }}>
                        <div className="tp-msg-name" style={{ color: "#fb923c" }}>Prospect</div>
                        <div className="tp-bubble" style={{ background: "rgba(251,146,60,0.05)", borderColor: "rgba(251,146,60,0.2)", color: "#ddd", borderRadius: "12px 4px 12px 12px" }}>
                          {renderText(msg.content)}
                        </div>
                      </div>
                    </div>
                  );
                }

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

            {/* ── SIMULATION RUNNING BANNER ── */}
            {simulationRunning && currentTool === "niquo" && (
              <div className="tp-sim-banner">
                <span>⚡ Live simulation running</span> — watch Niquo handle a real prospect for your business
              </div>
            )}

            {/* ── SCENARIO SELECTOR — shown after first simulation completes ── */}
            {simulationDone && currentTool === "niquo" && (
              <div className="tp-scenarios">
                <div className="tp-scenarios-label">Try harder scenarios ↓</div>
                <div className="tp-scenario-grid">
                  {[
                    { id: "SKEPTIC", title: "The Skeptic", desc: "Tried AI before. All garbage." },
                    { id: "ANGRY", title: "The Angry One", desc: "Rude from message one." },
                    { id: "PRICE", title: "Price Objection", desc: "Too expensive. Can't afford it." },
                    { id: "COMPETITOR", title: "Has a Competitor", desc: "Already uses HubSpot/Interakt." },
                    { id: "GHOSTER", title: "The Ghoster", desc: "Goes cold mid-conversation." },
                    { id: "CONFUSED", title: "The Confused One", desc: "Doesn't get it. Keeps asking why." },
                    { id: "ALMOST", title: "Almost Closed", desc: "Interested but keeps delaying." },
                    { id: "COMMITTEE", title: "Needs Approval", desc: "Has to check with the team." },
                    { id: "WRONGFIT", title: "Wrong Fit", desc: "Actually not your customer." },
                  ].map(function(sc) {
                    return (
                      <div
                        key={sc.id}
                        className={"tp-scenario-btn" + (activeScenario === sc.id ? " active" : "")}
                        onClick={function() {
                          setActiveScenario(sc.id);
                          setSimulationDone(false);
                          setMessages(function(prev) {
                            return { ...prev, niquo: [...prev.niquo, {
                              role: "system-notice",
                              content: "Running scenario: " + sc.title
                            }]};
                          });
                          setTimeout(function() {
                            sendMessage("Run the demo again", false, null, sc.id);
                          }, 300);
                        }}
                      >
                        <div className="tp-scenario-title">{sc.title}</div>
                        <div className="tp-scenario-desc">{sc.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── WEBSITE CONFIRMATION BANNER ── shown when Niquo finds a website */}
            {pendingWebsiteUrl && currentTool === "niquo" && (
              <div className="tp-confirm-banner">
                <div className="tp-confirm-text">
                  Found your website — <strong>{pendingWebsiteUrl}</strong>. Is this correct?
                </div>
                <div className="tp-confirm-btns">
                  <button className="tp-confirm-yes" onClick={function() { confirmWebsite(true); }}>Yes ✓</button>
                  <button className="tp-confirm-no" onClick={function() { confirmWebsite(false); }}>No</button>
                </div>
              </div>
            )}

            <div className="tp-inp-area">
              {/* Plus menu */}
              {showPlusMenu && currentTool === "niquo" && (
                <div className="tp-plus-menu">
                  <div className="tp-plus-item" onClick={function() { setShowPlusMenu(false); fileInputRef.current && fileInputRef.current.click(); }}>
                    <div className="tp-plus-item-icon" style={{ background: "rgba(251,146,60,0.1)" }}>📄</div>
                    Upload PDF
                  </div>
                  <div className="tp-plus-item" onClick={function() { setShowPlusMenu(false); fileInputRef.current && fileInputRef.current.click(); }}>
                    <div className="tp-plus-item-icon" style={{ background: "rgba(167,139,250,0.1)" }}>🖼️</div>
                    Upload Image
                  </div>
                </div>
              )}

              <div className="tp-inp-row">
                {/* Plus button — only shown for Niquo */}
                {currentTool === "niquo" && (
                  <button
                    className={"tp-plus-btn" + (showPlusMenu ? " active" : "")}
                    onClick={function() { setShowPlusMenu(function(v) { return !v; }); }}
                    title="Upload company document"
                  >
                    {uploadingFile ? (
                      <span style={{ fontSize: 12, color: "#22d3ee" }}>...</span>
                    ) : (
                      <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
                    )}
                  </button>
                )}

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
                <div className="tp-gate-ico">{currentTool === "audit" ? "🔍" : currentTool === "niquo" ? "⚡" : currentTool === "content" ? "✍️" : "🌐"}</div>
                <h2 className="tp-gate-title">{gateTitle()}</h2>
                <p className="tp-gate-sub" dangerouslySetInnerHTML={{ __html: gateSub() }} />
                <input type="email" className={"tp-gate-inp" + (emailError ? " err" : "")}
                  placeholder="your@email.com" value={emailInput}
                  onChange={function(e) { setEmailInput(e.target.value); setEmailError(""); }}
                  onKeyDown={function(e) { if (e.key === "Enter") handleSubmit(); }}
                  autoComplete="email" autoFocus />
                {emailError && <p className="tp-gate-err">⚠️ {emailError}</p>}
                <button className="tp-gate-btn"
                  onClick={function() {
                    if (window.fbq) window.fbq("trackCustom", "ButtonClick", { button_name: "gate_continue" });
                    handleSubmit();
                  }}
                  disabled={submitting}>
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
            <div style={{ fontSize:38, marginBottom:10 }}>{currentTool === "niquo" ? "⚡" : currentTool === "audit" ? "🔍" : "🔥"}</div>
            <div className="tp-upgrade-title">{currentTool === "niquo" ? "You've seen what Niquo can do!" : currentTool === "audit" ? "Audit credits used up!" : "You've hit your free limit!"}</div>
            <div className="tp-upgrade-sub">{currentTool === "niquo" ? "Ready to build this for your business?" : currentTool === "audit" ? "Want unlimited audits + all tools?" : "Upgrade to keep going."}</div>
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
                    <div className="tp-plan-feats">{plan.features.map(function(f) { return <span key={f} className="tp-plan-feat">{f}</span>; })}</div>
                  </a>
                );
              })}
            </div>
            <div className="tp-or">— or —</div>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" className="tp-cal-btn">📅 Book a Free Strategy Call with Saurav</a>
            <button onClick={function() { setShowUpgrade(false); }} style={{ background:"none", border:"none", color:"#333", cursor:"pointer", fontSize:12, marginTop:12, display:"block", width:"100%" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
