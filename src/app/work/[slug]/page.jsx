import React from "react";
import Website from "./Website";

export async function generateMetadata({ params }) {
  const t = (await params).slug;
  return {
    title: `${t.charAt(0).toUpperCase() + String(t).slice(1)} | Unico Studios`,
    description:
      "Unico Studios - Your trusted partner for SEO, Paid Ads, Social Media Management, and Website Development. Elevate your online presence today.",
  };
}
export default function Page() {
  return (
    <>
      <Website />
    </>
  );
}
