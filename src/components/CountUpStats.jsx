import React, { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export default function CountUpStats() {
  return (
    <div className="mx-auto px-4 py-10 md:py-16 font-montserrat-regular">
      <h2 className="mb-14 md:mb-8 text-center text-white text-lg md:text-xl md:mb-16">
        TRANSFORMING BRANDS,
        <br className="sm:hidden" />
        <span className="text-violet-500"> DELIVERING REAL RESULTS</span>
      </h2>

      <div className="flex text-white flex-col items-center justify-center gap-10 md:flex-row">
        <Stat
          num={120}
          suffix="+"
          subheading1="Brands Transformed"
          subheading2="From startups to global enterprises."
        />
        <div className="h-[1px] w-20 bg-neutral-600 md:h-20 md:w-[1px]" />
        <Stat
          num={150}
          suffix="+"
          subheading1="Projects Completed"
          subheading2="Websites, campaigns, and designs"
        />
        <div className="h-[1px] w-20 bg-neutral-600 md:h-20 md:w-[1px]" />
        <Stat
          num={5}
          suffix="+"
          subheading1="Countries Served"
          subheading2="Global expertise. Local impact"
        />
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
      duration: 2,
      onUpdate(value) {
        if (!ref.current) return;

        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex w-72 flex-col items-center py-5 md:py-0">
      <p className="mb-2 text-center text-5xl font-montserrat-medium sm:text-6xl">
        <span ref={ref}></span>
        {suffix}
      </p>
      <p className="max-w-80 text-center text-neutral-300 text-sm sm:text-base">{subheading1}</p>
      <p className="max-w-80 text-center text-neutral-300">{subheading2}</p>
    </div>
  );
};
