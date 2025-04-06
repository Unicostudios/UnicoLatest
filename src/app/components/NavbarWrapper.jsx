"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbarOn = ["/"];

  return !hideNavbarOn.includes(pathname) ? <Navbar /> : null;
}
