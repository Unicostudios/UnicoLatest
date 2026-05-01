"use client";
import { useState } from "react";
import ToolChat from "../components/ToolChat";

const tools = [
  {
    id: "content",
    name: "Startup Content Engine",
    emoji: "✍️",
    description: "Generate high-conversion content for your startup. Scripts, reels, hooks, CTAs — all done for you.",
    color: "#667eea",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    features: ["Reel Scripts", "Hook Ideas", "CTA Lines", "Thumbnail Concepts"],
  },
  {
    id: "code",
    name: "Vibe Code Fixer",
    emoji: "💻",
    description: "Paste your messy code and get back clean, optimized, production-ready code instantly.",
    color: "#f093fb",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    features: ["Bug Fixes", "Code Cleanup", "Architecture Tips", "Performance Boost"],
  },
  {
    id: "sales",
    name: "Aria — AI Sales Assistant",
    emoji: "🤖",
    description: "Talk to Aria, our AI sales assistant. She will understand your business and help you grow.",
    color: "#4facfe",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    features: ["Business Analysis", "Growth Strategy", "Free Consultation", "Book a Call"],
  },
];

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingTool, setPendingTool] = useState(null);

  const handleToolClick = (tool) => {
    if (emailSubmitted) {
      setSelectedTool(tool);
    } else {
      setPendingTool(tool);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) return;
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tool: pendingTool?.name || "Tools Page" }),
      });

      setEmailSubmitted(true);
      setSelectedTool(pendingTool);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (selectedTool) {
    return (
      <ToolChat
        tool={selectedTool}
        email={email}
        onBack={() => setSelectedTool(null)}
      />
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "white",
      fontFamily: "sans-serif",
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "80px 20px 40px",
      }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "50px",
          padding: "8px 20px",
          fontSize: "14px",
          marginBottom: "20px",
        }}>
          🚀 Free AI Tools by Unico Studios
        </div>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "800",
          margin: "0 0 16px",
          background: "linear-gradient(135deg, #667eea 0%, #f5576c 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          AI Tools That Actually Work
        </h1>
        <p style={{
          fontSize: "18px",
          color: "#888",
          maxWidth: "500px",
          margin: "0 auto",
        }}>
          Free tools built for founders, startups and brands who want to grow faster.
        </p>
      </div>

      {/* Tools Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 20px 80px",
      }}>
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleToolClick(tool)}
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "20px",
              padding: "32px",
              cursor: "pointer",
              transition: "transform 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = tool.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#222";
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>{tool.emoji}</div>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>
              {tool.name}
            </h2>
            <p style={{ color: "#888", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
              {tool.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
              {tool.features.map((f) => (
                <span key={f} style={{
                  background: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "13px",
                  color: "#aaa",
                }}>
                  {f}
                </span>
              ))}
            </div>
            <button style={{
              width: "100%",
              padding: "14px",
              background: tool.gradient,
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}>
              Try {tool.name} →
            </button>
          </div>
        ))}
      </div>

      {/* Email Gate Modal */}
      {pendingTool && !emailSubmitted && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px",
        }}>
          <div style={{
            background: "#111",
            border: "1px solid #333",
            borderRadius: "24px",
            padding: "40px",
            maxWidth: "440px",
            width: "100%",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>{pendingTool.emoji}</div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "12px" }}>
              Get Free Access
            </h2>
            <p style={{ color: "#888", marginBottom: "24px", lineHeight: "1.6" }}>
              Enter your email to unlock <strong style={{ color: "white" }}>{pendingTool.name}</strong> and all other AI tools — completely free.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleEmailSubmit()}
              placeholder="Enter your email address"
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                marginBottom: "12px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            <button
              onClick={handleEmailSubmit}
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: pendingTool.gradient,
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                marginBottom: "12px",
              }}
            >
              {loading ? "Getting access..." : "Get Free Access →"}
            </button>
            <p style={{ color: "#555", fontSize: "13px" }}>
              No spam. No credit card. Just free tools.
            </p>
            <button
              onClick={() => setPendingTool(null)}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
                marginTop: "8px",
                fontSize: "14px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
