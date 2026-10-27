import type { BlogPost } from "@/content/types";

const post: BlogPost = {
  slug: "recruitment-metrics",
  metaTitle: "Recruitment Metrics That Matter (and How to Track Them)",
  metaDescription:
    "The recruitment metrics worth tracking, from time to hire and funnel conversion to stage drop-off, with formulas and what to do when a number moves.",
  h1: "Recruitment Metrics That Matter: Time to Hire, Funnel Conversion and Drop-Off",
  category: "hiring-metrics",
  excerpt:
    "The recruitment metrics worth tracking, with formulas, how to read each one and what to change when a number moves.",
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  image: {
    src: "/images/feature-analytics.png",
    width: 1370,
    height: 1148,
    alt: "Hiring team reviewing an IntelliHire dashboard with a hiring funnel and time-to-hire chart",
  },
  intro: [
    "Most teams track more recruitment metrics than they use. The ones that matter answer three questions: how long hiring takes, where candidates fall out of the process, and whether the people you hire work out. This guide covers those metrics, with formulas, how to read each one and what to do when a number moves.",
    "There are no industry benchmarks here, on purpose. Published averages mix roles, regions and definitions, so your own trend, measured the same way every month, is the number to watch.",
  ],
  takeaways: [
    "Time to hire runs from a candidate entering your process to accepting an offer; time to fill runs from the role opening to an accepted offer.",
    "Stage conversion and drop-off show where candidates leave, which is usually the first place to act.",
    "Applicants per hire, interview-to-offer ratio and offer acceptance rate show how efficient each step is.",
    "Quality of hire matters most and is the hardest to measure, so define it narrowly and read it with care.",
    "Compare each number with your own history, split by role and source, rather than with outside averages.",
  ],
  blocks: [
    { type: "h2", id: "recruitment-metrics-formulas", text: "The Recruitment Metrics That Matter, With Formulas" },
    {
      type: "p",
      text: "Agree on definitions before you build a dashboard. A metric that changes meaning between quarters is worse than no metric at all. These are the core formulas.",
    },
    {
      type: "table",
      caption: "Core recruitment metrics and how to calculate them",
      head: ["Metric", "Formula", "What it tells you"],
      rows: [
        [
          "Time to hire",
          "Offer accepted date minus the date the candidate applied or was sourced, in days",
          "How quickly you move a candidate once you know about them",
        ],
        [
          "Time to fill",
          "Offer accepted date minus the date the role was approved or opened, in days",
          "How long a seat stays empty, including the time before anyone applies",
        ],
        [
          "Stage conversion rate",
          "Candidates who move to the next stage ÷ candidates who entered the stage × 100",
          "How well each step passes suitable candidates forward",
        ],
        [
          "Stage drop-off rate",
          "Candidates who withdraw or stop responding at a stage ÷ candidates who entered it × 100",
          "Where candidates leave on their own",
        ],
        ["Applicants per hire", "Total applicants for a role ÷ hires for that role", "How much volume your team handles for each hire"],
        [
          "Interview-to-offer ratio",
          "Candidates interviewed at a chosen stage ÷ offers made",
          "How well earlier stages predict who gets an offer",
        ],
        ["Offer acceptance rate", "Offers accepted ÷ offers made × 100", "Whether your offer and process close the hire"],
        ["Source of hire", "Hires from each source ÷ total hires × 100", "Which channels produce the people you actually hire"],
        [
          "Quality of hire",
          "Measures you choose, such as manager rating or retention at a fixed point, averaged across a hiring cohort",
          "Whether hiring decisions hold up after the start date",
        ],
      ],
    },
    { type: "h2", id: "time-to-hire-vs-time-to-fill", text: "Time to Hire vs Time to Fill" },
    {
      type: "p",
      text: "The two are often confused. Time to hire measures the candidate's journey: the clock starts when a person enters your process and stops when they accept. Time to fill measures the role: the clock starts when the job is approved or opened, so it includes writing the job description, posting and waiting for applicants.",
    },
    {
      type: "p",
      text: "Read them together. A long time to fill with a short time to hire usually means the delay comes before candidates arrive, in approvals, the job description or sourcing. A long time to hire points at your own process: slow screening, slow scheduling or slow decisions.",
    },
    {
      type: "callout",
      tone: "tip",
      title: "Pick your start and end points once",
      text: "Write down exactly which event starts and stops each clock, such as application date and offer acceptance date. Report the median alongside the average, because one role that stays open for months can distort an average.",
    },
    { type: "h2", id: "funnel-conversion-and-drop-off", text: "Funnel Conversion and Stage Drop-Off" },
    {
      type: "p",
      text: "List your stages, for example applied, screened, first-round interview, hiring manager interview, offer and accepted, and count how many candidates enter and leave each one. Conversion tells you how many move forward. Drop-off tells you how many leave on their own.",
    },
    {
      type: "p",
      text: "Keep rejections and withdrawals apart. Low conversion at screening can be healthy if a role draws many unsuitable applicants. High drop-off is different: candidates you may have wanted chose to leave. Time in stage helps explain why, and these are the usual places candidates stall:",
    },
    {
      type: "ul",
      items: [
        "Between application and first contact, while nobody has reviewed the application.",
        "Between shortlist and first interview, while calendars are coordinated.",
        "Between final interview and decision, while feedback is collected.",
        "Between offer and acceptance, while terms are discussed.",
      ],
    },
    { type: "h2", id: "efficiency-metrics", text: "Applicants per Hire, Interview-to-Offer and Offer Acceptance" },
    {
      type: "p",
      text: "**Applicants per hire** shows how much reading each hire costs your team. A rising number can mean a broader job ad, a new high-volume source or a harder role. It measures workload, not quality.",
    },
    {
      type: "p",
      text: "**Interview-to-offer ratio** shows how well earlier stages predict who gets an offer. If managers interview many people for each offer, check whether shortlist criteria match what managers actually decide on. A shared rubric helps, and our guide to building an [interview scoring rubric](/blog/interview-scoring-rubric) shows how.",
    },
    {
      type: "p",
      text: "**Offer acceptance rate** shows whether candidates say yes. When it falls, look at what changed: pay, the gap between final interview and offer, or what candidates heard along the way. Ask candidates who decline why, and record the reason.",
    },
    { type: "h2", id: "source-of-hire", text: "Source of Hire" },
    {
      type: "p",
      text: "Source of hire tracks where your hires first came from: job boards, referrals, your careers page, agencies or direct sourcing. Count hires, not applicants, because a source that sends many applicants and few hires mostly adds reading time. Record the source when the candidate enters your process, and decide upfront how to count people who arrive through more than one channel.",
    },
    { type: "h2", id: "quality-of-hire", text: "Quality of Hire, With Honest Caveats" },
    {
      type: "p",
      text: "Quality of hire is the metric everyone wants and nobody measures perfectly. Most teams combine a few signals for each hiring cohort, such as hiring manager ratings at a fixed point, whether the person is still in the role after a set period, and how long they take to work independently.",
    },
    {
      type: "callout",
      tone: "warning",
      title: "Read quality of hire with care",
      text: "Small samples, managers who rate differently and changes to the role all move this number. Treat it as a prompt for discussion, compare like with like, and do not use it to judge an individual recruiter.",
    },
    { type: "h2", id: "candidate-experience-signals", text: "Candidate Experience Signals" },
    {
      type: "p",
      text: "Candidate experience is hard to capture in one number, so watch a few signals together:",
    },
    {
      type: "ul",
      items: [
        "Drop-off at each stage, especially after long waits.",
        "Time from application to first contact.",
        "Completion rate for any assessment or first-round interview you send.",
        "Short survey responses from hired and rejected candidates alike.",
        "The reasons candidates give for withdrawing or declining offers.",
      ],
    },
    { type: "h2", id: "when-a-number-moves", text: "What to Do When a Number Moves" },
    {
      type: "p",
      text: "One bad month is often noise. A change that holds for two or three review periods, or shows up across several roles, is worth acting on. Start with these checks.",
    },
    {
      type: "table",
      caption: "Where to look when a recruitment metric changes",
      head: ["If this moves", "Check first", "What teams often try"],
      rows: [
        [
          "Time to hire goes up",
          "Which stage got longer, using time in stage",
          "Clear the screening backlog, open more interview slots, set a deadline for feedback",
        ],
        [
          "Drop-off rises at one stage",
          "How long candidates wait there and what they hear",
          "Shorten the wait, send status updates, simplify the step",
        ],
        ["Applicants per hire climbs", "Job ad wording and any new sources", "Tighten must-have criteria in the ad, review low-yield sources"],
        [
          "Interview-to-offer ratio worsens",
          "Whether shortlist criteria match manager decisions",
          "Agree the rubric with hiring managers before the next round",
        ],
        ["Offer acceptance falls", "Pay, time to offer and decline reasons", "Make offers sooner, revisit pay ranges, fix issues candidates raise"],
        [
          "A source's share of hires drops",
          "Whether the source or the mix of roles changed",
          "Shift effort toward sources that produce hires",
        ],
      ],
    },
    { type: "h2", id: "recruiting-kpis-review", text: "Turning Recruiting KPIs Into a Regular Review" },
    {
      type: "p",
      text: "Recruiting KPIs only help if someone looks at them on a schedule and acts on what they show. A simple routine works for most teams:",
    },
    {
      type: "ol",
      items: [
        "**Choose five or six.** Time to hire, stage conversion, drop-off, offer acceptance and source of hire cover most teams.",
        "**Define them in writing,** including start and end events, which candidates count and how reopened roles are handled.",
        "**Segment** by role family, location and source, so one busy role does not hide another.",
        "**Review on a rhythm:** monthly for trends, weekly for open roles that are stuck.",
        "**Pair numbers with notes** on what changed in the process, so next quarter you know why a number moved.",
      ],
    },
    {
      type: "p",
      text: "If you would rather not build this from spreadsheets, IntelliHire's [recruitment analytics](/platform/recruitment-analytics) show time-to-hire, funnel conversion and the stages where candidates stall, and track candidates across the pipeline. Analytics are available on selected plans; see [pricing](/pricing) for details. Your team still reads the numbers and decides what to change. For more, browse [hiring metrics guides](/blog/category/hiring-metrics) or the [IntelliHire blog](/blog).",
    },
  ],
  faqs: [
    {
      question: "What is the difference between time to hire and time to fill?",
      answer:
        "Time to hire measures how long a candidate spends in your process, from applying or being sourced to accepting an offer. Time to fill measures how long a role stays open, from approval or posting to an accepted offer. Time to fill includes the period before candidates arrive, so it is usually the longer of the two.",
    },
    {
      question: "Which recruiting KPIs should a small team track?",
      answer:
        "Start with time to hire, stage conversion, drop-off at each stage, offer acceptance rate and source of hire. They are simple to count, they point to specific fixes, and they stay useful with modest numbers of candidates. Add quality of hire once you have made enough hires to compare one cohort with another.",
    },
    {
      question: "How do you calculate stage conversion rate?",
      answer:
        "Divide the number of candidates who moved to the next stage by the number who entered the stage, then multiply by 100 to express it as a percentage. For example, if 40 candidates entered the first-round interview stage and 30 moved on to the hiring manager stage, the conversion rate for that stage is 30 ÷ 40 × 100, or 75.",
    },
    {
      question: "Should we compare our recruitment metrics with industry benchmarks?",
      answer:
        "Use outside benchmarks with caution. Published figures often mix roles, regions, company sizes and definitions, so they rarely match how you measure. Your own trend, tracked the same way each month and split by role and source, is a more reliable guide to whether hiring is getting better or worse.",
    },
  ],
  supports: "/platform/recruitment-analytics",
};

export default post;
