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

      {/* Social cuts — vertical films + stills as a social-feed wall */}
      {((collection.socialCuts?.length ?? 0) > 0 ||
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
            <ul className="flex gap-5 lg:gap-6 overflow-x-auto pb-6 -mx-6 px-6 lg:-mx-2 lg:px-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
