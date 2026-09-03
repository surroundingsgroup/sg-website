import { groq } from "next-sanity";
import { sanityClient } from "./client";
import { urlFor } from "./image";
import type { WorkCollection, WorkImage, VimeoRef } from "@/lib/work";
import type { PortfolioPin, RailItem } from "@/lib/locations";

/**
 * Sanity data layer — fetches `project` documents and maps them back into the
 * WorkCollection / PortfolioPin / RailItem shapes the site already renders, so
 * pages/components stay unchanged. This replaces the hardcoded lib/work.ts data.
 */

// Canonical vertical order for the /work index (matches stored data labels).
const VERTICAL_ORDER = [
  "Marine",
  "Real Estate",
  "Multifamily",
  "Private Aviation",
  "Resorts + Travel",
  "Hospitality + Experiences",
  "Exotic Automotive",
  "Luxury Goods",
  "Cross-Vertical",
];

// Vertical page slug → work label(s), mirroring the old lib/work.ts mapping.
const VERTICAL_TO_WORK_LABELS: Record<string, string[]> = {
  marine: ["Marine"],
  "real-estate": ["Real Estate"],
  multifamily: ["Multifamily"],
  "private-aviation": ["Private Aviation"],
  "resorts-travel": ["Resorts + Travel"],
  "hospitality-experiences": ["Hospitality + Experiences"],
  "exotic-automotive": ["Exotic Automotive"],
  "luxury-goods": ["Luxury Goods"],
};

interface SanityImg {
  alt?: string;
  asset?: unknown;
  hotspot?: unknown;
  crop?: unknown;
  dims?: { width: number; height: number };
}

interface SanityProject {
  title: string;
  slug: string;
  vertical: string;
  client?: string;
  location?: string;
  description?: string;
  featured?: boolean;
  mainVideoUrl?: string;
  socialCutUrls?: string[];
  gallery?: SanityImg[];
  feedStills?: SanityImg[];
  coordinates?: { lat: number; lng: number };
}

const projectProjection = groq`{
  title,
  "slug": slug.current,
  vertical,
  client,
  location,
  description,
  featured,
  mainVideoUrl,
  socialCutUrls,
  coordinates,
  gallery[]{ ..., "dims": asset->metadata.dimensions },
  feedStills[]{ ..., "dims": asset->metadata.dimensions }
}`;

/** Parse a Vimeo URL (vimeo.com/ID, /ID/HASH, or player.vimeo.com/video/ID?h=HASH). */
function parseVimeo(url?: string): VimeoRef | undefined {
  if (!url) return undefined;
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-z0-9]+))?/i);
  if (!m) return undefined;
  const hashParam = url.match(/[?&]h=([a-z0-9]+)/i);
  return { vimeoId: m[1], vimeoHash: m[2] || hashParam?.[1] };
}

/** Map a gallery/feed image → WorkImage at a target render width. */
function toWorkImage(
  img: SanityImg,
  width: number,
  cover = false,
): WorkImage | null {
  if (!img?.asset) return null;
  const w = img.dims?.width ?? width;
  const h = img.dims?.height ?? Math.round(width * 0.667);
  const height = Math.round((width * h) / w);
  return {
    src: urlFor(img).width(width).url(),
    alt: img.alt ?? "",
    width,
    height,
    ...(cover ? { cover: true } : {}),
  };
}

function toCollection(p: SanityProject): WorkCollection {
  const images = (p.gallery ?? [])
    .map((img, i) => toWorkImage(img, 2000, i === 0))
    .filter((x): x is WorkImage => x !== null);
  const verticalImages = (p.feedStills ?? [])
    .map((img) => toWorkImage(img, 1200))
    .filter((x): x is WorkImage => x !== null);
  const socialCuts = (p.socialCutUrls ?? [])
    .map((u) => parseVimeo(u))
    .filter((x): x is VimeoRef => Boolean(x));

  return {
    slug: p.slug,
    title: p.title,
    vertical: p.vertical,
    description: p.description ?? "",
    client: p.client,
    location: p.location,
    href: `/work/${p.slug}`,
    images,
    video: parseVimeo(p.mainVideoUrl),
    socialCuts: socialCuts.length ? socialCuts : undefined,
    verticalImages: verticalImages.length ? verticalImages : undefined,
  };
}

