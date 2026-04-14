import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { DPAContent } from "@/components/sections/dpa-content";
import { CTABannerSection } from "@/components/sections/cta-banner";

export default function DataProcessingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Data Processing Agreement (DPA)"
          lastUpdated="March 16, 2026"
          description="Note: This agreement is typically offered as a standalone, signable PDF document for B2B clients. Below is a summary of its key clauses based on your structure."
          activePolicy="Data Processing Agreement (DPA)"
        />
        <DPAContent />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
