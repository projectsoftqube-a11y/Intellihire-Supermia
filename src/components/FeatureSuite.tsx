"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { RichText } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Group = {
  id: string;
  number: string;
  label: string;
  /** Rendered as the H2 for this part of the platform. */
  title: string;
  copy: string[];
  image: string;
  alt: string;
  /** H3 capabilities with a short description (and optional link). */
  items?: { title: string; text: string }[];
  /** Plain "Includes" list where the copy has no H3s. */
  tags?: string[];
};

const GROUPS: Group[] = [
  {
    id: "screening",
    number: "01",
    label: "Screen & Match",
    title: "AI Resume Screening and Candidate Matching",
    copy: [
      "IntelliHire is recruitment automation software that starts with the role. You set the job description and rubric first, and every application is read and ranked against it.",
    ],
    image: "/images/feature-sourcing.png",
    alt: "Recruiter pointing at the top matched candidates in IntelliHire, sorted by match score",
    items: [
      {
        title: "JD and Rubric Studio",
        text: "Draft the job description and the evaluation rubric together, so screening, interviews and scorecards all measure the same criteria.",
      },
      {
        title: "Resume parsing at any volume",
        text: "IntelliHire reads every application at any volume and structures skills and experience for review. See how [AI resume screening](/platform/ai-resume-screening) works.",
      },
      {
        title: "Candidate matching with reasons you can read",
        text: "Candidates are ranked against your rubric with explainable reasoning. Your team can see why one person sits above another. Learn more about [AI candidate matching](/platform/candidate-matching).",
      },
    ],
  },
  {
    id: "interviewing",
    number: "02",
    label: "Interview",
    title: "AI Voice Interviews and Interview Scheduling",
    copy: [
      "First-round interviews no longer wait for a free slot in a recruiter's calendar. Candidates take them around the clock.",
    ],
    image: "/images/feature-interviewing.png",
    alt: "Candidate wearing headphones during an IntelliHire AI interview with a live transcript panel",
    items: [
      {
        title: "Autonomous AI voice interviews",
        text: "IntelliHire runs first-round voice interviews with natural turn-taking, at whatever hour suits the candidate. Explore the [AI interview software](/platform/ai-interviews).",
      },
      {
        title: "AI-assisted human interviews",
        text: "On selected plans, AI can join your team's live interview calls alongside your interviewers.",
      },
      {
        title: "Scheduling that keeps candidates moving",
        text: "Interview scheduling coordinates the next step so candidates are not left waiting between rounds. On selected plans, ATS and calendar integrations connect IntelliHire to the tools you already run. Ask in your demo which systems are supported today.",
      },
    ],
  },
  {
    id: "scorecards",
    number: "03",
    label: "Decide",
    title: "Scorecards and Interview Integrity",
    copy: [
      "Before anyone accepts a rating, they can read the answer it came from.",
    ],
    image: "/images/flow-assess.png",
    alt: "Two colleagues comparing candidate cards on a glass planning wall",
    items: [
      {
        title: "Scorecards that cite the transcript",
        text: "Each scorecard points to the part of the interview transcript behind it, so reviewers read the candidate's actual answer before they rely on a rating. See how [interview scorecards](/platform/interview-scorecards) work.",
      },
      {
        title: "Proctoring that flags concerns for review",
        text: "On selected plans, interview proctoring and integrity scoring flag possible concerns for a person to review. A flag is a prompt to look, never an automatic rejection. Read about [interview proctoring](/platform/interview-proctoring).",
      },
    ],
  },
  {
    id: "analytics",
    number: "04",
    label: "Insight",
    title: "Recruitment Analytics and Pipeline Management",
    copy: [
      "On selected plans, IntelliHire shows time-to-hire, funnel conversion and the stages where candidates stall, and tracks every candidate across the pipeline. Learn more about [recruitment analytics](/platform/recruitment-analytics).",
    ],
    image: "/images/feature-analytics.png",
    alt: "Hiring team reviewing an IntelliHire dashboard with a hiring funnel and time-to-hire chart",
    tags: [
      "Time-to-hire",
      "Funnel conversion",
      "Stages where candidates stall",
      "Pipeline management",
    ],
  },
  {
    id: "candidate-experience",
    number: "05",
    label: "Candidate Experience",
    title: "Keep Candidates Informed at Every Step",
    copy: [
      "Candidates take their first-round interview at whatever hour suits them. Email and WhatsApp updates, with SMS depending on your plan, tell them where they stand and what comes next.",
      "The candidate portal runs device checks before the interview starts, so technical problems are caught early. Enterprise teams also get a dedicated interviewer portal.",
    ],
    image: "/images/feature-experience.png",
    alt: "Candidate smiling while completing an application on a laptop at home",
    tags: [
      "Email and WhatsApp updates",
      "SMS depending on your plan",
      "Candidate portal with device checks",
      "Interviewer portal on Enterprise",
    ],
  },
];

