import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
    return getPageMetadata("/homepage-demo");
}

export default function HomepageDemoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