async function fetchProjects(): Promise<SanityProject[]> {
  return sanityClient.fetch(
    groq`*[_type == "project" && defined(slug.current)] | order(orderRank asc) ${projectProjection}`,
    {},
    { next: { revalidate: 60 } },
  );
}

/** All collections, ordered by canonical vertical then rank. */
export async function getAllProjects(): Promise<WorkCollection[]> {
  const raw = await fetchProjects();
  const cols = raw.map(toCollection);
  return cols.sort(
    (a, b) => VERTICAL_ORDER.indexOf(a.vertical) - VERTICAL_ORDER.indexOf(b.vertical),
  );
}

export async function getProjectBySlug(
  slug: string,
): Promise<WorkCollection | null> {
  const p: SanityProject | null = await sanityClient.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] ${projectProjection}`,
    { slug },
    { next: { revalidate: 60 } },
  );
  return p ? toCollection(p) : null;
}

/** Collections for one vertical (by page slug), in the drag-ordered sequence. */
export async function getProjectsByVertical(
  verticalSlug: string,
): Promise<WorkCollection[]> {
  const labels = VERTICAL_TO_WORK_LABELS[verticalSlug] ?? [];
  if (!labels.length) return [];
  const raw: SanityProject[] = await sanityClient.fetch(
    groq`*[_type == "project" && vertical in $labels && defined(slug.current)] | order(orderRank asc) ${projectProjection}`,
    { labels },
    { next: { revalidate: 60 } },
  );
  return raw.map(toCollection);
}

export async function getCollectionsBySlugs(
  slugs: string[],
): Promise<WorkCollection[]> {
  if (!slugs.length) return [];
  const raw: SanityProject[] = await sanityClient.fetch(
    groq`*[_type == "project" && slug.current in $slugs] ${projectProjection}`,
    { slugs },
    { next: { revalidate: 60 } },
  );
  const bySlug = new Map(raw.map((p) => [p.slug, toCollection(p)]));
  return slugs
    .map((s) => bySlug.get(s))
    .filter((c): c is WorkCollection => Boolean(c));
}

/** Clickable, clustered map pins — projects that have a geopoint. */
export async function portfolioPins(): Promise<PortfolioPin[]> {
  const raw = await fetchProjects();
  const byCity = new Map<string, PortfolioPin>();
  for (const p of raw) {
    if (!p.coordinates) continue;
    const key = (p.location || p.slug).trim();
    const proj = {
      title: p.title,
      href: `/work/${p.slug}`,
      vertical: p.vertical,
    };
    const existing = byCity.get(key);
    if (existing) existing.projects.push(proj);
    else
      byCity.set(key, {
        city: p.location || p.title,
        coordinates: [p.coordinates.lng, p.coordinates.lat],
        projects: [proj],
      });
  }
  return Array.from(byCity.values());
}

/** Flat rail of located projects for the map + Inside-the-Studio feed. */
export async function portfolioRail(): Promise<RailItem[]> {
  const raw = await fetchProjects();
  const rail: RailItem[] = [];
  for (const p of raw) {
    if (!p.coordinates) continue;
    const cover = p.gallery?.[0];
    if (!cover) continue;
    rail.push({
      slug: p.slug,
      title: p.title,
      vertical: p.vertical,
      href: `/work/${p.slug}`,
      location: p.location || "",
      cover: urlFor(cover).width(680).url(),
      alt: cover.alt ?? "",
      cities: [p.location || p.title],
    });
  }
  return rail;
}

/** Slugs for generateStaticParams. */
export async function getAllProjectSlugs(): Promise<string[]> {
  const slugs: string[] = await sanityClient.fetch(
    groq`*[_type == "project" && defined(slug.current)].slug.current`,
  );
  return slugs;
}
