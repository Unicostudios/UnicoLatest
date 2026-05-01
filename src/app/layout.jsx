import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import Script from "next/script";
import ToasterProvider from "./components/ToasterProvider";

export const metadata = {
  title: "Best Digital Marketing Agency in India | Unico Studios",
  description:
    "Unico Studios - Your trusted partner for SEO, Paid Ads, Social Media Management, and Website Development. Elevate your online presence today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Montserrat-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Medium.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Light.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <meta name="robots" content="index, follow" />

        <meta
          name="google-site-verification"
          content="klgJNEiY0E2KdVnr2IGvXCdlgM6hBDsnWtSEDfT54rM"
        />

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

      <body className="font-montserrat-regular">
        <NavbarWrapper />
        <ToasterProvider />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXKLWVQC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Microsoft Clarity */}
        <Script id="clarity-script" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "q09r24hzf3");`}
        </Script>

        {/* Organization Schema */}
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Unico Studios",
            url: "http://unicostudios.in/",
            logo: "http://unicostudios.in/assets/unicologo-white.png",
            description:
              "Unico Studios is the leading software development company in Bangalore offering custom software, web, and mobile app solutions.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8147057109",
              contactType: "Customer Service",
              email: "contact@unicostudios.in",
            },
            sameAs: [
              "https://www.linkedin.com/company/unicostudios",
              "https://twitter.com/unicostudios",
            ],
          })}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0LQYLWVY10"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0LQYLWVY10');`}
        </Script>

        {/* Zoho PageSense */}
        <Script
          src="https://cdn-in.pagesense.io/js/60046150395/195c43b01fc345ecb55929c67d234793.js"
          strategy="afterInteractive"
        />

        {children}

        {/* TIDIO CHAT (ONLY CHATBOT NOW) */}
        <Script
          src="//code.tidio.co/hhz0riuxbblu0fzbdnqvpn7qpbrooz6r.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
