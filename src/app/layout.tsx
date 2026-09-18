import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_TAGLINE,
} from "@/lib/site";
import "./globals.css";

const questrial = localFont({
  src: "../fonts/Questrial-Regular.ttf",
  variable: "--font-questrial",
  weight: "400",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI-Powered Recruitment & Hiring Platform`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "IntelliHire",
    "AI recruitment platform",
    "AI hiring software",
    "AI voice interviews",
    "automated candidate screening",
    "resume parsing software",
    "AI candidate matching",
    "interview scheduling software",
    "recruitment automation",
    "applicant tracking system",
    "interview proctoring",
    "hiring scorecards",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | AI-Powered Recruitment & Hiring Platform`,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | AI-Powered Recruitment`,
    description: SITE_DESCRIPTION,
    creator: "@intellihire",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#071a3d",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      slogan: SITE_TAGLINE,
      description: SITE_DESCRIPTION,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 517,
        height: 106,
      },
      email: "hello@supermia.ai",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2451 W Grapevine Mills Cir #547",
        addressLocality: "Grapevine",
        addressRegion: "TX",
        postalCode: "76051",
        addressCountry: "US",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "SuperMIA",
        url: "https://supermia.ai/",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Recruitment Software",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "AI job description and rubric studio",
        "Intelligent resume parsing",
        "Explainable AI candidate matching",
        "Autonomous AI voice interviews",
        "AI-assisted human interviews",
        "Automated candidate scorecards",
        "AI interview proctoring",
        "Automated candidate communication",
        "Smart interview scheduling",
        "Recruitment pipeline management",
        "Recruitment analytics",
        "ATS and platform integrations",
        "Enterprise security and compliance",
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${questrial.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
