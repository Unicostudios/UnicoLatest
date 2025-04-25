"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { WebDesign } from "./worktabs/WebDesign";
import { Branding } from "./worktabs/Branding";
import { SEO } from "./worktabs/SEO";
import { SMG } from "./worktabs/SMG";

export const ShiftHightlightTabs = () => {
  const [selected, setSelected] = useState("web-design-and-development");
  const tabRef = useRef(null);

  // On mount, read the hash from the URL and update selected
  useEffect(() => {
    const scrollToTab = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setSelected(hash);
        setTimeout(() => {
          tabRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 0);
      }
    };
    scrollToTab(); // On initial load
    window.addEventListener("hashchange", scrollToTab);
    return () => window.removeEventListener("hashchange", scrollToTab);
  }, []);

  const SelectedComponent = TAB_DATA.find((t) => t.id === selected)?.component;

  return (
    <div id={selected} ref={tabRef}>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 xl:gap-8 px-4 pt-24 pb-5 lg:grid-cols-4">
        {TAB_DATA.map((t) => (
          <ToggleButton
            key={t.id}
            id={t.id}
            selected={selected}
            setSelected={setSelected}
          >
            {t.title}
          </ToggleButton>
        ))}
      </div>
      <div>{SelectedComponent && <SelectedComponent />}</div>
    </div>
  );
};

const ToggleButton = ({ children, selected, setSelected, id }) => {
  const router = useRouter();
  return (
    <div
      className={`rounded-lg transition-colors ${
        selected === id ? "bg-[#9B69F1]" : "bg-purple-300"
      }`}
    >
      <button
        onClick={() => {
          setSelected(id);
          router.push(`#${id}`);
        }}
        className={`w-full h-full origin-top-left rounded-lg border px-1 py-3 text-[10px] xxs2:text-xs font-montserrat-medium transition-all md:text-base cursor-pointer ${
          selected === id
            ? "-translate-y-1 border-[#9B69F1] bg-white text-[#9B69F1]"
            : "border-zinc-800 bg-white text-zinc-900 hover:-rotate-1"
        }`}
      >
        {children}
      </button>
    </div>
  );
};

const TAB_DATA = [
  {
    id: "web-design-and-development",
    title: "Web Design & Development",
    component: WebDesign,
  },
  {
    id: "brand-strategy-and-design",
    title: "Brand Strategy & Design",
    component: Branding,
  },
  {
    id: "seo-and-content-writing",
    title: "SEO & Content Writing",
    component: SEO,
  },
  {
    id: "social-media-growth",
    title: "Social Media Growth",
    component: SMG,
  },
];

export default ShiftHightlightTabs;
