import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { CTABannerSection } from "@/components/sections/cta-banner";

export default function OtherPoliciesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Other Essential Policies"
          lastUpdated="March 16, 2026"
          description="Brainito respects the intellectual property rights of others. If you believe that any material available on or through our services infringes upon any copyright you own or control, please immediately notify our Designated Agent:"
          activePolicy="Other Essential Policies"
        />
        {/* Replace with your specific policy content component */}
        <div className="py-24" />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
