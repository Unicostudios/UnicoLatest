import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export const FoldingLogos = () => {
  return (
    <section className="bg-neutral-950 px-6 py-14 md:py-24">
      {/* ── MOBILE: stacked, centered ── */}
      {/* ── DESKTOP: side by side ── */}
      <div className="flex flex-col items-center gap-10 md:flex-row md:justify-evenly max-w-5xl mx-auto">
        <Copy />
        <LogoRolodex
          items={[
            <LogoItem key={1} className="bg-neutral-800 p-8">
              <img src="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1748505869/haze_y1npfx.png" alt="Haze UAE" className="max-h-16 object-contain" />
            </LogoItem>,
            <LogoItem key={2} className="bg-neutral-800 p-8">
              <img src="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1748505868/dupree_fbfshb.png" alt="Dupree Armon" className="max-h-16 object-contain" />
            </LogoItem>,
            <LogoItem key={3} className="bg-neutral-800 p-8">
              <img src="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1748505869/immersified_ioleem.png" alt="Immersified" className="max-h-16 object-contain" />
            </LogoItem>,
            <LogoItem key={4} className="bg-neutral-800 p-8">
              <img src="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1748505870/aashirkare_asisos.png" alt="Aashir Kare" className="max-h-16 object-contain" />
            </LogoItem>,
          ]}
        />
      </div>
    </section>
  );
};

const Copy = () => (
  <div className="max-w-sm text-center md:text-start flex flex-col items-center md:items-start">
    <h2 className="mb-3 text-3xl md:text-4xl text-white font-montserrat-bold">
      Work with the best
    </h2>
    <p className="mb-6 text-sm leading-relaxed text-neutral-400">
      Don't just take our word for it. See what our clients have to say about
      their experience with Unico Studios
    </p>
    <Link href="/contact">
      <button className="relative z-0 flex items-center gap-2 overflow-hidden rounded-full border border-[#5F14E0] bg-[#5F14E0] px-6 py-2 text-white text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer">
        Let's Build Together
      </button>
    </Link>
  </div>
);

const DELAY_IN_MS = 2500;
const TRANSITION_DURATION_IN_SECS = 1.5;

const LogoRolodex = ({ items }) => {
  const intervalRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => setIndex((pv) => pv + 1), DELAY_IN_MS);
    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  return (
    <div
      style={{ transform: "rotateY(-20deg)", transformStyle: "preserve-3d" }}
      className="relative z-0 h-44 w-60 shrink-0 rounded-xl border border-neutral-700 bg-[#363636]"
    >
      <AnimatePresence mode="sync">
        <motion.div
          style={{
            y: "-50%", x: "-50%",
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            zIndex: -index,
            backfaceVisibility: "hidden",
          }}
          key={index}
          transition={{ duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut" }}
          initial={{ rotateX: "0deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "-180deg" }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
        <motion.div
          style={{
            y: "-50%", x: "-50%",
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            zIndex: index,
            backfaceVisibility: "hidden",
          }}
          key={(index + 1) * 2}
          initial={{ rotateX: "180deg" }}
          animate={{ rotateX: "0deg" }}
          exit={{ rotateX: "0deg" }}
          transition={{ duration: TRANSITION_DURATION_IN_SECS, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2"
        >
          {items[index % items.length]}
        </motion.div>
      </AnimatePresence>
      <hr
        style={{ transform: "translateZ(1px)" }}
        className="absolute left-0 right-0 top-1/2 z-[999999999] -translate-y-1/2 border-t-2 border-neutral-800"
      />
    </div>
  );
};

const LogoItem = ({ children, className }) => (
  <div className={twMerge("grid h-36 w-52 place-content-center rounded-lg", className)}>
    {children}
  </div>
);
