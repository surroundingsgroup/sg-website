/**
 * Portfolio collections shown on /work — curated picks from studio shoots.
 *
 * Images live in /public/images/work/{slug}/ as web-optimized JPEGs
 * (max 1800px). next/image handles responsive sizing + WebP/AVIF.
 *
 * To add a collection: drop optimized images in a new folder, add an
 * entry here. The first image marked cover: true is used on the /work
 * index grid; all images render on the detail page in array order.
 */

export interface WorkImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Used as the card image on the /work index grid */
  cover?: boolean;
}

/** Reference to a Vimeo video — a hero film or a vertical social cut. */
export interface VimeoRef {
  vimeoId: string;
  /** Unlisted videos need the `h=` hash from the Vimeo share URL. */
  vimeoHash?: string;
  title?: string;
}

export interface WorkCollection {
  slug: string;
  /** Display title, e.g. "M/Y Skyfall" */
  title: string;
  /** Vertical label shown as a chip, e.g. "Marine" */
  vertical: string;
  /** 2-3 sentence description shown on the collection page */
  description: string;
  /** Client the work was produced for — shown as a credit line */
  client?: string;
  /** Where the shoot happened — shown alongside the client credit */
  location?: string;
  href: string;
  images: WorkImage[];
  /** Optional walkthrough / brand film (16:9), shown above the gallery. */
  video?: VimeoRef;
  /** Vertical (9:16) social cuts, shown as a horizontal reel shelf. */
  socialCuts?: VimeoRef[];
  /** Vertical (portrait) stills, shown in the feed shelf beside the cuts. */
  verticalImages?: WorkImage[];
}

