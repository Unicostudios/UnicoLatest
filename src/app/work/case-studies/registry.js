// Canonical, ordered list of the 9 case studies in the 2026 redesign.
// Single source of truth for: the /work index, the footer "Selected work"
// column, and each case study's "Next case study →" link (computed by
// wrapping around this array — do not hardcode next-links per page).
export const CASE_STUDIES = [
  {
    slug: "dream-aerospace",
    number: "001",
    name: "Dream Aerospace",
    year: "2026",
    location: "Chennai & IIT Kanpur",
    heroImage: "/assets/opt/da-molecule.jpg",
    description:
      "Indigenous green propulsion for spacecraft. Nine page templates built around the questions a satellite engineer actually asks — every product page ending in a real spec table.",
    tags: ["Website", "Product pages", "Design system"],
    imageOrder: "left",
  },
  {
    slug: "immersified",
    number: "002",
    name: "Immersified",
    year: "2026",
    location: "Dubai & Riyadh",
    heroImage: "/assets/opt/im-hero.jpg",
    description:
      "A 25-year event production and project management consultancy in Dubai and Riyadh. New positioning, five named capabilities, and a website that behaves like standing inside one of their installations.",
    tags: ["Identity", "Website", "Motion", "Print"],
    imageOrder: "left",
  },
  {
    slug: "g2-interiors",
    number: "003",
    name: "G2 Interiors",
    year: "2026",
    location: "India",
    heroImage: "/assets/opt/g2-hero.jpg",
    description:
      "Premium aluminium interiors — kitchens, wardrobes, office partitions. Identity, art direction and the website the projects live on.",
    tags: ["Identity", "Website"],
    imageOrder: "left",
  },
  {
    slug: "gohar",
    number: "004",
    name: "Gohar",
    year: "2025",
    location: "India",
    heroImage: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1000,q_auto,f_auto/v1744119305/gohar_uttjee.jpg",
    description:
      "Fine jewellery, timeless positioning. A sophisticated identity and a visually rich digital presence that reads premium at every touchpoint — and finally connects with the audience they were built for.",
    tags: ["Identity", "Website", "Art direction"],
    imageOrder: "right",
  },
  {
    slug: "haze-uae",
    number: "005",
    name: "Haze UAE",
    year: "2025",
    location: "UAE",
    heroImage: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1000,q_auto,f_auto/v1743943031/haze_oeggpz.jpg",
    description:
      "Event tech and AV, brought to life. We rebuilt the brand and the website with SEO-led content and a far clearer UI — event enquiries went up 150% and the positioning moved from vendor to partner.",
    tags: ["Identity", "Website", "SEO"],
    imageOrder: "left",
  },
  {
    slug: "doonya",
    number: "006",
    name: "Doonya",
    year: "2025",
    location: "India",
    heroImage: "https://res.cloudinary.com/dmfisp8ue/image/upload/w_1000,q_auto,f_auto/v1743943031/doonya_din5vs.jpg",
    description: "Brand identity work — case notes coming. Drop the visuals in and tell us the story you want told here.",
    tags: ["Identity", "Branding"],
    imageOrder: "right",
  },
  {
    slug: "aashir-kare",
    number: "007",
    name: "Aashir Kare",
    year: "2025",
    location: "India",
    heroImage: "/assets/opt/ak-hero.jpg",
    description:
      "Brand identity and a storefront built to sell without a sales team — six weeks from a blank page to a shop founders were screenshotting.",
    tags: ["Identity", "E-commerce", "Content"],
    imageOrder: "left",
  },
  {
    slug: "dupree-armon",
    number: "008",
    name: "Duprée Armon",
    year: "2025",
    location: "India",
    heroImage: "/assets/opt/dup-1.jpg",
    description:
      "Media shoot, art direction and a portfolio site — one visual language across stills, motion and the page they live on.",
    tags: ["Media shoot", "Art direction", "Portfolio site"],
    imageOrder: "left",
  },
  {
    slug: "travel-app",
    number: "009",
    name: "786P Travels",
    year: "2025",
    location: "Product design",
    heroImage: "/assets/opt/p786-sky.jpg",
    description:
      "Trips, currency exchange, recharge and transport rental in one app — plus the admin dashboard and the component library the build was assembled from.",
    tags: ["Product design", "Design system", "Mobile"],
    imageOrder: "left",
  },
];

export function getCaseStudy(slug) {
  return CASE_STUDIES.find((c) => c.slug === slug) || null;
}

export function getNextCaseStudy(slug) {
  const i = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (i === -1) return CASE_STUDIES[0];
  return CASE_STUDIES[(i + 1) % CASE_STUDIES.length];
}
