import type { BlogPost } from "@/content/types";

const post: BlogPost = {
  slug: "ai-interview-software-pricing",
  metaTitle: "AI Interview Software Pricing in 2026: What It Really Costs",
  metaDescription:
    "How AI interview software is priced in 2026: minutes, credits, tiers and quotes, which vendors publish prices, and how to work out cost per candidate.",
  h1: "AI Interview Software Pricing: How Much Does It Cost?",
  category: "ai-recruiting",
  excerpt:
    "The pricing models AI interview tools use, which vendors publish prices, and a simple way to work out what each interviewed candidate really costs.",
  datePublished: "2026-10-28",
  dateModified: "2026-10-28",
  image: {
    src: "/images/blog/blog-ai-interview-pricing.webp",
    width: 1672,
    height: 941,
    alt: "Graphic titled AI interview software pricing on a dark blue background",
  },
  disclosure:
    "IntelliHire is our product. Competitor prices are limited to what each vendor publishes on its own website, checked on October 28, 2026.",
  intro: [
    "AI interview software ranges from free plans to annual enterprise contracts, and vendors count usage in different units: minutes, credits, interviews, jobs or seats. That makes headline prices hard to compare.",
    "This guide explains each pricing model, shows which vendors publish prices, and walks through converting any plan into cost per interviewed candidate, the number that actually decides value.",
  ],
  answer:
    "AI interview software costs anywhere from a free plan to an enterprise contract. Published self-serve plans start around $49 to $299 a month, while vendors such as HireVue, Paradox and Sapia.ai only quote after a demo. Because vendors meter minutes, credits, interviews or seats differently, compare cost per interviewed candidate rather than the monthly price.",
  takeaways: [
    "Published monthly plans for AI interview tools start at about $49 to $299 a month; enterprise vendors quote privately.",
    "Vendors meter usage in minutes, credits, interviews, jobs or seats, so headline prices are not directly comparable.",
    "Cost per interviewed candidate is the plan price divided by how many interviews the plan covers at your interview length.",
    "Ask about annual commitments, overage rules, seat limits and which plan tier includes ATS integration before you sign.",
    "A free trial or free plan lets you price a real role before paying anything.",
  ],
  blocks: [
    { type: "h2", id: "published-prices", text: "Which AI Interview Tools Publish Their Prices?" },
    {
      type: "p",
      text: "Fewer than half of the AI interview vendors we checked publish prices. The table lists what each vendor's website showed on October 28, 2026.",
    },
    {
      type: "table",
      caption: "Published prices for AI interview software (vendor websites, October 28, 2026)",
      head: ["Vendor", "Interview format", "What is published", "How usage is counted"],
      rows: [
        ["HireVue", "Conversational AI interviews", "No prices; demo request", "Quoted privately"],
        ["Hyring", "AI video interviews and AI phone screening", "Free plan; Pro $79/month; Business $239/month; about 20% off for annual billing", "Monthly credits spent per interview or screening"],
        ["IntelliHire", "AI voice interviews and resume screening", "Free 7-day trial; Essential $49/month; Premium $99/month; Enterprise custom", "AI interview minutes, job posts, candidate profiles and users per plan"],
        ["Paradox", "Chat and text assistant", "No prices; demo request", "Quoted privately"],
        ["Ribbon", "AI voice interviews", "Growth plan from $499/month, billed annually", "Plan tiers; details by quote"],
        ["Sapia.ai", "Chat-based structured interviews", "No prices; demo request", "Quoted privately"],
        ["Spark Hire", "One-way and live video interviews with AI review", "Video Interviews from $299/month (monthly) or $249/month (annual)", "Jobs and users per plan; interviews unlimited"],
      ],
    },
    { type: "h2", id: "pricing-models", text: "What Pricing Models Do AI Interview Tools Use?" },
    {
      type: "p",
      text: "Five pricing models cover almost every AI interview tool. Each one rewards a different hiring pattern, so the right model depends on how many candidates you interview and how steady that volume is.",
    },
    { type: "h3", text: "Plans with a bundle of interview minutes" },
    {
      type: "p",
      text: "You pay a monthly price for a set number of AI interview minutes, plus limits on jobs and users. IntelliHire works this way: Essential includes 210 AI interview minutes a month and Premium includes 360. Short interviews stretch the bundle further, so this model suits teams that keep first rounds focused.",
    },
    { type: "h3", text: "Credits" },
    {
      type: "p",
      text: "You buy monthly credits and spend them on different actions. Hyring, for example, charges one credit for an AI video interview and half a credit for an AI phone screening. Credits are flexible but take arithmetic to compare with other models.",
    },
    { type: "h3", text: "Interview-volume tiers" },
    {
      type: "p",
      text: "Plans are set by how many interviews you expect, often billed annually. Ribbon's Growth plan, from $499 a month billed annually, is an example. This suits steady, predictable volume more than occasional hiring.",
    },
    { type: "h3", text: "Seats and jobs" },
    {
      type: "p",
      text: "Some video platforms price by active jobs and users, with interviews unlimited. Spark Hire's monthly Video Interviews plan covers up to 5 jobs and 5 users at a time. Cost per interview falls as volume rises, but you pay the same in quiet months.",
    },
    { type: "h3", text: "Enterprise quotes" },
    {
      type: "p",
      text: "HireVue, Paradox and Sapia.ai publish no prices and ask you to request a demo. Expect a contract shaped to your volume, often with onboarding and integrations included. You cannot estimate cost until you talk to sales.",
    },
    { type: "h2", id: "cost-per-candidate", text: "How Do You Work Out Cost per Interviewed Candidate?" },
    {
      type: "p",
      text: "Divide the plan's monthly price by the number of interviews it covers at your typical interview length. That single number lets you compare minutes, credits and tiers on equal terms.",
    },
    {
      type: "ol",
      items: [
        "Decide how long a first-round interview should run for the role, for example 15 minutes.",
        "Work out how many interviews the plan covers: included minutes divided by interview length, or credits divided by credits per interview.",
        "Divide the monthly price by that number of interviews.",
        "Check the plan's other limits (jobs, candidate profiles, users) still fit your hiring.",
      ],
    },
    {
      type: "table",
      caption: "Worked example: IntelliHire plans with 15-minute interviews (an example length, not a rule)",
      head: ["Plan", "Monthly price", "AI interview minutes", "15-minute interviews", "Cost per interview"],
      rows: [
        ["Essential", "$49", "210", "14", "$3.50"],
        ["Premium", "$99", "360", "24", "about $4.13"],
      ],
    },
    {
      type: "p",
      text: "Change the interview length and the answer changes: at 10 minutes, Essential covers 21 interviews, about $2.33 each. The [AI interview cost calculator](/tools/ai-interview-cost-calculator) does this sum on IntelliHire's current plans for your own numbers.",
    },
    {
      type: "callout",
      tone: "tip",
      title: "Count only the candidates you interview",
      text: "If a tool also screens resumes, you interview fewer people, so fewer interviews to pay for. Compare tools on the candidates who actually reach a first round.",
    },
    { type: "h2", id: "hidden-costs", text: "What Hidden Costs Should You Ask About?" },
    {
      type: "p",
      text: "The monthly price is rarely the whole cost. Ask every vendor these questions in writing before you choose.",
    },
    {
      type: "ul",
      items: [
        "**Billing term.** Is the plan monthly, or annual only? Annual plans cost more up front if you hire in bursts.",
        "**Overage.** What happens when you run out of minutes, credits or interviews mid-month?",
        "**Seats.** How many recruiters and hiring managers can log in, and what does an extra user cost?",
        "**Integrations.** Which plan includes your ATS and calendar connection? It is often a higher tier.",
        "**Setup and support.** Is onboarding included, or charged separately?",
        "**Compliance features.** Are bias audits, consent records and data retention controls included where your location requires them? See our overview of [AI hiring laws](/blog/ai-hiring-laws).",
      ],
    },
    { type: "h2", id: "free-trial", text: "Is a Free Trial Worth Running?" },
    {
      type: "p",
      text: "Yes, if you run it on a real role. A trial shows how long your interviews actually take, how candidates respond and how useful the scorecards are, which turns every estimate above into real numbers. IntelliHire's Free plan runs for 7 days with 30 minutes of AI interviews; Hyring offers a free plan with monthly credits.",
    },
    {
      type: "p",
      text: "For a wider look at features beyond price, read our comparison of [HireVue alternatives](/blog/hirevue-alternatives) or the guide to the [best AI recruiting software](/blog/best-ai-recruiting-software). Current IntelliHire limits are always on the [pricing page](/pricing).",
    },
  ],
  faqs: [
    {
      question: "How much does AI interview software cost per month?",
      answer:
        "Published self-serve plans start around $49 to $299 a month. IntelliHire's Essential plan is $49 a month, Hyring's Pro plan is $79, and Spark Hire's monthly Video Interviews plan starts at $299. HireVue, Paradox and Sapia.ai publish no prices and quote after a demo.",
    },
    {
      question: "How much does one AI interview cost?",
      answer:
        "It depends on the plan and the interview length. On IntelliHire's Essential plan, 210 minutes cover 14 interviews of 15 minutes each, about $3.50 per interview. Divide any plan's price by the interviews it covers at your interview length to compare vendors.",
    },
    {
      question: "Why do some AI interview vendors not publish prices?",
      answer:
        "Enterprise vendors usually shape each contract to the customer's volume, integrations and onboarding needs, so they quote after a demo. That makes early comparison harder, which is why published prices and free trials help smaller teams decide quickly.",
    },
    {
      question: "Is annual or monthly billing better for AI interview software?",
      answer:
        "Monthly billing suits teams that hire in bursts or want to test a tool on real roles. Annual billing can lower the monthly price, but you pay for the whole year even in quiet hiring months.",
    },
  ],
  sources: [
    { title: "Pricing", publisher: "HireVue", url: "https://www.hirevue.com/pricing", accessed: "2026-10-28" },
    { title: "Pricing", publisher: "Hyring", url: "https://hyring.com/pricing", accessed: "2026-10-28" },
    { title: "Plans and pricing", publisher: "IntelliHire", url: "https://intellihire.supermia.ai/pricing", accessed: "2026-10-28" },
    { title: "Paradox homepage", publisher: "Paradox", url: "https://www.paradox.ai/", accessed: "2026-10-28" },
    { title: "Ribbon vs HireVue", publisher: "Ribbon", url: "https://ribbon.ai/vs-hirevue", accessed: "2026-10-28" },
    { title: "Sapia.ai homepage", publisher: "Sapia.ai", url: "https://sapia.ai/", accessed: "2026-10-28" },
    { title: "Pricing", publisher: "Spark Hire", url: "https://www.sparkhire.com/pricing/", accessed: "2026-10-28" },
  ],
  supports: "/pricing",
};

export default post;
