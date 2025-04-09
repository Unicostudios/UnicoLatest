"use client";

import React from "react";
import GridHoverHero from "../components/GridHoverHero";
import CollapseCardFeatures from "../components/CollapseCards";
import { FeatureToggles } from "../components/feature-toggles/FeatureToggles";
import { FoldingLogos } from "../components/FoldingLogos";
import OppoScroll from "../components/OppoScroll";
import Footer from "../components/Footer";
import { DarkGridHero } from "../components/DarkGridHero";
import { StickyCards } from "../components/StickyCards";

export default function Services() {
  return (
    <>
      <GridHoverHero
        h1={"Solutions That Scale Your Brand"}
        p={
          "We blend strategy, design, and technology to deliver transformative results for brands looking to stand out and grow"
        }
        btn={"Let’s Build Together"}
        href={"/contact"}
      />
      <CollapseCardFeatures />
      <FeatureToggles />
      <FoldingLogos />
      <div className="hidden lg:block py-20">
        <OppoScroll />
      </div>
      <div className="lg:hidden py-20">
        <StickyCards />
      </div>
      <DarkGridHero
        h={"Ready to go?"}
        p={
          "We’re here to take your brand to the next level. Let’s talk about what’s possible"
        }
      />
      <Footer />
    </>
  );
}
