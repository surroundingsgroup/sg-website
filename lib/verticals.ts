/**
 * Eight premium verticals — Surroundings Group.
 * Tier 1 (4) get full landing-page treatment; Tier 2 (4) get lighter pages.
 *
 * Data shape extended (2026-05-29) with rich detail-page fields:
 *   - intro            : positioning paragraph for the detail page
 *   - audienceSegments : who-we-serve breakouts within the vertical
 *   - signaturePlays   : recurring work patterns we deliver for this vertical
 *   - relatedServiceSlugs : services most relevant to this vertical
 *
 * The homepage card still uses `tagline`. The detail page uses
 * everything below.
 */

export interface AudienceSegment {
  name: string;
  copy: string;
}

export interface SignaturePlay {
  title: string;
  copy: string;
}

/** Search-engine overrides for a vertical's detail page. */
export interface VerticalSeo {
  /** Full <title>, used absolute (no "— Surroundings Group" suffix appended). */
  title: string;
  /** Meta description (~150–160 chars, keyword-rich but natural). */
  description: string;
  /** Optional keyword list for the meta keywords tag. */
  keywords?: string[];
}

/** "Why Surroundings" statement — market fluency + network, per vertical. */
export interface VerticalProof {
  eyebrow?: string;
  headline: string;
  body: string;
  /** Optional stat band. Omit for a copy-only statement. */
  stats?: { value: string; label: string }[];
}

/** A buyer FAQ. Rendered as an accordion + emitted as FAQPage schema. */
export interface VerticalFaq {
  q: string;
  a: string;
}

