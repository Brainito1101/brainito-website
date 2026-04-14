import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CaseStudiesHero } from "@/components/sections/case-studies-hero";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/case-studies");
}

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseStudiesHero />
        <CaseStudiesSection hideHeader showViewAll={false} />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
