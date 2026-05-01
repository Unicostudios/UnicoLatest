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

  const renderMessage = (content, role) => {
    const parts = content.split(/(https?:\/\/[^\s]+)/g);
    return parts.map((part, i) =>
      part.match(/^https?:\/\//) ? (
        
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: role === "user" ? "white" : "#667eea",
            textDecoration: "underline",
            fontWeight: "bold",
            display: "block",
            marginTop: "6px",
          }}
        >
          👉 Click here to book your call
        </a>
      ) : (
        part
      )
    );
  };

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
