"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SECRET_KEY = "bathsy2025";

const ANIMATED_CONVERSATION = [
  { role: "out", text: "Hey Rahul, Riya here from Bathsy.", delay: 0, typing: 1200 },
  { role: "out2", text: "Saw you were enquiring about a shower enclosure, what exactly are you looking for?", delay: 2500, typing: 2500 },
  { role: "in", text: "New flat. Got possession in about 6-7 months.", delay: 8000 },
  { role: "out", text: "Oh nice, which project?", delay: 11000, typing: 1500 },
  { role: "in", text: "Prestige Shantiniketan, Whitefield.", delay: 16000 },
  { role: "out", text: "Prestige Shantiniketan, that is exciting!", delay: 19500, typing: 2000 },
  { role: "out2", text: "First home?", delay: 22500, typing: 800 },
  { role: "in", text: "Yes first home. Bangalore has been expensive but it is a good investment.", delay: 29000 },
  { role: "out", text: "I swear the prices have gone so high, but it is also a great investment.", delay: 33500, typing: 3000 },
  { role: "in", text: "How much would a shower enclosure cost roughly?", delay: 40000 },
  { role: "out", text: "Typically starts from Rs.15,000 to Rs.20,000, completely depends on the glass type and size.", delay: 44500, typing: 3500 },
  { role: "in", text: "I am also checking with 2-3 other vendors.", delay: 51000 },
  { role: "out", text: "Makes sense to check around.", delay: 54000, typing: 1500 },
  { role: "out2", text: "Just ask them one thing, what is the hardware warranty? We give 10 years, most give 7.", delay: 57000, typing: 3000 },
  { role: "in", text: "Ok that is a good point. What is the next step?", delay: 64000 },
  { role: "out", text: "Why don't you come visit our experience centre at HRBR Layout?", delay: 68000, typing: 2500 },
  { role: "out2", text: "You can see all the glass options in person and plan things properly. If there are changes to make before the builder finishes, better to know now. Can actually save you money.", delay: 72000, typing: 5000 },
  { role: "out3", text: "https://share.google/1ySxQCwcZuj01K0ST", delay: 79000, typing: 1000 },
  { role: "in", text: "You are not going to push me for sales right?", delay: 85000 },
  { role: "out", text: "No no not at all. I suggest this to a lot of customers, if I can help someone make a better decision why not.", delay: 89000, typing: 4000 },
  { role: "out2", text: "Tomorrow I would be in your shoes too and I would want someone to tell me the same :)", delay: 95000, typing: 3500 },
  { role: "in", text: "Haha fair enough. I will come this Saturday.", delay: 102000 },
  { role: "out", text: "What time works for you on Saturday?", delay: 105500, typing: 2000 },
  { role: "in", text: "Around 11am works.", delay: 111000 },
  { role: "out", text: "Perfect, confirmed for Saturday 11am at our HRBR Layout experience centre.", delay: 114500, typing: 3000 },
  { role: "out2", text: "See you then Rahul!", delay: 119500, typing: 1000 },
  { role: "result", delay: 122000 },
];

