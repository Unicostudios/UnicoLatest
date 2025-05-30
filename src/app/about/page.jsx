import React from "react";
import About from "./About";
import Script from "next/script";

export const metadata = {
  title: "About Us | Unico Studios - Your Digital Marketing Experts",
  description:
    "Learn more about Unico Studios, a results-driven digital marketing agency. Discover our mission, vision, and expertise in SEO, paid ads, social media, and web development.",
  keywords:
    "about Unico Studios, digital marketing agency India, SEO experts, social media services, website development company, paid ads agency, custom web solutions, social media marketing experts, digital growth services, best SEO company India, Unico Studios digital marketing",
  openGraph: {
    title: "About Us | Unico Studios - Your Digital Marketing Experts",
    description:
      "Learn more about Unico Studios, a results-driven digital marketing agency. Discover our mission, vision, and expertise in SEO, paid ads, social media, and web development.",
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
    canonical: "https://unicostudios.in/about",
  },
};

export default function Page() {
  return (
    <>
      <About />
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
                name: "About",
                item: "https://unicostudios.in/about",
              },
            ],
          }),
        }}
      />
    </>
  );
}
