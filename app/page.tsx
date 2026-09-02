import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AboutSummary } from "@/components/about-summary";
import { VerticalsGrid } from "@/components/verticals-grid";
import { ServicesGrid } from "@/components/services-grid";
import { FeaturedWork } from "@/components/featured-work";
import { WhatSetsUsApart } from "@/components/what-sets-us-apart";
import { GlobalReach } from "@/components/global-reach";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";
import { portfolioPins } from "@/lib/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage flow.
 *
 *   1. Hero             — plain Vimeo bg + tagline
 *   2. AboutSummary     — gold section, scroll-reveal animations
 *   3. VerticalsGrid    — eight vertical cards in a magazine-cover layout
 *                         (4-up tier 1 row, 4-up tier 2 row)
 *   4. ServicesGrid     — six service accordion rows, click to expand (dark)
 *   5. FeaturedWork     — journal feed
 *   6. WhatSetsUsApart  — four-chapter expandable accordion synthesizing
 *                         why-us + crossover advantage + math + numbers
 *   7. GlobalReach      — owned-media reach stat moment + map
 *   8. CtaBanner        — book the call
 *   9. Footer
 *
 * Earlier iterations also rendered PinnedStoryScroll,
 * VerticalsJourneyScroll, and VerticalsCinemaScroll. Those are
 * unwired; the component files stay on disk in case we want them back.
 */
export default function Home() {
  const pins = portfolioPins();
  return (
    <>
      <Nav />
      <Hero />
      <AboutSummary />
      <VerticalsGrid />
      <ServicesGrid />
      <FeaturedWork />
      <WhatSetsUsApart />
      <GlobalReach pins={pins} />
      <CtaBanner />
      <Footer />
    </>
  );
}
