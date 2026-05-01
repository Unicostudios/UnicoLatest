"use client";

import { usePathname } from "next/navigation";
import ChatWidget from "./ChatWidget";

export default function ChatWrapper() {
  const pathname = usePathname();

  // ✅ prevent hydration edge case
  if (!pathname) return null;

  // 🚫 hide on tools
  if (pathname.startsWith("/tools")) return null;

  return <ChatWidget />;
}
