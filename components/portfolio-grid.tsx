"use client";

/**
 * Vertical-page portfolio wall.
 *
 * Shows a tidy 8-tile grid by default. When a vertical has more than eight
 * collections, an expand bar reveals the rest — kept at a fixed 4-column
 * desktop layout so expanding adds rows instead of resizing every card.
 * Verticals with eight or fewer collections adapt the column count to the
 * total and show no bar.
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type WorkCollection, collectionCover } from "@/lib/work";

const INITIAL = 8;

export function PortfolioGrid({
  collections,
  label,
}: {
  collections: WorkCollection[];
  label: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const count = collections.length;
  const hasMore = count > INITIAL;
  const visible = hasMore && !expanded ? collections.slice(0, INITIAL) : collections;

  // Fixed 4-col when the expand bar is in play; otherwise balance to the count
  // so the last row never orphans a single card.
  const lgCols = hasMore
    ? "lg:grid-cols-4"
    : count <= 2
      ? "lg:grid-cols-2"
      : count === 3
        ? "lg:grid-cols-3"
        : count === 4
          ? "lg:grid-cols-4"
          : count === 5
            ? "lg:grid-cols-5"
            : count === 6
              ? "lg:grid-cols-3"
              : count === 7
                ? "lg:grid-cols-4"
                : "lg:grid-cols-4";
  const gridCols = `${count <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2"} ${lgCols}`;

  return (
    <>
      <ul className={`grid ${gridCols} gap-4 lg:gap-5`}>
        {visible.map((c) => {
          const cover = collectionCover(c);
          return (
            <li key={c.slug}>
              <Link
                href={c.href}
                className="group block relative overflow-hidden rounded-lg bg-ink aspect-[4/3] shadow-[0_14px_36px_-22px_rgba(15,15,15,0.5)]"
              >
                <Image
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/5 group-hover:from-ink group-hover:via-ink/50 transition-all duration-500"
                  aria-hidden
                />
                <div
                  className="absolute top-0 right-0 w-10 h-px bg-gold/60"
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-5 text-canvas">
                  <p className="caption text-gold mb-1.5 text-[0.68rem]">
                    {c.vertical}
                  </p>
                  <h3 className="font-sans font-extrabold text-base lg:text-xl leading-[1.1] text-balance group-hover:text-gold transition-colors duration-300">
                    {c.title}
                  </h3>
                  {c.location && (
                    <p className="text-xs text-canvas/70 mt-1">{c.location}</p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {hasMore && !expanded && (
        <div className="mt-10 lg:mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-expanded={false}
            className="group caption inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-7 py-3.5 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas"
          >
            View more {label} projects
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
              className="text-gold transition-transform duration-300 group-hover:rotate-90"
            >
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
