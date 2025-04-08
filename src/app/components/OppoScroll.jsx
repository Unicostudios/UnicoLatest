import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const OppoScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  return (
    <>
      <section ref={targetRef} className="flex py-20">
        <Content content={items} />
        <Images content={items} scrollYProgress={scrollYProgress} />
      </section>
    </>
  );
};

const Content = ({ content }) => {
  return (
    <div className="w-full">
      {content.map(({ id, title1, title2, description }, idx) => (
        <div
          key={id}
          className={`p-8 h-screen border-b mr-[1px] flex flex-col justify-between ${
            idx % 2 ? "bg-white text-black" : "bg-white text-black"
          }`}
        >
          <div>
            <h3 className="text-3xl sm:text-4xl font-montserrat-bold">
              {title1}
            </h3>
            <h3 className="text-3xl sm:text-4xl font-montserrat-bold">
              {title2}
            </h3>
          </div>
          <p className="font-montserrat-regular w-full max-w-xl">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
};

const Images = ({ content, scrollYProgress }) => {
  const top = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${(content.length - 1) * 100}vh`, "0vh"]
  );

  return (
    <div className="h-screen overflow-hidden sticky top-0 w-24 md:w-full">
      <motion.div style={{ top }} className="absolute left-0 right-0">
        {[...content].reverse().map(({ img, id, title }) => (
          <img
            key={id}
            alt={title}
            className="h-screen w-full object-cover"
            src={img}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default OppoScroll;

const items = [
  {
    id: 1,
    title1: "Haze UAE",
    title2: "Event Tech & AV Solutions",
    description:
      "Bringing cutting-edge AV technology to life. We revamped their website with SEO-optimized content and an intuitive UI, boosting event inquiries by 150% and elevating their brand positioning.",
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1000,q_auto,f_auto/v1743943031/haze_oeggpz.jpg",
  },
  {
    id: 2,
    title1: "Gohar",
    title2: "Jewel Brand",
    description:
      "Celebrating timeless elegance through fine jewelry. We crafted a sophisticated brand identity and a visually rich digital presence for Gohar, helping them connect deeply with their audience and position themselves as a premium jewel brand",
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1000,q_auto,f_auto/v1744119305/gohar_uttjee.jpg",
  },
];
