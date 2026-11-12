// Served at /robots.txt. AI answer-engine crawlers are allowed explicitly
// so Unico can be cited in ChatGPT, Perplexity, Claude, Gemini, etc.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

export default function robots() {
  const disallow = ["/api/", "/demo/", "/components/"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: "https://unicostudios.in/sitemap.xml",
    host: "https://unicostudios.in",
  };
}
