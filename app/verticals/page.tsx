import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { verticals, type Vertical } from "@/lib/verticals";

export const metadata: Metadata = {
  alternates: { canonical: "/verticals" },
  title: "Industries",
  description:
    "The premium categories Surroundings Group works in. Marine, real estate and development, multifamily, private aviation, hospitality, resorts and travel, exotic automotive, and luxury goods.",
};

export default function VerticalsIndexPage() {
  const tier1 = verticals.filter((v) => v.tier === 1);
  const tier2 = verticals.filter((v) => v.tier === 2);

  return (
    <>
      <Nav />

      <PageHero
        eyebrow="INDUSTRIES WE SERVE"
        title="Vertical-focused."
        subhead="We work deeply in these premium categories. Our clients collaborate across them. That's the difference."
      />

      {/* Network advantage — the cross-vertical positioning */}
      <section className="bg-canvas px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="caption text-neutral-500 mb-5">◆ THE NETWORK ADVANTAGE</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance">
              Eight categories. One client roster.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg lg:text-xl text-ink leading-snug font-medium text-balance">
              When a brand engages us, they don&apos;t just get our team:
              they get access to the brands, the locations, and the talent
              across every category we serve.
            </p>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
              A yacht from our marine roster might anchor a real estate
              launch film. A private terminal stages a watchmaker&apos;s
              campaign. A car reveal lands at a member club. The work
              compounds because the network compounds, and clients borrow
              audience and access from each other in ways a single-vertical
              agency couldn&apos;t pull off.
            </p>
          </div>
        </div>
      </section>

      {/* Tier 1 — magazine-cover treatment */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-[1440px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-neutral-500 mb-4">◆ FEATURED VERTICALS</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              Where we go deepest.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-6 max-w-2xl leading-relaxed">
              These four categories carry the most active engagements at any
              given time, and the deepest editorial and distribution muscle
              we&apos;ve built.
            </p>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {tier1.map((vertical) => (
              <VerticalCard key={vertical.slug} vertical={vertical} featured />
            ))}
          </ul>
        </div>
      </section>

      {/* Tier 2 — adjacent categories */}
      <section className="bg-neutral-50 py-16 lg:py-24 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1440px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-neutral-500 mb-4">◆ ALSO SERVING</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              Adjacent categories with the same discipline applied.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-6 max-w-2xl leading-relaxed">
              Same in-house standard, same distribution leverage, applied
              to categories where the work and the audience overlap with
              our flagship four.
            </p>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {tier2.map((vertical) => (
              <VerticalCard key={vertical.slug} vertical={vertical} />
            ))}
          </ul>
        </div>
      </section>

      {/* Crossover in practice — the network in action */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-5 tracking-[0.28em]">
              ◆ CROSSOVER IN PRACTICE
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-canvas text-balance">
              The same buyer who charters the jet owns the car and stays at the resort.
            </h2>
            <p className="text-base lg:text-lg text-canvas/70 mt-6 leading-relaxed max-w-2xl">
              The audience overlap across our verticals is the reason this
              works. We don&apos;t build distribution to one audience. We
              build it to the audience that buys at the top end of every
              category we serve.
            </p>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <CrossoverExample
              title="Aviation × Hospitality"
              body="A charter operator&apos;s new aircraft entering service debuts at a member club gathering, covered across both our aviation channels and the hospitality property's social presence."
            />
            <CrossoverExample
              title="Marine × Luxury Goods"
              body="A watchmaker stages a new collection on a superyacht we already film, pulling editorial coverage from Nautical Network's marine audience and the brand's own channels."
            />
            <CrossoverExample
              title="Real Estate × Automotive"
              body="A flagship development&apos;s grand opening features a curated exotic car activation. Both engagements compound traffic and dwell time at the property's sales center."
            />
          </ul>
        </div>
      </section>

      {/* Stats / scale of the network */}
      <section className="bg-canvas py-16 lg:py-20 px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="caption text-neutral-500 mb-5 tracking-[0.28em]">
            ◆ THE SCALE OF THE NETWORK
          </p>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mt-10">
            <Stat value="8" label="Premium verticals served" />
            <Stat value="255M+" label="Annual reach across owned media" />
            <Stat value="10" label="Owned editorial channels" />
            <Stat value="100%" label="Production in-house" />
          </ul>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

/* ----------------------------- Cards ----------------------------- */

function VerticalCard({
  vertical,
  featured = false,
}: {
  vertical: Vertical;
  featured?: boolean;
}) {
  return (
    <li>
      <Link
        href={vertical.href}
        className="group block relative overflow-hidden bg-ink aspect-[4/5]"
      >
        {vertical.image ? (
          <Image
            src={vertical.image}
            alt={vertical.imageAlt ?? vertical.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            quality={75}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <span className="font-sans font-extrabold text-3xl lg:text-4xl text-canvas/15 text-center leading-tight">
              {vertical.name}
            </span>
          </div>
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5 group-hover:from-ink group-hover:via-ink/55 transition-all duration-500"
        />
        <div
          aria-hidden
          className="absolute top-0 right-0 w-16 h-px bg-gold/70"
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-7 text-canvas">
          {featured && (
            <p className="caption text-gold mb-3 tracking-[0.22em]">FEATURED</p>
          )}
          <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-[1.1] text-balance mb-3 group-hover:text-gold transition-colors duration-300">
            {vertical.name}
          </h3>
          <p className="text-sm lg:text-base text-canvas/85 leading-snug mb-4 line-clamp-2">
            {vertical.tagline}
          </p>
          <span className="caption inline-flex items-center gap-2 text-canvas/90 group-hover:text-gold transition-colors duration-300">
            Explore
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
      </Link>
    </li>
  );
}

function CrossoverExample({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <li className="border-t border-canvas/15 pt-6 lg:pt-8">
      <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-canvas leading-tight mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-canvas/75 leading-relaxed">
        {body}
      </p>
    </li>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <li>
      <p className="font-sans font-extrabold text-4xl md:text-5xl text-neutral-500 leading-none mb-4 tracking-tight">
        {value}
      </p>
      <p className="text-sm md:text-base text-neutral-700 leading-snug">
        {label}
      </p>
    </li>
  );
}
