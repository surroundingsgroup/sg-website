import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import {
  CareersHero,
  OpenRolesList,
  WhatPeopleLove,
  CareersCta,
} from "@/components/careers-sections";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers",
  description:
    "We're not always hiring, but we're always meeting people. Join the Surroundings Group talent pool. When a seat opens in your discipline, you're the first call.",
};

/** Disciplines strip — the signature marquee device as a transition. */
const disciplines = [
  "Business Development",
  "Photo / Video",
  "Email Marketing",
  "Paid Media",
  "PR + Communications",
  "Social Media",
  "Internships",
];

export default function CareersPage() {
  return (
    <>
      <Nav />
      <CareersHero />
      <Marquee items={disciplines} tone="dark" duration={35} />
      <OpenRolesList />
      <WhatPeopleLove />
      <CareersCta />
      <Footer />
    </>
  );
}
