import { Eyebrow } from "@/components/ui";

const POINTS = [
  {
    lead: "One system from rubric to scorecard.",
    text: "The job description, rubric, screening, interviews and scorecards share the same criteria.",
  },
  {
    lead: "AI interviews and AI in your interviews.",
    text: "Autonomous first rounds on every plan, plus AI support when your own team interviews, on selected plans.",
  },
  {
    lead: "Evidence you can check.",
    text: "Scorecards cite the transcript instead of giving a bare number.",
  },
  {
    lead: "A clear rule on decisions.",
    text: "IntelliHire ranks and summarizes; people decide who moves forward.",
  },
  {
    lead: "Candidate updates on the channels people use.",
    text: "Email and WhatsApp, with SMS depending on your plan.",
  },
];

export default function Differentiators() {
  return (
    <section
      id="why-intellihire"
      className="relative bg-brand-surface px-4 pb-24 sm:px-5 md:px-10 md:pb-32"
    >
      <div className="relative mx-auto max-w-[1920px] overflow-hidden rounded-[28px] bg-[#071a3d] px-6 py-14 sm:rounded-[34px] sm:px-7 md:px-14 md:py-20">
        <span
          className="pointer-events-none absolute -top-24 right-[-6%] h-[420px] w-[420px] rounded-full bg-[#087ef5]/16 blur-[130px]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute bottom-[-30%] left-[-8%] h-[360px] w-[360px] rounded-full bg-[#ff6b00]/10 blur-[120px]"
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div data-reveal className="lg:col-span-7">
            <Eyebrow tone="onDark">Why IntelliHire</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(30px,4vw,60px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#ffffff]">
              What Sets IntelliHire{" "}
              <span className="text-[#087ef5]">Apart</span>
            </h2>
          </div>
          <p
            data-reveal
            className="m-0 max-w-[480px] text-[clamp(15px,1.2vw,19px)] leading-[1.7] text-[#ffffff]/65 lg:col-span-5 lg:justify-self-end"
          >
            Five things you get in one AI hiring platform, instead of separate
            screening, interviewing and scheduling tools.
          </p>
        </div>

        <ul className="relative m-0 mt-14 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:mt-16 lg:grid-cols-6 lg:gap-5">
          {POINTS.map(({ lead, text }, i) => (
            <li
              data-reveal
              key={lead}
              className={`group relative flex flex-col overflow-hidden rounded-[22px] border border-[#ffffff]/10 bg-[#ffffff]/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#087ef5]/50 hover:bg-[#ffffff]/[0.07] md:p-8 ${
                i < 3 ? "lg:col-span-2" : "lg:col-span-3"
              } ${i === 4 ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="font-display text-[clamp(34px,3vw,46px)] leading-none text-[#087ef5]">
                  0{i + 1}
                </span>
                <span
                  className="h-px w-10 origin-right bg-[#ff6b00] transition-transform duration-300 group-hover:scale-x-150"
                  aria-hidden="true"
                />
              </span>
              <p className="m-0 mt-8 text-[clamp(17px,1.4vw,21px)] leading-snug font-semibold text-[#ffffff]">
                {lead}
              </p>
              <p className="m-0 mt-3 text-[15px] leading-[1.65] text-[#ffffff]/60">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
