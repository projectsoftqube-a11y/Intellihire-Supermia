import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing use of the IntelliHire recruitment platform, including customer obligations, acceptable use and service commitments.",
  alternates: { canonical: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    heading: "Agreement to terms",
    body: [
      "These Terms and Conditions govern your access to and use of the IntelliHire platform, website and related services. By creating an account or using the service, you agree to be bound by these terms.",
      "If you are entering into these terms on behalf of an organisation, you represent that you have authority to bind that organisation.",
    ],
  },
  {
    id: "the-service",
    heading: "The service",
    body: [
      "IntelliHire provides AI-assisted recruitment tooling including job description generation, resume parsing, candidate matching, automated and AI-assisted interviews, scorecards, scheduling and pipeline management.",
      "We may add, modify or discontinue features. Where a change materially reduces core functionality, we will provide reasonable advance notice.",
    ],
  },
  {
    id: "accounts",
    heading: "Accounts and access",
    body: [
      "You are responsible for maintaining the confidentiality of account credentials and for all activity that occurs under your account.",
    ],
    list: [
      "Provide accurate registration information and keep it current",
      "Do not share credentials or allow unauthorised access",
      "Notify us promptly of any suspected security incident",
      "Ensure users within your organisation comply with these terms",
    ],
  },
  {
    id: "customer-responsibilities",
    heading: "Customer responsibilities",
    body: [
      "As the organisation making hiring decisions, you act as the data controller for candidate information processed through the platform.",
    ],
    list: [
      "Obtain any required candidate consent for recording and automated processing",
      "Comply with applicable employment, anti-discrimination and privacy law",
      "Review AI-generated outputs before acting on them",
      "Ensure job requirements and rubrics are lawful and job-related",
      "Respond to candidate data requests for which you are responsible",
    ],
  },
  {
    id: "ai-outputs",
    heading: "AI outputs and human review",
    body: [
      "IntelliHire generates match scores, summaries, transcripts and draft evaluations. These outputs are probabilistic and intended as decision support only.",
      "You are responsible for human review of AI outputs before any hiring decision. We do not warrant that outputs are free from error or bias, and outputs must not be used as the sole basis for rejecting a candidate.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: ["You agree not to use the service to do any of the following."],
    list: [
      "Violate any applicable law or third-party right",
      "Process data you have no lawful basis to process",
      "Reverse engineer, scrape or attempt to extract underlying models",
      "Interfere with the integrity or performance of the platform",
      "Use outputs to discriminate on legally protected characteristics",
      "Resell or provide the service to third parties without authorisation",
    ],
  },
  {
    id: "fees",
    heading: "Fees and payment",
    body: [
      "Fees, billing frequency and plan limits are set out in your order form or subscription agreement. Unless stated otherwise, fees are non-refundable and exclusive of applicable taxes.",
      "Late payment may result in suspension of access following reasonable notice.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: [
      "IntelliHire and its licensors retain all rights in the platform, including software, models, interfaces and documentation. You retain all rights in the data you submit.",
      "You grant us a limited licence to process your data solely to provide and support the service.",
    ],
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: [
      "Each party may access confidential information of the other. Both parties agree to protect such information with reasonable care and to use it only for purposes of this agreement.",
    ],
  },
  {
    id: "warranties",
    heading: "Disclaimers",
    body: [
      "The service is provided on an as-is and as-available basis. To the maximum extent permitted by law, we disclaim all implied warranties including merchantability, fitness for a particular purpose and non-infringement.",
      "We do not warrant uninterrupted or error-free operation, nor any specific hiring outcome.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, consequential or punitive damages, or for lost profits or lost data.",
      "Our aggregate liability arising from or relating to the service is limited to the fees paid by you in the twelve months preceding the claim.",
    ],
  },
  {
    id: "termination",
    heading: "Term and termination",
    body: [
      "Either party may terminate for material breach that remains uncured after written notice. You may cancel your subscription in accordance with your order form.",
      "On termination, access ceases and your data is deleted or returned in line with the retention terms described in our Privacy Policy.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the State of Texas, United States, without regard to conflict of law principles. The parties submit to the exclusive jurisdiction of the courts located in that state.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      "For questions about these terms, contact us at hello@supermia.ai, or write to 2451 W Grapevine Mills Cir #547, Grapevine, TX 76051, United States.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        eyebrow="Legal"
        title="Terms & Conditions"
        intro="The terms governing use of the IntelliHire platform, covering customer responsibilities, acceptable use, AI outputs and the limits of our service commitments."
        sections={SECTIONS}
      />
      <SiteFooter />
    </>
  );
}
