"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import GridHoverHero from "@/app/components/GridHoverHero";
import CountUpStats from "@/app/components/CountUpStats";
import { motion } from "framer-motion";
import Loader from "@/app/components/ui/StartAnimation";

export default function Home() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  if (!isClient) {
    return null;
  }
  return (
    <>
      {loading ? (
        <div className="flex justify-center w-screen items-center font-montserrat-bold bg-[#101010] text-white h-[calc(100vh-30px)]">
          <Loader />
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </>
  );
}
