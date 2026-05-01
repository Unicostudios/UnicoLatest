"use client";
import { useState, useRef, useEffect } from "react";

export default function ToolChat({ tool, email, onBack }) {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: `Hi! 👋 Welcome to ${tool.name}. ${tool.id === "content" ? "Tell me about your business and I'll create killer content!" : tool.id === "code" ? "Share your code and I'll fix it!" : "Tell me about your business and I'll help you grow!"}`,
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uses, setUses] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const messagesEndRef = useRef(null);
  const FREE_LIMIT = 10;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (uses >= FREE_LIMIT) { setShowUpgrade(true); return; }
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setUses((prev) => prev + 1);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: updatedMessages.slice(1, -1), mode: tool.id }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong!" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <div style={{ background: tool.gradient, padding: "16px 24px", display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", borderRadius: "8px", padding: "8px 12px", cursor: "pointer" }}>← Back</button>
        <div style={{ fontSize: "24px" }}>{tool.emoji}</div>
        <div>
          <div style={{ color: "white", fontWeight: "700", fontSize: "18px" }}>{tool.name}</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{FREE_LIMIT - uses} free uses remaining</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px", width: "100%", margin: "0 auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", gap: "8px" }}>
            {msg.role === "assistant" && <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: tool.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{tool.emoji}</div>}
            <div style={{ maxWidth: "70%", padding: "12px 16px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role === "user" ? tool.gradient : "#1a1a1a", color: "white", fontSize: "15px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{msg.content}</div>
          </div>
        ))}
        {loading && <div style={{ color: "#888", padding: "12px 16px", background: "#1a1a1a", borderRadius: "18px", width: "fit-content" }}>typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ padding: "16px 24px", background: "#111", borderTop: "1px solid #222" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", gap: "12px" }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} placeholder="Type your message..." style={{ flex: 1, padding: "12px 16px", background: "#1a1a1a", border: "1px solid #333", borderRadius: "12px", color: "white", fontSize: "15px", outline: "none" }} />
          <button onClick={sendMessage} style={{ background: tool.gradient, color: "white", border: "none", borderRadius: "12px", padding: "12px 20px", cursor: "pointer", fontSize: "20px" }}>➤</button>
        </div>
      </div>
      {showUpgrade && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#111", border: "1px solid #333", borderRadius: "24px", padding: "40px", maxWidth: "440px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔥</div>
            <h2 style={{ color: "white", fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>You're on a roll!</h2>
            <p style={{ color: "#888", marginBottom: "24px", lineHeight: "1.6" }}>You've used all your free credits for <strong style={{ color: "white" }}>{tool.name}</strong>. Upgrade to keep going!</p>
            <button style={{ width: "100%", padding: "14px", background: tool.gradient, border: "none", borderRadius: "12px", color: "white", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginBottom: "12px" }}>🚀 Upgrade — Coming Soon</button>
            <a href="https://calendly.com/unicostudioss/30min" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "14px", background: "#1a1a1a", border: "1px solid #333", borderRadius: "12px", color: "white", fontSize: "16px", textDecoration: "none", marginBottom: "12px" }}>📅 Book a Free Call</a>
            <button onClick={() => setShowUpgrade(false)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "14px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
