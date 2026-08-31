import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CtaBanner } from "@/components/cta-banner";
import { services } from "@/lib/services";
import { verticals } from "@/lib/verticals";
import { getCollectionsBySlugs, collectionCover } from "@/lib/work";
import { site } from "@/lib/site";
import {
  JsonLd,
  serviceSchema,
  breadcrumbSchema,
} from "@/components/json-ld";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/** Pre-render all 6 service pages at build time */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.tagline,
    alternates: { canonical: service.href },
  };
}

export default async function ServiceDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const next = services[(currentIndex + 1) % services.length];

  // Find verticals where this service appears in relatedServiceSlugs
  const verticalsWhereUsed = verticals.filter((v) =>
    v.relatedServiceSlugs.includes(service.slug),
  );

  // Curated portfolio collections for the "Recent work" gallery
  const featuredWork = service.featuredWorkSlugs
    ? getCollectionsBySlugs(service.featuredWorkSlugs)
    : [];

  const fullUrl = `${site.url.replace(/\/$/, "")}${service.href}`;

  // First sentence carries the statement; the rest fades to muted.
  const [introFirst, ...introRestParts] = service.intro.split(". ");
  const introRest = introRestParts.join(". ");

  return (
    <>
      <Nav />

      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.tagline,
            url: fullUrl,
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url.replace(/\/$/, "")}/services` },
            { name: service.name, url: fullUrl },
          ]),
        ]}
      />

      {/* Hero — full-bleed service imagery under an ink gradient */}
      <section className="relative bg-ink text-canvas overflow-hidden">
        <Image
          src={`/images/services/${service.slug}.jpg`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/55"
          aria-hidden
        />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 pt-40 lg:pt-56 pb-20 lg:pb-32">
          <p className="caption text-gold mb-6">
            ◆ SERVICE / {String(currentIndex + 1).padStart(2, "0")}
          </p>
          <h1 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl text-balance">
            {service.name}
          </h1>
          <p className="text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed text-canvas/85 font-light">
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Intro / positioning */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="caption text-neutral-500 mb-4">◆ THE WORK</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
                {service.headlines.intro}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-xl lg:text-2xl font-light text-ink leading-[1.4] text-balance">
                {introFirst}
                {introRest ? (
                  <>
                    .{" "}
                    <span className="text-ink/55">{introRest}</span>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included — capability list */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="caption text-gold mb-4">◆ WHAT&apos;S INCLUDED</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas leading-[1.1] text-balance">
                {service.headlines.capabilities}
              </h2>
              <p className="text-base lg:text-lg text-canvas/70 leading-relaxed mt-6">
                {service.description}
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-canvas/15 border-y border-canvas/15">
                {service.capabilities.map((cap, i) => (
                  <li key={i} className="py-5 flex items-start gap-4 lg:gap-6">
                    <span className="caption text-gold pt-1 shrink-0 w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base lg:text-lg text-canvas">
                      {cap}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-canvas text-ink py-16 lg:py-24 px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-[1000px] mx-auto">
          <p className="caption text-neutral-500 mb-6">◆ WHO IT&apos;S FOR</p>
          <p className="font-sans font-light text-2xl md:text-3xl lg:text-4xl text-ink leading-[1.25] text-balance">
            {service.bestForCopy}
          </p>
          <Link
            href={site.cta.primary.href}
            className="inline-block mt-10 bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-ink hover:text-canvas transition-colors duration-300"
          >
            {site.cta.primary.label}
          </Link>
        </div>
      </section>

      {/* Full-bleed work imagery — a photographic breath between the
          gold statement and the process band, linking into /work */}
      {service.portfolioImage && (
        <section className="bg-ink">
          <Link href="/work" className="group block relative overflow-hidden">
            <div className="relative h-[420px] lg:h-[560px]">
              <Image
                src={service.portfolioImage}
                alt={service.portfolioAlt ?? "Selected work from the studio"}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent"
                aria-hidden
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-14 text-canvas">
              <p className="caption text-gold mb-4">◆ SEE THE WORK</p>
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance group-hover:text-gold transition-colors duration-300">
                  Explore the portfolio.
                </h2>
                <svg
                  width="32"
                  height="20"
                  viewBox="0 0 14 10"
                  fill="none"
                  className="text-canvas group-hover:text-gold transition-all duration-300 group-hover:translate-x-2 shrink-0"
                  aria-hidden
                >
                  <path
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Verticals where this service shows up */}
      {verticalsWhereUsed.length > 0 && (
        <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <header className="mb-12 lg:mb-16 max-w-3xl">
              <p className="caption text-neutral-500 mb-4">◆ WHERE WE APPLY IT</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
                {service.headlines.apply}
              </h2>
              <p className="text-base lg:text-lg text-neutral-600 leading-relaxed mt-6">
                This work flexes across every category we serve. These are the
                verticals where it shows up most.
              </p>
            </header>

            <ul className="border-t border-neutral-200">
              {verticalsWhereUsed.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={v.href}
                    className="group grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-x-6 gap-y-1 py-5 lg:py-6 border-b border-neutral-200 hover:border-ink/40 transition-colors duration-300"
                  >
                    <h3 className="md:col-span-4 font-sans font-extrabold text-xl lg:text-2xl text-ink group-hover:text-neutral-500 transition-colors duration-300 text-balance">
                      {v.name}
                    </h3>
                    <p className="md:col-span-7 text-sm lg:text-base text-neutral-600 leading-snug">
                      {v.tagline}
                    </p>
                    <span className="hidden md:flex md:col-span-1 justify-end text-neutral-400 group-hover:text-ink transition-colors duration-300">
                      <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Recent work — curated 3-card gallery from the portfolio */}
      {featuredWork.length > 0 && (
        <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="caption text-neutral-500 mb-4">◆ RECENT WORK</p>
                <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
                  {service.name} in the field.
                </h2>
              </div>
              <Link
                href="/work"
                className="caption inline-flex items-center gap-2 text-ink hover:text-neutral-500 transition-colors shrink-0"
              >
                All work
                <Arrow />
              </Link>
            </header>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {featuredWork.map((c) => {
                const cover = collectionCover(c);
                return (
                  <li key={c.slug}>
                    <Link
                      href={c.href}
                      className="group block relative overflow-hidden bg-ink aspect-[4/3]"
                    >
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/5 group-hover:from-ink group-hover:via-ink/50 transition-all duration-500"
                        aria-hidden
                      />
                      <div
                        className="absolute top-0 right-0 w-12 h-px bg-gold/60"
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6 text-canvas">
                        <p className="caption text-gold mb-2">{c.vertical}</p>
                        <h3 className="font-sans font-extrabold text-xl lg:text-2xl leading-[1.1] text-balance group-hover:text-gold transition-colors duration-300">
                          {c.title}
                        </h3>
                        {c.location && (
                          <p className="text-xs lg:text-sm text-canvas/70 mt-1">
                            {c.location}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Next service navigation */}
      <section className="bg-canvas py-16 lg:py-20 px-6 lg:px-12 border-t border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <Link href={next.href} className="group block">
            <p className="caption text-neutral-500 mb-4">◆ NEXT SERVICE</p>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl text-ink leading-none tracking-tight group-hover:text-neutral-500 transition-colors duration-300">
                {next.name}
              </h3>
              <svg
                width="32"
                height="20"
                viewBox="0 0 14 10"
                fill="none"
                className="text-ink group-hover:text-neutral-500 transition-all duration-300 group-hover:translate-x-2 shrink-0"
                aria-hidden
              >
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <p className="text-base lg:text-lg text-neutral-600 mt-3 max-w-2xl">
              {next.tagline}
            </p>
          </Link>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

function Arrow() {
  return (
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
  );
}
