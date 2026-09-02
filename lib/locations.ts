/**
 * Audience hubs and studio markers for the global reach map.
 *
 * Cities chosen to reflect the network demographics from the Nautical
 * Network Media Kit 2025:
 *   - Americas: 46.1% (heavy US East Coast + LA + Latin America)
 *   - Europe: 21.5% (UK, France, Italy, Monaco)
 *   - Middle East: 16.2% (UAE, Saudi)
 *   - Asia: 13.9% (Singapore, Hong Kong)
 *
 * Weight 1-3 controls visual emphasis on the map (larger dot for
 * primary audience hubs).
 */

export interface MapLocation {
  city: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude]
  weight: 1 | 2 | 3;
  type: "studio" | "audience" | "project";
}

export const studioLocation: MapLocation = {
  city: "Tampa",
  region: "Florida — Studio",
  coordinates: [-82.4572, 27.9506],
  weight: 3,
  type: "studio",
};

export const audienceHubs: MapLocation[] = [
  // Americas
  { city: "Miami", region: "Florida", coordinates: [-80.1918, 25.7617], weight: 3, type: "audience" },
  { city: "New York", region: "USA East", coordinates: [-74.006, 40.7128], weight: 3, type: "audience" },
  { city: "Los Angeles", region: "USA West", coordinates: [-118.2437, 34.0522], weight: 2, type: "audience" },
  { city: "Newport", region: "Rhode Island", coordinates: [-71.3128, 41.4901], weight: 1, type: "audience" },
  { city: "Toronto", region: "Canada", coordinates: [-79.3832, 43.6532], weight: 1, type: "audience" },
  { city: "São Paulo", region: "Brazil", coordinates: [-46.6333, -23.5505], weight: 1, type: "audience" },
  // Europe
  { city: "London", region: "United Kingdom", coordinates: [-0.1276, 51.5074], weight: 3, type: "audience" },
  { city: "Monaco", region: "Monaco", coordinates: [7.4246, 43.7384], weight: 3, type: "audience" },
  { city: "Paris", region: "France", coordinates: [2.3522, 48.8566], weight: 2, type: "audience" },
  { city: "Milan", region: "Italy", coordinates: [9.19, 45.4642], weight: 2, type: "audience" },
  { city: "Palma", region: "Mallorca", coordinates: [2.6502, 39.5696], weight: 1, type: "audience" },
  // Middle East
  { city: "Dubai", region: "UAE", coordinates: [55.2708, 25.2048], weight: 3, type: "audience" },
  { city: "Abu Dhabi", region: "UAE", coordinates: [54.3773, 24.4539], weight: 2, type: "audience" },
  { city: "Riyadh", region: "Saudi Arabia", coordinates: [46.6753, 24.7136], weight: 1, type: "audience" },
  // Asia
  { city: "Singapore", region: "Singapore", coordinates: [103.8198, 1.3521], weight: 2, type: "audience" },
  { city: "Hong Kong", region: "Hong Kong", coordinates: [114.1694, 22.3193], weight: 2, type: "audience" },
  // Oceania
  { city: "Sydney", region: "Australia", coordinates: [151.2093, -33.8688], weight: 1, type: "audience" },
];

/**
 * A few key reach pins — notable on-location shoots that don't have a
 * dedicated portfolio page. These stay non-clickable; the clickable
 * portfolio pins are derived from the work data (see workPinCoords /
 * portfolioPins in lib/work.ts). `region` shows in the hover tooltip.
 */
export const reachLocations: MapLocation[] = [
  { city: "Cannes", region: "France — on-location production", coordinates: [7.0179, 43.5528], weight: 1, type: "project" },
  { city: "Saint-Tropez", region: "France — on-location production", coordinates: [6.6407, 43.2727], weight: 1, type: "project" },
  { city: "Lake Como", region: "Italy — on-location production", coordinates: [9.2572, 45.9876], weight: 1, type: "project" },
  { city: "Pebble Beach", region: "California — Concours coverage", coordinates: [-121.9508, 36.5725], weight: 1, type: "project" },
];

/** One project on the map — a title + link, grouped under a city pin. */
export interface PortfolioPin {
  city: string;
  coordinates: [number, number];
  projects: { title: string; href: string; vertical: string }[];
}

