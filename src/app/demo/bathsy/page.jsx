"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SECRET_KEY = "bathsy2025";

const ANIMATED_CONVERSATION = [
  { role: "out", text: "Hi Rahul! This is Priya from Bathsy 🚿\nSaw you were interested in a shower enclosure for your new flat in Whitefield. Quick question — is this for a new flat or an existing bathroom renovation?", delay: 0 },
  { role: "in", text: "New flat. Just got possession last week.", delay: 3000 },
  { role: "out", text: "Congratulations! 🎉 Whitefield flats usually have great bathroom layouts.\n\nWhat size is your shower area roughly — do you know if it's a corner space or against one wall?", delay: 6000 },
  { role: "in", text: "Corner space I think. About 4x4 feet.", delay: 9500 },
  { role: "out", text: "Perfect for an L-shape enclosure — that's our most popular for exactly that layout.\n\nFor a 4x4 corner, you're looking at ₹14,000–₹22,000 depending on the glass type. What look are you going for — open and bright, or more private?", delay: 12500 },
  { role: "in", text: "What's the difference? And why such a range?", delay: 16500 },
  { role: "out", text: "Three glass options:\n\n• Clear — open, bright, easiest to clean. ₹599/sq.ft\n• Frosted — privacy, softer look. ₹665/sq.ft\n• Fluted — textured, very premium. ₹849/sq.ft. Trending a lot right now.\n\nAll Saint-Gobain toughened glass — 5x stronger than regular. 10-year hardware warranty, 3-year glass warranty.", delay: 19000 },
  { role: "in", text: "10 years warranty is good. How long does installation take?", delay: 24000 },
  { role: "out", text: "Full process is 7–10 days:\n\n1️⃣ Free site visit — we measure your exact bathroom\n2️⃣ Custom quote in 24 hours\n3️⃣ Manufacturing — 5-7 days\n4️⃣ Installation — just 4-6 hours, no damage to tiles\n\nThe site visit is completely free, no commitment.", delay: 27000 },
  { role: "in", text: "I'm also getting quotes from 2 other vendors. What makes Bathsy different?", delay: 32000 },
  { role: "out", text: "Honestly — compare us. Three things most others won't match:\n\n• Saint-Gobain glass exclusively (world's #1)\n• 10-year hardware warranty vs 7 years most competitors\n• Every piece custom-made for your exact bathroom — no standard sizes\n\nBut don't take my word for it. Let us come do the free site visit — you see the quality in person and get an exact quote. Zero obligation.", delay: 35500 },
  { role: "in", text: "OK fair enough. Can we schedule Thursday morning?", delay: 41000 },
  { role: "out", text: "Thursday morning works perfectly ✅\n\nCan I get your flat number and tower? We'll send a WhatsApp reminder Wednesday evening with our team member's contact.", delay: 44000 },
  { role: "in", text: "Rahul Mehta. Prestige Shantiniketan, Tower B, Flat 1204.", delay: 48000 },
  { role: "out", text: "Done, Rahul 🙌\n\nSite visit confirmed — Thursday morning, Prestige Shantiniketan, Tower B, Flat 1204.\n\nYou'll hear from us Wednesday evening. Looking forward to showing you the fluted glass with matte black hardware in person — it looks stunning in Whitefield interiors.", delay: 51000 },
  { role: "result", delay: 55000 },
];