export const workCollections: WorkCollection[] = [
  {
    slug: "aquanova",
    title: "M/Y Aquanova",
    vertical: "Marine",
    description:
      "A charter lifestyle shoot aboard a Palmer Johnson sport yacht anchored in turquoise shallows off Nassau, Bahamas. Running shots, sunset aerials, split-level over/under water photography, and warm contemporary interiors give this collection an adventurous, editorial edge.",
    client: "Iconic Yachts",
    location: "Nassau, Bahamas",
    href: "/work/aquanova",
    images: [
      {
        src: "/images/work/aquanova/aquanova-01.jpg",
        alt: "Sleek silver superyacht underway at speed across deep blue open water",
        width: 1800,
        height: 1200,
        cover: true,
      },
      {
        src: "/images/work/aquanova/aquanova-02.jpg",
        alt: "Aerial of yacht stern at sunset with sea pool and jet skis",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/aquanova/aquanova-03.jpg",
        alt: "Top-down aerial of superyacht anchored over turquoise Bahamian reef",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/aquanova/aquanova-04.jpg",
        alt: "Illuminated Aquanova stern at dusk under dramatic pink clouds",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/aquanova/aquanova-05.jpg",
        alt: "Guest on jet ski beside superyacht, shot half above and below water",
        width: 1800,
        height: 1202,
      },
      {
        src: "/images/work/aquanova/aquanova-06.jpg",
        alt: "Formal dining salon with macassar table, blue velvet chairs and orchids",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/aquanova/aquanova-07.jpg",
        alt: "Sky lounge interior with navy sofas, bar seating and marble cocktail table",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/aquanova/aquanova-08.jpg",
        alt: "Guest riding underwater Seabob through sunbeams above a coral reef",
        width: 1200,
        height: 1800,
      },
    ],
  },
  {
    slug: "lumiere",
    title: "M/Y Lumiere",
    vertical: "Marine",
    description:
      "A full charter campaign for a 60-meter superyacht shot off Miami at golden hour and into the night. Cinematic aerial running shots, a glowing night anchorage, the sun deck jacuzzi, opulent interiors, and styled fine-dining vignettes. The night aerials with underwater lighting are the signature frames.",
    location: "Off South Beach, Miami",
    href: "/work/lumiere",
    images: [
      {
        src: "/images/work/lumiere/lumiere-01.jpg",
        alt: "Superyacht glowing at dusk with turquoise underwater lights on dark sea",
        width: 1800,
        height: 1031,
        cover: true,
      },
      {
        src: "/images/work/lumiere/lumiere-02.jpg",
        alt: "Aerial of superyacht cruising at sunset with sweeping white wake",
        width: 1800,
        height: 1042,
      },
      {
        src: "/images/work/lumiere/lumiere-03.jpg",
        alt: "Top-down aerial of jet ski circling yacht with ring of wake",
        width: 1068,
        height: 1800,
      },
      {
        src: "/images/work/lumiere/lumiere-04.jpg",
        alt: "Sun deck jacuzzi sparkling in backlight with umbrellas and loungers",
        width: 1800,
        height: 1199,
      },
      {
        src: "/images/work/lumiere/lumiere-05.jpg",
        alt: "Shaded sun deck lounge with Miami skyline across blue water",
        width: 1800,
        height: 1263,
      },
      {
        src: "/images/work/lumiere/lumiere-06.jpg",
        alt: "Opulent master stateroom with domed ceiling and warm wood paneling",
        width: 1800,
        height: 1201,
      },
      {
        src: "/images/work/lumiere/lumiere-07.jpg",
        alt: "Couple toasting red wine beneath crystal chandelier in formal dining salon",
        width: 1800,
        height: 1100,
      },
      {
        src: "/images/work/lumiere/lumiere-08.jpg",
        alt: "Plated white chocolate dessert with raspberry coulis on fine china",
        width: 1307,
        height: 1800,
      },
    ],
  },
  {
    slug: "moca",
    title: "M/Y Moca",
    vertical: "Marine",
    description:
      "An exterior-and-interior shoot of the 73-meter motor yacht Moca at anchor in the Exumas, Bahamas. Aerials capture the yacht over electric turquoise banks with tenders and jet skis deployed, alongside a dramatic night anchorage and serene blond-wood interiors.",
    client: "FGI",
    location: "Exumas, Bahamas",
    href: "/work/moca",
    images: [
      {
        src: "/images/work/moca/moca-01.jpg",
        alt: "Aerial of white superyacht at anchor with jet skis carving turquoise water",
        width: 1800,
        height: 1017,
        cover: true,
      },
      {
        src: "/images/work/moca/moca-02.jpg",
        alt: "Superyacht fully illuminated at night on glowing blue water",
        width: 1800,
        height: 1029,
      },
      {
        src: "/images/work/moca/moca-03.jpg",
        alt: "Top-down aerial of stern pool deck, tender and trailing jet skis",
        width: 1161,
        height: 1800,
      },
      {
        src: "/images/work/moca/moca-04.jpg",
        alt: "Bow-on view of superyacht anchored in vivid turquoise shallows",
        width: 1441,
        height: 1800,
      },
      {
        src: "/images/work/moca/moca-05.jpg",
        alt: "Covered aft deck lounge with coral pillows and teak decking",
        width: 1800,
        height: 1205,
      },
      {
        src: "/images/work/moca/moca-06.jpg",
        alt: "Aft deck seating and curved teak stairs leading to spa pool",
        width: 1800,
        height: 1225,
      },
      {
        src: "/images/work/moca/moca-07.jpg",
        alt: "Serene main salon with white sofas and panoramic sea-view windows",
        width: 1800,
        height: 1196,
      },
      {
        src: "/images/work/moca/moca-08.jpg",
        alt: "Light-filled master stateroom with blond wood and ocean view lounge",
        width: 1800,
        height: 1176,
      },
    ],
  },
  {
    slug: "moonraker",
    title: "M/Y Moonraker",
    vertical: "Marine",
    description:
      "A full charter-brand shoot aboard the 55-meter superyacht Moonraker anchored in Exuma, Bahamas. Dramatic drone work, dusk shots with glowing underwater lighting, interiors, water-toy lifestyle, and fine-dining details give this collection exceptional day-to-night range.",
    client: "Iconic Yachts",
    location: "Exuma, Bahamas",
    href: "/work/moonraker",
    images: [
      {
        src: "/images/work/moonraker/moonraker-01.jpg",
        alt: "Superyacht Moonraker carving a turquoise wake across open Bahamian water",
        width: 1800,
        height: 1347,
        cover: true,
      },
      {
        src: "/images/work/moonraker/moonraker-02.jpg",
        alt: "Bow view at dusk with underwater lights glowing turquoise beneath the yacht",
        width: 1800,
        height: 1348,
      },
      {
        src: "/images/work/moonraker/moonraker-03.jpg",
        alt: "Top-down aerial of illuminated superyacht over teal water at twilight",
        width: 1800,
        height: 1348,
      },
      {
        src: "/images/work/moonraker/moonraker-04.jpg",
        alt: "Master stateroom with skylight grid ceiling and silver-accented bedding",
        width: 1202,
        height: 1800,
      },
      {
        src: "/images/work/moonraker/moonraker-05.jpg",
        alt: "Guest launching a jet ski from the superyacht bow in choppy blue seas",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/moonraker/moonraker-06.jpg",
        alt: "Split-level underwater shot of guest riding sea scooter behind anchored yacht",
        width: 1800,
        height: 1199,
      },
      {
        src: "/images/work/moonraker/moonraker-07.jpg",
        alt: "Mimosas and fresh fruit spread on the sun deck at breakfast",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/moonraker/moonraker-08.jpg",
        alt: "Plated fine-dining course on white china at a candlelit yacht table",
        width: 1200,
        height: 1800,
      },
    ],
  },
  {
    slug: "no-time-to-die",
    title: "M/Y No Time To Die",
    vertical: "Marine",
    description:
      "A golden-hour brand shoot pairing a Sanlorenzo SX motor yacht with its orange-accented chase tender in the Hamptons. Aerial running shots, sunset exteriors along wooded shoreline, a beach picnic, and branded cocktail moments give it a lifestyle-editorial feel.",
    client: "M/Y No Time To Die charter",
    location: "The Hamptons + Miami",
    href: "/work/no-time-to-die",
    images: [
      {
        src: "/images/work/no-time-to-die/no-time-to-die-01.jpg",
        alt: "Aerial of motor yacht anchored off a sandy spit in golden light",
        width: 1800,
        height: 1199,
        cover: true,
      },
      {
        src: "/images/work/no-time-to-die/no-time-to-die-02.jpg",
        alt: "Motor yacht underway with orange-trimmed chase tender running alongside",
        width: 1800,
        height: 1199,
      },
      {
        src: "/images/work/no-time-to-die/no-time-to-die-03.jpg",
        alt: "Yacht at anchor catching sunset glow beneath a wooded hillside",
        width: 1800,
        height: 1199,
      },
      {
        src: "/images/work/no-time-to-die/no-time-to-die-04.jpg",
        alt: "Top-down aerial of aft deck with tender, dinghy, and seabobs",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/no-time-to-die/no-time-to-die-05.jpg",
        alt: "Shaded aft-deck lounge set for lunch with aqua striped pillows",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/no-time-to-die/no-time-to-die-06.jpg",
        alt: "Couple relaxing under a fringed beach umbrella with yacht anchored offshore",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/no-time-to-die/no-time-to-die-07.jpg",
        alt: "Guest sipping a branded Spectre spritz cocktail at golden hour",
        width: 1200,
        height: 1800,
      },
    ],
  },
  {
    slug: "skyfall",
    title: "M/Y Skyfall",
    vertical: "Marine",
    description:
      "A comprehensive charter portfolio for the 58-meter superyacht Skyfall shot near Rose Island off Nassau. Running shots, top-down aerials over gin-clear flats, jacuzzi lifestyle, snorkeling, formal interiors, and twilight deck dining — a flagship marine collection.",
    client: "Northrop + Johnson",
    location: "Rose Island, Nassau, Bahamas",
    href: "/work/skyfall",
    images: [
      {
        src: "/images/work/skyfall/skyfall-01.jpg",
        alt: "Superyacht Skyfall underway at dusk beneath pastel pink clouds",
        width: 1800,
        height: 1148,
        cover: true,
      },
      {
        src: "/images/work/skyfall/skyfall-02.jpg",
        alt: "Top-down aerial of Skyfall with tenders over gin-clear turquoise flats",
        width: 1199,
        height: 1800,
      },
      {
        src: "/images/work/skyfall/skyfall-03.jpg",
        alt: "Couple sharing drinks at the sundeck jacuzzi above turquoise reef water",
        width: 1800,
        height: 1492,
      },
      {
        src: "/images/work/skyfall/skyfall-04.jpg",
        alt: "Half-underwater view of Skyfall's bow rising over crystal-clear sea",
        width: 1800,
        height: 1249,
      },
      {
        src: "/images/work/skyfall/skyfall-05.jpg",
        alt: "Lantern-lit aft deck lounge with teak soles at blue hour",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/skyfall/skyfall-06.jpg",
        alt: "Formal dining salon with chandeliers, mahogany joinery, and set table",
        width: 1800,
        height: 1189,
      },
      {
        src: "/images/work/skyfall/skyfall-07.jpg",
        alt: "Two snorkelers gliding over a sunlit coral seabed underwater",
        width: 1800,
        height: 1207,
      },
      {
        src: "/images/work/skyfall/skyfall-08.jpg",
        alt: "Couple on loungers at a private beach with Skyfall anchored beyond",
        width: 1800,
        height: 1180,
      },
    ],
  },
  {
    slug: "offline",
    title: "M/Y Offline",
    vertical: "Marine",
    description:
      "A full brand shoot aboard M/Y Offline, a sleek open-style superyacht anchored off the Fowey Rocks Lighthouse near Miami. Running shots, drone aerials, designer interiors, and branded lifestyle details — with the lighthouse motif threaded through the exteriors.",
    client: "Kitson Yacht Sales",
    location: "Miami, Florida",
    href: "/work/offline",
    images: [
      {
        src: "/images/work/offline/offline-01.jpg",
        alt: "Superyacht Offline anchored in turquoise water beside Fowey Rocks Lighthouse",
        width: 1800,
        height: 1011,
        cover: true,
      },
      {
        src: "/images/work/offline/offline-02.jpg",
        alt: "Aerial view of superyacht carving a white wake at full speed",
        width: 1800,
        height: 1051,
      },
      {
        src: "/images/work/offline/offline-03.jpg",
        alt: "Top-down aerial of yacht bow with tender tracing a wake nearby",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/offline/offline-04.jpg",
        alt: "Light-filled main salon with curved sofas, skylight, and ocean views",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/offline/offline-05.jpg",
        alt: "Shaded aft deck dining table set for guests while underway",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/offline/offline-06.jpg",
        alt: "Lighthouse reflected in the yacht's polished hull from the teak bow",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/offline/offline-07.jpg",
        alt: "Foredeck sunpads and tables facing the lighthouse on the horizon",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/offline/offline-08.jpg",
        alt: "Embossed Offline leather folio detail in warm interior light",
        width: 1440,
        height: 1800,
      },
    ],
  },
  {
    slug: "scout-530-lxf",
    title: "Scout 530 LXF",
    vertical: "Marine",
    description:
      "A product and lifestyle shoot for the Scout 530 LXF, a flagship luxury center console, run through Florida mangrove channels and open water. Aerial running shots, helm and cockpit detail, quad Mercury Verado power, and on-board lifestyle in golden-hour light.",
    client: "Scout Boats",
    location: "Florida",
    href: "/work/scout-530-lxf",
    images: [
      {
        src: "/images/work/scout-530-lxf/scout-530-lxf-01.jpg",
        alt: "Aerial of Scout 530 LXF running at speed across emerald water",
        width: 1800,
        height: 1011,
        cover: true,
      },
      {
        src: "/images/work/scout-530-lxf/scout-530-lxf-02.jpg",
        alt: "Scout 530 LXF profile at rest with quad outboards and fishing rods",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/scout-530-lxf/scout-530-lxf-03.jpg",
        alt: "Couple relaxing on transom seating framed by outboards and rods",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/scout-530-lxf/scout-530-lxf-04.jpg",
        alt: "Cockpit and mezzanine seating underway with quad engines and wake",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/scout-530-lxf/scout-530-lxf-05.jpg",
        alt: "Dual-helm station with glass displays looking out over open water",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/scout-530-lxf/scout-530-lxf-06.jpg",
        alt: "Symmetrical quad Mercury Verado outboards churning a white wake",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/scout-530-lxf/scout-530-lxf-07.jpg",
        alt: "Top-down aerial of couple lounging on the bow sunpads",
        width: 1011,
        height: 1800,
      },
    ],
  },
  {
    slug: "sparkman-wharf",
    title: "Sparkman Wharf",
    vertical: "Hospitality + Experiences",
    description:
      "A hospitality campaign for Sparkman Wharf, Tampa's waterfront dining and entertainment district. Drone establishing views of the wharf and skyline, daytime beer-garden energy, golden-hour strolls, chef-driven food detail, and neon-lit nightlife — a full day-to-night arc of the guest experience.",
    client: "Sparkman Wharf",
    location: "Tampa, Florida",
    href: "/work/sparkman-wharf",
    images: [
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-01.jpg",
        alt: "Aerial of Sparkman Wharf lawn and marina against Tampa skyline",
        width: 1800,
        height: 1348,
        cover: true,
      },
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-02.jpg",
        alt: "Two friends with drinks strolling the waterfront at vivid sunset",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-03.jpg",
        alt: "Friends toasting beers under an orange umbrella at the garden",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-04.jpg",
        alt: "Group sharing dinner on the lawn during an outdoor movie night",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-05.jpg",
        alt: "Smiling couple walking through the sunlit dining district under string lights",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-06.jpg",
        alt: "Chopsticks lifting a sushi roll above a slate serving board",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-07.jpg",
        alt: "Three cocktails clinking together in a moody upscale bar",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/sparkman-wharf/sparkman-wharf-08.jpg",
        alt: "Friends with ice cream beneath the neon Sparkman Wharf sign at night",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "bali-estate",
    title: "Bali Estate",
    vertical: "Real Estate",
    description:
      "A Balinese-inspired modern tropical residence with a resort-grade backyard built around a lagoon pool, carved-stone grotto waterfall, and dense palm landscaping. Daylight aerials, blue-hour rear elevations, and dramatically lit night details.",
    client: "Ryan Hughes Design",
    location: "Palm Harbor, Florida",
    href: "/work/bali-estate",
    images: [
      {
        src: "/images/work/bali-estate/bali-estate-01.jpg",
        alt: "Aerial view of tropical modern estate with lagoon pool amid lush palms",
        width: 1800,
        height: 1348,
        cover: true,
      },
      {
        src: "/images/work/bali-estate/bali-estate-02.jpg",
        alt: "Drone view over metal-roof residence, blue umbrellas and grotto pool below",
        width: 1800,
        height: 1348,
      },
      {
        src: "/images/work/bali-estate/bali-estate-03.jpg",
        alt: "Rear elevation of modern home with infinity-edge pool and stone boulders",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/bali-estate/bali-estate-04.jpg",
        alt: "Twilight facade with glowing interiors above illuminated rock-edged pool wall",
        width: 1202,
        height: 1800,
      },
      {
        src: "/images/work/bali-estate/bali-estate-05.jpg",
        alt: "LED-lit stone steps descending to pool terrace with waterfall at dusk",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/bali-estate/bali-estate-06.jpg",
        alt: "Night detail of amber-lit grotto pond beneath towering royal palms",
        width: 1202,
        height: 1800,
      },
    ],
  },
  {
    slug: "carmel-estate",
    title: "Carmel Estate",
    vertical: "Real Estate",
    description:
      "A sprawling lakefront compound photographed at dusk and night, anchored by a winding lagoon pool, sunken fire-pit conversation ring, and a cantilevered pavilion with a circular waterfall column. Night aerials show the full estate glowing against the dark lake.",
    client: "Ryan Hughes Design",
    location: "Orlando, Florida",
    href: "/work/carmel-estate",
    images: [
      {
        src: "/images/work/carmel-estate/carmel-estate-01.jpg",
        alt: "Twilight aerial of grand estate courtyard with palms and lake beyond",
        width: 1800,
        height: 1200,
        cover: true,
      },
      {
        src: "/images/work/carmel-estate/carmel-estate-02.jpg",
        alt: "Night aerial of illuminated lakefront compound with winding turquoise lagoon pool",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/carmel-estate/carmel-estate-03.jpg",
        alt: "Evening view of pavilion, waterfall column, and sunken lounge in pool",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/carmel-estate/carmel-estate-04.jpg",
        alt: "Sunken circular fire-pit lounge ringed by water facing the residence",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/carmel-estate/carmel-estate-05.jpg",
        alt: "Outdoor living pavilion at night beside glowing lazy-river waterfall feature",
        width: 1800,
        height: 1011,
      },
      {
        src: "/images/work/carmel-estate/carmel-estate-06.jpg",
        alt: "Sunset over resort-style pool, palms, and lake horizon with daybeds",
        width: 1800,
        height: 1012,
      },
      {
        src: "/images/work/carmel-estate/carmel-estate-07.jpg",
        alt: "Front motor court with geometric turf-inlaid paving at twilight",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "lakefront-estate",
    title: "Lakefront Estate",
    vertical: "Real Estate",
    description:
      "A transitional Mediterranean-modern estate on manicured lakefront grounds, featuring a courtyard pool with pergola lounge, retractable-canopy fire-feature terrace, and a full outdoor kitchen. Twilight aerials, a moonlit front elevation, and warm evening amenity shots.",
    client: "Ryan Hughes Design",
    location: "Tampa, Florida",
    href: "/work/lakefront-estate",
    images: [
      {
        src: "/images/work/lakefront-estate/lakefront-estate-01.jpg",
        alt: "Twilight aerial of estate rear with pergola, pool, and palm-framed terrace",
        width: 1800,
        height: 1199,
        cover: true,
      },
      {
        src: "/images/work/lakefront-estate/lakefront-estate-02.jpg",
        alt: "Daylight aerial of fenced backyard with pool courtyard and lawns",
        width: 1800,
        height: 1199,
      },
      {
        src: "/images/work/lakefront-estate/lakefront-estate-03.jpg",
        alt: "Top-down drone view of rectangular pool, trellis shadows, and palms",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/lakefront-estate/lakefront-estate-04.jpg",
        alt: "Moonlit front elevation with paver motor court and lit palm",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/lakefront-estate/lakefront-estate-05.jpg",
        alt: "Evening pool reflecting illuminated house, framed by umbrella and planters",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/lakefront-estate/lakefront-estate-06.jpg",
        alt: "Outdoor kitchen and dining pavilion with living green wall at dusk",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "tranquility-estate",
    title: "Tranquility Estate",
    vertical: "Real Estate",
    description:
      "A screened-lanai outdoor living environment in coastal Florida, organized around a symmetrical pool with in-water loungers, a slatted-wood cabana with sunken sectional and fire table, and an illuminated water wall. Spa-like, serene styling true to its name.",
    client: "Ryan Hughes Design",
    location: "Florida",
    href: "/work/tranquility-estate",
    images: [
      {
        src: "/images/work/tranquility-estate/tranquility-estate-01.jpg",
        alt: "Sunset view of symmetrical screened pool terrace with cabana and umbrellas",
        width: 1800,
        height: 1350,
        cover: true,
      },
      {
        src: "/images/work/tranquility-estate/tranquility-estate-02.jpg",
        alt: "Twilight pool terrace with cabana lounge, daybeds, and glowing water",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/tranquility-estate/tranquility-estate-03.jpg",
        alt: "Sunken cabana sectional with fire table above in-pool chaise loungers",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/tranquility-estate/tranquility-estate-04.jpg",
        alt: "Blue-lit waterfall wall cascading into pool at dusk",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/tranquility-estate/tranquility-estate-05.jpg",
        alt: "Daytime loungers and umbrellas beside mosaic-tiled pool under screen enclosure",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/tranquility-estate/tranquility-estate-06.jpg",
        alt: "Outdoor kitchen with woven pendants, herringbone tile, and stainless grill",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/tranquility-estate/tranquility-estate-07.jpg",
        alt: "Pool courtyard with rattan daybeds, green wall, and palm backdrop",
        width: 1800,
        height: 1350,
      },
    ],
  },
  {
    slug: "emerald-bay",
    title: "Emerald Bay",
    vertical: "Resorts + Travel",
    description:
      "A beachfront villa shoot in the Turks and Caicos, pairing architectural coverage of a white modern villa with infinity pool against bone-white sand and turquoise water. Paddleboarding, wakesurfing, a private chef, and sunset cocktails make it a full guest-experience story.",
    client: "Emerald Bay",
    location: "Turks and Caicos",
    href: "/work/emerald-bay",
    images: [
      {
        src: "/images/work/emerald-bay/emerald-bay-01.jpg",
        alt: "Sunset aerial from over turquoise water of beachfront villa and pool",
        width: 1800,
        height: 1350,
        cover: true,
      },
      {
        src: "/images/work/emerald-bay/emerald-bay-02.jpg",
        alt: "Aerial of infinity pool deck, umbrellas, and guests at beachfront villa",
        width: 1800,
        height: 1350,
      },
      {
        src: "/images/work/emerald-bay/emerald-bay-03.jpg",
        alt: "Poolside chaise loungers and turquoise banquettes at white modern villa",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/emerald-bay/emerald-bay-04.jpg",
        alt: "Girl leaping into infinity pool against turquoise bay and clouds",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/emerald-bay/emerald-bay-05.jpg",
        alt: "Guests watch wakesurfer carving boat wake in turquoise Caribbean water",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/emerald-bay/emerald-bay-06.jpg",
        alt: "Three friends paddleboarding across clear shallow water toward beachfront villas",
        width: 1440,
        height: 1800,
      },
      {
        src: "/images/work/emerald-bay/emerald-bay-07.jpg",
        alt: "Mojito on terrace table at sunset overlooking infinity pool cabana",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "gulfstream-g650er",
    title: "Gulfstream G650ER",
    vertical: "Private Aviation",
    description:
      "A brokerage listing shoot for a 2013 Gulfstream G650ER. Exterior airframe studies on the ramp, engine and winglet detail, and a cream-leather cabin with high-gloss wood, captured for the sale campaign and paid promotion to qualified buyers.",
    href: "/work/gulfstream-g650er",
    video: {
      vimeoId: "1223046177",
      vimeoHash: "3b57a19084",
      title: "Gulfstream G650ER — walkthrough film",
    },
    socialCuts: [
      {
        vimeoId: "1223051530",
        vimeoHash: "e29e20bdf4",
        title: "Gulfstream G650ER — social cut",
      },
    ],
    verticalImages: [
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-v01.jpg",
        alt: "Gulfstream G650ER executive seat and entertainment monitor, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-v02.jpg",
        alt: "Gulfstream G650ER nose and cockpit windows from the ramp, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-v03.jpg",
        alt: "Gulfstream G650ER engine and winglet against blue sky, vertical",
        width: 1200,
        height: 1800,
      },
    ],
    images: [
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-01.jpg",
        alt: "Gulfstream G650ER with airstairs down and red carpet on the ramp",
        width: 2000,
        height: 1334,
        cover: true,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-02.jpg",
        alt: "Gulfstream G650ER full side profile parked on the ramp with mountains beyond",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-03.jpg",
        alt: "Gulfstream G650ER three-quarter rear view outside the hangar",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-04.jpg",
        alt: "Gulfstream G650ER tail, wing, and Rolls-Royce engine detail",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-05.jpg",
        alt: "Gulfstream G650ER engine and polished fuselage detail",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-06.jpg",
        alt: "Gulfstream G650ER cabin with cream leather divan and high-gloss wood",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-07.jpg",
        alt: "Gulfstream G650ER main cabin sofa and club seating",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-08.jpg",
        alt: "Gulfstream G650ER cabin club seats with entertainment monitor",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-09.jpg",
        alt: "Gulfstream G650ER four-place club seating with dining table",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-10.jpg",
        alt: "Gulfstream G650ER executive seat beside a signature oval window",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-11.jpg",
        alt: "Gulfstream G650ER aft cabin seating with entertainment monitors",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650er/gulfstream-g650er-12.jpg",
        alt: "Gulfstream G650ER flight deck with Gulfstream avionics",
        width: 2000,
        height: 1334,
      },
    ],
  },
  {
    slug: "gulfstream-g450",
    title: "Gulfstream G450",
    vertical: "Private Aviation",
    description:
      "A brokerage listing shoot for a 2007 Gulfstream G450. Exterior airframe studies on the ramp, engine and livery detail, and a full cabin with a private aft bedroom, captured for the sale campaign and paid promotion to qualified buyers.",
    href: "/work/gulfstream-g450",
    video: {
      vimeoId: "1223053877",
      vimeoHash: "3a53ce9655",
      title: "Gulfstream G450 — walkthrough film",
    },
    socialCuts: [
      {
        vimeoId: "1223053232",
        vimeoHash: "7306f29382",
        title: "Gulfstream G450 — social cut",
      },
    ],
    verticalImages: [
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-v01.jpg",
        alt: "Gulfstream G450 cabin aisle looking aft, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-v02.jpg",
        alt: "Gulfstream G450 engine and winglet against blue sky, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-v03.jpg",
        alt: "Gulfstream G450 rear three-quarter view with sun flare, vertical",
        width: 1201,
        height: 1800,
      },
    ],
    images: [
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-01.jpg",
        alt: "Gulfstream G450 three-quarter front view on the ramp by the hangar",
        width: 2000,
        height: 1334,
        cover: true,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-02.jpg",
        alt: "Gulfstream G450 full side profile parked on the ramp",
        width: 2000,
        height: 1333,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-03.jpg",
        alt: "Gulfstream G450 head-on view from a low angle on the tarmac",
        width: 2000,
        height: 1333,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-04.jpg",
        alt: "Gulfstream G450 engine, wing, and blue-green livery detail",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-05.jpg",
        alt: "Gulfstream G450 blue and green livery stripe detail",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-06.jpg",
        alt: "Gulfstream G450 private aft bedroom with a made bed",
        width: 2000,
        height: 1336,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-07.jpg",
        alt: "Gulfstream G450 main cabin seating and divan",
        width: 2000,
        height: 1336,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-08.jpg",
        alt: "Gulfstream G450 cabin club seats looking forward",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-09.jpg",
        alt: "Gulfstream G450 cabin looking aft toward the galley",
        width: 2000,
        height: 1335,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-10.jpg",
        alt: "Gulfstream G450 executive seat beside an oval cabin window",
        width: 2000,
        height: 1335,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-11.jpg",
        alt: "Gulfstream G450 galley and entryway with monitor",
        width: 2000,
        height: 1339,
      },
      {
        src: "/images/work/gulfstream-g450/gulfstream-g450-12.jpg",
        alt: "Gulfstream G450 flight deck avionics",
        width: 2000,
        height: 1334,
      },
    ],
  },
  {
    slug: "gulfstream-g650",
    title: "Gulfstream G650",
    vertical: "Private Aviation",
    description:
      "A brokerage listing shoot for a Gulfstream G650. Exterior airframe studies on the ramp, engine and wing detail, a cream-leather cabin with a private aft bedroom, and the flight deck, captured for the sale campaign and paid promotion to qualified buyers.",
    href: "/work/gulfstream-g650",
    video: {
      vimeoId: "1223117805",
      title: "Gulfstream G650 — walkthrough film",
    },
    socialCuts: [
      {
        vimeoId: "1223119310",
        title: "Gulfstream G650 — social cut",
      },
      {
        vimeoId: "1223119485",
        title: "Gulfstream G650 — behind the scenes",
      },
    ],
    verticalImages: [
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-v01.jpg",
        alt: "Gulfstream G650 nose and cockpit windows from the ramp, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-v02.jpg",
        alt: "Gulfstream G650 engine and winglet detail, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-v03.jpg",
        alt: "Gulfstream G650 side profile on the ramp, vertical",
        width: 1200,
        height: 1800,
      },
    ],
    images: [
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-01.jpg",
        alt: "Gulfstream G650 full side profile parked on the ramp",
        width: 2000,
        height: 1334,
        cover: true,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-02.jpg",
        alt: "Gulfstream G650 three-quarter side view with the city beyond",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-03.jpg",
        alt: "Gulfstream G650 head-on three-quarter view on the tarmac",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-04.jpg",
        alt: "Gulfstream G650 three-quarter rear view on the ramp",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-05.jpg",
        alt: "Gulfstream G650 engine and wing detail",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-06.jpg",
        alt: "Gulfstream G650 main cabin club seating",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-07.jpg",
        alt: "Gulfstream G650 cabin seating and divan",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-08.jpg",
        alt: "Gulfstream G650 cabin dining and conference table",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-09.jpg",
        alt: "Gulfstream G650 private aft bedroom",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-10.jpg",
        alt: "Gulfstream G650 executive seat beside an oval window with a city view",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-11.jpg",
        alt: "Gulfstream G650 cabin seats with entertainment monitors",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/gulfstream-g650/gulfstream-g650-12.jpg",
        alt: "Gulfstream G650 flight deck",
        width: 2000,
        height: 1334,
      },
    ],
  },
  {
    slug: "boeing-bbj",
    title: "Boeing Business Jet",
    vertical: "Private Aviation",
    description:
      "A listing shoot for a Boeing Business Jet (BBJ). Exterior on the ramp, engine and winglet detail, the flight deck, and a wide-body VVIP interior: multiple lounges, a formal dining and conference cabin, a private stateroom, and a marble lavatory. Captured for the sale campaign and paid promotion to qualified buyers.",
    href: "/work/boeing-bbj",
    video: {
      vimeoId: "1223146243",
      title: "Boeing Business Jet — walkthrough film",
    },
    socialCuts: [
      { vimeoId: "1223145896", title: "Boeing Business Jet — social cut" },
      { vimeoId: "1223145897", title: "Boeing Business Jet — social cut" },
      { vimeoId: "1223145898", title: "Boeing Business Jet — social cut" },
    ],
    verticalImages: [
      {
        src: "/images/work/boeing-bbj/boeing-bbj-v01.jpg",
        alt: "Boeing Business Jet private stateroom, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-v02.jpg",
        alt: "Boeing Business Jet lounge with a large screen, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-v03.jpg",
        alt: "Boeing Business Jet club seats in golden light, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-v04.jpg",
        alt: "Boeing Business Jet main cabin looking aft, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-v05.jpg",
        alt: "Boeing Business Jet tail and winglet against a clear sky, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-v06.jpg",
        alt: "Boeing Business Jet winglet and engine, vertical",
        width: 1200,
        height: 1800,
      },
    ],
    images: [
      {
        src: "/images/work/boeing-bbj/boeing-bbj-01.jpg",
        alt: "Boeing Business Jet full side profile on the ramp",
        width: 2000,
        height: 1334,
        cover: true,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-02.jpg",
        alt: "Boeing Business Jet nose and forward fuselage on the ramp",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-03.jpg",
        alt: "Boeing Business Jet head-on and centered on the taxiway",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-04.jpg",
        alt: "Boeing Business Jet airstairs and forward fuselage",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-05.jpg",
        alt: "Boeing Business Jet engine nacelle detail",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-06.jpg",
        alt: "Boeing Business Jet flight deck",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-07.jpg",
        alt: "Boeing Business Jet main lounge with club seating",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-08.jpg",
        alt: "Boeing Business Jet formal dining and conference cabin",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-09.jpg",
        alt: "Boeing Business Jet lounge with a large screen and divan",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-10.jpg",
        alt: "Boeing Business Jet private stateroom",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-11.jpg",
        alt: "Boeing Business Jet marble lavatory with vanity",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/boeing-bbj/boeing-bbj-12.jpg",
        alt: "Boeing Business Jet galley",
        width: 2000,
        height: 1334,
      },
    ],
  },
  {
    slug: "jet-hq",
    title: "Jet HQ",
    vertical: "Private Aviation",
    description:
      "A lifestyle brand shoot for Jet HQ: the arrival, the walk to the aircraft, and the details that sell the private-flight experience.",
    href: "/work/jet-hq",
    video: {
      vimeoId: "1223458039",
      title: "Jet HQ — lifestyle film",
    },
    socialCuts: [
      { vimeoId: "1223458038", title: "Jet HQ — social cut" },
      { vimeoId: "1223458040", title: "Jet HQ — social cut" },
    ],
    images: [
      {
        src: "/images/work/jet-hq/jet-hq-01.jpg",
        alt: "Couple in black arriving at a private jet with luggage",
        width: 2000,
        height: 1333,
        cover: true,
      },
      {
        src: "/images/work/jet-hq/jet-hq-02.jpg",
        alt: "Couple walking from the private jet across the ramp",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/jet-hq/jet-hq-03.jpg",
        alt: "Man walking with a roller case, private jet behind",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/jet-hq/jet-hq-04.jpg",
        alt: "Man walking with luggage alongside the private jet",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/jet-hq/jet-hq-05.jpg",
        alt: "Woman walking toward the private jet with luggage",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/jet-hq/jet-hq-06.jpg",
        alt: "Boarding detail with heels on the airstairs and a leather bag",
        width: 1200,
        height: 1800,
      },
    ],
  },
  {
    slug: "flexjet",
    title: "Flexjet",
    vertical: "Private Aviation",
    description:
      "A private aviation brand shoot for Flexjet covering a fractional-ownership fleet on the ramp and in the hangar. Exterior airframe studies of an Embraer Praetor-class jet and a Sikorsky S-76 helicopter with warm, editorial cabin interiors and in-flight window views.",
    href: "/work/flexjet",
    video: {
      vimeoId: "1223450037",
      title: "Flexjet — brand film",
    },
    socialCuts: [
      { vimeoId: "1223439211", title: "Flexjet — social cut" },
      { vimeoId: "1223439248", title: "Flexjet — social cut" },
      { vimeoId: "1223439247", title: "Flexjet — social cut" },
      { vimeoId: "1223439249", title: "Flexjet — social cut" },
      { vimeoId: "1223439269", title: "Flexjet — social cut" },
    ],
    verticalImages: [
      {
        src: "/images/work/flexjet/flexjet-v01.jpg",
        alt: "Flexjet principal walking to the aircraft on the ramp, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/flexjet/flexjet-v02.jpg",
        alt: "Boarding the Flexjet aircraft up the airstairs, vertical",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/flexjet/flexjet-v03.jpg",
        alt: "Flexjet cabin cowhide accent chair, vertical",
        width: 1200,
        height: 1800,
      },
    ],
    images: [
      {
        src: "/images/work/flexjet/flexjet-01.jpg",
        alt: "Sikorsky helicopter and private jet on hangar ramp at golden hour",
        width: 1800,
        height: 1200,
        cover: true,
      },
      {
        src: "/images/work/flexjet/flexjet-02.jpg",
        alt: "Front three-quarter view of polished private jet nose on wet tarmac",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/flexjet/flexjet-03.jpg",
        alt: "Air-stair and gold-striped fuselage detail of luxury private jet",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/flexjet/flexjet-04.jpg",
        alt: "Tan leather jet cabin with dining table and fresh flowers",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/flexjet/flexjet-05.jpg",
        alt: "Jet cabin seats with coastline visible through oval windows in flight",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/flexjet/flexjet-06.jpg",
        alt: "Winglet above the clouds framed through a private jet window",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/flexjet/flexjet-07.jpg",
        alt: "Flexjet branded mat at jet stairs with helicopter waiting beyond",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/flexjet/flexjet-08.jpg",
        alt: "Flexjet aircraft on the ramp with a Range Rover and Bentley convertible",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/flexjet/flexjet-09.jpg",
        alt: "Owner in a Bentley convertible beside the Flexjet aircraft",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/flexjet/flexjet-10.jpg",
        alt: "Flexjet aircraft on a wet ramp under a moody sky",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/flexjet/flexjet-11.jpg",
        alt: "Flexjet cabin with cream leather seats and fresh flowers",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/flexjet/flexjet-12.jpg",
        alt: "Flexjet cabin divan and club seating in tan leather",
        width: 2000,
        height: 1334,
      },
      {
        src: "/images/work/flexjet/flexjet-13.jpg",
        alt: "View through a Flexjet cabin window to the aircraft and mountains",
        width: 2000,
        height: 1334,
      },
    ],
  },
  {
    slug: "los-suenos",
    title: "Los Sueños Resort + Marina",
    vertical: "Resorts + Travel",
    description:
      "A destination campaign for Los Sueños Resort and Marina on Costa Rica's Pacific coast, shot across air, sea, and villa. Sunrise drone work over the marina basin, sportfishing fleets running in formation, and lifestyle from champagne terraces to fighting fish offshore.",
    client: "Los Sueños Resort + Marina, with Galati Yacht Sales",
    location: "Herradura, Costa Rica",
    href: "/work/los-suenos",
    images: [
      {
        src: "/images/work/los-suenos/los-suenos-01.jpg",
        alt: "Sunrise aerial of Los Suenos marina, jungle hillside, and Pacific coastline",
        width: 1800,
        height: 1348,
        cover: true,
      },
      {
        src: "/images/work/los-suenos/los-suenos-02.jpg",
        alt: "Aerial view of terracotta resort hotel and pools against rainforest mountains",
        width: 1800,
        height: 1348,
      },
      {
        src: "/images/work/los-suenos/los-suenos-03.jpg",
        alt: "Five sportfishing yachts running in formation across deep blue water",
        width: 1800,
        height: 1348,
      },
      {
        src: "/images/work/los-suenos/los-suenos-04.jpg",
        alt: "Top-down aerial of sportfish yacht carving a wake offshore",
        width: 1800,
        height: 1348,
      },
      {
        src: "/images/work/los-suenos/los-suenos-05.jpg",
        alt: "Center console boat running fast along lush Costa Rican coastline",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/los-suenos/los-suenos-06.jpg",
        alt: "Four women in sundresses overlooking the marina from a villa terrace",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/los-suenos/los-suenos-07.jpg",
        alt: "Angler bending a rod against vivid blue offshore water",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/los-suenos/los-suenos-08.jpg",
        alt: "Bright villa living room with floor-to-ceiling windows and jungle views",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "cora-residences",
    title: "Cora Residences",
    vertical: "Multifamily",
    description:
      "A launch shoot for Cora Residences, a luxury high-rise residential tower in Tampa's downtown waterfront district. Aerials of the rooftop pool deck and skyline blend with resident-lifestyle vignettes — dog walks, dinner at Predalina, and quiet moments at floor-to-ceiling windows.",
    client: "Cora / SPP Development",
    location: "Water Street, Tampa, Florida",
    href: "/work/cora-residences",
    images: [
      {
        src: "/images/work/cora-residences/cora-residences-01.jpg",
        alt: "Aerial of landscaped rooftop pool deck atop downtown residential tower",
        width: 1800,
        height: 1348,
        cover: true,
      },
      {
        src: "/images/work/cora-residences/cora-residences-02.jpg",
        alt: "Drone view of Tampa waterfront district towers and marina at dusk",
        width: 1800,
        height: 1348,
      },
      {
        src: "/images/work/cora-residences/cora-residences-03.jpg",
        alt: "Woman walking dog past the Cora Residences branded entrance",
        width: 1800,
        height: 1202,
      },
      {
        src: "/images/work/cora-residences/cora-residences-04.jpg",
        alt: "Looking up at curved glass residential tower with planted balconies",
        width: 1800,
        height: 1202,
      },
      {
        src: "/images/work/cora-residences/cora-residences-05.jpg",
        alt: "Couple strolling past Predalina restaurant beneath glowing evening signage",
        width: 1202,
        height: 1800,
      },
      {
        src: "/images/work/cora-residences/cora-residences-06.jpg",
        alt: "Overhead view of man dining at marble table on palm mosaic floor",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/cora-residences/cora-residences-07.jpg",
        alt: "Resident with sparkling water gazing out floor-to-ceiling apartment windows",
        width: 1800,
        height: 1200,
      },
    ],
  },
  {
    slug: "gg-timepieces",
    title: "G&G Timepieces",
    vertical: "Luxury Goods",
    description:
      "A product and lifestyle shoot for G&G Timepieces, a luxury watch dealer specializing in Audemars Piguet and Rolex. Gold Royal Oaks and Day-Dates staged against exotic machinery — a Lamborghini Huracan and an AMG G-Wagon — blending horology detail with collector lifestyle.",
    client: "G&G Timepieces",
    location: "Miami, Florida",
    href: "/work/gg-timepieces",
    images: [
      {
        src: "/images/work/gg-timepieces/gg-timepieces-01.jpg",
        alt: "Gold Audemars Piguet in green presentation box on carbon fiber hood",
        width: 1200,
        height: 1800,
        cover: true,
      },
      {
        src: "/images/work/gg-timepieces/gg-timepieces-02.jpg",
        alt: "Gold Audemars Piguet Royal Oak perpetual calendar in display case",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gg-timepieces/gg-timepieces-03.jpg",
        alt: "Hands presenting boxed gold watch before a Mercedes G-Wagon grille",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gg-timepieces/gg-timepieces-04.jpg",
        alt: "Man wearing gold watch beside a Lamborghini in a showroom",
        width: 1200,
        height: 1800,
      },
      {
        src: "/images/work/gg-timepieces/gg-timepieces-05.jpg",
        alt: "Rolex Day-Date with black dial resting on suede display cushion",
        width: 1199,
        height: 1800,
      },
    ],
  },
  {
    slug: "selected-works",
    title: "Selected Works",
    vertical: "Cross-Vertical",
    description:
      "A mixed showcase spanning the agency's core luxury verticals: superyachts and sportfishing boats offshore, exotic cars from Pebble Beach Concours to Lamborghini and Bentley brand work, private jets on the ramp, and illuminated estates from Florida to the Caribbean.",
    client: "Various clients",
    href: "/work/selected-works",
    images: [
      {
        src: "/images/work/selected-works/selected-works-01.jpg",
        alt: "Gunmetal Bombardier Global jet mirrored in wet tarmac against desert mountains",
        width: 1800,
        height: 1200,
        cover: true,
      },
      {
        src: "/images/work/selected-works/selected-works-02.jpg",
        alt: "Aerial of Pershing sport yacht carving a white wake at speed",
        width: 1800,
        height: 1011,
      },
      {
        src: "/images/work/selected-works/selected-works-03.jpg",
        alt: "Red LaFerrari Aperta on the lawn at Pebble Beach Concours",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/selected-works/selected-works-04.jpg",
        alt: "Yellow Bentley Bacalar roadster displayed beside Flexjet event tower",
        width: 1800,
        height: 1200,
      },
      {
        src: "/images/work/selected-works/selected-works-05.jpg",
        alt: "Teak sportfish cockpit looking aft over a churning white wake",
        width: 1800,
        height: 1202,
      },
      {
        src: "/images/work/selected-works/selected-works-06.jpg",
        alt: "Palm-lined estate motor court with Ferrari and G-Wagon parked",
        width: 1800,
        height: 1200,
      },
    ],
  },
];

/** Cover image for a collection (first image flagged cover, else first image) */
export function collectionCover(c: WorkCollection): WorkImage {
  return c.images.find((i) => i.cover) ?? c.images[0];
}

/**
 * Maps a vertical slug (from lib/verticals.ts) to the vertical label(s)
 * used in workCollections. Used to filter portfolio work onto vertical
 * detail pages.
 */
const VERTICAL_TO_WORK_LABELS: Record<string, string[]> = {
  marine: ["Marine"],
  "real-estate": ["Real Estate"],
  multifamily: ["Multifamily"],
  "private-aviation": ["Private Aviation"],
  "resorts-travel": ["Resorts + Travel"],
  "hospitality-experiences": ["Hospitality + Experiences"],
  "exotic-automotive": [],
  "luxury-goods": ["Luxury Goods"],
};

/** Returns work collections that match a vertical slug. */
export function getWorkForVertical(verticalSlug: string): WorkCollection[] {
  const labels = VERTICAL_TO_WORK_LABELS[verticalSlug] ?? [];
  if (labels.length === 0) return [];
  return workCollections.filter((c) => labels.includes(c.vertical));
}

/** Returns specific collections by slug, preserving the input order. */
export function getCollectionsBySlugs(slugs: string[]): WorkCollection[] {
  return slugs
    .map((slug) => workCollections.find((c) => c.slug === slug))
    .filter((c): c is WorkCollection => Boolean(c));
}
