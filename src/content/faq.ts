import type { FaqItem } from "@/content/types";
import type { PricingPlan } from "@/lib/billing";
import { costAnswer, hasPublishedPrices } from "@/lib/pricing";

/*
 * /faq copy, from "05 Resources / 01 FAQ / 02 Content - FAQ" (final v3).
 *
 * Deviations from the approved text, both forced by the live pricing that
 * replaced the "Coming soon" Starter / Growth / Enterprise cards:
 *   - "Growth and Enterprise plans" → "selected plans" for AI-assisted human
 *     interviews, proctoring, analytics and ATS/calendar integrations.
 *   - The cost answer and the pricing group intro are generated from the
 *     billing API so they always match /pricing.
 */

export type FaqGroup = {
  id: string;
  title: string;
  intro: string;
  items: FaqItem[];
};

export function faqGroups(plans: PricingPlan[]): FaqGroup[] {
  const published = hasPublishedPrices(plans);

  return [
    {
      id: "about",
      title: "About IntelliHire",
      intro: "Start here if you are new to IntelliHire.",
      items: [
        {
          question: "What is IntelliHire?",
          answer:
            "IntelliHire is AI recruitment software from SuperMIA. It parses resumes, ranks candidates against your rubric, runs first-round AI voice interviews and writes scorecards that cite the interview transcript. Your team reviews the evidence and makes every hiring decision.",
        },
        {
          question: "What is AI recruitment software?",
          answer:
            "AI recruitment software uses AI to handle the high-volume parts of hiring, such as reading applications, ranking candidates and running first-round interviews. Good tools leave the hiring decision with people and show the evidence behind every ranking or score. IntelliHire works this way: it ranks with reasons shown, and scorecards cite the transcript.",
        },
        {
          question: "Who makes IntelliHire?",
          answer:
            "IntelliHire is built by SuperMIA (supermia.ai), with Botfinity Inc. credited on the site. The office is at 2451 W Grapevine Mills Cir #547, Grapevine, Texas, and you can reach the team at hello@supermia.ai.",
        },
        {
          question: "Who is IntelliHire for?",
          answer:
            "IntelliHire is for in-house HR and talent teams, recruitment agencies, teams doing high-volume hiring, and startups or small businesses that hire without a full recruiting team. Plans range from small teams running their first AI-assisted hires to Enterprise, for organizations with compliance and scale requirements.",
        },
      ],
    },
    {
      id: "screening",
      title: "Screening and matching",
      intro:
        "How IntelliHire reads applications and builds a shortlist. Read more about [AI resume screening](/platform/ai-resume-screening) and [candidate matching](/platform/candidate-matching).",
      items: [
        {
          question: "How does IntelliHire screen resumes?",
          answer:
            "IntelliHire parses every resume and structures skills and experience, at any volume. It surfaces relevant experience without losing the context behind each person, so your team reviews organized profiles instead of raw documents.",
        },
        {
          question: "How does IntelliHire rank candidates?",
          answer:
            "You set the job description and rubric, and IntelliHire ranks candidates against it with explainable reasoning. Your team decides which signals carry weight and who moves forward.",
        },
        {
          question: "Can IntelliHire help write the job description?",
          answer:
            "Yes. JD and Rubric Studio drafts the job description and the evaluation rubric together, so screening, interviews and scorecards all measure the same criteria.",
        },
      ],
    },
    {
      id: "interviews",
      title: "AI interviews and scheduling",
      intro:
        "First rounds that do not wait for a free calendar slot. See how the [AI interview software](/platform/ai-interviews) works.",
      items: [
        {
          question: "How do AI voice interviews work?",
          answer:
            "Candidates take a first-round voice interview with an AI interviewer that uses natural turn-taking, at a time that suits them. The interview is transcribed, and the scorecard cites the transcript so your team can check the answers.",
        },
        {
          question: "Can AI join interviews my team runs?",
          answer:
            "Yes. On selected plans, AI-assisted human interviews let AI join your team's live interview calls alongside your interviewers.",
        },
        {
          question: "How does interview scheduling work?",
          answer:
            "IntelliHire coordinates interview scheduling so candidates are not left waiting between rounds. First-round AI voice interviews do not need a slot in a recruiter's calendar at all, because candidates take them around the clock. ATS and calendar integrations are included on selected plans.",
        },
        {
          question: "Will candidates mind being interviewed by AI?",
          answer:
            "The first-round interview fits around the candidate, not a recruiter's calendar: they can take it at any hour, the candidate portal runs device checks before they start, and they get updates by email and WhatsApp, with SMS depending on your plan. Your team reviews their answers, and no candidate is ever rejected by a machine.",
        },
        {
          question: "What do candidates need before an AI interview?",
          answer:
            "Candidates use the candidate portal, which runs device checks before the interview starts. They receive updates at each step by email and WhatsApp, with SMS depending on your plan.",
        },
      ],
    },
    {
      id: "scorecards",
      title: "Scorecards, proctoring and analytics",
      intro:
        "What your team sees after each interview. Read about [interview scorecards](/platform/interview-scorecards) and [interview proctoring](/platform/interview-proctoring).",
      items: [
        {
          question: "What is in an IntelliHire scorecard?",
          answer:
            "Each scorecard rates the candidate against your rubric and cites the parts of the interview transcript it is based on, so reviewers can read the actual answers before they rely on a rating.",
        },
        {
          question: "What does interview proctoring check?",
          answer:
            "Interview proctoring and integrity scoring, included on selected plans, flag possible integrity concerns for a person on your team to review. The privacy policy lists proctoring signals such as tab focus and device events. A flag is a prompt to look, never an automatic rejection.",
        },
        {
          question: "What recruitment analytics does IntelliHire show?",
          answer:
            "IntelliHire shows time-to-hire, funnel conversion and the stages where candidates stall, with pipeline management for every role. Analytics are included on selected plans.",
        },
      ],
    },
    {
      id: "oversight",
      title: "Human oversight and candidate data",
      intro:
        "Who decides, and how candidate information is protected. See how [human oversight and data security](/platform/human-oversight) work. The [privacy policy](/privacy) and [terms and conditions](/terms) set out the full details.",
      items: [
        {
          question: "Does IntelliHire make hiring decisions?",
          answer:
            "No. IntelliHire ranks, summarizes and flags; people decide. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate.",
        },
        {
          question: "Is using AI in hiring legal?",
          answer:
            "It depends on where you hire. Some jurisdictions add duties for employers that use AI in hiring, such as candidate notices, consent or bias audits. Under IntelliHire's terms, your organization obtains any required candidate consent for recording and automated processing and complies with applicable employment, anti-discrimination and privacy law. This is not legal advice.",
        },
        {
          question: "How is candidate data protected?",
          answer:
            "Candidate data is encrypted in transit and at rest on multi-tenant infrastructure. Access is role-based and logged, and retention windows are configurable. IntelliHire does not sell personal information.",
        },
        {
          question: "Can candidates ask about automated processing?",
          answer:
            "Yes. Candidates can request information about automated processing and, where applicable law provides, ask for human review. IntelliHire's outputs are decision support, not decisions.",
        },
        {
          question: "How long is candidate data kept?",
          answer:
            "You can set retention periods for candidate records, and interview recordings and transcripts follow configurable retention windows. When a retention period ends, records are deleted or irreversibly anonymized.",
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing and setup",
      intro: published
        ? "Every plan, with current prices, is on the [pricing page](/pricing)."
        : "All three plans are coming soon. Compare them on the [pricing page](/pricing).",
      items: [
        { question: "How much does IntelliHire cost?", answer: costAnswer(plans) },
        {
          question: "Does IntelliHire work with our ATS?",
          answer:
            "ATS and calendar integrations are included on selected plans. IntelliHire does not list specific ATS products publicly yet, so bring the name of yours to your demo and ask the team whether it is supported today.",
        },
        {
          question: "Does IntelliHire offer SSO?",
          answer:
            "Yes. Multi-tenant isolation and SSO are included on the Enterprise plan, along with custom retention and audit logging.",
        },
      ],
    },
  ];
}
