import React from "react";

const SocialMediaGrowth = () => {
  return (
    <img
      src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943984/Socialmediagrowth_wbaj2t.jpg"
      alt="Social Media Growth"
      className="h-full w-full object-cover"
    />
  );
};

const WebDesignDevelopment = () => {
  return (
    <img
      src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/webdesign_g6fitp.jpg"
      alt="Web Design & Development"
      className="h-full w-full object-cover"
    />
  );
};

const SEOContentWriting = () => {
  return (
    <img
      src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943031/seo_hkekex.jpg"
      alt="SEO & Content Writing"
      className="h-full w-full object-cover"
    />
  );
};

const BrandStrategyDesign = () => {
  return (
    <img
      src="https://res.cloudinary.com/dmfisp8ue/image/upload/v1743943225/brandstrategy_r6617o.jpg"
      alt="Brand Strategy & Design"
      className="h-full w-full object-cover"
    />
  );
};

export const data = [
  {
    id: 1,
    title: "Social Media Growth",
    Component: SocialMediaGrowth,
    cardTitle: "Turn Followers into Engaged Communities.",
    cardSubtitle:
      "We develop tailored strategies that increase brand awareness, boost engagement, and drive conversions across all major platforms.",
  },
  {
    id: 2,
    title: "Web Design & Development",
    Component: WebDesignDevelopment,
    cardTitle: "Websites That Convert, Not Just Impress",
    cardSubtitle:
      "Our UX-driven designs ensure seamless experiences that keep visitors coming back",
  },
  {
    id: 3,
    title: "SEO & Content Writing",
    Component: SEOContentWriting,
    cardTitle: "Get Found. Stay Relevant",
    cardSubtitle:
      "We optimize your digital footprint with powerful SEO strategies and high-converting content..",
  },
  {
    id: 4,
    title: "Brand Strategy & Design",
    Component: BrandStrategyDesign,
    cardTitle: "Visuals That Speak Your Brand Story",
    cardSubtitle:
      "From brand identity to packaging, we craft designs that resonate with your audience.",
  },
];
