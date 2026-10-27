import FaqAccordion from "@/components/FaqAccordion";
import { ArrowLink, Eyebrow, RichText } from "@/components/ui";

/** The homepage FAQ preview. Visible only: FAQPage markup lives on /faq. */
export const HOME_FAQS = [
  {
    question: "What is IntelliHire?",
    answer:
      "IntelliHire is AI recruitment software from SuperMIA. It parses resumes, ranks candidates against your rubric, runs first-round AI voice interviews and writes scorecards that cite the interview transcript. Your team reviews the evidence and makes every hiring decision.",
  },
  {
    question: "Does IntelliHire make hiring decisions?",
    answer:
      "No. IntelliHire ranks, summarizes and flags; people decide. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate.",
  },
  {
    question: "How do AI voice interviews work?",
    answer:
      "Candidates take a first-round voice interview with an AI interviewer that uses natural turn-taking, at a time that suits them. The interview is transcribed, and the scorecard cites the transcript so your team can check the answers.",
  },
  {
    question: "How does IntelliHire rank candidates?",
    answer:
      "You set the job description and rubric, and IntelliHire ranks candidates against it with explainable reasoning. Your team decides which signals carry weight and who moves forward.",
  },
  {
    question: "How is candidate data protected?",
    answer:
      "Candidate data is encrypted in transit and at rest on multi-tenant infrastructure. Access is role-based and logged, and retention windows are configurable. IntelliHire does not sell personal information.",
  },
];

export default function HomeFaq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 border-t border-[#e5eaf0] bg-brand-surface px-4 py-24 sm:px-5 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(30px,3.6vw,56px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
              IntelliHire <span className="text-[#087ef5]">FAQs</span>
            </h2>
            <p className="mt-6 max-w-[420px] text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-[#5b6575]">
              <RichText text="Five quick answers. The full list, from screening to candidate data, is on the [IntelliHire FAQ page](/faq)." />
            </p>
            <ArrowLink href="/faq" className="mt-8">
              See all questions
            </ArrowLink>
          </div>
        </div>

        <div data-reveal className="lg:col-span-8">
          <FaqAccordion items={HOME_FAQS} openFirst />
        </div>
      </div>
    </section>
  );
}
