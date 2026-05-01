"use client";

import { useState, useEffect } from "react";

export default function ChatWidget() {
  const [hide, setHide] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;

    if (path.startsWith("/tools")) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, []);

  // 🚫 Hide on tools page
  if (hide) return null;

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
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
            right: "20px",
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
