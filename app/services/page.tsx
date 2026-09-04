import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services",
  description:
    "A diverse suite of specialty areas, all under one roof. Production, Social Media, Websites, Paid Media + PR, Events, and AI + Automation. Built for premium brands.",
};

/**
 * Cross-discipline engagement examples — illustrative tags that
 * show how the six services combine on real projects.
 */
const integrations: {
  client: string;
  vertical: string;
  stack: string[];
  image: string;
  alt: string;
  href: string;
}[] = [
  {
    client: "Skyfall",
    vertical: "Marine",
    stack: ["Production", "Social Media", "Paid Media + PR"],
    image: "/images/work/skyfall/skyfall-02.jpg",
    alt: "Aerial top-down of Skyfall superyacht with tenders over turquoise water",
    href: "/work/skyfall",
  },
  {
    client: "Flexjet",
    vertical: "Private Aviation",
    stack: ["Production", "Events", "Paid Media + PR"],
    image: "/images/work/flexjet/flexjet-01.jpg",
    alt: "Sikorsky helicopter and private jet on hangar ramp at golden hour",
    href: "/work/flexjet",
  },
  {
    client: "Cora Residences",
    vertical: "Multifamily",
    stack: ["Production", "Websites", "Social Media"],
    image: "/images/work/cora-residences/cora-residences-01.jpg",
    alt: "Aerial of landscaped rooftop pool deck atop downtown residential tower",
    href: "/work/cora-residences",
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="WHAT WE DO"
        title="Full-service. An extension of your team."
        subhead="A diverse suite of specialty areas, all under one roof. Production, Social Media, Websites, Paid Media + PR, Events, AI + Automation."
      />

      {/* Integration story — the SG advantage of running everything in-house */}
      <section className="bg-canvas px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="caption text-neutral-500 mb-5">◆ ONE ROOF</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-ink text-balance">
              Six disciplines that act like one.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg lg:text-xl text-ink leading-snug font-medium text-balance">
              Most agencies sell you a discipline. We sell you a system that
              compounds.
            </p>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
              The studio shoots what social distributes. Social feeds what
              growth amplifies. Growth points at sites digital builds and
              experiences activates. Intelligence ties it together so the
              brand's stack actually runs as one engine instead of six
              monthly retainers chasing different metrics. Every discipline
              under one roof, briefed once, executed by senior people who
              know the categories we serve.
            </p>
          </div>
        </div>
      </section>

      {/* The six services — dark cards */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-neutral-500 mb-5">◆ THE SUITE</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-ink text-balance">
              What we ship.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-6 max-w-2xl leading-relaxed">
              Each discipline runs as a real practice: senior team, defined
              deliverables, repeatable process. Pick one or combine them.
            </p>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="group block bg-ink text-canvas p-8 lg:p-12 h-full transition-transform duration-500 hover:scale-[1.01]"
                >
                  <p className="caption text-canvas/40 mb-6">
                    {String(i + 1).padStart(2, "0")} / Service
                  </p>
                  <h3 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-none tracking-tight mb-6">
                    {s.name}
                  </h3>
                  <p className="text-base lg:text-lg leading-snug mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-sm text-canvas/70 leading-relaxed mb-6 line-clamp-3">
                    {s.description}
                  </p>
                  <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
                    Explore {s.name}
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cross-discipline projects — proof that the services combine on real work */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-5 tracking-[0.28em]">
              ◆ IN COMBINATION
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-canvas text-balance">
              Most engagements use three or four at once.
            </h2>
            <p className="text-base lg:text-lg text-canvas/70 mt-6 leading-relaxed max-w-2xl">
              The discipline mix shifts per client, but the orchestration
              doesn't. Same accountable team, single brief, integrated
              calendar across every channel.
            </p>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {integrations.map((entry) => (
              <li key={entry.client}>
                <Link
                  href={entry.href}
                  className="group block relative aspect-[4/5] overflow-hidden bg-neutral-900"
                >
                  <Image
                    src={entry.image}
                    alt={entry.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/5"
                  />
                  <div
                    aria-hidden
                    className="absolute top-0 right-0 w-16 h-px bg-gold/70"
                  />
                  <div
                    aria-hidden
                    className="absolute top-0 right-0 w-px h-16 bg-gold/70"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-canvas">
                    <p className="caption text-gold mb-3 tracking-[0.24em]">
                      {entry.vertical.toUpperCase()}
                    </p>
                    <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-tight tracking-tight mb-4">
                      {entry.client}
                    </h3>
                    <ul className="flex flex-wrap gap-2 mb-5">
                      {entry.stack.map((discipline) => (
                        <li
                          key={discipline}
                          className="caption text-canvas/85 px-2 py-1 border border-canvas/25"
                        >
                          {discipline}
                        </li>
                      ))}
                    </ul>
                    <span className="caption inline-flex items-center gap-2 text-canvas/90 group-hover:text-gold transition-colors duration-300">
                      See the work
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing positioning */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1000px] mx-auto text-center">
          <p className="caption text-neutral-500 mb-5 tracking-[0.28em]">
            ◆ BUILT FOR PREMIUM
          </p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-ink text-balance">
            One agency. One accountable team. Senior people on every brief.
          </h2>
          <p className="text-base lg:text-lg text-neutral-700 mt-6 max-w-2xl mx-auto leading-relaxed">
            We work with a small roster of premium brands at a time, by
            design. Every engagement is led by people who&apos;ve spent
            careers in the categories we serve and built the editorial
            channels we publish through.
          </p>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
