import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * Portfolio Project — one work collection (a shoot: aircraft, yacht, estate…).
 *
 * This is the high-churn content the team adds constantly. Verticals (hero
 * copy, taglines, SEO, FAQs) stay in code; projects live here so anyone can
 * add one: type the details, drag in photos, paste Vimeo links, publish.
 *
 * Images use hotspot cropping — set a focal point per photo and the site's
 * crops (gallery, 3:1 banner, 4:5 card) frame around it automatically.
 */

export const VERTICALS = [
  "Marine",
  "Real Estate + Development",
  "Multifamily",
  "Private Aviation",
  "Resorts + Travel",
  "Hospitality + Experiences",
  "Exotic Automotive",
  "Luxury Goods",
  "Cross-Vertical",
] as const;

export const project = defineType({
  name: "project",
  title: "Portfolio Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'e.g. "Gulfstream G450", "M/Y Skyfall"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "vertical",
      title: "Vertical",
      type: "string",
      options: { list: [...VERTICALS] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Client (optional)",
      type: "string",
      description: "Shown in the credit line. Leave blank if the subject is the client.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: 'City shown in the credit line, e.g. "Tampa, Florida"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "2–3 sentences shown under the title on the project page.",
    }),
    defineField({
      name: "mainVideoUrl",
      title: "Main film — Vimeo URL (optional)",
      type: "url",
      description: "Horizontal 16:9 film shown above the gallery. Leave blank if none.",
    }),
    defineField({
      name: "socialCutUrls",
      title: "Social cuts — Vimeo URLs (optional)",
      type: "array",
      of: [defineArrayMember({ type: "url" })],
      description: "Vertical 9:16 cuts shown in the 'Built for the feed' reel.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery — drag to reorder",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Describe the photo (accessibility + SEO).",
            },
          ],
        }),
      ],
      options: { layout: "grid" },
      description:
        "Upload the full-res originals — the site resizes automatically. First image is the cover.",
    }),
    defineField({
      name: "feedStills",
      title: "Feed stills — vertical photos (optional)",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt text" }],
        }),
      ],
      options: { layout: "grid" },
      description:
        "Portrait (9:16) stills shown alongside the social cuts in the 'Built for the feed' reel.",
    }),
    defineField({
      name: "coordinates",
      title: "Map pin (optional)",
      type: "geopoint",
      description: "Drop a pin to place this project on the home-page map.",
    }),
    defineField({
      name: "featured",
      title: 'Feature in "Inside the Studio" reel',
      type: "boolean",
      initialValue: false,
    }),
    // Managed by the drag-to-reorder list; hidden from the form.
    defineField({ name: "orderRank", type: "string", hidden: true }),
  ],
  preview: {
    select: { title: "title", subtitle: "vertical", media: "gallery.0" },
  },
});
