import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { VimeoEmbed } from "@/components/vimeo-embed";
import { workCollections, collectionCover } from "@/lib/work";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return workCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const collection = workCollections.find((c) => c.slug === slug);
  if (!collection) return {};
  const cover = collectionCover(collection);
  return {
    title: `${collection.title} — Work`,
    description: collection.description,
    alternates: { canonical: collection.href },
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: [{ url: cover.src, width: cover.width, height: cover.height }],
    },
  };
}

export default async function WorkCollectionPage({ params }: RouteParams) {
  const { slug } = await params;
  const collection = workCollections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const currentIndex = workCollections.findIndex((c) => c.slug === slug);
  const next = workCollections[(currentIndex + 1) % workCollections.length];

  return (
    <>
      <Nav />

      <PageHero
        eyebrow={collection.vertical.toUpperCase()}
        title={collection.title}
        subhead={collection.description}
      />

      {/* Walkthrough / brand film — cinematic 16:9, on-demand playback */}
      {collection.video && (
        <section className="bg-canvas px-6 lg:px-12 pt-12 lg:pt-16 pb-10 lg:pb-14">
          <div className="max-w-[1200px] mx-auto">
            <VimeoEmbed
              vimeoId={collection.video.vimeoId}
              vimeoHash={collection.video.vimeoHash}
              title={collection.video.title ?? `${collection.title} film`}
            />
          </div>
        </section>
      )}

      {/* Masonry gallery — CSS columns preserve each image's aspect ratio */}
      <section className="bg-canvas pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Credit line — client + shoot location */}
          {(collection.client || collection.location) && (
            <dl className="flex flex-wrap gap-x-12 gap-y-4 mb-10 lg:mb-12 pb-8 border-b border-neutral-200">
              {collection.client && (
                <div>
                  <dt className="caption text-neutral-500 mb-1">CLIENT</dt>
                  <dd className="font-sans font-extrabold text-base lg:text-lg text-ink">
                    {collection.client}
                  </dd>
                </div>
              )}
              {collection.location && (
                <div>
                  <dt className="caption text-neutral-500 mb-1">LOCATION</dt>
                  <dd className="font-sans font-extrabold text-base lg:text-lg text-ink">
                    {collection.location}
                  </dd>
                </div>
              )}
            </dl>
          )}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {collection.images.map((image) => (
              <div key={image.src} className="mb-6 break-inside-avoid">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          {/* Footer nav — back to index + next collection */}
          <div className="flex items-center justify-between mt-12 lg:mt-16 pt-8 border-t border-neutral-200">
            <Link
              href="/work"
              className="caption inline-flex items-center gap-2 text-neutral-500 hover:text-ink transition-colors duration-300"
            >
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M13 5H1m0 0l4-4M1 5l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
              All work
            </Link>
            <Link
              href={next.href}
              className="caption inline-flex items-center gap-2 text-ink hover:text-neutral-500 transition-colors duration-300"
            >
              Next: {next.title}
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
      </section>

      {/* Social cuts — vertical 9:16 films in a horizontal reel shelf */}
      {collection.socialCuts && collection.socialCuts.length > 0 && (
        <section className="bg-ink text-canvas py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <header className="mb-8 lg:mb-10">
              <p className="caption text-gold mb-3">◆ SOCIAL CUTS</p>
              <h2 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight text-canvas text-balance">
                Built for the feed.
              </h2>
            </header>
            <ul className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-2 lg:px-2 snap-x snap-mandatory">
              {collection.socialCuts.map((cut, i) => (
                <li
                  key={cut.vimeoId + i}
                  className="shrink-0 w-[240px] sm:w-[260px] lg:w-[280px] snap-start"
                >
                  <VimeoEmbed
                    vimeoId={cut.vimeoId}
                    vimeoHash={cut.vimeoHash}
                    title={cut.title ?? `${collection.title} social cut ${i + 1}`}
                    vertical
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
      <Footer />
    </>
  );
}
