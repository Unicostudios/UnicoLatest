import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiArrowUp,
  FiChevronLeft,
  FiChevronRight,
  FiLink,
  FiTarget,
  FiTool,
  FiUpload,
} from "react-icons/fi";

const CollapseCardFeatures = () => {
  const [position, setPosition] = useState(0);

  const shiftLeft = () => {
    if (position > 0) {
      setPosition((pv) => pv - 1);
    }
  };

  const shiftRight = () => {
    if (position < features.length - 1) {
      setPosition((pv) => pv + 1);
    }
  };

  return (
    <section className="overflow-hidden bg-neutral-100 px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex justify-between gap-4">
          <h2 className="text-4xl font-montserrat-bold leading-[1.2] md:text-5xl uppercase">
            Why Brands <span className="text-[#5F14E0]">Stick with us</span>
          </h2>
          <div className="flex gap-2">
            <button
              className="h-fit rounded-xl bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
              onClick={shiftLeft}
            >
              <FiChevronLeft />
            </button>
            <button
              className="h-fit rounded-xl bg-black p-4 text-2xl text-white transition-colors hover:bg-neutral-700"
              onClick={shiftRight}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          {features.map((feat, index) => (
            <Feature {...feat} key={index} position={position} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Feature = ({ position, index, title, description, Icon }) => {
  const translateAmt =
    position >= index ? index * 100 : index * 100 - 100 * (index - position);

  return (
    <motion.div
      animate={{ x: `${-translateAmt}%` }}
      transition={{
        ease: "easeInOut",
        duration: 0.35,
      }}
      className={`relative flex min-h-[250px] w-10/12 max-w-lg shrink-0 flex-col justify-between overflow-hidden p-8 shadow-lg md:w-3/5 rounded-xl ${
        index % 2 ? "bg-black text-white" : " bg-white"
      }`}
    >
      <h3 className="mb-8 text-3xl font-montserrat-bold">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default CollapseCardFeatures;

const features = [
  {
    title: "Proven Results",
    description:
      "“Over 100+ brands transformed through our strategic approach.”- From startups to industry leaders, we’ve helped brands scale and succeed.",
  },
  {
    title: "Global Expertise",
    description:
      "“Bringing global perspectives to local markets with precision.” - Our international experience ensures that brands remain relevant across cultures.",
  },
  {
    title: "Data-Driven Success",
    description:
      "“Every move backed by real-time analytics and insights.” - We optimize strategies based on performance data to guarantee measurable growth.",
  },
  {
    title: "Lasting Impact",
    description:
      "“Designs that don’t just look good— they perform.” Crafting visual identities that tell stories and drive engagement.",
  },
];
