import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

export const metadata = {
  title: "Best Digital Marketing Agency in India | Unico Studios",
  description:
    "Unico Studios - Your trusted partner for SEO, Paid Ads, Social Media Management, and Website Development. Elevate your online presence today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="font-montserrat-regular">
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
