import type { NextConfig } from "next";

/**
 * Site config. The big block here is `redirects()` — it preserves
 * SEO and any external links that still point at the old WordPress
 * URL structure. When the domain cuts over from Cloudways to Vercel,
 * none of these old URLs should 404.
 */
const nextConfig: NextConfig = {
  // Job applications upload a CV through a server action; the default
  // 1MB action body limit is too small for real resumes.
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  // Portfolio images are served from Sanity's image CDN.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // -------------------------------------------------------------
      // Internal restructure: case studies fold into the journal
      // -------------------------------------------------------------
      { source: "/case-studies", destination: "/journal", permanent: true },
      { source: "/case-studies/:slug", destination: "/journal/:slug", permanent: true },

      // -------------------------------------------------------------
      // Discovery call folded into the contact page
      // -------------------------------------------------------------
      { source: "/discovery-call", destination: "/contact", permanent: true },
      { source: "/discovery-call/", destination: "/contact", permanent: true },

      // -------------------------------------------------------------
      // WordPress → Next.js URL rewrites
      // (covers the most common WP page slugs and Salient/Elementor
      //  permalink conventions; extend the list as we discover more
      //  inbound URLs in the analytics logs)
      // -------------------------------------------------------------
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/services-2", destination: "/services", permanent: true },
      { source: "/what-we-do", destination: "/services", permanent: true },
      { source: "/our-work", destination: "/work", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/news", destination: "/journal", permanent: true },
      { source: "/news/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/editorial", destination: "/journal", permanent: true },
      { source: "/editorial/:slug", destination: "/journal/:slug", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/get-in-touch", destination: "/contact", permanent: true },
      { source: "/careers-2", destination: "/careers", permanent: true },
      { source: "/join-us", destination: "/careers", permanent: true },
      { source: "/our-team", destination: "/about/team", permanent: true },
      { source: "/team", destination: "/about/team", permanent: true },
      { source: "/nautical-network", destination: "/about/nautical-network", permanent: true },
      { source: "/sister-brand", destination: "/about/nautical-network", permanent: true },
      { source: "/book-a-call", destination: "/contact", permanent: true },
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/schedule", destination: "/contact", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },

      // -------------------------------------------------------------
      // Vertical / industry page renames
      // -------------------------------------------------------------
      { source: "/industries", destination: "/verticals", permanent: true },
      { source: "/industry", destination: "/verticals", permanent: true },
      { source: "/our-industries", destination: "/verticals", permanent: true },
      { source: "/markets", destination: "/verticals", permanent: true },
      { source: "/marine-yachting", destination: "/verticals/marine", permanent: true },
      { source: "/marine-and-yachting", destination: "/verticals/marine", permanent: true },
      { source: "/luxury-real-estate", destination: "/verticals/real-estate", permanent: true },
      { source: "/real-estate-development", destination: "/verticals/real-estate", permanent: true },
      { source: "/exotic-luxury-automotive", destination: "/verticals/exotic-automotive", permanent: true },
      { source: "/luxury-automotive", destination: "/verticals/exotic-automotive", permanent: true },
      { source: "/luxury-goods-experiences", destination: "/verticals/luxury-goods", permanent: true },

      // -------------------------------------------------------------
      // Old standalone job pages → new /careers/[slug] pages
      // -------------------------------------------------------------
      { source: "/business-development-rep", destination: "/careers/business-development-manager", permanent: true },
      { source: "/certified-creator", destination: "/careers/photographer-videographer", permanent: true },
      { source: "/film-maker", destination: "/careers/photographer-videographer", permanent: true },
      { source: "/email-marketing-specialist", destination: "/careers/email-marketing-specialist", permanent: true },
      { source: "/intern-business-development-representative", destination: "/careers/intern-business-development", permanent: true },
      { source: "/intern-social-media", destination: "/careers/intern-social-media", permanent: true },
      { source: "/paid-media-specialist", destination: "/careers/paid-media-specialist", permanent: true },
      { source: "/pr-brand-communications-specialist", destination: "/careers/pr-brand-communications-specialist", permanent: true },
      { source: "/social-media-coordinator", destination: "/careers/social-media-coordinator", permanent: true },

      // -------------------------------------------------------------
      // Legacy WP system paths that occasionally show up in logs
      // -------------------------------------------------------------
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/wp-login.php", destination: "/", permanent: false },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },

      // -------------------------------------------------------------
      // Legacy 404 cleanup — old WordPress pages/posts Search Console
      // still had on file (Jul 2026) with no destination on the new site
      // -------------------------------------------------------------
      { source: "/webservices", destination: "/services/digital", permanent: true },
      { source: "/socialmediamanagement", destination: "/services/social", permanent: true },
      { source: "/director-of-marketing-and-brand-strategy", destination: "/careers", permanent: true },
      {
        source:
          "/why-high-end-brands-need-a-marketing-partner-who-knows-the-luxury-space-inside-and-out",
        destination: "/journal",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
