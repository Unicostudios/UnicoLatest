import About from "./About";

export const metadata = {
  title: "About Unico Studios — Leading Design Agency in Bengaluru",
  description:
    "Unico Studios is a top-rated brand and product design agency based in Bengaluru. Our Bangalore team ships world-class websites and identity designs for founders.",
  keywords:
    "about Unico Studios, top design agency Bengaluru, branding studio Bangalore, website design agency Bengaluru",
  openGraph: {
    title: "About Unico Studios — Leading Design Agency in Bengaluru",
    description:
      "Unico Studios is a top-rated brand and product design agency based in Bengaluru. Our Bangalore team ships world-class websites and identity designs for founders.",
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
