import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const ColorChangeCards = () => {
  return (
    <div className="px-4 py-16 md:px-8 md:py-20 bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full max-w-6xl mx-auto">
        <Card
          heading="Gohar"
          description="Timeless identity for modern jewelry storytelling"
          imgSrc="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1744145307/goharbranding4_lymvne.jpg"
          href="/work/gohar"
        />
        <Card
          heading="Immersified"
          description="Expansive identity for world-building experiences."
          imgSrc="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1743943225/brandstrategy_r6617o.jpg"
          href="/work/immersified"
        />
        <Card
          heading="Dupree Armon"
          description="Immersive website for a visual storyteller"
          imgSrc="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1743943032/dupree_rq5kdq.jpg"
          href="/work/dupree"
        />
        <Card
          heading="Haze SEO"
          description="Strategic SEO fueling conscious fashion growth"
          imgSrc="https://res.cloudinary.com/dmfisp8ue/image/upload/q_auto,f_auto/v1743943031/seo_hkekex.jpg"
          href="/work/hazeuae"
        />
      </div>
    </div>
  );
};

const Card = ({ heading, description, imgSrc, href }) => {
  return (
    <motion.a
      href={href}
      transition={{
        staggerChildren: 0.035,
      }}
      whileHover="hover"
      className="w-full h-60 bg-slate-300 overflow-hidden cursor-pointer group relative"
    >
      <div
        className="absolute inset-0 saturate-100 md:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="p-4 relative z-20 h-full text-black group-hover:text-white group-hover:[text-shadow:_0_1px_5px_rgb(0_0_0_/_0.8)] transition-colors duration-500 flex flex-col justify-between">
        <FiArrowRight className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" />
        <div>
          <h4 className="font-montserrat-bold">
            {heading.split("").map((l, i) => (
              <ShiftLetter letter={l} key={i} />
            ))}
          </h4>
          <p className="font-montserrat-medium leading-tight">{description}</p>
        </div>
      </div>
    </motion.a>
  );
};

const ShiftLetter = ({ letter }) => {
  return (
    <div className="inline-block overflow-hidden h-[36px] text-3xl">
      <motion.span
        className="flex flex-col min-w-[4px]"
        style={{
          y: "0%",
        }}
        variants={{
          hover: {
            y: "-50%",
          },
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  );
};

export default ColorChangeCards;
