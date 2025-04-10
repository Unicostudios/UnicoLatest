import React from "react";
import { motion } from "framer-motion";

export const Branding = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 text-black my-10">
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard href={"/work/gohar"} className="col-span-12 md:col-span-4">
          <CardTitle>Gohar</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/gohar_nw8yvd.jpg"
              alt="Gohar"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
        </BounceCard>
        <BounceCard
          href={"/work/immersified"}
          className="col-span-12 md:col-span-8"
        >
          <CardTitle>Immersified</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943225/brandstrategy_r6617o.jpg"
              alt="Immersified"
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <BounceCard href={"/work/doonya"} className="col-span-12 md:col-span-8">
          <CardTitle>Doonya</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <img
              src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/doonya_din5vs.jpg"
              alt="Doonya"
              className="h-full w-full object-cover rounded-t-2xl "
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
    <h3 className="mx-auto text-center text-2xl sm:text-3xl font-semibold">{children}</h3>
  );
};
