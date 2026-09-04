/**
 * Six service areas — Surroundings Group.
 * One-word names. Source of truth for homepage grid + individual service pages.
 *
 * Data shape extended (2026-05-29) with rich detail-page fields:
 *   - intro            : richer positioning paragraph for the detail page
 *   - sampleDeliverables: concrete examples of typical deliverables
 *   - bestForCopy      : a short paragraph on who this is best for
 *   - processSteps[]   : service-specific four-step process
 *
 * Copy refreshed (2026-06-10) from the original surroundingsgroup.com
 * service pages (contentcreation, socialmediamanagement, webservices,
 * paidadvertising) per Billy's direction.
 */

export interface ProcessStep {
  title: string;
  copy: string;
}

export interface Service {
  slug: string;
  /** One-word service name */
  name: string;
  /** Confident one-line positioning statement */
  tagline: string;
  /** Longer description for cards + landing pages */
  description: string;
  /** What's included — used on service detail pages */
  capabilities: string[];
  href: string;
  /** Rich positioning paragraph for the detail page */
  intro: string;
  /** Concrete examples of typical deliverables under this service */
  sampleDeliverables: string[];
  /** Short paragraph on the best-fit client for this service */
  bestForCopy: string;
  /** Service-specific four-step process (not generic) */
  processSteps: ProcessStep[];
  /** Per-page section headlines so detail pages read authored, not templated */
  headlines: {
    intro: string;
    capabilities: string;
    deliverables: string;
    process: string;
    apply: string;
  };
  /** Portfolio banner image on the detail page — links to /work */
  portfolioImage?: string;
  portfolioAlt?: string;
  /** Homepage editorial-band image (separate from the portfolio
   *  banner so the homepage uses a uniform still-life set and the
   *  detail pages keep their real portfolio shots). */
  cardImage?: string;
  cardAlt?: string;
  /** Curated workCollection slugs shown in the "Recent work" gallery
   *  on the service detail page. Order matters. Use 3 collections
   *  per service for a clean 3-column grid. */
  featuredWorkSlugs?: string[];
}

