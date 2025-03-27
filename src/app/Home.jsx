"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import GridHoverHero from "@/app/components/GridHoverHero";
import CountUpStats from "@/app/components/CountUpStats";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl">
        <div className="py-7 ml-5 xs:ml-7 md:ml-10">
          <motion.a href="/">
            <img
              src="/assets/unicologo.svg"
              alt="Unico Studios"
              className="h-4 xs:h-5 md:h-6 cursor-pointer"
            />
          </motion.a>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <GridHoverHero />
      <CountUpStats />
    </>
  );
}
