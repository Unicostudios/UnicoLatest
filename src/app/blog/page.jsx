import React from "react";
import GridHoverHero from "../components/GridHoverHero";
import Footer from "../components/FooterDark";

export default function page() {
  return (
    <>
      <GridHoverHero h1={"The Insider Blog"} btn={"Read More"} />
      <Footer />
    </>
  );
}
