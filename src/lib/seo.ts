import { Metadata } from "next";
import { api } from "./api";
import { buildStaticPageMetadata, formatSeoTitle, stripTrailingBrandFromTitle } from "./page-metadata-defaults";

type PageSeoApi = {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    no_index?: boolean;
    canonical_url?: string;
};

export async function getPageMetadata(path: string): Promise<Metadata> {
    const fallback = buildStaticPageMetadata(path);

    try {
        const data = (await api.getPageSEO(path)) as PageSeoApi | null;
        if (!data) {
            return fallback;
        }

        const rawTitle =
            data.meta_title ||
            (typeof fallback.title === "string" ? fallback.title : "") ||
            "";
        const title = formatSeoTitle(stripTrailingBrandFromTitle(rawTitle));

        const description = data.meta_description || fallback.description;
        const keywords = data.meta_keywords || (typeof fallback.keywords === "string" ? fallback.keywords : undefined);

        const rawOgTitle = data.og_title || data.meta_title || rawTitle;
        const ogTitle = formatSeoTitle(stripTrailingBrandFromTitle(rawOgTitle));
        const ogDescription =
            data.og_description || data.meta_description || (typeof description === "string" ? description : undefined);

        const prevOg = fallback.openGraph && typeof fallback.openGraph === "object" ? fallback.openGraph : {};

        return {
            ...fallback,
            title,
            description,
            ...(keywords ? { keywords } : {}),
            robots: {
                index: !data.no_index,
                follow: !data.no_index,
                googleBot: { index: !data.no_index, follow: !data.no_index },
            },
            alternates: {
                canonical: data.canonical_url || fallback.alternates?.canonical,
            },
            openGraph: {
                ...prevOg,
                title: ogTitle,
                description: ogDescription,
                ...(data.og_image ? { images: [{ url: data.og_image }] } : {}),
            },
            twitter: {
                card: "summary_large_image",
                title: typeof ogTitle === "string" ? ogTitle : undefined,
                description: typeof ogDescription === "string" ? ogDescription : undefined,
                ...(data.og_image ? { images: [data.og_image] } : {}),
            },
        };
    } catch (error) {
        console.error(`Error fetching SEO data for ${path}:`, error);
        return fallback;
    }
}
