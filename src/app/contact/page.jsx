import Contact from "./Contact";
import Script from "next/script";

export const metadata = {
  title: "Contact — Unico Studios",
  description:
    "Tell us about your brand identity, website or product design project — Unico Studios responds within a day.",
  keywords: "contact Unico Studios, brand identity studio Bangalore, product design studio, website design agency India",
  openGraph: {
    title: "Contact — Unico Studios",
    description:
      "Tell us about your brand identity, website or product design project — Unico Studios responds within a day.",
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
                name: "Contact",
                item: "https://unicostudios.in/contact",
              },
            ],
          }),
        }}
      />
    </>
  );
}
