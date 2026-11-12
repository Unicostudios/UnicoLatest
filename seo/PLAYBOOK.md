# Unico SEO/GEO automation playbook

This file is the instruction set for the scheduled Claude agent that runs
Unico's SEO (search engines) and GEO (AI answer engines: ChatGPT,
Perplexity, Claude, Gemini, Google AI Overviews). It runs without a human
in the loop, so follow these rules exactly. When in doubt, do less.

Site: https://unicostudios.in · Repo: Unicostudios/UnicoLatest · Deploys:
Vercel builds `main` automatically on push.

## 0. Kill switch

Before doing anything, read `seo/config.json`. If `"paused": true`, write
one line to `seo/log.md` ("Skipped: paused") and stop.

## 1. Who Unico is (positioning)

Unico Studios is a small, senior **design + AI growth studio** in Bengaluru.
Two halves, one team:

- **Design studio**: brand identity, websites (built in-house in Next.js),
  SaaS product design, design systems.
- **AI growth**: custom AI agents (WhatsApp, sales, CRM), D2C CRMs,
  content and SEO engines, digital marketing.

Audience: founders/CEOs (28-50) of funded startups, premium D2C brands and
service businesses in **Bengaluru, Mumbai, Dubai, Singapore**. Their pains:
logo/site/app from different vendors that don't match; agencies that hand
over a mood board, not a system; slow, vague processes; not looking
investor-ready before a raise.

Voice: direct, confident, founder-to-founder, systems-minded, unfussy.
Short sentences. No hype words ("revolutionary", "cutting-edge",
"leverage", "synergy", "in today's fast-paced world"). No emojis.

## 2. Hard rules (never break)

1. **No invented facts.** Never make up client names, results, percentages,
   prices, awards, team size, years in business or testimonials. Only use
   facts in this playbook, `content/llms.md`, or the site's own pages. If a
   claim needs a number you don't have, rewrite the sentence without it.
2. **No fake "Top 10" lists ranking Unico #1**, and no naming or
   disparaging competitors.
3. **Never touch** tracking scripts (Meta Pixel, GTM, GA, Clarity,
   PageSense), `src/app/api/**`, environment files, `package.json`
   dependencies, or page designs/components. You may only edit the files
   listed in section 6.
4. **The build must pass.** Run `npm ci && npm run build` before pushing.
   If it fails and you can't fix it within your allowed files, revert your
   changes, log the failure, and stop. Never push a failing build.
5. Max **2 new posts per run**. Never delete or unpublish existing pages.
6. Don't target a keyword an existing post already targets (check
   `seo/keywords.md` and existing titles). Update the old post instead.

## 3. Each run (Mondays and Thursdays)

1. Kill-switch check (section 0).
2. Read `seo/log.md` (last 10 entries), `seo/topics.md`, `seo/keywords.md`.
3. **Technical check.** The cloud environment may not reach
   unicostudios.in, so check your own production build instead: after the
   build in step 7 (run it early for this check), start it with
   `npx next start -p 3123 &`, wait until `curl -s localhost:3123/robots.txt`
   answers, and check `http://localhost:3123` (the sitemap lists
   `https://unicostudios.in/...` URLs: swap the host). Stop the server when
   done (`pkill -f "next start"`).
   - Fetch `/robots.txt`, `/sitemap.xml`, `/llms.txt`; confirm 200.
   - Fetch every URL in the sitemap; list any non-200.
   - For each page: one `<title>` (≤ 60 chars ideal), meta description
     (≤ 160), canonical, exactly one `<h1>`, valid JSON-LD.
   - Fix issues only inside allowed files; otherwise log them under
     "Needs a human".
4. **Write `postsPerRun` posts** (from `seo/config.json`, max 2): pick the
   top unchecked items in `seo/topics.md`. Mix: about 3 of every 4 posts
   from Design or Development, 1 from AI growth (check the last entries in
   `seo/log.md` to keep the ratio). Each post must be genuinely useful and
   different from every existing post: quality over volume. Follow section 4.
5. Add the post to `src/app/data/allBlogs.json` (section 5), tick it off in
   `seo/topics.md`, record its target keyword in `seo/keywords.md`.
6. Keep `seo/topics.md` at ≥ 15 open topics in Design and ≥ 15 in
   Development: add new ones from section 7 research and from questions
   founders actually search.
