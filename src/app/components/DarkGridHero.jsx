import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsArrowUpRightCircle } from "react-icons/bs";

export const DarkGridHero = ({ h, p, btn, href, target }) => {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      <Content h={h} p={p} btn={btn} href={href} target={target} />
      <Beams />
      <GradientGrid />
    </section>
  );
};

const Content = ({ h, p, btn, href, target }) => {
  return (
    <div className="relative z-20 mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 md:px-8 md:py-36">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 25 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-zinc-50 mx-auto mb-4 text-center text-3xl sm:text-4xl font-montserrat-bold md:text-5xl uppercase"
      >
        {h}
      </motion.h2>
      <motion.p
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 25 }}
        transition={{ duration: 1.25, delay: 0.2, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-zinc-400 mx-auto text-center max-w-xs xxs2:max-w-sm xs:max-w-md sm:max-w-lg text-sm xxs2:text-base md:text-xl px-5 mb-5"
      >
        {p}
      </motion.p>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 25 }}
        transition={{ duration: 1.25, delay: 0.4, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="flex flex-col items-center gap-6 sm:flex-row"
      >
        <a href={href} target={target}>
          <button className="flex items-center gap-4 text-sm xxs2:text-base bg-[#5F14E0] px-3 py-1 rounded-full w-fit cursor-pointer text-white">
            {btn}
            <BsArrowUpRightCircle className="rotate-45 text-lg xxs2:text-xl" />
          </button>
        </a>
      </motion.div>
    </div>
  );
};

const Beams = () => {
  const { width } = useWindowSize();

  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

  const placements = [
    {
      top: GRID_BOX_SIZE * 0,
      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 5,
        delay: 2,
      },
    },
    {
      top: GRID_BOX_SIZE * 12,
      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 10,
        delay: 4,
      },
    },
    {
      top: GRID_BOX_SIZE * 3,
      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
    },
    {
      top: GRID_BOX_SIZE * 9,
      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
      transition: {
        duration: 2,
        repeatDelay: 7.5,
        delay: 3.5,
      },
    },
    {
      top: 0,
      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
      transition: {
        duration: 3,
        repeatDelay: 2,
        delay: 1,
      },
    },
    {
      top: GRID_BOX_SIZE * 2,
      left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
      transition: {
        duration: 5,
        repeatDelay: 5,
        delay: 5,
      },
    },
  ];

  return (
    <>
      {placements.map((p, i) => (
        <Beam
          key={i}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

const Beam = ({ top, left, transition = {} }) => {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-blue-500/0 to-blue-500"
    />
  );
};

const GradientGrid = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
      }}
      className="absolute inset-0 z-0"
    >
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </motion.div>
  );
};

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;
