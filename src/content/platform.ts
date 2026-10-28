import type { MarketingPage } from "@/content/types";

/**
 * Platform pages (/platform/*).
 *
 * Facts come only from the IntelliHire Fact Sheet (Part A) and the approved
 * Home and FAQ copy. Mid-tier features (AI-assisted human interviews,
 * proctoring, analytics, ATS and calendar integrations) are written as
 * "on selected plans"; Enterprise-only items keep the Enterprise name.
 * No prices, statistics or certifications.
 */
export const PLATFORM_PAGES: MarketingPage[] = [
  /* ------------------------------------------------------------------ */
  /* 1. AI Resume Screening                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-resume-screening",
    path: "/platform/ai-resume-screening",
    kind: "platform",
    navLabel: "AI Resume Screening",
    navDescription: "Every application read and structured",
    metaTitle: "AI Resume Screening and Resume Parsing | IntelliHire",
    metaDescription:
      "IntelliHire parses every resume at any volume and structures skills and experience, so your team reviews a ranked shortlist instead of a pile of PDFs.",
    eyebrow: "Platform · Screen",
    h1: "AI Resume Screening That Reads Every Application",
    lead: [
      "When a role draws hundreds of applications, the first pass is where good people get lost. IntelliHire's AI resume screening reads every application, at any volume, and structures each person's skills and experience so they can be reviewed against the rubric you set. The strongest applicant is no longer the one nobody had time to open.",
      "Your recruiters start from organized profiles and a ranked list with the reasoning shown, not a folder of raw documents. They still build the shortlist themselves. No candidate is ever rejected by a machine.",
    ],
    answer:
      "AI resume screening is software that reads and structures every job application automatically, instead of a recruiter opening each file by hand. IntelliHire parses each resume at any volume, organizes skills and experience, and ranks applicants against the rubric your team set, with the reasoning shown. Recruiters build the shortlist themselves.",
    heroImage: {
      src: "/images/heroes/hero-resume-screening.webp",
      width: 1369,
      height: 1149,
      alt: "Recruiter at a standing desk lifting one page from rows of printed resumes",
    },
    highlights: ["Every application read", "Context, not keywords", "Your team decides"],
    sections: [
      {
        id: "how-it-reads",
        eyebrow: "Resume parsing",
        heading: "How IntelliHire Reads a Resume",
        layout: "split",
        body: [
          "Resumes arrive in every shape. Layouts differ, the same job title means different things at different companies, and plenty of careers do not run in a straight line. A recruiter reading fifty of them before lunch starts to skim.",
          "IntelliHire starts as an AI resume parser. It reads each application in full and structures the skills and experience in it, so your team reviews organized profiles instead of raw documents.",
        ],
        items: [
          {
            title: "Every application, read in full",
            text: "Each resume is parsed and structured, from the first application on a role to the last one in.",
          },
          {
            title: "Relevant experience surfaced",
            text: "IntelliHire surfaces the skills and experience that matter for the role, so a reviewer does not have to hunt through the document to find them.",
          },
          {
            title: "Organized profiles, not attachments",
            text: "Your team reviews structured profiles instead of opening files one at a time, so the hundredth application is as easy to read as the first.",
          },
        ],
      },
      {
        id: "any-volume",
        eyebrow: "Volume",
        heading: "AI Resume Screening at Any Volume",
        layout: "checklist",
        body: [
          "Manual screening breaks at volume. When three open roles each draw a few hundred applicants, someone has to skim, and skimming favors the resumes that are easiest to read rather than the people who fit best.",
          "Resume screening software earns its place by reading everything. IntelliHire reads every application, so your recruiters can get to conversations with strong candidates sooner. If most of your roles look like this, see how IntelliHire supports [high-volume hiring](/use-cases/high-volume-hiring).",
        ],
        items: [
          {
            title: "No skim-reading",
            text: "Every application gets a full read against the rubric, including the ones that arrive late on a busy Friday.",
          },
          {
            title: "The same criteria for everyone",
            text: "Each applicant is reviewed against the rubric you set for the role, so early and late applicants are measured on the same terms.",
          },
          {
            title: "Recruiter hours back on people",
            text: "The reading comes off your recruiters' desks, so their time goes to the conversations that matter.",
          },
        ],
      },
      {
        id: "context-not-keywords",
        eyebrow: "Context",
        heading: "Context, Not Keyword Matching",
        layout: "cards",
        image: {
          src: "/images/sections/section-ai-resume-screening.webp",
          width: 1672,
          height: 941,
          alt: "Man reading a single printed page at a sunlit cafe table",
        },
        body: [
          "Keyword filters are blunt. A resume that says \"client success\" can drop out of an \"account management\" search, and a career changer with the right experience can miss every term on the list. That is how great candidates get missed.",
          "IntelliHire surfaces relevant skills and experience without losing the context behind each person. Your reviewer sees what someone has actually done, not a count of matching words, and decides whether it fits the role.",
        ],
        items: [
          {
            title: "Unusual resumes stay in play",
            text: "Because no candidate is ever rejected by a machine, an unconventional background is ranked and explained rather than filtered out. Your team can still read it and move that person forward.",
          },
          {
            title: "Skills with their context",
            text: "Skills are surfaced with the experience behind them, so a reviewer judges relevance rather than vocabulary.",
          },
          {
            title: "A person makes the call",
            text: "The structured profile informs the decision. Your recruiter decides who belongs on the shortlist.",
          },
        ],
      },
      {
        id: "parsed-resume-to-shortlist",
        eyebrow: "Workflow",
        heading: "From Parsed Resume to Shortlist",
        layout: "steps",
        body: [
          "Resume parsing software is only the first step. In IntelliHire's [AI recruitment software](/), the parsed profile feeds a ranking, the ranking informs a shortlist, and a person makes each call.",
          "Ranking runs on [candidate matching](/platform/candidate-matching), which shows the reasoning behind every position. You can compare what each plan includes on the [pricing page](/pricing), and the [IntelliHire FAQ](/faq) answers common questions about screening.",
        ],
        items: [
          {
            title: "Set the rubric",
            text: "JD and Rubric Studio drafts the job description and evaluation rubric together, so screening, interviews and scorecards all measure the same criteria.",
          },
          {
            title: "Parse every application",
            text: "IntelliHire reads every resume and structures the skills and experience that matter for the role.",
          },
          {
            title: "Rank with reasons shown",
            text: "Candidates are ranked against your rubric with explainable reasoning, so you can see why one person sits above another.",
          },
          {
            title: "Your team builds the shortlist",
            text: "Recruiters review the ranking, open the profiles that need a closer look and decide who moves on to a first-round AI voice interview.",
          },
        ],
      },
    ],
    faqHeading: "Resume Screening FAQs",
    faqImage: {
      src: "/images/sections/faq-ai-resume-screening.webp",
      width: 1122,
      height: 1402,
      alt: "Hand turning the top page of a printed stack on a sunlit wooden desk",
    },
    faqs: [
      {
        question: "Does AI resume screening reject candidates automatically?",
        answer:
          "No. IntelliHire reads, structures and ranks applications, but no candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate. A low ranking is information for your team. A person on your team decides who moves forward and who does not.",
      },
      {
        question: "Will it miss good people with unusual resumes?",
        answer:
          "IntelliHire surfaces relevant skills and experience without losing the context behind each person, so a strong applicant does not have to repeat the right keywords to be noticed. Because nothing is rejected automatically, an unconventional applicant is ranked with the reasoning shown and stays open for your team to review and move forward.",
      },
      {
        question: "What is the difference between resume parsing and candidate matching?",
        answer:
          "Resume parsing reads each application and structures the skills and experience in it. Candidate matching takes those structured profiles and ranks them against the rubric for the role, with the reasoning shown. Parsing makes every application readable; matching shows your team where each person sits and why.",
      },
      {
        question: "Do our recruiters still read resumes?",
        answer:
          "Yes, the ones that need a person. IntelliHire takes the first full read of every application off their desks. Recruiters then review structured profiles and the ranking reasoning, open the applications that deserve a closer look and build the shortlist. The AI handles the volume; your team makes the judgment calls.",
      },
      {
        question: "What do we set up before screening starts?",
        answer:
          "A job description and a rubric for the role. JD and Rubric Studio drafts both together, so the criteria used for screening are the same ones your interviews and scorecards measure. Once your team is happy with the criteria, every application is reviewed against them.",
      },
    ],
    cta: {
      heading: "See AI Resume Screening on Your Next Open Role",
      body: "Bring a role you are hiring for now. We'll walk through how IntelliHire would read, structure and rank its applications, and show where your team makes the call.",
    },
    related: [
      "/platform/candidate-matching",
      "/platform/ai-interviews",
      "/use-cases/high-volume-hiring",
    ],
    primaryKeyword: "ai resume screening",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 2. Candidate Matching                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "candidate-matching",
    path: "/platform/candidate-matching",
    kind: "platform",
    navLabel: "Candidate Matching",
    navDescription: "Ranked against your rubric, with reasons",
    metaTitle: "AI Candidate Matching With Explainable Ranking | IntelliHire",
    metaDescription:
      "Draft the job description and rubric in IntelliHire, then see candidates ranked against it with reasons shown. Your team decides which signals matter.",
    eyebrow: "Platform · Screen",
    h1: "AI Candidate Matching Against the Rubric You Set",
    lead: [
      "A ranked list is only useful if someone can explain it. IntelliHire's AI candidate matching ranks every applicant against the rubric your team set for the role and shows the reasoning behind each position, so a hiring manager can see why one person sits above another.",
      "You decide which signals carry weight. The ranking organizes the field; your team reads the reasons, builds the shortlist and decides who moves forward.",
    ],
    answer:
      "AI candidate matching is software that ranks applicants against the requirements a hiring team defines for a role. IntelliHire ranks every applicant against the rubric your team set and shows the reasoning behind each position, so a hiring manager can see why one person sits above another. Your team decides which signals carry weight.",
    heroImage: {
      src: "/images/heroes/hero-candidate-matching.webp",
      width: 1369,
      height: 1149,
      alt: "Two colleagues arranging coloured notes into a ranked column on a glass wall",
    },
    highlights: ["Ranked against your rubric", "Reasoning shown", "You decide what matters"],
    sections: [
      {
        id: "start-with-the-rubric",
        eyebrow: "JD and Rubric Studio",
        heading: "Start With the Job Description and Rubric",
        layout: "split",
        body: [
          "Matching is only as good as the criteria behind it. Before anyone is ranked, JD and Rubric Studio drafts the job description and rubric together, so the role you advertise and the role you assess start from the same list of criteria.",
          "That rubric then carries through [IntelliHire](/): screening, first-round interviews and scorecards all measure the same things. If you are writing one from scratch, our guide on [how to build an interview scoring rubric](/blog/interview-scoring-rubric) covers competencies, rating scales and a free template.",
        ],
        items: [
          {
            title: "One draft, two documents",
            text: "The job description and evaluation rubric are drafted together, instead of in separate tools by different people at different times.",
          },
          {
            title: "Your hiring manager defines the role",
            text: "Your team decides what the role actually needs. The rubric is where that decision is written down, before a single resume is ranked.",
          },
          {
            title: "Same criteria at every stage",
            text: "A candidate is not measured on one thing at screening and something else at interview. The criteria stay the same from first read to final scorecard.",
          },
        ],
      },
      {
        id: "ranking-with-reasons",
        eyebrow: "Explainable ranking",
        heading: "AI Candidate Matching With Reasons You Can Read",
        layout: "cards",
        image: {
          src: "/images/sections/section-candidate-matching.webp",
          width: 1672,
          height: 941,
          alt: "Hand pinning a card into a grid of blank cards on a corkboard",
        },
        body: [
          "Most hiring managers have seen a ranked list they could not explain. A score without reasoning tends to get ignored or, worse, trusted without question.",
          "IntelliHire's candidate ranking comes with explainable reasoning against your rubric. Your team can see why each person is where they are on the list, and push back when the reasoning does not hold.",
        ],
        items: [
          {
            title: "Reasons for every position",
            text: "Each candidate's place in the ranking comes with the reasoning behind it, tied to your rubric rather than a bare number.",
          },
          {
            title: "Comparisons you can defend",
            text: "When someone asks why one candidate sits above another, the reasons are there to read, tied to criteria the team already agreed on.",
          },
          {
            title: "Room to disagree",
            text: "If the reasoning misses something a person can see, your team can still move that candidate forward. The ranking informs the shortlist; it does not set it.",
          },
        ],
      },
      {
        id: "signals-that-carry-weight",
        eyebrow: "Your call",
        heading: "You Decide Which Signals Carry Weight",
        layout: "checklist",
        body: [
          "Candidate matching software should not decide what good looks like for your team. In IntelliHire, those calls stay with the people who will work alongside the hire.",
          "This matters most when a recruiter and a hiring manager see a role differently. Settling it in the rubric, before anyone is ranked, is easier than arguing over a shortlist afterward.",
        ],
        items: [
          {
            title: "What the role actually needs",
            text: "Your hiring manager sets the criteria in the rubric, and candidates are ranked against them.",
          },
          {
            title: "Which signals carry weight",
            text: "Depth in one area may matter more than breadth across several. Your team decides which signals carry weight for this hire.",
          },
          {
            title: "Who moves forward",
            text: "The ranked list is a starting point for review. People choose who goes to interview, and no candidate is ever rejected by a machine.",
          },
        ],
      },
      {
        id: "ranked-list-to-interview",
        eyebrow: "Next steps",
        heading: "From Ranked List to First-Round Interview",
        layout: "steps",
        body: [
          "Matching sits in the middle of the hiring round. It turns parsed applications into an ordered, explained list your team can act on.",
          "The profiles it ranks come from [AI resume screening](/platform/ai-resume-screening), which reads and structures every application first. Compare what each plan includes on the [pricing page](/pricing), or find short answers on the [IntelliHire FAQ](/faq).",
        ],
        items: [
          {
            title: "Applications are parsed",
            text: "Every resume is read and its skills and experience structured, at any volume.",
          },
          {
            title: "Candidates are ranked",
            text: "Each applicant is ranked against your rubric, with the reasoning shown.",
          },
          {
            title: "Your team reviews the reasons",
            text: "Recruiters and hiring managers check the reasoning against what they know about the role and build the shortlist.",
          },
          {
            title: "Shortlisted candidates interview",
            text: "First-round AI voice interviews run around the clock, and the scorecards that follow measure the same rubric the ranking used.",
          },
        ],
      },
    ],
    faqHeading: "Candidate Matching FAQs",
    faqImage: {
      src: "/images/sections/faq-candidate-matching.webp",
      width: 1122,
      height: 1402,
      alt: "Man at a desk comparing two printed sheets held side by side",
    },
    faqs: [
      {
        question: "Is AI candidate matching a black box?",
        answer:
          "No. Every ranking comes with explainable reasoning against your rubric, so your team can see why one candidate sits above another. If the reasoning does not hold up, your team can disagree with it. The ranking organizes the field, and people decide who moves forward.",
      },
      {
        question: "What does IntelliHire match candidates against?",
        answer:
          "The rubric for the role. JD and Rubric Studio drafts the job description and evaluation rubric together, and every applicant is ranked against those criteria. Because screening, interviews and scorecards share the same rubric, candidates are measured on the same terms from first read to final scorecard.",
      },
      {
        question: "Who decides which candidate signals matter most?",
        answer:
          "Your team does. A hiring manager knows whether depth in one skill matters more than breadth across several, and that judgment belongs with them. IntelliHire ranks candidates against the criteria your team sets, shows its reasoning and leaves the shortlist to the people who own the hire.",
      },
      {
        question: "What if a strong candidate is ranked low?",
        answer:
          "Then your team moves them forward. A ranking is decision support, not a decision, and no candidate is ever rejected by a machine. Because the reasoning is shown, a low ranking for a strong person also tells you something useful: the rubric may need another look before the next round.",
      },
      {
        question: "Why rank against a rubric instead of the job description alone?",
        answer:
          "A job description describes the role for candidates. A rubric spells out what good looks like for each criterion, so the ranking has something specific to measure against. JD and Rubric Studio drafts both together, which keeps what you advertise and what you assess in step.",
      },
    ],
    cta: {
      heading: "See AI Candidate Matching on Your Next Open Role",
      body: "Bring a role you are hiring for now. We'll show how IntelliHire would draft its rubric, rank applicants against it and explain each position, with your team making every call.",
    },
    related: [
      "/platform/ai-resume-screening",
      "/platform/interview-scorecards",
      "/blog/interview-scoring-rubric",
    ],
    primaryKeyword: "ai candidate matching",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 3. AI Interviews                                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "ai-interviews",
    path: "/platform/ai-interviews",
    kind: "platform",
    navLabel: "AI Interviews",
    navDescription: "First-round voice interviews, any hour",
    metaTitle: "AI Interview Software for First Rounds | IntelliHire",
    metaDescription:
      "Run first-round AI voice interviews around the clock, add AI to your team's live interviews and keep scheduling moving, while people decide who advances.",
    eyebrow: "Platform · Interview",
    h1: "AI Interview Software: First-Round Voice Interviews, Any Time of Day",
    lead: [
      "The slowest part of most hiring rounds is getting the first conversation on the calendar. IntelliHire's AI interview software takes that wait out. Candidates take a first-round voice interview with natural turn-taking at whatever hour suits them, and your team reviews the transcript-backed scorecard on its own schedule.",
      "On selected plans, AI can also join your team's own live interviews, and scheduling keeps candidates moving between rounds. People decide who advances.",
    ],
    answer:
      "AI interview software runs a structured first-round interview without a human interviewer present. IntelliHire interviews candidates by voice with natural turn-taking, at whatever hour suits them, then produces a scorecard your team reviews against the transcript. On selected plans AI can also join your team's own live interviews. People decide who advances.",
    heroImage: {
      src: "/images/heroes/hero-ai-interviews.webp",
      width: 1369,
      height: 1149,
      alt: "Candidate in headphones speaking at a home desk in evening lamplight",
    },
    highlights: ["First rounds, any hour", "Natural turn-taking", "People decide who advances"],
    sections: [
      {
        id: "ai-voice-interviews",
        eyebrow: "Autonomous voice interviews",
        heading: "How the AI Interview Software Runs a First Round",
        layout: "steps",
        body: [
          "An AI voice interview is a first-round conversation the candidate takes on their own time. There is no slot to book and no recruiter calendar to wait on, because the interview runs around the clock.",
          "Automated interviews only help if the output is usable. Because [IntelliHire](/) uses one rubric from screening to scorecard, the interview measures the same criteria the role was screened on. Every conversation is transcribed, and [interview scorecards](/platform/interview-scorecards) cite the transcript, so your team can check what was actually said.",
        ],
        items: [
          {
            title: "The candidate knows what is next",
            text: "Updates by email and WhatsApp, with SMS depending on your plan, tell candidates where they stand and what to do next.",
          },
          {
            title: "Device check in the portal",
            text: "Before the interview starts, the candidate portal runs device checks, so technical problems are caught early.",
          },
          {
            title: "The voice interview",
            text: "An AI interviewer holds a first-round voice conversation with natural turn-taking, at whatever hour the candidate chooses.",
          },
          {
            title: "Transcript and scorecard",
            text: "The interview is transcribed and a scorecard is drafted that cites the transcript. Your team reviews it and decides who advances.",
          },
        ],
      },
      {
        id: "ai-assisted-interviews",
        eyebrow: "AI-assisted interviews",
        heading: "AI That Joins Your Team's Live Interviews",
        layout: "split",
        body: [
          "Some conversations need a person. A hiring manager may want to meet candidates early, and the conversations that close a hire belong to your team.",
          "On selected plans, AI-assisted interviews let AI join your team's live interview calls alongside your interviewers. See which plans include them on the [pricing page](/pricing).",
        ],
        items: [
          {
            title: "Your interviewer leads",
            text: "A person on your team runs the conversation. AI joins the live call alongside them.",
          },
          {
            title: "AI first rounds, human follow-ups",
            text: "Let autonomous AI voice interviews handle the first round at any hour, then bring your people into the conversations that need them.",
          },
          {
            title: "A dedicated interviewer portal on Enterprise",
            text: "Enterprise teams also get a dedicated interviewer portal for the people on your side of the call.",
          },
        ],
      },
      {
        id: "interview-scheduling",
        eyebrow: "Scheduling",
        heading: "Interview Scheduling Software That Keeps Candidates Moving",
        layout: "cards",
        image: {
          src: "/images/sections/section-ai-interviews.webp",
          width: 1672,
          height: 941,
          alt: "Interviewer gesturing during a video call with a candidate on a laptop",
        },
        body: [
          "Momentum disappears between calendars and follow-ups. Every day spent arranging a conversation is a day a strong candidate can walk away.",
          "IntelliHire coordinates interview scheduling so candidates are not left waiting between rounds, and the first round does not need anyone's calendar at all.",
        ],
        items: [
          {
            title: "First rounds skip the calendar",
            text: "AI voice interviews do not need a slot in a recruiter's week, so the first round can happen as soon as the candidate is ready.",
          },
          {
            title: "Next steps coordinated",
            text: "Scheduling coordinates the rounds that follow, so the handoff from the AI first round to your team keeps moving.",
          },
          {
            title: "Connected to your tools",
            text: "On selected plans, ATS and calendar integrations connect IntelliHire to the tools you already run. Bring the names of yours to the demo and ask which are supported today.",
          },
        ],
      },
      {
        id: "candidate-experience",
        eyebrow: "Candidate experience",
        heading: "What Candidates Experience in an AI Voice Interview",
        layout: "checklist",
        body: [
          "Candidates judge your company by how the first round feels, and that matters even more when the first interviewer is AI. The process should be clear, convenient and fair to them.",
          "For help deciding what a first round should cover, see our guide to [writing structured interview questions](/blog/structured-interview-questions), with examples by role. The [IntelliHire FAQ](/faq) answers the questions hiring teams ask most about AI interviews.",
        ],
        items: [
          {
            title: "An interview at their hour",
            text: "Candidates take the first round when it suits them, including evenings and weekends, without trading emails to find a slot.",
          },
          {
            title: "Device checks before they start",
            text: "The candidate portal checks their setup first, so technical problems surface before the interview, not halfway through it.",
          },
          {
            title: "Updates at every step",
            text: "Email and WhatsApp updates, with SMS depending on your plan, tell them where they stand and what comes next.",
          },
          {
            title: "A person reviews their answers",
            text: "Your team reads the transcript-backed scorecard, and no candidate is ever rejected by a machine.",
          },
        ],
      },
    ],
    faqHeading: "AI Interview FAQs",
    faqImage: {
      src: "/images/sections/faq-ai-interviews.webp",
      width: 1122,
      height: 1402,
      alt: "Headphones resting on a closed laptop beside a notebook at dusk",
    },
    faqs: [
      {
        question: "What is an AI voice interview?",
        answer:
          "It is a first-round interview the candidate takes by voice with an AI interviewer that uses natural turn-taking, at a time that suits them. The conversation is transcribed, and the scorecard cites the transcript, so your team can read the actual answers before deciding who moves to the next round.",
      },
      {
        question: "Does the AI decide who moves to the next round?",
        answer:
          "No. The AI runs the first-round conversation and drafts a scorecard against your rubric. Your team reads the evidence and decides who advances. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate.",
      },
      {
        question: "Can AI join interviews our own team runs?",
        answer:
          "Yes, on selected plans. AI-assisted human interviews let AI join your team's live interview calls alongside your interviewers, while your interviewer leads the conversation. Enterprise teams also get a dedicated interviewer portal for the people running those calls.",
      },
      {
        question: "Which calendar and ATS tools does IntelliHire connect to?",
        answer:
          "ATS and calendar integrations are available on selected plans. IntelliHire does not list specific products publicly yet, so bring the names of your ATS and calendar tools to your demo and ask the team which are supported today. First-round AI voice interviews do not need a calendar slot at all.",
      },
      {
        question: "How should candidates prepare for an AI interview?",
        answer:
          "A working device and a quiet place to talk are the main things. The candidate portal runs device checks before the interview starts, and updates by email and WhatsApp, with SMS depending on your plan, tell them what to expect at each step. They can take the interview at any hour.",
      },
    ],
    cta: {
      heading: "See AI Interview Software on Your Next Open Role",
      body: "Bring a role you are hiring for now. We'll show how a first-round AI voice interview would run for it, what your team sees afterward and where people make the call.",
    },
    related: [
      "/platform/interview-scorecards",
      "/platform/interview-proctoring",
      "/blog/structured-interview-questions",
    ],
    primaryKeyword: "ai interview software",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 4. Interview Proctoring                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "interview-proctoring",
    path: "/platform/interview-proctoring",
    kind: "platform",
    navLabel: "Interview Proctoring",
    navDescription: "Integrity flags for a person to review",
    metaTitle: "Interview Proctoring and Integrity Scoring | IntelliHire",
    metaDescription:
      "IntelliHire monitors interview integrity and flags concerns for your team to review, so remote interviews stay trustworthy without treating people as suspects.",
    eyebrow: "Platform · Interview",
    h1: "Interview Proctoring That Flags Concerns for a Person to Review",
    lead: [
      "Remote interviews raise a fair question: was that answer the candidate's own? IntelliHire's interview proctoring software monitors interview integrity and flags possible concerns for a person on your team to review. It does not accuse anyone, and it never rejects anyone.",
      "Proctoring and integrity scoring are available on selected plans. The signals are the ones listed in the privacy policy, such as tab focus and device events, and every flag ends with a human decision.",
    ],
    answer:
      "Interview proctoring software monitors a remote interview for signs that the answers may not be the candidate's own. IntelliHire tracks the signals listed in its privacy policy, such as tab focus and device events, and flags possible concerns for a person on your team to review. It never accuses or rejects anyone.",
    heroImage: {
      src: "/images/heroes/hero-interview-proctoring.webp",
      width: 1369,
      height: 1149,
      alt: "Reviewer studying a tablet in a daylit office beside an empty meeting room",
    },
    highlights: ["Flags for human review", "Tab focus and device events", "Never an automatic rejection"],
    sections: [
      {
        id: "what-proctoring-checks",
        eyebrow: "Signals",
        heading: "What the Interview Proctoring Software Checks",
        layout: "split",
        body: [
          "AI proctoring is most useful when it is narrow and easy to explain. The proctoring signals IntelliHire uses, such as tab focus and device events, are listed in the [privacy policy](/privacy), so your team and your candidates can read the same description.",
          "Proctoring follows the same rule as the rest of [IntelliHire](/): software flags, and [people make the decisions](/platform/human-oversight).",
        ],
        items: [
          {
            title: "Tab focus",
            text: "Whether the interview tab loses focus, for example when the candidate switches to another tab. On its own, that proves nothing. It is a reason to look.",
          },
          {
            title: "Device events",
            text: "Device events during the interview, as described in the privacy policy. Like tab focus, they are a prompt for review, not proof of anything.",
          },
          {
            title: "Integrity scoring",
            text: "Integrity scoring sits alongside the flags as a prompt for review. Your reviewer decides what, if anything, it means.",
          },
        ],
      },
      {
        id: "flags-not-verdicts",
        eyebrow: "Human review",
        heading: "Flags, Not Verdicts",
        layout: "contrast",
        body: [
          "A change in tab focus can mean a candidate looked something up. It can also mean a notification appeared, someone walked into the room or a browser misbehaved. That is why a flag in IntelliHire is a prompt to look, never an automatic rejection.",
          "Interview integrity matters, and so does a candidate's trust in your process. Keeping the verdict with a person protects both.",
        ],
        contrast: {
          leftLabel: "Proctoring does",
          rightLabel: "Your reviewer decides",
          rows: [
            {
              left: "Notes signals such as tab focus and device events",
              right: "Whether a signal matters in context",
            },
            {
              left: "Flags possible integrity concerns",
              right: "Whether there is a real concern at all",
            },
            {
              left: "Adds integrity scoring as a prompt for review",
              right: "What to ask the candidate, if anything",
            },
            {
              left: "Never rejects a candidate",
              right: "Who moves forward, every time",
            },
          ],
        },
      },
      {
        id: "reviewing-a-flag",
        eyebrow: "In practice",
        heading: "How to Review a Flag Fairly",
        layout: "steps",
        body: [
          "A consistent review routine keeps flags fair to every candidate on the role. Here is a simple one your reviewers can follow.",
          "For the wider picture, including what proctoring can and cannot detect, read our guide on [how to prevent cheating in online interviews](/blog/prevent-cheating-in-online-interviews).",
        ],
        items: [
          {
            title: "Read the flag with the transcript",
            text: "Look at the flag next to the interview transcript and the answers the candidate gave.",
          },
          {
            title: "Judge the answer, not the signal",
            text: "A specific, detailed answer tells you more than a tab change. A vague answer alongside a flag is a reason to ask more.",
          },
          {
            title: "Ask before you conclude",
            text: "If a concern remains, raise it with the candidate or cover the topic again in a live conversation with your team.",
          },
          {
            title: "Apply one standard",
            text: "Treat every flag on the role the same way, so no candidate's outcome depends on how suspicious a particular reviewer happens to be.",
          },
        ],
      },
      {
        id: "telling-candidates",
        eyebrow: "Transparency",
        heading: "Telling Candidates Up Front",
        layout: "checklist",
        body: [
          "Proctoring should never be a surprise. Under IntelliHire's terms, your organization, as data controller, obtains any required candidate consent for recording and automated processing and complies with applicable employment, anti-discrimination and privacy law. Telling candidates early is also simply fairer, and it heads off misunderstandings.",
          "Proctoring and integrity scoring are available on selected plans; see the [pricing page](/pricing). Common questions about candidate data are answered on the [IntelliHire FAQ](/faq).",
        ],
        items: [
          {
            title: "Say it in the invitation",
            text: "Tell candidates before the interview that it is proctored, so nobody learns about it afterward.",
          },
          {
            title: "Name the signals",
            text: "Explain in plain words what is monitored, such as tab focus and device events, and suggest they close other tabs and silence notifications before they start.",
          },
          {
            title: "Explain what a flag means",
            text: "Make clear that a flag goes to a person for review and is never an automatic rejection.",
          },
          {
            title: "Give them a way to ask",
            text: "Tell candidates who to contact with questions, and that they can ask about automated processing and, where the law provides, request human review.",
          },
        ],
      },
    ],
    faqHeading: "Interview Proctoring FAQs",
    faqImage: {
      src: "/images/sections/faq-interview-proctoring.webp",
      width: 1122,
      height: 1402,
      alt: "Reviewer leaning back in a chair reading a tablet in a bright office",
    },
    faqs: [
      {
        question: "Does a proctoring flag mean the candidate cheated?",
        answer:
          "No. A flag means a signal, such as a change in tab focus, occurred during the interview and a person should look at it. Many signals have ordinary explanations. Your reviewer reads the flag in context and decides whether there is a concern at all. A flag is a prompt to look, never an automatic rejection.",
      },
      {
        question: "Is AI proctoring invasive for candidates?",
        answer:
          "The proctoring signals IntelliHire uses, such as tab focus and device events, are listed in its privacy policy. Your organization, as data controller, obtains any required consent for recording and automated processing. Telling candidates in advance what is monitored, and that a person reviews every flag, keeps the process transparent.",
      },
      {
        question: "Which plans include interview proctoring?",
        answer:
          "Interview proctoring and integrity scoring are available on selected plans. The pricing page lists what each plan includes, and the team can confirm in a demo which plan fits the way your team runs and reviews interviews.",
      },
      {
        question: "Is proctoring the same as the device check?",
        answer:
          "No, they do different jobs. The candidate portal runs device checks before the interview starts, so technical problems are caught early. Proctoring monitors integrity during the interview and flags possible concerns for review. One helps the candidate get started; the other gives your reviewers something to look at.",
      },
      {
        question: "What does cheating in a remote interview usually look like?",
        answer:
          "Common concerns include reading answers from another tab, getting help from someone else in the room or using another tool to draft responses. Proctoring signals can point to a moment worth checking, but they cannot prove intent. That is why a person reviews every flag and decides what, if anything, it means.",
      },
    ],
    cta: {
      heading: "See Interview Proctoring on Your Next Open Role",
      body: "Bring a role where interview integrity matters to you. We'll show what a flag looks like, how your team would review it and where a person makes every call.",
    },
    related: [
      "/platform/ai-interviews",
      "/platform/human-oversight",
      "/blog/prevent-cheating-in-online-interviews",
    ],
    primaryKeyword: "interview proctoring software",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 5. Interview Scorecards                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "interview-scorecards",
    path: "/platform/interview-scorecards",
    kind: "platform",
    navLabel: "Interview Scorecards",
    navDescription: "Ratings that cite the transcript",
    metaTitle: "Interview Scorecards With Transcript Evidence | IntelliHire",
    metaDescription:
      "Every IntelliHire scorecard points to the part of the interview transcript it came from, so reviewers can check the evidence before they decide.",
    eyebrow: "Platform · Decide",
    h1: "Interview Scorecards That Cite the Transcript",
    lead: [
      "Most hiring debriefs run on memory: three interviewers, three sets of notes and a lot of \"I had a good feeling.\" IntelliHire's interview scorecard software works differently. Every scorecard rates the candidate against your rubric and cites the part of the interview transcript each rating came from.",
      "Before anyone relies on a rating, they can read the answer behind it. Your team decides what the evidence means.",
    ],
    answer:
      "An interview scorecard is a structured rating of a candidate against the criteria set for a role. IntelliHire rates each candidate against your rubric and cites the part of the interview transcript every rating came from, so a reviewer can read the answer behind a score before relying on it. Your team decides what the evidence means.",
    heroImage: {
      src: "/images/heroes/hero-interview-scorecards.webp",
      width: 1369,
      height: 1149,
      alt: "Hiring manager tracing a line on a printed document while writing a note",
    },
    highlights: ["Cites the transcript", "Rated against your rubric", "Your team weighs evidence"],
    sections: [
      {
        id: "what-a-scorecard-includes",
        eyebrow: "Inside a scorecard",
        heading: "What an IntelliHire Scorecard Includes",
        layout: "cards",
        image: {
          src: "/images/sections/section-interview-scorecards.webp",
          width: 1672,
          height: 941,
          alt: "Two colleagues writing on printed grid sheets at a shared desk",
        },
        body: [
          "A scorecard should answer two questions quickly: how did this candidate do against what the role needs, and how do we know? After each AI voice interview, IntelliHire drafts a scorecard that answers both.",
          "The criteria come from the same rubric used for [candidate matching](/platform/candidate-matching), so the scorecard measures what the job description set out.",
        ],
        items: [
          {
            title: "Ratings against your rubric",
            text: "The candidate is rated against the criteria your team set for the role, not a generic template.",
          },
          {
            title: "Transcript citations",
            text: "Each rating points to the part of the interview transcript behind it, so the evidence sits next to the judgment.",
          },
          {
            title: "One rubric, start to finish",
            text: "Screening, interviews and scorecards share one rubric, so a candidate is assessed on the same terms all the way through.",
          },
        ],
      },
      {
        id: "transcript-evidence",
        eyebrow: "Evidence",
        heading: "Interview Scorecard Software That Shows Its Evidence",
        layout: "split",
        body: [
          "A rating on its own asks for trust. A rating with the candidate's own words beside it can be checked. That difference decides whether a hiring panel uses a scorecard or quietly ignores it.",
          "A reviewer who doubts a rating reads the cited answer, decides whether it supports the score and brings that view to the debrief. The AI drafts the scorecard; your team decides what the evidence means. That is how [IntelliHire](/) keeps people in charge of every hiring decision.",
        ],
        items: [
          {
            title: "Check a rating against the answer",
            text: "Read what the candidate actually said before you accept the rating attached to it.",
          },
          {
            title: "Disagree on the same words",
            text: "If two reviewers read an answer differently, they are debating the same transcript, not two memories of the call.",
          },
          {
            title: "Explain the basis of a decision",
            text: "Because ratings come with their source, a hiring manager can show what a decision rested on when someone asks.",
          },
        ],
      },
      {
        id: "comparing-candidates",
        eyebrow: "Debriefs",
        heading: "Comparing Candidates on the Same Evidence",
        layout: "steps",
        body: [
          "A structured interview scorecard is only fair if every candidate is measured on the same criteria and every rating can be traced. When both are true, a debrief stops being a contest of impressions.",
          "Treat each scorecard as a candidate evaluation report your panel can check line by line. If you are still building the rubric behind it, our guide on [building an interview scoring rubric](/blog/interview-scoring-rubric) includes a free template.",
        ],
        items: [
          {
            title: "Read before you meet",
            text: "Each reviewer reads the scorecards and cited answers before the debrief, not during it.",
          },
          {
            title: "Compare criterion by criterion",
            text: "Line candidates up on the same rubric criteria instead of overall impressions.",
          },
          {
            title: "Settle disagreements on the transcript",
            text: "When reviewers differ, go back to the cited answer and agree on what it shows.",
          },
          {
            title: "The hiring manager makes the call",
            text: "Scores inform the decision. Your team decides who moves forward and who gets the offer.",
          },
        ],
      },
      {
        id: "before-you-rely-on-a-rating",
        eyebrow: "Reviewer checklist",
        heading: "Four Questions to Ask Before You Rely on a Rating",
        layout: "checklist",
        body: [
          "Transcript evidence makes ratings checkable, but someone still has to check. These four questions keep a review honest.",
          "Compare what each plan includes on the [pricing page](/pricing), and find more answers on the [IntelliHire FAQ](/faq).",
        ],
        items: [
          {
            title: "Does the answer address the criterion?",
            text: "A fluent answer to a different question should not earn a strong rating.",
          },
          {
            title: "Is the excerpt the whole answer?",
            text: "Read around the cited passage if the surrounding context could change its meaning.",
          },
          {
            title: "Would another reviewer read it the same way?",
            text: "If not, raise it in the debrief rather than settling it alone.",
          },
          {
            title: "Does anything outside the interview change the picture?",
            text: "References, work samples and later rounds belong in the decision too. The scorecard is one input, not the verdict.",
          },
        ],
      },
    ],
    faqHeading: "Interview Scorecard FAQs",
    faqImage: {
      src: "/images/sections/faq-interview-scorecards.webp",
      width: 1122,
      height: 1402,
      alt: "Hand underlining a line on a printed document with a black pen",
    },
    faqs: [
      {
        question: "How are IntelliHire scorecards created?",
        answer:
          "After an AI voice interview, the conversation is transcribed and a scorecard is drafted against the rubric for the role. Each rating cites the parts of the transcript it is based on. Your team then reviews the scorecard, reads the cited answers and decides what the evidence means for the candidate.",
      },
      {
        question: "Can we trust an AI-drafted rating?",
        answer:
          "You do not have to take it on trust. Every rating points to the transcript, so a reviewer can read the candidate's actual answer and judge whether it supports the score. The scorecard is decision support. A person on your team decides who moves forward, and no candidate is ever rejected by a machine.",
      },
      {
        question: "Which rubric does the scorecard use?",
        answer:
          "The same one used to screen and rank the role. JD and Rubric Studio drafts the job description and evaluation rubric together, so screening, interviews and scorecards all measure the same criteria. A candidate's scorecard stays consistent with the reasons they were shortlisted.",
      },
      {
        question: "Do scorecards help when several people are involved in a hire?",
        answer:
          "Yes. When every candidate is rated on the same rubric and every rating cites the transcript, a panel compares like with like instead of comparing memories. Disagreements become a question of what the candidate said, which everyone on the panel can read for themselves.",
      },
      {
        question: "Does a strong scorecard mean we should make an offer?",
        answer:
          "Not on its own. A scorecard shows how the candidate's interview answers measure up against your rubric, with the transcript to back each rating. Later rounds, references and your team's judgment belong in the decision too. Your hiring manager reads the evidence and makes the offer decision, every time.",
      },
    ],
    cta: {
      heading: "See Interview Scorecards on Your Next Open Role",
      body: "Bring a role you are hiring for now. We'll show a scorecard built on its rubric, the transcript evidence behind each rating and how your panel would use it to decide.",
    },
    related: [
      "/platform/ai-interviews",
      "/platform/candidate-matching",
      "/blog/interview-scoring-rubric",
    ],
    primaryKeyword: "interview scorecard software",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 6. Recruitment Analytics                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "recruitment-analytics",
    path: "/platform/recruitment-analytics",
    kind: "platform",
    navLabel: "Recruitment Analytics",
    navDescription: "Time-to-hire, funnel and stall points",
    metaTitle: "Recruitment Analytics and Pipeline Management | IntelliHire",
    metaDescription:
      "Track time-to-hire, funnel conversion and where candidates stall, and manage every candidate in one pipeline view.",
    eyebrow: "Platform · Decide",
    h1: "Recruitment Analytics: See Where Your Pipeline Stalls",
    lead: [
      "Most talent leaders know hiring is slow. Fewer can say exactly where. IntelliHire's recruitment analytics software shows time-to-hire, funnel conversion and the stages where candidates stall, and tracks every candidate across the pipeline, so you can see the bottleneck instead of guessing at it.",
      "Recruitment analytics and pipeline management are available on selected plans. The numbers show where hiring slows; your team decides what to change.",
    ],
    answer:
      "Recruitment analytics is the measurement of how a hiring process performs, stage by stage. IntelliHire reports time-to-hire, funnel conversion and the stages where candidates stall, and tracks every candidate across one pipeline view, so a talent leader can see the bottleneck rather than guess at it. Available on selected plans.",
    heroImage: {
      src: "/images/heroes/hero-recruitment-analytics.webp",
      width: 1369,
      height: 1149,
      alt: "Three colleagues discussing a wall display, one pointing at its lower edge",
    },
    highlights: ["Time-to-hire tracked", "Funnel conversion", "Where candidates stall"],
    sections: [
      {
        id: "time-to-hire-and-conversion",
        eyebrow: "Core metrics",
        heading: "Recruitment Analytics Software for Time-to-Hire and Funnel Conversion",
        layout: "cards",
        image: {
          src: "/images/sections/section-recruitment-analytics.webp",
          width: 1672,
          height: 941,
          alt: "Hand placing a card at the end of a row of blank cards on a desk",
        },
        body: [
          "Two measures tell you a lot about a hiring round. Time-to-hire shows how long hiring takes. Funnel conversion shows how many candidates make it from one stage to the next. Read together, they help you tell a volume problem from a process problem.",
          "IntelliHire shows both, so time to hire tracking does not have to live in a spreadsheet someone updates at the end of the quarter. For formulas and what to do when a number moves, read our guide to [recruitment metrics that matter](/blog/recruitment-metrics).",
        ],
        items: [
          {
            title: "Time-to-hire",
            text: "How long hiring takes, so you can see when a round is running long while there is still time to act.",
          },
          {
            title: "Funnel conversion",
            text: "How candidates move from stage to stage, so a sudden drop between two stages stands out.",
          },
          {
            title: "Stall points",
            text: "The stages where candidates wait or drop away, so you know where to look first.",
          },
        ],
      },
      {
        id: "where-candidates-stall",
        eyebrow: "Bottlenecks",
        heading: "Where Candidates Stall, and What to Look at First",
        layout: "contrast",
        body: [
          "A stall point is a stage where candidates wait longer than they should or quietly drop out. The longer a strong candidate waits, the more likely they are to accept another offer.",
          "IntelliHire shows the stages where candidates stall. The fix is your team's call, but the causes are often familiar. If the wait sits between shortlist and first interview, for example, [AI voice interviews](/platform/ai-interviews) run first rounds around the clock, so that step does not depend on a free calendar slot.",
        ],
        contrast: {
          leftLabel: "Where candidates stall",
          rightLabel: "What to look at first",
          rows: [
            {
              left: "Applications waiting for review",
              right: "Whether anyone has the capacity to read every application against the rubric",
            },
            {
              left: "Shortlisted, no first interview yet",
              right: "Calendar time for first rounds, which AI voice interviews do not need",
            },
            {
              left: "Interviewed, no decision",
              right: "How quickly reviewers meet, and whether they have the evidence they need",
            },
            {
              left: "Invited, then silent",
              right: "How clearly and how quickly candidates hear what comes next",
            },
            {
              left: "Offer stage",
              right: "Approval steps, pay alignment and how fast your team responds",
            },
          ],
        },
      },
      {
        id: "one-pipeline",
        eyebrow: "Pipeline",
        heading: "Hiring Pipeline Management: One Pipeline for Every Role",
        layout: "split",
        body: [
          "Analytics only help if they match the candidates in front of you. IntelliHire tracks every candidate across the pipeline, so the numbers and the people sit in one pipeline view. For a recruiter running several roles, that is the difference between knowing where a candidate is and having to ask around.",
          "Recruitment analytics and pipeline management are available on selected plans. See which plans include them on the [pricing page](/pricing).",
        ],
        items: [
          {
            title: "Every candidate, every stage",
            text: "See where each candidate is in the round without asking three people or checking three tools.",
          },
          {
            title: "Every role in one place",
            text: "Recruiters running several roles at once keep them in one pipeline instead of separate trackers.",
          },
          {
            title: "Keep your ATS reports",
            text: "If your team relies on reports from your ATS, keep them. ATS integrations are available on selected plans, so ask in your demo whether yours is supported today.",
          },
        ],
      },
      {
        id: "using-the-numbers",
        eyebrow: "Using the numbers",
        heading: "Turning Pipeline Data Into Better Hiring Decisions",
        layout: "checklist",
        body: [
          "Analytics in [IntelliHire](/) show where hiring slows. What you do about it is a people decision, and a few habits help.",
          "The [IntelliHire FAQ](/faq) answers common questions about analytics and pipeline management.",
        ],
        items: [
          {
            title: "Review on a fixed rhythm",
            text: "Look at time-to-hire and stall points on a regular schedule, such as weekly, so problems surface while roles are still open.",
          },
          {
            title: "Compare like with like",
            text: "A senior specialist role and a seasonal hire will never share a timeline. Compare roles with similar volume and seniority.",
          },
          {
            title: "Fix one stall at a time",
            text: "Change one step, then watch whether the stall moves. Changing everything at once hides what worked.",
          },
          {
            title: "Let numbers raise questions",
            text: "A metric shows where to look. Your team decides what it means and what to change.",
          },
        ],
      },
    ],
    faqHeading: "Recruitment Analytics FAQs",
    faqImage: {
      src: "/images/sections/faq-recruitment-analytics.webp",
      width: 1122,
      height: 1402,
      alt: "Two colleagues talking across a small round table over coffee",
    },
    faqs: [
      {
        question: "What does IntelliHire's recruitment analytics show?",
        answer:
          "Time-to-hire, funnel conversion and the stages where candidates stall, with pipeline management that tracks every candidate across every role. Together they answer a practical question: where is hiring slowing down, and which stage should your team look at first?",
      },
      {
        question: "Which plans include recruitment analytics?",
        answer:
          "Recruitment analytics and pipeline management are available on selected plans. The pricing page lists what each plan includes, and the team can confirm in a demo which plan fits the number of roles and candidates you manage.",
      },
      {
        question: "Will we lose the reports in our ATS?",
        answer:
          "No. Keep the ATS reports your team already relies on. ATS integrations are available on selected plans, but IntelliHire does not list specific ATS products publicly yet, so bring the name of yours to your demo and ask whether it is supported today.",
      },
      {
        question: "How is time-to-hire different from time-to-fill?",
        answer:
          "Definitions vary by team, but time-to-hire usually runs from when a candidate enters your pipeline to when they accept an offer, while time-to-fill runs from when a role opens to when it is filled. Time-to-hire reflects how quickly your process moves a candidate; time-to-fill reflects the whole requisition.",
      },
      {
        question: "Do the numbers tell us what to fix?",
        answer:
          "They tell you where to look. Analytics show time-to-hire, funnel conversion and the stages where candidates stall, but not the reason behind each one. Your team reads the numbers alongside what it knows about the role, such as a hard-to-fill specialism or a slow approval step, and decides what to change.",
      },
    ],
    cta: {
      heading: "See Recruitment Analytics on Your Next Open Role",
      body: "Bring a role that is taking longer than it should. We'll show how IntelliHire would track it across the pipeline and where your team would see it stall.",
    },
    related: [
      "/platform/ai-interviews",
      "/platform/interview-scorecards",
      "/blog/recruitment-metrics",
    ],
    primaryKeyword: "recruitment analytics software",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 7. Human Oversight and Security                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "human-oversight",
    path: "/platform/human-oversight",
    kind: "platform",
    navLabel: "Human Oversight and Security",
    navDescription: "Where AI helps and where people decide",
    metaTitle: "Human Oversight and Data Security | IntelliHire",
    metaDescription:
      "How IntelliHire keeps people in charge of hiring decisions and protects candidate data: encryption, access controls, audit logging, retention and consent.",
    eyebrow: "Platform · Trust",
    h1: "Human Oversight, Security and Privacy in IntelliHire",
    lead: [
      "If you are reviewing an AI hiring tool for your legal, IT or people team, two questions come first: who makes the decisions, and what happens to candidate data. IntelliHire is built for human in the loop hiring. The AI reads, ranks, runs first-round interviews and flags concerns. People decide.",
      "This page sets out where that line sits, how the privacy policy protects candidate data and what your organization remains responsible for.",
    ],
    answer:
      "Human in the loop hiring means a person, not software, makes every hiring decision. In IntelliHire the AI reads applications, ranks candidates, runs first-round interviews and flags integrity concerns; people decide who advances and who is hired. Candidate data is encrypted in transit and at rest, access is role-based, and personal information is not sold.",
    heroImage: {
      src: "/images/heroes/hero-human-oversight.webp",
      width: 1369,
      height: 1149,
      alt: "Hiring lead alone at a sunlit desk, pen poised above a single sheet of paper",
    },
    highlights: ["No machine rejections", "Encrypted in transit, at rest", "Role-based, logged access"],
    sections: [
      {
        id: "where-people-decide",
        eyebrow: "Who decides",
        heading: "Human in the Loop Hiring: Where AI Helps and Where People Decide",
        layout: "contrast",
        body: [
          "Every stage of the hiring flow in [IntelliHire](/) ends with a handoff to a person. The AI handles the volume, and your team makes every decision.",
          "That split is what responsible AI in recruitment looks like in practice: software does the reading and organizing, and accountable people make the calls that shape someone's career.",
        ],
        contrast: {
          leftLabel: "IntelliHire does",
          rightLabel: "Your team decides",
          rows: [
            { left: "Reads and structures every application", right: "What the role actually needs" },
            { left: "Ranks candidates against your rubric", right: "Which signals carry weight" },
            { left: "Runs first-round interviews around the clock", right: "Who moves forward" },
            { left: "Drafts scorecards with transcript evidence", right: "What the evidence means" },
            { left: "Flags integrity concerns for review", right: "The final offer, every time" },
          ],
        },
      },
      {
        id: "no-machine-rejection",
        eyebrow: "Our rule",
        heading: "No Candidate Is Rejected by a Machine",
        layout: "cards",
        image: {
          src: "/images/sections/section-human-oversight.webp",
          width: 1672,
          height: 941,
          alt: "Colleague pointing at a document while a teammate writes notes",
        },
        body: [
          "This is a stated rule, and the terms back it up: AI outputs must not be the sole basis for rejecting a candidate. Everything IntelliHire produces is decision support, designed to be checked by a person. For a candidate, that means the person who decides on their application can see the reasoning behind a ranking and the transcript behind a rating.",
          "The same rule runs through every feature, from ranking to [interview scorecards](/platform/interview-scorecards) and integrity flags.",
        ],
        items: [
          {
            title: "Rankings show their reasoning",
            text: "Candidates are ranked against your rubric with explainable reasoning, so a reviewer can see why one person sits above another.",
          },
          {
            title: "Scorecards cite the transcript",
            text: "Each rating points to the candidate's actual answer, so the evidence can be checked before a decision.",
          },
          {
            title: "Flags prompt a review",
            text: "On selected plans, proctoring flags possible integrity concerns for a person to review. A flag is never an automatic rejection.",
          },
          {
            title: "People own the outcome",
            text: "Who moves forward and who gets an offer is always decided by someone on your team.",
          },
        ],
      },
      {
        id: "candidate-data-protection",
        eyebrow: "Security",
        heading: "How Candidate Data Is Protected",
        layout: "checklist",
        body: [
          "Your legal and IT reviewers will ask how candidate data is protected and who can see it. Here is what the [privacy policy](/privacy) commits to.",
          "Enterprise plans also add multi-tenant isolation, SSO, and custom retention and audit logging. See what each plan includes on the [pricing page](/pricing), and bring any control your security review depends on to your demo so the team can confirm how it applies to your plan.",
        ],
        items: [
          {
            title: "Encryption in transit and at rest",
            text: "Candidate data is encrypted in transit and at rest, on multi-tenant infrastructure.",
          },
          {
            title: "Role-based access",
            text: "Access to candidate data is role-based, with least-privilege internal access.",
          },
          {
            title: "Audit logging",
            text: "Access to candidate records is audit logged.",
          },
          {
            title: "No sale of personal information",
            text: "IntelliHire does not sell personal information.",
          },
        ],
        note: "This is a summary. The privacy policy and terms set out the full details.",
      },
      {
        id: "retention-consent-rights",
        eyebrow: "Your obligations",
        heading: "Retention, Consent and Candidate Rights",
        layout: "split",
        body: [
          "Candidate data privacy is shared work. IntelliHire provides the controls; your organization, as data controller, decides how they are used and stays responsible for the obligations that come with hiring.",
          "AI hiring compliance depends on where you hire. Some jurisdictions add duties for employers that use AI in hiring, such as candidate notices, consent or bias audits. Under the [terms and conditions](/terms), your organization complies with applicable employment, anti-discrimination and privacy law. Our overview of [AI hiring laws](/blog/ai-hiring-laws) is a useful starting point, and the [IntelliHire FAQ](/faq) answers common questions. None of this is legal advice.",
        ],
        items: [
          {
            title: "Retention you configure",
            text: "You can set retention periods for candidate records, and interview recordings and transcripts follow configurable retention windows. When a period ends, records are deleted or irreversibly anonymized.",
          },
          {
            title: "Consent",
            text: "As data controller, your organization obtains any required candidate consent for recording and automated processing.",
          },
          {
            title: "Candidate rights",
            text: "Candidates can ask about automated processing and, where the law provides, request human review.",
          },
        ],
      },
    ],
    faqHeading: "Human Oversight and Security FAQs",
    faqImage: {
      src: "/images/sections/faq-human-oversight.webp",
      width: 1672,
      height: 941,
      alt: "Hand drawing a bound volume from a shelf of matching reference books",
    },
    faqs: [
      {
        question: "Is IntelliHire compliant with AI hiring laws?",
        answer:
          "IntelliHire does not claim a compliance certification. What it does provide is a clear division of work: AI outputs are decision support, and people make every hiring decision. Your organization remains responsible for the laws where you hire, including any candidate notices or consent they require. This is not legal advice.",
      },
      {
        question: "Who is the data controller for candidate data?",
        answer:
          "Your organization is. As data controller, you obtain any required candidate consent for recording and automated processing and comply with applicable employment, anti-discrimination and privacy law. IntelliHire provides the controls described in its privacy policy, including encryption, role-based access, audit logging and configurable retention.",
      },
      {
        question: "Does IntelliHire sell candidate data?",
        answer:
          "No. The privacy policy states that IntelliHire does not sell personal information. Candidate data is encrypted in transit and at rest, access is role-based and logged, and you can set retention periods so records are deleted or irreversibly anonymized when the period ends.",
      },
      {
        question: "Can candidates ask for human review?",
        answer:
          "Yes. Candidates can request information about automated processing and, where applicable law provides, ask for human review. In practice, a person on your team already makes every decision: IntelliHire's rankings, scorecards and integrity flags are decision support, not decisions.",
      },
      {
        question: "What does the Enterprise plan add for security?",
        answer:
          "Enterprise plans add multi-tenant isolation and SSO, custom retention and audit logging, a dedicated interviewer portal, and priority support and onboarding. If your review depends on a specific control, ask in your demo which controls apply on the plan you are considering.",
      },
    ],
    cta: {
      heading: "See Human Oversight in IntelliHire on Your Next Open Role",
      body: "Bring a live role and the questions your legal and IT reviewers are asking. We'll show where the AI does the work, where your team makes the call and how candidate data is handled.",
    },
    related: [
      "/platform/interview-scorecards",
      "/platform/interview-proctoring",
      "/blog/ai-hiring-laws",
    ],
    primaryKeyword: "human in the loop hiring",
    dateModified: "2026-10-27",
  },
];