6a. **GEO upkeep** (every run):
   - `/llms.txt` lists every Markdown post automatically and
     `/llms-full.txt` holds their full text; you don't edit those lists.
     Keep `content/llms.md` (the base text) factually current.
   - Every new post's first paragraph and `summary` must answer the title's
     question on their own, so an AI engine can quote them without context.
   - Link the new post from 1-2 older related posts (add a sentence with a
     link in their Markdown body) so guides form clusters.
7. Build, commit to `main` with message `seo: <what changed>`, push.
8. Append a run entry to `seo/log.md` (date, posts, fixes, issues).

## 4. How to write a post (built for search AND AI citation)

File: `content/blog/<slug>.md`. Slug: lowercase-hyphenated, includes the
main keyword, ≤ 6 words. Frontmatter:

```yaml
---
title: "≤ 60 chars, keyword first, ends with | Unico Studios if it fits"
h1: "Natural-language headline (can be longer)"
description: "≤ 155 chars, states the answer, not a tease"
summary: "2-3 sentence direct answer to the question in the title. AI engines quote this."
keywords: "primary keyword, 3-5 close variants"
date: "YYYY-MM-DD"
image: ""            # optional; leave empty rather than inventing a URL
faq:
  - q: "Real question a founder would type"
    a: "40-60 word self-contained answer."
---
```

Body (Markdown), 1,200-2,000 words:

- Open with the answer in the first 2 sentences. No throat-clearing intro.
- `##` sections phrased as the questions people actually search
  ("How much does brand identity cost in Bangalore?").
- Each section starts with a 1-2 sentence direct answer, then detail.
- Include at least one comparison **table** or numbered **checklist**.
- Use specifics: cities (Bengaluru, Mumbai, Dubai, Singapore), real
  process steps, real deliverables, honest trade-offs. Ranges for costs
  only if labelled as typical market ranges and not Unico's prices.
- 2-4 internal links to relevant Unico pages (services, landing pages,
  `/work`, other posts) with descriptive anchor text.
- 1 soft CTA near the end linking `/contact`. No hard sell.
- 3-5 FAQ items in frontmatter (they render on the page and as FAQ schema),
  don't repeat them in the body.
- Write so a single paragraph can be lifted out and still make sense.

## 5. allBlogs.json entry

Append (keep existing entries untouched; `id` = last id + 1):

```json
{
  "id": 8,
  "img": "<same as frontmatter image, or https://res.cloudinary.com/dmfisp8ue/image/upload/v1745333408/Unico_Studios_ksivf7.png>",
  "imgPos": "center",
  "date": "Month D, YYYY",
  "title": "<h1>",
  "description": "<first 2-3 sentences of the post>",
  "slug": "/blog/<slug>"
}
```

## 6. Files you may edit

- `content/blog/*.md` (create/update)
- `src/app/data/allBlogs.json` (append only)
- `content/llms.md` (base text for /llms.txt; keep facts current)
- Bodies of existing `content/blog/*.md` posts (to add internal links or
  refresh facts; never delete a post)
- `seo/*` (topics, keywords, log, report)
- `metadata` objects (title/description/keywords/canonical only) in
  `src/app/**/page.jsx` and `src/app/**/layout.jsx`

## 7. Monthly run (first Monday of the month, in addition to weekly)

1. **AI visibility check.** Note: AI answers for agency queries are
   mostly built from directories (Clutch, DesignRush, GoodFirms,
   TechBehemoths) and agencies' own location/service pages. Record which
   of those appear. Search the web for each query in
   `seo/geo-queries.md` and note whether unicostudios.in appears or Unico
   is named in the results/answers, and which sites are cited instead.
   Record a table in `seo/reports/YYYY-MM.md`.
2. Look at what cited competitors' pages do (structure, depth, FAQs) and
   add 3-5 topics to `seo/topics.md` that close those gaps.
3. Refresh the 2 oldest Markdown posts: update facts, add an `updated:`
   date to frontmatter, tighten the summary.
4. Write the month summary at the top of `seo/reports/YYYY-MM.md`:
   posts shipped, fixes, AI-visibility changes, "Needs a human" items.
   Keep it under 200 words: it's what the founder reads.
