import React from "react";
import { motion } from "framer-motion";

export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 text-black my-10">
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Haze UAE</CardTitle>
          <motion.a
            href="/work/haze"
            className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-blue-400 to-indigo-400 p-1 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]"
          >
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1739854968/heroimage_q0l4zv.jpg"
              alt="Haze UAE"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </motion.a>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Dupree Armon</CardTitle>
          <div
            className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-gray-400 to-gray-800 p-1 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]"
          >
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1741275706/dupreepic_ghzfdz.jpg"
              alt="Dupree Armon"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Immersified</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-1 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="/assets/brandstrategy.jpg"
              alt="Immersified"
              className="h-full w-full object-cover rounded-t-2xl "
            />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Aashir Khair</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-400 p-1 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1739854855/image5_g1r9f1.jpg"
              alt="Aashir Khair"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};
