import type { BlogPost } from "@/content/types";

const post: BlogPost = {
  slug: "interview-scoring-rubric",
  metaTitle: "How to Build an Interview Scoring Rubric (Free Template)",
  metaDescription:
    "Build an interview scoring rubric that keeps every interviewer consistent: competencies, rating scales, behavioral anchors and a free template to copy.",
  h1: "How to Build an Interview Scoring Rubric (With Free Template)",
  category: "interviews",
  excerpt:
    "Choose competencies, write behavioral anchors for a 1 to 5 scale and calibrate your interviewers, with a free rubric template to copy.",
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  image: {
    src: "/images/blog/blog-scoring-rubric.webp",
    width: 1672,
    height: 941,
    alt: "Hands holding a pen above a blank printed scoring grid in hard morning sun",
  },
  intro: [
    "An interview scoring rubric is a one-page guide that lists the competencies a role needs, describes what a weak, solid and strong answer sounds like for each one, and asks interviewers to write down evidence before they pick a score. Built well, it means two interviewers who hear the same answer give it roughly the same rating, and anyone reading the scores later can see why.",
    "This guide shows how to build one: choosing competencies, writing behavioral anchors, agreeing how scores become a recommendation and calibrating your interviewers. At the end there is a free template to copy and a worked example for a customer support role.",
  ],
  answer:
    "An interview scoring rubric is a one-page guide listing the competencies a role needs, describing what a weak, solid and strong answer sounds like for each, and requiring interviewers to record evidence before choosing a score. Built well, two interviewers who hear the same answer give it close to the same rating, which makes candidates genuinely comparable.",
  takeaways: [
    "Pick four to six competencies from the actual work of the role, written as behavior you can observe.",
    "Use one 1 to 5 scale for every competency, with written anchors for at least levels 1, 3 and 5.",
    "Ask for evidence notes before a score, and have each interviewer rate independently before any discussion.",
    "Calibrate on a sample answer before the first interview and revise the rubric between hiring rounds, not during one.",
    "A rubric organizes the evidence. A person still makes the hiring decision.",
  ],
  blocks: [
    {
      type: "h2",
      id: "what-is-an-interview-scoring-rubric",
      text: "What an Interview Scoring Rubric Is (and What It Is Not)",
    },
    {
      type: "p",
      text: "A rubric is the standard: it defines what good looks like for this role before anyone meets a candidate. A scorecard is the record: one interviewer's notes and ratings for one candidate, filled in against that standard. You write the rubric once per role and fill in a scorecard after every interview.",
    },
    {
      type: "p",
      text: "The rubric is the backbone of structured interview scoring: same questions, same scale, same definitions, so you compare people on what they said rather than on how the conversation felt. It has four parts:",
    },
    {
      type: "ul",
      items: [
        "**Competencies:** the four to six things this interview needs to find out.",
        "**A rating scale:** one range, used for every competency.",
        "**Behavioral anchors:** a short description of what an answer at each level sounds like.",
        "**Evidence and recommendation lines:** space for notes, a score and an overall recommendation with a reason.",
      ],
    },
    {
      type: "h2",
      id: "choose-competencies",
      text: "Step 1: Choose the Competencies That Matter for the Role",
    },
    {
      type: "p",
      text: "Start from the work, not from a generic list. Ask the hiring manager what someone in this role spends a typical week doing, and what separates a strong performer from an average one after six months. Cut the answers down to the four to six competencies this interview can actually test.",
    },
    { type: "h3", text: "Write each competency as observable behavior" },
    {
      type: "p",
      text: "\"Communication\" means something different to every interviewer. \"Explains a complex issue in plain language and checks the listener understood\" means roughly the same thing to all of them. If two people could disagree about whether a candidate showed it, rewrite it until they could not.",
    },
    {
      type: "table",
      caption: "Turning vague competencies into ones interviewers can score",
      head: ["Vague competency", "Observable version"],
      rows: [
        [
          "Communication",
          "Explains a complex issue in plain language and checks the listener understood",
        ],
        [
          "Problem solving",
          "Breaks an unfamiliar problem into steps and explains why they chose that order",
        ],
        [
          "Ownership",
          "Follows a problem through to resolution, including what they did when it stalled",
        ],
        [
          "Teamwork",
          "Gives a specific example of changing their approach based on a colleague's input",
        ],
      ],
    },
    { type: "h3", text: "Leave out what the interview should not measure" },
    {
      type: "p",
      text: "Requirements you can check elsewhere, such as a license or work authorization, do not belong on an interview rubric. Neither does \"culture fit\" as a catch-all. If you value something specific, such as asking for feedback early, write it as a behavior and score it like any other competency.",
    },
    {
      type: "h2",
      id: "rating-scale-and-anchors",
      text: "Step 2: Pick One Rating Scale and Write Behavioral Anchors",
    },
    {
      type: "p",
      text: "Use the same range for every competency. The US Office of Personnel Management's structured interview guide recommends at least three proficiency levels, ideally five to seven, with labels on at least three of them. A 1 to 5 scale is a practical choice for most teams: wide enough to separate candidates, short enough that interviewers remember what each number means.",
    },
    {
      type: "p",
      text: "Anchors are what make the numbers mean something. Write levels 1, 3 and 5 first, because those are easiest to describe, then fill in 2 and 4 as the steps in between. Describe the answer, not the person: \"gave a specific example with a result\" rather than \"seemed confident\".",
    },
    {
      type: "table",
      caption: "A general 1 to 5 scale with behavioral anchors",
      head: ["Score", "Label", "What the answer usually shows"],
      rows: [
        [
          "5",
          "Strong",
          "A specific example, clear personal actions, a result and what they learned. Adds detail under follow-up questions.",
        ],
        [
          "4",
          "Good",
          "A specific, relevant example with small gaps in their actions or the result.",
        ],
        [
          "3",
          "Meets the bar",
          "A relevant example and a clear personal role, but the result is vague or partly hypothetical.",
        ],
        [
          "2",
          "Partial",
          "A general or hypothetical answer, mostly \"we\", with little on what they did themselves.",
        ],
        [
          "1",
          "Not shown",
          "No relevant example, or the answer does not address the question.",
        ],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "Rewrite anchors from real answers",
      text: "After the first few interviews, replace your imagined anchors with short, anonymized paraphrases of real answers your team agreed were a 2, a 3 or a 5. Concrete examples are easier to score against than abstract descriptions.",
    },
    {
      type: "h2",
      id: "weighting-and-recommendations",
      text: "Step 3: Decide How Scores Become a Recommendation",
    },
    {
      type: "p",
      text: "Agree the rules before the first interview, so nobody adjusts them to fit a candidate they already like. Keep them simple. A weighted average to two decimal places looks precise, but it hides the one competency that should have stopped the conversation.",
    },
    {
      type: "ul",
      items: [
        "Mark one to three competencies as must-haves for the role.",
        "Set a minimum score for each must-have, often 3.",
        "If a must-have falls below the minimum, the panel discusses it before the candidate moves forward.",
        "Treat the overall recommendation as a judgment informed by the scores, with a written reason, not as an automatic total.",
      ],
    },
    {
      type: "h2",
      id: "calibrate-interviewers",
      text: "Step 4: Calibrate Interviewers Before the First Interview",
    },
    {
      type: "p",
      text: "A rubric only works if everyone reads the anchors the same way. Before the round starts, get the interviewers together for half an hour. Have everyone score the same sample answer, written or role-played, then compare. Where scores differ by two points or more, talk through which anchor each person matched and tighten the wording.",
    },
    { type: "h3", text: "Rate independently, then discuss" },
    {
      type: "p",
      text: "The same OPM guide describes panel members reviewing their own notes and rating each candidate independently, then comparing notes and reaching a consensus. Independent first ratings keep the most senior or most vocal person from setting everyone else's score.",
    },
    {
      type: "callout",
      tone: "note",
      title: "Evidence before numbers",
      text: "Take notes on what the candidate said and score as soon as the interview ends. If an interviewer cannot point to something the candidate actually said or did, the score is a guess.",
    },
    {
      type: "h2",
      id: "free-interview-rubric-template",
      text: "Free Interview Rubric Template",
    },
    {
      type: "p",
      text: "Copy this interview rubric template into a shared document and adapt the competencies to your role. Each interviewer fills in one copy per candidate and submits it before the panel discussion.",
    },
    {
      type: "template",
      title: "Interview scoring rubric",
      lines: [
        "Role: ______________________   Interview stage: ______________________",
        "Candidate: ______________________   Interviewer: ______________________   Date: __________",
        "RATING SCALE (use for every competency)",
        "5 = Strong: specific example, clear personal actions, a result and what they learned; adds detail under follow-up",
        "4 = Good: specific and relevant, with small gaps in actions or result",
        "3 = Meets the bar: relevant example and clear personal role; result vague or partly hypothetical",
        "2 = Partial: general or hypothetical answer; little detail on what they did",
        "1 = Not shown: no relevant example, or the answer does not address the question",
        "COMPETENCY 1: ______________________   Must-have: yes / no   Minimum score: ___",
        "Question asked: ______________________",
        "Evidence notes (what the candidate said or did): ______________________",
        "Score (1-5): ___",
        "COMPETENCY 2: ______________________   Must-have: yes / no   Minimum score: ___",
        "Question asked: ______________________",
        "Evidence notes: ______________________",
        "Score (1-5): ___",
        "COMPETENCY 3: ______________________   Must-have: yes / no   Minimum score: ___",
        "Question asked: ______________________",
        "Evidence notes: ______________________",
        "Score (1-5): ___",
        "COMPETENCY 4: ______________________   Must-have: yes / no   Minimum score: ___",
        "Question asked: ______________________",
        "Evidence notes: ______________________",
        "Score (1-5): ___",
        "Any must-have below its minimum? yes / no   If yes, explain: ______________________",
        "OVERALL RECOMMENDATION: Strong yes / Yes / No / Strong no",
        "Reason (two or three sentences that cite the evidence above): ______________________",
        "Follow-up to probe in the next round: ______________________",
      ],
    },
    {
      type: "h2",
      id: "worked-example",
      text: "Worked Example: A Customer Support Rubric",
    },
    {
      type: "p",
      text: "Here is one interviewer's completed scorecard for a customer support specialist, using the template above. The candidate and notes are illustrative.",
    },
    {
      type: "table",
      caption: "Example scorecard for a customer support specialist",
      head: ["Competency", "Must-have", "Evidence notes", "Score"],
      rows: [
        [
          "Explains issues clearly",
          "Yes (min 3)",
          "Walked through explaining a billing error to an upset customer step by step, then confirmed the customer understood before closing the ticket.",
          "4",
        ],
        [
          "Owns an issue to resolution",
          "Yes (min 3)",
          "Chased an engineering fix for a week and updated the customer every two days. Stated the outcome and what they changed afterward.",
          "5",
        ],
        [
          "Judgment under pressure",
          "No",
          "Described what they would do in a queue spike, but had no example from their own work.",
          "2",
        ],
        [
          "Learns a new product quickly",
          "No",
          "Built personal notes on a new tool in their first month and shared them with the team. Result not described.",
          "3",
        ],
      ],
    },
    {
      type: "p",
      text: "Overall recommendation: **Yes**. Both must-haves cleared their minimum with specific evidence. Judgment under pressure scored a 2 because the answer was hypothetical, so the interviewer lists it as the follow-up for the next round instead of averaging the gap away.",
    },
    {
      type: "h2",
      id: "common-mistakes",
      text: "Common Rubric Mistakes to Avoid",
    },
    {
      type: "ul",
      items: [
        "**Too many competencies.** Past six, interviewers stop reading the anchors.",
        "**Anchors that describe the person.** \"Confident\" cannot be checked against an answer.",
        "**One strong answer lifting every score.** Rate each competency on its own evidence.",
        "**Changing the rubric mid-round.** Revise it between rounds, not during one.",
      ],
    },
    {
      type: "h2",
      id: "rubric-beyond-the-interview",
      text: "Using the Same Rubric Across the Whole Process",
    },
    {
      type: "p",
      text: "A rubric does the most work when the same criteria run from the job description to the final scorecard. Our guide to [structured interview questions](/blog/structured-interview-questions) shows how to write one question per competency. For remote rounds, see [how to prevent cheating in online interviews](/blog/prevent-cheating-in-online-interviews), or browse [all posts on the blog](/blog).",
    },
    {
      type: "p",
      text: "If you use IntelliHire, JD and Rubric Studio drafts the job description and the evaluation rubric together, so screening, interviews and scorecards measure the same criteria. Candidates are ranked against your rubric with the reasoning shown, and your team decides which signals carry weight and who moves forward. See how [AI candidate matching](/platform/candidate-matching) works.",
    },
  ],
  faqs: [
    {
      question: "What is the difference between an interview rubric and a scorecard?",
      answer:
        "The rubric is the standard you set once per role: the competencies, the rating scale and the behavioral anchors that describe each level. The scorecard is the record one interviewer fills in for one candidate, with evidence notes, a score per competency and an overall recommendation. Every scorecard for the role should be scored against the same rubric.",
    },
    {
      question: "Should an interview scoring rubric use a 1 to 4 or a 1 to 5 scale?",
      answer:
        "Either works if every level has a written anchor. A 1 to 4 scale removes the middle option and pushes interviewers to lean one way. A 1 to 5 scale lets \"meets the bar\" sit in the center, which many teams find more natural. Pick one, use it for every competency and keep it the same for the whole hiring round.",
    },
    {
      question: "Should we add up rubric scores to pick the candidate?",
      answer:
        "Totals are useful for spotting patterns, but they should not make the decision. A high total can hide a must-have competency that fell short, and a lower total can belong to someone strong where it counts. Use scores to structure the panel discussion, record the reasons, and let the hiring manager make the final call.",
    },
  ],
  sources: [
    {
      title: "Structured Interviews: A Practical Guide",
      publisher: "U.S. Office of Personnel Management",
      url: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/guide.pdf",
      accessed: "2026-10-27",
    },
  ],
  supports: "/platform/candidate-matching",
};

export default post;
