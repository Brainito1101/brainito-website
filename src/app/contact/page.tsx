import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { ContactSection } from "@/components/sections/contact";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/contact");
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <ContactSection />
        <div className="max-md:-mt-4 md:mt-0">
          <CTABannerSection />
        </div>
      </main>
      <Footer />
    </>
  );
}

