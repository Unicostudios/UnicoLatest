"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GridHoverHero from "./components/GridHoverHero";
import CountUpStats from "./components/CountUpStats";
import Loader from "./components/ui/StartAnimation";
import { FiftyFiftyHero } from "./components/FiftyFiftyHero";
import { FeatureToggles } from "./components/feature-toggles/FeatureToggles";
import { FoldingLogos } from "./components/FoldingLogos";
import { BouncyCardsFeatures } from "./components/CardFeatures";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { DarkGridHero } from "./components/DarkGridHero";

export default function Home() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isFirstLoad = sessionStorage.getItem("firstLoad");

    if (!isFirstLoad) {
      setLoading(true);
      sessionStorage.setItem("firstLoad", "true");
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center w-screen items-center font-montserrat-bold bg-[#191919] text-white h-[calc(100vh-30px)]">
          <Loader />
        </div>
      ) : (
        <>
          <Navbar />
          <GridHoverHero
            h1={"Your Brand, Our Obsession"}
            p={
              "We blend strategy, design, and tech to fuel growth for brands that dare to lead"
            }
            btn={"Let’s Build Together"}
            href={"/contact"}
          />
          <CountUpStats />
          <FiftyFiftyHero />
          <FeatureToggles />
          <FoldingLogos />
          <BouncyCardsFeatures />
          <DarkGridHero
            h={"Ready to go?"}
            p={
              "We’re here to take your brand to the next level. Let’s talk about what’s possible"
            }
            btn={"Email"}
            href={"mailto:contact@unicostudios.in"}
          />
          <Footer />
        </>
      )}
    </>
  );
}
