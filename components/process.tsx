/**
 * 4-step process section — concept to execution, simply stated.
 *
 * Per Billy's flow doc: Strategy → Production → Launch → Growth.
 * Editorial chapter numbering, alternating dark/light rhythm with the
 * surrounding sections. Each step has eyebrow + name + 1-2 sentence
 * explanation.
 */

interface Step {
  num: string;
  name: string;
  copy: string;
}

const steps: Step[] = [
  {
    num: "01",
    name: "Strategy",
    copy:
      "We learn the brand, the audience, and the constraints. Then we build the plan with deliverables, timelines, and a clear definition of success.",
  },
  {
    num: "02",
    name: "Production",
    copy:
      "In-house production. No handoffs, no outsourced juniors. The team that planned it is the team that captures, edits, and delivers it.",
  },
  {
    num: "03",
    name: "Launch",
    copy:
      "We distribute across paid, owned, and earned channels (including our owned media network) to reach the audiences that actually buy.",
  },
  {
    num: "04",
    name: "Growth",
    copy:
      "We measure, learn, and compound. Premium brand work doesn&apos;t happen in a campaign burst. It builds quarter over quarter.",
  },
];

export function Process() {
  return (
    <section className="bg-ink text-canvas py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto">
          <p className="caption text-gold mb-6">◆ HOW WE WORK</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-8 text-balance">
            Concept to execution. Every engagement.
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-canvas/70 leading-relaxed max-w-3xl mx-auto">
            One in-house team, one accountable process. The same four phases
            every time, calibrated to the category, never compromised.
          </p>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-canvas/10">
          {steps.map((step) => (
            <li
              key={step.num}
              className="bg-ink p-8 lg:p-10 min-h-[320px] flex flex-col"
            >
              <p className="caption text-gold mb-8">{step.num}</p>
              <h3 className="font-sans font-extrabold text-3xl lg:text-4xl xl:text-5xl leading-none tracking-tight mb-6">
                {step.name}
              </h3>
              <p
                className="text-base lg:text-lg text-canvas/70 leading-relaxed flex-1"
                dangerouslySetInnerHTML={{ __html: step.copy }}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
