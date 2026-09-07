"use client";

import { useEffect, useRef } from "react";

/**
 * The pannable / zoomable "Inside the file" board used on every case study.
 * Reimplements the original dc-runtime's drag-to-pan + wheel-to-zoom +
 * zoom-button logic 1:1 as a React client component.
 *
 * `canvasWidth` / `canvasHeight` size the absolute-positioned canvas that
 * `children` are laid out on (each child should itself be `position: absolute`
 * with its own left/top). `label` is the small watermark in the corner
 * (e.g. "IMMERSIFIED.FIG").
 */
export default function FileBoard({
  children,
  canvasWidth = 2400,
  canvasHeight = 1500,
  label,
  height = "clamp(360px, 58vh, 560px)",
  background = "#1E1E1E",
}) {
  const boardRef = useRef(null);
  const canvasRef = useRef(null);
  const bgRef = useRef(null);
  const stateRef = useRef({ x: 0, y: 0, k: 0.42 });
  const homeRef = useRef({ x: -40, y: -30, k: 0.42 });

  useEffect(() => {
    const board = boardRef.current;
    const canvas = canvasRef.current;
    const bg = bgRef.current;
    if (!board || !canvas) return;

    const st = stateRef.current;
    const home = homeRef.current;

    const apply = () => {
      canvas.style.transform = `translate(${st.x}px,${st.y}px) scale(${st.k})`;
      if (bg) bg.style.backgroundPosition = `${st.x}px ${st.y}px`;
    };

    const fit = () => {
      const k = Math.max(0.22, Math.min(0.6, (board.clientWidth / canvasWidth) * 1.05));
      home.k = k;
      st.k = k;
      st.x = home.x;
      st.y = home.y;
      apply();
    };
    fit();
    window.addEventListener("resize", fit);

    let drag = null;
    const onDown = (e) => {
      if (e.target.closest("[data-zoom]")) return;
      drag = { px: e.clientX, py: e.clientY, x: st.x, y: st.y };
      board.setPointerCapture(e.pointerId);
      board.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!drag) return;
      st.x = drag.x + (e.clientX - drag.px);
      st.y = drag.y + (e.clientY - drag.py);
      apply();
    };
    const stop = () => {
      drag = null;
      board.style.cursor = "grab";
    };
    const onWheel = (e) => {
      e.preventDefault();
      const r = board.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const next = Math.max(0.15, Math.min(1.6, st.k * (e.deltaY < 0 ? 1.12 : 0.89)));
      st.x = mx - (mx - st.x) * (next / st.k);
      st.y = my - (my - st.y) * (next / st.k);
      st.k = next;
      apply();
    };

    board.addEventListener("pointerdown", onDown);
    board.addEventListener("pointermove", onMove);
    board.addEventListener("pointerup", stop);
    board.addEventListener("pointercancel", stop);
    board.addEventListener("wheel", onWheel, { passive: false });

    const zoomBtns = Array.prototype.slice.call(board.querySelectorAll("[data-zoom]"));
    const onZoomClick = (btn) => (e) => {
      e.stopPropagation();
      const d = btn.getAttribute("data-zoom");
      if (d === "0") {
        st.x = home.x;
        st.y = home.y;
        st.k = home.k;
        apply();
        return;
      }
      const cx = board.clientWidth / 2;
      const cy = board.clientHeight / 2;
      const next = Math.max(0.15, Math.min(1.6, st.k * (d === "1" ? 1.25 : 0.8)));
      st.x = cx - (cx - st.x) * (next / st.k);
      st.y = cy - (cy - st.y) * (next / st.k);
      st.k = next;
      apply();
    };
    const cleanups = zoomBtns.map((btn) => {
      const handler = onZoomClick(btn);
      btn.addEventListener("click", handler);
      return () => btn.removeEventListener("click", handler);
    });

    return () => {
      window.removeEventListener("resize", fit);
      board.removeEventListener("pointerdown", onDown);
      board.removeEventListener("pointermove", onMove);
      board.removeEventListener("pointerup", stop);
      board.removeEventListener("pointercancel", stop);
      board.removeEventListener("wheel", onWheel);
      cleanups.forEach((c) => c());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasWidth]);

  return (
    <div
      ref={boardRef}
      style={{
        position: "relative",
        height,
        borderRadius: 20,
        overflow: "hidden",
        background,
        border: "1px solid oklch(0.22 0.012 285 / 0.12)",
        cursor: "grab",
        touchAction: "none",
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: -2000,
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
      <div
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: canvasWidth,
          height: canvasHeight,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
      <div style={{ position: "absolute", left: 14, bottom: 14, display: "flex", gap: 8 }}>
        <button
          type="button"
          data-zoom="-1"
          aria-label="Zoom out"
          style={zoomBtnStyle}
        >
          −
        </button>
        <button type="button" data-zoom="1" aria-label="Zoom in" style={zoomBtnStyle}>
          +
        </button>
        <button
          type="button"
          data-zoom="0"
          aria-label="Reset zoom"
          style={{ ...zoomBtnStyle, width: "auto", padding: "0 12px", fontFamily: "var(--font-plexmono), monospace", fontSize: 11, letterSpacing: "0.08em" }}
        >
          RESET
        </button>
      </div>
      {label && (
        <div
          style={{
            position: "absolute",
            right: 14,
            bottom: 14,
            fontFamily: "var(--font-plexmono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

const zoomBtnStyle = {
  width: 30,
  height: 30,
  borderRadius: 6,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "#fff",
  cursor: "pointer",
  fontSize: 15,
};

/** A labeled image tile for use inside <FileBoard>. Position it with style={{left, top, width}}. */
export function BoardTile({ label, style, imgStyle, src, alt = "", children }) {
  return (
    <div style={{ position: "absolute", ...style }}>
      {label && (
        <div
          style={{
            fontFamily: "var(--font-plexmono), monospace",
            fontSize: 13,
            color: "rgba(255,255,255,0.78)",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      {src ? (
        <img
          decoding="async"
          src={src}
          alt={alt}
          style={{
            display: "block",
            width: "100%",
            objectFit: "cover",
            borderRadius: 3,
            boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            ...imgStyle,
          }}
        />
      ) : (
        children
      )}
    </div>
  );
}
