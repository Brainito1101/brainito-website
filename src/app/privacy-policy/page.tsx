import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { PrivacyPolicyContent } from "@/components/sections/privacy-policy-content";
import { CTABannerSection } from "@/components/sections/cta-banner";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Privacy Policy"
          lastUpdated="March 16, 2026"
description='Brainito ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.'
          activePolicy="Privacy Policy"
        />
        <PrivacyPolicyContent />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