// Shared city anchors so projects in the same city cluster onto one pin.
// Tampa is nudged off the studio marker so both stay clickable when zoomed.
const TAMPA: [number, number] = [-82.41, 27.9];
const MIAMI: [number, number] = [-80.1918, 25.7617];
const NASSAU: [number, number] = [-77.3554, 25.0601];
const EXUMAS: [number, number] = [-76.1, 23.7];

/**
 * Where each portfolio piece was shot, keyed by work slug. A project may
 * map to several cities (it then gets a pin in each). City strings are the
 * cluster key — identical strings merge onto one pin.
 */
export const workPinCoords: Record<
  string,
  { coordinates: [number, number]; city: string }[]
> = {
  // Private Aviation
  "gulfstream-g650er": [{ coordinates: [-74.0721, 4.711], city: "Bogotá, Colombia" }],
  "gulfstream-g450": [{ coordinates: [-96.797, 32.7767], city: "Dallas, Texas" }],
  "gulfstream-g650": [{ coordinates: [100.5018, 13.7563], city: "Bangkok, Thailand" }],
  "boeing-bbj": [{ coordinates: [100.5018, 13.7563], city: "Bangkok, Thailand" }],
  "jet-hq": [{ coordinates: [-82.3879, 28.5553], city: "Brooksville, Florida" }],
  "hera-flight": [{ coordinates: TAMPA, city: "Tampa, Florida" }],
  "falcon-2000ex": [{ coordinates: [-122.3321, 47.6062], city: "Seattle, Washington" }],
  "challenger-300-prague": [{ coordinates: [14.4378, 50.0755], city: "Prague, Czech Republic" }],
  "sikorsky-s76": [{ coordinates: [-79.2839, 25.7241], city: "Bimini, Bahamas" }],
  "naples-jet-center": [{ coordinates: [-81.7948, 26.142], city: "Naples, Florida" }],
  flexjet: [
    { coordinates: [-81.6944, 41.4993], city: "Cleveland, Ohio" },
    { coordinates: [-111.9261, 33.4942], city: "Scottsdale, Arizona" },
    { coordinates: MIAMI, city: "Miami, Florida" },
  ],
  // Marine
  aquanova: [{ coordinates: NASSAU, city: "Nassau, Bahamas" }],
  lumiere: [{ coordinates: MIAMI, city: "Miami, Florida" }],
  moca: [{ coordinates: EXUMAS, city: "Exumas, Bahamas" }],
  moonraker: [{ coordinates: EXUMAS, city: "Exumas, Bahamas" }],
  "no-time-to-die": [
    { coordinates: [-72.3851, 40.9634], city: "The Hamptons, New York" },
    { coordinates: MIAMI, city: "Miami, Florida" },
  ],
  skyfall: [{ coordinates: NASSAU, city: "Nassau, Bahamas" }],
  offline: [{ coordinates: MIAMI, city: "Miami, Florida" }],
  "scout-530-lxf": [{ coordinates: [-79.9311, 32.7765], city: "Charleston, South Carolina" }],
  // Real Estate
  "bali-estate": [{ coordinates: [-82.7637, 28.0808], city: "Palm Harbor, Florida" }],
  "carmel-estate": [{ coordinates: [-81.3792, 28.5383], city: "Orlando, Florida" }],
  "lakefront-estate": [{ coordinates: TAMPA, city: "Tampa, Florida" }],
  "tranquility-estate": [{ coordinates: TAMPA, city: "Tampa, Florida" }],
  // Resorts + Travel
  "emerald-bay": [{ coordinates: [-72.2654, 21.7738], city: "Turks and Caicos" }],
  "los-suenos": [{ coordinates: [-84.6589, 9.6489], city: "Herradura, Costa Rica" }],
  // Multifamily
  "cora-residences": [{ coordinates: TAMPA, city: "Tampa, Florida" }],
  // Hospitality + Experiences
  "sparkman-wharf": [{ coordinates: TAMPA, city: "Tampa, Florida" }],
  // Luxury Goods
  "gg-timepieces": [{ coordinates: MIAMI, city: "Miami, Florida" }],
};
