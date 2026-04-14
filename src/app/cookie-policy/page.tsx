import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { CookiePolicyContent } from "@/components/sections/cookie-policy-content";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return getPageMetadata("/cookie-policy");
}

export default function CookiePolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Cookie Policy"
          lastUpdated="March 16, 2026"
          description=""
          activePolicy="Cookie Policy"
        />
        <CookiePolicyContent />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
