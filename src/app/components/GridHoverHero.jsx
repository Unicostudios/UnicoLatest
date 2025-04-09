"use client";

import React, { useEffect, useState } from "react";
import { useAnimate, motion } from "framer-motion";
import Link from "next/link";

export default function GridHoverHero({ h1, p, btn, href, target }) {
  const [scope, animate] = useAnimate();

  const [size, setSize] = useState({ columns: 0, rows: 0 });

  useEffect(() => {
    generateGridCount();
    window.addEventListener("resize", generateGridCount);

    return () => window.removeEventListener("resize", generateGridCount);
  }, []);

  const generateGridCount = () => {
    const columns = Math.floor(window.innerWidth / 75);
    const rows = Math.floor(window.innerHeight / 75);

    setSize({
      columns,
      rows,
    });
  };

  const handleMouseLeave = (e) => {
    // @ts-ignore
    const id = `#${e.target.id}`;
    animate(id, { background: "rgba(129, 140, 248, 0)" }, { duration: 1.5 });
  };

  const handleMouseEnter = (e) => {
    // @ts-ignore
    const id = `#${e.target.id}`;
    animate(id, { background: "rgba(129, 140, 248, 1)" }, { duration: 0.15 });
  };

  return (
    <div className="bg-neutral-950">
      <div
        ref={scope}
        className="grid h-[calc(100vh-75px)] w-full grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] grid-rows-[repeat(auto-fit,_minmax(75px,_1fr))]"
      >
        {[...Array(size.rows * size.columns)].map((_, i) => (
          <div
            key={i}
            id={`square-${i}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className="h-full w-full border-[1px] border-neutral-900"
          />
        ))}
      </div>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 25 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="font-montserrat-regular pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 z-0 mt-5"
      >
        <h1 className="font-montserrat-bold text-center text-3xl font-black text-white sm:text-4xl md:text-5xl">
          {h1}
        </h1>
        <p className="mb-6 mt-4 text-center px-5 text-sm xs:text-base max-w-4xl sm:text-lg md:text-xl text-white">
          {p}
        </p>
        {href && (
          <Link href={href} target={target}>
            <button className="pointer-events-auto rounded-full bg-[#5F14E0] text-white px-4 py-2 text-xs xs:text-sm md:text-base text-white mix-blend-difference font-montserrat-medium cursor-pointer">
              {btn}
            </button>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
