import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import Script from "next/script";
import ToasterProvider from "./components/ToasterProvider";
import ChatWidget from "./components/ChatWidget";
import { usePathname } from "next/navigation";

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

        {/* 👇 CLIENT SIDE WRAPPER */}
        <ClientChatWrapper />
      </body>
    </html>
  );
}

function ClientChatWrapper() {
  "use client";

  const pathname = usePathname();

  if (pathname.startsWith("/tools")) return null;

  return <ChatWidget />;
}
