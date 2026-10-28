import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import TrackClicks from "@/components/TrackClicks";
import { JsonLd } from "@/components/ui";
import {
  BRAND_NAME,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/site";
import { SITEWIDE_GRAPH } from "@/lib/seo";
import "./globals.css";

// Both fonts are subset to Latin (Google's latin ranges plus arrows) with
// fontTools; the full files were 344 KB and 180 KB and delayed the hero text.
const questrial = localFont({
  src: "../fonts/Questrial-Regular.woff2",
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
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: BRAND_NAME,
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: "SuperMIA",
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${questrial.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Organization, WebSite and SoftwareApplication, referenced by @id
            from every page's own graph. */}
        <JsonLd nodes={SITEWIDE_GRAPH} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-[#071a3d] px-5 py-3 text-[14px] font-semibold text-[#ffffff] shadow-lg transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <TrackClicks />
      </body>
    </html>
  );
}
