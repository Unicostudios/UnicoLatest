"use client";

import React, { useState } from "react";

export const ShiftHightlightTabs = () => {
  const [selected, setSelected] = useState(1);
  return (
    <div className="">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-8 py-12 lg:grid-cols-4">
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
        className={`w-full h-full origin-top-left rounded-lg border px-1 py-3 text-[10px] xxs2:text-xs font-montserrat-bold transition-all md:text-base ${
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
    title: "Web Design",
  },
  {
    id: 2,
    title: "Branding",
  },
  {
    id: 3,
    title: "SEO",
  },
  {
    id: 4,
    title: "SMG",
  },
];

export default ShiftHightlightTabs;
