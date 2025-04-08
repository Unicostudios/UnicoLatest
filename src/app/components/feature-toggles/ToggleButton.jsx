import React from "react";

export const ToggleButton = ({ children, selected, setSelected, id }) => {
  return (
    <div
      className={`rounded-lg transition-colors ${
        selected === id ? "bg-[#9B69F1]" : "bg-purple-100"
      }`}
    >
      <button
        onClick={() => setSelected(id)}
        className={`w-full h-full origin-top-left rounded-lg border px-1 py-3 text-[10px] xxs2:text-xs font-montserrat-medium cursor-pointer transition-all md:text-base ${
          selected === id
            ? "-translate-y-1 border-[#9B69F1] bg-white text-indigo-600"
            : "border-zinc-800 bg-white text-zinc-900 hover:-rotate-2"
        }`}
      >
        {children}
      </button>
    </div>
  );
};
