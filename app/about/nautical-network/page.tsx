import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  alternates: { canonical: "/about/nautical-network" },
  title: "Nautical Network",
  description:
    "Surroundings Group's owned-media ecosystem. Eight social brands reaching 180M+ marine enthusiasts a year. The unfair distribution advantage we extend to every client.",
};

export default function NauticalNetworkPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="SISTER BRAND"
        title="Nautical Network. Owned distribution at scale."
        subhead="Eight social brands, 180M+ annual viewers, the largest global multi-platform boating outlet. Built from a single Instagram. Available to every Surroundings Group client."
        tone="dark"
      />

      {/* What it is */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <p className="caption text-neutral-500 lg:col-span-1">WHAT IT IS</p>
            <div className="lg:col-span-2 space-y-6 text-base lg:text-lg text-neutral-700 leading-relaxed">
              <p>
                Nautical Network is the largest multi-platform editorial
                and social ecosystem in premium marine. It started as a
                single Instagram account, grew into eight branded channels,
                and now publishes daily across every major platform. It
                reaches the engaged audience yacht builders, charter
                operators, marinas, and marine brands actually want to
                reach.
              </p>
              <p>
                For Surroundings Group clients, that audience becomes a
                distribution channel. Most agencies have to buy reach.
                We built ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats — expanded with the full media kit numbers */}
      <section className="bg-neutral-50 py-16 lg:py-24 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-2 md:grid-cols-4 divide-neutral-200">
            <StatBlock value="180M+" label="Annual viewers across the network" />
            <StatBlock value="4.75M" label="Followers across editorial channels" />
            <StatBlock value="62M" label="Annual watch minutes on owned video" />
            <StatBlock value="#1" label="Largest multi-platform outlet in premium marine" />
          </ul>
        </div>
      </section>

      {/* The channels — real named accounts, linked */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-neutral-500 mb-5">◆ INSIDE THE NETWORK</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              The flagship, plus eight branded channels.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-6 max-w-2xl leading-relaxed">
              Each account publishes into a distinct sub-audience inside
              premium marine. The channels don&apos;t compete with each
              other. They extend the reach of every piece of content we
              publish.
            </p>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Channel
              name="Nautical Network"
              handle="@nautical.network"
              href="https://instagram.com/nautical.network"
              audience="The flagship. Premium marine editorial, published daily."
            />
            <Channel
              name="@boat"
              handle="@boat"
              href="https://instagram.com/boat"
              audience="The category's namesake handle. Broad-reach boating."
            />
            <Channel
              name="Yachting Network"
              handle="@yachting.network"
              href="https://instagram.com/yachting.network"
              audience="Yachts, owners, and the charter lifestyle."
            />
            <Channel
              name="Sportfishing Network"
              handle="@sportfishing.network"
              href="https://instagram.com/sportfishing.network"
              audience="Tournament fishing and sportfish builds."
            />
            <Channel
              name="Boating Network"
              handle="@boating.network"
              href="https://instagram.com/boating.network"
              audience="Everyday premium boating culture."
            />
            <Channel
              name="Boats Gone Wild"
              handle="@boatsgonewild"
              href="https://instagram.com/boatsgonewild"
              audience="The wild side of the water."
            />
            <Channel
              name="Performance Boat Network"
              handle="@performanceboat.network"
              href="https://instagram.com/performanceboat.network"
              audience="Go-fast boats and performance builds."
            />
            <Channel
              name="Wake Boat Network"
              handle="@wakeboat.network"
              href="https://instagram.com/wakeboat.network"
              audience="Wake, surf, and tow boat life."
            />
            <Channel
              name="Marine Source"
              handle="@marinesource"
              href="https://instagram.com/marinesource"
              audience="Industry news across the marine trade."
            />
          </ul>
          <p className="caption text-neutral-500 mt-10">
            PUBLISHED ACROSS INSTAGRAM · TIKTOK · YOUTUBE · FACEBOOK ·
            NAUTICAL.NETWORK
          </p>
        </div>
      </section>

      {/* Full-bleed marine editorial moment */}
      <section className="relative h-[50vh] min-h-[360px] max-h-[600px] overflow-hidden">
        <Image
          src="/images/work/moonraker/moonraker-01.jpg"
          alt="Superyacht Moonraker underway, Nautical Network editorial coverage"
          fill
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/25"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 lg:px-12 pb-10 lg:pb-12">
          <div className="max-w-[1200px] mx-auto">
            <p className="caption text-gold tracking-[0.28em]">
              SHOT BY THE STUDIO · PUBLISHED BY THE NETWORK
            </p>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="caption text-neutral-500 mb-4">◆ WHY IT MATTERS</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink mb-6 text-balance">
                Owned reach changes the math.
              </h2>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                When the distribution channel is owned, every dollar of
                creative investment compounds. The film you commissioned
                for a boat launch isn&apos;t just a hero asset on your
                site. It runs across an editorial ecosystem reaching the
                exact audience that buys what you sell.
              </p>
            </div>
            <div>
              <p className="caption text-neutral-500 mb-4">◆ HOW WE EXTEND IT</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink mb-6 text-balance">
                Distribution as a service.
              </h2>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Marine clients get Nautical Network reach baked into their
                Growth engagements. For the other premium categories we
                serve, the model is the same. We&apos;re building owned
                media properties in each one, so every client eventually
                gets the same distribution leverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How client work flows through the network — process */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-5 tracking-[0.28em]">
              ◆ HOW CLIENT WORK FLOWS THROUGH IT
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas text-balance">
              From shoot day to 180M+ in three steps.
            </h2>
          </header>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <Flow
              num="01"
              title="Shoot at SG standard"
              body="Studio captures the film, photography, and short-form assets at the editorial standard the category demands. The shoot is briefed once, used many ways."
            />
            <Flow
              num="02"
              title="Cut for every channel"
              body="Post produces hero film, brand-account cutdowns, paid variants, and editorial-network packages, each formatted for the audience and platform it lands in."
            />
            <Flow
              num="03"
              title="Publish across owned + paid"
              body="The brand's own channels run the hero. Nautical Network publishes the editorial cut to its 180M+ audience. Paid amplifies into lookalikes. One shoot, three distribution layers."
            />
          </ol>
        </div>
      </section>

      {/* Beyond Marine — the model in other verticals */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="caption text-neutral-500 mb-5">◆ BEYOND MARINE</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-tight text-balance">
                The same model is being built in each vertical we serve.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-lg lg:text-xl text-ink leading-snug font-medium text-balance">
                Nautical Network is the proof point. The play is the
                same in every premium category we work in.
              </p>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Premium real estate, private aviation, hospitality, exotic
                automotive, and luxury goods all have audiences hungry for
                editorial coverage at a standard the existing outlets
                don&apos;t serve. We&apos;re building owned-media properties
                in each one, so every Surroundings Group client eventually
                gets the same distribution leverage marine clients get
                today.
              </p>
              <Link
                href="/verticals"
                className="caption inline-flex items-center gap-2 text-ink hover:text-neutral-500 transition-colors"
              >
                See the verticals we&apos;re building in
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
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* External link */}
      <section className="bg-ink text-canvas py-16 lg:py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="caption text-neutral-500 mb-6">◆ VISIT THE NETWORK</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-8 text-balance max-w-3xl mx-auto">
            See what we publish daily.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://www.nautical.network"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas transition-colors duration-300"
            >
              nautical.network
            </Link>
            <Link
              href="https://instagram.com/nautical.network"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-canvas/40 text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas hover:text-ink hover:border-canvas transition-colors duration-300"
            >
              Follow @nauticalnetwork
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <li className="px-6 py-10 md:py-12 text-center">
      <p className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-ink leading-none mb-4 tracking-tight">
        {value}
      </p>
      <p className="text-sm lg:text-base text-neutral-600 leading-snug max-w-[260px] mx-auto">
        {label}
      </p>
    </li>
  );
}

function Channel({
  name,
  handle,
  href,
  audience,
}: {
  name: string;
  handle: string;
  href: string;
  audience: string;
}) {
  return (
    <li className="border-t border-neutral-300">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block pt-5 lg:pt-6 pb-2"
      >
        <p className="caption text-neutral-500 mb-3">{handle}</p>
        <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight tracking-tight mb-2 group-hover:text-neutral-500 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-sm text-neutral-600 leading-snug">{audience}</p>
      </a>
    </li>
  );
}

function Flow({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li className="border-t border-canvas/15 pt-6 lg:pt-8">
      <p className="caption text-gold mb-4">{num}</p>
      <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-canvas leading-tight tracking-tight mb-4">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-canvas/75 leading-relaxed">
        {body}
      </p>
    </li>
  );
}
