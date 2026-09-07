import React from "react";
import Work from "./Work";
import Script from "next/script";

export const metadata = {
  title: "Our Work — Selected Case Studies | Unico Studios",
  description:
    "Twenty-three projects across four countries. Nine case studies showing how identity, web and product hold together when the same team makes all three.",
  keywords:
    "design studio portfolio, brand identity case studies, website design portfolio India, SaaS product design case studies, Unico Studios work",
  openGraph: {
    title: "Our Work — Selected Case Studies | Unico Studios",
    description:
      "Twenty-three projects across four countries — nine case studies of brand identity, websites and SaaS product design.",
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
