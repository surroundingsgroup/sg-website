import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

/** Read-only client for the public site. Uses the CDN for fast cached reads. */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
