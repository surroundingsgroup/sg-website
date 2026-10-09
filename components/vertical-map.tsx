"use client";

import dynamic from "next/dynamic";
import { Rule } from "@/components/rule";
import type { PortfolioPin } from "@/lib/locations";

// Client-only: the d3 projection yields micro-different floats server vs
// browser, so SSR-ing the map guarantees a hydration mismatch.
const FloridaMap = dynamic(
  () => import("./florida-map").then((m) => m.FloridaMap),
  {
    ssr: false,
    loading: () => <div className="w-full aspect-[800/660]" aria-hidden />,
  },
);

/**
 * "Where we work" section for a vertical page — a Florida-focused map of the
 * vertical's communities, with clickable pins. Rendered only when the
 * vertical has located projects.
 */
export function VerticalMap({
  pins,
  eyebrow = "◆ WHERE WE WORK",
  headline = "Communities across Florida.",
  body,
}: {
  pins: PortfolioPin[];
  eyebrow?: string;
  headline?: string;
  body?: string;
}) {
  if (!pins.length) return null;
  const count = pins.reduce((sum, p) => sum + p.projects.length, 0);

  return (
    <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 lg:mb-14">
          <div className="lg:col-span-7">
            <p className="caption text-gold mb-5">{eyebrow}</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-tight text-balance">
              {headline}
            </h2>
            <Rule className="bg-gold mt-6" />
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <p className="text-lg text-canvas/70 leading-relaxed">
              {body ??
                "From Tampa and St. Petersburg to Sarasota, Delray Beach, and the Gulf Coast, we shoot and run content for communities across the state. Explore the map to see the work by location."}
            </p>
          </div>
        </header>

        <div className="bg-canvas/[0.03] p-4 sm:p-8 lg:p-12 border border-canvas/10">
          <FloridaMap pins={pins} />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span className="caption text-canvas/60 inline-flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-gold ring-2 ring-canvas/90" aria-hidden />
              {count} {count === 1 ? "property" : "properties"} on the map
            </span>
            <span className="caption text-canvas/40">
              Click a pin to open the work
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
