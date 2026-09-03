import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CtaBanner } from "@/components/cta-banner";
import { Rule } from "@/components/rule";
import Image from "next/image";
import { verticals } from "@/lib/verticals";
import { services } from "@/lib/services";
import { getProjectsByVertical } from "@/lib/sanity/queries";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { site } from "@/lib/site";
import {
  JsonLd,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
} from "@/components/json-ld";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/** Wrap the first occurrence of `phrase` within `text` in the amber
 *  underline accent (matches the homepage About treatment). */
function withHighlight(text: string, phrase?: string) {
  if (!phrase) return text;
  const idx = text.indexOf(phrase);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="amber-underline">{phrase}</span>
      {text.slice(idx + phrase.length)}
    </>
  );
}

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  if (!vertical) return {};
  const url = `${site.url.replace(/\/$/, "")}${vertical.href}`;
  const title = vertical.seo?.title ?? vertical.name;
  const description = vertical.seo?.description ?? vertical.tagline;
  return {
    // A vertical with its own SEO title uses it verbatim (absolute) so the
    // layout's "— Surroundings Group" suffix isn't appended twice.
    title: vertical.seo ? { absolute: vertical.seo.title } : vertical.name,
    description,
    keywords: vertical.seo?.keywords,
    alternates: { canonical: vertical.href },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function VerticalDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  if (!vertical) notFound();

  const currentIndex = verticals.findIndex((v) => v.slug === slug);
  const next = verticals[(currentIndex + 1) % verticals.length];

  // Portfolio collections shot for this vertical (uniform card grid)
  const verticalWork = await getProjectsByVertical(vertical.slug);
  // Show up to 12; the grid itself renders 8 by default with an expand bar.
  const galleryCollections = verticalWork.slice(0, 12);

  const fullUrl = `${site.url.replace(/\/$/, "")}${vertical.href}`;

  // First sentence carries the statement; the rest fades to muted.
  const [introFirst, ...introRestParts] = vertical.intro.split(". ");
  const introRest = introRestParts.join(". ");

  return (
    <>
      <Nav />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: site.url },
            {
              name: "Industries",
              url: `${site.url.replace(/\/$/, "")}/verticals`,
            },
            { name: vertical.name, url: fullUrl },
          ]),
          serviceSchema({
            name: `${vertical.name} Marketing`,
            description: vertical.seo?.description ?? vertical.description,
            url: fullUrl,
          }),
          ...(vertical.faqs && vertical.faqs.length > 0
            ? [faqSchema(vertical.faqs)]
            : []),
        ]}
      />

      {/* Hero — full-bleed category imagery under an ink gradient. Tall,
          viewport-scaled so wide subjects (a jet, a yacht) frame fully
          instead of getting cropped by a short banner. */}
      <section className="relative bg-ink text-canvas overflow-hidden flex items-center min-h-[68vh] sm:min-h-[85vh]">
        <Image
          src={`/images/verticals/${vertical.slug}.jpg`}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-center opacity-40 sm:object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/55"
          aria-hidden
        />
        <div className="relative w-full max-w-[1200px] mx-auto px-6 lg:px-12 pt-28 pb-16 lg:pt-32 lg:pb-20">
          <Rule className="bg-gold mb-8" />
          <h1 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight max-w-4xl text-balance">
            {vertical.name}.
          </h1>
          <p className="text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed text-canvas/85 font-light">
            {vertical.tagline}
          </p>
        </div>
      </section>

      {/* Intro / positioning */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="caption text-neutral-500 mb-4">◆ THE CATEGORY</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
                {vertical.headlines.intro}
              </h2>
              <Rule className="bg-gold mt-6" />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xl lg:text-2xl font-light text-ink leading-[1.4] text-balance">
                {withHighlight(introFirst, vertical.introHighlight)}
                {introRest ? (
                  <>
                    .{" "}
                    <span className="text-ink/55">
                      {withHighlight(introRest, vertical.introHighlight)}
                    </span>
                  </>
                ) : null}
              </p>
              {vertical.slug === "marine" && (
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                  Marine clients also get direct access to{" "}
                  <Link
                    href="/about/nautical-network"
                    className="text-ink underline hover:text-neutral-500 transition-colors"
                  >
                    Nautical Network distribution
                  </Link>
                  . The largest multi-platform boating outlet, 180M+ annual
                  viewers, owned media reach baked into every engagement.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve — audience segments */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-4">◆ WHO WE SERVE</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas leading-[1.1] text-balance">
              {vertical.headlines.who}
            </h2>
          </header>

          <ul className="border-t border-canvas/15">
            {vertical.audienceSegments.map((segment, i) => (
              <li
                key={i}
                className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-2 py-7 lg:py-8 border-b border-canvas/15"
              >
                <span className="caption text-gold lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-canvas leading-tight lg:col-span-4 text-balance">
                  {segment.name}
                </h3>
                <p className="text-base text-canvas/75 leading-relaxed lg:col-span-7">
                  {segment.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Portfolio — recent work as a standout, featured card wall */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14">
            <div>
              <p className="caption text-neutral-500 mb-4">◆ PORTFOLIO</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
                Recent {vertical.name.toLowerCase()} work.
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

          {galleryCollections.length > 0 ? (
            <PortfolioGrid
              collections={galleryCollections}
              label={vertical.name.toLowerCase().replace(/^private\s+/, "")}
            />
          ) : (
            <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-12 lg:p-20 text-center">
              <p className="caption text-neutral-500 mb-4">◆ IN PRODUCTION</p>
              <p className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance">
                {vertical.name} work is being packaged.
              </p>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                The work informs every brief.{" "}
                <Link
                  href="/contact"
                  className="underline hover:text-ink transition-colors"
                >
                  Talk to us
                </Link>{" "}
                to see relevant projects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Surroundings — market-fluency statement (renders when set) */}
      {vertical.proof && (
        <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                {vertical.proof.eyebrow && (
                  <p className="caption text-gold mb-5">
                    {vertical.proof.eyebrow}
                  </p>
                )}
                <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas leading-[1.1] text-balance">
                  {vertical.proof.headline}
                </h2>
                <Rule className="bg-gold mt-6" />
              </div>
              <div className="lg:col-span-7">
                <p className="text-xl lg:text-2xl font-light text-canvas leading-[1.4] text-balance">
                  {vertical.proof.body}
                </p>
              </div>
            </div>
            {vertical.proof.stats && vertical.proof.stats.length > 0 && (
              <ul className={`mt-14 lg:mt-20 grid grid-cols-1 ${vertical.proof.stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} gap-px bg-canvas/10 border border-canvas/10`}>
                {vertical.proof.stats.map((stat, i) => (
                  <li key={i} className="bg-ink px-6 py-10 lg:py-12 text-center">
                    <p className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-gold leading-none mb-3 tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-sm lg:text-base text-canvas/70 leading-snug max-w-[240px] mx-auto">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Capabilities tuned to this category */}
      <section className="bg-[#EFE7DA] py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-10 lg:mb-12 max-w-2xl">
            <p className="caption text-neutral-500 mb-4">◆ CAPABILITIES</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              {vertical.headlines.capabilities}
            </h2>
            <p className="text-base lg:text-lg text-neutral-600 leading-relaxed mt-5">
              The services we run in {vertical.name.toLowerCase()}. Bring us in
              as an extension of your team, or hand the whole thing to us as
              your full-service partner.
            </p>
          </header>

          <ul className="border-t border-ink/15">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="group grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-x-6 gap-y-1 py-5 lg:py-6 border-b border-ink/10 hover:border-ink/40 transition-colors duration-300"
                >
                  <h3 className="md:col-span-4 font-sans font-extrabold text-xl lg:text-2xl text-ink group-hover:text-neutral-500 transition-colors duration-300 text-balance">
                    {s.name}
                  </h3>
                  <p className="md:col-span-7 text-sm lg:text-base text-neutral-600 leading-snug">
                    {vertical.serviceNotes?.[s.slug] ?? s.tagline}
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

      {/* FAQ — buyer questions (accordion; FAQPage schema emitted above) */}
      {vertical.faqs && vertical.faqs.length > 0 && (
        <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12 border-t border-neutral-200">
          <div className="max-w-[900px] mx-auto">
            <header className="mb-10 lg:mb-14">
              <p className="caption text-neutral-500 mb-4">
                ◆ COMMON QUESTIONS
              </p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
                {vertical.name} marketing, answered.
              </h2>
            </header>
            <ul className="border-t border-neutral-200">
              {vertical.faqs.map((faq, i) => (
                <li key={i} className="border-b border-neutral-200">
                  <details className="group">
                    <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="font-sans font-extrabold text-lg lg:text-xl text-ink leading-snug text-balance">
                        {faq.q}
                      </h3>
                      <span
                        className="shrink-0 mt-1 text-neutral-400 transition-transform duration-300 group-open:rotate-45"
                        aria-hidden
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <path
                            d="M9 1v16M1 9h16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </span>
                    </summary>
                    <p className="text-base lg:text-lg text-neutral-700 leading-relaxed pb-7 max-w-[70ch]">
                      {faq.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Next vertical — skinny fixed-ratio full-bleed banner over the next
          category image. Locked to 3:1 on desktop so a 2560×853 source maps
          1:1 (no surprise crop); a touch taller on mobile so the text fits.
          Content is absolutely centered inside the fixed frame. */}
      <section className="relative overflow-hidden border-t border-neutral-200">
        <Link
          href={next.href}
          className="group relative block aspect-[3/2] sm:aspect-[3/1]"
        >
          <Image
            src={`/images/verticals/${next.slug}.jpg`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            aria-hidden
          />
          <div className="absolute inset-0 bg-ink/65" aria-hidden />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 lg:px-12 text-canvas">
            <p className="caption text-gold mb-5">◆ NEXT VERTICAL</p>
            <h3 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance max-w-[900px]">
              {next.name}
            </h3>
            <p className="hidden sm:block text-base lg:text-lg text-canvas/80 mt-4 max-w-xl">
              {next.tagline}
            </p>
            <span className="mt-6 sm:mt-9 inline-flex items-center gap-2 bg-gold text-ink px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium tracking-wide group-hover:bg-canvas transition-colors duration-300">
              Explore {next.name}
              <Arrow />
            </span>
          </div>
        </Link>
      </section>

      {vertical.cta ? (
        <section className="bg-ink text-canvas py-24 lg:py-32 px-6 lg:px-12 border-t border-canvas/10">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-2xl">
              {vertical.cta.eyebrow && (
                <p className="caption text-gold mb-5">{vertical.cta.eyebrow}</p>
              )}
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas leading-[1.1] text-balance">
                {vertical.cta.headline}
              </h2>
              {vertical.cta.body && (
                <p className="text-lg text-canvas/75 mt-5 leading-relaxed max-w-xl">
                  {vertical.cta.body}
                </p>
              )}
            </div>
            <div className="shrink-0">
              <Link
                href={vertical.cta.buttonHref}
                className="inline-block bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas transition-colors duration-300 text-center"
              >
                {vertical.cta.buttonLabel}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <CtaBanner />
      )}
      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="12"
      height="9"
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
