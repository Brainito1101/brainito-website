import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStorySection } from "@/components/sections/about-story";
import { OurValuesSection } from "@/components/sections/our-values";
import { OurMissionSection } from "@/components/sections/our-mission";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return getPageMetadata("/about");
}

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
