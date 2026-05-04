/** @type {import('next').NextConfig} */
const nextConfig = {

  // ─── SPEED FIX: IMAGE OPTIMISATION ──────────────────────────────────────
  // WHY: Your LCP (Largest Contentful Paint) is 4.5 seconds — rated POOR.
  // On mobile (which is 100% of your traffic from Reels), this means people
  // wait 4.5 seconds before they see anything useful. Half your audience
  // leaves before the page even loads. AVIF and WebP are next-gen formats
  // that are 50-80% smaller than PNG/JPG — same quality, loads much faster.
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200],
  },

  // ─── SPEED FIX: COMPRESSION ─────────────────────────────────────────────
  // WHY: Gzip compression shrinks your HTML, CSS and JS before it's sent
  // to the browser. Typically reduces file sizes by 60-70%. This alone
  // can cut 0.5-1 second off load time on mobile connections.
  compress: true,

  // ─── SPEED FIX: PACKAGE OPTIMISATION ────────────────────────────────────
  // WHY: Next.js will only send the JavaScript code that's actually needed
  // for the current page instead of the entire app bundle. Smaller JS =
  // faster parse time = faster page load on mobile.
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },

  // ─── YOUR EXISTING REDIRECT ─────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },

};

export default nextConfig;
