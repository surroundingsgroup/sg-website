/**
 * One-time: attach the native video reels to the three Water Street towers.
 * Uploads the web-transcoded MP4s (scratchpad/staged_reels) as Sanity file
 * assets and patches each project's `videoReels` array.
 *
 * Run:  npx tsx scripts/upload-reels.ts   (needs SANITY_API_WRITE_TOKEN in .env.local)
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@sanity/client";
import { createReadStream, readdirSync } from "node:fs";

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
  "/private/tmp/claude-501/-Users-billypavlock-Claude/58dc0c78-f227-4b52-b207-d12f90119001/scratchpad/staged_reels";

const TOWERS: { id: string; dir: string; captions: string[] }[] = [
  {
    id: "project-heron-water-street",
    dir: "heron",
    captions: [
      "A Day on Water Street",
      "Rooftop Amenity Tour",
      "Work & Unwind: Coworking + Wellness",
      "Scandinavian + Japanese Details",
    ],
  },
  {
    id: "project-asher-water-street",
    dir: "asher",
    captions: [
      "A Day on Water Street",
      "Designed to Connect",
      "Amenities",
      "The Social Atmosphere",
    ],
  },
  {
    id: "project-cora-residences",
    dir: "cora",
    captions: [
      "A Day in the Life: Water Street",
      "The Ultimate Rooftop Oasis",
      "Modern Craft + Curated Interiors",
      "Bringing Nature Indoors",
    ],
  },
];

async function run() {
  for (const t of TOWERS) {
    const files = readdirSync(`${STAGE}/${t.dir}`)
      .filter((f) => f.endsWith(".mp4"))
      .sort();
    console.log(`\n${t.dir} — uploading ${files.length} reels …`);
    const videoReels = [];
    for (let i = 0; i < files.length; i++) {
      const path = `${STAGE}/${t.dir}/${files[i]}`;
      const asset = await client.assets.upload("file", createReadStream(path), {
        filename: `${t.dir}-reel-${i + 1}.mp4`,
        contentType: "video/mp4",
      });
      videoReels.push({
        _type: "file",
        _key: `reel-${i}`,
        asset: { _type: "reference", _ref: asset._id },
        title: t.captions[i] ?? undefined,
      });
      process.stdout.write(`    ✓ ${files[i]}  (${t.captions[i]})\n`);
    }
    await client.patch(t.id).set({ videoReels }).commit();
    console.log(`✓ attached ${videoReels.length} reels to ${t.id}`);
  }
  console.log("\nDone. Live within ~60s (ISR) after the next deploy.");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
