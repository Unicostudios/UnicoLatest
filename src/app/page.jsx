import React from "react";
import Home from "./Home";

export const metadata = {
  title: "Best Digital Marketing Agency in India | Unico Studios",
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
        url: "https://res.cloudinary.com/dhrsf44wi/image/upload/v1738175524/Frame_4_rmgix9.png",
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
    </>
  );
}
