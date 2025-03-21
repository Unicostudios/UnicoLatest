import React from "react";
import logo from "../assets/unicologo.svg";
import Navbar from "../components/Navbar";
import GridHoverHero from "../components/GridHoverHero";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 z-50">
        <div className="py-7 ml-5 xs:ml-7 md:ml-10">
          <img src={logo} alt="UNICO" className="h-4 xs:h-5 md:h-6" />
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <GridHoverHero />
    </>
  );
}
