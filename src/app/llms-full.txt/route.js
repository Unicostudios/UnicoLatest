// /llms-full.txt: every guide in plain Markdown, so AI engines can read
// and quote them without parsing the site's HTML. Built at deploy time.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllMarkdownPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const base = fs.readFileSync(path.join(process.cwd(), "content", "llms.md"), "utf8").trimEnd();
  const posts = getAllMarkdownPosts().map((p) => {
    const raw = fs.readFileSync(path.join(process.cwd(), "content", "blog", `${p.slug}.md`), "utf8");
    const { content } = matter(raw);
    const faq = Array.isArray(p.faq) && p.faq.length
      ? "\n\n### Frequently asked questions\n\n" + p.faq.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")
      : "";
    return `---\n\n# ${p.h1 || p.title}\n\nURL: https://unicostudios.in/blog/${p.slug}\nPublished: ${p.date}${p.updated ? `\nUpdated: ${p.updated}` : ""}\n\n${p.summary ? `${p.summary}\n\n` : ""}${content.trim()}${faq}`;
  });
  return new Response([base, ...posts].join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
