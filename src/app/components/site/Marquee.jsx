/**
 * A duplicated, CSS-animated marquee/ticker strip (client names, keywords, etc).
 * Pass fully-formed nodes in `items` (strings or <span> with their own
 * color/styling) — the component just duplicates the list and animates it.
 * `reverse` uses the opposite (right-moving) keyframe.
 */
export default function Marquee({ items, reverse = false, duration = 30, gap = 52, style }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", ...style }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          gap,
          animation: `${reverse ? "uTickerBack" : "uTicker"} calc(var(--dur, 1) * ${duration}s) linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ whiteSpace: "nowrap" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
