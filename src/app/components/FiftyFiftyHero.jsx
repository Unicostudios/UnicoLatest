import {
  motion,
  MotionConfig,
} from "framer-motion";
import React, { useState} from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

export const FiftyFiftyHero = () => {
  return (
    <section className="mx-auto my-4 grid w-screen grid-cols-12 border border-neutral-700 text-neutral-50">
      <Left />
      <Right />
    </section>
  );
};

const Left = () => (
  <div className="col-span-12 flex flex-col justify-between border-r bg-black border-neutral-700 md:col-span-6">
    <div className="px-6 py-20 md:px-12 md:py-24">
      <h2 className="text-4xl uppercase  md:text-5xl font-montserrat-bold">
        <span className="text-[#AD7DFF]"> NO-NONSENSE </span>
        BRANDING & MARKETING THAT ACTUALLY CONVERTS
      </h2>
    </div>
  </div>
);

const Right = () => {
  const [idx, setIdx] = useState(0);

  return (
    <div className="col-span-12 bg-[#363636] flex flex-col justify-between md:col-span-6">
      <div className="relative h-[276px] overflow-hidden md:h-[372px]">
        {CONTENT.map((c, itemIdx) => {
          return (
            <motion.div
              initial={false}
              animate={{
                opacity: idx === itemIdx ? 1 : 0,
                y: idx === itemIdx ? 0 : 24,
                filter: idx === itemIdx ? "blur(0px)" : "blur(2px)",
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
              }}
              style={{
                pointerEvents: idx === itemIdx ? "all" : "none",
              }}
              className="absolute inset-0 z-10 grid place-content-center space-y-3 px-6 text-base text-neutral-400 md:px-12 md:text-lg font-montserrat-medium"
              key={itemIdx}
            >
              {c.content}
            </motion.div>
          );
        })}
      </div>

      <Buttons idx={idx} setIdx={setIdx} />
    </div>
  );
};

const Buttons = ({ idx, setIdx }) => {
  return (
    <div className="relative grid h-[57px] grid-cols-2 border-t border-neutral-700">
      <ShiftButton
        onClick={() => {
          setIdx((pv) => {
            if (pv === 0) {
              return CONTENT.length - 1;
            } else {
              return pv - 1;
            }
          });
        }}
        topDivClasses="bg-neutral-900"
        bottomDivClasses="bg-neutral-950"
      >
        <FiArrowLeft className="mx-auto text-xl" />
      </ShiftButton>
      <ShiftButton
        topDivClasses="bg-neutral-900"
        btnClasses="border-neutral-700 border-l"
        bottomDivClasses="bg-neutral-950"
        onClick={() => {
          setIdx((pv) => {
            if (pv === CONTENT.length - 1) {
              return 0;
            } else {
              return pv + 1;
            }
          });
        }}
      >
        <FiArrowRight className="mx-auto text-xl" />
      </ShiftButton>

      <motion.span
        key={idx}
        initial={{
          width: "0%",
        }}
        animate={{
          width: "100%",
        }}
        transition={{
          duration: 12,
          ease: "linear",
        }}
        onAnimationComplete={() => {
          setIdx((pv) => {
            if (pv === CONTENT.length - 1) {
              return 0;
            } else {
              return pv + 1;
            }
          });
        }}
        className="pointer-events-none absolute -top-[1px] bottom-0 z-20 bg-neutral-600/10"
      />
    </div>
  );
};

const ShiftButton = ({
  onClick,
  children,
  btnClasses,
  topDivClasses,
  bottomDivClasses,
}) => {
  return (
    <MotionConfig
      transition={{
        ease: "circOut",
        duration: 0.25,
      }}
    >
      <motion.button
        initial="initial"
        whileHover="hovered"
        className={twMerge(
          "relative overflow-hidden transition-colors",
          btnClasses
        )}
        onClick={onClick}
      >
        <motion.div
          variants={{
            initial: {
              y: "0%",
            },
            hovered: {
              y: "-100%",
            },
          }}
          className={twMerge(
            "grid h-full place-content-center bg-neutral-950",
            topDivClasses
          )}
        >
          {children}
        </motion.div>
        <motion.div
          variants={{
            initial: {
              y: "100%",
            },
            hovered: {
              y: "0%",
            },
          }}
          className={twMerge(
            "absolute inset-0 grid h-full place-content-center",
            bottomDivClasses
          )}
        >
          {children}
        </motion.div>
      </motion.button>
    </MotionConfig>
  );
};

const CONTENT = [
  {
    content: (
      <>
        <p>
          Hey, we’re Unico Studios👋 <br /> Started in a college dorm, built to
          disrupt the game.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p>
          Not just pretty pixels. <br /> We craft brand identities, websites,
          and campaigns that actually perform.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p>
          300K+ organic impressions. <br /> Real results, not vanity metrics. We
          let the work speak.
        </p>
      </>
    ),
  },
  {
    content: (
      <>
        <p>
          You bring the vision.
          <br />
          We’ll bring the strategy, design, and execution to make it real
        </p>
      </>
    ),
  },
];
