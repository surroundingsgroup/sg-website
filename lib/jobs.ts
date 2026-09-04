/**
 * Open roles — Surroundings Group careers.
 *
 * Job descriptions recovered from the original surroundingsgroup.com
 * careers pages (via archive.org) and rewritten in the current brand
 * voice. To close a role, delete its entry (or comment it out) — the
 * careers page falls back to the "roles are being refreshed"
 * placeholder when this list is empty.
 *
 * Applications flow to interested@surroundingsgroup.com with a
 * prefilled subject line per role.
 */

export interface JobSection {
  heading: string;
  /** Intro paragraph(s) for the section */
  body?: string[];
  /** Bullet list under the section */
  items?: string[];
}

export interface Job {
  slug: string;
  title: string;
  /** Employment type chip */
  type: "Full-time" | "Full-time / Part-time / Contract" | "Project-based" | "Internship";
  location: string;
  /** One-liner for the listing card */
  summary: string;
  /** Full JD sections rendered on the detail page */
  sections: JobSection[];
  /** Optional schedule note rendered near the end of the detail page */
  schedule?: string;
}

export const jobs: Job[] = [
  {
    slug: "business-development-manager",
    title: "Business Development Manager",
    type: "Full-time",
    location: "Tampa, FL",
    summary:
      "Build the pipeline, run the deal, and grow the roster of premium brands we serve.",
    sections: [
      {
        heading: "The role",
        body: [
          "The Business Development Manager builds pipeline, reaches prospective clients, works the deal, and closes it. You own the full arc from first touch to signed engagement, across the premium categories we serve.",
        ],
      },
      {
        heading: "What you'll own",
        items: [
          "Generating new sales opportunities through CRM, calls, email, and social outreach",
          "Identifying what a prospect actually needs and matching the right services to it",
          "Proactively sourcing new business opportunities in our markets",
          "Working clients through the decision process, handling objections, and finalizing agreements",
          "A quarterly and annual quota you're accountable to",
          "Weekly, monthly, and quarterly reporting on results",
        ],
      },
      {
        heading: "What you bring",
        items: [
          "2+ years of business development experience with a track record of exceeding targets",
          "Strong communication over phone and email",
          "A creative problem-solving approach backed by real analytical skills",
          "The drive to move up within a sales organization",
          "Impeccable timeline management and follow-through",
          "A personality that meshes with the Surroundings Group team",
        ],
      },
    ],
    schedule:
      "Full-time, minimum 40 hours per week, Monday to Friday during 9:30am–5pm ET business hours, based at our Tampa, FL studio. Open to occasional weekends and travel.",
  },
  {
    slug: "sales-development-representative",
    title: "Sales Development Representative",
    type: "Full-time",
    location: "Tampa, FL",
    summary:
      "Open doors. Source, qualify, and tee up the conversations that become engagements.",
    sections: [
      {
        heading: "The role",
        body: [
          "The Sales Development Representative is the front of the pipeline. You research the premium categories we serve, find the brands worth talking to, start the conversation, and qualify the opportunity before handing it to the Business Development Manager to close.",
        ],
      },
      {
        heading: "What you'll own",
        items: [
          "Prospect research and lead generation across our target categories",
          "Outbound outreach through email, calls, and social channels",
          "Qualifying inbound and outbound opportunities against real fit criteria",
          "Booking discovery conversations and keeping the pipeline organized in the CRM",
          "Reporting on outreach activity and conversion results",
        ],
      },
      {
        heading: "What you bring",
        items: [
          "1+ years in an outbound sales or SDR role, or the drive and communication skills to earn the seat",
          "Comfort starting conversations with senior decision-makers",
          "Organization that keeps a high-volume pipeline clean",
          "Interest in the premium categories we serve and how they buy",
          "The ambition to grow into a closing role",
        ],
      },
    ],
    schedule:
      "Full-time, minimum 40 hours per week, Monday to Friday during 9:30am–5pm ET business hours, based at our Tampa, FL studio.",
  },
  {
    slug: "photographer-videographer",
    title: "Photographer / Videographer",
    type: "Full-time",
    location: "Tampa, FL (in-office or flexible)",
    summary:
      "Shoot and cut premium work, from social reels to short films, across the categories we serve.",
    sections: [
      {
        heading: "The role",
        body: [
          "Photographer / Videographers create the work our clients hire us for: concepting, shooting, and editing everything from short-form social reels to short films and lifestyle projects. The work runs on location across the categories we serve, at the standard those categories expect.",
        ],
      },
      {
        heading: "What you'll own",
        items: [
          "Concepting, shooting, and editing projects from social reels to short films",
          "Turning branded content into a volume of social-ready assets",
          "Collaborating with our creative and marketing teams against client brand guidelines",
          "Rapid turnarounds, trending moments, and clear, proactive communication with the team",
          "Delivering content that works natively across every major social platform",
        ],
      },
      {
        heading: "Gear and technical requirements",
        items: [
          "Full-frame camera, 4K capable",
          "Gimbal (DJI RS3 / RS2 or comparable)",
          "Wide-angle fixed-aperture lens (16–35mm or comparable) and normal-range fixed-aperture lens (24–70mm)",
          "Wireless lav mic or audio recorder (Rode Wireless GO 2 / DJI Mic) plus on-camera shotgun mic",
          "Drone (Mavic 3 / Air 2S or newer) with ND filters and the ability to fly it safely and legally",
          "Advanced Premiere Pro and Photoshop skills for edit and post",
        ],
      },
      {
        heading: "What you bring",
        items: [
          "A strong artistic eye and the ability to visualize and capture compelling frames",
          "Deep technical fluency with cameras, lenses, gimbals, filters, and lighting",
          "Proven post-production skills and a portfolio that shows them",
          "Reliability on set and in delivery timelines",
        ],
      },
    ],
    schedule:
      "Full-time, Monday to Friday during 9:30am–5pm ET business hours. In-office at our Tampa, FL studio or flexible, with on-location shoot days as projects require.",
  },
  {
    slug: "email-marketing-specialist",
    title: "Email Marketing Specialist",
    type: "Full-time / Part-time / Contract",
    location: "Tampa, FL (in-office or flexible)",
    summary:
      "Own the email channel: strategy, automation, segmentation, and reporting across premium accounts.",
    sections: [
      {
        heading: "The role",
        body: [
          "You own the email marketing channel across assigned accounts and internal brands: strategy, setup, execution, automation, optimization, and reporting. The job is building a smarter communication engine for premium brands, not just sending campaigns.",
          "You work closely with the Account Manager on each account, bringing larger campaign goals to life through email, with occasional client-facing involvement on strategy and performance.",
        ],
      },
      {
        heading: "What you'll own",
        items: [
          "Email campaigns from setup through send: calendars, launches, recurring sends, and strategic communications",
          "Copy, messaging flow, and campaign structure matched to each brand's goals",
          "Automations, nurture flows, drip sequences, and customer journey campaigns",
          "Audience segmentation by behavior, source, objective, and funnel stage",
          "Testing across subject lines, send times, messaging angles, and structure",
          "Reporting on opens, clicks, conversions, and campaign KPIs with clear recommendations",
        ],
      },
      {
        heading: "What you bring",
        items: [
          "Hands-on experience with a modern email platform (Klaviyo, HubSpot, Mailchimp, or comparable)",
          "Copy instincts that match a premium brand's voice",
          "An analytical mindset that treats every send as a test",
          "Collaborative ownership: you run the channel, and you keep the account team in the loop",
        ],
      },
    ],
  },
  {
    slug: "paid-media-specialist",
    title: "Paid Media Specialist",
    type: "Full-time / Part-time / Contract",
    location: "Tampa, FL (in-office or flexible)",
    summary:
      "Own paid across Meta, Google, YouTube, and LinkedIn, from build to optimization to reporting.",
    sections: [
      {
        heading: "The role",
        body: [
          "You own the paid media channel across assigned accounts and internal brands: campaign setup, platform execution, optimization, performance reporting, and ongoing recommendations. The job is turning paid media into a true growth lever through strong strategy and hands-on platform management.",
        ],
      },
      {
        heading: "What you'll own",
        items: [
          "Building, launching, and managing campaigns across Meta, Google, YouTube, LinkedIn, and other relevant platforms",
          "Targeting, audience strategy, budget allocation, retargeting, and conversion setup",
          "Live optimization: budget pacing, audience refinement, creative rotation, and bid strategy",
          "Testing across messaging, formats, placements, audiences, and objectives",
          "Tracking CTR, CPC, CPL, ROAS, conversions, and lead quality per campaign",
          "Clear reporting with actionable calls on what to scale, refine, or rework",
        ],
      },
      {
        heading: "What you bring",
        items: [
          "Proven hands-on management of paid campaigns with real budgets",
          "Fluency in the Meta and Google ad platforms; LinkedIn and YouTube a plus",
          "Performance thinking blended with strong creative instincts",
          "The discipline to own a channel end to end, from launch through reporting",
        ],
      },
    ],
  },
  {
    slug: "pr-brand-communications-specialist",
    title: "PR + Brand Communications Specialist",
    type: "Full-time / Part-time / Contract",
    location: "Tampa, FL (in-office or flexible)",
    summary:
      "Own the PR lane: messaging, earned media, partnerships, and the visibility premium brands need.",
    sections: [
      {
        heading: "The role",
        body: [
          "You own PR and communications across assigned accounts and internal brands: messaging, outreach, visibility opportunities, partnerships, and reporting. The job is helping brands show up more clearly, more credibly, and more strategically in their markets.",
        ],
      },
      {
        heading: "What you'll own",
        items: [
          "PR and communications efforts from concept through execution and reporting",
          "Press releases, pitches, talking points, and announcement materials",
          "Messaging around launches, activations, milestones, and key brand moments",
          "Earned media, interviews, features, and industry visibility opportunities",
          "Relationships with media contacts, editors, and publishers",
          "Brand-aligned partnerships and collaboration opportunities that expand credibility",
        ],
      },
      {
        heading: "What you bring",
        items: [
          "Real experience in PR, communications, media relations, or brand visibility strategy",
          "Writing that reads polished, relevant, and on-brand every time",
          "A current sense of what is timely and resonating in media today",
          "Ownership of a lane, connected to larger brand growth goals rather than standalone tasks",
        ],
      },
    ],
  },
  {
    slug: "social-media-coordinator",
    title: "Social Media Coordinator",
    type: "Full-time",
    location: "Tampa, FL",
    summary:
      "Run daily community across Instagram, TikTok, Facebook, and LinkedIn for premium brands.",
    sections: [
      {
        heading: "The role",
        body: [
          "The Social Media Coordinator creates content calendars, engages with audiences, tracks leads, and manages direct messages, all while analyzing metrics and account health across the brands we run.",
        ],
      },
      {
        heading: "What you'll own",
        items: [
          "Growing and managing communities on Instagram, TikTok, Facebook, and LinkedIn",
          "Monitoring brand channels and relevant conversations for the highest-impact places to engage",
          "Active listening across every follower interaction: comments, responses, and DMs",
          "Analyzing brand and cultural trends, and bringing real subculture insight",
          "Creating on social daily, with platform-native content across formats",
          "Daily digests of observations and recommendations, not just tracking",
          "Proper escalation for negative feedback, and proactive brand insertion into relevant conversations",
        ],
      },
      {
        heading: "What you bring",
        items: [
          "2+ years managing and growing social communities",
          "Experience growing Instagram, TikTok, YouTube, and other channels",
          "Creativity and analytics combined into stories a client can act on",
          "Proficiency with Adobe Creative Suite, Canva, and mobile creator tools",
          "Recent content examples from accounts you've run (we'll ask)",
          "A personality that meshes with the Surroundings Group team",
        ],
      },
    ],
    schedule:
      "Full-time, minimum 40 hours per week, Monday to Friday during 9:30am–5pm ET business hours, based at our Tampa, FL studio.",
  },
  {
    slug: "intern-business-development",
    title: "Intern, Business Development",
    type: "Internship",
    location: "Tampa, FL (in-office or flexible)",
    summary:
      "Real reps in prospecting, lead research, and pipeline building inside a fast-moving agency.",
    sections: [
      {
        heading: "The role",
        body: [
          "You'll get hands-on exposure to how business development works inside a fast-moving agency and media ecosystem: prospecting, lead research, outreach preparation, opportunity tracking, and growth strategy. You contribute to live workflows and real business development efforts, not shadow work.",
        ],
      },
      {
        heading: "What you'll work on",
        items: [
          "Prospect research and lead generation across our target categories",
          "Building and organizing lead lists and opportunity pipelines",
          "Outreach preparation, market research, and business development initiatives",
          "Identifying strong-fit brands, companies, and partnership opportunities",
          "Learning how SG and Nautical Network position themselves in premium markets",
        ],
      },
      {
        heading: "Who fits",
        items: [
          "Interested in sales, partnerships, marketing, media, or business growth",
          "A strong communicator with professionalism and initiative",
          "Organized, curious, and eager to learn",
          "Excited by the premium categories we work in: marine, real estate, hospitality, aviation, and beyond",
        ],
      },
    ],
  },
  {
    slug: "intern-social-media",
    title: "Intern, Social Media",
    type: "Internship",
    location: "Tampa, FL (in-office or flexible)",
    summary:
      "Hands-on social strategy, trend research, and content planning across real brands.",
    sections: [
      {
        heading: "The role",
        body: [
          "You'll support social strategy, content planning, research, captioning, platform organization, and execution across client and internal brands. This is for someone highly tuned in to what's relevant online who wants real agency exposure to how content, audience behavior, and platform strategy come together.",
        ],
      },
      {
        heading: "What you'll work on",
        items: [
          "Content planning, trend research, and social calendar organization",
          "Caption writing, platform research, and competitive reviews",
          "Organizing social assets and execution workflows",
          "Staying current on platform trends and what content is performing right now",
          "Learning how brands show up strategically and consistently across platforms",
        ],
      },
      {
        heading: "Who fits",
        items: [
          "Fluent in Instagram, TikTok, YouTube, and social culture",
          "Good instincts for what's relevant, engaging, and working today",
          "Organized, creative, and detail-oriented",
          "Excited to contribute in a fast-paced, high-standard environment",
        ],
      },
    ],
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
