"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

/**
 * Careers page sections — editorial composition with the same
 * scroll-reveal language as the homepage (AboutSummary/CtaBanner):
 * staggered opacity + y-translate, asymmetric 12-col grids, hairline
 * rules instead of boxed cards. Reduced-motion users get static layout.
 */

const EASE = [0.22, 0.61, 0.36, 1] as const;

function useReveal(stagger = 0.1) {
  const reduce = useReducedMotion();
  const child = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      };
  const container = reduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "shown" as const,
        viewport: { once: true, amount: 0.2 },
        variants: {
          hidden: {},
          shown: { transition: { staggerChildren: stagger } },
        },
      };
  return { child, container };
}

/** Short accent rule under section headlines — the page's splitting device. */
function Rule({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block w-14 h-[3px] mt-6 ${className}`} />;
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function CareersHero() {
  const { child, container } = useReveal(0.12);

  return (
    <section className="bg-canvas pt-36 lg:pt-44 pb-16 lg:pb-20 px-6 lg:px-12">
      <motion.div {...container} className="max-w-[1200px] mx-auto">
        <motion.p variants={child} className="caption text-neutral-500 mb-6">
          ◆ CAREERS
        </motion.p>
        <motion.h1
          variants={child}
          className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-ink max-w-5xl text-balance"
        >
          Build the agency premium brands actually deserve.
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 mt-10 lg:mt-14">
          <motion.p
            variants={child}
            className="lg:col-start-6 lg:col-span-7 text-xl lg:text-3xl text-ink leading-[1.25] font-light max-w-2xl text-balance"
          >
            We&apos;re not always hiring, but we&apos;re always meeting people.{" "}
            <span className="text-ink/55">
              Get in our talent pool now — when a seat opens in your
              discipline, you&apos;re the first call.
            </span>
          </motion.p>
        </div>

        <motion.a
          variants={child}
          href="#roles"
          className="group caption inline-flex items-center gap-3 text-ink hover:text-neutral-500 transition-colors duration-300 mt-12 lg:mt-16"
        >
          See the roles we recruit for
          <Arrow className="rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
        </motion.a>

        {/* Team photo — editorial break between the statement and the
            marquee, annotated DV-style. */}
        <motion.figure variants={child} className="mt-14 lg:mt-20">
          <Image
            src="/images/team/team-photo.jpg"
            alt="The Surroundings Group team"
            width={1800}
            height={896}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="w-full h-auto"
            priority
          />
          <figcaption className="flex items-center justify-between mt-4">
            <span className="caption text-neutral-500">◆ THE TEAM</span>
            <span className="caption text-neutral-500">TAMPA, FL</span>
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Open roles — editorial list rows                                    */
/* ------------------------------------------------------------------ */

function mailtoLink(subject: string) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
}

export function OpenRolesList() {
  const { child, container } = useReveal(0.07);

  return (
    <section
      id="roles"
      className="bg-[#EFE7DA] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-20"
    >
      <motion.div {...container} className="max-w-[1200px] mx-auto">
        <motion.header variants={child} className="mb-8 lg:mb-10 max-w-3xl">
          <p className="caption text-neutral-500 mb-4">◆ TALENT POOL</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
            The roles we recruit for.
          </h2>
          <Rule className="bg-ink" />
          <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-6">
            We keep a bench of people we&apos;d hire the moment a seat opens.
            These are the disciplines we build it around. Get in the pool for
            yours.
          </p>
        </motion.header>

        {jobs.length > 0 ? (
          <>
            <ul className="border-t border-ink/15">
              {jobs.map((job) => (
                <motion.li variants={child} key={job.slug}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-y-2 gap-x-6 py-7 lg:py-9 border-b border-ink/10 hover:border-ink/40 transition-colors duration-300"
                  >
                    <h3 className="md:col-span-7 font-sans font-extrabold text-2xl lg:text-[2.5rem] leading-tight tracking-tight text-ink group-hover:text-neutral-500 transition-colors duration-300 text-balance">
                      {job.title}
                    </h3>
                    <span className="md:col-span-4 caption text-neutral-600">
                      {job.type} · {job.location}
                    </span>
                    <span className="hidden md:flex md:col-span-1 justify-end text-neutral-400 group-hover:text-neutral-500 transition-colors duration-300">
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p
              variants={child}
              className="text-sm text-neutral-700 mt-8 leading-relaxed"
            >
              Don&apos;t see your discipline?{" "}
              <Link
                href={mailtoLink("Talent Pool — Introduction")}
                className="underline text-ink hover:text-neutral-500 transition-colors"
              >
                Introduce yourself anyway
              </Link>{" "}
              — we keep every strong introduction on file.
            </motion.p>
          </>
        ) : (
          <motion.div
            variants={child}
            className="border-t border-neutral-200 pt-10"
          >
            <p className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance max-w-2xl">
              We&apos;re between formal openings — but the pool never closes.
            </p>
            <p className="text-sm text-neutral-700 max-w-md mb-6 leading-relaxed">
              If you&apos;re a vertical-fluent practitioner in creative,
              strategy, social, digital, or operations, introduce yourself.
              We keep every strong introduction on file for when a seat opens.
            </p>
            <Link
              href={mailtoLink("Talent Pool — Introduction")}
              className="caption inline-flex items-center gap-2 text-ink hover:text-neutral-500 transition-colors"
            >
              Introduce yourself
              <Arrow />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why people stay — sticky headline + flowing rows                    */
/* ------------------------------------------------------------------ */

const culture = [
  {
    title: "Vertical-focused.",
    copy: "We go deep in a handful of premium categories instead of chasing everything. You build real fluency in the industries you work in.",
  },
  {
    title: "Premium markets.",
    copy: "Yachts, estates, jets, resorts, and the brands at the top of their category. You work in the world most people only see in a feed.",
  },
  {
    title: "Energetic and active.",
    copy: "This isn't a heads-down agency. Brainstorms are a team sport, the room runs on real energy, and the work moves fast.",
  },
  {
    title: "Collaborative by default.",
    copy: "One in-house team — no silos, no handoffs to a freelance network. The people in the room are the people making the work.",
  },
  {
    title: "Culture is the point.",
    copy: "We're a culture-first shop. The team, the standard we hold, and the way we treat each other are why people want to be here.",
  },
  {
    title: "Real ownership.",
    copy: "Everything that goes out the door is something you'd put in your portfolio, distributed through editorial channels we own.",
  },
];

export function WhatPeopleLove() {
  const { child, container } = useReveal(0.08);

  return (
    <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12 border-t border-neutral-200">
      <motion.div
        {...container}
        className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12"
      >
        <motion.div
          variants={child}
          className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="caption text-neutral-500 mb-5">◆ THE CULTURE</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
            What people love.
          </h2>
          <Rule className="bg-ink" />
        </motion.div>

        <div className="lg:col-span-8">
          {culture.map((b, i) => (
            <motion.div
              variants={child}
              key={b.title}
              className={`grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-7 lg:py-8 border-l-2 border-l-transparent hover:border-l-ink hover:pl-5 transition-all duration-300 ${
                i === 0 ? "" : "border-t border-t-neutral-300"
              }`}
            >
              <h3 className="md:col-span-5 font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight text-balance">
                {b.title}
              </h3>
              <p className="md:col-span-7 text-base text-neutral-800 leading-relaxed">
                {b.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing CTA — gold finale                                           */
/* ------------------------------------------------------------------ */

export function CareersCta() {
  const { child, container } = useReveal(0.12);

  return (
    <section className="bg-canvas text-ink py-20 lg:py-28 px-6 lg:px-12 border-t border-neutral-200">
      <motion.div
        {...container}
        className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10"
      >
        <motion.div variants={child} className="max-w-2xl">
          <p className="caption text-neutral-500 mb-5">◆ JOIN US</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
            Sound like your kind of room?
          </h2>
          <Rule className="bg-gold" />
        </motion.div>
        <motion.div variants={child} className="shrink-0">
          <a
            href="#roles"
            className="inline-block bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-ink hover:text-canvas transition-colors duration-300 text-center"
          >
            See the roles
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
