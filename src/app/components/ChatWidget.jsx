"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";

export default function ChatWrapper() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🚫 Don't render until client is ready
  if (!mounted) return null;

  // 🚫 Hide on tools
  if (pathname && pathname.startsWith("/tools")) return null;

  return <ChatWidget />;
}
