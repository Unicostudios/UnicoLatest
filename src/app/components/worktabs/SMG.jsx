import React from "react";
import dynamic from "next/dynamic";
const Construction = dynamic(() => import("../ui/lottie/Lottie"), {
  ssr: false,
});

export const SMG = () => {
  return (
    <section className="mx-auto max-w-5xl text-lg sm:text-xl md:text-2xl px-4 pb-12 uppercase text-center font-montserrat-bold text-white my-10">
      <Construction />
      This page is under construction… just like your friend’s fitness journey.
      But trust us, when it’s ready, your brand will flex harder than ever!
    </section>
  );
};
