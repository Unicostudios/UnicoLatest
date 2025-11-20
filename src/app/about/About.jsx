"use client";

import React from "react";
import GridHoverHero from "../components/GridHoverHero";
import { DarkGridHero } from "../components/DarkGridHero";
import HoverDevCards from "../components/HoverDevCards";
import ColorChangeCards from "../components/ColorChangeCards";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <GridHoverHero
        h1={"We Don't Just Build Brands — "}
        p={"We Build Momentum."}
      />
      <div className="text-white flex flex-col gap-12 lg:gap-0 lg:flex-row justify-around xl:justify-evenly my-24 px-5 lg:px-0">
        <div>
          <img
            src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1744210952/aboutusbg_uxjdwa.jpg"
            alt="About Us"
            className="max-h-[200px] xs:max-h-[250px] md:max-h-[350px] w-screen lg:w-[400px] xl:w-[500px] object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 lg:gap-14">
          <h2 className="font-montserrat-bold text-3xl xs:text-4xl md:text-5xl lg:max-w-xl xl:max-w-2xl">
            Started with a Vision.
            <br /> Built with Audacity.
          </h2>
          <p className="text-wrap text-sm sm:text-base md:text-lg lg:max-w-xl xl:max-w-2xl">
            The idea of Unico started back in my first year of college. No
            co-founders. No money. Just a belief that design, strategy, and
            storytelling could build something powerful. By third year, I
            stopped waiting. Jumped in. My brother joined in. We turned that
            vision into Unico — a studio built for bold ideas and real growth.
          </p>
        </div>
      </div>
      <div className="py-10 bg-black">
        <HoverDevCards />
      </div>
      <div className="flex flex-col gap-7 lg:gap-0 px-5 sm:px-14 lg:px-10 items-start lg:flex-row w-full justify-around py-20 text-white">
        <h2 className="font-montserrat-bold lg:pr-10 text-3xl xs:text-4xl md:text-5xl lg:max-w-md">
          Strategy Meets Swagger.
        </h2>
        <div className="text-wrap text-sm sm:text-base md:text-lg lg:max-w-xl xl:max-w-2xl">
          We don’t do copy-paste solutions. We design with precision, market
          with meaning, and scale with intention. Every client gets our full
          attention. Every project gets our all. We're here for the long run —
          to help brands not just launch but last.
        </div>
      </div>
      <div className="pb-20">
        <ColorChangeCards />
      </div>
      <DarkGridHero
        h={"Let’s Build Something Unforgettable."}
        btn={"Book a Call"}
        href={"https://wa.me/+918147057109"}
        target={"_blank"}
      />
      <Footer />
    </>
  );
}
