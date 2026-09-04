import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "How Surroundings Group collects, uses, and protects information from visitors to surroundingsgroup.com.",
};

const lastUpdated = "May 25, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        subhead={`Last updated ${lastUpdated}. This policy describes how Surroundings Group collects and uses information from visitors to surroundingsgroup.com.`}
      />

      <section className="bg-canvas pb-24 lg:pb-32 px-6 lg:px-12">
        <article className="max-w-[800px] mx-auto prose prose-neutral prose-headings:font-sans prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-ink prose-h2:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-base prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-ink prose-a:underline hover:prose-a:text-neutral-500">
          <h2>Information we collect</h2>
          <p>
            We collect information you provide directly to us when you fill out
            a contact form, book a discovery meeting, or email us. This typically
            includes your name, email address, company, and any details you
            share about your project.
          </p>
          <p>
            We also automatically collect standard web analytics data
            (including IP address, browser type, pages visited, and referring
            URLs) via Google Tag Manager. This data is aggregated and not
            tied to individual visitors.
          </p>

          <h2>How we use information</h2>
          <p>
            We use the information you provide to respond to your inquiry,
            schedule calls, deliver services, and send relevant communications
            about our work. We don&apos;t sell or rent your personal
            information to third parties.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This site uses cookies for analytics (Google Analytics via Google
            Tag Manager). You can opt out of Google Analytics tracking via
            browser settings or the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>

          <h2>Third-party services</h2>
          <p>
            We use Vercel for hosting, Vimeo for video delivery, and email
            providers for communications. Each has its own privacy policy
            governing how they handle data routed through their systems.
          </p>

          <h2>Your rights</h2>
          <p>
            You can request a copy of the information we hold about you, ask
            us to correct or delete it, or unsubscribe from any communications
            at any time. Email{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
            with any privacy-related request.
          </p>

          <h2>Updates to this policy</h2>
          <p>
            We may update this policy periodically. Material changes will be
            noted with a revised &ldquo;last updated&rdquo; date at the top
            of this page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy?{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
            or{" "}
            <a href={`tel:${site.contact.phone.replace(/-/g, "")}`}>
              {site.contact.phone}
            </a>
            .
          </p>

          <p className="!mt-12 !text-sm !text-neutral-500">
            <strong className="font-semibold">Note:</strong> This is a
            general-purpose privacy policy template provided as a starting
            point. Before launch, replace with a policy reviewed by counsel
            appropriate to your jurisdiction and the categories of data you
            actually process.
          </p>
        </article>
      </section>

      <Footer />
    </>
  );
}
