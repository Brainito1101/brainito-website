import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HireMarketerHeroSection } from "@/components/sections/hire-marketer-hero";
import { HowItWorksSection2 } from "@/components/sections/how-it-works-marketer";
import { WhyChooseModelSection } from "@/components/sections/why-choose-model";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { HireMarketerPricingSection } from "@/components/sections/hire-marketer-pricing";
import { CoreFeaturesSection } from "@/components/sections/core-features";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { PricingSection } from "@/components/sections/pricing";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { FAQSection } from "@/components/sections/faq";
import { LetUsGrowSection } from "@/components/sections/let-us-grow";
import { WhatMarketerHandles } from "@/components/sections/what-marketer-handle";

export default function HireMarketerPage() {
    return (
        <>
            <Navbar />
            <main>
                <HireMarketerHeroSection />

                <HowItWorksSection2 />
                <WhatMarketerHandles />
                <WhyChooseModelSection />
                <CaseStudiesSection count={6} />
                <HireMarketerPricingSection />
                <FAQSection />
                <LetUsGrowSection />

                <CTABannerSection />
            </main>
            <Footer />
        </>
    );
}
