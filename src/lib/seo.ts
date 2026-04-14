import { Metadata } from "next";
import { api } from "./api";

export async function getPageMetadata(path: string): Promise<Metadata> {
    try {
        const data = await api.getPageSEO(path);
        
        if (!data) return {};

        return {
            title: data.meta_title,
            description: data.meta_description,
            keywords: data.meta_keywords,
            openGraph: {
                title: data.og_title || data.meta_title,
                description: data.og_description || data.meta_description,
                images: data.og_image ? [{ url: data.og_image }] : [],
                type: 'website',
            },
            robots: {
                index: !data.no_index,
                follow: !data.no_index,
            },
            alternates: {
                canonical: data.canonical_url,
            }
        };
    } catch (error) {
        console.error(`Error fetching SEO data for ${path}:`, error);
        return {};
    }
}
