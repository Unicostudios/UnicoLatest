"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 🚫 HARD BLOCK — DO NOT SHOW ON /tools
  if (!pathname) return null;

  if (pathname === "/tools" || pathname.startsWith("/tools/")) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#667eea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999,
          color: "white",
          fontSize: "24px",
        }}
      >
        💬
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            width: "300px",
            height: "400px",
            background: "#111",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "10px",
            color: "white",
            zIndex: 9999,
          }}
        >
          Chatbot coming soon...
        </div>
      )}
    </>
  );
}