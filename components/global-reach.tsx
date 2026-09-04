"use client";

import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";

// Client-only: d3's projection math yields microscopically different
// floats on server vs browser, so SSR-ing the map guarantees a React
// hydration mismatch. It's decorative — draw it in the browser only,
// with an aspect-matched placeholder to avoid layout shift.
const GlobalReachMap = dynamic(
  () => import("./global-reach-map").then((m) => m.GlobalReachMap),
  {
    ssr: false,
    loading: () => <div className="w-full aspect-[980/480]" aria-hidden />,
  },
);
import { Rule } from "@/components/rule";
import type { PortfolioPin, RailItem } from "@/lib/locations";

/**
 * Global reach section — dark mode, full-bleed.
 *
 * Wraps the GlobalReachMap with editorial copy positioning the agency
 * as Tampa-rooted with worldwide audience and client reach.
 *
 * Scroll-reveal: header eyebrow + headline + supporting copy + map
 * panel cascade in with staggered timing.
 */
export function GlobalReach({
  pins,
  rail,
}: {
  pins: PortfolioPin[];
  rail: RailItem[];
}) {
  const reduce = useReducedMotion();

  const child = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 28 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const },
        },
      };

  const containerProps = reduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "shown",
        viewport: { once: true, amount: 0.2 },
        variants: {
          hidden: {},
          shown: { transition: { staggerChildren: 0.14 } },
        },
      };

  return (
    <section className="bg-ink text-canvas py-24 lg:py-36 px-6 lg:px-12">
      <motion.div {...containerProps} className="max-w-[1440px] mx-auto">
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <motion.p variants={child} className="caption text-gold mb-6">
              ◆ GLOBAL PRESENCE
            </motion.p>
            <motion.h2
              variants={child}
              className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-tight text-balance"
            >
              Work that reaches the world.
            </motion.h2>
            <Rule className="bg-gold mt-6" />
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <motion.p
              variants={child}
              className="text-lg lg:text-xl text-canvas/70 leading-relaxed"
            >
              An owned-media audience on four continents, and a production
              team that goes where the work is, from the Bahamas and the
              Riviera to Dubai and Bangkok. When our clients launch, the
              world is already watching.
            </motion.p>
          </div>
        </header>

        <motion.div
          variants={child}
          className="bg-canvas/[0.03] p-6 lg:p-12 border border-canvas/10"
        >
          <GlobalReachMap pins={pins} rail={rail} />
        </motion.div>
      </motion.div>
    </section>
  );
}
