"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { cva } from "class-variance-authority";

const button = cva(["uppercase", "transition-colors"], {
  variants: {
    intent: {
      primary: ["bg-[#9B69F1]", "hover:bg-[#945ef1]", "text-white"],
      secondary: ["bg-zinc-900", "hover:bg-zinc-700", "text-white"],
      outline: ["bg-white", "hover:bg-zinc-200", "border", "border-zinc-900"],
    },
    size: {
      small: ["px-3", "py-1.5", "rounded-md", "text-sm"],
      medium: ["p-3", "rounded-lg", "text-base"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export const Button = ({ className, intent, size, ...props }) => {
  const router = useRouter();

  const handleClick = (e) => {
    if (props.onClick) props.onClick(e);
    router.push("/contact");
  };

  return (
    <button
      className={button({ intent, size, className })}
      onClick={handleClick}
      {...props}
    />
  );
};
