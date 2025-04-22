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
  immersifiedgcc: {
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
    images: [
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145310/goharbranding1_esee2x.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145310/goharbranding2_fk4zra.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145310/goharbranding3_xefjrt.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145307/goharbranding4_lymvne.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145308/goharbranding5_lcbyk5.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145311/goharbranding6_bjpjja.jpg",
    ],
  },
  immersified: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943225/brandstrategy_r6617o.jpg",
    alt: "Immersified",
    h2: "Immersified",
    h3: "BRAND BUILDING",
    btn: "hidden",
    p: "Immersified doesn’t throw events—they build worlds. From large-scale productions to permanent installations, they bring ambition and precision together. Their identity had to do the same. We designed a brand system that feels expansive and intentional, capturing the tech, the craft, and the magic they bring to every project. It’s not just a brand—it’s a launchpad for spectacle.",
    images: [
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145308/immersifiedbranding1_ebcrz7.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145310/immersifiedbranding2_urxnwy.jpg",
    ],
  },
  doonya: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/doonya_din5vs.jpg",
    alt: "Doonya",
    h2: "Doonya",
    h3: "BRAND BUILDING",
    btn: "hidden",
    p: "Some brands sell jewelry. Doonya tells stories through design. With a contemporary edge and an eye for detail, Doonya redefines elegance—merging craftsmanship with bold creativity. So, we built a brand identity that reflects that same essence—clean, expressive, and confident. No distractions, no fluff—just a visual presence where their pieces shine, their story resonates, and their audience instantly connects. It’s not just branding; it’s a crafted experience that mirrors the brilliance they bring to every creation.",
    images: [
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145308/doonyabranding1_s70dnk.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145307/doonyabranding2_k42izm.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145308/doonyabranding3_xwqqf4.jpg",
      "https://res.cloudinary.com/dmfisp8ue/image/upload/v1744145309/doonyabranding4_hjtdpr.jpg",
    ],
  },
  hazeuae: {
    img: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943094/haze_pcs8hx.jpg",
    alt: "Haze UAE",
    h2: "Haze Productions UAE",
    h3: "SEARCH ENGINE OPTIMIZATION",
    btn: "hidden",
    p: "Over the past few months, Haze has seen a significant boost in organic visibility through strategic SEO efforts. By optimizing high-intent keywords, refining on-page content, and improving technical performance, we’ve achieved a steady rise in search rankings and organic traffic. Key pages now rank in the top 5 for targeted keywords, resulting in increased website visits and higher engagement. This organic growth is helping establish Haze as a go-to destination for conscious fashion enthusiasts.",
    url: "https://hazeuae.com/",
    seo: {
      date1: "SEPTEMBER 2024",
      date2: "APRIL 2025",
      d1visits: "0",
      d1impressions: "0",
      d1ctr: "0",
      d2visits: "7,700",
      d2impressions: "20,000+",
      d2ctr: "3.7%",
    },
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
          className="w-full object-cover min-h-[200px] max-h-screen"
        />
      </div>
      <div className="flex flex-col gap-10 lg:gap-0 px-5 sm:px-14 lg:px-10 items-start lg:flex-row w-full justify-around py-14 md:py-20">
        <div>
          <div className="mb-3 md:mb-5 text-white">
            <h1 className="font-montserrat-medium lg:pr-10 pb-1 text-2xl xs:text-3xl md:text-4xl">
              {data.h2}
            </h1>
            <h3 className="text-sm xs:text-base sm:text-lg">{data.h3}</h3>
          </div>
          <div className={data.btn}>
            <Btn text={"Visit Website"} rotate={-30} link={data.url} />
          </div>
        </div>
        <div className="text-white text-wrap text-sm sm:text-base md:text-lg lg:max-w-lg xl:max-w-xl text-justify flex flex-col gap-14 xxs2:gap-20">
          <div>{data.p}</div>
          {data.seo && (
            <div className="flex flex-col gap-10 xxs2:gap-0 xxs2:flex-row justify-between">
              <div className="leading-tight">
                <h4 className="font-montserrat-bold mb-5">{data.seo.date1}</h4>
                <p>Total Visits: {data.seo.d1visits}</p>
                <p>Total Impressions: {data.seo.d1impressions}</p>
                <p>Avg CTR: {data.seo.d1ctr}</p>
              </div>
              <div className="leading-tight">
                <h4 className="font-montserrat-bold mb-5">{data.seo.date2}</h4>
                <p>Total Visits: {data.seo.d2visits}</p>
                <p>Total Impressions: {data.seo.d2impressions}</p>
                <p>Avg CTR: {data.seo.d2ctr}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {data.images && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 mb-20">
          {/* Top row */}
          {data.images[0] && (
            <div className="col-span-1">
              <img
                src={data.images[0]}
                alt="Box"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-sm"
              />
            </div>
          )}
          {data.images[1] && (
            <div className="col-span-1 md:col-span-2">
              <img
                src={data.images[1]}
                alt="Poster"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-sm"
              />
            </div>
          )}

          {/* Middle row */}
          {data.images[2] && (
            <div className="col-span-1 md:col-span-2">
              <img
                src={data.images[2]}
                alt="Jewelry Set"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-sm"
              />
            </div>
          )}
          {data.images[3] && (
            <div className="col-span-1">
              <img
                src={data.images[3]}
                alt="Open Jewelry Box"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-sm"
              />
            </div>
          )}

          {/* Bottom row */}
          {data.images[4] && (
            <div className="col-span-1">
              <img
                src={data.images[4]}
                alt="Bag"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-sm"
              />
            </div>
          )}
          {data.images[5] && (
            <div className="col-span-1 md:col-span-2">
              <img
                src={data.images[5]}
                alt="Stationery"
                className="w-full h-[300px] md:h-[500px] object-cover rounded-sm"
              />
            </div>
          )}
        </div>
      )}
      <DarkGridHero
        h={"BE UNIQ WITH UNICO"}
        p={
          "Unleashing Innovation to Fuel Brand Success Through Design, Technology, and Strategy"
        }
        btn={"Email"}
        href={"mailto:contact@unicostudios.in"}
      />
      <Footer />
    </>
  );
}
