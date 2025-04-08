import React from "react";
import About from "./About";

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
        url: "https://res.cloudinary.com/dhrsf44wi/image/upload/v1738175524/Frame_4_rmgix9.png",
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
    </>
  );
}
