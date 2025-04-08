import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "../shared/Button";

export const FeatureDisplay = ({
  selected,
  cardTitle,
  cardSubtitle,
  Component,
}) => {
  return (
    <div className="grid h-fit w-full grid-cols-1 overflow-hidden rounded-3xl border-x-4 border-b-8 border-2 border-[#9B69F1] bg-white md:h-96 md:grid-cols-12">
      <div className="col-span-1 flex flex-col justify-between p-8 md:col-span-7 md:p-12">
        <div>
          <AnimatePresence mode="popLayout">
            <motion.div
              initial={{
                opacity: 0,
                y: -25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 25,
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              key={selected}
            >
              <h3 className="mb-4 text-xl sm:text-2xl font-montserrat-medium">{cardTitle}</h3>
              <p className="mb-12 max-w-lg text-sm sm:text-base">
                {cardSubtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <Button className="cursor-pointer">
          <span className="font-montserrat-medium">Get started today!</span>
        </Button>
      </div>
      <div className="relative col-span-1 min-h-80 border-l-0 border-t-2 border-[#9B69F1] bg-zinc-100 shadow-inner shadow-[#9b69f1b4] md:col-span-5 md:border-l-2 md:border-t-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              x: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
              x: 50,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            key={selected}
            className="pointer-events-none absolute bottom-0 left-8 right-0 top-8 overflow-hidden rounded-tl-2xl border-l border-t border-[#9B69F1] bg-white shadow-2xl"
          >
            <Component />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
