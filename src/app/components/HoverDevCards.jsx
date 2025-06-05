import React from "react";

const HoverDevCards = () => {
  return (
    <div className="p-4 px-5 sm:px-10 xl:px-20">
      <p className="text-2xl sm:text-3xl font-montserrat-bold text-white mb-8">
        We Make Brands Look Good — and Work Even Better.
      </p>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card
          title="Brand Identity"
          href="/work#brand-strategy-and-design"
          img={"/assets/icons/brand.svg"}
        />
        <Card
          title="Social Media Strategy"
          href="/work#social-media-growth"
          img={"/assets/icons/socialmedia.svg"}
        />
        <Card
          title="Web Design & Dev"
          href="/work#web-design-and-development"
          img={"/assets/icons/webdesign.svg"}
        />
        <Card
          title="SEO & Paid Growth"
          href="/work#seo-and-content-writing"
          img={"/assets/icons/seo.svg"}
        />
      </div>
    </div>
  );
};

const Card = ({ title, img, href }) => {
  return (
    <a
      href={href}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white flex flex-col justify-between"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />

      <div>
        <img
          src={img}
          alt={title}
          className="absolute z-10 h-20 -top-5 -right-5 opacity-20 -rotate-45"
        />
      </div>
      <div>
        <img
          src={img}
          alt={title}
          className="mb-5 relative z-10 duration-300"
        />
      </div>
      <h3 className="font-montserrat-bold xxs2:text-lg sm:text-xl text-slate-950 group-hover:text-white relative z-10 duration-300 leading-tight">
        {title}
      </h3>
    </a>
  );
};

export default HoverDevCards;
