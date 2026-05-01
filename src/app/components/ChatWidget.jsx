"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! 👋 I'm Aria from Unico Studios. I help businesses like yours grow faster with SEO, Paid Ads, and killer websites. What kind of business are you running?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const history = updatedMessages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          history: history.slice(0, -1),
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again!",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000 }}>
      {isOpen && (
        <div style={{
          width: "350px",
          height: "500px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          marginBottom: "16px",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "16px",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}>🤖</div>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>Aria</div>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>🟢 Unico Studios AI</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "#f8f9fa",
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: "8px",
              }}>
                {msg.role === "assistant" && (
                  <div style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}>🤖</div>
                )}
                <div style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "#ffffff",
                  color: msg.role === "user" ? "white" : "#333",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                }}>🤖</div>
                <div style={{
                  padding: "10px 14px",
                  borderRadius: "18px 18px 18px 4px",
                  background: "#ffffff",
                  fontSize: "14px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}>
                  Aria is typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 16px",
            background: "#ffffff",
            borderTop: "1px solid #eee",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "24px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >➤</button>
          </div>

          {/* Footer */}
          <div style={{
            padding: "6px",
            textAlign: "center",
            fontSize: "11px",
            color: "#999",
            background: "#ffffff",
          }}>
            Powered by Unico Studios AI
          </div>
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          cursor: "pointer",
          fontSize: "28px",
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </div>
  );
}
