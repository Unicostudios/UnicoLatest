import React from "react";
import Home from "./Home";
import Script from "next/script";

export const metadata = {
  title: "India's First AI-Powered Growth Agency | Unico Studios",
  description:
    "Unico Studios — AI-powered digital marketing agency in Bangalore. Free AI tools for founders: content engine, AI sales demo, website audit and more. Book a free strategy call.",
  keywords:
    "AI marketing agency India, AI sales assistant India, free AI tools for startups, Niquo AI sales, website revenue audit, digital marketing Bangalore, Unico Studios",
  openGraph: {
    title: "India's First AI-Powered Growth Agency | Unico Studios",
    description:
      "Free AI tools that grow your business — content engine, AI sales demo, website audit. Built by Unico Studios, Bangalore.",
    images: [
      {
        url: "https://res.cloudinary.com/dmfisp8ue/image/upload/v1745333408/Unico_Studios_ksivf7.png",
        width: 800,
        height: 600,
        alt: "Unico Studios AI",
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
            description: "India's first AI-powered growth agency. Free AI tools for founders and brands.",
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
