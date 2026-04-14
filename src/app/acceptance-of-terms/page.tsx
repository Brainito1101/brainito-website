import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return getPageMetadata("/acceptance-of-terms");
}

export default function AcceptanceOfTermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Acceptance of Terms"
          lastUpdated="March 16, 2026"
          description="By accessing or using our services, you expressly understand and agree to be inextricably bound by these terms directly outlined."
          activePolicy="Acceptance of Terms"
        />
        {/* Replace with your specific policy content component */}
        <div className="py-24" />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
