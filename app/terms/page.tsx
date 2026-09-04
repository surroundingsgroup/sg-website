import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service",
  description:
    "Terms governing use of surroundingsgroup.com and engagements with Surroundings Group.",
};

const lastUpdated = "May 25, 2026";

export default function TermsPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="LEGAL"
        title="Terms of Service"
        subhead={`Last updated ${lastUpdated}. These terms govern your use of surroundingsgroup.com.`}
      />

      <section className="bg-canvas pb-24 lg:pb-32 px-6 lg:px-12">
        <article className="max-w-[800px] mx-auto prose prose-neutral prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-ink prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-base prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-ink prose-a:underline hover:prose-a:text-neutral-500">
          <h2>Acceptance</h2>
          <p>
            By using surroundingsgroup.com you agree to these terms. If you
            don&apos;t agree, please don&apos;t use the site.
          </p>

          <h2>Use of the site</h2>
          <p>
            The content on this site (copy, design, photography, video, and
            code) is the property of Surroundings Group unless otherwise
            credited. You may browse and share links freely; you may not
            republish, reproduce, or repurpose the content for commercial use
            without written permission.
          </p>

          <h2>Engagements + proposals</h2>
          <p>
            Information on this site is for general reference. Specific
            engagements are governed by separately executed proposals or
            statements of work. Nothing on this site constitutes an offer to
            enter into a contractual relationship.
          </p>

          <h2>Third-party links</h2>
          <p>
            We link to third-party sites (Vimeo, social platforms, partner
            brands). We&apos;re not responsible for content or practices on
            sites we don&apos;t operate.
          </p>

          <h2>Disclaimer</h2>
          <p>
            We provide this site &ldquo;as is.&rdquo; While we work hard to
            keep it accurate, we don&apos;t warrant against errors or
            interruptions. Use of the site is at your own risk.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Surroundings Group is not liable for indirect, incidental, or
            consequential damages arising from use of this site. To the
            extent permitted by law, our maximum liability for any claim
            related to the site is limited to $100.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms periodically. Material changes will be
            noted with a revised &ldquo;last updated&rdquo; date at the top
            of this page.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Florida,
            United States.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms?{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>

          <p className="!mt-12 !text-sm !text-neutral-500">
            <strong className="font-semibold">Note:</strong> This is a
            general-purpose terms-of-service template provided as a starting
            point. Before launch, replace with terms reviewed by counsel
            appropriate to your business and jurisdiction.
          </p>
        </article>
      </section>

      <Footer />
    </>
  );
}
