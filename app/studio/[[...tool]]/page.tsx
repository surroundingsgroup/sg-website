/**
 * Embedded Sanity Studio at /studio — the team's self-serve editor.
 * All Studio routes are handled by this catch-all.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
