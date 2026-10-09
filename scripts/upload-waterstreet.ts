/**
 * One-time: publish the three Water Street towers (Heron, Asher, Cora) to Sanity.
 *
 * - Uploads the culled, web-resized selects from the scratchpad staging dir.
 * - Creates Heron + Asher as new Multifamily projects.
 * - Refreshes Cora's gallery (keeps its slug/id) and deletes the stray draft
 *   `drafts.project-cora-residences` that duplicated it.
 *
 * Run:  npx tsx scripts/upload-waterstreet.ts   (needs SANITY_API_WRITE_TOKEN in .env.local)
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@sanity/client";
import { createReadStream, readdirSync } from "node:fs";
import { basename } from "node:path";

const token = process.env.SANITY_API_WRITE_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!token || !projectId || projectId === "placeholder") {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const STAGE =
  "/private/tmp/claude-501/-Users-billypavlock-Claude/58dc0c78-f227-4b52-b207-d12f90119001/scratchpad/staged";

type Tower = {
  id: string;
  slug: string;
  title: string;
  dir: string;
  description: string;
  coordinates: { lat: number; lng: number };
};

const TOWERS: Tower[] = [
  {
    id: "project-heron-water-street",
    slug: "heron-water-street",
    title: "Heron",
    dir: "heron",
    description:
      "A content shoot for Heron, a luxury high-rise in Tampa's Water Street district. Aerials of the tower and rooftop pool deck pair with floor-to-ceiling skyline interiors, resident-lifestyle moments, and the club and fitness amenities that define the building.",
    coordinates: { lat: 27.9412, lng: -82.4525 },
  },
  {
    id: "project-asher-water-street",
    slug: "asher-water-street",
    title: "Asher",
    dir: "asher",
    description:
      "A content shoot for Asher, a design-forward residential tower in Tampa's Water Street district. Aerials, a skyline rooftop lawn and pool, coworking and club lounges, and branded detail work capture the building's amenity-rich lifestyle.",
    coordinates: { lat: 27.94, lng: -82.451 },
  },
  {
    id: "project-cora-residences",
    slug: "cora-residences",
    title: "Cora Residences",
    dir: "cora",
    description:
      "A launch shoot for Cora Residences, a luxury high-rise in Tampa's Water Street district. Aerials of the signature curved-balcony architecture and rooftop pool deck blend with model-residence interiors, amenity lounges, a lush garden courtyard, and resident-lifestyle moments.",
    coordinates: { lat: 27.9418, lng: -82.45 },
  },
];

async function uploadGallery(dir: string, title: string) {
  const files = readdirSync(`${STAGE}/${dir}`)
    .filter((f) => f.toLowerCase().endsWith(".jpg"))
    .sort();
  const gallery = [];
  for (let i = 0; i < files.length; i++) {
    const path = `${STAGE}/${dir}/${files[i]}`;
    const asset = await client.assets.upload("image", createReadStream(path), {
      filename: basename(path),
    });
    gallery.push({
      _type: "image",
      _key: `img-${i}`,
      asset: { _type: "reference", _ref: asset._id },
      alt: `${title} at Water Street, Tampa — ${i === 0 ? "cover" : "gallery image " + (i + 1)}`,
    });
    process.stdout.write(`    ✓ ${files[i]}\n`);
  }
  return gallery;
}

async function run() {
  // Remove the stray Cora draft that duplicated the published doc.
  try {
    await client.delete("drafts.project-cora-residences");
    console.log("✓ deleted stray draft: drafts.project-cora-residences");
  } catch {
    console.log("· no Cora draft to delete (already gone)");
  }

  for (const t of TOWERS) {
    console.log(`\n${t.title} — uploading ${t.dir}/ …`);
    const gallery = await uploadGallery(t.dir, t.title);
    await client.createOrReplace({
      _id: t.id,
      _type: "project",
      title: t.title,
      slug: { _type: "slug", current: t.slug },
      vertical: "Multifamily",
      client: `${t.title.replace(" Residences", "")} / SPP Development`,
      location: "Water Street, Tampa, Florida",
      description: t.description,
      coordinates: { _type: "geopoint", ...t.coordinates },
      featured: false,
      gallery,
    });
    console.log(`✓ published ${t.id} (${gallery.length} images)`);
  }
  console.log("\nDone. Live within ~60s (ISR). /verticals/multifamily");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
