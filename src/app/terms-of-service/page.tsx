import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { TermsOfServiceContent } from "@/components/sections/terms-of-service";
import { CTABannerSection } from "@/components/sections/cta-banner";

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Terms of Service"
          lastUpdated="March 16, 2026"
          subtitle="Welcome to Brainito!"
          description="These Terms of Service (&#34;Terms&#34;) govern your access to and use of the websites, services, and products provided by Brainito. Please read them carefully."
          activePolicy="Terms of Service"
        />
        <TermsOfServiceContent />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}