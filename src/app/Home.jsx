"use client";

import React, { useEffect, useState } from "react";
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
import LeadForm from "./components/LeadForm";
import { AnimatePresence, motion } from "framer-motion";

const SpringModal = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-black/50 backdrop-blur fixed inset-0 z-50 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
          >
            <LeadForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const isFirstLoad = sessionStorage.getItem("firstLoad");
    const screenWidth = window.innerWidth;

    if (screenWidth > 767 && !isFirstLoad) {
      setLoading(true);
      sessionStorage.setItem("firstLoad", "true");
      setTimeout(() => {
        setLoading(false);
      }, 3500);
    }
  }, []);

  if (!isClient) return null;

  return (
    <>
      {loading ? (
        <div className="hidden md:flex justify-center w-screen items-center font-montserrat-bold bg-[#191919] text-white h-[calc(100vh-10px)]">
          <Loader />
        </div>
      ) : (
        <>
          <Navbar />
          <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <GridHoverHero
            h1={"Your Brand, Our Obsession"}
            p={
              "We blend strategy, design, and tech to fuel growth for brands that dare to lead"
            }
            btn={"Let’s Build Together"}
            click={() => setIsOpen(true)}
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
