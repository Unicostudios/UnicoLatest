"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
// Routes that ship their own 2026-redesign <SiteHeader/> and must not also
// get the legacy dark <Navbar/>. Blog and any other untouched route still
// get the old navbar exactly as before.
const REDESIGNED_PREFIXES = ["/about", "/services", "/work", "/contact"];

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (REDESIGNED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return null;
  }
  return <Navbar />;
}
