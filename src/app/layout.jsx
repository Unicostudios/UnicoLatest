import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import ToasterProvider from "./components/ToasterProvider";
import ChatWidget from "./components/ChatWidget";

export const metadata = {
  title: "Best Digital Marketing Agency in India | Unico Studios",
  description:
    "Unico Studios - Your trusted partner for SEO, Paid Ads, Social Media Management, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        <ToasterProvider />

        {children}

        <ChatWidget />
      </body>
    </html>
  );
}
