import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { CaliforniaPrivacyContent } from "@/components/sections/california-privacy-content";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return getPageMetadata("/privacy-policy-for-california-residents");
}

export default function PrivacyCaliforniaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Privacy Policy for California Residents"
          lastUpdated="March 16, 2026"
          description="This section applies solely to California residents. It describes your rights under the California Consumer Privacy Act (CCPA) and how we collect and use your personal information"
          activePolicy="Privacy Policy for California Residents"
        />
        <CaliforniaPrivacyContent />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
