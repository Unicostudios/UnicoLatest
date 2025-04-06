"use client";

import React from "react";
import { BsArrowRightCircleFill } from "react-icons/bs";

export default function Btn2({ text, rotate, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="flex justify-between items-center bg-[#5F14E0] w-32 sm:w-40 md:w-48 px-1.5 py-1 rounded-full cursor-pointer"
    >
      <span className="text-white text-xs sm:text-sm md:text-base font-napoli-regular ml-1 sm:ml-2 md:ml-3">
        {text}
      </span>
      <BsArrowRightCircleFill
        className="text-white text-xl sm:text-2xl md:text-3xl"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    </a>
  );
}
