"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { services, type Service } from "@/lib/services";
import { Rule } from "@/components/rule";

/**
 * Six-service accordion.
 *
 * Each service is a single editorial row: number + name + one-line
 * tagline. Click to expand into the description, key capabilities,
 * and an "Explore" link to the detail page. Closed by default;
 * multiple rows can be open at once.
 *
 * Voice: editorial magazine table of contents. Drama from negative
 * space and big type, not from photography. No images per service —
 * the photographic moments live elsewhere on the page.
 */
export function ServicesGrid() {
  const reduce = useReducedMotion();

  const child: Variants = {
    hidden: { opacity: 0, y: 24 },
    shown: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 bg-ink text-canvas">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
        <motion.header
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "shown"}
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            shown: { transition: { staggerChildren: 0.12 } },
          }}
          className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
        >
          <motion.p variants={child} className="caption text-gold mb-5">
            ◆ CAPABILITIES
          </motion.p>
          <motion.h2
            variants={child}
            className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-tight text-canvas text-balance"
          >
            What we do.
          </motion.h2>
          <Rule className="bg-gold mt-6" />
          <motion.p
            variants={child}
            className="text-xl lg:text-2xl font-light leading-[1.3] text-canvas mt-8"
          >
            Full-service. An extension of your team.{" "}
            <span className="text-canvas/55">
              Production, Social Media, Websites, Paid Media + PR, Events, AI + Automation.
              All under one roof.
            </span>
          </motion.p>
        </motion.header>

        <ol className="lg:col-span-8 border-t border-canvas/15">
          {services.map((service, i) => (
            <ServiceRow key={service.slug} service={service} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  return (
    <li className="border-b border-canvas/15">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full py-7 lg:py-9 flex items-center gap-6 lg:gap-10 text-left group transition-colors hover:bg-canvas/[0.03]"
      >
        <span className="font-sans font-extrabold text-3xl lg:text-4xl leading-none tracking-tight text-canvas/90 shrink-0 w-14 lg:w-16">
          {num}
        </span>

        <span className="flex-1 min-w-0">
          <span className="block font-sans font-extrabold text-2xl lg:text-3xl leading-none tracking-tight text-canvas group-hover:text-gold transition-colors duration-300">
            {service.name}
          </span>
          <span className="hidden md:block text-sm lg:text-base text-canvas/55 leading-snug mt-2">
            {service.tagline}
          </span>
        </span>

        <span
          aria-hidden
          className={`shrink-0 self-center text-canvas/70 group-hover:text-gold transition-all duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduce ? { height: "auto" } : { height: 0, opacity: 0 }}
            animate={
              reduce
                ? { height: "auto" }
                : {
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: {
                        duration: 0.45,
                        ease: [0.22, 0.61, 0.36, 1] as const,
                      },
                      opacity: { duration: 0.3, delay: 0.1 },
                    },
                  }
            }
            exit={
              reduce
                ? { height: 0 }
                : {
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: {
                        duration: 0.35,
                        ease: [0.22, 0.61, 0.36, 1] as const,
                      },
                      opacity: { duration: 0.2 },
                    },
                  }
            }
            className="overflow-hidden"
          >
            <div className="pb-10 lg:pb-14 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:pl-[6.5rem]">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-base lg:text-lg text-canvas/85 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="caption inline-flex items-center gap-3 text-canvas hover:text-gold transition-colors duration-300"
                >
                  Explore {service.name}
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
                </Link>
              </div>

              <div className="lg:col-span-5">
                <p className="caption text-gold mb-4">◆ CAPABILITIES</p>
                <ul className="space-y-2">
                  {service.capabilities.slice(0, 7).map((capability) => (
                    <li
                      key={capability}
                      className="text-sm lg:text-base text-canvas/75 leading-snug flex gap-3"
                    >
                      <span aria-hidden className="text-gold">
                        ·
                      </span>
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
