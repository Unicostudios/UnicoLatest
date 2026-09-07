import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import Script from "next/script";
import ToasterProvider from "./components/ToasterProvider";

export const metadata = {
  title: "India's First AI-Powered Growth Agency | Unico Studios",
  description:
    "Unico Studios is India's first AI-powered growth agency. Free AI tools for founders — content engine, AI sales demo, website revenue audit and more. Based in Bangalore.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1294155329125499');
          fbq('track', 'PageView');`
        }} />
        <link rel="preload" href="/fonts/Montserrat-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Medium.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Italic.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Montserrat-Light.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        {/* 2026 redesign fonts (home, about, services, work, contact, case studies) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&family=Instrument+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400&family=Space+Grotesk:wght@400;500;700&family=Montserrat:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Archivo:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Urbanist:wght@300;400;500&family=Cormorant+Garamond:wght@400;500;600&family=Alex+Brush&family=Blinker:wght@400;600;700&display=swap"
        />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="klgJNEiY0E2KdVnr2IGvXCdlgM6hBDsnWtSEDfT54rM" />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PXKLWVQC');`,
          }}
        />
      </head>
      <body className="font-montserrat-regular">
        {/* Meta Pixel NoScript */}
        <noscript>
          <img height="1" width="1" style={{display: 'none'}} src="https://www.facebook.com/tr?id=1294155329125499&ev=PageView&noscript=1" alt="fb-pixel" />
        </noscript>
        <NavbarWrapper />
        <ToasterProvider />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXKLWVQC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Script id="clarity-script" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","q09r24hzf3");`}
        </Script>
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Unico Studios",
            url: "https://unicostudios.in/",
            logo: "https://unicostudios.in/assets/unicologo-white.png",
            description: "India's first AI-powered growth agency. Free AI tools for founders and brands — content engine, AI sales demo, website revenue audit.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-8147057109",
              contactType: "Customer Service",
              email: "contact@unicostudios.in",
            },
            sameAs: [
              "https://www.linkedin.com/company/unicostudios",
              "https://www.instagram.com/unico.studioss",
            ],
          })}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0LQYLWVY10" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-0LQYLWVY10');`}
        </Script>
        <Script src="https://cdn-in.pagesense.io/js/60046150395/195c43b01fc345ecb55929c67d234793.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
