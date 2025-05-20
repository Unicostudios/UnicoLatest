"use client";

import React from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function BlogShortCard({
  img,
  imgPos,
  date,
  title,
  description,
  slug,
}) {
  return (
    <Link
      href={slug}
      className="flex flex-col w-full hover:scale-[1.01] transition-all ease-in-out duration-300"
    >
      <div className="mb-4">
        <img
          src={img}
          alt={title}
          className="h-[250px] sm:h-[300px] lg:h-[400px] w-full object-cover rounded-2xl sm:rounded-3xl"
          style={imgPos ? { objectPosition: imgPos } : undefined}
        />
      </div>
      <p className="text-sm mb-2">Published on: {date}</p>
      <div className="font-montserrat-medium text-xl sm:text-2xl lg:text-xl leading-tight mb-2">
        {title}
      </div>
      <p className="text-base sm:text-lg lg:text-base mb-3">{description}</p>
      <div className="underline text-[#5F14E0] w-fit">
        <div className="flex items-center">
          <span>Read More</span>
          <IoIosArrowRoundForward className="text-xl" />
        </div>
      </div>
    </Link>
  );
}
