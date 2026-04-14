import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingClient } from "./PricingClient";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/pricing");
}

export default function PricingPage() {
    return (
        <>
            <Navbar />
            <PricingClient />
            <Footer />
        </>
    );
}
