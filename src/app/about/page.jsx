import About from "./About";

export const metadata = {
  title: "About Us — Unico Studios",
  description:
    "Unico Studios is a Bangalore-based brand and product design studio. One team ships identity, websites and product interfaces for founders across Bangalore, Mumbai, Dubai and Singapore.",
  keywords:
    "Unico Studios, about Unico Studios, brand identity studio Bangalore, product design studio, website design agency India, founder Sreehari",
  openGraph: {
    title: "About Us — Unico Studios",
    description:
      "One team, one continuous system — identity, website and product screens, from first sketch to live build.",
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
  return <About />;
}
