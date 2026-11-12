// Served at /sitemap.xml. Built from the code so it can't drift:
// case studies come from the registry, blog posts from allBlogs.json
// (legacy JSX posts) plus /content/blog/*.md (automated posts).
import { CASE_STUDIES } from "./work/case-studies/registry";
import legacyBlogs from "./data/allBlogs.json";
import { getAllMarkdownPosts } from "@/lib/posts";

const BASE = "https://unicostudios.in";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/bengaluru-digital-marketing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bengaluru-web-app-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/d2c-crm-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/custom-ai-agents-bengaluru", priority: 0.8, changeFrequency: "monthly" },
  { path: "/creative-design-reels-bengaluru", priority: 0.8, changeFrequency: "monthly" },
];

export default function sitemap() {
  const now = new Date();
  const mdPosts = getAllMarkdownPosts();
  const mdSlugs = new Set(mdPosts.map((p) => p.slug));

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${BASE}${r.path === "/" ? "/" : r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...CASE_STUDIES.map((c) => ({
      url: `${BASE}/work/${c.slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
    ...legacyBlogs
      .filter((b) => !mdSlugs.has(b.slug.replace("/blog/", "")))
      .map((b) => ({
        url: `${BASE}${b.slug}`,
        lastModified: new Date(b.date),
        changeFrequency: "yearly",
        priority: 0.5,
      })),
    ...mdPosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.updated || p.date),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
