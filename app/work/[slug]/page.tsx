import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { VimeoEmbed } from "@/components/vimeo-embed";
import { collectionCover } from "@/lib/work";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAllProjects,
} from "@/lib/sanity/queries";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getProjectBySlug(slug);
  if (!collection) return {};
  const cover = collectionCover(collection);
  return {
    title: `${collection.title} · Work`,
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
  const collection = await getProjectBySlug(slug);
  if (!collection) notFound();

  const all = await getAllProjects();
  const currentIndex = all.findIndex((c) => c.slug === slug);
  const next = all[(currentIndex + 1) % all.length];

  // Full-bleed hero: explicit heroImage, else the gallery cover.
  const hero = collection.heroImage ?? collection.images[0] ?? null;
  // When the cover doubles as the hero, drop it from the gallery grid.
  const galleryImages = collection.heroImage
    ? collection.images
    : collection.images.slice(1);

  return (
    <>
      <Nav />

      {hero ? (
        <section className="relative bg-ink text-canvas overflow-hidden flex items-end min-h-[60vh] sm:min-h-[76vh]">
          <Image
            src={hero.src}
            alt={hero.alt || collection.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
          {/* Legibility scrim — brighter at top, firmly dark behind the copy */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/15"
            aria-hidden
          />
          <div className="relative w-full max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-16 lg:pb-24">
            <p className="caption text-gold mb-5">
              ◆ {collection.vertical.toUpperCase()}
            </p>
            <h1
              className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-balance"
              style={{ textShadow: "0 2px 40px rgba(15,15,15,0.45)" }}
            >
              {collection.title}
            </h1>
            {collection.description && (
              <p
                className="mt-6 max-w-2xl text-lg lg:text-xl text-canvas/90 leading-relaxed"
                style={{ textShadow: "0 1px 24px rgba(15,15,15,0.6)" }}
              >
                {collection.description}
              </p>
            )}
          </div>
        </section>
      ) : (
        <PageHero
          eyebrow={collection.vertical.toUpperCase()}
          title={collection.title}
          subhead={collection.description}
        />
      )}

      {/* Walkthrough / brand film — cinematic 16:9, on-demand playback */}
      {collection.video && (
        <section className="bg-canvas px-6 lg:px-12 pt-12 lg:pt-16 pb-10 lg:pb-14">
          <div className="max-w-[1200px] mx-auto overflow-hidden rounded-xl shadow-[0_30px_70px_-30px_rgba(15,15,15,0.5)]">
            <VimeoEmbed
              vimeoId={collection.video.vimeoId}
              vimeoHash={collection.video.vimeoHash}
              title={collection.video.title ?? `${collection.title} film`}
            />
          </div>
        </section>
      )}

      {/* Masonry gallery — CSS columns preserve each image's aspect ratio */}
      <section className="bg-canvas pt-14 lg:pt-20 pb-16 lg:pb-24 px-6 lg:px-12">
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

          {/* About the property — narrative + factsheet */}
          {(collection.story ||
            collection.developer ||
            collection.architect ||
            collection.completed ||
            collection.residences ||
            collection.neighborhood) && (
            <div className="mb-12 lg:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="caption text-gold mb-4">◆ ABOUT THE PROPERTY</p>
                {collection.story &&
                  collection.story
                    .split("\n")
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((para, i) => (
                      <p
                        key={i}
                        className="text-lg lg:text-xl leading-relaxed text-ink/80 [&:not(:first-child)]:mt-5"
                      >
                        {para}
                      </p>
                    ))}
              </div>
              <div className="lg:col-span-5 lg:pt-11">
                <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-10 gap-y-5">
                  {[
                    { label: "Developer", value: collection.developer },
                    { label: "Architecture + design", value: collection.architect },
                    { label: "Completed", value: collection.completed },
                    { label: "Residences", value: collection.residences },
                    { label: "Neighborhood", value: collection.neighborhood },
                  ]
                    .filter((f) => f.value)
                    .map((f) => (
                      <div key={f.label} className="border-t border-neutral-200 pt-3">
                        <dt className="caption text-neutral-500 mb-1">{f.label}</dt>
                        <dd className="font-sans font-semibold text-base lg:text-lg text-ink">
                          {f.value}
                        </dd>
                      </div>
                    ))}
                </dl>
              </div>
            </div>
          )}

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.src} className="mb-6 break-inside-avoid">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-auto rounded-lg"
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

      {/* Social cuts — vertical films + stills as a social-feed wall */}
      {((collection.reels?.length ?? 0) > 0 ||
        (collection.socialCuts?.length ?? 0) > 0 ||
        (collection.verticalImages?.length ?? 0) > 0) && (
        <section className="relative overflow-hidden bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
          {/* ambient glow — warm amber + taupe, low opacity */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(55% 45% at 15% 22%, rgba(255,189,131,0.12), transparent 70%), radial-gradient(45% 42% at 92% 82%, rgba(188,169,136,0.10), transparent 72%)",
            }}
          />
          <div className="relative max-w-[1280px] mx-auto">
            <header className="mb-10 lg:mb-14 max-w-2xl">
              <p className="caption text-gold mb-3">◆ SOCIAL CUTS</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas text-balance">
                Built for the feed.
              </h2>
              <p className="text-base lg:text-lg text-canvas/60 mt-4 leading-relaxed">
                Vertical films and stills cut for Instagram, TikTok, and
                YouTube Shorts, the format the buyer actually scrolls.
              </p>
            </header>
            <ul className="flex gap-5 lg:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory [justify-content:safe_center] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {collection.reels?.map((reel, i) => (
                <li
                  key={"reel-" + i}
                  className="group shrink-0 w-[250px] sm:w-[270px] lg:w-[290px] snap-start"
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-canvas/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] ring-1 ring-transparent transition duration-500 group-hover:-translate-y-1.5 group-hover:ring-gold/40">
                    <video
                      src={reel.url + "#t=0.1"}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full bg-ink object-cover"
                      aria-label={reel.title ?? `${collection.title} reel ${i + 1}`}
                    />
                    <div
                      className="pointer-events-none absolute top-0 right-0 h-px w-12 bg-gold/60"
                      aria-hidden
                    />
                  </div>
                </li>
              ))}
              {collection.socialCuts?.map((cut, i) => (
                <li
                  key={"cut-" + cut.vimeoId + i}
                  className="group shrink-0 w-[250px] sm:w-[270px] lg:w-[290px] snap-start"
                >
                  <div className="rounded-2xl overflow-hidden border border-canvas/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] ring-1 ring-transparent transition duration-500 group-hover:-translate-y-1.5 group-hover:ring-gold/40">
                    <VimeoEmbed
                      vimeoId={cut.vimeoId}
                      vimeoHash={cut.vimeoHash}
                      title={
                        cut.title ?? `${collection.title} social cut ${i + 1}`
                      }
                      vertical
                    />
                  </div>
                </li>
              ))}
              {collection.verticalImages?.map((img, i) => (
                <li
                  key={"vimg-" + i}
                  className="group shrink-0 w-[250px] sm:w-[270px] lg:w-[290px] snap-start"
                >
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-canvas/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] ring-1 ring-transparent transition duration-500 group-hover:-translate-y-1.5 group-hover:ring-gold/40">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="290px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute top-0 right-0 w-12 h-px bg-gold/60"
                      aria-hidden
                    />
                  </div>
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
