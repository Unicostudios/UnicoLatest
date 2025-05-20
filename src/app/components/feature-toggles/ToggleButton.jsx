import React from "react";

export const ToggleButton = ({ children, selected, setSelected, id }) => {
  return (
    <div
      className={`rounded-lg transition-colors ${
        selected === id ? "bg-[#9B69F1]" : "bg-purple-300"
      }`}
    >
      <button
        onClick={() => setSelected(id)}
        className={`w-full h-full origin-top-left rounded-lg border px-1 py-3 text-[10px] xxs2:text-xs font-montserrat-medium cursor-pointer bg-white transition-all md:text-base ${
          selected === id
            ? "-translate-y-1 border-purple-400 text-[#9B69F1]"
            : "border-zinc-800 text-zinc-900 hover:-rotate-1"
        }`}
      >
        {children}
      </button>
    </div>
  );
};
