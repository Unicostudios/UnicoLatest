import React from "react";
import { motion } from "framer-motion";

export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 text-black my-10">
      <div className="mb-8">
        <h2 className="text-white text-center text-4xl xs:text-5xl font-montserrat-bold md:text-5xl">
          See Our Work
        </h2>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>Social Media Growth</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943984/Socialmediagrowth_wbaj2t.jpg"
              alt="Social Media Growth"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Brand Strategy & Design</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943225/brandstrategy_r6617o.jpg"
              alt="Brand Strategy & Design"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-8">
          <CardTitle>Web Design & Development</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/webdesign_g6fitp.jpg"
              alt="Web Design & Development"
              className="h-full w-full object-cover rounded-t-2xl "
            />
          </div>
        </BounceCard>
        <BounceCard className="col-span-12 md:col-span-4">
          <CardTitle>SEO & Content Writing</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/seo_hkekex.jpg"
              alt="SEO & Content Writing"
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
