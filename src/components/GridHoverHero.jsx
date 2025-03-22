import React, { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";
import { Link } from "react-router-dom";

export default function GridHoverHero() {
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
        className="grid h-screen w-full grid-cols-[repeat(auto-fit,_minmax(75px,_1fr))] grid-rows-[repeat(auto-fit,_minmax(75px,_1fr))]"
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
      <div className="font-montserrat-regular pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-8 z-0">
        <h1 className="font-montserrat-bold text-center text-3xl font-black text-white sm:text-4xl md:text-5xl">
          Your Brand, Our Obsession
        </h1>
        <p className="mb-6 mt-4 text-center text-sm xs:text-base sm:text-lg md:text-xl text-white">
          We blend strategy, design, and tech to fuel growth for brands that
          dare to lead
        </p>
        <Link to="/contact">
          <button className="pointer-events-auto rounded-full bg-[#5F14E0] text-white px-4 py-2 text-xs xs:text-sm md:text-base text-white mix-blend-difference font-montserrat-medium cursor-pointer">
            Let’s Build Together
          </button>
        </Link>
      </div>
    </div>
  );
}
