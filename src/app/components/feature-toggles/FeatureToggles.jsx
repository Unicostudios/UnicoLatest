import React, { useState } from "react";
import { ToggleButton } from "./ToggleButton";
import { data } from "./data";
import { FeatureDisplay } from "./FeatureDisplay";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionSubheading } from "../shared/SectionSubheading";

export const FeatureToggles = () => {
  const [selected, setSelected] = useState(1);
  const el = data.find((d) => d.id === selected);

  return (
    <section className="relative mx-auto max-w-6xl px-4 my-12 md:my-24">
      <SectionHeading>What We Do Best</SectionHeading>
      <SectionSubheading>Tailored Solutions. Proven Results</SectionSubheading>
      <div className="w-full">
        {/* ── Toggle buttons: 2 cols on mobile, 4 on desktop ── */}
        <div className="mb-6 grid grid-cols-2 gap-3 md:mb-9 md:grid-cols-4 md:gap-4">
          {data.map((d) => (
            <ToggleButton key={d.id} id={d.id} selected={selected} setSelected={setSelected}>
              {d.title}
            </ToggleButton>
          ))}
        </div>
        <div className="w-full translate-y-2 rounded-xl bg-zinc-900">
          <div className="w-full -translate-y-2 rounded-lg shadow-lg">
            <FeatureDisplay
              selected={selected}
              cardTitle={el.cardTitle}
              cardSubtitle={el.cardSubtitle}
              Component={el.Component}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
