import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { AcceptableUseContent } from "@/components/sections/acceptable-use-content";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return getPageMetadata("/acceptable-use-anti-spam-policy");
}

export default function AcceptableUsePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Acceptable Use / Anti-Spam Policy"
          lastUpdated="March 16, 2026"
          description="Guidelines defining the acceptable use of Brainito's platforms and services, outlining our strict zero-tolerance policy against unsolicited email and platform abuse."
          activePolicy="Acceptable Use / Anti-Spam Policy"
        />
        <AcceptableUseContent />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
