"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GROUPS = [
  {
    id: "sourcing",
    number: "01",
    label: "Sourcing & Matching",
    title: "Find the right people, not just more people.",
    copy: "Draft the role, parse every resume at any volume, and let explainable scoring surface the strongest fits with the reasoning attached.",
    image: "/images/feature-sourcing.png",
    alt: "Recruiter reviewing AI-ranked candidate matches on a large screen",
    tags: ["JD & Rubric Studio", "Resume Parsing", "Candidate Matching"],
  },
  {
    id: "interviewing",
    number: "02",
    label: "Interviewing",
    title: "Interviews that run around the clock.",
    copy: "Autonomous voice interviews with natural turn-taking, AI joining your human calls, and integrity monitored from first question to last.",
    image: "/images/feature-interviewing.png",
    alt: "Candidate in an AI-led voice interview with live transcript on screen",
    tags: [
      "AI Voice Interviews",
      "AI-Assisted Human",
      "Scheduling",
      "Proctoring",
    ],
  },
  {
    id: "intelligence",
    number: "03",
    label: "Insight & Analytics",
    title: "Every decision backed by evidence.",
    copy: "Scorecards cite the transcript. Analytics show time-to-hire, funnel conversion and where candidates stall, across the whole pipeline.",
    image: "/images/feature-analytics.png",
    alt: "Hiring team reviewing funnel conversion and time-to-hire dashboards",
    tags: ["Scorecards", "Recruitment Analytics", "Pipeline Management"],
  },
  {
    id: "experience",
    number: "04",
    label: "Candidate Experience",
    title: "A process candidates never have to chase.",
    copy: "Email, WhatsApp and SMS keep people informed at every step, with a portal that handles device checks before the interview starts.",
    image: "/images/feature-experience.png",
    alt: "Candidate completing an application from home",
    tags: ["Automated Communication", "Candidate Portal", "Interviewer Portal"],
  },
  {
    id: "platform",
    number: "05",
    label: "Platform & Security",
    title: "Built to pass enterprise review.",
    copy: "Connects to the tools you already run, on multi-tenant infrastructure with encryption, consent management and full audit logging.",
    image: "/images/feature-platform.png",
    alt: "Engineer reviewing system architecture and access control panels",
    tags: ["ATS Integrations", "Enterprise Security & Compliance"],
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
      className="relative bg-brand-surface px-5 py-24 md:px-10 md:py-32"
      id="features"
      ref={root}
    >
      <div className="mx-auto max-w-[1920px]">
        <div data-fs-head className="max-w-[820px]">
          <p className="m-0 flex items-center gap-3 text-[12px] leading-none font-semibold tracking-[0.2em] uppercase text-[#087ef5]">
            <span
              className="h-px w-10 shrink-0 bg-[#ff6b00]"
              aria-hidden="true"
            />
            The platform
          </p>

          <h2 className="mt-8 font-display text-[clamp(34px,4.2vw,64px)] leading-[1.04] font-normal tracking-[-0.02em] text-[#071a3d]">
            Everything hiring needs,
            <span className="block text-[#087ef5]">in one system.</span>
          </h2>
        </div>

        <div className="mt-16 flex flex-col md:mt-20">
          {GROUPS.map(
            ({ id, number, label, title, copy, image, alt, tags }, i) => (
              <article
                data-fs-row
                key={id}
                className="grid grid-cols-1 items-center gap-10 border-t border-[#e5eaf0] py-14 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-16 lg:py-20"
              >
                <div
                  data-fs-anim
                  className={`relative overflow-hidden rounded-[28px] bg-[#071a3d] lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <p
                    data-fs-anim
                    className="m-0 flex items-center gap-4 text-[12px] leading-none font-semibold tracking-[0.18em] uppercase text-[#087ef5]"
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

                  <h3
                    data-fs-anim
                    className="mt-7 font-display text-[clamp(28px,3.2vw,46px)] leading-[1.1] font-normal tracking-[-0.015em] text-[#071a3d]"
                  >
                    {title}
                  </h3>

                  <p
                    data-fs-anim
                    className="mt-6 max-w-[480px] text-[clamp(16px,1.25vw,19px)] leading-[1.7] text-[#5b6575]"
                  >
                    {copy}
                  </p>

                  <div data-fs-anim className="mt-8">
                    <p className="m-0 text-[12px] font-semibold tracking-[0.14em] uppercase text-[#071a3d]/40">
                      Includes
                    </p>
                    <ul className="m-0 mt-4 flex list-none flex-col p-0">
                      {tags.map((tag) => (
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
