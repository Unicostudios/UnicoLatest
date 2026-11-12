// /llms.txt: summary for AI answer engines. Base text lives in
// content/llms.md; the guide list is added from content/blog at build time.
import fs from "fs";
import path from "path";
import { getAllMarkdownPosts } from "@/lib/posts";

export const dynamic = "force-static";

export function GET() {
  const base = fs.readFileSync(path.join(process.cwd(), "content", "llms.md"), "utf8").trimEnd();
  const posts = getAllMarkdownPosts();
  const guides = posts.length
    ? "\n\n## Guides\n\n" +
      posts
        .map((p) => `- [${p.h1 || p.title}](https://unicostudios.in/blog/${p.slug}): ${p.description}`)
        .join("\n")
    : "";
  return new Response(base + guides + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
