import React from "react";

export const SectionHeading = ({ children }) => {
  return (
    <h2 className="mx-auto mb-2 max-w-2xl text-center text-3xl font-montserrat-bold md:text-5xl text-white">
      {children}
    </h2>
  );
};
