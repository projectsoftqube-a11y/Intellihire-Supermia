import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import HiringGap from "@/components/HiringGap";
import HiringFlow from "@/components/HiringFlow";
import HumanBalance from "@/components/HumanBalance";
import FeatureSuite from "@/components/FeatureSuite";
import Pricing from "@/components/Pricing";
import Brochure from "@/components/Brochure";
import FinalCta from "@/components/FinalCta";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HiringGap />
        <HiringFlow />
        <HumanBalance />
        <FeatureSuite />
        <Pricing />
        <Brochure />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