function AnimatedDemo() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);
  const msgsRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
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
        if (item.role === "result") { setDone(true); setTyping(false); return; }
        if (item.role === "out" || item.role === "out2" || item.role === "out3") {
          setTyping(true);
          const typingTime = item.typing || 1500;
          setTimeout(() => { setTyping(false); setMessages(prev => [...prev, {...item, role: "out"}]); next(); }, typingTime);
        } else { setMessages(prev => [...prev, item]); next(); }
      }, Math.max(wait, 300));
    }
    next();
  }

  function reset() {
    clearTimeout(timerRef.current);
    setMessages([]); setDone(false); setTyping(false); setStarted(false);
  }

  const baseTime = new Date();
  function getMsgTime(index) {
    const d = new Date(baseTime.getTime() + index * 45000);
    return d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
  }

  return (
    <div style={{ background: "#f0ebe3", borderRadius: 20, overflow: "hidden", border: "1px solid #d4c9bc", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
      <div style={{ background: "#075e54", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#128c7e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, color: "#fff", fontSize: 16, flexShrink: 0 }}>B</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>Bathsy</div>
          <div style={{ fontSize: 11, color: "#a8d5cf" }}>{typing ? "typing..." : "shower enclosure specialist"}</div>
        </div>
        <div style={{ color: "#fff", opacity: 0.7, fontSize: 20 }}>⋮</div>
      </div>

      <div ref={msgsRef} style={{ height: 380, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4, background: "#e5ddd5", scrollBehavior: "smooth" }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ background: "rgba(255,255,255,0.7)", fontSize: 11, color: "#666", padding: "3px 12px", borderRadius: 8 }}>Today</span>
        </div>
        {!started && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.5 }}>Watch Riya handle a real Bathsy lead — start to booked.</div>
              <button onClick={startDemo} style={{ background: "#128c7e", color: "#fff", border: "none", borderRadius: 100, padding: "10px 24px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Start demo
              </button>
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "out" ? "flex-end" : "flex-start", marginBottom: 2 }}>
            <div style={{ maxWidth: "78%", background: msg.role === "out" ? "#dcf8c6" : "#fff", borderRadius: msg.role === "out" ? "10px 3px 10px 10px" : "3px 10px 10px 10px", padding: "8px 10px 20px", fontSize: 13, lineHeight: 1.55, color: "#111", position: "relative", animation: "fadein 0.3s ease" }}>
              {msg.text.split("\n").map((line, li) => <div key={li}>{line || "\u00a0"}</div>)}
              <div style={{ position: "absolute", bottom: 4, right: 8, fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 2 }}>
                {getMsgTime(i)}{msg.role === "out" && <span style={{ color: "#4fc3f7" }}>✓✓</span>}
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#fff", borderRadius: "3px 10px 10px 10px", padding: "10px 14px", display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#aaa", animation: `bounce 1.2s ${d}s ease infinite` }} />)}
            </div>
          </div>
        )}
        {done && (
          <div style={{ background: "#fff", borderRadius: 10, padding: "12px 14px", margin: "8px 0", borderLeft: "3px solid #128c7e" }}>
            <div style={{ fontWeight: 600, color: "#075e54", fontSize: 13, marginBottom: 4 }}>Lead closed — site visit booked</div>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>
              Rahul Mehta · Prestige Shantiniketan, Tower B, Flat 1204<br />
              Thursday morning · Whitefield, Bangalore<br />
              Response time: 60 seconds · Messages to close: 8
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "#f0f0f0", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid #ddd" }}>
        <div style={{ fontSize: 20, color: "#888" }}>😊</div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "8px 14px", fontSize: 13, color: "#aaa" }}>Type a message</div>
        <div style={{ fontSize: 20, color: "#888" }}>🎤</div>
      </div>
      {started && (
        <div style={{ padding: "8px 14px", background: "#f7f7f7", display: "flex", justifyContent: "center", gap: 10, borderTop: "1px solid #e8e8e8" }}>
          <button onClick={reset} style={{ background: "none", border: "1px solid #ccc", borderRadius: 100, padding: "6px 18px", fontSize: 12, cursor: "pointer", color: "#666" }}>Reset</button>
          {done && <button onClick={startDemo} style={{ background: "#128c7e", border: "none", borderRadius: 100, padding: "6px 18px", fontSize: 12, cursor: "pointer", color: "#fff", fontWeight: 600 }}>Watch again</button>}
        </div>
      )}
      <style>{`@keyframes fadein{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);
  const inputRef = useRef(null);

  const GREETING_1 = "Hey, Riya here from Bathsy.";
  const GREETING_2 = "Saw you were enquiring about a shower enclosure, what exactly are you looking for?";

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, loading]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    try {
      const history = messages.filter(m => m.role === "user" || m.role === "assistant").map(m => ({ role: m.role === "assistant" ? "niquo" : "customer", content: m.content }));
      await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
      const res = await fetch("/api/riya", {
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

  const timeStr = new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0");

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
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
          <div style={{ maxWidth: "78%", background: "#dcf8c6", borderRadius: "10px 3px 10px 10px", padding: "8px 10px 20px", fontSize: 13, lineHeight: 1.55, color: "#111", position: "relative" }}>
            {GREETING_1}
            <div style={{ position: "absolute", bottom: 4, right: 8, fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 2 }}>{timeStr}<span style={{ color: "#4fc3f7" }}>✓✓</span></div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
          <div style={{ maxWidth: "78%", background: "#dcf8c6", borderRadius: "10px 3px 10px 10px", padding: "8px 10px 20px", fontSize: 13, lineHeight: 1.55, color: "#111", position: "relative" }}>
            {GREETING_2}
            <div style={{ position: "absolute", bottom: 4, right: 8, fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 2 }}>{timeStr}<span style={{ color: "#4fc3f7" }}>✓✓</span></div>
          </div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "assistant" ? "flex-end" : "flex-start", marginBottom: 2 }}>
            <div style={{ maxWidth: "78%", background: msg.role === "assistant" ? "#dcf8c6" : "#fff", borderRadius: msg.role === "assistant" ? "10px 3px 10px 10px" : "3px 10px 10px 10px", padding: "8px 10px 20px", fontSize: 13, lineHeight: 1.55, color: "#111", position: "relative" }}>
              {(msg.content || "").split("\n").map((line, li) => <div key={li}>{line || "\u00a0"}</div>)}
              <div style={{ position: "absolute", bottom: 4, right: 8, fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 2 }}>
                {timeStr}{msg.role === "assistant" && <span style={{ color: "#4fc3f7" }}>✓✓</span>}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#fff", borderRadius: "3px 10px 10px 10px", padding: "10px 14px", display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 0.2, 0.4].map((d, i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#aaa", animation: `bounce 1.2s ${d}s ease infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "#f0f0f0", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, borderTop: "1px solid #ddd" }}>
        <div style={{ fontSize: 20, color: "#888" }}>😊</div>
        <div style={{ flex: 1, background: "#fff", borderRadius: 20, padding: "6px 14px", display: "flex", alignItems: "center" }}>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Type a message…" style={{ flex: 1, border: "none", outline: "none", fontSize: 13, background: "transparent", fontFamily: "inherit" }} />
        </div>
        <button onClick={() => send()} style={{ width: 36, height: 36, borderRadius: "50%", background: "#128c7e", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 }}>➤</button>
      </div>
      <style>{`@keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}`}</style>
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
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');*{box-sizing:border-box;}`}</style>
      <div style={{ background: "#fff", borderBottom: "1px solid #ede8e0", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="https://bathsy.in/wp-content/uploads/2022/04/Bathsy-logo-white-e1751303003207.png" style={{ height: 28, filter: "invert(1)" }} alt="Bathsy" onError={e => { e.target.style.display = "none"; }} />
          <div style={{ width: 1, height: 20, background: "#e0dbd4" }} />
          <span style={{ fontSize: 12, color: "#999", fontWeight: 500 }}>AI Sales Demo</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#25d366" }} />
          <span style={{ fontSize: 12, color: "#666" }}>Live</span>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "#e8f5e9", color: "#2e7d32", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", padding: "4px 14px", borderRadius: 100, marginBottom: 14, textTransform: "uppercase" }}>Niquo AI for Bathsy</div>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.2 }}>Every lead. Handled in 60 seconds.</h1>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>Watch Riya close a real Bathsy lead — then try it yourself below.</p>
        </div>

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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 48 }}>
          {[{ num: "60 sec", label: "Response time" }, { num: "8", label: "Messages to close" }, { num: "24/7", label: "Always available" }].map(s => (
            <div key={s.num} style={{ background: "#fff", border: "1px solid #ede8e0", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#075e54", marginBottom: 2 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#999" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#128c7e", color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>Now try it yourself</div>
              <div style={{ fontSize: 12, color: "#999" }}>Type anything a customer would say — Riya responds live</div>
            </div>
          </div>
          <LiveChat />
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 24 }}>This is a private demo. Not indexed or publicly accessible.</div>
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
