import React from "react";
import { motion } from "framer-motion";

export const SEO = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 text-black my-10">
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard href={"/work/haze"} className="col-span-12 md:col-span-4">
          <CardTitle>Haze UAE</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/seo_hkekex.jpg"
              alt="Haze UAE"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children, href }) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.a>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};
