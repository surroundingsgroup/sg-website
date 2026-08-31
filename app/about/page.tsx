import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "Surroundings Group is a vertical-fluent creative agency for premium brands. Marine, real estate, hospitality, aviation, and the categories around them. Built in-house. Backed by an owned-media network.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="ABOUT"
        title="At home in the world's premium markets."
        subhead="Vertical-fluent. Fully in-house. Built for premium markets."
      />

      {/* Story */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <p className="caption text-neutral-500 lg:col-span-1">OUR STORY</p>
            <div className="lg:col-span-2 space-y-6 text-base lg:text-lg text-neutral-700 leading-relaxed">
              <p className="text-2xl lg:text-3xl font-light text-ink leading-[1.3] text-balance">
                Surroundings Group started with a simple observation.{" "}
                <span className="text-ink/55">
                  Most agencies pitch the same playbook to a watchmaker, a
                  $50M real estate development, and a private aviation
                  operator — then wonder why none of the campaigns land.
                </span>
              </p>
              <p>
                We don&apos;t. We built a different model. Vertical-fluent
                specialists, fully in-house production, and an owned-media
                network at a scale no other agency our size has. The proof
                is the sister brand we built: Nautical Network, the largest
                multi-platform editorial ecosystem in premium marine, whose
                distribution becomes part of every marine engagement we run.
              </p>
              <p>
                Today we work across the premium categories that demand
                the same discipline. Marine. Real estate and development.
                Multifamily. Private aviation. Hospitality and experiences.
                Resorts and travel. Exotic automotive. Luxury goods. Each
                one gets specialists who&apos;ve spent careers in the
                category, not generalists with a credential.
              </p>
              <p>
                Our clients borrow from each other across the verticals.
                A yacht from our marine roster anchors a real estate
                launch film. A car reveal lands at a hospitality
                activation. A private aviation terminal hosts a luxury
                goods drop. Then every engagement is amplified through
                an owned-media network of ten editorial channels reaching
                255M+ affluent viewers a year. Most agencies buy
                attention. We built ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating principles — what makes the SG model different */}
      <section className="bg-canvas pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-neutral-500 mb-5">◆ OPERATING PRINCIPLES</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-ink text-balance">
              How we work.
            </h2>
          </header>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <Principle
              title="Vertical depth over horizontal reach"
              body="We turn down work outside the categories we know. The brief lands faster, the work hits harder, and the team gets compounding fluency in the rooms our clients sit in."
            />
            <Principle
              title="In-house from concept to delivery"
              body="Strategy, production, post, paid, PR — all under one roof, run by senior people on the pitch. No agency-of-record handoffs, no freelance networks pretending to be a team."
            />
            <Principle
              title="Distribution included, not handed off"
              body="Every creative engagement comes with an owned-media plan. The film we make for a yacht launch runs across our editorial channels, not just the brand's own."
            />
            <Principle
              title="Long engagements, compounding outcomes"
              body="Premium growth is a quarter-over-quarter game. We build audience, owned media, and retention systems that compound — not single campaigns chasing one quarter's number."
            />
          </ol>
        </div>
      </section>

      {/* Leadership perspective — pull-quote moment */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="caption text-gold mb-8 tracking-[0.28em]">
            ◆ FROM THE STUDIO
          </p>
          <blockquote className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.15] tracking-tight text-canvas text-balance">
            <span aria-hidden className="text-gold/50 mr-1">&ldquo;</span>
            The agencies that win at the premium end aren&apos;t the loudest.
            They&apos;re the ones who understand the category, make the work
            in-house from start to finish, and own the channels that reach
            the audience. That&apos;s the model.
            <span aria-hidden className="text-gold/50 ml-1">&rdquo;</span>
          </blockquote>
          <div className="mt-10 caption text-canvas/55 tracking-[0.22em]">
            BILLY PAVLOCK · FOUNDER
          </div>
        </div>
      </section>

      {/* Team photo — full-bleed editorial moment with micro-annotation */}
      <section className="bg-canvas">
        <div className="relative">
          <Image
            src="/images/team/team-photo.jpg"
            alt="The Surroundings Group team"
            width={1800}
            height={896}
            sizes="100vw"
            className="w-full h-auto"
          />
          <p className="absolute bottom-4 left-6 lg:bottom-8 lg:left-12 caption text-canvas [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
            ◆ THE TEAM · TAMPA, FL
          </p>
        </div>
      </section>

      {/* Team preview */}
      <section className="bg-[#EFE7DA] py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="caption text-neutral-500 mb-4">◆ THE TEAM</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
                The team behind the work.
              </h2>
            </div>
            <Link
              href="/about/team"
              className="caption inline-flex items-center gap-2 text-ink hover:text-neutral-500 transition-colors shrink-0"
            >
              Meet the full team
              <Arrow />
            </Link>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {team.slice(0, 3).map((m) => (
              <li key={m.slug}>
                <div className="relative aspect-[4/5] bg-ink mb-5 overflow-hidden">
                  {m.photo && (
                    <Image
                      src={m.photo}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  )}
                </div>
                <p className="caption text-neutral-500 mb-2">{m.department}</p>
                <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink mb-1">
                  {m.name}
                </h3>
                <p className="text-sm text-neutral-600">{m.role}</p>
                {m.bio && (
                  <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3 mt-3">
                    {m.bio}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nautical Network spotlight */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="caption text-gold mb-6">◆ SISTER BRAND</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 text-balance">
                Nautical Network. Owned distribution at scale.
              </h2>
              <p className="text-base lg:text-lg text-canvas/70 leading-relaxed mb-8">
                Built from a single Instagram into eight social brands
                publishing daily across premium marine. It&apos;s proof of
                capability and an unfair distribution advantage we extend
                to every client we work with.
              </p>
              <Link
                href="/about/nautical-network"
                className="caption inline-flex items-center gap-2 text-canvas hover:text-gold transition-colors"
              >
                See how it works
                <Arrow />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-6">
                <li className="border-t border-canvas/15 pt-4">
                  <p className="font-sans font-extrabold text-4xl lg:text-5xl leading-none">
                    180M+
                  </p>
                  <p className="text-sm text-canvas/60 mt-2">
                    Annual viewers across the network
                  </p>
                </li>
                <li className="border-t border-canvas/15 pt-4">
                  <p className="font-sans font-extrabold text-4xl lg:text-5xl leading-none">
                    8
                  </p>
                  <p className="text-sm text-canvas/60 mt-2">
                    Owned social brands publishing daily
                  </p>
                </li>
                <li className="border-t border-canvas/15 pt-4">
                  <p className="font-sans font-extrabold text-4xl lg:text-5xl leading-none">
                    #1
                  </p>
                  <p className="text-sm text-canvas/60 mt-2">
                    Largest global multi-platform boating outlet
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Principle({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <li className="border-t border-neutral-300 pt-6 lg:pt-8">
      <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight tracking-tight mb-4">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-neutral-700 leading-relaxed">
        {body}
      </p>
    </li>
  );
}
