"use client";

import React from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function BlogLongCard({
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
      className="flex flex-col gap-4 lg:gap-0 lg:flex-row w-full hover:scale-[1.01] transition-all ease-in-out duration-300"
    >
      <div>
        <img
          src={img}
          alt={title}
          className="h-[250px] sm:h-[300px] lg:h-[400px] w-full lg:w-[80%] object-cover rounded-2xl sm:rounded-3xl"
          style={imgPos ? { objectPosition: imgPos } : undefined}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 lg:gap-5 lg:max-w-2xl">
        <p className="text-sm">Published on: {date}</p>
        <div className="font-montserrat-medium text-xl sm:text-2xl leading-tight">
          {title}
        </div>
        <p className="text-base sm:text-lg">{description}</p>
        <div className="underline text-[#5F14E0] w-fit">
          <div className="flex items-center">
            <span>Read More</span>
            <IoIosArrowRoundForward className="text-xl" />
          </div>
        </div>
      </div>
    </Link>
  );
}
