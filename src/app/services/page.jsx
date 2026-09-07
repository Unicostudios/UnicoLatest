import React from "react";
import Services from "./Services";
import Script from "next/script";

export const metadata = {
  title: "Services — Brand Identity, Websites & SaaS | Unico Studios",
  description:
    "Three things, done properly: brand identity, websites and SaaS product design. Take one or take all three — most projects grow into all of them.",
  keywords:
    "brand identity services, website design services India, SaaS product design, design studio services, Unico Studios",
  openGraph: {
    title: "Services — Brand Identity, Websites & SaaS | Unico Studios",
    description:
      "Three things, done properly: brand identity, websites and SaaS product design.",
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
    canonical: "https://unicostudios.in/services",
  },
};

export default function Page() {
  return (
    <>
      <Services />
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://unicostudios.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://unicostudios.in/services",
              },
            ],
          }),
        }}
      />
    </>
  );
}
