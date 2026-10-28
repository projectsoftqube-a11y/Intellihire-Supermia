import type { BlogPost } from "@/content/types";

const SHRM_2025 =
  "https://www.shrm.org/content/dam/en/shrm/research/2025-recruiting-benchmarking-report.pdf";
const ROBERT_HALF_2016 = "https://press.roberthalf.com/2016-08-11-Are-You-Taking-Too-Long-To-Hire";

const post: BlogPost = {
  slug: "reduce-time-to-hire",
  metaTitle: "How to Reduce Time to Hire Without Lowering the Bar",
  metaDescription:
    "Find the stage where hiring stalls and fix it first: faster screening, same-week first interviews and quick feedback, with a worked example and fix table.",
  h1: "How to Reduce Time to Hire: Find the Slow Stage, Then Fix It",
  category: "hiring-metrics",
  excerpt:
    "Find the stage where hiring stalls, fix that first, and cut the waiting between steps without dropping the checks that protect quality.",
  datePublished: "2026-10-28",
  dateModified: "2026-10-28",
  image: {
    src: "/images/blog/blog-reduce-time-to-hire.webp",
    width: 1672,
    height: 941,
    alt: "Colleague pointing at a downward arrow on a whiteboard while a teammate listens",
  },
  intro: [
    "Most advice on how to reduce time to hire is a list of ten tactics, applied all at once. That rarely works, because a slow process is usually slow in one or two places. Speed up the wrong stage and candidates simply queue at the next one.",
    "This guide starts with measurement. You will log where the days go for a few recent hires, find the single slowest stage, and fix that first. A worked example and a stage-by-stage fix table show what that looks like in practice.",
  ],
  answer:
    "To reduce time to hire, measure how many days candidates spend at each stage, find the slowest one, and fix that first. Common culprits are the wait for a first interview, slow feedback after interviews, and late offer approvals. Cutting the waits between steps, not the steps that test the job, shortens hiring without lowering the bar.",
  takeaways: [
    "Time to hire is the candidate's clock, from entering your process to accepting an offer, and it is the part of hiring your team controls most directly.",
    "In a slow process most of the lost days are spent waiting between steps, not doing the steps themselves.",
    "Log the dates each recent hire passed through every stage, then fix the single slowest stage before touching anything else.",
    "A feedback deadline for interviewers and an offer range approved before interviews start remove two of the most common stalls.",
    "Speed should come from removing waits, never from dropping the structured interview or scorecard that makes candidates comparable.",
  ],
  blocks: [
    { type: "h2", id: "what-time-to-hire-measures", text: "What Does Time to Hire Measure?" },
    {
      type: "p",
      text: "Time to hire is the number of days between a candidate entering your process and accepting your offer. It measures the candidate's journey. Time to fill is a different clock: it starts when the role is opened, so it also counts approvals, writing the job description and waiting for applicants.",
    },
    {
      type: "p",
      text: "Both matter, but they point at different fixes. A long time to fill with a short time to hire means the delay happens before candidates arrive. A long time to hire means the delay is inside your own process.",
    },
    {
      type: "p",
      text: "Our guide to [recruitment metrics](/blog/recruitment-metrics) covers the formulas for both in full.",
    },
    {
      type: "p",
      text: "For a reference point, [SHRM's 2025 recruiting benchmarking data](" +
        SHRM_2025 +
        ") put the median time-to-fill, from the job opening to an accepted offer, at about a month and a half for both executive and nonexecutive roles. Extra-large organizations reported 61 days for nonexecutive positions.",
    },
    {
      type: "callout",
      tone: "note",
      title: "A benchmark is a reference point, not a target",
      text: "Published figures mix roles, company sizes and definitions. The number worth chasing is your own median, measured the same way each month and split by role.",
    },

    { type: "h2", id: "why-speed-matters", text: "Why Does a Slow Hiring Process Cost You Candidates?" },
    {
      type: "p",
      text: "A slow process costs you the candidates who have other options. In a [Robert Half survey of more than 1,000 US office workers](" +
        ROBERT_HALF_2016 +
        "), 39% said they lose interest and pursue other roles when a hiring process drags on.",
    },
    {
      type: "p",
      text: "Silence hurts as much as length. In the same survey, 23% said they lose interest in a firm if they do not hear back within a week of the first interview, and another 46% if there is no update one to two weeks after an interview. Nearly a third, 32%, said a slow process made them doubt the organization's ability to make other decisions.",
    },
    {
      type: "p",
      text: "That survey is from 2016, so treat the exact percentages as a signal rather than today's number. The pattern is the useful part: the wait between steps, and how you communicate during it, shapes whether candidates stay.",
    },

    { type: "h2", id: "find-the-slow-stage", text: "How Do You Find the Stage That Slows Hiring Down?" },
    {
      type: "p",
      text: "Find the slow stage by logging dates, not by asking the team where it feels slow. Memory overweights the stage that was most frustrating, which is not always the one that took longest.",
    },
    {
      type: "ol",
      items: [
        "**Pick 5 to 10 recent hires** from one role family, such as support or sales. Mixing very different roles hides the pattern.",
        "**Record a date for every stage change:** application, first review, screen, each interview, feedback received, decision, offer sent and offer accepted.",
        "**Count the days between each pair of dates.** Each gap is either work, such as an interview, or waiting, such as a calendar back-and-forth.",
        "**Take the median for each gap** across your hires, so one unusual candidate does not distort the picture.",
        "**Circle the largest gap.** That is the stage to fix first, and the one to measure again after the change.",
      ],
    },
    {
      type: "template",
      title: "Stage log template (one row per candidate)",
      lines: [
        "Candidate | Role | Applied | First review | Screen done | Interview 1 | Feedback in | Interview 2 | Decision | Offer sent | Offer accepted",
        "",
        "Days per gap = next date minus previous date",
        "Mark each gap: W (work) or Q (queue / waiting)",
        "Median each gap across 5-10 hires, then circle the largest Q",
      ],
    },
    {
      type: "p",
      text: "If you work with an applicant tracking system, most of these dates already exist in its stage history. The work is pulling them into one view, not collecting them by hand.",
    },

    { type: "h2", id: "worked-example", text: "Worked Example: Where Did 34 Days Go?" },
    {
      type: "p",
      text: "Here is how a stage log reads for one hire. The figures below are an illustration built for this guide, not data from a real company, but the shape is typical of a process that feels slow without anyone knowing why.",
    },
    {
      type: "table",
      caption: "Illustrative stage log for one customer support hire",
      head: ["Stage", "Days", "Work or waiting?"],
      rows: [
        ["Application to first review", "6", "Waiting: the application sat in a queue"],
        ["Resume screen", "1", "Work"],
        ["Screen to first interview", "9", "Waiting: calendar back-and-forth"],
        ["First interview", "1", "Work"],
        ["Interview feedback", "5", "Waiting: scorecards submitted late"],
        ["Second interview scheduled", "5", "Waiting: panel availability"],
        ["Second interview", "1", "Work"],
        ["Decision and offer approval", "4", "Waiting: salary sign-off"],
        ["Offer to acceptance", "2", "Candidate deciding"],
        ["**Total time to hire**", "**34**", "**29 waiting, 3 screening or interviewing, 2 candidate deciding**"],
      ],
    },
    {
      type: "p",
      text: "Only three of the 34 days were spent screening or interviewing. The largest single gap is the nine days between the screen and the first interview, so that is the stage to fix first. Feedback and the second-interview wait come next, at five days each.",
    },
    {
      type: "callout",
      tone: "tip",
      title: "Fix one stage, then measure again",
      text: "Change one stage at a time and rerun the log on your next few hires. If you change four things at once, you will not know which one worked, and you may have moved the queue rather than removed it.",
    },

    { type: "h2", id: "fixes-by-stage", text: "Which Fixes Cut the Most Days at Each Stage?" },
    {
      type: "p",
      text: "Each stage has a usual cause of delay and a fix that removes waiting without removing judgment. The right-hand column is the part to protect, because it is what keeps a faster process fair and accurate.",
    },
    {
      type: "table",
      caption: "Common delays by hiring stage, the fix, and what not to cut",
      head: ["Stage", "Usual cause of delay", "Fix", "Do not cut"],
      rows: [
        [
          "Approval and posting",
          "The role waits for sign-off before it is advertised",
          "Approve headcount and the salary range during planning, and keep job description templates ready",
          "Agreement on what the role is for, or you will rewrite the posting later",
        ],
        [
          "First review",
          "Applications sit unread until someone has a free afternoon",
          "Review daily, or use [AI resume screening](/platform/ai-resume-screening) to rank every application against your rubric the day it arrives",
          "A person building the shortlist; no candidate should be rejected automatically",
        ],
        [
          "Screen to first interview",
          "Days of calendar back-and-forth",
          "Let candidates self-schedule, or offer a first-round AI voice interview they can take at any hour",
          "The same questions for every candidate, so answers stay comparable",
        ],
        [
          "Interview feedback",
          "Interviewers submit notes late, or not at all",
          "Set a one-business-day feedback deadline and use a shared [interview scoring rubric](/blog/interview-scoring-rubric)",
          "Written evidence for each score, rather than the loudest opinion in the debrief",
        ],
        [
          "Extra interview rounds",
          "Rounds that repeat questions an earlier round already covered",
          "Give each round one distinct job, and cap the number of rounds",
          "The round that tests the core skill of the role",
        ],
        [
          "Decision and offer",
          "Salary or title approval starts only after the decision",
          "Pre-approve the offer range before interviews begin",
          "A deliberate decision meeting with the evidence in front of the team",
        ],
        [
          "Offer to acceptance",
          "The written offer arrives days after the verbal one",
          "Send the written offer the same day and call to talk it through",
          "Time for the candidate to ask questions and decide",
        ],
      ],
    },
    {
      type: "p",
      text: "Notice what the fixes have in common. None of them removes a question, a rubric or a reviewer. They remove the time a candidate spends waiting for something to happen.",
    },

    { type: "h2", id: "first-interview-wait", text: "How Do You Shorten the Wait for a First Interview?" },
    {
      type: "p",
      text: "Shorten the wait for a first interview by taking the interviewer's calendar out of the critical path. When every first conversation needs a recruiter slot, the queue grows with every new applicant.",
    },
    {
      type: "ul",
      items: [
        "**Self-scheduling links** let a candidate pick an open slot instead of trading emails, which removes most of the back-and-forth.",
        "**Fixed interview blocks** each week give recruiters protected time, so new candidates always have a slot within a few days.",
        "**First-round AI voice interviews** let candidates interview at whatever hour suits them, so the first conversation no longer waits for anyone's calendar.",
      ],
    },
    {
      type: "p",
      text: "Whatever you choose, keep the first round structured. Use the same [structured interview questions](/blog/structured-interview-questions) for every candidate for the role, so a faster round is still a fair one.",
    },

    { type: "h2", id: "ai-and-time-to-hire", text: "How Can AI Shorten Time to Hire Without Taking Over the Decision?" },
    {
      type: "p",
      text: "AI shortens time to hire by doing the high-volume work that creates queues, while people keep the decisions. In IntelliHire, that means reading every application against the rubric your team set, with the reasoning shown, and running [first-round AI voice interviews](/platform/ai-interviews) at any hour.",
    },
    {
      type: "p",
      text: "Each interview produces a [scorecard that cites the transcript](/platform/interview-scorecards), so reviewers can check the evidence on their own schedule instead of waiting for a debrief. Candidates get updates by email and WhatsApp, with SMS depending on the plan, which addresses the silence that drives people away.",
    },
    {
      type: "p",
      text: "No candidate is rejected by a machine, and your team decides who moves forward. The page on [human oversight in IntelliHire](/platform/human-oversight) sets out where that line sits. If you use any AI tool in hiring, also check the [AI hiring laws](/blog/ai-hiring-laws) that apply where you recruit.",
    },

    { type: "h2", id: "common-mistakes", text: "What Are the Most Common Mistakes When Trying to Hire Faster?" },
    {
      type: "ul",
      items: [
        "**Cutting the structured interview to save a day.** It is rarely the slow stage, and it is what makes candidates comparable.",
        "**Tracking only the average.** One role that stays open for months can hide improvement everywhere else, so report the median too.",
        "**Speeding up one stage while the next one queues.** Faster screening only helps if interviews can absorb the extra candidates.",
        "**Going quiet.** Candidates who hear nothing assume the worst, so send a status update at every stage, even when nothing has changed.",
        "**Setting a target before measuring.** A goal like hiring in 21 days means little until you know where your days go today.",
      ],
    },
    {
      type: "p",
      text: "Teams hiring at scale feel these mistakes fastest, because every extra day multiplies across hundreds of applicants. Our page on [high-volume hiring](/use-cases/high-volume-hiring) covers that case in more detail.",
    },

    { type: "h2", id: "keep-it-down", text: "How Do You Keep Time to Hire Down Once It Drops?" },
    {
      type: "p",
      text: "Keep time to hire down by giving each stage an owner and a time limit, then checking both on a regular rhythm. Improvements fade when nobody is responsible for the gap between two steps.",
    },
    {
      type: "ul",
      items: [
        "**Write a service level for each stage,** such as feedback within one business day and first interview within five days of applying.",
        "**Name an owner for each gap,** not only for each step, so a stalled candidate always has someone accountable.",
        "**Review stuck candidates weekly** and trends monthly, split by role family.",
        "**Rerun the stage log each quarter,** because the slowest stage moves once you fix it.",
      ],
    },
    {
      type: "p",
      text: "If you would rather not rebuild the log in spreadsheets each quarter, IntelliHire's [recruitment analytics](/platform/recruitment-analytics) track time-to-hire, funnel conversion and the stages where candidates stall, available on selected plans.",
    },
  ],
  faqs: [
    {
      question: "What is a good time to hire?",
      answer:
        "There is no single good number, because time to hire varies widely by role, seniority and company size. As a reference point, SHRM's 2025 benchmarking data put the median time-to-fill, from job opening to accepted offer, at about a month and a half. Your own median, tracked by role each month, is the more useful benchmark.",
    },
    {
      question: "What is the fastest way to reduce time to hire?",
      answer:
        "The fastest way is to fix the single slowest stage rather than changing everything at once. For many teams that is the wait between applying and the first interview. Self-scheduling, protected interview blocks or first-round AI voice interviews remove the calendar back-and-forth that usually causes it.",
    },
    {
      question: "Does hiring faster lower the quality of hire?",
      answer:
        "Hiring faster does not have to lower quality if the speed comes from removing waiting time rather than removing assessment. Keep the structured interview, the scoring rubric and a person making the decision, and cut the queues between those steps instead.",
    },
    {
      question: "How does AI help reduce time to hire?",
      answer:
        "AI helps by handling the high-volume work that creates queues. It can read and rank every application the day it arrives and run first-round voice interviews at any hour, so candidates are not waiting for a recruiter's calendar. The hiring decision should stay with people who can review the evidence.",
    },
    {
      question: "Should you tell candidates how long the hiring process will take?",
      answer:
        "Yes. Telling candidates the expected timeline and sending an update at each stage keeps them engaged. In a 2016 Robert Half survey of US office workers, 23% said they lose interest in a firm if they do not hear back within a week of the first interview.",
    },
  ],
  sources: [
    {
      title: "2025 Recruiting Executives Benchmarking: Insights to Maximize Recruitment",
      publisher: "SHRM",
      url: SHRM_2025,
      accessed: "2026-10-28",
    },
    {
      title: "Are You Taking Too Long to Hire?",
      publisher: "Robert Half",
      url: ROBERT_HALF_2016,
      accessed: "2026-10-28",
    },
  ],
  supports: "/platform/ai-interviews",
};

export default post;
