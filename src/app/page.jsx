import React from "react";
import Home from "./Home";
import Script from "next/script";

export const metadata = {
  title: "Unico Studios — Brand Identity, Websites & SaaS Design",
  description:
    "Unico Studios is a design studio in Bangalore building brand identity, websites and SaaS product design for founders in Bangalore, Mumbai, Dubai and Singapore.",
  keywords:
    "brand identity studio India, website design agency Bangalore, SaaS product design, design studio India, Unico Studios",
  openGraph: {
    title: "Unico Studios — Brand Identity, Websites & SaaS Design",
    description:
      "Brand identity, websites and SaaS platforms — one team from the first sketch to the live build. Based in Bangalore, India.",
    images: [
      {
        url: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1745333408/Unico_Studios_ksivf7.png",
        width: 800,
        height: 600,
        alt: "Unico Studios",
      },
    ],
    type: "website",
  },
  alternates: {
    canonical: "https://unicostudios.in/",
  },
};

export default function Page() {
  return (
    <>
      <Home />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Unico Studios",
            url: "https://unicostudios.in",
            description: "Brand identity, websites and SaaS platforms — one team from the first sketch to the live build.",
            foundingLocation: "Bangalore, India",
            sameAs: [
              "https://www.instagram.com/unico.studioss",
              "https://www.linkedin.com/company/unicostudios",
            ],
          }),
        }}
      />
    </>
  );
}
