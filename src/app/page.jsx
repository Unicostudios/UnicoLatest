import React from "react";
import Home from "./Home";
import Script from "next/script";

export const metadata = {
  title: "Top Web Design & Brand Identity Agency in Bengaluru | Unico Studios",
  description:
    "Unico Studios is the leading design agency in Bengaluru, specializing in brand identity, websites, and SaaS product design for top founders and startups in Bangalore.",
  keywords:
    "web design agency Bengaluru, brand identity studio Bangalore, SaaS product design Bengaluru, top design agency in Bangalore, Unico Studios",
  openGraph: {
    title: "Top Web Design & Brand Identity Agency in Bengaluru | Unico Studios",
    description:
      "Unico Studios is the leading design agency in Bengaluru, specializing in brand identity, websites, and SaaS product design for top founders and startups in Bangalore.",
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
