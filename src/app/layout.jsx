import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import Script from "next/script";
import ToasterProvider from "./components/ToasterProvider";

export const metadata = {
  title: "Best Digital Marketing Agency in India | Unico Studios",
  description:
    "Unico Studios - Your trusted partner for SEO, Paid Ads, Social Media Management, and Website Development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PXKLWVQC');`,
          }}
        />
      </head>

      <body>
        <NavbarWrapper />
        <ToasterProvider />

        {children}

        {/* ✅ ONLY CHATBOT (TIDIO) */}
        <Script
          src="//code.tidio.co/hhz0riuxbblu0fzbdnqvpn7qpbrooz6r.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
