"use client";
import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export default function CountUpStats() {
  return (
    <div className="mx-auto px-4 py-10 md:py-20 font-montserrat-regular bg-[#080808]">
      <h2 className="mb-8 text-center text-white text-base md:text-xl">
        TRANSFORMING BRANDS,{" "}
        <span className="text-violet-500">DELIVERING REAL RESULTS</span>
      </h2>
      {/* ── MOBILE: horizontal row, all 3 stats side by side ── */}
      <div className="flex flex-row items-center justify-center gap-0 text-white md:gap-10">
        <Stat num={15} suffix="+" subheading1="Brands" subheading2="Transformed" />
        <div className="h-10 w-[1px] bg-neutral-700 mx-3 md:h-20 md:mx-0" />
        <Stat num={23} suffix="+" subheading1="Projects" subheading2="Completed" />
        <div className="h-10 w-[1px] bg-neutral-700 mx-3 md:h-20 md:mx-0" />
        <Stat num={4} suffix="+" subheading1="Countries" subheading2="Served" />
      </div>
    </div>
  );
}

const Stat = ({ num, suffix, decimals = 0, subheading1, subheading2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;
    animate(0, num, {
      duration: 1,
      onUpdate(value) {
        if (!ref.current) return;
        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex flex-col items-center py-2 px-2 md:py-0 md:w-56">
      <p className="mb-1 text-center text-3xl md:text-5xl font-montserrat-medium">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="text-center text-neutral-300 text-[10px] md:text-sm leading-tight">
        {subheading1}
      </p>
      <p className="text-center text-neutral-500 text-[10px] md:text-sm leading-tight">
        {subheading2}
      </p>
    </div>
  );
};
