"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * Inside the Studio — a pinned, scroll-driven reel showcasing the studio's
 * work. Full-bleed portfolio covers cross-dissolve with a subtle camera
 * dolly as the user scrolls; each beat names the piece and links to its
 * work page. Replaces the old journal feed.
 *
 * A persistent "INSIDE THE STUDIO" label anchors the section. Mobile +
 * reduced-motion fall back to a stacked sequence of the same pieces.
 *
 * All useTransform input ranges are clamped to [0, 1] — values outside
 * that range crash motion's WAAPI keyframe binding.
 */

type ReelBeat = {
  slug: string;
  title: string;
  vertical: string;
  /** Client credit shown in the eyebrow. "" = subject is the client. */
  client: string;
  /** Agency-voice line — what the work is. */
  line: string;
  image: string;
  alt: string;
};

const REEL: ReelBeat[] = [
  {
    slug: "sikorsky-s76",
    title: "Sikorsky S-76",
    vertical: "Private Aviation",
    client: "Flexjet",
    line: "A charter film across the Miami-to-Bimini crossing.",
    image: "/images/work/sikorsky-s76/sikorsky-s76-01.jpg",
    alt: "Black Sikorsky S-76 on a waterfront helipad with a yacht beyond",
  },
  {
    slug: "skyfall",
    title: "M/Y Skyfall",
    vertical: "Marine",
    client: "Northrop + Johnson",
    line: "Launch coverage and editorial for a superyacht in the Bahamas.",
    image: "/images/work/skyfall/skyfall-02.jpg",
    alt: "Top-down aerial of a superyacht with tenders over turquoise flats",
  },
  {
    slug: "naples-jet-center",
    title: "Naples Jet Center",
    vertical: "Private Aviation",
    client: "",
    line: "A brand film for a full-service FBO and maintenance base.",
    image: "/images/work/naples-jet-center/naples-jet-center-01.jpg",
    alt: "Private jet mirrored on a wet ramp outside the hangar at golden hour",
  },
  {
    slug: "los-suenos",
    title: "Los Sueños Resort + Marina",
    vertical: "Resorts + Travel",
    client: "Los Sueños",
    line: "An editorial campaign for a Pacific resort and marina.",
    image: "/images/work/los-suenos/los-suenos-01.jpg",
    alt: "Sunrise aerial of Los Sueños marina, jungle hillside, and Pacific coastline",
  },
  {
    slug: "falcon-2000ex",
    title: "Falcon 2000EX",
    vertical: "Private Aviation",
    client: "",
    line: "A listing package built for brokerage decks and the feed.",
    image: "/images/work/falcon-2000ex/falcon-2000ex-01.jpg",
    alt: "Falcon 2000EX in full mirror reflection on a wet ramp",
  },
  {
    slug: "aquanova",
    title: "M/Y Aquanova",
    vertical: "Marine",
    client: "Iconic Yachts",
    line: "A charter lifestyle shoot in the turquoise shallows off Nassau.",
    image: "/images/work/aquanova/aquanova-01.jpg",
    alt: "Sport yacht running through turquoise water off Nassau",
  },
  {
    slug: "cora-residences",
    title: "Cora Residences",
    vertical: "Multifamily",
    client: "",
    line: "A lease-up content program for a downtown Tampa tower.",
    image: "/images/work/cora-residences/cora-residences-01.jpg",
    alt: "Aerial of a landscaped rooftop pool deck atop a residential tower",
  },
  {
    slug: "gg-timepieces",
    title: "G&G Timepieces",
    vertical: "Luxury Goods",
    client: "",
    line: "An editorial campaign for a fine-watch maker.",
    image: "/images/work/gg-timepieces/gg-timepieces-01.jpg",
    alt: "Editorial close-up of a fine timepiece on a cream backdrop",
  },
];

function eyebrow(beat: ReelBeat, index: number) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <p className="caption text-gold mb-5 tracking-[0.28em]">
      {num} <span className="text-canvas/50">/</span>{" "}
      <span className="text-canvas/70">{beat.vertical.toUpperCase()}</span>
      {beat.client && (
        <>
          {" "}
          <span className="text-canvas/40">·</span>{" "}
          <span className="text-canvas/70">{beat.client.toUpperCase()}</span>
        </>
      )}
    </p>
  );
}

