import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import {
  featuredProjects,
  journalTypeLabel,
} from "@/lib/featured-work";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return featuredProjects.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const entry = featuredProjects.find((e) => e.slug === slug);
  if (!entry) return {};
  return {
    title: `${entry.client} · ${journalTypeLabel(entry.type)}`,
    description: entry.headline,
    alternates: { canonical: entry.href },
  };
}

export default async function JournalEntryPage({ params }: RouteParams) {
  const { slug } = await params;
  const entry = featuredProjects.find((e) => e.slug === slug);
  if (!entry) notFound();

  // Next entry (cycles)
  const currentIndex = featuredProjects.findIndex((e) => e.slug === slug);
  const next =
    featuredProjects[(currentIndex + 1) % featuredProjects.length];

  const fullUrl = `${site.url.replace(/\/$/, "")}${entry.href}`;

  return (
    <>
      <Nav />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Studio Journal", url: `${site.url.replace(/\/$/, "")}/journal` },
          { name: entry.client, url: fullUrl },
        ])}
      />

      <PageHero
        eyebrow={`${journalTypeLabel(entry.type)} · ${entry.vertical.toUpperCase()}`}
        title={entry.client}
        subhead={entry.headline}
        tone="dark"
      />

      {entry.content ? (
        <>
          {/* Lead paragraph */}
          <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[900px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <p className="caption text-neutral-500 lg:col-span-1">
                  THE STORY
                </p>
                <p className="lg:col-span-2 text-xl lg:text-2xl text-ink leading-snug font-medium text-balance">
                  {entry.content.lead}
                </p>
              </div>
            </div>
          </section>

          {/* Outcomes band */}
          {entry.content.outcomes && entry.content.outcomes.length > 0 && (
            <section className="bg-ink text-canvas py-16 lg:py-20 px-6 lg:px-12">
              <div className="max-w-[1200px] mx-auto">
                <p className="caption text-canvas/60 mb-10 lg:mb-12 text-center">
                  OUTCOMES
                </p>
                <ul
                  className={`grid gap-px bg-canvas/10 ${
                    entry.content.outcomes.length === 4
                      ? "grid-cols-2 md:grid-cols-4"
                      : entry.content.outcomes.length === 3
                        ? "grid-cols-1 md:grid-cols-3"
                        : "grid-cols-1 md:grid-cols-2"
                  }`}
                >
                  {entry.content.outcomes.map((o, i) => (
                    <li
                      key={i}
                      className="bg-ink px-6 py-10 lg:py-12 text-center"
                    >
                      <p className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-gold leading-none mb-3 tracking-tight">
                        {o.value}
                      </p>
                      <p className="text-sm lg:text-base text-canvas/70 leading-snug max-w-[240px] mx-auto">
                        {o.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Body sections */}
          <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[1000px] mx-auto space-y-16 lg:space-y-20">
              {entry.content.sections.map((s, i) => (
                <article
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                >
                  <div className="lg:col-span-4">
                    {s.eyebrow && (
                      <p className="caption text-neutral-500 mb-4">
                        {s.eyebrow}
                      </p>
                    )}
                    <h2 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight text-ink leading-[1.1] text-balance">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="lg:col-span-8 space-y-5 text-base lg:text-lg text-neutral-700 leading-relaxed">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Closer */}
          {entry.content.closer && (
            <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
              <div className="max-w-[1000px] mx-auto text-center">
                <p className="caption text-gold mb-8">◆ THE TAKEAWAY</p>
                <p className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl leading-[1.2] text-balance">
                  {entry.content.closer}
                </p>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Placeholder for entries without rich content yet */
        <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="bg-neutral-100 border border-neutral-200 p-12 lg:p-20 text-center">
              <p className="caption text-neutral-500 mb-4">◆ COMING SOON</p>
              <p className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance">
                The full write-up for {entry.client} is being packaged.
              </p>
              <p className="text-sm text-neutral-700 max-w-md mx-auto mb-6 leading-relaxed">
                In the meantime, the work informs every brief.{" "}
                <Link
                  href="/contact"
                  className="underline hover:text-ink transition-colors"
                >
                  Talk to us
                </Link>{" "}
                to see relevant projects.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Next entry */}
      <section className="bg-canvas py-16 lg:py-20 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <Link href={next.href} className="group block">
            <p className="caption text-neutral-500 mb-4">◆ NEXT ENTRY</p>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl text-ink leading-tight tracking-tight group-hover:text-neutral-500 transition-colors duration-300 text-balance">
                {next.client}
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
              {next.headline}
            </p>
          </Link>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