export default function FeatureSuite() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-fs-head] > *", {
        y: 32,
        opacity: 0,
        stagger: 0.09,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-fs-row]").forEach((row) => {
        gsap.from(row.querySelectorAll("[data-fs-anim]"), {
          y: 44,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 78%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      className="relative bg-brand-surface px-4 py-24 sm:px-5 md:px-10 md:py-32"
      id="features"
      ref={root}
    >
      <div className="mx-auto max-w-[1920px]">
        <div data-fs-head className="max-w-[820px]">
          <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#066bd4]">
            <span
              className="h-px w-10 shrink-0 bg-[#ff6b00]"
              aria-hidden="true"
            />
            The platform
          </p>

          {/* Display line only: each row below carries its own H2, per the
              homepage heading map. */}
          <p className="m-0 mt-8 font-display text-[clamp(32px,4.2vw,64px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
            Everything hiring needs,
            <span className="block text-[#087ef5]">in one system.</span>
          </p>
        </div>

        <div className="mt-16 flex flex-col md:mt-20">
          {GROUPS.map(
            ({ id, number, label, title, copy, image, alt, items, tags }, i) => (
              <article
                data-fs-row
                key={id}
                id={id}
                className="grid scroll-mt-24 grid-cols-1 items-center gap-10 border-t border-[#e5eaf0] py-14 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-16 lg:py-20"
              >
                <div
                  data-fs-anim
                  className={`relative overflow-hidden rounded-[24px] bg-[#071a3d] sm:rounded-[28px] lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`min-w-0 lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <p
                    data-fs-anim
                    className="m-0 flex items-center gap-4 text-[12px] leading-none font-semibold tracking-[0.18em] uppercase text-[#5aa9ff]"
                  >
                    <span className="font-display text-[15px] tracking-normal text-[#071a3d]/25">
                      {number}
                    </span>
                    <span
                      className="h-px w-8 shrink-0 bg-[#ff6b00]"
                      aria-hidden="true"
                    />
                    {label}
                  </p>

                  <h2
                    data-fs-anim
                    className="mt-7 font-display text-[clamp(26px,3vw,44px)] leading-[1.1] font-normal tracking-[-0.015em] text-[#071a3d]"
                  >
                    {title}
                  </h2>

                  {copy.map((paragraph) => (
                    <p
                      data-fs-anim
                      key={paragraph.slice(0, 32)}
                      className="mt-6 max-w-[520px] text-[clamp(16px,1.2vw,18px)] leading-[1.7] text-[#5b6575]"
                    >
                      <RichText text={paragraph} />
                    </p>
                  ))}

                  <div data-fs-anim className="mt-8">
                    <p className="m-0 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#071a3d]/40">
                      Includes
                    </p>

                    {items ? (
                      <ul className="m-0 mt-4 flex list-none flex-col p-0">
                        {items.map((item) => (
                          <li
                            key={item.title}
                            className="flex gap-3 border-b border-[#e5eaf0] py-4 last:border-b-0"
                          >
                            <span
                              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#087ef5]"
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <h3 className="m-0 text-[15px] leading-snug font-semibold text-[#071a3d]">
                                {item.title}
                              </h3>
                              <p className="m-0 mt-1.5 text-[14.5px] leading-[1.65] text-[#5b6575]">
                                <RichText text={item.text} />
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="m-0 mt-4 flex list-none flex-col p-0">
                        {tags?.map((tag) => (
                          <li
                            key={tag}
                            className="flex items-center gap-3 border-b border-[#e5eaf0] py-3 text-[15px] font-semibold text-[#071a3d] last:border-b-0"
                          >
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#087ef5]"
                              aria-hidden="true"
                            />
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
