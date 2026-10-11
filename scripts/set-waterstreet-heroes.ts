/**
 * One-time: set Billy's chosen hero images for the three Water Street towers,
 * and drop Cora's #2 from its gallery (it's becoming the hero, so remove the
 * duplicate). Heroes staged in scratchpad/staged_heroes/{tower}.jpg.
 *
 * Run:  npx tsx scripts/set-waterstreet-heroes.ts
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
  "/private/tmp/claude-501/-Users-billypavlock-Claude/58dc0c78-f227-4b52-b207-d12f90119001/scratchpad/staged_heroes";

const HEROES: { id: string; tower: string; title: string }[] = [
  { id: "project-heron-water-street", tower: "heron", title: "Heron" },
  { id: "project-asher-water-street", tower: "asher", title: "Asher" },
  { id: "project-cora-residences", tower: "cora", title: "Cora Residences" },
];

async function run() {
  for (const h of HEROES) {
    const asset = await client.assets.upload(
      "image",
      createReadStream(`${DIR}/${h.tower}.jpg`),
      { filename: `${h.tower}-hero.jpg` },
    );
    await client
      .patch(h.id)
      .set({
        heroImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: `${h.title} at Water Street, Tampa`,
        },
      })
      .commit();
    console.log(`✓ hero set: ${h.id}`);
  }

  // Cora: the new hero (#2) is also in the gallery — remove that gallery entry
  // (4th pick, _key img-3) so it doesn't appear twice.
  const coraGallery: { _key: string }[] = await client.fetch(
    `*[_id == "project-cora-residences"][0].gallery[]{_key}`,
  );
  const dupKey = coraGallery?.[3]?._key; // pick order [1,7,34,2,...] -> index 3 is #2
  if (dupKey) {
    await client
      .patch("project-cora-residences")
      .unset([`gallery[_key=="${dupKey}"]`])
      .commit();
    console.log(`✓ Cora: removed duplicate gallery entry (${dupKey})`);
  } else {
    console.log("· Cora: no gallery entry at index 3 to remove");
  }
  console.log("\nDone. Live within ~60s (ISR).");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
