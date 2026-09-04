"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { submitDiscovery } from "@/app/contact/booking-actions";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { trackEvent } from "@/lib/analytics";
import { verticals } from "@/lib/verticals";
import { services } from "@/lib/services";

/**
 * Discovery qualifier — a few quick questions gate the Calendly
 * calendar. On submit the answers email the team (billy@ / phallon@ /
 * info@) and the live calendar is revealed in place, so a lead is
 * captured even if the booking is never completed.
 */

const TIMELINES = [
  "As soon as possible",
  "Next 1–3 months",
  "3–6 months",
  "Just exploring",
];

export function DiscoveryQualifier() {
  const [isPending, startTransition] = useTransition();
  const [booked, setBooked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // The form is tucked away by default. It opens when someone hits the
  // toggle, or when a "Book a discovery meeting" (#book) link fires —
  // SmoothScroll dispatches a hashchange after scrolling here.
  useEffect(() => {
    function openIfBook() {
      if (window.location.hash === "#book") setExpanded(true);
    }
    openIfBook();
    window.addEventListener("hashchange", openIfBook);
    return () => window.removeEventListener("hashchange", openIfBook);
  }, []);

  function expand() {
    setExpanded(true);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const res = await submitDiscovery(formData);
        if (res.ok) {
          trackEvent("discovery_qualifier_submit", {});
          setBooked(true);
          // Let the calendar mount, then bring it into view.
          requestAnimationFrame(() =>
            calendarRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            }),
          );
        } else {
          setError(res.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        setError(
          "We couldn't send that just now. Please try again in a moment.",
        );
      }
    });
  }

  if (booked) {
    return (
      <div ref={calendarRef} className="scroll-mt-24">
        <header className="mb-8 lg:mb-10">
          <p className="caption text-neutral-500 mb-4">◆ LAST STEP</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
            Pick a time.
          </h2>
          <p className="text-base lg:text-lg text-neutral-700 mt-4 max-w-2xl leading-relaxed">
            Thanks, your details are on their way to the team. Grab whatever
            slot works below and you&apos;re set.
          </p>
        </header>
        <CalendlyEmbed />
      </div>
    );
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={expand}
        aria-expanded={false}
        className="group w-full flex items-center justify-between gap-6 bg-canvas border border-ink px-6 lg:px-8 py-6 lg:py-7 text-left hover:bg-ink hover:text-canvas transition-colors duration-300"
      >
        <span>
          <span className="font-sans font-extrabold text-xl lg:text-2xl text-ink group-hover:text-canvas transition-colors duration-300 block">
            Book a discovery meeting
          </span>
          <span className="text-sm lg:text-base text-neutral-600 group-hover:text-canvas/70 transition-colors duration-300 mt-1 block">
            A few quick questions, then pick a time. Takes 30 seconds.
          </span>
        </span>
        <span
          aria-hidden
          className="shrink-0 w-11 h-11 border border-ink group-hover:border-canvas flex items-center justify-center text-ink group-hover:text-canvas transition-colors duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6 scroll-mt-24">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <Field label="Company or brand" name="company" required />

      <div>
        <label htmlFor="industry" className="caption text-neutral-600 mb-2 block">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          defaultValue=""
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
        >
          <option value="">Select an industry…</option>
          {verticals.map((v) => (
            <option key={v.slug} value={v.name}>
              {v.name}
            </option>
          ))}
          <option value="Other / not listed">Other / not listed</option>
        </select>
      </div>

      <div>
        <label className="caption text-neutral-600 mb-2 block">
          What are you looking for?
        </label>
        <ServicesSelect
          options={[...services.map((s) => s.name), "Other / not listed"]}
        />
      </div>

      <div>
        <label htmlFor="timeline" className="caption text-neutral-600 mb-2 block">
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          defaultValue=""
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
        >
          <option value="">Select a timeline…</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="caption text-neutral-600 mb-2 block">
          Anything you want us to know? <span className="text-neutral-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors resize-none"
          placeholder="A few lines about the project, goals, or anything you'd want us to prep before the meeting."
        />
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto inline-flex items-center gap-3 bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Continue to the calendar"}
        {!isPending && (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path
              d="M1 5h12m0 0L9 1m4 4L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        )}
      </button>
      <p className="text-sm text-neutral-600">
        Takes 30 seconds. The calendar opens on the next step.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="caption text-neutral-600 mb-2 block">
        {label}
        {required && <span className="text-neutral-400 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={
          name === "email" ? "email" : name === "name" ? "name" : "organization"
        }
        className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}

/**
 * Multi-select shown as a dropdown that expands into a checklist —
 * keeps the field compact and consistent with the Industry/Timeline
 * selects. Selections are tracked in state and submitted via hidden
 * inputs, so they survive collapsing the panel.
 */
function ServicesSelect({ options }: { options: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  function toggle(value: string) {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value],
    );
  }

  const label =
    selected.length === 0
      ? "Select all that apply…"
      : selected.length <= 2
        ? selected.join(", ")
        : `${selected.length} selected`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 bg-canvas border border-neutral-300 px-4 py-3 text-left text-base focus:outline-none focus:border-ink hover:border-ink transition-colors"
      >
        <span className={selected.length ? "text-ink" : "text-neutral-500"}>
          {label}
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          aria-hidden
          className={`shrink-0 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-canvas border border-ink shadow-lg max-h-[26rem] overflow-auto">
          {options.map((opt) => {
            const isChecked = selected.includes(opt);
            return (
              <button
                type="button"
                key={opt}
                onClick={() => toggle(opt)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors ${
                  isChecked
                    ? "bg-ink text-canvas"
                    : "text-ink hover:bg-neutral-100"
                }`}
              >
                <span className="font-medium">{opt}</span>
                {isChecked && (
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 10 8"
                    fill="none"
                    aria-hidden
                    className="shrink-0 text-canvas"
                  >
                    <path
                      d="M1 4l2.5 2.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Hidden inputs carry the selection into the form submission */}
      {selected.map((v) => (
        <input key={v} type="hidden" name="services" value={v} />
      ))}
    </div>
  );
}
