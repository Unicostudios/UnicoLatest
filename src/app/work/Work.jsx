"use client";

import React from "react";
import GridHoverHero from "../components/GridHoverHero";
import Footer from "../components/Footer";
import HighlightTabs from "../components/HighlightTabs";
import { DarkGridHero } from "../components/DarkGridHero";

export default function Work() {
  return (
    <>
      <GridHoverHero
        h1={"Crafting Impact, One Brand at a Time."}
        p={
          "Explore how Unico Studios has redefined brand growth with design, tech, and strategy that delivers real, measurable results."
        }
        btn={"Book a call"}
        href={"https://wa.me/+918105459006"}
      />
      <HighlightTabs />
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