export const services: Service[] = [
  {
    slug: "studio",
    name: "Production",
    tagline: "Premium production for brands that demand it.",
    description:
      "In-house creative production built for premium markets: from cinematic brand films to listing videos, aerial coverage, and editorial photography. Every frame matches the standard of the brands we serve.",
    capabilities: [
      "Brand story films + lifestyle video",
      "Reels + short-form social video",
      "Listing + walkthrough videos: property, aircraft, yacht",
      "Location highlight films",
      "Aerial + drone production",
      "Editorial, product + headshot photography",
      "Post-production + color",
    ],
    href: "/services/studio",
    headlines: {
      intro: "Where the work gets made.",
      capabilities: "From concept to color grade.",
      deliverables: "What a Studio engagement produces.",
      process: "From treatment to delivery in four moves.",
      apply: "Production tuned to every category we serve.",
    },
    intro:
      "Our full production team is in-house: directors, cinematographers, photographers, drone operators, and editors, all under one roof. That means fast turnarounds and one standard of quality. And everything we shoot can also run across our own media network, not just your channels.",
    sampleDeliverables: [
      "Cinematic brand story films",
      "Monthly reel and short-form video program for social",
      "Listing and walkthrough video for a property, aircraft, or yacht",
      "Location highlight film: a charter destination, a private terminal, a flagship address",
      "Lifestyle photo set that puts your clients center stage",
      "Editorial-grade product shoot or professional headshot day",
    ],
    bestForCopy:
      "For brands whose photos and films need to look like the top of their category. If the work needs to feel like a magazine cover or a film, this is the team that makes it.",
    processSteps: [
      {
        title: "Pre-production",
        copy: "Concept, treatment, locations, talent, scheduling. We pre-plan to a level that lets the shoot run at the standard the work requires.",
      },
      {
        title: "Production",
        copy: "Our team on set. Director, cinematography, photo, drone, art direction. We don't sub-contract the shoot to a freelance network and stand back.",
      },
      {
        title: "Post-production",
        copy: "Edit, color, sound, finishing. The post pipeline is owned by the same team that shot it, so the work that arrives matches the work that was planned.",
      },
      {
        title: "Distribution",
        copy: "Hero assets, social cutdowns, paid variants, OOH cuts. The shoot becomes a campaign system, not a single film looking for a home.",
      },
    ],
    portfolioImage: "/images/work/skyfall/skyfall-01.jpg",
    portfolioAlt: "Superyacht Skyfall underway at dusk beneath pastel pink clouds",
    cardImage: "/images/services/studio.jpg",
    cardAlt: "Premium camera lens optical element catching warm golden light",
    featuredWorkSlugs: ["skyfall", "flexjet", "tranquility-estate"],
  },
  {
    slug: "social",
    name: "Social Media",
    tagline: "Where premium brands live online.",
    description:
      "Full-service social presence management (strategy, content, community, and growth) executed by a team that understands how premium audiences engage, share, and buy.",
    capabilities: [
      "Multi-platform management + platform expertise",
      "Content calendar + consistent publishing",
      "Community engagement + comment-section presence",
      "Message management + DM response",
      "Influencer + creator collaboration",
      "Editorial publishing across owned channels",
      "Strategy + analytical reporting",
    ],
    href: "/services/social",
    headlines: {
      intro: "The most-used room in a premium brand.",
      capabilities: "Everything a daily presence demands.",
      deliverables: "What lands in your calendar.",
      process: "How an account becomes a category leader.",
      apply: "Presence built for the audience each category keeps.",
    },
    intro:
      "We run social as a full discipline: strategy, daily publishing, community management, paid boosts, and reporting. We answer the comments and DMs, because that's where an audience becomes loyal. And the team running your accounts is the same team publishing our own channels every day.",
    sampleDeliverables: [
      "Monthly content calendar across Instagram, TikTok, LinkedIn, and Pinterest",
      "Community management, comment engagement, and DM response",
      "Influencer and creator partnerships matched to the brand",
      "Cross-platform content adaptation from a single capture",
      "Monthly analytical reporting against the metrics that matter",
      "Editorial amplification across our owned media channels",
    ],
    bestForCopy:
      "For brands that treat their feeds as part of the product and want their accounts to set the bar in their category.",
    processSteps: [
      {
        title: "Audit + strategy",
        copy: "Where the brand stands today, where the category lives online, and what the path to leadership looks like. Specific to the audience and the platforms that matter most.",
      },
      {
        title: "Content system",
        copy: "Pillars, formats, voice, and the cadence that makes the calendar runnable. Built so the brand can show up consistently without consuming the operator's calendar.",
      },
      {
        title: "Daily operation",
        copy: "Publishing, community, DM response, listening, and creator partnerships. Run by the same senior team that planned it.",
      },
      {
        title: "Growth + report",
        copy: "Monthly reporting against the audience and outcomes we agreed on, plus the iteration that keeps the program improving past month three.",
      },
    ],
    portfolioImage: "/images/work/sparkman-wharf/sparkman-wharf-01.jpg",
    portfolioAlt: "Aerial of Sparkman Wharf lawn and marina against Tampa skyline",
    cardImage: "/images/services/social.jpg",
    cardAlt: "Premium smartphone with reflective black glass screen on dark slate",
    featuredWorkSlugs: ["aquanova", "cora-residences", "gg-timepieces"],
  },
  {
    slug: "digital",
    name: "Websites",
    tagline: "Designed, built, and managed. Worthy of the brands behind them.",
    description:
      "Strategy, design, build, and ongoing care for digital properties that convert as well as they look. Mobile-first, performance-obsessed, and tailored to the conventions of your category.",
    capabilities: [
      "Website strategy + UX",
      "Custom design + development",
      "Maintenance + ongoing revisions",
      "Proactive platform + security updates",
      "Hosting environment management + monitoring",
      "SEO + conversion optimization",
    ],
    href: "/services/digital",
    headlines: {
      intro: "The most-used brand surface there is.",
      capabilities: "Strategy, build, and long-term care.",
      deliverables: "What we design, build, and run.",
      process: "From sitemap to go-live and beyond.",
      apply: "Sites shaped by the conventions of each category.",
    },
    intro:
      "Your online presence is more than a website. It's a dynamic representation of the brand, and often the most-used brand surface there is. We design and build for the premium end of every category we serve, which means we know how a luxury developer's site should feel different from a private aviation operator's, and both should feel different from a watchmaker's. A site is also organic. It changes as the business and its customers evolve, so we stay on as partners: maintenance, revisions, proactive security updates, and a hosting environment that's monitored, not just rented.",
    sampleDeliverables: [
      "Full website strategy, design, build, and Go Live for a flagship launch",
      "Listing or portfolio system for a brokerage or design firm",
      "Conversion-optimized landing pages for paid campaigns",
      "Content management system builds and new application development",
      "Ongoing maintenance, revision, and platform-update program",
      "Hosting environment management with proactive monitoring",
    ],
    bestForCopy:
      "For brands whose current site is the weak point: buyers landing and bouncing, a design that hasn't been touched in years, or a brand that's evolved past its website.",
    processSteps: [
      {
        title: "Strategy + sitemap",
        copy: "Who the site is for, what it needs to do, and the architecture that gets there. Built around the real conversion paths a premium buyer takes.",
      },
      {
        title: "Design",
        copy: "Brand-aligned, mobile-first, performance-conscious. The visual system extends the brand work, it doesn't reinterpret it.",
      },
      {
        title: "Build + go live",
        copy: "Webflow, WordPress, or custom Next.js depending on what the client actually needs. We build to the standard the brand requires, then run a seamless launch.",
      },
      {
        title: "Care + optimize",
        copy: "Hosting, maintenance, security, SEO, and the conversion work that keeps the site improving past launch. Partners for the long term, not a handoff.",
      },
    ],
    portfolioImage: "/images/work/cora-residences/cora-residences-02.jpg",
    portfolioAlt: "Drone view of Tampa waterfront district towers and marina at dusk",
    cardImage: "/images/services/digital.jpg",
    cardAlt: "Minimalist closed laptop edge profile catching warm light on a walnut desk",
    featuredWorkSlugs: ["sparkman-wharf", "cora-residences", "selected-works"],
  },
  {
    slug: "growth",
    name: "Paid Media + PR",
    tagline: "Paid ads, PR, and email that fill the pipeline.",
    description:
      "Paid advertising, public relations, email, influencers, and owned-media distribution working together as one acquisition engine. Built to reach the audiences that matter, and convert them.",
    capabilities: [
      "Paid media: Google Search + Display, YouTube, Meta",
      "Website retargeting",
      "Keyword + competitor research",
      "Landing page creation + ad creative",
      "Public relations + press placement",
      "Email marketing + lifecycle automation",
      "Influencer partnerships",
      "Owned media + niche branded outlets",
    ],
    href: "/services/growth",
    headlines: {
      intro: "One acquisition engine, not six retainers.",
      capabilities: "Every channel that builds demand.",
      deliverables: "What a Growth program includes.",
      process: "How demand compounds quarter over quarter.",
      apply: "Demand programs fluent in every category we serve.",
    },
    intro:
      "We run paid ads, PR, email, and influencers as one connected program with one accountable team. Campaigns are built on real keyword and competitor research and pointed at landing pages built to convert. And because we own our own media channels, your spend gets amplified by reach we don't have to buy.",
    sampleDeliverables: [
      "Paid program across Google Search + Display, Meta, and YouTube for a launch",
      "Retargeting campaigns that re-engage site visitors and social audiences",
      "PR campaign tied to a new-model release or grand opening",
      "Email and lifecycle programs connected to your CRM and marketing stack: HubSpot, Klaviyo, Salesforce, and more",
      "Influencer and creator program matched to the brand's category",
      "Owned-media and branded-outlet distribution across our editorial network",
    ],
    bestForCopy:
      "For brands ready to grow that are tired of juggling separate vendors for ads, PR, and email.",
    processSteps: [
      {
        title: "Audience + funnel",
        copy: "Who actually buys at this end of the market, what the path to purchase looks like, and where the current funnel breaks. Built on keyword, competitor, and audience research.",
      },
      {
        title: "Channel system",
        copy: "Paid, PR, email, influencers, and owned media designed as one connected engine. Each channel knows what the others are doing and the work compounds.",
      },
      {
        title: "Launch + operate",
        copy: "We run the program, optimize live, and adjust against what the data shows. Real ownership of the outcome, not a monthly report that lobs back to a client meeting.",
      },
      {
        title: "Compound",
        copy: "Premium growth is a quarter-over-quarter game. Audience compounds, owned media compounds, retention compounds. We build for that math, not the campaign-burst math.",
      },
    ],
    portfolioImage: "/images/work/los-suenos/los-suenos-01.jpg",
    portfolioAlt: "Sunrise aerial of Los Suenos marina, jungle hillside, and Pacific coastline",
    cardImage: "/images/services/growth.jpg",
    cardAlt: "Polished brass compass on a dark walnut desk at golden hour",
    featuredWorkSlugs: ["los-suenos", "selected-works", "sparkman-wharf"],
  },
  {
    slug: "experiences",
    name: "Events",
    tagline: "Moments that become marketing.",
    description:
      "Strategy, production, and on-site activation for premium brand experiences: from boat shows to property launches to private client gatherings. We plan it, market it, capture it, and amplify it.",
    capabilities: [
      "Event strategy + production",
      "Pre-event marketing",
      "On-site capture + live publishing",
      "Trade show + exhibitor support",
      "Member and client gathering production",
      "Post-event content + recaps",
    ],
    href: "/services/experiences",
    headlines: {
      intro: "Moments designed to outlive the night.",
      capabilities: "From concept to capture to recap.",
      deliverables: "What we plan, produce, and publish.",
      process: "How one night becomes a year of content.",
      apply: "Events staged inside the categories we know.",
    },
    intro:
      "Experiences are the brand work that happens off-screen. Openings, launches, boat shows, concours, member dinners, and the activations that turn a brand moment into a year of content. We treat events as both the marketing and the source material. The way we run them is as much about the content that follows as the night itself.",
    sampleDeliverables: [
      "Grand-opening event for a property or restaurant",
      "Branded activation at a major industry show (boat, concours, design week)",
      "Multi-stop private client tours and previews",
      "Member dinner and gathering production",
      "On-site capture and same-week edit packages",
      "Post-event content programs that extend the brand moment",
    ],
    bestForCopy:
      "For openings, launches, and client gatherings that matter enough to do properly, and worth capturing on camera.",
    processSteps: [
      {
        title: "Concept + brief",
        copy: "What the moment needs to do for the brand, who it's for, and what the experience has to feel like. Built around the audience, not the venue.",
      },
      {
        title: "Production",
        copy: "Logistics, vendors, talent, build, run-of-show. We handle the experience itself, not just the marketing around it.",
      },
      {
        title: "Live capture",
        copy: "Our studio team on-site capturing as the event runs, so the brand has hero assets from the moment it ends. No waiting on a third-party recap reel.",
      },
      {
        title: "Amplify",
        copy: "The event becomes months of content across paid, social, owned media, and PR. The night was the source, the content is the compounding return.",
      },
    ],
    portfolioImage: "/images/work/selected-works/selected-works-04.jpg",
    portfolioAlt: "Yellow Bentley Bacalar roadster displayed beside Flexjet event tower",
    cardImage: "/images/services/experiences.jpg",
    cardAlt: "Crystal champagne flutes and lit taper candles on a private event table",
    featuredWorkSlugs: ["sparkman-wharf", "flexjet", "selected-works"],
  },
  {
    slug: "intelligence",
    name: "AI + Automation",
    tagline: "Custom AI agents, automations, and dashboards for your operation.",
    description:
      "Custom AI and workflow automation engineered for marketing operations, sales pipelines, and client deliverables. Built by an agency that builds its own software, not one that just talks about AI.",
    capabilities: [
      "Marketing + sales automation",
      "Custom AI agents + workflows",
      "CRM integration + lead routing",
      "Chatbots + conversational systems",
      "Internal tools + dashboards",
      "Data pipelines + reporting infrastructure",
    ],
    href: "/services/intelligence",
    headlines: {
      intro: "The systems behind the studio.",
      capabilities: "Automation, agents, and infrastructure.",
      deliverables: "What we build and operate.",
      process: "From audit to automation in four phases.",
      apply: "Systems built around each category's stack.",
    },
    intro:
      "Custom AI agents, workflow automation, and integrations that tie your existing tools into one system. We build these for our own operation first, then build the same for clients.",
    sampleDeliverables: [
      "Custom AI agent for brand-aligned content briefing",
      "Lead routing and qualification workflow across HubSpot, Salesforce, or custom CRM",
      "Marketing operations automation across email, paid, and reporting tools",
      "Conversational chatbot trained on the brand's product, voice, and FAQ library",
      "Internal dashboard surfacing campaign and sales metrics from disparate sources",
      "Data pipeline and reporting infrastructure for ongoing program work",
    ],
    bestForCopy:
      "For teams that have outgrown spreadsheets: data copy-pasted between tools, leads slipping through cracks, briefs lost in Slack. We build the system that fixes it.",
    processSteps: [
      {
        title: "Map + audit",
        copy: "Every tool, every data source, every manual handoff. We map the actual operation as it runs today, not the diagram on the org chart.",
      },
      {
        title: "Design",
        copy: "What the future-state workflow looks like, what gets automated, what stays human, and which AI components actually move the needle.",
      },
      {
        title: "Build",
        copy: "Custom integrations, agents, and tools. We build with the same standard our studio applies to creative: delivered, documented, and accountable.",
      },
      {
        title: "Operate",
        copy: "Once the system is live, we run it alongside the brand's team. Monitoring, iteration, and the ongoing work that keeps an automation system actually working.",
      },
    ],
    portfolioImage: "/images/work/flexjet/flexjet-01.jpg",
    portfolioAlt: "Sikorsky helicopter and private jet on hangar ramp at golden hour",
    cardImage: "/images/services/intelligence.jpg",
    cardAlt: "Brass magnifying glass on a dark slate surface in warm light",
    featuredWorkSlugs: ["cora-residences", "selected-works", "flexjet"],
  },
];
