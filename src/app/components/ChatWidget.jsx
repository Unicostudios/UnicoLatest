"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function ChatWidget() {
  const pathname = usePathname();

  // ❌ Hide chatbot on tools pages
  if (pathname.startsWith("/tools")) return null;

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        💬
      </div>

      {/* Chat Box */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "#111",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "10px",
            zIndex: 9999,
            color: "white",
          }}
        >
          <div style={{ fontSize: "14px", marginBottom: "10px" }}>
            Chatbot coming soon...
          </div>
        </div>
      )}
    </>
  );
}
