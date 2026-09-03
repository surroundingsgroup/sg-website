/**
 * One-time migration: current hardcoded portfolio → Sanity.
 *
 * Reads workCollections (lib/work.ts) + workPinCoords (lib/locations.ts),
 * uploads every gallery/feed image, and creates a `project` document per
 * collection (idempotent — safe to re-run; uses a stable _id per slug).
 *
 * Prereqs (see docs/portfolio-cms.md):
 *   .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   and SANITY_API_WRITE_TOKEN (an Editor token).
 *
 * Run:  npx tsx scripts/migrate-to-sanity.ts
 */
import "dotenv/config";
import { readFileSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import { createClient } from "@sanity/client";
import { workCollections } from "../lib/work";
import { workPinCoords } from "../lib/locations";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === "placeholder" || !token) {
  console.error(
    "Missing config. Set NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const vimeoUrl = (id: string) => `https://vimeo.com/${id}`;

// Cache uploads so a re-run (or a shared image) doesn't re-upload.
const assetCache = new Map<string, string>();

async function uploadImage(src: string, alt: string, key: string) {
  const path = join(process.cwd(), "public", src);
  if (!existsSync(path)) {
    console.warn(`  ! missing image on disk: ${src}`);
    return null;
  }
  let assetId = assetCache.get(src);
  if (!assetId) {
    const asset = await client.assets.upload("image", readFileSync(path), {
      filename: basename(src),
    });
    assetId = asset._id;
    assetCache.set(src, assetId);
  }
  return {
    _type: "image",
    _key: key,
    alt,
    asset: { _type: "reference", _ref: assetId },
  };
}

async function migrate() {
  console.log(`Migrating ${workCollections.length} projects → ${projectId}/${dataset}\n`);

  // Per-vertical counter for an initial drag-order rank.
  const verticalIndex: Record<string, number> = {};

  for (const c of workCollections) {
    console.log(`• ${c.title} (${c.slug})`);

    const gallery = [];
    for (let i = 0; i < c.images.length; i++) {
      const img = c.images[i];
      const node = await uploadImage(img.src, img.alt, `img-${i}`);
      if (node) gallery.push(node);
    }

    const feedStills = [];
    const vimgs = c.verticalImages ?? [];
    for (let i = 0; i < vimgs.length; i++) {
      const node = await uploadImage(vimgs[i].src, vimgs[i].alt, `v-${i}`);
      if (node) feedStills.push(node);
    }

    const pin = workPinCoords[c.slug]?.[0];
    const rank = (verticalIndex[c.vertical] = (verticalIndex[c.vertical] ?? 0) + 1);

    const doc = {
      _id: `project-${c.slug}`,
      _type: "project",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      vertical: c.vertical,
      client: c.client,
      location: c.location,
      description: c.description,
      mainVideoUrl: c.video ? vimeoUrl(c.video.vimeoId) : undefined,
      socialCutUrls: c.socialCuts?.map((s) => vimeoUrl(s.vimeoId)),
      gallery,
      feedStills: feedStills.length ? feedStills : undefined,
      coordinates: pin
        ? { _type: "geopoint", lat: pin.coordinates[1], lng: pin.coordinates[0] }
        : undefined,
      featured: false,
      orderRank: String(rank).padStart(4, "0"),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${gallery.length} images${feedStills.length ? `, ${feedStills.length} feed stills` : ""}`);
  }

  console.log("\nDone. Open /studio to review + reorder.");
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
