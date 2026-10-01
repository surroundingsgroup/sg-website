/**
 * One-time fixes to Sanity content:
 *   1. Restore privacy hashes on the two unlisted Gulfstream videos
 *      (the migration stored them as vimeo.com/{id} without the hash, so
 *      Vimeo refused to embed them). Unlisted embeds need vimeo.com/{id}/{hash};
 *      parseVimeo() reads the hash from that form.
 *   2. Rewrite the 5 project descriptions that still contained em dashes.
 *
 * Run:  npx tsx scripts/fix-sanity.ts   (needs SANITY_API_WRITE_TOKEN in .env.local)
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@sanity/client";

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

// 1. Unlisted video URLs — id/hash pairs from the original data.
const videoFixes: Record<string, { main?: string; cuts?: string[] }> = {
  "project-gulfstream-g650er": {
    main: "https://vimeo.com/1223046177/3b57a19084",
    cuts: ["https://vimeo.com/1223051530/e29e20bdf4"],
  },
  "project-gulfstream-g450": {
    main: "https://vimeo.com/1223053877/3a53ce9655",
    cuts: ["https://vimeo.com/1223053232/7306f29382"],
  },
};

// 2. Em-dash-free descriptions.
const descFixes: Record<string, string> = {
  "project-cora-residences":
    "A launch shoot for Cora Residences, a luxury high-rise residential tower in Tampa's downtown waterfront district. Aerials of the rooftop pool deck and skyline blend with resident-lifestyle vignettes: dog walks, dinner at Predalina, and quiet moments at floor-to-ceiling windows.",
  "project-gg-timepieces":
    "A product and lifestyle shoot for G&G Timepieces, a luxury watch dealer specializing in Audemars Piguet and Rolex. Gold Royal Oaks and Day-Dates staged against exotic machinery (a Lamborghini Huracán and an AMG G-Wagon), blending horology detail with collector lifestyle.",
  "project-offline":
    "A full brand shoot aboard M/Y Offline, a sleek open-style superyacht anchored off the Fowey Rocks Lighthouse near Miami. Running shots, drone aerials, designer interiors, and branded lifestyle details, with the lighthouse motif threaded through the exteriors.",
  "project-skyfall":
    "A comprehensive charter portfolio for the 58-meter superyacht Skyfall shot near Rose Island off Nassau. Running shots, top-down aerials over gin-clear flats, jacuzzi lifestyle, snorkeling, formal interiors, and twilight deck dining. A flagship marine collection.",
  "project-sparkman-wharf":
    "A hospitality campaign for Sparkman Wharf, Tampa's waterfront dining and entertainment district. Drone establishing views of the wharf and skyline, daytime beer-garden energy, golden-hour strolls, chef-driven food detail, and neon-lit nightlife. A full day-to-night arc of the guest experience.",
};

async function run() {
  for (const [id, v] of Object.entries(videoFixes)) {
    const patch = client.patch(id);
    if (v.main) patch.set({ mainVideoUrl: v.main });
    if (v.cuts) patch.set({ socialCutUrls: v.cuts });
    await patch.commit();
    console.log(`✓ video hashes: ${id}`);
  }
  for (const [id, description] of Object.entries(descFixes)) {
    await client.patch(id).set({ description }).commit();
    console.log(`✓ description: ${id}`);
  }
  console.log("\nDone. Live within ~60s (ISR).");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
