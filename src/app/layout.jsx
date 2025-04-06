import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-montserrat-regular">
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
