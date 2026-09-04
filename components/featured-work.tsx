"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { featuredProjects, journalTypeLabel } from "@/lib/featured-work";
import { Rule } from "@/components/rule";

/**
 * Studio Journal feed — homepage section.
 *
 * Mixed media hub showing recent case studies, BTS, client wins,
 * and studio news. Each card carries a small gold "type" chip so
 * visitors immediately see what kind of entry they're looking at.
 *
 * Uniform 3-col grid. Link out goes to /journal (the full hub).
 *
 * Scroll-reveal: header cascades in, then the project cards
 * stagger in. Each piece uses a 24px upward translate + opacity fade.
 */

export function FeaturedWork() {
  const reduce = useReducedMotion();

  const child = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const },
        },
      };

  const headerProps = reduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "shown",
        viewport: { once: true, amount: 0.3 },
        variants: {
          hidden: {},
          shown: { transition: { staggerChildren: 0.1 } },
        },
      };

  const gridProps = reduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "shown",
        viewport: { once: true, amount: 0.1 },
        variants: {
          hidden: {},
          shown: { transition: { staggerChildren: 0.12 } },
        },
      };

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <motion.header
          {...headerProps}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16 max-w-5xl"
        >
          <div>
            <motion.p variants={child} className="caption text-neutral-500 mb-4">
              ◆ STUDIO JOURNAL
            </motion.p>
            <motion.h2
              variants={child}
              className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance"
            >
              Inside the studio.
            </motion.h2>
            <Rule className="bg-ink mt-6" />
          </div>
          <motion.div variants={child}>
            <Link
              href="/journal"
              className="caption inline-flex items-center gap-2 text-ink hover:text-neutral-500 transition-colors duration-300 shrink-0"
            >
              Step inside
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
        </motion.header>

        {/* Layout adapts to how many entries are present: 3-up grid
            for a full set, 2-up for two, single centered feature
            card when there's only one. Keeps the section from looking
            orphaned while we're still backfilling case studies. */}
        <motion.ul
          {...gridProps}
          className={
            featuredProjects.length === 1
              ? "max-w-2xl mx-auto"
              : featuredProjects.length === 2
                ? "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          }
        >
          {featuredProjects.map((project) => (
            <motion.li variants={child} key={project.slug}>
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof featuredProjects)[number];
}) {
  return (
    <Link href={project.href} className="group block h-full">
      <article className="relative h-full overflow-hidden bg-ink text-canvas transition-all duration-500 group-hover:bg-neutral-800 flex flex-col">
        {/* Image area — real photo if provided, else dark placeholder */}
        <div className="aspect-[4/3] relative overflow-hidden border-b border-canvas/10">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? `${project.client} · ${project.vertical}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <span className="font-sans font-extrabold text-3xl lg:text-4xl text-canvas/25 text-center leading-tight">
                {project.client}
              </span>
            </div>
          )}
          {/* Subtle gold accent corner */}
          <div
            className="absolute top-0 right-0 w-16 h-px bg-ink/40 z-10"
            aria-hidden
          />
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex-1 flex flex-col">
          {/* Type chip */}
          <p className="caption text-gold mb-4">
            {journalTypeLabel(project.type)}
          </p>

          <div className="caption text-canvas/50 mb-3 flex items-center gap-3 flex-wrap">
            <span>{project.vertical}</span>
            {project.tag && (
              <>
                <span className="opacity-50">·</span>
                <span>{project.tag}</span>
              </>
            )}
          </div>

          <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-tight mb-4 text-balance group-hover:text-neutral-500 transition-colors duration-300">
            {project.client}
          </h3>

          <p className="text-base lg:text-lg text-canvas/80 leading-snug mb-6 flex-1">
            {project.headline}
          </p>

          <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-neutral-500 transition-colors duration-300">
            Read entry
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
