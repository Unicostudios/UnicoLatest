---
title: "Technical SEO Checklist for a Next.js Website | Unico"
h1: "Technical SEO checklist for a Next.js website (startup edition)"
description: "A technical SEO checklist for Next.js sites: rendering, metadata, canonicals, sitemap, robots, structured data, speed and AI-crawler access."
summary: "Next.js sites rank well when pages render real HTML on the server, each page has unique metadata and a canonical URL, a sitemap and robots.txt exist, structured data is valid, and the site is fast on mobile. Check these items before launch and after every major change."
keywords: "technical seo checklist nextjs, next.js seo, nextjs seo checklist, nextjs metadata, nextjs sitemap robots"
date: "2026-11-16"
faq:
  - q: "Is Next.js good for SEO?"
    a: "Yes, when pages are rendered on the server or pre-built as static HTML. Search engines and AI crawlers then receive full content without running JavaScript. Next.js has built-in support for metadata, sitemaps and robots files. Poor SEO usually comes from client-only rendering, missing metadata or slow pages, not from the framework."
  - q: "How do I add a sitemap in Next.js?"
    a: "In the App Router, add a sitemap.js file in the app directory that returns an array of URLs, or serve a static sitemap.xml. Include only canonical, indexable URLs that return 200, and submit the sitemap in Google Search Console."
  - q: "How do I set meta titles and descriptions in Next.js?"
    a: "In the App Router, export a metadata object or a generateMetadata function from each page or layout. Set title, description and alternates.canonical per page. Dynamic pages such as blog posts should build these from their own content so each page is unique."
  - q: "Should I block AI crawlers in robots.txt?"
    a: "Only if you don't want to appear in AI answers. If you want to be cited by ChatGPT, Perplexity, Claude or Google's AI features, allow their crawlers and keep your content in server-rendered HTML. It's a business choice, so make it deliberately."
---

A Next.js website ranks well when its pages deliver real HTML from the server, every page has unique metadata and a canonical URL, a sitemap and robots.txt exist, structured data is valid, and the site is fast on mobile. This checklist covers each area in the order we check it on projects for startups in Bengaluru, Mumbai, Dubai and Singapore.

## Is Next.js good for SEO?

Next.js is good for SEO when pages are pre-built or server-rendered, because crawlers receive complete content without executing JavaScript. The framework also ships the pieces you need: a Metadata API, sitemap and robots conventions, and image and font optimisation. Problems come from how it's used, not from the framework.

Why this matters more now: AI answer engines often fetch pages with simple crawlers that don't run JavaScript. If your content only appears after client-side rendering, they may not see it at all.

## What should you check first: rendering?

Check that the content of each page appears in the raw HTML. View the page source, or run `curl` against the URL, and search for your headline and body text. If it's missing, the page depends on client-side rendering.

- Use Server Components, static generation or server rendering for content pages.
- Keep client components for interaction (menus, forms, sliders), not for main copy.
- Use `generateStaticParams` for blog and case-study routes so they're pre-built.
- Return a real 404 status for unknown slugs, not a 200 page that says "not found".

## How do you handle metadata in Next.js?

Give every page its own title, description and canonical URL through the Metadata API. Duplicate or missing metadata is the most common technical SEO fault on startup sites.

| Element | Target | Notes |
|---|---|---|
| Title | About 60 characters | Main keyword first; unique per page |
| Meta description | About 155 characters | State the answer or the value, not a tease |
| Canonical | One absolute URL | Set via `alternates.canonical` |
| H1 | Exactly one | Natural wording, matches search intent |
| Open Graph | Title, description, image | Controls link previews on social and chat apps |

For dynamic routes, export `generateMetadata` and build values from the page's own data.

## What about sitemap.xml and robots.txt?

Serve a sitemap that lists only canonical, indexable URLs returning 200, and a robots.txt that points to it. In the App Router, `app/sitemap.js` and `app/robots.js` generate both from code, so new pages are included automatically.

Checklist:

1. `/sitemap.xml` returns 200 and lists every public page.
2. No redirected, noindex or 404 URLs appear in it.
3. `/robots.txt` links to the sitemap and doesn't block CSS, JS or content you want indexed.
4. Staging and preview environments are blocked from indexing; production is not.
5. The sitemap is submitted in Google Search Console.

## How should you set up structured data?

Add JSON-LD that matches what's visible on the page, and validate it. Structured data helps search engines and AI engines understand who you are and what each page is.

- Organization (or LocalBusiness) on the homepage, with name, URL, logo and contact.
- Article and BreadcrumbList on blog posts.
- FAQPage only where the questions and answers are visible on the page.
- Never mark up claims that aren't on the page.

Test with Google's Rich Results Test and confirm the JSON-LD parses as valid JSON.

## What speed checks matter for Core Web Vitals?

Pass the three Core Web Vitals on mobile: Largest Contentful Paint, Cumulative Layout Shift and Interaction to Next Paint. Speed affects rankings and also how many visitors stay long enough to enquire.

- Use `next/image` with correct sizes; mark the hero image as priority.
- Use `next/font` to avoid layout shift from font loading.
- Load third-party scripts (analytics, chat, pixels) with a deferred strategy and audit what you really need.
- Test with Lighthouse and, after launch, with real-user data in Search Console.

## How do you make a Next.js site readable to AI engines?

Allow their crawlers, serve content as HTML, and add a plain-text summary file. An `llms.txt` file at the root, listing your key pages with one-line descriptions, gives AI tools a clean map of the site. It's a convention, not a guarantee, but it costs little.

Also write for citation: start each page with the direct answer, use question-style headings, and keep paragraphs that make sense on their own. We apply that approach on every site we build; see our [services](/services).

## What do you check after launch or a migration?

Run the same checks again on the live site, and compare before and after.

1. Crawl the site and list any non-200 URLs.
2. Confirm old URLs 301 to the right new ones.
3. Check Search Console for coverage and Core Web Vitals reports.
4. Re-test structured data on key templates.

Redesigning? Pair this list with our [website redesign checklist for startups](/blog/website-redesign-checklist-startups).

## Want this built in rather than bolted on?

We build marketing sites and web apps in Next.js with these checks part of the build, not an afterthought. See [web and app development in Bengaluru](/bengaluru-web-app-development) or [talk to us](/contact) about your site.