export function InsideStudioReel() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) return <StaticReel />;

  const total = REEL.length;

  return (
    <section ref={ref} className="relative h-[680vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        {REEL.map((beat, i) => (
          <ReelImageLayer
            key={beat.slug}
            beat={beat}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        <TransitionFlash progress={scrollYProgress} total={total} />

        {/* Persistent section label */}
        <div className="absolute top-8 left-6 lg:top-12 lg:left-16 z-30">
          <p className="caption text-gold/90 tracking-[0.3em]">
            ◆ INSIDE THE STUDIO
          </p>
        </div>

        {REEL.map((beat, i) => (
          <ReelCaption
            key={beat.slug}
            beat={beat}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        <ProgressRail progress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Background image layer                                             */
/* ------------------------------------------------------------------ */

function ReelImageLayer({
  beat,
  index,
  total,
  progress,
}: {
  beat: ReelBeat;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const fadeIn = Math.max(0, start - 0.04);
  const fadeOut = Math.min(1, end + 0.04);

  const opacity = useTransform(
    progress,
    [fadeIn, start + span * 0.2, end - span * 0.2, fadeOut],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0],
  );

  const scale = useTransform(
    progress,
    [Math.max(0, start - span * 0.1), Math.min(1, end + span * 0.1)],
    [1.0, 1.2],
  );

  const yPan = useTransform(
    progress,
    [Math.max(0, start), Math.min(1, end)],
    [0, -40],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale, y: yPan }} className="absolute inset-0">
        <Image
          src={beat.image}
          alt={beat.alt}
          fill
          sizes="100vw"
          quality={78}
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/45" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Transition flash                                                   */
/* ------------------------------------------------------------------ */

function TransitionFlash({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const span = 1 / total;
  const input: number[] = [0];
  const output: number[] = [0];
  for (let i = 1; i < total; i++) {
    const boundary = i * span;
    const before = Math.max(0, boundary - span * 0.05);
    const after = Math.min(1, boundary + span * 0.05);
    input.push(before, boundary, after);
    output.push(0, 0.55, 0);
  }
  input.push(1);
  output.push(0);
  const flash = useTransform(progress, input, output);
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 z-20 bg-ink pointer-events-none"
      style={{ opacity: flash }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Foreground caption per beat                                        */
/* ------------------------------------------------------------------ */

function ReelCaption({
  beat,
  index,
  total,
  progress,
}: {
  beat: ReelBeat;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.01),
      Math.max(0, Math.min(1, start + span * 0.22)),
      Math.max(0, Math.min(1, end - span * 0.22)),
      Math.min(1, end + 0.01),
    ],
    [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    [
      Math.max(0, Math.min(1, start)),
      Math.max(0, Math.min(1, start + span * 0.3)),
      Math.max(0, Math.min(1, end - span * 0.05)),
      Math.min(1, end + span * 0.05),
    ],
    [40, 0, -20, -60],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 z-30 px-6 lg:px-16 pb-20 lg:pb-28"
    >
      <div className="max-w-[1400px] mx-auto">
        {eyebrow(beat, index)}
        <h2 className="font-sans font-extrabold text-canvas leading-[0.98] tracking-tight text-balance text-4xl md:text-5xl lg:text-6xl max-w-4xl">
          {beat.title}
        </h2>
        <p className="text-lg lg:text-xl text-canvas/70 mt-4 max-w-2xl leading-snug">
          {beat.line}
        </p>
        <Link
          href={`/work/${beat.slug}`}
          className="caption inline-flex items-center gap-3 mt-8 text-canvas/75 hover:text-gold transition-colors group"
        >
          View project
          <svg width="16" height="11" viewBox="0 0 14 10" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gold progress rail                                                 */
/* ------------------------------------------------------------------ */

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-canvas/10 z-40" aria-hidden>
      <motion.div className="h-full bg-gold origin-left" style={{ scaleX: progress }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion / mobile fallback                                   */
/* ------------------------------------------------------------------ */

function StaticReel() {
  return (
    <section className="bg-ink">
      <div className="px-6 lg:px-16 pt-10 lg:pt-14">
        <p className="caption text-gold/90 tracking-[0.3em]">
          ◆ INSIDE THE STUDIO
        </p>
      </div>
      <div className="space-y-2 mt-6">
        {REEL.map((beat, i) => (
          <Link
            key={beat.slug}
            href={`/work/${beat.slug}`}
            className="block relative overflow-hidden h-[70vh] group"
          >
            <Image
              src={beat.image}
              alt={beat.alt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/45" />
            <div className="absolute inset-x-0 bottom-0 px-6 lg:px-12 pb-12">
              {eyebrow(beat, i)}
              <h2 className="font-sans font-extrabold text-canvas leading-[0.98] tracking-tight text-3xl md:text-4xl lg:text-5xl max-w-3xl">
                {beat.title}
              </h2>
              <p className="text-base lg:text-lg text-canvas/70 mt-3 max-w-xl">
                {beat.line}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
