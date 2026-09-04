"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClarkyTweaks } from "@/components/clarky-tweaks";

/**
 * Marketing-only third-party widgets. Disabled inside /studio, where the
 * global smooth-scroll hijack blocks the embedded Sanity editor's wheel
 * scrolling and the Clarky chat bubble floats over its controls.
 */
export function SiteWidgets() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return (
    <>
      <SmoothScroll />
      <Script
        src="https://clarky.ai/embed/54eff0a3-e16d-4ebd-a26d-c12fe344e043/chat.js"
        strategy="afterInteractive"
      />
      <ClarkyTweaks />
    </>
  );
}
