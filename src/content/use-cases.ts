import type { MarketingPage } from "@/content/types";

/**
 * Use-case pages (/use-cases/*).
 *
 * Copy rules: product facts come only from the approved fact sheet and the
 * approved Home and FAQ copy. Plan-gated features are described as "on
 * selected plans" or "depending on your plan" and point to /pricing. No
 * statistics, customer names or quoted prices.
 */
export const USE_CASE_PAGES: MarketingPage[] = [
  /* ------------------------------------------------------------------ */
  /* 1. High-volume hiring                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "high-volume-hiring",
    path: "/use-cases/high-volume-hiring",
    kind: "use-case",
    navLabel: "High-Volume Hiring",
    navDescription: "Every application read, shortlist interviewed",
    metaTitle: "High-Volume Hiring Software | IntelliHire",
    metaDescription:
      "When one role draws hundreds of applicants, IntelliHire reads every resume, ranks them against your rubric and runs first-round voice interviews any hour.",
    eyebrow: "Use case · High-volume hiring",
    h1: "High-Volume Hiring Software: Read Every Application, Interview Around the Clock",
    lead: [
      "When one role draws hundreds of applicants, the first pass becomes the bottleneck. IntelliHire is high-volume hiring software that reads every application against the rubric you set, ranks candidates with the reasoning shown and runs first-round AI voice interviews around the clock.",
      "Your recruiters stop spending their week on first-pass review and start from a ranked shortlist and scorecards that cite the transcript. Your team still decides who moves forward. No candidate is ever rejected by a machine.",
    ],
    answer:
      "High-volume hiring is recruiting for roles that draw hundreds of applicants at once, where first-pass review becomes the bottleneck. IntelliHire reads every application against the rubric you set, ranks candidates with the reasoning shown and runs first-round AI voice interviews around the clock. Your recruiters start from a ranked shortlist and decide who moves forward.",
    heroImage: {
      src: "/images/heroes/hero-high-volume-hiring.webp",
      width: 1369,
      height: 1149,
      alt: "A dozen candidates seated along a bench in a bright glazed waiting area",
    },
    highlights: [
      "Every application read against your rubric",
      "First-round voice interviews around the clock",
      "No candidate rejected by a machine",
    ],
    sections: [
      {
        id: "problem",
        eyebrow: "The problem",
        heading: "Why High-Volume Hiring Stalls at the First Pass",
        layout: "cards",
        image: {
          src: "/images/sections/section-high-volume-hiring.webp",
          width: 1672,
          height: 941,
          alt: "Hand resting on the first folder in a row of folders on a sunlit desk",
        },
        body: [
          "Volume is not the hard part. Good people apply. The trouble starts when a few recruiters have to read, sort and call every one of them before anyone gets a first conversation. By the time interviews are booked, some of the people you wanted may have accepted other offers.",
        ],
        items: [
          {
            title: "Too many applications",
            text: "When a role draws hundreds of applicants, nobody has time to read each one properly. The strongest applicant can be the one nobody opened.",
          },
          {
            title: "Too much manual screening",
            text: "Recruiters read resume after resume against the same checklist, often for several open roles at once. Every hour on first-pass review is an hour not spent talking to candidates.",
          },
          {
            title: "Slow interview coordination",
            text: "Momentum disappears between calendars and follow-ups. At volume, booking first conversations becomes a job of its own, and every day of back-and-forth is a day a strong candidate can walk away.",
          },
          {
            title: "Great candidates get missed",
            text: "A rushed first pass favors tidy resumes and exact keyword matches. Strong potential behind an unusual career path rarely survives it.",
          },
        ],
      },
      {
        id: "how-it-helps",
        eyebrow: "How IntelliHire helps",
        heading: "How High-Volume Hiring Software Keeps Every Applicant in View",
        layout: "split",
        body: [
          "IntelliHire takes the reading, ranking and first-round interviews off your recruiters' desks. It starts with the role: you set the job description and rubric, and every application is read and ranked against the same criteria. See how [AI resume screening](/platform/ai-resume-screening) structures skills and experience at any volume.",
          "First rounds no longer wait for a free slot in a recruiter's calendar. Candidates take an AI voice interview at whatever hour suits them, and [IntelliHire's AI interview software](/platform/ai-interviews) turns each conversation into a transcript and a scorecard your team can check.",
          "On selected plans, interview proctoring flags possible integrity concerns for a person to review, and recruitment analytics show time-to-hire, funnel conversion and where candidates stall. Check what each plan includes on the [IntelliHire pricing page](/pricing).",
        ],
        items: [
          {
            title: "Every application read",
            text: "IntelliHire parses every resume and surfaces relevant skills and experience without losing the context behind each person. No application sits unopened because the pile was too big.",
          },
          {
            title: "One rubric for the whole round",
            text: "JD and Rubric Studio drafts the job description and evaluation rubric together, so screening, interviews and scorecards measure the same criteria, however many people apply.",
          },
          {
            title: "A ranked shortlist with reasons",
            text: "Candidates are ranked against your rubric with explainable reasoning. Your team decides which signals carry weight and can see why one person sits above another.",
          },
          {
            title: "First rounds around the clock",
            text: "AI voice interviews with natural turn-taking run at any hour, so shortlisted candidates are not left waiting for a first conversation.",
          },
          {
            title: "Candidates kept informed",
            text: "Email and WhatsApp updates, with SMS depending on your plan, tell candidates where they stand. The candidate portal runs device checks before the interview starts.",
          },
        ],
      },
      {
        id: "hiring-round",
        eyebrow: "In practice",
        heading: "A High-Volume Hiring Round, Step by Step",
        layout: "steps",
        body: [
          "Here is how a busy role moves from opening to offer, and who does what at each stage. It is the same five-stage flow described in [how IntelliHire works](/), applied to a role with a long applicant list.",
        ],
        items: [
          {
            title: "Your team sets the rubric",
            text: "Your recruiter and hiring manager agree on what the role needs. JD and Rubric Studio drafts the job description and rubric, and your team reviews both before the role opens.",
          },
          {
            title: "IntelliHire reads every application",
            text: "As applications arrive, IntelliHire parses each resume and ranks candidates against your rubric, with the reasoning shown next to each ranking.",
          },
          {
            title: "Your recruiters build the shortlist",
            text: "Your recruiters read the ranked list, check the reasons and choose who moves to a first-round interview. No candidate is rejected by a machine at this step or any other.",
          },
          {
            title: "AI runs the first-round interviews",
            text: "Shortlisted candidates take their AI voice interview at any hour, after a device check in the candidate portal. Each interview is transcribed, and every scorecard rating cites the transcript.",
          },
          {
            title: "Your hiring manager decides",
            text: "Your hiring manager reads the scorecards, checks the answers behind each rating and decides who goes to the next round and, in the end, who gets the offer.",
          },
        ],
      },
      {
        id: "your-team-decides",
        eyebrow: "Human oversight",
        heading: "What Stays With Your Team",
        layout: "checklist",
        body: [
          "IntelliHire handles the volume. Every decision that affects a candidate stays with a person.",
        ],
        items: [
          {
            title: "What the role needs",
            text: "Your team sets the job description and rubric that everything else is measured against.",
          },
          {
            title: "Which signals carry weight",
            text: "Rankings show their reasoning, and your team decides what matters for the role.",
          },
          {
            title: "Who moves forward",
            text: "Your recruiters choose the shortlist and every next step.",
          },
          {
            title: "What the evidence means",
            text: "Reviewers read the transcript behind each rating before they rely on it. An integrity flag is a prompt to look, never an automatic rejection.",
          },
          {
            title: "The final offer",
            text: "Your hiring manager makes the offer decision, every time.",
          },
        ],
      },
    ],
    faqHeading: "High-Volume Hiring FAQs",
    faqImage: {
      src: "/images/sections/faq-high-volume-hiring.webp",
      width: 1122,
      height: 1402,
      alt: "Hand lifting the top folder from a tall stack on a sunlit desk",
    },
    faqs: [
      {
        question: "Can IntelliHire handle hundreds of applications for one role?",
        answer:
          "Yes. IntelliHire reads and structures every application at any volume, then ranks candidates against the rubric you set with the reasoning shown. Your recruiters review a ranked shortlist instead of a pile of resumes, and they decide who moves forward to a first-round interview.",
      },
      {
        question: "Does IntelliHire reject candidates automatically?",
        answer:
          "No. IntelliHire ranks, summarizes and flags; people decide. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate. In a high-volume round, your recruiters still choose the shortlist and every next step.",
      },
      {
        question: "When do candidates take the first-round interview?",
        answer:
          "Whenever suits them. AI voice interviews run around the clock, so candidates can take their first round in the evening or on a weekend without waiting for a recruiter's calendar. The candidate portal runs device checks before they start, and they get updates by email and WhatsApp, with SMS depending on your plan.",
      },
      {
        question: "How does my team check an AI interview score?",
        answer:
          "Each scorecard rates the candidate against your rubric and cites the parts of the interview transcript it is based on. Reviewers read the candidate's actual answer before they rely on a rating, so the decision rests on evidence your team has checked rather than a bare number.",
      },
      {
        question: "Will IntelliHire miss strong candidates with unusual resumes?",
        answer:
          "IntelliHire reads every application rather than skimming a sample, and surfaces relevant skills and experience without losing the context behind each person. Rankings show their reasoning, so your recruiters can see why someone placed where they did and move them forward if they think the ranking undersold them.",
      },
    ],
    cta: {
      heading: "Run Your Next High-Volume Round With IntelliHire",
      body: "Bring a role that draws more applicants than your team can read. We'll walk through how IntelliHire would screen, interview and score it, and show where your team stays in control.",
    },
    related: [
      "/platform/ai-resume-screening",
      "/platform/ai-interviews",
      "/use-cases/hr-teams",
    ],
    primaryKeyword: "high volume hiring software",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 2. Recruitment agencies                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "recruitment-agencies",
    path: "/use-cases/recruitment-agencies",
    kind: "use-case",
    navLabel: "Recruitment Agencies",
    navDescription: "First rounds for every client role",
    metaTitle: "AI Recruitment Software for Agencies | IntelliHire",
    metaDescription:
      "Screen and interview candidates for more client roles without adding recruiters, and send clients scorecards backed by interview evidence.",
    eyebrow: "Use case · Agencies",
    h1: "AI Recruitment Software for Agencies",
    lead: [
      "Agency recruiters win placements on speed and judgment, yet much of the week goes on first-pass reading and chasing calendars. IntelliHire is AI recruitment software for agencies: it reads every application against a rubric built from your client's brief, runs first-round AI voice interviews around the clock and writes scorecards that cite the transcript.",
      "Your recruiters can run first rounds for several client roles at once and present each shortlist with the evidence behind it. They still decide who goes forward to the client, and no candidate is ever rejected by a machine.",
    ],
    answer:
      "AI recruitment software for agencies handles first-pass screening and first-round interviews across several client roles at once. IntelliHire reads every application against a rubric built from your client's brief, runs AI voice interviews around the clock and writes scorecards citing the transcript. Recruiters decide who goes forward to the client.",
    heroImage: {
      src: "/images/heroes/hero-recruitment-agencies.webp",
      width: 1369,
      height: 1149,
      alt: "Agency recruiter on a headset call beside separated folders for several clients",
    },
    highlights: [
      "First rounds for several client roles at once",
      "Scorecards that cite the transcript",
      "Your recruiters decide who goes forward",
    ],
    sections: [
      {
        id: "problem",
        eyebrow: "The problem",
        heading: "Why Agency Desks Run Out of Hours Before They Run Out of Roles",
        layout: "cards",
        body: [
          "Every new client role brings another stack of applications, another round of calls and another hiring manager waiting for a shortlist. Recruiters end up screening when they should be talking to clients and candidates, and in a competitive search a slow shortlist can cost you the placement.",
        ],
        items: [
          {
            title: "Too many applications",
            text: "Each client role draws its own pile of applicants. Spread across a full desk, nobody has time to read each one properly.",
          },
          {
            title: "Too much manual screening",
            text: "Recruiters read resume after resume against each client's checklist. Every hour on first-pass review is an hour not spent on client calls or candidate relationships.",
          },
          {
            title: "Slow interview coordination",
            text: "Momentum disappears between calendars and follow-ups. While first calls are being arranged, strong candidates take other offers or other agencies' calls.",
          },
          {
            title: "Great candidates get missed",
            text: "A rushed first pass skips the unusual resume, and the candidate who would have impressed your client never makes the shortlist.",
          },
        ],
      },
      {
        id: "how-it-helps",
        eyebrow: "How IntelliHire helps",
        heading: "How AI Recruitment Software for Agencies Fits Your Desk",
        layout: "split",
        body: [
          "IntelliHire takes the reading, ranking and first-round interviews off your recruiters' desks, so their hours go to clients and candidates. For each role you set the job description and rubric, and every application is read and ranked against it with the reasoning shown.",
          "Shortlisted candidates take a first-round voice interview at whatever hour suits them. [IntelliHire's AI interview software](/platform/ai-interviews) transcribes each conversation, and [interview scorecards that cite the transcript](/platform/interview-scorecards) let your client read the candidate's actual answers, not just a rating.",
          "AI-assisted human interviews, interview proctoring, recruitment analytics, and ATS and calendar integrations are available depending on your plan. Compare what each plan includes on the [IntelliHire pricing page](/pricing).",
        ],
        items: [
          {
            title: "A rubric for every client role",
            text: "JD and Rubric Studio drafts the job description and evaluation rubric together, so screening, interviews and scorecards for that role all measure the criteria your client cares about.",
          },
          {
            title: "Every applicant read",
            text: "IntelliHire parses every resume at any volume and surfaces relevant skills and experience with the context behind each person.",
          },
          {
            title: "First rounds that don't wait",
            text: "AI voice interviews run around the clock, so first rounds for several client roles can run at once without filling your recruiters' calendars.",
          },
          {
            title: "Shortlists your client can check",
            text: "Each scorecard cites the transcript, so when you present a shortlist your client can read the answers behind every rating.",
          },
        ],
      },
      {
        id: "hiring-round",
        eyebrow: "In practice",
        heading: "A Client Search in Practice, From Brief to Shortlist",
        layout: "steps",
        body: [
          "Here is how one client role moves through IntelliHire, and who does what at each stage. The same five-stage flow from [how IntelliHire works](/) runs for each role on your desk.",
        ],
        items: [
          {
            title: "Your recruiter turns the brief into a rubric",
            text: "After the intake call, your recruiter uses JD and Rubric Studio to draft the job description and rubric, then checks both against what the client asked for.",
          },
          {
            title: "IntelliHire reads and ranks every applicant",
            text: "Applications are parsed and ranked against the rubric, with the reasoning shown next to each candidate.",
          },
          {
            title: "Your recruiter builds the shortlist",
            text: "Your recruiter reviews the ranking, decides which signals matter most for this client and chooses who goes to a first-round interview.",
          },
          {
            title: "AI runs the first-round interviews",
            text: "Shortlisted candidates take an AI voice interview at any hour, after a device check in the candidate portal. Email and WhatsApp updates, with SMS depending on your plan, keep them informed.",
          },
          {
            title: "Your recruiter presents, your client decides",
            text: "Your recruiter reads the scorecards, chooses who to put forward and presents each candidate with transcript-cited evidence. Your client makes the hiring decision.",
          },
        ],
      },
      {
        id: "who-decides",
        eyebrow: "Who decides",
        heading: "IntelliHire Does the Reading. Your Recruiters Make the Call.",
        layout: "contrast",
        body: [
          "Agencies sell judgment. IntelliHire is built so that judgment stays with your recruiters and your clients.",
        ],
        contrast: {
          leftLabel: "IntelliHire does",
          rightLabel: "Your recruiters decide",
          rows: [
            { left: "Reads and structures every application", right: "What the client's role actually needs" },
            { left: "Ranks candidates against your rubric", right: "Which signals carry weight" },
            { left: "Runs first-round interviews around the clock", right: "Who moves forward" },
            { left: "Drafts scorecards with transcript evidence", right: "What the evidence means" },
            { left: "Flags integrity concerns for review, on selected plans", right: "Who goes to the client" },
          ],
        },
      },
    ],
    faqHeading: "Recruitment Agency FAQs",
    faqImage: {
      src: "/images/sections/faq-recruitment-agencies.webp",
      width: 1122,
      height: 1402,
      alt: "Recruiter on a phone call by a window at sunset, notebook in hand",
    },
    faqs: [
      {
        question: "Can IntelliHire run first rounds for several client roles at once?",
        answer:
          "Yes. Each role gets its own job description and rubric, and AI voice interviews run around the clock, so first-round interviews for several client roles can run in parallel without waiting for a recruiter's calendar. Your recruiters review the scorecards and decide who goes forward for each role.",
      },
      {
        question: "What evidence can I give a client about a candidate?",
        answer:
          "Each IntelliHire scorecard rates the candidate against your rubric and cites the parts of the interview transcript it is based on. When you present a shortlist, your client can read the candidate's actual answers behind each rating instead of relying on a summary from memory.",
      },
      {
        question: "Who decides which candidates go to the client?",
        answer:
          "Your recruiters do. IntelliHire reads, ranks, runs first-round interviews and drafts scorecards, but people make every decision. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate. Your client still makes the final hiring decision.",
      },
      {
        question: "Does IntelliHire work with our ATS?",
        answer:
          "ATS and calendar integrations are available depending on your plan. IntelliHire does not list specific ATS products publicly yet, so bring the name of the system your agency uses to your demo and ask the team whether it is supported today.",
      },
      {
        question: "How are candidates kept informed?",
        answer:
          "Candidates take their first-round interview at whatever hour suits them, after a device check in the candidate portal. Email and WhatsApp updates, with SMS depending on your plan, tell them where they stand and what comes next. Your recruiters review their answers, and no candidate is ever rejected by a machine.",
      },
    ],
    cta: {
      heading: "Run Your Next Client Search With IntelliHire",
      body: "Bring a client role you are working on now. We'll show how IntelliHire would screen and interview for it, what a transcript-cited scorecard looks like, and where your recruiters stay in control.",
    },
    related: [
      "/platform/interview-scorecards",
      "/platform/ai-interviews",
      "/use-cases/high-volume-hiring",
    ],
    primaryKeyword: "ai recruitment software for agencies",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 3. HR and talent teams                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "hr-teams",
    path: "/use-cases/hr-teams",
    kind: "use-case",
    navLabel: "HR and Talent Teams",
    navDescription: "Consistent first rounds, evidence-backed scorecards",
    metaTitle: "AI Recruiting Software for HR Teams | IntelliHire",
    metaDescription:
      "Give your HR team back the hours spent on first-pass screening and scheduling, with consistent interviews and evidence-backed scorecards for every role.",
    eyebrow: "Use case · HR and talent teams",
    h1: "AI Recruiting Software for In-House HR and Talent Teams",
    lead: [
      "In-house HR and talent teams hire for every department, often alongside onboarding, policy work and employee questions. IntelliHire is AI recruiting software for HR teams that reads every application against the rubric you set, runs consistent first-round AI voice interviews around the clock and writes scorecards that cite the transcript.",
      "Your team can take back the hours spent on first-pass screening and scheduling, and hiring managers get evidence they can check. People make every decision: no candidate is ever rejected by a machine.",
    ],
    answer:
      "AI recruiting software for HR teams takes over first-pass screening and interview scheduling for an in-house team hiring across departments. IntelliHire reads every application against the rubric you set, runs consistent first-round AI voice interviews around the clock and writes scorecards hiring managers can check against the transcript. People make every decision.",
    heroImage: {
      src: "/images/heroes/hero-hr-teams.webp",
      width: 1369,
      height: 1149,
      alt: "Two HR colleagues in conversation on low seating in an informal office nook",
    },
    highlights: [
      "Same rubric from screening to scorecard",
      "Scorecards that cite the transcript",
      "People make every hiring decision",
    ],
    sections: [
      {
        id: "problem",
        eyebrow: "The problem",
        heading: "Why In-House Hiring Slows Down Before the First Interview",
        layout: "cards",
        image: {
          src: "/images/sections/section-hr-teams.webp",
          width: 1672,
          height: 941,
          alt: "Empty interview room with one printed sheet and a pen on the table",
        },
        body: [
          "Most HR teams are not short of applicants. They are short of hours. First-pass screening and interview scheduling land on the same few people who run onboarding and answer employee questions, and every hiring manager wants their role filled first.",
        ],
        items: [
          {
            title: "Too many applications",
            text: "Popular roles draw more applicants than anyone can read properly, and the strongest one can be the application nobody opened.",
          },
          {
            title: "Too much manual screening",
            text: "Your team reads resume after resume against the same checklist, role after role. Every hour on first-pass review is an hour not spent with candidates or hiring managers.",
          },
          {
            title: "Slow interview coordination",
            text: "Momentum disappears between calendars and follow-ups. Each first conversation needs a free slot from a recruiter, a hiring manager and the candidate.",
          },
          {
            title: "Great candidates get missed",
            text: "Strong potential can sit behind an unusual resume, and when every interviewer runs the first round differently, candidates for the same role are hard to compare.",
          },
        ],
      },
      {
        id: "how-it-helps",
        eyebrow: "How IntelliHire helps",
        heading: "What AI Recruiting Software for HR Teams Should Take Off Your Desk",
        layout: "split",
        body: [
          "IntelliHire takes the reading, ranking and first-round interviews off your team's desks and leaves the decisions with your people. For each role you set the job description and rubric first, so screening, interviews and scorecards measure the same criteria from the first application to the last scorecard.",
          "Every shortlisted candidate gets a first-round AI voice interview at whatever hour suits them. [IntelliHire's AI interview software](/platform/ai-interviews) transcribes each conversation, and the scorecard cites the transcript, so hiring managers can read the answer behind every rating.",
          "Depending on your plan, ATS and calendar integrations connect IntelliHire to the tools your team already runs, AI can join your team's live interview calls, and recruitment analytics show time-to-hire, funnel conversion and where candidates stall. Compare what each plan includes on the [IntelliHire pricing page](/pricing).",
        ],
        items: [
          {
            title: "Consistent first rounds",
            text: "Every shortlisted candidate for a role is interviewed and scored against the same rubric, so your team compares like with like.",
          },
          {
            title: "Evidence-backed scorecards",
            text: "Each scorecard rates the candidate against your rubric and cites the transcript, so a hiring manager can check the evidence before relying on a rating.",
          },
          {
            title: "Ranking with reasons shown",
            text: "Candidates are ranked with explainable reasoning, and your team decides which signals carry weight.",
          },
          {
            title: "Scheduling that keeps candidates moving",
            text: "Interview scheduling coordinates the next step, so candidates are not left waiting between rounds.",
          },
        ],
      },
      {
        id: "hiring-round",
        eyebrow: "In practice",
        heading: "An In-House Hiring Round in Practice",
        layout: "steps",
        body: [
          "Here is how a typical role moves through IntelliHire, and who owns each step. It follows the same five stages described in [how IntelliHire works](/).",
        ],
        items: [
          {
            title: "HR and the hiring manager agree on the rubric",
            text: "Your talent partner and the hiring manager agree on what the role needs. JD and Rubric Studio drafts the job description and rubric together, and your team reviews both before the role opens.",
          },
          {
            title: "IntelliHire reads and ranks applicants",
            text: "Every application is parsed as it arrives and ranked against the rubric, with the reasoning shown.",
          },
          {
            title: "Your recruiter builds the shortlist",
            text: "Your recruiter reviews the ranking, weighs the signals that matter for this role and chooses who moves to a first-round interview.",
          },
          {
            title: "AI runs consistent first rounds",
            text: "Shortlisted candidates take an AI voice interview at any hour, after a device check in the candidate portal, with updates by email and WhatsApp, and SMS depending on your plan.",
          },
          {
            title: "The hiring manager decides",
            text: "The hiring manager reads the transcript-cited scorecards, decides who moves to the next round and makes the final offer decision.",
          },
        ],
      },
      {
        id: "oversight",
        eyebrow: "Human oversight",
        heading: "What Your Legal and IT Reviewers Will Ask",
        layout: "checklist",
        body: [
          "Before an HR team adopts any AI hiring tool, someone will ask who decides and how candidate data is handled. Read how [human oversight and data security](/platform/human-oversight) work in IntelliHire, or start with the short answers below.",
        ],
        items: [
          {
            title: "People make every decision",
            text: "IntelliHire ranks, summarizes and flags. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate.",
          },
          {
            title: "Integrity flags go to a person",
            text: "On selected plans, interview proctoring flags possible concerns for review. A flag is a prompt to look, never an automatic rejection.",
          },
          {
            title: "Candidate data is protected",
            text: "Candidate data is encrypted in transit and at rest. Access is role-based and logged, retention windows are configurable, and IntelliHire does not sell personal information.",
          },
          {
            title: "Candidates can ask questions",
            text: "Candidates can request information about automated processing and, where applicable law provides, ask for human review.",
          },
          {
            title: "Enterprise controls",
            text: "Enterprise plans add multi-tenant isolation, SSO, and custom retention and audit logging.",
          },
        ],
      },
    ],
    faqHeading: "HR and Talent Team FAQs",
    faqImage: {
      src: "/images/sections/faq-hr-teams.webp",
      width: 1122,
      height: 1402,
      alt: "HR lead showing a colleague a printed sheet at a shared desk",
    },
    faqs: [
      {
        question: "How does IntelliHire keep first-round interviews consistent?",
        answer:
          "You set the job description and rubric first, and screening, interviews and scorecards all measure the same criteria. Every shortlisted candidate for a role takes a first-round AI voice interview assessed against that rubric, and each scorecard cites the transcript, so your team compares candidates on the same evidence.",
      },
      {
        question: "Does IntelliHire work with our ATS and calendar?",
        answer:
          "ATS and calendar integrations are available depending on your plan. IntelliHire does not list specific ATS or calendar products publicly yet, so bring the names of the systems your team runs to your demo and ask whether they are supported today.",
      },
      {
        question: "Who makes the hiring decision?",
        answer:
          "Your team does. IntelliHire ranks, summarizes and flags; people decide. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate. Your hiring managers read the evidence and make the offer decision.",
      },
      {
        question: "How is candidate data protected?",
        answer:
          "Candidate data is encrypted in transit and at rest on multi-tenant infrastructure. Access is role-based and logged, and retention windows are configurable. IntelliHire does not sell personal information. As data controller, your organization obtains any required candidate consent for recording and automated processing.",
      },
      {
        question: "Can AI join interviews our hiring managers run?",
        answer:
          "Yes, depending on your plan. AI-assisted human interviews let AI join your team's live interview calls alongside your interviewers. The interview still belongs to your team, and so does every decision that follows it. Check which plans include it on the pricing page.",
      },
    ],
    cta: {
      heading: "See IntelliHire on Your Team's Next Open Role",
      body: "Bring a role your team is hiring for now. We'll walk through how IntelliHire would screen, interview and score it, and show where your HR team and hiring managers stay in control.",
    },
    related: [
      "/platform/human-oversight",
      "/platform/interview-scorecards",
      "/platform/recruitment-analytics",
    ],
    primaryKeyword: "ai recruiting software for hr teams",
    dateModified: "2026-10-27",
  },

  /* ------------------------------------------------------------------ */
  /* 4. Startups and SMBs                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "startups",
    path: "/use-cases/startups",
    kind: "use-case",
    navLabel: "Startups and SMBs",
    navDescription: "Hiring without a recruiting team",
    metaTitle: "Recruiting Software for Startups and SMBs | IntelliHire",
    metaDescription:
      "Hiring without a recruiting team? IntelliHire screens applicants, runs first-round interviews and gives you a ranked shortlist with evidence.",
    eyebrow: "Use case · Startups and SMBs",
    h1: "Recruiting Software for Startups and Small Businesses",
    lead: [
      "At a startup or small business, hiring usually lands on a founder or manager who already has a full-time job. IntelliHire is recruiting software for small business teams hiring without a full recruiting team: it reads every application against your rubric, runs first-round AI voice interviews around the clock and gives you a ranked shortlist with evidence.",
      "You spend your time on the candidates worth meeting, not the pile of resumes. You still make every hiring decision, and no candidate is ever rejected by a machine.",
    ],
    answer:
      "Recruiting software for small business suits a founder or manager hiring without a full recruiting team. IntelliHire reads every application against your rubric, runs first-round AI voice interviews around the clock and hands you a ranked shortlist with the evidence behind it, so your time goes to the candidates worth meeting. You make every hiring decision.",
    heroImage: {
      src: "/images/heroes/hero-startups.webp",
      width: 1369,
      height: 1149,
      alt: "Founder reading a sheet of paper while two colleagues listen in a startup space",
    },
    highlights: [
      "Job description and rubric drafted for you",
      "First-round interviews at any hour",
      "You make every hiring decision",
    ],
    sections: [
      {
        id: "problem",
        eyebrow: "The problem",
        heading: "Why Hiring Without a Recruiting Team Is So Hard",
        layout: "cards",
        image: {
          src: "/images/sections/section-startups.webp",
          width: 1672,
          height: 941,
          alt: "Man in thought looking at a tablet at a sunlit desk",
        },
        body: [
          "When nobody's job is recruiting, hiring happens in the gaps. Applications arrive while you are building the product or serving customers, and the role stays open longer than anyone planned.",
        ],
        items: [
          {
            title: "Too many applications",
            text: "One job post can bring in more applicants than a founder can read between meetings. The best one can be the application you never opened.",
          },
          {
            title: "Too much manual screening",
            text: "Without a recruiter, resume review falls to whoever is hiring. Every evening spent sorting applications is time taken from the work the new hire is meant to help with.",
          },
          {
            title: "Slow interview coordination",
            text: "Momentum disappears between calendars and follow-ups. Fitting first calls around your own schedule can leave strong candidates waiting until they accept another offer.",
          },
          {
            title: "Great candidates get missed",
            text: "A quick skim favors familiar job titles. Strong potential behind an unusual resume is easy to miss when you are rushing.",
          },
        ],
      },
      {
        id: "how-it-helps",
        eyebrow: "How IntelliHire helps",
        heading: "Recruiting Software for Small Business, Without a Recruiting Team",
        layout: "split",
        body: [
          "IntelliHire does the reading, ranking and first-round interviews, so your hours go to the conversations that matter. It starts with the role: JD and Rubric Studio drafts the job description and an evaluation rubric together, which helps if you have never written a scoring rubric before. Every application is then read and ranked against it, and [AI candidate matching](/platform/candidate-matching) shows the reasoning behind each ranking.",
          "Shortlisted candidates take a first-round voice interview at any hour, so first conversations do not wait for a gap in your calendar. [IntelliHire's AI interview software](/platform/ai-interviews) transcribes each interview, and the scorecard cites the transcript, so you can check what a candidate actually said.",
          "You can start with the free 7-day trial plan and compare the paid plans on the [IntelliHire pricing page](/pricing) when you are ready.",
        ],
        items: [
          {
            title: "A job description and rubric to start from",
            text: "JD and Rubric Studio drafts both together, so screening, interviews and scorecards measure the same criteria.",
          },
          {
            title: "A ranked shortlist with reasons",
            text: "Candidates are ranked against your rubric with explainable reasoning. You decide which signals carry weight.",
          },
          {
            title: "First-round interviews while you work",
            text: "AI voice interviews with natural turn-taking run around the clock, at whatever hour suits the candidate.",
          },
          {
            title: "Evidence before you meet anyone",
            text: "Each scorecard cites the interview transcript, so you read real answers before deciding who to meet.",
          },
          {
            title: "Candidates kept in the loop",
            text: "Email and WhatsApp updates, with SMS depending on your plan, tell candidates where they stand. The candidate portal runs device checks before they start.",
          },
        ],
      },
      {
        id: "hiring-round",
        eyebrow: "In practice",
        heading: "Your First Hiring Round With IntelliHire",
        layout: "steps",
        body: [
          "Here is how a small team can run a hire from opening the role to making the offer, and who does what. It follows the five stages explained in [how IntelliHire works](/).",
        ],
        items: [
          {
            title: "You decide what the role needs",
            text: "JD and Rubric Studio drafts the job description and rubric, and you review both before the role opens.",
          },
          {
            title: "IntelliHire reads every application",
            text: "IntelliHire parses each resume and ranks applicants against your rubric, with the reasoning shown.",
          },
          {
            title: "You choose the shortlist",
            text: "You read the ranking and choose who moves to a first-round interview. No candidate is rejected by a machine; the shortlist is yours.",
          },
          {
            title: "AI runs the first-round interviews",
            text: "Shortlisted candidates take an AI voice interview at any hour, after a device check in the candidate portal. Each interview is transcribed, and the scorecard cites the transcript.",
          },
          {
            title: "You meet the strongest candidates and decide",
            text: "You read the scorecards, meet the people you want to talk to and make the offer decision yourself.",
          },
        ],
      },
      {
        id: "you-decide",
        eyebrow: "Human oversight",
        heading: "What Stays With You",
        layout: "checklist",
        body: [
          "IntelliHire takes on the reading and the first rounds. The judgment calls stay with you.",
        ],
        items: [
          {
            title: "What the role needs",
            text: "You set the job description and rubric that every applicant is measured against.",
          },
          {
            title: "Who moves forward",
            text: "You choose the shortlist and every next step.",
          },
          {
            title: "What the evidence means",
            text: "You read the transcript behind each rating before you rely on it.",
          },
          {
            title: "The offer",
            text: "You make the final hiring decision, every time.",
          },
        ],
      },
    ],
    faqHeading: "Startup and Small Business Hiring FAQs",
    faqImage: {
      src: "/images/sections/faq-startups.webp",
      width: 1122,
      height: 1402,
      alt: "Founder writing in a notebook at a sunlit cafe table",
    },
    faqs: [
      {
        question: "Do I need a recruiter to use IntelliHire?",
        answer:
          "No. IntelliHire is built for teams hiring without a full recruiting team. It reads and ranks applications, runs first-round AI voice interviews and writes scorecards that cite the transcript. A founder or hiring manager reviews the shortlist and the evidence, then decides who to meet and who gets the offer.",
      },
      {
        question: "How do I get started?",
        answer:
          "You can start with the free 7-day trial plan, or book a demo and bring a role you are hiring for now. Plans differ in features such as integrations, analytics and SMS updates, so compare them on the pricing page before you choose one.",
      },
      {
        question: "Can IntelliHire help me write the job description?",
        answer:
          "Yes. JD and Rubric Studio drafts the job description and the evaluation rubric together, so screening, interviews and scorecards all measure the same criteria. You review the draft and decide what the role really needs before any application is ranked against it.",
      },
      {
        question: "Will candidates mind being interviewed by AI?",
        answer:
          "The first-round interview fits around the candidate, not your calendar: they can take it at any hour, the candidate portal runs device checks before they start, and they get updates by email and WhatsApp, with SMS depending on your plan. You review their answers, and no candidate is ever rejected by a machine.",
      },
      {
        question: "Does IntelliHire decide who I hire?",
        answer:
          "No. IntelliHire ranks, summarizes and flags; people decide. No candidate is ever rejected by a machine, and the terms say AI outputs must not be the sole basis for rejecting a candidate. You choose the shortlist, read the evidence and make every offer.",
      },
    ],
    cta: {
      heading: "Make Your Next Hire Without a Recruiting Team",
      body: "Bring the role you need to fill. We'll show how IntelliHire would screen applicants, run first-round interviews and give you a ranked shortlist with evidence, while every decision stays with you.",
    },
    related: [
      "/platform/candidate-matching",
      "/platform/ai-interviews",
      "/pricing",
    ],
    primaryKeyword: "recruiting software for small business",
    dateModified: "2026-10-27",
  },
];
