import React from "react";
import Blog from "./Blog";

export const metadata = {
  title: "Blog — Web Design & Digital Marketing Insights in Bengaluru | Unico Studios",
  description:
    "Read the latest insights on SEO, digital marketing, and web design from Unico Studios, Bengaluru's leading growth and design agency.",
  keywords:
    "digital marketing agency Bengaluru, SEO services Bangalore, web design blog Bengaluru, top agency blog, Unico Studios",
  openGraph: {
    title: "Blog — Web Design & Digital Marketing Insights in Bengaluru | Unico Studios",
    description:
      "Read the latest insights on SEO, digital marketing, and web design from Unico Studios, Bengaluru's leading growth and design agency.",
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
    canonical: "https://unicostudios.in/blog",
  },
};

export default function Page() {
  return (
    <>
      <Blog />
    </>
  );
}
