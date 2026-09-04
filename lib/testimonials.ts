/**
 * Client testimonials for the homepage testimonial section.
 *
 * PLACEHOLDER quotes — derived from outcomes cited in the SG + NN
 * media kits (NOVEL Beach Park, Ryan Hughes Design, Marine Connection,
 * Bertram Yachts). Billy needs to confirm/replace with real
 * permissioned quotes from each client before launch.
 */

export interface Testimonial {
  slug: string;
  /** The pull quote */
  quote: string;
  /** Attribution name */
  name: string;
  /** Title + company */
  title: string;
  /** Which vertical/case it relates to */
  vertical: string;
}

export const testimonials: Testimonial[] = [
  {
    slug: "novel-beach-park",
    quote:
      "Surroundings Group took our occupancy from 12% to 52% in two months. Organic social became our fourth-largest traffic source. They understood our community in a way no other partner had.",
    name: "Leasing Director",
    title: "NOVEL Beach Park",
    vertical: "Multifamily",
  },
  {
    slug: "bertram-yachts",
    quote:
      "Big goals, limited resources. That&apos;s our world. Surroundings has been a trusted partner in helping us hit our content and social goals consistently, at the standard a Bertram client expects.",
    name: "Alex",
    title: "Marketing, Bertram Yachts",
    vertical: "Marine & Yachting",
  },
  {
    slug: "ryan-hughes-design",
    quote:
      "They generated millions of views that translated directly into business. We upsold existing clients to the tune of $7M+ and won new business we wouldn&apos;t have reached otherwise.",
    name: "Studio Leadership",
    title: "Ryan Hughes Design",
    vertical: "Luxury Real Estate",
  },
];
