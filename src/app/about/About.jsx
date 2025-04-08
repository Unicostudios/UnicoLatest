"use client";

import React from "react";
import GridHoverHero from "../components/GridHoverHero";

export default function About() {
  return (
    <>
      <GridHoverHero
        h1={"We build brands that cut through the noise"}
        p={
          "A creative-first marketing studio blending design, strategy, and storytelling."
        }
        btn={"Meet the team"}
      />
    </>
  );
}
