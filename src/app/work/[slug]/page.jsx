"use client";

import React from "react";
import Btn from "@/app/components/ui/Btn";
import { Footer } from "@/app/components/Footer";

export default function Page() {
  return (
    <>
      <div>
        <img
          src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943094/haze_pcs8hx.jpg"
          alt="Haze"
          className="w-full h-full object-cover min-h-[400px]"
        />
      </div>
      <div className="flex flex-col gap-10 lg:gap-0 px-5 sm:px-14 lg:px-10 items-start lg:flex-row w-full justify-around py-16 md:py-32">
        <div className="ml-0 xl:ml-20">
          <div className="mb-3 md:mb-5 text-white">
            <h2 className="font-montserrat-medium lg:pr-10 pb-1 text-2xl xs:text-3xl md:text-4xl">
              Haze Productions UAE
            </h2>
            <p className="text-sm xs:text-base sm:text-lg">
              WEB DESIGN & DEVELOPMENT
            </p>
          </div>
          <Btn
            text={"Visit Website"}
            rotate={-30}
            link={"https://hazeuae.com"}
          />
        </div>
        <div className="text-white text-wrap text-sm sm:text-base md:text-lg lg:max-w-lg xl:max-w-xl text-justify">
          Some production houses deliver events. Haze UAE creates experiences.
          Their expertise spans event production, AV solutions, and immersive
          environments—everything that transforms ordinary events into
          unforgettable spectacles. So, we built them a website that reflects
          that same energy. No fluff, no noise—just a dynamic, intuitive space
          where their innovations shine, their story unfolds, and potential
          clients instantly grasp the brilliance they bring. It’s not just a
          website; it’s a digital showcase that amplifies their impact.
        </div>
      </div>
      <Footer
        h={"BE UNIQ WITH UNICO"}
        p={
          "Unleashing Innovation to Fuel Brand Success Through Design, Technology, and Strategy"
        }
      />
    </>
  );
}
