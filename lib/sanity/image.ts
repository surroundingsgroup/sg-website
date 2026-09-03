import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "@/sanity/env";

const builder = imageUrlBuilder({ projectId, dataset });

/** The image-source shape accepted by the URL builder (ref or asset doc). */
type ImageSource = Parameters<typeof builder.image>[0];

/**
 * Build an image URL from a Sanity image ref. Honors the hotspot/crop set
 * in Studio, so `.width(w).height(h)` returns a focal-point-aware crop —
 * this is what powers the gallery, the 3:1 banner, and the 4:5 card.
 */
export function urlFor(source: ImageSource) {
  return builder.image(source).auto("format").fit("max");
}
