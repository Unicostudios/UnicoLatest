import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

export const DragCards = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden bg-black">
      <h2 className="relative font-montserrat-medium z-0 text-center text-5xl font-black text-neutral-800 md:text-7xl">
        Meet Our Team<span className="text-indigo-500">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="/assets/team/utkarsh.jpg"
        alt="Utkarsh"
        rotate="-16deg"
        top="30%"
        left="20%"
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src="/assets/team/naveen.jpg"
        alt="Naveen"
        rotate="16deg"
        top="35%"
        left="65%"
        className="w-44 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="/assets/team/sreehari.jpg"
        alt="Sreehari"
        rotate="0deg"
        top="15%"
        left="40%"
        className="w-48 md:w-72"
      />
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <div>
      <motion.img
        onMouseDown={updateZIndex}
        style={{
          top,
          left,
          rotate,
          zIndex,
        }}
        className={twMerge(
          "drag-elements rounded-lg absolute w-48 bg-neutral-200 p-1 pb-4",
          className
        )}
        src={src}
        alt={alt}
        drag
        dragConstraints={containerRef}
        // Uncomment below and remove dragElastic to remove movement after release
        //   dragMomentum={false}
        dragElastic={0.65}
      />
    </div>
  );
};
