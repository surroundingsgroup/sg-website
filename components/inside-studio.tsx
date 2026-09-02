"use client";

import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { RailItem } from "@/lib/locations";

/**
 * Inside the Studio — a contained, content-forward work feed.
 *
 * Two rows of portfolio cards drift in opposite directions (CSS marquee,
 * pauses on hover); each card links to its work page. Not full-bleed, not
 * pinned — a compact section on the matte ink ground. Reduced motion falls
 * back to a single manually-scrollable rail.
 */

export function InsideStudio({ items }: { items: RailItem[] }) {
  const reduce = useReducedMotion();

  // Interleave into two rows so each row mixes verticals.
  const rowA = items.filter((_, i) => i % 2 === 0);
  const rowB = items.filter((_, i) => i % 2 === 1);

  return (
    <section className="bg-ink text-canvas py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-14">
          <div>
            <p className="caption text-gold mb-4 tracking-[0.28em]">
              ◆ INSIDE THE STUDIO
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-canvas text-balance">
              The work, in motion.
            </h2>
          </div>
          <Link
            href="/work"
            className="caption inline-flex items-center gap-2 text-canvas hover:text-gold transition-colors duration-300 shrink-0"
          >
            All work
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </Link>
        </header>
      </div>

      {reduce ? (
        <ScrollRow items={items} />
      ) : (
        <div className="flex flex-col gap-5 lg:gap-6">
          <MarqueeRow items={rowA} duration={64} />
          <MarqueeRow items={rowB} duration={78} reverse />
        </div>
      )}

      <style>{`
        @keyframes studio-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes studio-marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: RailItem[];
  duration: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 lg:w-28 z-10 bg-gradient-to-r from-ink to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 lg:w-28 z-10 bg-gradient-to-l from-ink to-transparent" aria-hidden />
      <div
        className="flex w-max gap-4 lg:gap-6 hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "studio-marquee-reverse" : "studio-marquee"} ${duration}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <StudioCard key={`${item.slug}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

/** Reduced-motion fallback: one manually-scrollable row, no animation. */
function ScrollRow({ items }: { items: RailItem[] }) {
  return (
    <div className="flex gap-4 lg:gap-6 overflow-x-auto px-6 lg:px-12 pb-4 [scrollbar-width:thin]">
      {items.map((item) => (
        <StudioCard key={item.slug} item={item} />
      ))}
    </div>
  );
}

function StudioCard({ item }: { item: RailItem }) {
  return (
    <Link
      href={item.href}
      className="group relative block shrink-0 w-[260px] sm:w-[300px] lg:w-[340px] rounded-xl overflow-hidden ring-1 ring-canvas/10 hover:ring-gold/50 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.cover}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 340px, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" aria-hidden />
        <div className="absolute top-0 right-0 h-px w-12 bg-gold/60 group-hover:bg-gold transition-colors duration-300" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
          <p className="caption text-gold text-[0.62rem] mb-1.5">{item.vertical}</p>
          <h3 className="font-sans font-extrabold text-lg lg:text-xl leading-tight text-canvas group-hover:text-gold transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-xs text-canvas/60 mt-1 truncate">{item.location}</p>
        </div>
      </div>
    </Link>
  );
}
