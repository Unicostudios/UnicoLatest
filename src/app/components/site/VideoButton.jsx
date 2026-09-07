"use client";

import { useRef, useState } from "react";

/**
 * Lazy play/pause video button — matches the design's pattern of a poster
 * image with a centered ▶ overlay that fades out once the video is playing.
 * Simplified from the original's fetch-then-blob-URL trick (that existed to
 * work around the prototyping tool's dev server) to a plain <video src>,
 * which Next.js already serves efficiently from /public with preload="none".
 */
export default function VideoButton({
  src,
  poster,
  width = 200,
  aspectRatio = "9/16",
  borderRadius = 14,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const showOverlay = !playing || hover;

  return (
    <div style={{ position: "relative", flex: "0 0 auto", lineHeight: 0 }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        style={{
          display: "block",
          width,
          aspectRatio,
          borderRadius,
          objectFit: "cover",
          background: "#fff",
        }}
      />
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={playing ? "Pause video" : "Play video"}
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius,
          background: playing ? "transparent" : "oklch(0.14 0.012 280 / 0.35)",
          color: "#fff",
          fontSize: 26,
          cursor: "pointer",
          opacity: showOverlay ? 1 : 0,
          transition: "opacity 0.3s ease, background 0.3s ease",
        }}
      >
        {playing ? "❙❙" : "▶"}
      </button>
    </div>
  );
}
