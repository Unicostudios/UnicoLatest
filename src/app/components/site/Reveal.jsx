"use client";

import { motion } from "framer-motion";

/**
 * Replacement for the design's `data-reveal="1"` fade-up-on-scroll effect.
 * Wrap any block-level section/card/heading in this to get the same
 * "opacity 0 -> 1, translateY(26px) -> 0" reveal, driven by IntersectionObserver
 * (via framer-motion's whileInView) instead of the original's setTimeout-on-load
 * stagger, which was tuned for a full static-page reload and doesn't apply to
 * Next.js client-side navigation.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  style,
  as = "div",
  once = true,
  ...rest
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.2, 0, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
