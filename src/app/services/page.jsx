import React from "react";
import Services from "./Services";
import Script from "next/script";

export const metadata = {
  title: "Web Design, Branding & SaaS Design Services in Bengaluru | Unico Studios",
  description:
    "Unico Studios offers premium web design, brand identity, and SaaS product design services in Bengaluru. Partner with Bangalore's top design agency.",
  keywords:
    "web design services Bengaluru, branding agency Bangalore, SaaS product design services Bengaluru, design studio services, Unico Studios",
  openGraph: {
    title: "Web Design, Branding & SaaS Design Services in Bengaluru | Unico Studios",
    description:
      "Unico Studios offers premium web design, brand identity, and SaaS product design services in Bengaluru. Partner with Bangalore's top design agency.",
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
