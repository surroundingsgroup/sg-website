import Image from "next/image";
import Link from "next/link";

/**
 * Editorial-spread "Meet the BD lead" card — primary CTA on /discovery-call.
 *
 * Design: full-bleed dark section, 12-col grid. Left 5 cols = portrait
 * (4:5 aspect) with gold pinstripe accent. Right 7 cols = dark editorial
 * panel with a first-person pull quote, attribution, and a gold CTA
 * button linking to the rep's Calendly.
 *
 * Reads like a magazine feature on a person, not a "book a call" CTA.
 * Distinct from every other agency's discovery-call page.
 *
 * The `image` prop is optional. When missing, a stylized initials avatar
 * renders in the photo slot (PR in gold on a dark frame). Drop a real
 * portrait at /public/images/team/{slug}.jpg and pass it in — the card
 * auto-switches to the photo.
 */

interface BdMeetingCardProps {
  name: string;
  /** Short title shown after the name */
  title: string;
  /** Optional portrait — recommended 1200x1500 (4:5 portrait), WebP/JPG */
  image?: string;
  imageAlt?: string;
  /** Initials shown in the placeholder avatar when no image provided */
  initials: string;
  /** First-person pull quote — keep ~12-18 words */
  quote: string;
  /** Short secondary line under the attribution */
  meta?: string;
  /** Calendly URL (or any external scheduling URL) */
  bookingHref: string;
  /** Button label */
  bookingLabel?: string;
  /** Eyebrow above the quote */
  eyebrow?: string;
}

export function BdMeetingCard({
  name,
  title,
  image,
  imageAlt,
  initials,
  quote,
  meta,
  bookingHref,
  bookingLabel = "Book a 30-minute discovery",
  eyebrow = "CONNECT DIRECTLY",
}: BdMeetingCardProps) {
  return (
    <section className="bg-ink text-canvas px-6 lg:px-12 py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0">
          {/* Photo / placeholder — left 5 cols on desktop */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
              {image ? (
                <Image
                  src={image}
                  alt={imageAlt ?? `${name} · ${title}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority={false}
                />
              ) : (
                <PlaceholderAvatar initials={initials} />
              )}

              {/* Gold pinstripe edge — right edge of photo on desktop,
                  bottom edge on mobile (so it always touches the copy) */}
              <div
                className="absolute right-0 top-0 bottom-0 hidden lg:block w-px bg-gold"
                aria-hidden
              />
              <div
                className="absolute left-0 right-0 bottom-0 lg:hidden h-px bg-gold"
                aria-hidden
              />

              {/* Corner accent */}
              <div
                className="absolute top-0 left-0 w-16 h-px bg-gold/60"
                aria-hidden
              />
              <div
                className="absolute top-0 left-0 w-px h-16 bg-gold/60"
                aria-hidden
              />
            </div>
          </div>

          {/* Editorial content panel — right 7 cols */}
          <div className="lg:col-span-7 relative bg-ink p-8 lg:p-14 flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="caption text-gold mb-8 lg:mb-10">{eyebrow}</p>

            {/* Pull quote — big editorial type */}
            <blockquote className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-canvas text-balance mb-10 lg:mb-12">
              <span aria-hidden className="text-gold mr-1">&ldquo;</span>
              {quote}
              <span aria-hidden className="text-gold ml-1">&rdquo;</span>
            </blockquote>

            {/* Attribution */}
            <div className="mb-10 lg:mb-12">
              <p className="font-sans font-extrabold text-xl lg:text-2xl text-canvas leading-tight">
                {name}
              </p>
              <p className="caption text-gold mt-2">{title}</p>
              {meta && (
                <p className="text-sm lg:text-base text-canvas/65 mt-4 leading-relaxed max-w-md">
                  {meta}
                </p>
              )}
            </div>

            {/* CTA button — new tab only for external scheduling URLs */}
            <div>
              <Link
                href={bookingHref}
                {...(bookingHref.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group inline-flex items-center gap-3 bg-gold text-ink px-8 py-5 text-sm font-bold tracking-wide hover:bg-canvas transition-colors duration-300"
              >
                {bookingLabel}
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 14 10"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Stylized initials avatar — premium placeholder until a real photo
 * is dropped in. Large gold letters on a textured dark frame.
 */
function PlaceholderAvatar({ initials }: { initials: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 via-ink to-neutral-800 overflow-hidden">
      {/* Subtle radial gold glow behind the initials */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 189, 132, 0.5) 0%, transparent 65%)",
        }}
        aria-hidden
      />

      {/* Initials */}
      <span
        className="relative font-sans font-extrabold text-gold leading-none tracking-tight"
        style={{ fontSize: "clamp(7rem, 22vw, 18rem)" }}
        aria-hidden
      >
        {initials}
      </span>

      {/* Small "PORTRAIT FORTHCOMING" label, only as a subtle marker */}
      <span className="absolute bottom-6 left-6 caption text-canvas/30 tracking-[0.2em] hidden lg:block">
        PORTRAIT FORTHCOMING
      </span>
    </div>
  );
}
