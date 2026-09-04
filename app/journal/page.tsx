import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { featuredProjects, journalTypeLabel } from "@/lib/featured-work";

export const metadata: Metadata = {
  alternates: { canonical: "/journal" },
  title: "The Studio Journal",
  description:
    "Case studies, behind-the-scenes, client updates, and studio news from Surroundings Group, a premium creative agency for luxury brands.",
};

/** Editorial categories shown on the journal hub. */
const categories: {
  label: string;
  description: string;
  href: string;
}[] = [
  {
    label: "Case Studies",
    description:
      "Long-form looks at finished engagements: what we set out to do, what we made, what it produced.",
    href: "/journal",
  },
  {
    label: "Behind the Scenes",
    description:
      "Set diaries, location intel, technique posts, and the in-house craft conversations behind the work.",
    href: "/journal",
  },
  {
    label: "Client Updates",
    description:
      "Wins from active engagements: listings closed, occupancy hit, campaigns launched, audiences grown.",
    href: "/journal",
  },
  {
    label: "Studio News",
    description:
      "New hires, awards, launches, and the operational moments that shape the studio's trajectory.",
    href: "/journal",
  },
];

export default function JournalPage() {
  // We currently have one published entry — the Nautical Network case
  // study. As more land, the grid below adapts (1 → 2 → 3+ layouts).
  const featured = featuredProjects[0];
  const rest = featuredProjects.slice(1);

  return (
    <>
      <Nav />

      <PageHero
        eyebrow="THE STUDIO JOURNAL"
        title="Inside the studio."
        subhead="Case studies, behind-the-scenes, client updates, and studio news. Where the work and the story behind it live."
      />

      {/* Editorial positioning — why the journal exists */}
      <section className="bg-canvas px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="caption text-neutral-500 mb-5">◆ EDITORIAL FIRST</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance">
              Built like a magazine, not a blog.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg lg:text-xl text-ink leading-snug font-medium text-balance">
              The studio journal is where the work, the people, and the
              point of view all live in one place, at the editorial
              standard the categories we serve actually expect.
            </p>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
              We treat the journal like a property, not a publishing
              chore. Long-form case studies sit next to set diaries.
              Client wins land next to the operational moments behind
              them. Every entry doubles as a working artifact for our
              clients and a recruiting surface for the next hire.
            </p>
          </div>
        </div>
      </section>

      {/* Featured entry — magazine-cover treatment for the lead piece */}
      {featured && (
        <section className="bg-canvas pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <p className="caption text-neutral-500 mb-6">◆ FEATURED ENTRY</p>
            <Link
              href={featured.href}
              className="group block relative overflow-hidden bg-ink text-canvas"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[500px]">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={
                        featured.imageAlt ??
                        `${featured.client} · ${featured.vertical}`
                      }
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      quality={80}
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                      <span className="font-sans font-extrabold text-3xl text-canvas/20">
                        {featured.client}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="absolute top-0 right-0 w-20 h-px bg-gold"
                  />
                </div>
                <div className="lg:col-span-5 p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                  <p className="caption text-gold mb-4">
                    {journalTypeLabel(featured.type)}
                  </p>
                  <div className="caption text-canvas/50 mb-5 flex items-center gap-3 flex-wrap">
                    <span>{featured.vertical}</span>
                    {featured.tag && (
                      <>
                        <span className="opacity-50">·</span>
                        <span>{featured.tag}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-6 text-balance group-hover:text-gold transition-colors duration-300">
                    {featured.client}
                  </h2>
                  <p className="text-base lg:text-lg text-canvas/85 leading-relaxed mb-8">
                    {featured.headline}
                  </p>
                  <span className="caption inline-flex items-center gap-3 text-canvas group-hover:text-gold transition-colors duration-300">
                    Read the full entry
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Additional entries — only renders when more than one is live */}
      {rest.length > 0 && (
        <section className="bg-canvas pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <p className="caption text-neutral-500 mb-6">◆ MORE FROM THE STUDIO</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rest.map((entry) => (
                <li key={entry.slug}>
                  <Link href={entry.href} className="group block h-full">
                    <article className="relative h-full bg-ink text-canvas p-8 lg:p-10 flex flex-col transition-colors duration-500 group-hover:bg-neutral-800 min-h-[360px]">
                      <p className="caption text-gold mb-6">
                        {journalTypeLabel(entry.type)}
                      </p>
                      <div className="caption text-canvas/50 mb-3 flex items-center gap-3 flex-wrap">
                        <span>{entry.vertical}</span>
                        {entry.tag && (
                          <>
                            <span className="opacity-50">·</span>
                            <span>{entry.tag}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-tight mb-4 text-balance group-hover:text-gold transition-colors duration-300">
                        {entry.client}
                      </h3>
                      <p className="text-base text-canvas/75 leading-snug mb-6 flex-1">
                        {entry.headline}
                      </p>
                      <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
                        Read entry
                      </span>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Editorial categories — preview what the journal covers */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-5 tracking-[0.28em]">
              ◆ WHAT&apos;S COMING
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-canvas text-balance">
              Four lanes. One editorial standard.
            </h2>
            <p className="text-base lg:text-lg text-canvas/70 mt-6 max-w-2xl leading-relaxed">
              As engagements wrap and the studio crosses milestones, the
              journal grows in these directions. Subscribe via Nautical
              Network or hit us up for early reads.
            </p>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {categories.map((c) => (
              <li
                key={c.label}
                className="border-t border-canvas/15 pt-6 lg:pt-8"
              >
                <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-canvas leading-tight mb-4 tracking-tight">
                  {c.label}
                </h3>
                <p className="text-sm lg:text-base text-canvas/75 leading-relaxed">
                  {c.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cross-reference — Nautical Network is the broader editorial home */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="caption text-neutral-500 mb-5 tracking-[0.28em]">
            ◆ ALSO PUBLISHING
          </p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-ink mb-6 text-balance">
            For the marine category, the editorial lives at Nautical Network.
          </h2>
          <p className="text-base lg:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed mb-10">
            Eight branded channels reaching 180M+ marine viewers a year.
            Daily publishing across Instagram, TikTok, YouTube, and the
            broader social ecosystem. The closest thing to a magazine cover
            premium marine has.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.nautical.network"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300 inline-flex items-center gap-2"
            >
              Visit Nautical Network
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </a>
            <Link
              href="/contact"
              className="border border-ink/40 text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-ink hover:text-canvas hover:border-ink transition-colors duration-300"
            >
              Pitch a story or contribute
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
