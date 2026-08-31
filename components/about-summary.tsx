"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Rule } from "@/components/rule";

/**
 * About snippet for the homepage — positioning statement designed
 * to read as editorial and load with SEO-relevant terms naturally.
 *
 * SEO-targeted keywords integrated: "Tampa creative agency",
 * "luxury brands", "marine", "real estate development", "private
 * aviation", "hospitality", "luxury goods", "in-house production",
 * "owned media", "editorial channels". No keyword stuffing —
 * each term lives inside a real sentence.
 *
 * Scroll-reveal animation: the eyebrow, headline, lead paragraph,
 * body paragraph, and CTA cascade in one after another as the
 * section enters view. Subtle y-translate + opacity, staggered by
 * 0.12s. Reduced-motion users get the static layout.
 *
 * Long-form story + team grid + NN spotlight live on /about.
 */
export function AboutSummary() {
  const reduce = useReducedMotion();

  const variants = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
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
        viewport: { once: true, amount: 0.25 },
        variants: {
          hidden: {},
          shown: { transition: { staggerChildren: 0.12 } },
        },
      };

  return (
    <section className="bg-canvas text-ink py-24 lg:py-36 px-6 lg:px-12 border-b border-neutral-200">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          {...containerProps}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        >
          <div className="lg:col-span-4">
            <motion.p
              variants={variants}
              className="caption text-neutral-500 mb-6"
            >
              ◆ ABOUT
            </motion.p>
            <motion.h2
              variants={variants}
              className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance"
            >
              Fluent in the world&apos;s premium markets.
            </motion.h2>
            <Rule className="bg-gold mt-6" />
          </div>

          <div className="lg:col-span-8 space-y-6">
            <motion.p
              variants={variants}
              className="text-2xl lg:text-4xl text-ink leading-[1.2] font-light text-balance"
            >
              Surroundings Group is a creative agency for premium brands. One
              in-house team, focused on the{" "}
              <span className="amber-underline">premium verticals</span> we know
              inside out.{" "}
              <span className="text-ink/55">
                Our clients collaborate across categories to produce work no
                single-vertical agency could match.
              </span>
            </motion.p>
            <motion.p
              variants={variants}
              className="text-base lg:text-lg text-ink/80 leading-relaxed"
            >
              We cover marine, real estate development, private aviation,
              hospitality, luxury goods, and a few categories in between.
              Full-service digital marketing, all in-house. Strategy,
              production, paid, and PR run by senior people who&apos;ve spent
              careers in the industries we serve. Our clients borrow from each
              other. A yacht from our marine roster might anchor a real estate
              launch film. A car reveal lands at a hospitality activation.
              Then we extend the reach. Our owned-media network runs ten
              editorial channels with 255M+ viewers a year. Most agencies buy
              attention. We built ours.
            </motion.p>
            <motion.div variants={variants} className="pt-4">
              <Link
                href="/about"
                className="caption inline-flex items-center gap-2 text-ink hover:opacity-70 transition-opacity duration-300"
              >
                Read the full story
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
