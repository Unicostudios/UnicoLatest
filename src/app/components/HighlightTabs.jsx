"use client";

import React, { useState } from "react";
import { WebDesign } from "./worktabs/WebDesign";
import { Branding } from "./worktabs/Branding";
import { SEO } from "./worktabs/SEO";
import { SMG } from "./worktabs/SMG";

export const ShiftHightlightTabs = () => {
  const [selected, setSelected] = useState(1);
  const SelectedComponent = TAB_DATA.find((t) => t.id === selected)?.component;

  return (
    <div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 xl:gap-8 px-8 pt-20 pb-10 lg:grid-cols-4">
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
  return (
    <div
      className={`rounded-lg transition-colors ${
        selected === id ? "bg-[#9B69F1]" : "bg-purple-100"
      }`}
    >
      <button
        onClick={() => setSelected(id)}
        className={`w-full h-full origin-top-left rounded-lg border px-1 py-3 text-[10px] xxs2:text-xs font-montserrat-medium transition-all md:text-base cursor-pointer ${
          selected === id
            ? "-translate-y-1 border-[#9B69F1] bg-white text-[#9B69F1]"
            : "border-zinc-800 bg-white text-zinc-900 hover:-rotate-2"
        }`}
      >
        {children}
      </button>
    </div>
  );
};

const TAB_DATA = [
  {
    id: 1,
    title: "Web Design & Development",
    component: WebDesign,
  },
  {
    id: 2,
    title: "Brand Strategy & Design",
    component: Branding,
  },
  {
    id: 3,
    title: "SEO & Content Writing",
    component: SEO,
  },
  {
    id: 4,
    title: "Social Media Growth",
    component: SMG,
  },
];

export default ShiftHightlightTabs;
