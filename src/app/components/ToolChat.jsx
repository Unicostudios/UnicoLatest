"use client";
import { useState, useRef, useEffect } from "react";

export default function ToolChat({ tool, email, onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! 👋 Welcome to ${tool.name}. ${
        tool.id === "content"
          ? "Tell me about your business or startup idea and I'll create killer content for you!"
          : tool.id === "code"
          ? "Share your code or describe the problem you're facing and I'll fix it!"
          : "I'm Aria! Tell me about your business and I'll help you grow!"
      }`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uses, setUses] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const messagesEndRef = useRef(null);
  const FREE_LIMIT = 10;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessage = (content, role) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{
            color: role === "user" ? "white" : tool.color,
            textDecoration: "underline",
            fontWeight: "bold",
            display: "block",
            marginTop: "6px",
          }}>
            👉 Click here to book your call
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    if (uses >= FREE_LIMIT) {
      setShowUpgrade(true);
      return;
    }

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setUses((prev) => prev + 1);

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
          mode: tool.id,
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
        { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      fontFamily: "sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: tool.gradient,
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        <button
          onClick={onBack}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back
        </button>
        <div styl
