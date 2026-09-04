import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { jobs, getJob } from "@/lib/jobs";
import { ApplicationForm } from "@/components/application-form";

/**
 * Job detail page — full description for a single open role.
 * Content lives in lib/jobs.ts; this template renders any role.
 */

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Careers" };
  return {
    title: `${job.title} · Careers`,
    description: job.summary,
    alternates: { canonical: `/careers/${slug}` },
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="bg-canvas pt-36 lg:pt-44 pb-12 lg:pb-16 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <Link
            href="/careers"
            className="caption inline-flex items-center gap-2 text-neutral-500 hover:text-ink transition-colors mb-8"
          >
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              aria-hidden
              className="rotate-180"
            >
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            All openings
          </Link>
          <p className="caption text-neutral-500 mb-5">◆ WE RECRUIT FOR</p>
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink text-balance">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
            <span className="caption text-neutral-600">{job.type}</span>
            <span className="caption text-neutral-400" aria-hidden>
              ·
            </span>
            <span className="caption text-neutral-600">{job.location}</span>
          </div>
          <p className="text-lg lg:text-xl text-neutral-700 mt-6 max-w-2xl leading-relaxed">
            {job.summary}
          </p>
          <a
            href="#apply"
            className="inline-block mt-8 bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300"
          >
            Join the talent pool
          </a>
        </div>
      </section>

      {/* Shared studio intro */}
      <section className="bg-ink text-canvas py-14 lg:py-16 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <p className="caption text-gold mb-5">◆ WHO YOU&apos;D JOIN</p>
          <p className="text-lg lg:text-2xl text-canvas/90 leading-[1.4] font-light">
            Surroundings Group is the creative partner behind the world&apos;s
            premium brands: marine, real estate, private aviation,
            hospitality, and the categories around them. We&apos;re also the
            team behind Nautical Network, the largest multi-platform editorial
            ecosystem in premium marine, reaching 180M+ viewers a year.
            Together they form a vertically fluent ecosystem built to scale
            brands in high-trust categories.
          </p>
        </div>
      </section>

      {/* JD sections */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto space-y-12 lg:space-y-16">
          {job.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="caption text-neutral-500 mb-5">
                ◆ {section.heading.toUpperCase()}
              </h2>
              {section.body?.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-base lg:text-lg text-neutral-700 leading-relaxed mb-4"
                >
                  {p}
                </p>
              ))}
              {section.items && (
                <ul className="space-y-3 mt-2">
                  {section.items.map((item) => (
                    <li
                      key={item.slice(0, 40)}
                      className="text-base lg:text-lg text-neutral-700 leading-relaxed flex gap-3"
                    >
                      <span aria-hidden className="text-neutral-500 shrink-0">
                        ·
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {job.schedule && (
            <div>
              <h2 className="caption text-neutral-500 mb-5">◆ WORK SCHEDULE</h2>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                {job.schedule}
              </p>
            </div>
          )}

          <div>
            <h2 className="caption text-neutral-500 mb-5">◆ HOW THIS WORKS</h2>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
              We&apos;re not always hiring for this role, but we&apos;re always
              building the pool. Introduce yourself now, and when a seat opens
              you&apos;re already vetted and first in line. We read every note.
            </p>
          </div>

          <p className="text-sm text-neutral-500 leading-relaxed border-t border-neutral-200 pt-8">
            Surroundings Group LLC and its subsidiaries is an equal
            opportunity employer. We provide equal employment opportunities to
            all team members and applicants without regard to gender,
            pregnancy, marital or civil partnership status, gender
            reassignment, race, disability, sexual orientation, religious
            belief, part-time or fixed-term employment, age, or any other
            legally protected class.
          </p>
        </div>
      </section>

      {/* Application form */}
      <section
        id="apply"
        className="bg-neutral-50 py-16 lg:py-24 px-6 lg:px-12 border-t border-neutral-200 scroll-mt-24"
      >
        <div className="max-w-[900px] mx-auto">
          <header className="mb-10 lg:mb-12">
            <p className="caption text-neutral-500 mb-4">◆ GET IN THE POOL</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              Sound like you?
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-5 max-w-2xl leading-relaxed">
              Fill in as much as you can (email, phone, city, portfolio, and
              your socials), attach your resume, and tell us what you&apos;d
              bring to the room. The more complete your profile, the faster we
              can reach out when a seat opens for this role.
            </p>
          </header>
          <ApplicationForm roleTitle={job.title} roleSlug={job.slug} />
        </div>
      </section>

      <Footer />
    </>
  );
}
