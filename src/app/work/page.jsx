import React from "react";
import Work from "./Work";
import Script from "next/script";

export const metadata = {
  title: "Our Work — Web Design & Branding Portfolio in Bengaluru | Unico Studios",
  description:
    "Explore our web design and brand identity portfolio in Bengaluru. View case studies on how our Bangalore-based team creates cohesive brand and product experiences.",
  keywords:
    "web design portfolio Bengaluru, brand identity case studies Bangalore, SaaS product design portfolio, top design agency work Bengaluru, Unico Studios",
  openGraph: {
    title: "Our Work — Web Design & Branding Portfolio in Bengaluru | Unico Studios",
    description:
      "Explore our web design and brand identity portfolio in Bengaluru. View case studies on how our Bangalore-based team creates cohesive brand and product experiences.",
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
    canonical: "https://unicostudios.in/work",
  },
};
export default function Page() {
  return (
    <>
      <Work />
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
                name: "Our Work",
                item: "https://unicostudios.in/work",
              },
            ],
          }),
        }}
      />
    </>
  );
}
