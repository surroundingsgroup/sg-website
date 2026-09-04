import Image from "next/image";

/**
 * Full-bleed cinematic image strip — visual breath between sections
 * (currently between AboutSummary and ServicesGrid).
 *
 * Aspect ratio matches the SG signature banner (~6:1), edge-to-edge,
 * no max-width container.
 *
 * Props are optional. By default, eyebrow + caption overlays are OFF
 * because the current signature banner has SG branding/text baked in.
 * Pass `showOverlay` to re-enable the gradient + caption stack for
 * a future plain-photo billboard.
 */

interface EditorialBillboardProps {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  caption?: string;
  /** Pass true to show a gradient + eyebrow/caption stack over the image */
  showOverlay?: boolean;
}

export function EditorialBillboard({
  image = "/images/editorial/signature-banner.png",
  imageAlt = "Surroundings Group, a creative agency for premium markets",
  eyebrow,
  caption,
  showOverlay = false,
}: EditorialBillboardProps) {
  return (
    <section className="relative w-full bg-ink overflow-hidden">
      <div className="relative aspect-[3/1] md:aspect-[5/1] lg:aspect-[6/1]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <span className="caption text-canvas/25 text-center">
              SIGNATURE BANNER: DROP A FILE AT
              <br />
              /public/images/editorial/signature-banner.png
            </span>
          </div>
        )}

        {/* Optional caption overlay — off by default for branded banners */}
        {showOverlay && (eyebrow || caption) && (
          <>
            <div
              className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent pointer-events-none"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 py-6 lg:py-8 text-canvas">
              <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-6">
                {eyebrow && <p className="caption text-gold">{eyebrow}</p>}
                {caption && (
                  <p className="text-sm lg:text-base text-canvas/85 leading-snug max-w-md sm:text-right">
                    {caption}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Subtle gold corner accent — non-conflicting */}
        <div
          className="absolute top-0 left-0 w-24 h-px bg-gold/60"
          aria-hidden
        />
      </div>
    </section>
  );
}
