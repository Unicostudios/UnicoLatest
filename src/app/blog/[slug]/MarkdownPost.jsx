import Link from "next/link";
import { DarkGridHero } from "@/app/components/DarkGridHero";
import Footer from "@/app/components/Footer";
import { getAllMarkdownPosts } from "@/lib/posts";

const BASE = "https://unicostudios.in";

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Renders a post from /content/blog/<slug>.md with Article, FAQ and
// Breadcrumb structured data, so search and AI engines can quote it.
export default function MarkdownPost({ post }) {
  const url = `${BASE}/blog/${post.slug}`;
  const related = getAllMarkdownPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      mainEntityOfPage: url,
      image: post.image || undefined,
      author: { "@type": "Organization", name: "Unico Studios", url: BASE },
      publisher: {
        "@type": "Organization",
        name: "Unico Studios",
        logo: { "@type": "ImageObject", url: `${BASE}/assets/unicologo-white.png` },
      },
      keywords: post.keywords,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (Array.isArray(post.faq) && post.faq.length) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <div className="bg-white w-screen min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article className="text-black max-w-[860px] mx-auto px-4 xs:px-5 sm:px-8 pt-8 sm:pt-10 pb-16">
        <nav className="text-xs sm:text-sm mt-14 md:mt-20 mb-4 text-neutral-500">
          <Link href="/blog" className="underline">Blog</Link>
        </nav>
        <h1 className="text-3xl md:text-5xl mb-3 font-montserrat-bold leading-tight">
          {post.h1 || post.title}
        </h1>
        <p className="text-xs sm:text-sm mb-6 text-neutral-500">
          Published {formatDate(post.date)}
          {post.updated && post.updated !== post.date
            ? ` · Updated ${formatDate(post.updated)}`
            : ""}
        </p>
        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            className="w-full rounded-2xl sm:rounded-3xl h-64 md:h-96 object-cover mb-8"
          />
        )}
        {post.summary && (
          <div className="md-summary">
            <p className="font-montserrat-medium mb-1">The short answer</p>
            <p>{post.summary}</p>
          </div>
        )}
        <div className="md-post" dangerouslySetInnerHTML={{ __html: post.html }} />
        {Array.isArray(post.faq) && post.faq.length > 0 && (
          <section className="md-post">
            <h2>Frequently asked questions</h2>
            {post.faq.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </section>
        )}
      </article>

      {related.length > 0 && (
        <section className="text-black max-w-[860px] mx-auto px-4 xs:px-5 sm:px-8 pb-20">
          <h2 className="text-2xl sm:text-3xl font-montserrat-bold mb-5">Keep reading</h2>
          <ul className="flex flex-col gap-4">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="underline font-montserrat-medium">
                  {p.title}
                </Link>
                <p className="text-sm text-neutral-600">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <DarkGridHero
        theme={true}
        h={"Building something?"}
        p={"Brand, website, product and AI growth systems, from one small senior team. Tell us what you're working on."}
        btn={"Start a project"}
        href={"/contact"}
      />
      <Footer theme={true} />
    </div>
  );
}
