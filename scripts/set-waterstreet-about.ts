/**
 * One-time: set the "About the property" storytelling fields on the three
 * Water Street towers. Facts sourced from KPF, Morris Adjmi Architects,
 * COOKFOX, Water Street Tampa, and local business press. Draft copy — Billy
 * verifies/edits in /studio.
 *
 * Run:  npx tsx scripts/set-waterstreet-about.ts
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
import { createClient } from "@sanity/client";

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

const ABOUT: Record<string, Record<string, string>> = {
  "project-heron-water-street": {
    developer: "Strategic Property Partners",
    architect: "Kohn Pedersen Fox (KPF)",
    completed: "2021",
    residences: "420 residences · 26 & 21 stories",
    neighborhood: "Water Street Tampa",
    story:
      "Heron was the first residential address to rise in Water Street Tampa, the 56-acre downtown district master-planned by Strategic Property Partners. Designed by Kohn Pedersen Fox, with landscape by Raymond Jungles and interiors by Cecconi Simone, its two towers of 26 and 21 stories hold 420 residences above a shared retail podium.\nWe captured Heron the way a prospective resident experiences it: aerials of the towers against the downtown skyline, the rooftop pool deck and amenity lawn, floor-to-ceiling interiors framing the water, and the quiet, wellness-forward design the building is known for.",
  },
  "project-asher-water-street": {
    developer: "Strategic Property Partners",
    architect: "Morris Adjmi Architects (ODP, architect of record)",
    completed: "2022",
    residences: "490 residences · 22 stories",
    neighborhood: "Water Street Tampa",
    story:
      "Asher sits at 1050 Water Street, a 22-story tower designed by Morris Adjmi Architects with ODP Architecture & Design as architect of record. Its facade of factory-style windows nods to Tampa's industrial past, and its LEED Gold residences sit above ROOST Tampa, the extended-stay concept from Method Co.\nWe shot Asher for the lifestyle its amenities promise: a rooftop pool deck and skyline lawn, design-forward club and coworking lounges, and the branded details that give the building its identity inside Water Street Tampa.",
  },
  "project-cora-residences": {
    developer: "Strategic Property Partners",
    architect: "COOKFOX Architects (ODP, architect of record)",
    completed: "2021",
    residences: "388 residences · 23 stories",
    neighborhood: "Water Street Tampa",
    story:
      "Cora is the sculptural, curved-balcony tower at the edge of Water Street Tampa, designed by COOKFOX Architects with interiors by Edit Lab at Streetsense. Its 23 stories and 388 residences take their form from the shipping and industrial structures that shaped Tampa Bay.\nOur launch shoot leaned into that signature architecture: aerials of the curved facade and rooftop pool, model residences framing the skyline, the lush garden courtyard, and the amenity lounges that define life inside the building.",
  },
};

async function run() {
  for (const [id, fields] of Object.entries(ABOUT)) {
    await client.patch(id).set(fields).commit();
    console.log(`✓ about set: ${id}`);
  }
  console.log("Done.");
}
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
