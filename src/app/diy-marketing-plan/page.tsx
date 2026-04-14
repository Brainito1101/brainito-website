import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DIYMarketingPlanHeroSection } from "@/components/sections/diy-marketing-plan-hero";
import { DIYMarketingPlanIncludesSection } from "@/components/sections/diy-marketing-plan-includes";
import { BrandsSection } from "@/components/sections/brands";
import { HowItWorksDIYSection } from "@/components/sections/how-it-works-diy";
import { CoreFeaturesSection } from "@/components/sections/core-features";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { FAQSection } from "@/components/sections/faq";
import { CTABannerSection } from "@/components/sections/cta-banner";

import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/diy-marketing-plan");
}

export default function DIYMarketingPlanPage() {
    return (
        <>
            <Navbar />
            <main>
                <DIYMarketingPlanHeroSection />
                <HowItWorksDIYSection />
                <DIYMarketingPlanIncludesSection />



                <TestimonialsSection />
                <PricingSection />
                <FAQSection />
                <CTABannerSection />
            </main>
            <Footer />
        </>
    );
}
