/**
 * Sanity connection config, read from env.
 *
 * Set these in .env.local (and in Vercel project settings) after creating
 * the Sanity project:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET       (usually "production")
 *
 * A placeholder projectId keeps the build green before the project exists.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

/** True once a real project id is configured. */
export const sanityConfigured = projectId !== "placeholder";
