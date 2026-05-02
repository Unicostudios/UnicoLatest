"use client";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Most businesses waste ₹50,000–₹2,00,000 every month on marketing that doesn't work. Want to find out in 2 minutes if yours is one of them? 👀",
      }]);
    }
    if (open) setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100);
  }, [open]);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    const userMsg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages, mode: "aria" }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again!" }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!pathname) return null;
  if (pathname === "/tools" || pathname.startsWith("/tools/")) return null;

  return (
    <>
      <div onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: "24px", right: "24px",
        width: "56px", height: "56px", borderRadius: "50%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", zIndex: 9999, color: "white", fontSize: "22px",
        boxShadow: "0 4px 20px rgba(102,126,234,0.5)",
        transition: "transform 0.2s",
      }}>
        {open ? "✕" : "💬"}
      </div>

      {open && (
        <div style={{
          position: "fixed", bottom: "90px", right: "24px",
          width: "min(360px, calc(100vw - 32px))",
          height: "min(500px, calc(100vh - 120px))",
          background: "#0f0f0f", border: "1px solid #222",
          borderRadius: "16px", zIndex: 9998, display: "flex",
          flexDirection: "column", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{
            padding: "16px 18px", background: "#141414",
            borderBottom: "1px solid #222", display: "flex",
            alignItems: "center", gap: "12px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "16px", flexShrink: 0,
            }}>🤖</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>Aria</div>
              <div style={{ color: "#22c55e", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                Online
              </div>
            </div>
            <div style={{ marginLeft: "auto", color: "#555", fontSize: "12px" }}>Unico Studios AI</div>
          </div>

          <div style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: "12px",
            scrollbarWidth: "thin", scrollbarColor: "#222 transparent",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 13px",
                  borderRadius: msg.role === "user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",
                  background: msg.role === "user" ? "rgba(102,126,234,0.15)" : "#1a1a1a",
                  border: msg.role === "user" ? "1px solid rgba(102,126,234,0.3)" : "1px solid #2a2a2a",
                  color: msg.role === "user" ? "#c7d2fe" : "#b0b0b0",
                  fontSize: "13px", lineHeight: "1.6", whiteSpace: "pre-wrap",
                }}>
                  {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, j) =>
                    part.match(/^https?:\/\//) ? (
                      <a key={j} href={part} target="_blank" rel="noopener noreferrer"
                        style={{ color: "#667eea", textDecoration: "underline", display: "block", marginTop: "4px", fontWeight: 600 }}>
                        👉 Book your free call
                      </a>
                    ) : <span key={j}>{part}</span>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex" }}>
                <div style={{
                  padding: "10px 13px", borderRadius: "4px 12px 12px 12px",
                  background: "#1a1a1a", border: "1px solid #2a2a2a",
                  display: "flex", gap: "4px", alignItems: "center",
                }}>
                  {[0,1,2].map((i) => (
                    <span key={i} style={{
                      width: "5px", height: "5px", borderRadius: "50%",
                      background: "#555", display: "inline-block",
                      animation: "bounce 1.2s ease infinite",
                      animationDelay: i * 0.2 + "s",
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: "12px 14px", borderTop: "1px solid #222",
            background: "#080808", display: "flex", gap: "8px", alignItems: "flex-end",
          }}>
            <textarea ref={inputRef} value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              style={{
                flex: 1, background: "#111", border: "1px solid #2a2a2a",
                borderRadius: "8px", padding: "8px 12px", color: "#ccc",
                fontSize: "13px", resize: "none", outline: "none",
                fontFamily: "inherit", lineHeight: "1.5", maxHeight: "80px",
                overflowY: "auto",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 80) + "px";
              }}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}
              style={{
                width: "34px", height: "34px", borderRadius: "8px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                border: "none", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                opacity: loading || !input.trim() ? 0.5 : 1,
                flexShrink: 0,
              }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
