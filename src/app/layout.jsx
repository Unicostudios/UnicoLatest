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
        <link
          rel="preload"
          href="/fonts/Montserrat-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Montserrat-Medium.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Montserrat-Italic.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Montserrat-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Montserrat-Light.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <meta name="robots" content="index, follow" />
        {/*---------- Google Site Verification --------*/}
        <meta
          name="google-site-verification"
          content="klgJNEiY0E2KdVnr2IGvXCdlgM6hBDsnWtSEDfT54rM"
        />
      </head>
      <body className="font-montserrat-regular">
        <NavbarWrapper />
        <ToasterProvider />
        {children}

        {/*---------- Clarity -----------*/}
        <Script id="clarity-script" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "q09r24hzf3");
          `}
        </Script>

        {/*------------- Google Analytics ------------*/}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0LQYLWVY10"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0LQYLWVY10');
        `}
        </Script>

        {/*------------ Breadcrumb Structured Data -------------*/}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "About us",
                  item: "https://unicostudios.in/about",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: "https://unicostudios.in/services",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Our Work",
                  item: "https://unicostudios.in/work",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Contact Us",
                  item: "https://unicostudios.in/contact",
                },
              ],
            }),
          }}
        />
        {/*--------------- ChatBot -------------*/}
        <Script
          id="collectcdn-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w, d) {
              w.CollectId = "680b8c361f59b1cbec8b04f5";
              var h = d.head || d.getElementsByTagName("head")[0];
              var s = d.createElement("script");
              s.setAttribute("type", "text/javascript");
              s.async = true;
              s.setAttribute("src", "https://collectcdn.com/launcher.js");
              h.appendChild(s);
            })(window, document);
          `,
          }}
        />
      </body>
    </html>
  );
}
