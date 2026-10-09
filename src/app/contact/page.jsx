import Contact from "./Contact";
import Script from "next/script";

export const metadata = {
  title: "Contact Bengaluru's Top Web Design Agency | Unico Studios",
  description:
    "Get in touch with Unico Studios, the premier web design and brand identity agency in Bengaluru. We respond to your project inquiries within a day.",
  keywords: "contact web design agency Bengaluru, hire branding agency Bangalore, product design studio Bengaluru, contact Unico Studios",
  openGraph: {
    title: "Contact Bengaluru's Top Web Design Agency | Unico Studios",
    description:
      "Get in touch with Unico Studios, the premier web design and brand identity agency in Bengaluru. We respond to your project inquiries within a day.",
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
