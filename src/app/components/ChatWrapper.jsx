"use client";

import { usePathname } from "next/navigation";
import ChatWidget from "./ChatWidget";

export default function ChatWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith("/tools")) return null;

  return <ChatWidget />;
}
