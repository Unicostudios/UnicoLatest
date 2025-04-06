"use client";

import React from "react";
import GridHoverHero from "../components/GridHoverHero";
import Footer from "../components/Footer";
import HighlightTabs from "../components/HighlightTabs";
import { BouncyCardsFeatures } from "../components/WorkCardFeatures";

export default function Work() {
  return (
    <>
      <GridHoverHero
        h1={"Crafting Impact, One Brand at a Time."}
        p={
          "Explore how Unico Studios has redefined brand growth with design, tech, and strategy that delivers real, measurable results."
        }
        btn={"Explore Our Work"}
      />
      <HighlightTabs />
      <BouncyCardsFeatures />
      <Footer
        h={"BE UNIQ WITH UNICO"}
        p={
          "Unleashing Innovation to Fuel Brand Success Through Design, Technology, and Strategy"
        }
      />
    </>
  );
}
