import Link from "next/link";

/**
 * The Nautical Network proof section — the single biggest differentiator.
 *
 * Significantly expanded per Billy's feedback ("want to talk more about
 * the value of our network and what makes us different there").
 *
 * All numbers and pillars sourced directly from the Nautical Network
 * Media Kit 2025 — these are REAL, not placeholders:
 *   - 255M+ total reach (2024)
 *   - 4.75M+ total following
 *   - 62M+ minutes watch time (2024, FB + YouTube only)
 *   - 10 branded channels under one publishing system
 */
export function NauticalNetworkProof() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <p className="caption text-neutral-500 mb-6">◆ OWNED DISTRIBUTION</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-tight text-ink text-balance">
              We don&apos;t just make content. We have the audience.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed">
              <span className="font-medium text-ink">Nautical Network</span> is
              Surroundings Group&apos;s owned-media ecosystem, built from a
              single Instagram into the largest multi-platform boating outlet
              in the world.
            </p>
            <p className="text-base lg:text-lg text-neutral-600 leading-relaxed mt-4">
              For our clients, the audience isn&apos;t something we buy.
              It&apos;s something we own.
            </p>
          </div>
        </header>

        {/* The big stat row — real numbers from media kit */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-neutral-200 border border-neutral-200 mb-20 lg:mb-24">
          <StatBlock value="255M+" label="Total reach in 2024" />
          <StatBlock value="4.75M" label="Followers across the network" />
          <StatBlock value="62M" label="Minutes of watch time (2024)" />
          <StatBlock value="10" label="Branded channels publishing daily" />
        </div>

        {/* The 4 pillars — what makes NN different */}
        <div className="mb-20 lg:mb-24">
          <p className="caption text-neutral-500 mb-8 text-center">◆ WHAT SETS US APART</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <Pillar
              num="01"
              title="Massive, qualified reach"
              copy="20M+ monthly impressions across Nautical Network, Boats Gone Wild, Yachting Network, and partner channels. Not just views: buyers, brokers, and builders inside the engaged luxury marine community."
            />
            <Pillar
              num="02"
              title="Top-tier presence everywhere"
              copy="Instagram, TikTok, YouTube Shorts, Facebook. High-performing on every platform that matters. Our audience consumes daily, across formats and devices."
            />
            <Pillar
              num="03"
              title="Premium, high-intent community"
              copy="Our subscribers are 46% Americas, 22% Europe, 16% Middle East: affluent, global, and motivated. The audience that buys what our clients sell."
            />
            <Pillar
              num="04"
              title="Vertical authority, not generalism"
              copy="100% focused on marine and luxury: insider knowledge, industry access, and authenticity that generalist media networks cannot replicate at this scale."
            />
          </ul>
        </div>

        {/* The brands — visual proof of the 10-channel system */}
        <div className="bg-ink text-canvas p-10 lg:p-14 mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="caption text-neutral-500 mb-4">◆ THE NETWORK</p>
              <h3 className="font-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight mb-6 text-balance">
                Ten brands. One publishing system.
              </h3>
              <p className="text-base lg:text-lg text-canvas/70 leading-relaxed">
                Each channel reaches a specific slice of the marine audience:
                builders, brokers, lifestyle, sportfishing, performance, wake.
                One distribution engine, every corner of the category.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                <BrandItem name="Nautical Network" followers="295K+" />
                <BrandItem name="Boats Gone Wild" followers="3M+" />
                <BrandItem name="Yachting Network" followers="200K+" />
                <BrandItem name="MarineSource" followers="200K+" />
                <BrandItem name="Boating Network" followers="55K+" />
                <BrandItem name="Sportfishing Network" followers="60K+" />
                <BrandItem name="Wake Boat Network" followers="50K+" />
                <BrandItem name="Performance Boat" followers="17K+" />
                <BrandItem name="Surroundings Official" followers="1.1M+" />
                <BrandItem name="+ Partner channels" followers="Daily" />
              </ul>
            </div>
          </div>
        </div>

        {/* What it means for clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-20">
          <div>
            <p className="caption text-neutral-500 mb-4">◆ WHY IT MATTERS</p>
            <h3 className="font-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl tracking-tight text-ink leading-[1.1] text-balance mb-6">
              Owned reach changes the math.
            </h3>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
              When the distribution channel is owned, every dollar of creative
              investment compounds. The film commissioned for your boat launch
              isn&apos;t a one-time asset; it runs across an editorial
              ecosystem reaching the exact audience that buys what you sell.
            </p>
          </div>
          <div>
            <p className="caption text-neutral-500 mb-4">◆ PROVEN RESULTS</p>
            <h3 className="font-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl tracking-tight text-ink leading-[1.1] text-balance mb-6">
              The work speaks.
            </h3>
            <ul className="space-y-4 text-base lg:text-lg text-neutral-700 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-neutral-500 font-extrabold shrink-0">·</span>
                <span>
                  <span className="font-medium text-ink">$100M+</span> in yacht
                  and boat transactions facilitated through the network
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-500 font-extrabold shrink-0">·</span>
                <span>
                  <span className="font-medium text-ink">$24M</span> transaction
                  lead validated in 4 direct messages
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-500 font-extrabold shrink-0">·</span>
                <span>
                  Charter clients brought in at{" "}
                  <span className="font-medium text-ink">$700K/week</span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-neutral-500 font-extrabold shrink-0">·</span>
                <span>
                  Ryan Hughes Design:{" "}
                  <span className="font-medium text-ink">$7M+</span> in upsells
                  from network exposure
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-neutral-200 pt-12 lg:pt-16 text-center">
          <Link
            href="/about/nautical-network"
            className="caption inline-flex items-center gap-3 text-ink hover:text-neutral-500 transition-colors duration-300 text-base"
          >
            See the full network breakdown
            <svg width="16" height="11" viewBox="0 0 14 10" fill="none" aria-hidden>
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
    </section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <li className="px-6 py-10 lg:px-8 lg:py-14 text-center flex flex-col justify-center min-h-[180px]">
      <p className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-ink leading-none mb-4 tracking-tight">
        {value}
      </p>
      <p className="text-sm lg:text-base text-neutral-600 leading-snug max-w-[220px] mx-auto">
        {label}
      </p>
    </li>
  );
}

function Pillar({
  num,
  title,
  copy,
}: {
  num: string;
  title: string;
  copy: string;
}) {
  return (
    <li className="border-t border-neutral-200 pt-6 lg:pt-8">
      <p className="caption text-neutral-500 mb-3">{num}</p>
      <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance leading-tight">
        {title}
      </h3>
      <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
        {copy}
      </p>
    </li>
  );
}

function BrandItem({
  name,
  followers,
}: {
  name: string;
  followers: string;
}) {
  return (
    <li className="border-t border-canvas/15 pt-3">
      <p className="text-sm lg:text-base font-medium text-canvas leading-tight">
        {name}
      </p>
      <p className="caption text-canvas/50 mt-1">{followers}</p>
    </li>
  );
}
