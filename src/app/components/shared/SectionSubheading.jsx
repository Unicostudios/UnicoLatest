import React from "react";

export const SectionSubheading = ({ children }) => {
  return (
    <p className="mx-auto mb-8 text-center text-2xl md:mb-12 md:text-3xl text-white">
      {children}
    </p>
  );
};
