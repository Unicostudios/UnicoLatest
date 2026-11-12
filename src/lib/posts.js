// Markdown blog posts live in /content/blog/<slug>.md.
// The SEO/GEO automation writes new posts here (see /seo/PLAYBOOK.md);
// the older hand-written posts stay as JSX in src/app/data/blogs/.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

function readSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getMarkdownPost(slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft) return null;
  return { slug, ...data, html: marked.parse(content) };
}

export function getAllMarkdownPosts() {
  return readSlugs()
    .map((slug) => {
      const { data } = matter(
        fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8")
      );
      return data.draft ? null : { slug, ...data };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
