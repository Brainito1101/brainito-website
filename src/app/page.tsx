import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { BrandsSection } from "@/components/sections/brands";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { CoreFeaturesSection } from "@/components/sections/core-features";
import { TestimonialsSection } from "@/components/sections/testimonials";
import {StatsSection} from "@/components/sections/stats";
import { PricingSection } from "@/components/sections/pricing";
import { FAQSection } from "@/components/sections/faq";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/");
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BrandsSection />
        <HowItWorksSection />
        <CoreFeaturesSection />
        <TestimonialsSection />

        <PricingSection />
        <FAQSection />
        <CTABannerSection />
      </main>
      <Footer />
    </>
  );
}
