"use client";

import { useEffect, useState } from "react";

export default function ChatWidget() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;

    // 🚫 Block on tools
    if (path.startsWith("/tools")) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  // 🚫 HARD BLOCK
  if (!show) return null;

  const [open, setOpen] = useState(false);

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
          zIndex: 1000,
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
            zIndex: 1000,
          }}
        >
          Chatbot coming soon...
        </div>
      )}
    </>
  );
}