function AnimatedDemo() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const msgsRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function startDemo() {
    setStarted(true);
    setMessages([]);
    setDone(false);
    setTyping(false);

    let i = 0;
    function next() {
      if (i >= ANIMATED_CONVERSATION.length) return;
      const item = ANIMATED_CONVERSATION[i];
      const prevDelay = i === 0 ? 0 : ANIMATED_CONVERSATION[i - 1].delay;
      const wait = item.delay - prevDelay;
      i++;

      timerRef.current = setTimeout(() => {
        if (item.role === "result") {
          setDone(true);
          setTyping(false);
          return;
        }
        if (item.role === "out") {
          setTyping(true);
          setTimeout(() => {
            setTyping(false);
            setMessages(prev => [...prev, item]);
            next();
          }, 1400);
        } else {
          setMessages(prev => [...prev, item]);
          next();
        }
      }, Math.max(wait, 300));
    }
    next();
  }

  function reset() {
    clearTimeout(timerRef.current);
    setMessages([]);
    setDone(false);
    setTyping(false);
    setStarted(false);
  }

  const now = new Date();
  const timeStr = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

  return (
    <div style={{ background: "#f0ebe3", borderRadius: 20, overflow: "hidden", border: "1px solid #d4c9bc", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
      {/* WA Header */}
      <div style={{ background: "#075e54", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#128c7e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#fff", fontSize: 16, flexShrink: 0 }}>B</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>Bathsy</div>
          <div style={{ fontSize: 11, color: "#a8d5cf" }}>{typing ? "typing..." : "shower enclosure specialist"}</div>
        </div>
        <div style={{ color: "#fff", opacity: 0.7, fontSize: 20 }}>⋮</div>
      </div>

      {/* Messages */}
      <div ref={msgsRef} style={{ height: 380, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4, background: "#e5ddd5", scrollBehavior: "smooth" }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ background: "rgba(255,255,255,0.7)", fontSize: 11, color: "#666", padding: "3px 12px", borderRadius: 8 }}>Today</span>
        </div>

        {!started && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🚿</div>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.5 }}>Watch Niquo handle a real<br />Bathsy lead — start to booked.</div>
              <button onClick={startDemo} style={{ background: "#128c7e", color: "#fff", border: "none", borderRadius: 100, padding: "10px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                ▶ Start demo
              </button>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "out" ? "flex-end" : "flex-start", marginBottom: 2 }}>
            <div style={{
              maxWidth: "78%",
              background: msg.role === "out" ? "#dcf8c6" : "#fff",
              borderRadius: msg.role === "out" ? "10px 3px 10px 10px" : "3px 10px 10px 10px",
              padding: "8px 10px 20px",
              fontSize: 13,
              lineHeight: 1.55,
              color: "#111",
              position: "relative",
              animation: "fadein 0.3s ease"
            }}>
              {msg.text.split("\n").map((line, li) => <div key={li}>{line || "\u00a0"}</div>)}
              <div style={{ position: "absolute", bottom: 4, right: 8, fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 2 }}>
                {timeStr}{msg.role === "out" && <span style={{ color: "#53bdeb" }}>✓✓</span>}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#fff", borderRadius: "3px 10px 10px 10px", padding: "10px 14px", display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#aaa", animation: `bounce 1.2s ${d}s ease infinite` }} />
              ))}
            </div>
          </div>
        )}

        {done && (
          <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", margin: "8px 0", borderLeft: "3px solid #128c7e" }}>
            <div style={{ fontWeight: 600, color: "#075e54", fontSize: 13, marginBottom: 4 }}>✅ Lead closed — site visit booked</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
              Rahul Mehta · Prestige Shantiniketan, Tower B, Flat 1204<br />
              Thursday morning · Whitefield, Bangalore<br />
              Response time: 60 seconds · Messages to close: 8
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{ background: "#f0f0f0", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid #ddd" }}>
        <div style={{ fontSize: 20, color: "#888" }}>😊</div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "8px 14px", fontSize: 13, color: "#aaa" }}>Type a message</div>
        <div style={{ fontSize: 20, color: "#888" }}>🎤</div>
      </div>

      {started && (
        <div style={{ padding: "8px 14px", background: "#f7f7f7", display: "flex", justifyContent: "center", gap: 10, borderTop: "1px solid #e8e8e8" }}>
          <button onClick={reset} style={{ background: "none", border: "1px solid #ccc", borderRadius: 100, padding: "6px 18px", fontSize: 12, cursor: "pointer", color: "#666" }}>
            Reset
          </button>
          {done && (
            <button onClick={startDemo} style={{ background: "#128c7e", border: "none", borderRadius: 100, padding: "6px 18px", fontSize: 12, cursor: "pointer", color: "#fff", fontWeight: 600 }}>
              ↺ Watch again
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadein { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
      `}</style>
    </div>
  );
}

function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);
  const inputRef = useRef(null);

  const GREETING = "Hi! This is Priya from Bathsy 🚿 How can I help you today?";

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    const userMsg = { role: "user", content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const history = messages.filter(m => m.role === "user" || m.role === "assistant").map(m => ({ role: m.role === "assistant" ? "niquo" : "customer", content: m.content }));
      const res = await fetch("https://niquo-bathsy-git-main-unico-studios-projects.vercel.app/api/niquo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, incomingMessage: msg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply || "Let me check on that for you." }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong — please try again." }]);
    }
    setLoading(false);
  }

  const now = new Date();
  const timeStr = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

  const CHIPS = ["What are your prices?", "I need a shower enclosure for my new flat", "How long does installation take?", "What glass types do you have?"];

  return (
    <div style={{ background: "#f0ebe3", borderRadius: 20, overflow: "hidden", border: "1px solid #d4c9bc", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
      <div style={{ background: "#075e54", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#128c7e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#fff", fontSize: 16 }}>B</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>Bathsy</div>
          <div style={{ fontSize: 11, color: loading ? "#f0d080" : "#a8d5cf" }}>{loading ? "typing..." : "shower enclosure specialist"}</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#25d366" }} />
      </div>

      <div ref={msgsRef} style={{ height: 340, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4, background: "#e5ddd5" }}>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <span style={{ background: "rgba(255,255,255,0.7)", fontSize: 11, color: "#666", padding: "3px 12px", borderRadius: 8 }}>Today</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div style={{ maxWidth: "78%", background: "#fff", borderRadius: "3px 10px 10px 10px", padding: "8px 10px 20px", fontSize: 13, lineHeight: 1.55, color: "#111", position: "relative" }}>
            {GREETING}
            <div style={{ position: "absolute", bottom: 4, right: 8, fontSize: 10, color: "#888" }}>{timeStr}</div>
          </div>
        </div>

        {messages.length === 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, marginLeft: 4 }}>
            {CHIPS.map(c => (
              <button key={c} onClick={() => send(c)} style={{ background: "#fff", border: "1px solid #128c7e", borderRadius: 100, padding: "5px 12px", fontSize: 12, color: "#128c7e", cursor: "pointer", fontWeight: 500 }}>
                {c}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 2 }}>
            <div style={{
              maxWidth: "78%",
              background: msg.role === "user" ? "#dcf8c6" : "#fff",
              borderRadius: msg.role === "user" ? "10px 3px 10px 10px" : "3px 10px 10px 10px",
              padding: "8px 10px 20px",
              fontSize: 13,
              lineHeight: 1.55,
              color: "#111",
              position: "relative"
            }}>
              {(msg.content || "").split("\n").map((line, li) => <div key={li}>{line || "\u00a0"}</div>)}
              <div style={{ position: "absolute", bottom: 4, right: 8, fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 2 }}>
                {timeStr}{msg.role === "user" && <span style={{ color: "#53bdeb" }}>✓✓</span>}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#fff", borderRadius: "3px 10px 10px 10px", padding: "10px 14px", display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#aaa", animation: `bounce 1.2s ${d}s ease infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "#f0f0f0", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid #ddd" }}>
        <div style={{ fontSize: 20, color: "#888" }}>😊</div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "6px 14px", display: "flex", alignItems: "center" }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type a message…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 13, background: "transparent", fontFamily: "inherit" }}
          />
        </div>
        <button onClick={() => send()} style={{ width: 36, height: 36, borderRadius: "50%", background: "#128c7e", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>
          ➤
        </button>
      </div>
      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}

function BathsyDemoInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get("key");

  if (key !== SECRET_KEY) {
    if (typeof window !== "undefined") router.replace("/");
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf8f5", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ede8e0", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="https://bathsy.in/wp-content/uploads/2022/04/Bathsy-logo-white-e1751303003207.png"
            style={{ height: 28, filter: "invert(1)" }} alt="Bathsy" onError={e => { e.target.style.display = "none"; }} />
          <div style={{ width: 1, height: 20, background: "#e0dbd4" }} />
          <span style={{ fontSize: 12, color: "#999", fontWeight: 500 }}>AI Sales Demo</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#25d366" }} />
          <span style={{ fontSize: 12, color: "#666" }}>Live</span>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 60px" }}>

        {/* Intro */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "#e8f5e9", color: "#2e7d32", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", padding: "4px 14px", borderRadius: 100, marginBottom: 14, textTransform: "uppercase" }}>
            Niquo AI for Bathsy
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.2 }}>
            Every lead. Handled in 60 seconds.
          </h1>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
            Watch Niquo close a real Bathsy lead — then try it yourself below.
          </p>
        </div>

        {/* Section 1 — Animated demo */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#075e54", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>Watch a lead get closed automatically</div>
              <div style={{ fontSize: 12, color: "#999" }}>Facebook lead · Whitefield flat · Site visit booked</div>
            </div>
          </div>
          <AnimatedDemo />
        </div>

        {/* Divider with stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 48 }}>
          {[
            { num: "60 sec", label: "Response time" },
            { num: "8", label: "Messages to close" },
            { num: "24/7", label: "Always available" },
          ].map(s => (
            <div key={s.num} style={{ background: "#fff", border: "1px solid #ede8e0", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#075e54", marginBottom: 2 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#999" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Section 2 — Live chat */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#128c7e", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>Now try it yourself</div>
              <div style={{ fontSize: 12, color: "#999" }}>Type anything a customer would say — Niquo responds live</div>
            </div>
          </div>
          <LiveChat />
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 24 }}>
          This is a private demo. Not indexed or publicly accessible.
        </div>
      </div>
    </div>
  );
}

export default function BathsyDemoPage() {
  return (
    <Suspense fallback={null}>
      <BathsyDemoInner />
    </Suspense>
  );
}
