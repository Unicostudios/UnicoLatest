import React from "react";
import logo from "../assets/unicologo.svg";
import Navbar from "../components/Navbar";
import GridHoverHero from "../components/GridHoverHero";
import CountUpStats from "../components/CountUpStats";

export default function Home() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-[#101010]">
        <div className="py-7 ml-5 xs:ml-7 md:ml-10">
          <img src={logo} alt="UNICO" className="h-4 xs:h-5 md:h-6" />
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
