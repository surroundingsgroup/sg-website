"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collectionCover, type WorkCollection } from "@/lib/work";

/**
 * Filterable portfolio grid for /work.
 *
 * Default order interleaves the verticals (round-robin) so the top of
 * the page shows the studio's range instead of a run of same-category
 * shoots — the data file groups yachts together, which read marine-heavy.
 *
 * Filter chips are derived from each collection's vertical. "All" shows
 * the interleaved set; picking a vertical narrows to it.
 */

/** Round-robin through the verticals so adjacent cards differ. */
function interleaveByVertical(collections: WorkCollection[]): WorkCollection[] {
  const groups = new Map<string, WorkCollection[]>();
  for (const c of collections) {
    const list = groups.get(c.vertical) ?? [];
    list.push(c);
    groups.set(c.vertical, list);
  }
  const queues = [...groups.values()];
  const out: WorkCollection[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const queue of queues) {
      const next = queue.shift();
      if (next) {
        out.push(next);
        added = true;
      }
    }
  }
  return out;
}

export function WorkGrid({
  collections,
}: {
  collections: WorkCollection[];
}) {
  const [active, setActive] = useState<string>("all");

  const interleaved = useMemo(
    () => interleaveByVertical(collections),
    [collections],
  );

  /** Vertical chips in first-appearance order, with counts */
  const verticals = useMemo(() => {
    const seen = new Map<string, number>();
    for (const c of collections) {
      seen.set(c.vertical, (seen.get(c.vertical) ?? 0) + 1);
    }
    return [...seen.entries()].map(([name, count]) => ({ name, count }));
  }, [collections]);

  const visible =
    active === "all"
      ? interleaved
      : interleaved.filter((c) => c.vertical === active);

  return (
    <>
      {/* Filter chips */}
      <div className="mb-10 lg:mb-14">
        <ul className="flex flex-wrap items-center gap-3 lg:gap-4 border-b border-neutral-200 pb-6 lg:pb-8">
          <li>
            <button
              type="button"
              onClick={() => setActive("all")}
              className={`caption px-4 py-2 transition-colors duration-200 cursor-pointer ${
                active === "all"
                  ? "bg-ink text-canvas"
                  : "text-neutral-500 hover:text-ink"
              }`}
            >
              ALL ({collections.length})
            </button>
          </li>
          {verticals.map((v) => (
            <li key={v.name}>
              <button
                type="button"
                onClick={() => setActive(v.name)}
                className={`caption px-4 py-2 transition-colors duration-200 cursor-pointer ${
                  active === v.name
                    ? "bg-ink text-canvas"
                    : "text-neutral-500 hover:text-ink"
                }`}
              >
                {v.name.toUpperCase()}{" "}
                <span
                  className={
                    active === v.name ? "text-canvas/60" : "text-neutral-400"
                  }
                >
                  ({v.count})
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Collection grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
        {visible.map((collection) => {
          const cover = collectionCover(collection);
          return (
            <li key={collection.slug}>
              <Link href={collection.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    fill
                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="caption text-neutral-500 mt-5 mb-2">
                  {collection.vertical}
                </p>
                <h2 className="font-sans font-extrabold text-xl lg:text-2xl tracking-tight text-ink leading-tight">
                  {collection.title}
                </h2>
                <span className="caption inline-flex items-center gap-2 mt-3 text-neutral-500 group-hover:text-neutral-500 transition-colors duration-300">
                  View collection
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
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
