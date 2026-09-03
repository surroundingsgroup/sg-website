import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { verticals } from "@/lib/verticals";
import { services } from "@/lib/services";
import { featuredProjects } from "@/lib/featured-work";
import { getAllProjects } from "@/lib/sanity/queries";
import { jobs } from "@/lib/jobs";

/**
 * Auto-generated sitemap at /sitemap.xml.
 * Combines static routes with all dynamic detail pages.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const workCollections = await getAllProjects();
  const baseUrl = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about/team`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about/nautical-network`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/verticals`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const verticalRoutes: MetadataRoute.Sitemap = verticals.map((v) => ({
    url: `${baseUrl}${v.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: v.tier === 1 ? 0.85 : 0.75,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}${s.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Journal entries — only included once detail pages exist. For now
  // we publish the URLs anyway so search engines discover them when
  // the templates ship.
  const journalRoutes: MetadataRoute.Sitemap = featuredProjects.map((entry) => ({
    url: `${baseUrl}${entry.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const workRoutes: MetadataRoute.Sitemap = workCollections.map((c) => ({
    url: `${baseUrl}${c.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${baseUrl}/careers/${j.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...verticalRoutes,
    ...serviceRoutes,
    ...journalRoutes,
    ...workRoutes,
    ...jobRoutes,
  ];
}
