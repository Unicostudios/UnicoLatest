"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import GridHoverHero from "../components/GridHoverHero";
import Footer from "../components/Footer";
import BlogShortCard from "../components/ui/BlogShortCard";
import BlogLongCard from "../components/ui/BlogLongCard";
import blogData from "../data/allBlogs.json";
import { DarkGridHero } from "../components/DarkGridHero";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default function Page() {
  const [allBlogs, setAllBlogs] = useState(false);
  useEffect(() => {
    if (allBlogs) {
      window.scrollTo({ top: 0 });
    }
  }, [allBlogs]);

  const latestBlog = blogData[blogData.length - 1];

  return (
    <div className="bg-white w-screen min-h-screen">
      {!allBlogs ? (
        <main>
          <GridHoverHero
            h1={"The Insider Blog"}
            btn={"Read More"}
            href={latestBlog.slug}
          />
          {/*---------- IMAGE/TEXT ---------*/}
          <section className="relative flex px-5 xs:px-10 md:px-0 md:w-[90%] rounded-4xl my-14 sm:my-20 mx-auto h-[20em] sm:h-[25em] md:h-[30em]">
            <div className="hidden md:block md:w-1/3 bg-black rounded-tl-4xl rounded-bl-4xl" />

            <div className="w-full md:w-2/3 bg-[url('https://res.cloudinary.com/dmfisp8ue/image/upload/v1747760078/blogbg_njbany.jpg')] h-[20em] sm:h-[25em] md:h-[30em] bg-cover bg-center rounded-2xl xs:rounded-3xl sm:rounded-4xl md:rounded-tl-none md:rounded-bl-none" />

            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-16 lg:left-20 bg-white px-7 sm:px-10 py-12 xs:py-14 sm:py-20 md:py-30 w-[200px] xxs:w-[280px] xs:w-[320px] sm:w-[450px] md:w-[500px] rounded-lg md:rounded-xl flex flex-col justify-center">
              <h3 className="font-montserrat-bold leading-tight text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                Stay Ahead with Unico Insights
              </h3>
              <p className="text-xs sm:text-base md:text-lg">
                Explore expert tips, industry trends, and actionable strategies
                to scale your brand
              </p>
            </div>
          </section>
          {/*-------- LATEST BLOGS  ---------*/}
          <section className="px-5 xs:px-10 md:px-0 md:w-[90%] mx-auto my-14 sm:my-20">
            <div className="flex flex-col xxs2:flex-row xxs2:items-center gap-2 xxs2:gap-0 justify-between pb-5 sm:pb-7">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat-bold">
                Latest Blogs
              </h2>
              <div className="underline">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setAllBlogs(true);
                  }}
                  className="flex items-center"
                >
                  <span className="sm:text-lg">Explore All</span>
                  <IoIosArrowRoundForward className="text-xl" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-4 justify-center">
              {blogData
                .slice()
                .reverse()
                .slice(0, 3)
                .map((post) => (
                  <BlogShortCard
                    key={post.id}
                    img={post.img}
                    imgPos={post.imgPos}
                    date={post.date}
                    title={post.title}
                    description={truncateText(post.description, 150)}
                    slug={post.slug}
                  />
                ))}
            </div>
          </section>
          {/*-------- OTHER BLOGS  ---------*/}
          <section className="px-5 xs:px-10 md:px-0 md:w-[90%] mx-auto pb-20">
            <div className="flex flex-col xxs2:flex-row xxs2:items-center gap-2 xxs2:gap-0 justify-between pb-5 sm:pb-7">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat-bold">
                Other Blogs
              </h2>
              <div className="underline">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setAllBlogs(true);
                  }}
                  className="flex items-center"
                >
                  <span className="sm:text-lg">Explore All</span>
                  <IoIosArrowRoundForward className="text-xl" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              {blogData
                .slice()
                .slice(0, 3)
                .map((post, idx, arr) => (
                  <div key={post.id}>
                    <BlogLongCard
                      img={post.img}
                      imgPos={post.imgPos}
                      date={post.date}
                      title={post.title}
                      description={truncateText(post.description, 150)}
                      slug={post.slug}
                    />
                    {idx !== arr.length - 1 && (
                      <div className="h-[1px] my-5 bg-neutral-300 w-full" />
                    )}
                  </div>
                ))}
            </div>
          </section>
        </main>
      ) : (
        <main>
          {/*-------- ALL BLOGS  ---------*/}
          <section className="px-5 xs:px-10 md:px-0 md:w-[90%] mx-auto py-14 sm:py-16 md:py-20">
            <div className="relative flex flex-col xxs:flex-row xxs:justify-center xxs:items-center py-5 md:py-7">
              <button
                onClick={() => setAllBlogs(false)}
                className="xxs:absolute left-0 flex items-center gap-2 w-fit py-1 underline cursor-pointer rounded-sm text-sm sm:text-base md:text-lg mb-2 ml-2 xxs:m-0"
              >
                <BiArrowBack />
                <span>Back</span>
              </button>
              <h2 className="xxs:text-center text-3xl sm:text-4xl md:text-5xl font-montserrat-bold ml-2 xxs:ml-0">
                Blogs
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 mt-2 sm:mt-3">
              {blogData
                .slice()
                .reverse()
                .map((post) => (
                  <div key={post.id}>
                    <BlogShortCard
                      img={post.img}
                      imgPos={post.imgPos}
                      date={post.date}
                      title={post.title}
                      description={truncateText(post.description, 150)}
                      slug={post.slug}
                    />
                  </div>
                ))}
            </div>
          </section>
        </main>
      )}
      <DarkGridHero
        theme={true}
        h={"Ready to go?"}
        p={
          "We’re here to take your brand to the next level. Let’s talk about what’s possible"
        }
        btn={"Email"}
        href={"mailto:contact@unicostudios.in"}
      />
      <Footer theme={true} />
    </div>
  );
}
