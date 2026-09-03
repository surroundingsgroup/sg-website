import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { WorkGrid } from "@/components/work-grid";
import { getAllProjects } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work",
  description:
    "Selected work from Surroundings Group — superyacht charter campaigns, estate and residential shoots, private aviation, resorts, hospitality, and luxury goods.",
};

export default async function WorkIndexPage() {
  const collections = await getAllProjects();
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="THE PORTFOLIO"
        title="Work that speaks for itself."
        subhead="Selected collections across marine, real estate, aviation, hospitality, and the categories around them. Shot, cut, and delivered by our in-house team."
      />

      {/* Editorial approach — sets the standard before the visitor scans the grid */}
      <section className="bg-canvas px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="caption text-neutral-500 mb-5">◆ THE APPROACH</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance">
              Work that earns the attention it gets.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg lg:text-xl text-ink leading-snug font-medium text-balance">
              Every project starts with a category we know inside out. We make
              work at the standard the category requires, then run it through
              the distribution network we built.
            </p>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
              No outsourced production. No off-the-shelf templates. No
              agency-of-record handoffs. The people on the pitch are the
              people running the work, executing in-house from concept to
              delivery, and the same team running it through our owned media
              channels when distribution is part of the engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Full-bleed editorial moment — sets the visual standard */}
      <section className="relative h-[55vh] min-h-[400px] max-h-[700px] overflow-hidden">
        <Image
          src="/images/work/skyfall/skyfall-01.jpg"
          alt="Superyacht Skyfall underway at dusk beneath pastel pink clouds — Surroundings Group studio production"
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/35 to-ink/20"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 lg:px-12 pb-10 lg:pb-14">
          <div className="max-w-[1200px] mx-auto">
            <p className="caption text-gold mb-3 tracking-[0.28em]">
              SKYFALL · MARINE
            </p>
            <h3 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl text-canvas leading-tight tracking-tight max-w-3xl text-balance">
              Cinematic launch films and editorial coverage for one of the
              most-watched yachts in the category.
            </h3>
          </div>
        </div>
      </section>

      {/* By the numbers — credentials strip */}
      <section className="bg-ink text-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
            <p className="caption text-gold mb-5 tracking-[0.28em]">
              ◆ BY THE NUMBERS
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-canvas text-balance">
              The advantage other agencies have to buy.
            </h2>
          </header>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <Stat value="255M+" label="Annual reach across our owned media network" />
            <Stat value="100%" label="Production in-house, from concept to delivery" />
            <Stat value="8" label="Premium verticals we serve deeply" />
            <Stat value="10" label="Owned editorial channels publishing daily" />
          </ul>
        </div>
      </section>

      {/* Original WorkGrid with a proper sectional header */}
      <section className="bg-canvas pt-16 lg:pt-24 pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-neutral-500 mb-5">◆ SELECTED COLLECTIONS</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-ink text-balance">
              Recent engagements across the categories we serve.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-6 max-w-2xl leading-relaxed">
              A working portfolio, not a highlight reel. We keep this current
              as engagements wrap and clients clear their assets for public
              release.
            </p>
          </header>
          <WorkGrid collections={collections} />
        </div>
      </section>

      {/* How the work gets made — methodology */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <header className="text-center mb-14 lg:mb-20 max-w-3xl mx-auto">
            <p className="caption text-neutral-500 mb-5 tracking-[0.28em]">
              ◆ HOW THE WORK GETS MADE
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-ink text-balance">
              Four phases. One accountable team.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-6 leading-relaxed">
              Every engagement runs the same arc. The names of the deliverables
              change with the category; the discipline doesn't.
            </p>
          </header>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <Phase
              num="01"
              title="Strategy"
              body="Brief, category audit, audience and distribution map. Built around real conversion paths a premium buyer takes — not the agency-pitch decks they ignore."
            />
            <Phase
              num="02"
              title="Production"
              body="Our team on set. Director, cinematography, photo, drone, art direction. We don't sub-contract the shoot and stand back — the people who planned it are the people who run it."
            />
            <Phase
              num="03"
              title="Distribution"
              body="Hero assets, social cutdowns, paid variants, owned-media features. The shoot becomes a campaign system, not a single film looking for a home."
            />
            <Phase
              num="04"
              title="Compound"
              body="Premium growth is a quarter-over-quarter game. Audience compounds. Owned media compounds. By year two of an engagement, every piece of work that came before keeps paying off."
            />
          </ol>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <li className="text-center md:text-left">
      <p className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-gold leading-none mb-4 tracking-tight">
        {value}
      </p>
      <p className="text-sm md:text-base text-canvas/70 leading-snug">
        {label}
      </p>
    </li>
  );
}

function Phase({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li className="border-t border-ink/15 pt-6 lg:pt-8">
      <p className="caption text-neutral-500 mb-4">{num}</p>
      <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-neutral-700 leading-relaxed">
        {body}
      </p>
    </li>
  );
}
