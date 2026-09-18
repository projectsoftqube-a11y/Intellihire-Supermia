import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How IntelliHire collects, uses, stores and protects candidate and customer data across the recruitment platform.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    heading: "Overview",
    body: [
      "This Privacy Policy explains how IntelliHire collects, uses, shares and protects personal information when you use our recruitment platform, website and related services.",
      "IntelliHire processes two broad categories of people: customers who use the platform to hire, and candidates whose applications are processed through it. Different rights and obligations may apply to each.",
    ],
  },
  {
    id: "information-we-collect",
    heading: "Information we collect",
    body: [
      "We collect information you provide directly, information generated through your use of the platform, and information received from integrated third-party services.",
    ],
    list: [
      "Account information such as name, work email, job title and organisation",
      "Candidate information including resumes, application responses and employment history",
      "Interview data such as audio recordings, video recordings and generated transcripts",
      "Assessment data including match scores, scorecards and evaluation notes",
      "Proctoring signals captured during interviews, such as tab focus and device events",
      "Technical data including IP address, browser type, device identifiers and usage logs",
    ],
  },
  {
    id: "how-we-use-information",
    heading: "How we use information",
    body: [
      "We use personal information to deliver and improve the service, and to meet our legal obligations.",
    ],
    list: [
      "Operating the recruitment platform and its core hiring workflows",
      "Generating match scores, scorecards and hiring insights for our customers",
      "Conducting and recording AI-assisted and autonomous interviews",
      "Detecting fraud, impersonation and interview integrity concerns",
      "Communicating service notifications, reminders and support responses",
      "Analysing aggregated usage to improve product performance and accuracy",
    ],
  },
  {
    id: "ai-and-automated-processing",
    heading: "AI and automated decision-making",
    body: [
      "IntelliHire uses automated processing to organise applications, generate match scores and produce draft evaluations. These outputs are decision support, not decisions.",
      "Final hiring decisions are made by human reviewers. Candidates may request information about how automated processing was applied to their application, and may request human review where applicable law provides that right.",
    ],
  },
  {
    id: "legal-bases",
    heading: "Legal bases for processing",
    body: [
      "Where the GDPR or similar frameworks apply, we rely on one or more of the following legal bases: performance of a contract, legitimate interests, compliance with legal obligations, and consent where required.",
      "Where we rely on consent, you may withdraw it at any time without affecting the lawfulness of processing carried out before withdrawal.",
    ],
  },
  {
    id: "sharing",
    heading: "How we share information",
    body: [
      "We do not sell personal information. We share it only as needed to operate the service.",
    ],
    list: [
      "With the hiring organisation that received a given application",
      "With infrastructure and processing vendors acting under contract",
      "With integrated services you or your organisation have connected",
      "Where required by law, regulation or valid legal process",
      "In connection with a merger, acquisition or transfer of assets",
    ],
  },
  {
    id: "retention",
    heading: "Data retention",
    body: [
      "We retain personal information for as long as needed to provide the service and satisfy legal obligations. Customers may configure retention periods for candidate records within their organisation settings.",
      "Interview recordings and transcripts are subject to configurable retention windows. When a retention period expires, records are deleted or irreversibly anonymised.",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "We apply administrative, technical and physical safeguards appropriate to the sensitivity of the data we process.",
    ],
    list: [
      "Encryption of data in transit and at rest",
      "Multi-tenant isolation between customer environments",
      "Role-based access control and least-privilege internal access",
      "Audit logging of access to candidate records",
      "Ongoing monitoring and periodic security review",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have rights to access, correct, delete, restrict, or port your personal information, and to object to certain processing.",
      "Candidates should direct requests to the hiring organisation that controls their application where possible. We will assist our customers in responding to such requests.",
    ],
  },
  {
    id: "international-transfers",
    heading: "International transfers",
    body: [
      "Personal information may be processed in countries other than where it was collected. Where required, we use appropriate transfer mechanisms such as Standard Contractual Clauses.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. Material changes will be communicated through the platform or by email, and the effective date above will be revised.",
    ],
  },
  {
    id: "contact",
    heading: "Contact us",
    body: [
      "For questions about this Privacy Policy or our data practices, contact us at hello@supermia.ai, or write to 2451 W Grapevine Mills Cir #547, Grapevine, TX 76051, United States.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <LegalPage
        eyebrow="Legal"
        title="Privacy Policy"
        intro="How IntelliHire collects, uses and protects personal information across the recruitment platform, for both hiring teams and the candidates they evaluate."
        sections={SECTIONS}
      />
      <SiteFooter />
    </>
  );
}
