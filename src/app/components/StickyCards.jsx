import { useScroll, motion, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const StickyCards = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div ref={ref} className="relative">
      {CARDS.map((c, idx) => (
        <Card
          key={c.id}
          card={c}
          scrollYProgress={scrollYProgress}
          position={idx + 1}
        />
      ))}
    </div>
  );
};

const Card = ({ position, card, scrollYProgress }) => {
  const scaleFromPct = (position - 1) / CARDS.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, "-500px"]);

  const isOddCard = position % 2;

  return (
    <motion.div
      style={{
        height: "500px",
        y: position === CARDS.length ? undefined : y,
      }}
      className="sticky bg-white top-0 flex w-full origin-top flex-col items-center h-screen justify-center"
    >
      {!isOddCard ? (
        <img
          src={card.img}
          alt={card.title}
          className="w-screen h-[500px] object-cover"
        />
      ) : (
        <>
          <h3 className="text-center text-2xl sm:text-3xl font-montserrat-bold">
            {card.title1}
          </h3>
          <h3 className="mb-6 text-center text-2xl sm:text-3xl px-2 xs:px-0 font-montserrat-bold">
            {card.title2}
          </h3>
          <p className="font-montserrat-regular px-5 sm:px-0 text-sm sm:text-base text-center w-full sm:max-w-xl">
            {card.description}
          </p>
        </>
      )}
    </motion.div>
  );
};

const CARDS = [
  {
    id: 1,
    title1: "Haze UAE",
    title2: "Event Tech & AV Solutions",
    description:
      "Bringing cutting-edge AV technology to life. We revamped their website with SEO-optimized content and an intuitive UI, boosting event inquiries by 150% and elevating their brand positioning.",
  },
  {
    id: 2,
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1000,q_auto,f_auto/v1743943031/haze_oeggpz.jpg",
  },
  {
    id: 3,
    title1: "Gohar",
    title2: "Jewel Brand",
    description:
      "Celebrating timeless elegance through fine jewelry. We crafted a sophisticated brand identity and a visually rich digital presence for Gohar, helping them connect deeply with their audience and position themselves as a premium jewel brand",
  },
  {
    id: 4,
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1000,q_auto,f_auto/v1744119305/gohar_uttjee.jpg",
  },
];
