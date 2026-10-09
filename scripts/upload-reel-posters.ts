/**
 * One-time: attach a distinct poster still to each Water Street reel.
 * Uploads the ffmpeg-extracted frames (scratchpad/posters_final) and merges a
 * `poster` image onto each existing videoReels member (preserving the video
 * asset refs, keys, and titles).
 *
 * Run:  npx tsx scripts/upload-reel-posters.ts
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";

const token = process.env.SANITY_API_WRITE_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!token || !projectId) {
  console.error("Missing env");
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const DIR =
  "/private/tmp/claude-501/-Users-billypavlock-Claude/58dc0c78-f227-4b52-b207-d12f90119001/scratchpad/posters_final";

const TOWERS: { id: string; dir: string }[] = [
  { id: "project-heron-water-street", dir: "heron" },
  { id: "project-asher-water-street", dir: "asher" },
  { id: "project-cora-residences", dir: "cora" },
];

interface ReelMember {
  _type: string;
  _key: string;
  asset?: { _ref?: string };
  title?: string;
  poster?: unknown;
}

async function run() {
  for (const t of TOWERS) {
    const reels: ReelMember[] = await client.fetch(
      `*[_id == $id][0].videoReels`,
      { id: t.id },
    );
    if (!reels?.length) {
      console.log(`! ${t.id}: no videoReels`);
      continue;
    }
    console.log(`\n${t.dir} — ${reels.length} reels`);
    const updated: ReelMember[] = [];
    for (let i = 0; i < reels.length; i++) {
      const posterPath = `${DIR}/${t.dir}_${String(i + 1).padStart(2, "0")}.jpg`;
      const asset = await client.assets.upload(
        "image",
        createReadStream(posterPath),
        { filename: `${t.dir}-reel-${i + 1}-poster.jpg` },
      );
      updated.push({
        ...reels[i],
        poster: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      });
      process.stdout.write(`    ✓ poster ${i + 1} (${reels[i].title ?? ""})\n`);
    }
    await client.patch(t.id).set({ videoReels: updated }).commit();
    console.log(`✓ ${t.id}: posters attached`);
  }
  console.log("\nDone.");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
