import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TermsOfServiceHero } from "@/components/sections/terms-of-service-hero";
import { RefundPaymentContent } from "@/components/sections/refund-payment-content";
import { CTABannerSection } from "@/components/sections/cta-banner";

export default function RefundPaymentPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <TermsOfServiceHero
          title="Refund & Payment Terms"
          lastUpdated="March 16, 2026"
          description=""
          activePolicy="Refund & Payment Terms"
        />
        <RefundPaymentContent />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
