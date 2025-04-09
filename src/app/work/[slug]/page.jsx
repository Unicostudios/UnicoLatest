import React from "react";
import Website from "./Website";

export async function generateMetadata({ params }) {
  const t = (await params).slug;
  return {
    title: `${t.charAt(0).toUpperCase() + String(t).slice(1)} | Unico Studios`,
  };
}
export default function Page() {
  return (
    <>
      <Website />
    </>
  );
}
