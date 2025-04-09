"use client";

import React from "react";
import Btn from "@/app/components/ui/Btn";
import { Footer } from "@/app/components/Footer";
import { DarkGridHero } from "@/app/components/DarkGridHero";
import { useParams } from "next/navigation";
import NotFound from "@/app/not-found";

const image = {
  haze: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943094/haze_pcs8hx.jpg",
    alt: "Haze UAE",
    h2: "Haze Productions UAE",
    h3: "WEB DESIGN & DEVELOPMENT",
    p: "Some production houses deliver events. Haze UAE creates experiences.Their expertise spans event production, AV solutions, and immersive environments—everything that transforms ordinary events into unforgettable spectacles. So, we built them a website that reflects that same energy. No fluff, no noise—just a dynamic, intuitive space where their innovations shine, their story unfolds, and potential clients instantly grasp the brilliance they bring. It’s not just a website; it’s a digital showcase that amplifies their impact.",
    url: "https://hazeuae.com/",
  },
  immersified: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744177725/immersifiedwebsite_onltfg.jpg",
    alt: "Immersified",
    h2: "Immersified GCC",
    h3: "WEB DESIGN & DEVELOPMENT",
    p: "When others talk about delivering events, Immersified rewrites the playbook. From jaw-dropping live productions to cutting-edge installations, they don’t just create moments—they craft legacies. We built them a website that’s sleek, functional, and packed with personality. It’s a space where bold ideas meet flawless execution, showing the world exactly why Immersified stands in a league of its own.",
    url: "https://immersified.vercel.app/",
  },
  aashirkhare: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744179991/aashirwebsite_bcydif.jpg",
    alt: "Aashir Khare",
    h2: "Aashir Khare",
    h3: "WEB DESIGN & DEVELOPMENT",
    p: "At Aashir Khair, every candle tells a story. Made from a luxurious soy-coconut blend and infused with handpicked fragrances, these candles do more than light up a room—they create moments that linger. We built them a website that’s as refined as their craft—minimal design, rich visuals, and a seamless experience that lets the products shine. Because true luxury isn’t loud—it whispers.",
    url: "https://aashirkare.com/",
  },
  dupree: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145309/dupreewebsite_ucphi2.jpg",
    alt: "Dupree Armon",
    h2: "Dupree Armon",
    h3: "WEB DESIGN & DEVELOPMENT",
    p: "Dupree Armon doesn’t just take photos—he crafts stories through his lens. His work blends raw emotion with timeless elegance, capturing moments that feel alive. We designed a website that reflects this mastery—minimal, immersive, and intentional. Every frame finds its space, every story unfolds naturally, and potential clients get a glimpse of what it’s like to work with a true visual artist. It’s more than a portfolio; it’s a journey through his vision.",
    url: "https://dupreearmon.com",
  },
  gohar: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/gohar_nw8yvd.jpg",
    alt: "Gohar",
    h2: "Gohar",
    h3: "BRAND BUILDING",
    btn: "hidden",
    p: "Some brands sell jewelry. Gohar crafts stories in stone. Rooted in elegance and refined craftsmanship, Gohar is where timeless design meets modern allure. So, we built them a brand identity that mirrors this essence—no excess, no distractions. Just a refined, expressive system where their pieces take center stage, their heritage comes alive, and customers instantly feel the sophistication they embody. It’s not just branding; it’s a visual language that elevates their presence and leaves a lasting impression.",
    url: "https://dupreearmon.com",
  },
};

export default function Page() {
  const params = useParams();
  const work = params.slug;
  const data = image[work];

  if (!data) return <NotFound />;

  return (
    <>
      <div>
        <img
          src={data.img}
          alt={data.alt}
          className="w-full h-screen object-cover min-h-[200px]"
        />
      </div>
      <div className="flex flex-col gap-10 lg:gap-0 px-5 sm:px-14 lg:px-10 items-start lg:flex-row w-full justify-around py-14 md:py-20">
        <div>
          <div className="mb-3 md:mb-5 text-white">
            <h2 className="font-montserrat-medium lg:pr-10 pb-1 text-2xl xs:text-3xl md:text-4xl">
              {data.h2}
            </h2>
            <h3 className="text-sm xs:text-base sm:text-lg">{data.h3}</h3>
          </div>
          <div className={data.btn}>
            <Btn text={"Visit Website"} rotate={-30} link={data.url} />
          </div>
        </div>
        <div className="text-white text-wrap text-sm sm:text-base md:text-lg lg:max-w-lg xl:max-w-xl text-justify">
          {data.p}
        </div>
      </div>
      <DarkGridHero
        h={"BE UNIQ WITH UNICO"}
        p={
          "Unleashing Innovation to Fuel Brand Success Through Design, Technology, and Strategy"
        }
      />
      <Footer />
    </>
  );
}
