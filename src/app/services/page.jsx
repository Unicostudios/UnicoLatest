import React from "react";
import Services from "./Services";
import Script from "next/script";

export const metadata = {
  title: "Digital Marketing Services in India | Unico Studios",
  description:
    "Discover top-notch digital marketing services at Unico Studios. From SEO and paid ads to social media management and website development, we deliver results-driven solutions.",
  keywords:
    "digital marketing services, SEO services India, social media marketing, paid ads services, website development India",
  openGraph: {
    title: "Digital Marketing Services in India | Unico Studios",
    description:
      "Discover top-notch digital marketing services at Unico Studios. From SEO and paid ads to social media management and website development, we deliver results-driven solutions.",
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
