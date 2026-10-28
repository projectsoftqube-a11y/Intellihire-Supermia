import type { BlogPost } from "@/content/types";

const post: BlogPost = {
  slug: "structured-interview-questions",
  metaTitle: "Structured Interview Questions With Examples by Role",
  metaDescription:
    "How to write structured interview questions that compare candidates fairly, with example questions for sales, support, engineering and operations roles.",
  h1: "Structured Interview Questions: How to Write Them, With Examples by Role",
  category: "interviews",
  excerpt:
    "How to write job-related questions every candidate answers the same way, with examples for sales, support, engineering and operations.",
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  image: {
    src: "/images/blog/blog-structured-questions.webp",
    width: 1672,
    height: 941,
    alt: "Interviewer holding a prepared question sheet while a candidate answers",
  },
  intro: [
    "Structured interview questions are a fixed set of job-related questions that every candidate for a role answers in the same order, with each answer rated on the same scale. Because everyone gets the same prompts, you compare candidates on the evidence in their answers rather than on how well a conversation happened to flow.",
    "This guide covers how to write them, which question types work best, how to plan follow-up probes, and example questions for sales, support, engineering and operations roles, each paired with what a strong answer shows.",
  ],
  answer:
    "Structured interview questions are a fixed set of job-related questions that every candidate for a role answers in the same order, each rated on the same scale. Because everyone gets the same prompts, you compare candidates on the evidence in their answers rather than on how well a conversation happened to flow.",
  takeaways: [
    "Write one main question for each competency on your scoring rubric.",
    "Use behavioral questions about past work and situational questions built from real scenarios in the role.",
    "Plan two or three follow-up probes per question and use the same ones with every candidate.",
    "Decide what a strong answer shows before the first interview, so scoring is about evidence, not impressions.",
  ],
  blocks: [
    {
      type: "h2",
      id: "what-makes-questions-structured",
      text: "What Makes an Interview Structured",
    },
    {
      type: "p",
      text: "A good question on its own does not make an interview structured. The structure is the process around the questions. The US Office of Personnel Management's guide to structured interviews describes three features:",
    },
    {
      type: "ul",
      items: [
        "Every candidate is asked the same questions in the same order.",
        "Every candidate is evaluated on a common rating scale.",
        "Interviewers agree in advance on what an acceptable answer looks like.",
      ],
    },
    {
      type: "p",
      text: "The same guide notes that structured interviews have demonstrated a high degree of reliability and validity, while unstructured interviews typically show low rating consistency among interviewers. In practice, structure is what lets you put two candidates side by side and explain why one moved forward.",
    },
    {
      type: "h2",
      id: "how-to-write-structured-interview-questions",
      text: "How to Write Structured Interview Questions",
    },
    {
      type: "p",
      text: "Start with your rubric. If you do not have one yet, our guide to building an [interview scoring rubric](/blog/interview-scoring-rubric) walks through choosing competencies and writing the rating scale. Then work through these steps:",
    },
    {
      type: "ol",
      items: [
        "**List four to six competencies** the interview needs to test, written as observable behavior.",
        "**Write one main question per competency.** Each question should be about one thing, so the answer can be scored against one set of anchors.",
        "**Use the language of the job.** Build scenarios from situations people in the role actually face, not abstract puzzles.",
        "**Write down what a strong answer shows** before anyone is interviewed. This becomes the top of your rating scale.",
        "**Plan two or three follow-up probes** for each question.",
        "**Pilot the questions on a colleague** in a similar role. If they cannot give a clear answer, rewrite the question.",
      ],
    },
    { type: "h3", text: "Behavioral and situational questions" },
    {
      type: "p",
      text: "Behavioral interview questions ask about the past: \"Tell me about a time you…\". They work well for experienced candidates because the answer is anchored in something that happened. Situational questions ask what the candidate would do in a realistic scenario: \"A customer calls about…\". They suit candidates with less directly relevant experience. Most structured interviews mix both, and both are scored against the same anchors.",
    },
    { type: "h3", text: "Questions to leave out" },
    {
      type: "p",
      text: "Drop brainteasers, \"what kind of animal would you be\" questions and anything else you cannot connect to the work. Avoid questions that touch on age, family plans, religion, health or other personal characteristics. Your HR or legal team can confirm the rules where you hire.",
    },
    {
      type: "h2",
      id: "follow-up-probes",
      text: "Plan Follow-Up Probes in Advance",
    },
    {
      type: "p",
      text: "First answers are often short or general. Probes draw out the detail you need to score. The OPM guide advises using very similar probes with every candidate, so each person gets the same chance to give a complete answer. You can adjust the wording to fit what someone said, but not the meaning.",
    },
    {
      type: "table",
      caption: "Probes that work with almost any behavioral question",
      head: ["Probe", "What it draws out"],
      rows: [
        ["\"What was your part, specifically?\"", "Their own actions, separate from the team's"],
        ["\"What did you do next?\"", "How they responded when the first plan did not work"],
        ["\"How did you know it worked?\"", "Whether they checked or measured the result"],
        ["\"What would you do differently now?\"", "Reflection and what they learned"],
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "Probe for detail, not for a different answer",
      text: "A probe helps a candidate finish their answer. It should never hint at what you want to hear. If you find yourself rephrasing the question to steer them, move on and score what you heard.",
    },
    {
      type: "h2",
      id: "examples-by-role",
      text: "Structured Interview Examples by Role",
    },
    {
      type: "p",
      text: "These structured interview examples each target one competency. The right-hand column describes what a strong answer shows; use it as the starting point for the top anchor on your rating scale. Swap in details from your own product, customers and tools.",
    },
    { type: "h3", text: "Sales" },
    {
      type: "table",
      head: ["Competency", "Question", "A strong answer shows"],
      rows: [
        [
          "Prospecting",
          "Tell me about a deal you sourced yourself. How did you find it and get the first meeting?",
          "A clear method, specific outreach steps and a reason that account was worth pursuing",
        ],
        [
          "Discovery",
          "Walk me through how you found out what a recent prospect actually needed.",
          "The questions they asked, what they learned and how it changed their pitch",
        ],
        [
          "Handling objections",
          "Describe a time a buyer pushed back on price. What happened?",
          "They explored the reason behind the objection before offering a discount, and can say how it ended",
        ],
        [
          "Pipeline discipline",
          "How do you decide which deals to spend your time on at the start of a week?",
          "A repeatable way to prioritize, and honesty about deals they chose to drop",
        ],
      ],
    },
    { type: "h3", text: "Customer support" },
    {
      type: "table",
      head: ["Competency", "Question", "A strong answer shows"],
      rows: [
        [
          "Clear explanation",
          "Tell me about a time you explained a complicated issue to a frustrated customer.",
          "Plain language, a check that the customer understood and a stated outcome",
        ],
        [
          "Ownership",
          "Describe a ticket you could not solve alone. What did you do?",
          "Escalated with full context, kept the customer updated and followed it to the end",
        ],
        [
          "Prioritization (situational)",
          "You have a long queue and a customer threatening to cancel. What do you handle first, and why?",
          "Clear triage logic, honest timelines for the customer and knowing when to ask for help",
        ],
        [
          "Product feedback",
          "Tell me about a recurring customer problem you reported to another team.",
          "Spotted the pattern, gathered examples and followed up on what happened next",
        ],
      ],
    },
    { type: "h3", text: "Engineering" },
    {
      type: "table",
      head: ["Competency", "Question", "A strong answer shows"],
      rows: [
        [
          "Debugging",
          "Tell me about the hardest production bug you have tracked down.",
          "A systematic approach, hypotheses tested in order and a change made to prevent a repeat",
        ],
        [
          "Technical trade-offs",
          "Describe a design decision where you chose between two reasonable options.",
          "Both options named, the criteria used, what they gave up and whether they would choose the same again",
        ],
        [
          "Estimating and scope (situational)",
          "A feature you estimated at two weeks is half done at week three. What do you do?",
          "Raises it early, offers scope options and tells stakeholders what changes",
        ],
        [
          "Collaboration",
          "Tell me about a code review where you disagreed with a colleague.",
          "Reasons given on both sides, real listening and a decision that kept the working relationship intact",
        ],
      ],
    },
    { type: "h3", text: "Operations" },
    {
      type: "table",
      head: ["Competency", "Question", "A strong answer shows"],
      rows: [
        [
          "Process improvement",
          "Tell me about a process you changed. How did you know it needed changing?",
          "Evidence of the problem, input from the people doing the work and a before-and-after comparison",
        ],
        [
          "Planning",
          "Walk me through how you planned for a busy period, such as a seasonal peak or a large rollout.",
          "What the plan was based on, a backup plan and what they adjusted on the day",
        ],
        [
          "Supplier problems (situational)",
          "A key supplier tells you a delivery will be a week late. What do you do?",
          "Assesses the impact, considers alternatives and tells stakeholders early, with options",
        ],
        [
          "Problem response",
          "Describe a time something went wrong on a shift or in a project you ran.",
          "Quick containment, clear communication, then a root cause and a fix that stuck",
        ],
      ],
    },
    {
      type: "h2",
      id: "running-the-interview",
      text: "Running the Interview So the Structure Holds",
    },
    {
      type: "p",
      text: "Well-written questions can still drift in the room. A few habits keep every interview comparable:",
    },
    {
      type: "ul",
      items: [
        "Tell the candidate how the interview works: how many questions, that you will take notes and that you may ask follow-ups.",
        "Ask each question as written, in the same order, and use only the planned probes.",
        "Note what the candidate said, not your impression of them.",
        "Score each answer as soon as the interview ends, before you talk to other interviewers.",
        "Leave time for the candidate's own questions, and do not score that part unless it is on the rubric.",
      ],
    },
    {
      type: "callout",
      tone: "note",
      title: "Consistency is fair to candidates too",
      text: "When everyone gets the same questions and the same probes, every candidate has the same chance to show the same skills. That is also what makes your decisions easier to explain.",
    },
    {
      type: "h2",
      id: "structured-questions-in-first-round-interviews",
      text: "Structured Questions in First-Round AI Interviews",
    },
    {
      type: "p",
      text: "The same principles apply when the first round is automated. Questions should map to the rubric, answers should be recorded, and a person should review the evidence. In IntelliHire, first-round AI voice interviews run around the clock with natural turn-taking, and each scorecard cites the transcript, so your team can read the candidate's actual answers before deciding who moves forward. See how [AI interview software](/platform/ai-interviews) handles the first round.",
    },
    {
      type: "p",
      text: "For more on scoring and interview design, browse [Interview Guides](/blog/category/interviews) or [all posts on the blog](/blog).",
    },
  ],
  faqs: [
    {
      question: "How many structured interview questions should I ask?",
      answer:
        "Plan one main question for each competency you are testing, which usually means four to six questions for an interview of about an hour. That leaves time for two or three follow-up probes per question and for the candidate's own questions at the end. More questions usually means shorter answers and less evidence for each one.",
    },
    {
      question: "Can interviewers ask follow-up questions in a structured interview?",
      answer:
        "Yes. Planned follow-up probes are part of a good structured interview. The key is to agree on them in advance and use similar probes with every candidate, so each person has the same chance to give a complete answer. Probes should ask for more detail, not hint at the answer you want to hear.",
    },
    {
      question: "Are behavioral or situational questions better?",
      answer:
        "Neither is better in every case. Behavioral questions ask what someone did in the past, which works well when candidates have relevant experience. Situational questions ask what they would do in a realistic scenario, which suits earlier-career candidates or career changers. Many teams use a mix and score both against the same rubric.",
    },
    {
      question: "Should we share interview questions with candidates in advance?",
      answer:
        "Sharing the topics or competencies you will cover is a reasonable middle ground. It helps candidates prepare relevant examples and can make the interview less stressful, while your follow-up probes still test real depth. Whatever you decide, give every candidate for the role the same information at the same stage.",
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
  supports: "/platform/ai-interviews",
};

export default post;