/** Vertical-specific closing CTA (overrides the generic site CTA banner). */
export interface VerticalCta {
  eyebrow?: string;
  headline: string;
  body?: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface Vertical {
  slug: string;
  name: string;
  /** Short editorial positioning shown on the homepage vertical card */
  tagline: string;
  /** Longer description (legacy field; still used in some places) */
  description: string;
  href: string;
  /** Tier 1 = lead vertical, full landing page; Tier 2 = lighter treatment */
  tier: 1 | 2;
  /**
   * Rich positioning paragraph for the detail page intro.
   * 2-3 sentences. No em-dashes, no triadic lists.
   */
  intro: string;
  /**
   * Who within this vertical we serve. Drives the "Who we serve"
   * section on the detail page.
   */
  audienceSegments: AudienceSegment[];
  /**
   * Recurring work patterns we deliver for this category.
   * Drives the "Signature work" section on the detail page.
   */
  signaturePlays: SignaturePlay[];
  /**
   * Service slugs most relevant to this vertical. Drives the
   * "Capabilities tuned to this category" section. Order matters.
   */
  relatedServiceSlugs: string[];
  /** Per-page section headlines so detail pages read authored, not templated */
  headlines: {
    intro: string;
    who: string;
    work: string;
    capabilities: string;
  };
  /**
   * Hero photo for the vertical card. File lives in
   * `/public/images/verticals/{slug}.jpg`. Optional.
   */
  image?: string;
  imageAlt?: string;

  /* ---- Optional traffic + conversion fields (per vertical) ------------
     When present, the detail-page template renders the richer, SEO-tuned
     experience: custom metadata, a search-intent H1, a proof band, an FAQ
     (with FAQ schema), and a vertical-specific CTA. Verticals without
     these fields fall back to the standard template. */
  /** SEO overrides — keyword-tuned <title>, description, keywords. */
  seo?: VerticalSeo;
  /** Search-intent H1 for the hero (defaults to `name`). */
  heroHeadline?: string;
  /** A phrase within `intro` to accent with the amber underline. */
  introHighlight?: string;
  /** Per-service note on how that capability applies to this vertical.
   *  Keyed by service slug; falls back to the service tagline when absent. */
  serviceNotes?: Record<string, string>;
  /** "Why Surroundings" statement (market fluency + network). */
  proof?: VerticalProof;
  /** Buyer FAQ — accordion + FAQPage structured data. */
  faqs?: VerticalFaq[];
  /** Vertical-specific closing CTA (falls back to the generic banner). */
  cta?: VerticalCta;
}

export const verticals: Vertical[] = [
  {
    slug: "marine",
    name: "Marine",
    tagline:
      "The category where we have the deepest reach — anchored by Nautical Network.",
    description:
      "From boat builders and brokerages to charter operators and marinas, we serve the entire marine industry with content, social, and distribution at a scale no other agency can match.",
    href: "/verticals/marine",
    headlines: {
      intro: "What we do in marine.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 1,
    image: "/images/verticals/marine.jpg",
    imageAlt: "Sport-fish yacht running across calm coastal water",
    intro:
      "Marine is our deepest category. We've worked in it for years, and we own Nautical Network — a marine media network reaching 180M+ viewers a year. Every marine client gets that distribution included.",
    introHighlight: "our deepest category",
    audienceSegments: [
      {
        name: "Boat builders + OEMs",
        copy: "Launch films, new-model campaigns, and content for dealer networks.",
      },
      {
        name: "Brokerages + dealers",
        copy: "Listing video and photography, social that moves inventory, and ads aimed at qualified buyers.",
      },
      {
        name: "Charter operators",
        copy: "Fleet films, social that drives bookings, and coverage across Nautical Network's channels.",
      },
      {
        name: "Marinas, refit yards + service brands",
        copy: "Branding, member content, and campaigns for the businesses around the boater.",
      },
    ],
    signaturePlays: [
      {
        title: "New-model launches",
        copy: "Launch film, social campaign, paid ads, and Nautical Network coverage — all timed to the reveal.",
      },
      {
        title: "Brokerage listing programs",
        copy: "Consistent listing video and photography for every boat, plus a social and email program that gets listings seen.",
      },
      {
        title: "Editorial integration",
        copy: "Coverage across Nautical Network's eight channels, built into every marine engagement.",
      },
      {
        title: "Boat show activation",
        copy: "Pre-show buildup, on-site capture, live publishing, and a post-show recap.",
      },
    ],
    relatedServiceSlugs: ["studio", "social", "growth", "experiences"],
  },
  {
    slug: "real-estate",
    name: "Real Estate + Development",
    tagline:
      "Developers, brokerages, builders, and the home services that bring properties to life.",
    description:
      "Cinematic project films, editorial storytelling, and integrated paid + PR — for developers building flagship properties, brokerages selling them, and the home services brands working around the luxury home.",
    href: "/verticals/real-estate",
    headlines: {
      intro: "What we do in real estate.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 1,
    image: "/images/verticals/real-estate.jpg",
    imageAlt: "Luxury estate at night — illuminated pool, waterfall feature, dramatic landscape lighting",
    intro:
      "We work across everything around the luxury home: developers building flagship projects, the brokerages selling them, the builders shaping them, and the design and service brands around them.",
    introHighlight: "the luxury home",
    audienceSegments: [
      {
        name: "Developers",
        copy: "Pre-sales storytelling, grand-opening campaigns, and ongoing brand presence for flagship developments. From sales-center launch to post-close referral programs.",
      },
      {
        name: "Brokerages + agents",
        copy: "Listing programs that match the property, agent brand building, and lead systems that bring in qualified buyers.",
      },
      {
        name: "Builders + design firms",
        copy: "Magazine-grade portfolio films and photography for builders and design firms.",
      },
      {
        name: "Home services brands",
        copy: "Interior design, landscape architecture, smart-home, and the premium service categories operating around the luxury home. Brand systems and content programs that travel with the property.",
      },
    ],
    signaturePlays: [
      {
        title: "Pre-sales campaigns",
        copy: "Project film, renderings turned into real content, and paid ads, PR, and email that sell units before doors open.",
      },
      {
        title: "Grand-opening launches",
        copy: "A campaign timed to opening day: on-site capture, social, and brand assets the property keeps using.",
      },
      {
        title: "Listing video programs",
        copy: "Repeatable capture and edit, so every property gets premium video without starting from scratch each listing.",
      },
      {
        title: "Editorial portfolio work",
        copy: "Magazine-style features for builders and design firms, distributed through the design press and our own channels.",
      },
    ],
    relatedServiceSlugs: ["studio", "growth", "social", "digital"],
  },
  {
    slug: "multifamily",
    name: "Multifamily",
    tagline:
      "Lease-up campaigns and lifestyle content for amenitized properties.",
    description:
      "Built for properties competing for discerning residents — content programs, social engines, and paid demand that fills units.",
    href: "/verticals/multifamily",
    headlines: {
      intro: "What we do in multifamily.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 1,
    image: "/images/verticals/multifamily.jpg",
    imageAlt: "Mid-rise residential building at sunset with pool deck below",
    intro:
      "The properties that lease fastest are the ones people can already picture living in. We build the content, social presence, and paid ads that take a property from announcement to full occupancy.",
    introHighlight: "lease fastest",
    audienceSegments: [
      {
        name: "Lease-up properties",
        copy: "Pre-opening content, leasing campaigns, and resident acquisition built to hit occupancy targets fast.",
      },
      {
        name: "Stabilized properties",
        copy: "Ongoing lifestyle content, retention programming, and brand presence for properties competing on amenity and lifestyle.",
      },
      {
        name: "Owner-operators + portfolios",
        copy: "One brand system that covers the whole portfolio — no separate agency for every property.",
      },
      {
        name: "Branded residences",
        copy: "Multifamily that carries a hotel or hospitality brand name needs both consumer brand discipline and lease-velocity outcomes. We build for both.",
      },
    ],
    signaturePlays: [
      {
        title: "Lease-up content programs",
        copy: "Pre-opening through stabilization. Built to translate construction milestones, amenity reveals, and resident events into a continuous social presence that drives qualified leasing traffic.",
      },
      {
        title: "Resident lifestyle channels",
        copy: "Property-specific Instagram, TikTok, and editorial content that makes prospective residents feel the building before they tour it. Renewals get easier when residents already follow the place they live.",
      },
      {
        title: "Paid lead engines",
        copy: "Targeted Meta and Google campaigns, leads routed into the leasing CRM, and reporting tied to signed leases.",
      },
      {
        title: "Portfolio brand systems",
        copy: "For owner-operators with multiple properties. One brand framework, repeatable templates, and a content pipeline that scales without proportionally scaling the cost.",
      },
    ],
    relatedServiceSlugs: ["social", "growth", "studio", "digital"],
  },
  {
    slug: "private-aviation",
    name: "Private Aviation",
    tagline:
      "Content and campaigns for jet brokerages, charter, FBOs, and OEMs.",
    description:
      "Production and distribution for the brands and terminals serving private flight — captured at the standard the category requires.",
    href: "/verticals/private-aviation",
    headlines: {
      intro: "What we do in aviation.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 1,
    image: "/images/verticals/private-aviation.jpg",
    imageAlt: "Private jet on tarmac with airstairs down and red carpet",
    intro:
      "We make the content and run the campaigns that move private aviation, from the jet on the market to the terminal that receives it. Listing packages that sell aircraft, brand films for charter and FBOs, launch work for OEMs, demand programs for service companies, all captured in-house. Then we put it in front of real buyers through the largest owned audience in premium lifestyle.",
    introHighlight: "the jet on the market",
    audienceSegments: [
      {
        name: "Aircraft brokerages + jet listings",
        copy: "Brand marketing for brokerages, plus listing-level content that sells the aircraft: aerial exteriors, cabin walkthroughs, spec-driven edits, and paid promotion aimed at qualified buyers. The system that moves yacht listings in marine, tuned for jets.",
      },
      {
        name: "Charter operators",
        copy: "Brand films, fleet content, route campaigns, and member-acquisition systems for the operators serving the top end of the on-demand market.",
      },
      {
        name: "FBOs + private terminals",
        copy: "Brand work and film for terminals, hangars, and member spaces, plus the local paid and social presence that keeps them top of mind for based and transient traffic.",
      },
      {
        name: "Aircraft OEMs",
        copy: "Launch campaigns for new models, ongoing brand presence, and dealer-network content programs for the manufacturers shaping the category.",
      },
      {
        name: "Aviation service companies",
        copy: "Brand and demand work for management companies, MRO and maintenance operations, jet-card programs, and training brands.",
      },
    ],
    signaturePlays: [
      {
        title: "Listing content that sells the aircraft",
        copy: "A cinematic listing package per jet: aerial exteriors, cabin walkthroughs, and spec-driven edits cut for brokerage sites, YouTube, and paid. Built to move the aircraft, not just look good. The jet version of the yacht-listing work we run in marine.",
      },
      {
        title: "Fleet + terminal films",
        copy: "Cinematic capture of aircraft, terminals, and member spaces. Aerial cinematography, interior coverage, and brand storytelling at the standard private aviation buyers expect.",
      },
      {
        title: "New-model + route launches",
        copy: "Campaign builds tied to a specific event: a new aircraft entering service, a new route opening, a new terminal coming online. Cinematic asset capture plus paid, PR, and owned distribution.",
      },
      {
        title: "Buyer + member acquisition",
        copy: "Paid campaigns and lead systems aimed at real aircraft buyers, charter members, and jet-card prospects.",
      },
      {
        title: "Cross-category integration",
        copy: "Aviation clients get visibility across our automotive, hospitality, and luxury goods rosters. The same buyer who charters a jet often owns the car and stays at the resort.",
      },
    ],
    relatedServiceSlugs: ["studio", "growth", "social", "experiences"],

    // ---- Traffic + conversion (Private Aviation is the push vertical) ----
    seo: {
      title:
        "Private Aviation Marketing Agency — Charter, OEMs + FBOs | Surroundings Group",
      description:
        "Marketing and cinematic content for private aviation: jet listings and brokerages, charter, FBOs, OEMs, and service companies. In-house production plus owned-media distribution from the team behind Nautical Network's 255M+ audience.",
      keywords: [
        "private aviation marketing",
        "aviation marketing agency",
        "aircraft brokerage marketing",
        "jet listing marketing",
        "aircraft sales marketing",
        "charter marketing",
        "private jet marketing",
        "aircraft OEM marketing",
        "FBO branding",
        "jet card marketing",
      ],
    },
    heroHeadline: "Marketing + content for private aviation.",
    serviceNotes: {
      studio:
        "Cinematic listing films, fleet and terminal shoots, and aerial work at the standard aviation buyers expect.",
      social:
        "Always-on vertical content and cuts for the platforms where charter and jet-card buyers actually scroll.",
      digital:
        "Brokerage and operator sites built to turn listing traffic into qualified inquiries.",
      growth:
        "Paid campaigns aimed at real aircraft buyers and members, plus earned press across aviation and lifestyle.",
      experiences:
        "Debuts, open houses, and static displays that put the aircraft in front of buyers in person.",
      intelligence:
        "Lead capture, follow-up, and reporting systems that keep a lean aviation team moving fast.",
    },
    proof: {
      eyebrow: "◆ WHY SURROUNDINGS",
      headline: "We know private aviation because we're surrounded by it.",
      body: "The audience, the brokers and operators, the OEMs, the terminals and ramps we shoot on. This is the world we work in, not a category we picked up. That fluency runs through every service we bring, from production to paid to PR, all under one in-house roof. We don't learn your market on your budget. We're already in it.",
      stats: [
        { value: "8", label: "premium markets we work inside" },
        { value: "255M+", label: "reached a year across our network" },
        { value: "10", label: "editorial channels we own" },
      ],
    },
    faqs: [
      {
        q: "Who do you work with in private aviation?",
        a: "Aircraft brokerages and jet-listing teams, charter and on-demand operators, FBOs and private terminals, aircraft OEMs, and service companies like management, MRO, jet-card, and training brands, from single-aircraft operators to category leaders.",
      },
      {
        q: "Do you produce content for individual aircraft listings?",
        a: "Yes. We build a listing package per aircraft: aerial exteriors, cabin walkthroughs, and spec-driven edits cut for brokerage sites, YouTube, and paid promotion to qualified buyers. It's the jet version of the yacht-listing work we've done in marine for years.",
      },
      {
        q: "What kind of content do you produce for private aviation?",
        a: "Cinematic fleet and terminal films, aerial cinematography, interior and detail coverage, brand films, new-model and route-launch campaigns, and always-on social content, all captured in-house at the standard private-aviation buyers expect.",
      },
      {
        q: "How do you reach real charter and jet-card buyers, not just aviation fans?",
        a: "Two ways. Paid campaigns targeted to the income, travel, and ownership signals of real buyers, and owned editorial distribution across our network of 255M+ high-net-worth viewers a year, the same audience that charters jets, buys boats, and stays at luxury resorts.",
      },
      {
        q: "Can you run a new-aircraft or new-route launch end to end?",
        a: "Yes. We build the campaign around a specific moment: an aircraft entering service, a route opening, or a terminal coming online, with cinematic asset capture plus paid, PR, and owned-media distribution, all managed by one team.",
      },
      {
        q: "Is everything done in-house?",
        a: "Yes. Strategy, production, paid media, and PR all run under one roof, by senior people who have spent their careers in premium markets. No outsourcing, no handoffs.",
      },
      {
        q: "Where are you based and who do you serve?",
        a: "We're based in Tampa, Florida and work with private-aviation brands across the United States. Book a discovery call and we'll scope the work to your operation.",
      },
    ],
    cta: {
      eyebrow: "◆ PRIVATE AVIATION",
      headline:
        "Put your aircraft in front of the people who actually charter.",
      body: "Book a discovery call and we'll map the content, the campaigns, and the distribution for your operation.",
      buttonLabel: "Book an aviation discovery call",
      buttonHref: "/contact#book",
    },
  },
  {
    slug: "resorts-travel",
    name: "Resorts + Travel",
    tagline: "Visual storytelling for boutique resorts and luxury travel.",
    description:
      "Editorial-grade content and paid distribution for resorts, vacation rentals, and travel brands serving the top of the market.",
    href: "/verticals/resorts-travel",
    headlines: {
      intro: "What we do in travel.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 2,
    image: "/images/verticals/resorts-travel.jpg",
    imageAlt: "Eye-level view of a Caribbean luxury villa — infinity pool, loungers, dramatic sky",
    intro:
      "The places that get booked are the places that look incredible online. We shoot properties at that standard, run campaigns timed to booking seasons, and put them in front of the people who actually book.",
    introHighlight: "look incredible online",
    audienceSegments: [
      {
        name: "Boutique resorts + villas",
        copy: "Property captures, seasonal campaigns, and direct-booking content programs for resorts and rental portfolios competing on visual and service standard.",
      },
      {
        name: "Travel brands + tour operators",
        copy: "Brand storytelling for the operators selling curated travel. Built around itinerary content, destination editorial, and the lifestyle their guest already lives.",
      },
      {
        name: "Destinations + tourism boards",
        copy: "Campaigns for destinations, built like magazine features.",
      },
    ],
    signaturePlays: [
      {
        title: "Property capture programs",
        copy: "Film and photography on a seasonal schedule, so the content library stays fresh year-round.",
      },
      {
        title: "Seasonal campaigns",
        copy: "Campaigns timed to when guests actually plan their trips.",
      },
      {
        title: "Direct-booking funnels",
        copy: "Paid plus owned-media plus on-property capture, working together to drive bookings through the property's own channels instead of paying OTA commissions.",
      },
    ],
    relatedServiceSlugs: ["studio", "social", "growth"],
  },
  {
    slug: "hospitality-experiences",
    name: "Hospitality + Experiences",
    tagline:
      "Hotels, restaurants, member clubs, and the curated experiences that define them.",
    description:
      "Content and distribution for hospitality brands — boutique hotels, restaurants, private clubs, spas — and the experiential brands building the next generation of premium service.",
    href: "/verticals/hospitality-experiences",
    headlines: {
      intro: "What we do in hospitality.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 2,
    image: "/images/verticals/hospitality-experiences.jpg",
    imageAlt: "Premium event hospitality activation — branded bar setup at a luxury concours",
    intro:
      "We work with hotels, restaurants, member clubs, and spas — daily content, opening and seasonal campaigns, and on-site event coverage.",
    introHighlight: "member clubs",
    audienceSegments: [
      {
        name: "Boutique hotels",
        copy: "Property films, food and drink content, seasonal campaigns, and direct-booking programs.",
      },
      {
        name: "Restaurants + chef-led concepts",
        copy: "Brand systems, food and chef storytelling, opening campaigns, and the ongoing content rhythm that fills covers and supports a concept past its first six months.",
      },
      {
        name: "Member clubs + private spaces",
        copy: "Brand work for the clubs whose discretion is part of the value. Content programs that reflect the membership without compromising it.",
      },
      {
        name: "Activations + experiential brands",
        copy: "Event production, on-site capture, and post-event content. From concours to product launches to client gatherings.",
      },
    ],
    signaturePlays: [
      {
        title: "Opening campaigns",
        copy: "Pre-opening tease through grand-opening coverage, with assets the brand keeps publishing long after.",
      },
      {
        title: "Hospitality content systems",
        copy: "Daily publishing for the property, run by us — no weekly creative briefings needed.",
      },
      {
        title: "Event activations",
        copy: "Strategy, production, and on-site capture — then the event footage becomes months of content.",
      },
    ],
    relatedServiceSlugs: ["studio", "experiences", "social", "growth"],
  },
  {
    slug: "exotic-automotive",
    name: "Exotic Automotive",
    tagline:
      "Launch campaigns and ongoing social for dealers, collectors, and performance brands.",
    description:
      "From new-model launches to ongoing brand presence — cinematic content and audience reach for premium automotive.",
    href: "/verticals/exotic-automotive",
    headlines: {
      intro: "What we do in automotive.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 2,
    image: "/images/verticals/exotic-automotive.jpg",
    imageAlt: "Mercedes G-Wagen Brabus parked on a coastal road",
    intro:
      "We make the films and photography, and we bring the distribution: paid campaigns that reach real buyers, plus placement across our hospitality and aviation rosters, where the same customer lives.",
    introHighlight: "reach real buyers",
    audienceSegments: [
      {
        name: "OEMs + performance brands",
        copy: "Launch campaigns, model storytelling, and ongoing brand presence for the manufacturers and performance houses defining the category.",
      },
      {
        name: "Dealers + retail networks",
        copy: "Branding and content programs for dealerships selling to qualified buyers.",
      },
      {
        name: "Collector ecosystems",
        copy: "Auction houses, restoration shops, and the businesses around significant cars.",
      },
      {
        name: "Aftermarket + service brands",
        copy: "Tuners, customization houses, and premium service brands around the high-end car.",
      },
    ],
    signaturePlays: [
      {
        title: "New-model reveals",
        copy: "Pre-reveal tease, launch film, social campaign, and press coverage — planned to run for months, not one news cycle.",
      },
      {
        title: "Hero film programs",
        copy: "Cinematic capture of single significant cars. The film, the photography, the social cutdowns, and the campaign assets that make a car a brand moment.",
      },
      {
        title: "Cross-category placements",
        copy: "Automotive clients regularly appear in our hospitality and aviation work. A car can headline a member event, anchor a resort campaign, or stage at a private aviation terminal. The verticals collaborate.",
      },
    ],
    relatedServiceSlugs: ["studio", "social", "growth", "experiences"],
  },
  {
    slug: "luxury-goods",
    name: "Luxury Goods",
    tagline:
      "Magazine-grade campaigns for timepieces, fashion, fine spirits, and craftsmanship-led brands.",
    description:
      "When the category demands an editorial sensibility, we deliver work that feels like the magazines your customers already read.",
    href: "/verticals/luxury-goods",
    headlines: {
      intro: "What we do in luxury goods.",
      who: "Who we work with.",
      work: "The plays we run.",
      capabilities: "The services behind it.",
    },
    tier: 2,
    image: "/images/verticals/luxury-goods.jpg",
    imageAlt: "Silver Rolex Day-Date watch on cream backdrop",
    intro:
      "Campaigns for timepieces, fashion, fine spirits, and craftsmanship-led brands — shot and written at the standard of the magazines your customers already read.",
    introHighlight: "craftsmanship-led brands",
    audienceSegments: [
      {
        name: "Timepieces + jewelry",
        copy: "Brand films, product photography, and collection campaigns.",
      },
      {
        name: "Fashion + accessories",
        copy: "Lookbooks, campaigns, and content programs for premium fashion brands.",
      },
      {
        name: "Fine spirits + wine",
        copy: "Branding, retail and trade campaigns, and editorial features for premium spirits and wine.",
      },
      {
        name: "Craftsmanship-led brands",
        copy: "Furniture, leather goods, audio — categories where the product is the brand and the story is the craft.",
      },
    ],
    signaturePlays: [
      {
        title: "Editorial campaigns",
        copy: "Lookbook-grade campaigns with matched art direction, distributed through paid ads and our own channels.",
      },
      {
        title: "Collection launches",
        copy: "Capsule and seasonal collection launches. The film, the photography, the press distribution, and the social activation working as one campaign.",
      },
      {
        title: "Cross-category placement",
        copy: "Luxury goods clients regularly anchor moments in our hospitality, automotive, and aviation work. A watch reveal at a private terminal, a fashion drop at a member club, a spirit anchoring a concours. The verticals collaborate.",
      },
    ],
    relatedServiceSlugs: ["studio", "growth", "social"],
  },
];
