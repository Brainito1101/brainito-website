import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStorySection } from "@/components/sections/about-story";
import { OurValuesSection } from "@/components/sections/our-values";
import { OurMissionSection } from "@/components/sections/our-mission";
import { CTABannerSection } from "@/components/sections/cta-banner";

export const metadata = {
    title: "About Us | Brainito",
    description:
        "Where AI-driven insights meet human-led execution. Learn how Brainito helps businesses grow through clarity and data.",
};

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                <AboutHero />
                <AboutStorySection />
                
                <OurValuesSection />
                <OurMissionSection />
                <CTABannerSection />
            </main>
            <Footer />
        </>
    );
}
