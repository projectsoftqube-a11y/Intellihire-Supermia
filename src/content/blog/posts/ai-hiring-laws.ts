import type { BlogPost } from "@/content/types";

const post: BlogPost = {
  slug: "ai-hiring-laws",
  metaTitle: "AI Hiring Laws Employers Need to Know (2026)",
  metaDescription:
    "A plain-English overview of laws that affect AI in hiring, including NYC Local Law 144 and the EU AI Act, and the practical steps employers usually take.",
  h1: "AI in Hiring Laws: What Employers Need to Know in 2026",
  category: "ai-recruiting",
  excerpt:
    "A dated, plain-English overview of AI hiring laws in New York City, the EU, Illinois, Colorado and California, and the steps employers usually take.",
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  image: {
    src: "/images/blog/blog-ai-hiring-laws.webp",
    width: 1672,
    height: 941,
    alt: "Hand turning a page of a bound document beside reading glasses and a pen",
  },
  intro: [
    "AI hiring laws now reach most of the places where software touches a candidate: sorting resumes, ranking applicants, running interviews and helping decide who moves forward. This overview covers the rules we could verify on official government sources as of October 2026, in plain English, with the dates that matter.",
    "It is written for HR, talent and legal teams using or buying AI recruiting tools. How each rule applies depends on where you hire and how you use each tool, so confirm the details with counsel.",
  ],
  answer:
    "AI hiring laws govern software that sorts resumes, ranks applicants, runs interviews or helps decide who advances. Requirements commonly include candidate notice, bias auditing, human review of automated decisions and records showing how a tool was used. Rules differ by jurisdiction, so employers should confirm what applies where they hire. This is not legal advice.",
  takeaways: [
    "NYC Local Law 144 requires an independent bias audit, a public summary of results and candidate notice 10 business days before use.",
    "The EU AI Act treats recruitment AI as high-risk. Since the 2026 Digital Omnibus, those rules apply from December 2, 2027.",
    "Illinois, Colorado and California add their own rules on notice, discrimination and records, with different dates.",
    "Everywhere, the core work is similar: know each tool, tell candidates, keep a person on every decision and keep records.",
  ],
  blocks: [
    {
      type: "callout",
      tone: "warning",
      title: "Informational only, not legal advice",
      text: "This article summarizes laws as of October 2026 so you can ask better questions. It does not cover every jurisdiction and it is not legal advice. Whether a law applies depends on your facts, and rules and dates change. Consult qualified employment counsel before relying on any point here.",
    },
    { type: "h2", id: "ai-hiring-laws-at-a-glance", text: "AI Hiring Laws at a Glance (as of October 2026)" },
    {
      type: "p",
      text: "Each law is cited from its official source below, with the date we checked it.",
    },
    {
      type: "table",
      caption: "AI hiring laws covered in this guide, as of October 2026",
      head: ["Law", "Where it applies", "Core duties", "Key date"],
      rows: [
        [
          "NYC Local Law 144",
          "Jobs located in New York City",
          "Independent bias audit, public summary, candidate notice",
          "Enforced since July 5, 2023",
        ],
        [
          "EU AI Act",
          "The EU, and providers or deployers elsewhere whose AI output is used there",
          "High-risk duties for providers and for employers as deployers",
          "High-risk rules from December 2, 2027",
        ],
        [
          "Illinois AI Video Interview Act",
          "AI analysis of recorded video interviews",
          "Notice, explanation and consent; deletion on request",
          "In effect since January 1, 2020",
        ],
        [
          "Illinois Human Rights Act (HB 3773)",
          "Illinois employers",
          "No discriminatory AI use, no zip-code proxies, notice of AI use",
          "In effect since January 1, 2026",
        ],
        [
          "Colorado SB26-189",
          "Consequential decisions, including employment",
          "Notice before use, explanation after an adverse outcome",
          "Duties from January 1, 2027",
        ],
        [
          "California regulations",
          "California employers and businesses",
          "Anti-discrimination rules for automated decisions; access and opt-out rights",
          "October 1, 2025 and January 1, 2027",
        ],
      ],
    },
    { type: "h2", id: "nyc-local-law-144", text: "NYC Local Law 144: Bias Audits and Candidate Notices" },
    {
      type: "p",
      text: "NYC Local Law 144 regulates automated employment decision tools (AEDTs): tools that use machine learning, statistical modeling, data analytics or AI to help make employment decisions and that substantially assist or replace discretionary decision-making. The city's Department of Consumer and Worker Protection (DCWP) has enforced it since July 5, 2023.",
    },
    {
      type: "p",
      text: "DCWP's guidance says the law applies when the job is located at a New York City office, at least part time, or when a fully remote job is associated with one. When it applies, employers and employment agencies must:",
    },
    {
      type: "ul",
      items: [
        "**Get a bias audit before use.** An independent auditor must evaluate the tool within one year before you use it, including selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories.",
        "**Publish a summary of the results** so it is publicly available.",
        "**Give notice 10 business days before use** to candidates and employees who live in New York City, with instructions for requesting a reasonable accommodation. It can go in the job posting, by mail or email, or, for applicants, on the employment section of your website.",
      ],
    },
    {
      type: "p",
      text: "Two details surprise teams: the employer, not the vendor, is responsible for making sure the audit was done, and the law requires the audit but no specific action based on its results.",
    },
    { type: "h2", id: "eu-ai-act-recruitment", text: "The EU AI Act: Recruitment AI Is High-Risk" },
    {
      type: "p",
      text: "The EU AI Act, Regulation (EU) 2024/1689, entered into force on August 1, 2024 and applies in stages. Annex III lists as high-risk AI intended for recruitment or selection, in particular to place targeted job ads, analyze and filter applications and evaluate candidates. The Act also reaches organizations outside the EU when their AI output is used in the EU.",
    },
    {
      type: "callout",
      tone: "note",
      title: "The date moved in 2026",
      text: "High-risk rules for Annex III systems were due on August 2, 2026. The Digital Omnibus on AI, Regulation (EU) 2026/1744, entered into force on July 27, 2026 and moved that date to **December 2, 2027**. High-risk AI embedded in products under Annex I follows on August 2, 2028.",
    },
    {
      type: "p",
      text: "For EU AI Act recruitment use, most duties sit with the provider that builds the tool. Employers are usually deployers, and Article 26 requires them to:",
    },
    {
      type: "ul",
      items: [
        "Use the system according to the provider's instructions for use.",
        "Assign human oversight to people with the necessary competence, training and authority.",
        "Monitor the system and keep the logs it generates for at least six months.",
        "Inform workers' representatives and affected workers before using it at the workplace, and tell people they are subject to its use.",
      ],
    },
    {
      type: "p",
      text: "One rule already applies. Since February 2, 2025, the Act has banned AI that infers the emotions of people in the workplace, except for medical or safety reasons. If a tool claims to read emotion from a face or voice, ask counsel whether that ban reaches your use.",
    },
    { type: "h2", id: "illinois", text: "Illinois: Video Interviews and the Human Rights Act" },
    { type: "h3", text: "Artificial Intelligence Video Interview Act (820 ILCS 42)" },
    {
      type: "p",
      text: "When an employer asks applicants to record video interviews and uses AI to analyze them, it must first tell each applicant that AI may be used, explain how it works and what general types of characteristics it evaluates, and get consent. Videos must be deleted within 30 days of an applicant's request. Employers that rely solely on AI analysis to decide who gets an in-person interview must also report demographic data each year.",
    },
    { type: "h3", text: "Human Rights Act amendment (HB 3773, Public Act 103-0804)" },
    {
      type: "p",
      text: "Since January 1, 2026, it has been unlawful for an Illinois employer to use AI that has the effect of subjecting employees to discrimination on the basis of protected classes, in decisions from recruitment and hiring to discipline and discharge, or to use zip codes as a proxy for protected classes. Failing to give notice of that AI use is also unlawful. Check with the Illinois Department of Human Rights for any rules on what the notice must contain.",
    },
    { type: "h2", id: "colorado-and-california", text: "Colorado and California" },
    {
      type: "p",
      text: "**Colorado.** SB24-205 was delayed to June 2026 and then, before it took effect, repealed and reenacted as SB26-189, signed on May 14, 2026. The new law covers automated decision-making technology used in consequential decisions, including employment. According to the legislature's fiscal note, from January 1, 2027 deployers must tell people before the technology materially influences such a decision and, after an adverse outcome, explain its role within 30 days, including the right to request meaningful human review. The fiscal note also records an April 2026 federal court order on enforcement, so confirm the current position with counsel.",
    },
    {
      type: "p",
      text: "**California.** The Civil Rights Council's regulations on automated-decision systems took effect on October 1, 2025. They make clear that such a system may violate California law if it harms applicants or employees based on protected characteristics, and that employment records, including automated-decision data, must be kept for at least four years. Separately, California Privacy Protection Agency rules on access and opt-out rights for automated decisionmaking technology apply to significant decisions, including employment, from January 1, 2027.",
    },
    { type: "h2", id: "practical-steps", text: "Practical Steps Employers Usually Take" },
    {
      type: "p",
      text: "The laws differ, but the preparation overlaps. Employers commonly take these steps with counsel and the vendor.",
    },
    {
      type: "ol",
      items: [
        "**Inventory every tool** that screens, ranks, scores, interviews or schedules candidates.",
        "**Map where you hire.** Roles in New York City, Illinois, Colorado, California or the EU can bring different duties.",
        "**Write clear notices** that say what the tool does and how to ask for an accommodation, and place them where each law requires.",
        "**Keep a person on every decision.** Decide who reviews AI outputs, what they check and how they overrule a ranking.",
        "**Commission audits where required,** such as an independent bias audit before use in New York City.",
        "**Ask vendors direct questions** and get the answers in writing.",
        "**Keep records** of notices, audit summaries, logs and decisions for the longest period that applies to you.",
      ],
    },
    {
      type: "template",
      title: "Questions to ask an AI hiring vendor",
      lines: [
        "What does the tool decide, rank or influence, and at which stage?",
        "Can a person review and overrule every output before it affects a candidate?",
        "Has an independent bias audit been done? Can we see the summary and its date?",
        "Does the tool infer emotion from a face or voice?",
      ],
    },
    {
      type: "p",
      text: "If you are still choosing a tool, our [honest comparison of AI recruiting software](/blog/best-ai-recruiting-software) has more questions to bring to every demo.",
    },
    { type: "h2", id: "where-intellihire-fits", text: "Where IntelliHire Fits" },
    {
      type: "p",
      text: "In IntelliHire, AI reads, ranks, runs first-round interviews and flags; people decide. No candidate is ever rejected by a machine. IntelliHire's [terms and conditions](/terms) say AI outputs must not be the sole basis for rejecting a candidate, and that your organization obtains any required candidate consent and complies with applicable employment, anti-discrimination and privacy law.",
    },
    {
      type: "p",
      text: "That supports the steps above, but no tool makes an employer compliant on its own, and IntelliHire does not claim compliance with or certification under any of these laws. See how [human oversight works in IntelliHire](/platform/human-oversight), read how to [check interview integrity without treating candidates as suspects](/blog/prevent-cheating-in-online-interviews), or browse the [IntelliHire blog](/blog).",
    },
  ],
  faqs: [
    {
      question: "What are AI hiring laws?",
      answer:
        "They are rules that apply when employers use software to screen, rank, interview or assess candidates. As of October 2026 they include New York City's Local Law 144, the EU AI Act and laws in Illinois, Colorado and California. Most focus on notice, discrimination risk, human review and records.",
    },
    {
      question: "Does NYC Local Law 144 apply to employers outside New York City?",
      answer:
        "It can. DCWP's guidance says the law applies when the job is located at a New York City office, at least part time, or when a fully remote job is associated with a New York City office. Employment agencies located in the city are covered too.",
    },
    {
      question: "When does the EU AI Act apply to recruitment AI?",
      answer:
        "The Act entered into force on August 1, 2024, and its ban on emotion recognition in the workplace has applied since February 2, 2025. High-risk rules for recruitment and other Annex III systems apply from December 2, 2027, after the Digital Omnibus on AI moved the original August 2, 2026 date.",
    },
    {
      question: "Does using IntelliHire make us compliant with these laws?",
      answer:
        "No tool can make an employer compliant on its own, and IntelliHire does not claim to. Compliance depends on where you hire, how you use each tool and the records you keep. IntelliHire keeps people in charge of decisions, and its terms say AI outputs must not be the sole basis for rejecting a candidate.",
    },
  ],
  sources: [
    {
      title: "Automated Employment Decision Tools (AEDT)",
      publisher: "NYC Department of Consumer and Worker Protection",
      url: "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page",
      accessed: "2026-10-27",
    },
    {
      title: "Automated Employment Decision Tools: Frequently Asked Questions",
      publisher: "NYC Department of Consumer and Worker Protection",
      url: "https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf",
      accessed: "2026-10-27",
    },
    {
      title: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
      publisher: "EUR-Lex, Publications Office of the European Union",
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      accessed: "2026-10-27",
    },
    {
      title: "Regulation (EU) 2026/1744 (Digital Omnibus on AI)",
      publisher: "EUR-Lex, Publications Office of the European Union",
      url: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng",
      accessed: "2026-10-27",
    },
    {
      title: "Timeline for the Implementation of the EU AI Act",
      publisher: "European Commission, AI Act Service Desk",
      url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act",
      accessed: "2026-10-27",
    },
    {
      title: "AI Act",
      publisher: "European Commission, Shaping Europe's digital future",
      url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
      accessed: "2026-10-27",
    },
    {
      title: "AI Act, Article 2: Scope",
      publisher: "European Commission, AI Act Service Desk",
      url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-2",
      accessed: "2026-10-27",
    },
    {
      title: "AI Act, Article 5: Prohibited AI practices",
      publisher: "European Commission, AI Act Service Desk",
      url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-5",
      accessed: "2026-10-27",
    },
    {
      title: "AI Act, Article 26: Obligations of deployers of high-risk AI systems",
      publisher: "European Commission, AI Act Service Desk",
      url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26",
      accessed: "2026-10-27",
    },
    {
      title: "AI Act, Annex III: High-risk AI systems",
      publisher: "European Commission, AI Act Service Desk",
      url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/annex-3",
      accessed: "2026-10-27",
    },
    {
      title: "Artificial Intelligence Video Interview Act (820 ILCS 42)",
      publisher: "Illinois General Assembly",
      url: "https://www.ilga.gov/Legislation/ILCS/Articles?ActID=4015&ChapterID=68",
      accessed: "2026-10-27",
    },
    {
      title: "Public Act 103-0804 (HB 3773)",
      publisher: "Illinois General Assembly",
      url: "https://www.ilga.gov/documents/legislation/publicacts/103/103-0804.htm",
      accessed: "2026-10-27",
    },
    {
      title: "SB24-205 Consumer Protections for Artificial Intelligence",
      publisher: "Colorado General Assembly",
      url: "https://leg.colorado.gov/bills/sb24-205",
      accessed: "2026-10-27",
    },
    {
      title: "SB26-189 Automated Decision-Making Technology",
      publisher: "Colorado General Assembly",
      url: "https://leg.colorado.gov/bills/sb26-189",
      accessed: "2026-10-27",
    },
    {
      title: "SB 26-189 Fiscal Note",
      publisher: "Colorado Legislative Council Staff",
      url: "https://leg.colorado.gov/bill_files/115880/download",
      accessed: "2026-10-27",
    },
    {
      title:
        "Civil Rights Council Secures Approval for Regulations to Protect Against Employment Discrimination Related to Artificial Intelligence",
      publisher: "California Civil Rights Department",
      url: "https://calcivilrights.ca.gov/2025/06/30/civil-rights-council-secures-approval-for-regulations-to-protect-against-employment-discrimination-related-to-artificial-intelligence/",
      accessed: "2026-10-27",
    },
    {
      title: "California Finalizes Regulations to Strengthen Consumers' Privacy",
      publisher: "California Privacy Protection Agency",
      url: "https://cppa.ca.gov/announcements/2025/20250923.html",
      accessed: "2026-10-27",
    },
    {
      title:
        "CCPA Updates, Cybersecurity Audits, Risk Assessments, Automated Decisionmaking Technology (ADMT), and Insurance Regulations",
      publisher: "California Privacy Protection Agency",
      url: "https://cppa.ca.gov/regulations/ccpa_updates.html",
      accessed: "2026-10-27",
    },
  ],
  supports: "/platform/human-oversight",
};

export default post;
