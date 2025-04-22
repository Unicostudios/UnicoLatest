import React from "react";
import Contact from "./Contact";

export const metadata = {
  title: "Contact Us | Unico Studios - Your Digital Marketing Experts",
  description:
    "Unico Studios - Your trusted partner for SEO, Paid Ads, Social Media Management, and Website Development. Elevate your online presence today.",
  keywords:
    "digital marketing agency India, SEO services India, paid ads management, social media marketing India, website development services",
  openGraph: {
    title: "Best Digital Marketing Agency in India | Unico Studios",
    description:
      "Unico Studios - Your trusted partner for SEO, Paid Ads, Social Media Management, and Website Development. Elevate your online presence today.",
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
    canonical: "https://unicostudios.in/contact",
  },
};

export default function Page() {
  return (
    <>
      <Contact />
    </>
  );
}
