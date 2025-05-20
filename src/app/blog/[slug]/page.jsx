import BlogCard from "@/app/components/ui/BlogShortCard";
import allBlogs from "@/app/data/allBlogs.json";
import NotFound from "@/app/not-found";
import { DarkGridHero } from "@/app/components/DarkGridHero";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  try {
    const { blog } = await import(`@/app/data/blogs/${slug}.jsx`);
    return {
      title: blog.title,
      description: blog.description,
      keywords: blog.keywords,
      openGraph: {
        title: blog.openGraph.title,
        description: blog.openGraph.description,
        images: [
          {
            url: blog.openGraph.images[0].url,
            width: 800,
            height: 600,
            alt: blog.openGraph.images[0].alt,
          },
        ],
        type: "article",
      },
      alternates: {
        canonical: blog.alternates.canonical,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Blog Not Found",
    };
  }
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default async function Page({ params }) {
  const slug = (await params).slug;
  try {
    const { blog } = await import(`@/app/data/blogs/${slug}.jsx`);
    const id = blog.id;
    return (
      <div className="bg-white w-screen min-h-screen">
        <div className="text-black">
          <div className="max-w-[1600px] mx-auto px-4 xs:px-5 pt-8 sm:px-8 md:px-10 sm:pt-10">
            <h1 className="text-2xl sm:text-3xl mb-2 md:text-4xl mt-14 md:mt-20 font-montserrat-bold">
              {blog.h1}
            </h1>
            <p className="text-xs sm:text-sm mb-5">Published on: {blog.date}</p>
            <div>
              <img
                src={blog.img}
                alt={blog.alt}
                className="w-full rounded-2xl sm:rounded-3xl md:rounded-4xl h-72 md:h-80 lg:h-96 xl:h-[450px] object-cover mb-5 sm:mb-7"
                style={
                  blog.imgPos ? { objectPosition: blog.imgPos } : undefined
                }
              />
            </div>
            <div className="BlogContent-1 mb-10">{blog.content1}</div>
            <div className="flex gap-10">
              <div className="BlogContent-2 lg:w-[65%] xl:w-[70%]">
                {blog.content2}
              </div>
              <div className="hidden lg:flex flex-col gap-10 w-[35%] xl:w-[30%] mb-5 h-fit sticky top-22">
                {allBlogs
                  .slice()
                  .filter((post) => post.id !== id)
                  .reverse()
                  .slice(0, 2)
                  .map((post) => (
                    <BlogCard
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
            </div>
          </div>
          <div className="flex flex-col xxs2:flex-row xxs2:items-center gap-2 xxs2:gap-0 justify-between pb-5 sm:pb-7 max-w-[1600px] mx-auto px-4 xs:px-5 pt-5 sm:px-8 md:px-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat-bold">
              Other Blogs
            </h2>
            <div className="underline">
              <Link href="/blog" className="flex items-center">
                <span className="sm:text-lg">Explore All</span>
                <IoIosArrowRoundForward className="text-xl" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-4 justify-center px-4 xs:px-5 pb-20 sm:px-8 md:px-10 mx-auto max-w-[1600px]">
            {allBlogs
              .slice()
              .filter((post) => post.id !== id)
              .slice(0, 3)
              .map((post) => (
                <BlogCard
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
        </div>
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
  } catch (error) {
    console.log(error);
    return <NotFound />;
  }
}
