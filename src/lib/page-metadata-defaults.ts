import type { Metadata } from "next";

/** Public site origin for canonical and Open Graph URLs. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainito.com").replace(/\/$/, "");

/** U+2014 em dash between headline and brand in meta titles. */
export const SEO_TITLE_EM_DASH = "\u2014";

const SEO_TITLE_BRAND = "Brainito";
const SEO_TITLE_SUFFIX = ` ${SEO_TITLE_EM_DASH} ${SEO_TITLE_BRAND}`;
const SEO_TITLE_SUFFIX_LEN = SEO_TITLE_SUFFIX.length;

const SEO_TITLE_MIN = 50;
const SEO_TITLE_MAX = 60;

/** Remove trailing "… |/—/–/- Brainito" so titles can be re-normalized. */
export function stripTrailingBrandFromTitle(value: string): string {
    return value
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\s*(?:\||\u2014|\u2013|-)\s*Brainito\s*$/i, "")
        .trim();
}

/**
 * Build "{headline} — Brainito" with total length between minTotal and maxTotal (default 50–60).
 * Truncates on word boundaries when too long; expands very short headlines when needed.
 */
export function formatSeoTitle(headline: string, options?: { minTotal?: number; maxTotal?: number }): string {
    const minTotal = options?.minTotal ?? SEO_TITLE_MIN;
    const maxTotal = options?.maxTotal ?? SEO_TITLE_MAX;

    let head = stripTrailingBrandFromTitle(headline);
    if (!head) head = "Insights";

    const shorten = (): void => {
        while (head.length + SEO_TITLE_SUFFIX_LEN > maxTotal) {
            const cut = head.replace(/\s+\S*$/, "").trim();
            if (cut === head || !head) {
                head = head
                    .slice(0, Math.max(0, maxTotal - SEO_TITLE_SUFFIX_LEN))
                    .replace(/\s+\S*$/, "")
                    .trim();
                if (!head) head = "Brainito";
                break;
            }
            head = cut;
        }
    };

    const lengthen = (): void => {
        const phrases = [", marketing strategy & results", " for growing teams", ", audits, plans & execution"];
        let tries = 0;
        while (head.length + SEO_TITLE_SUFFIX_LEN < minTotal && tries < 8) {
            const phrase = phrases[tries % phrases.length];
            if (!head.endsWith(phrase)) head = `${head}${phrase}`;
            shorten();
            if (head.length + SEO_TITLE_SUFFIX_LEN >= minTotal) return;
            tries++;
        }
    };

    shorten();
    lengthen();
    shorten();

    return `${head}${SEO_TITLE_SUFFIX}`;
}

type StaticSeoEntry = {
    /** Headline only (no "— Brainito"); combined length enforced by {@link formatSeoTitle}. */
    title: string;
    description: string;
    keywords?: readonly string[];
    /** Set false for internal or demo routes. */
    index?: boolean;
};

/**
 * Fallback SEO when CMS/API has no entry or request fails.
 * Paths must match Next.js routes (leading slash, no trailing slash except "/").
 * `title` is the primary phrase before the em dash and brand suffix.
 */
export const PAGE_METADATA_DEFAULTS: Record<string, StaticSeoEntry> = {
    "/": {
        title: "Free AI audit, marketing health score & hands-on marketing",
        description:
            "Get a free AI-powered marketing audit, a full marketing health score scan, and dedicated marketing execution. Brainito turns clarity into measurable growth.",
        keywords: [
            "marketing audit",
            "free marketing report",
            "marketing health score",
            "remote marketing manager",
            "growth marketing",
            "Brainito",
        ],
    },
    "/about": {
        title: "About Brainito, our story & how we help you grow",
        description:
            "Learn how Brainito combines research-backed strategy with accountable execution to help founders and teams grow with direction—not guesswork.",
        keywords: ["about Brainito", "marketing company", "startup marketing", "Brainito team"],
    },
    "/contact": {
        title: "Contact Brainito for product, partners & support",
        description:
            "Reach the Brainito team for product questions, partnerships, or support. We respond as soon as we can during business hours (IST).",
        keywords: ["contact Brainito", "Brainito support", "marketing help"],
    },
    "/pricing": {
        title: "Pricing for audits, health scans & marketer hire",
        description:
            "Explore Brainito plans for audits, marketing health scans, and hands-on marketing management. Transparent pricing built for growing businesses.",
        keywords: ["Brainito pricing", "marketing plans pricing", "audit pricing"],
    },
    "/blog": {
        title: "Marketing strategy, audits & growth articles",
        description:
            "Articles on marketing strategy, execution, audits, and growth frameworks from the Brainito team.",
        keywords: ["marketing blog", "growth strategy", "Brainito blog"],
    },
    "/case-studies": {
        title: "Case studies: strategy, execution & outcomes",
        description:
            "See how teams use Brainito to sharpen strategy, improve execution, and track outcomes across industries.",
        keywords: ["marketing case studies", "Brainito results", "client stories"],
    },
    "/hire-marketer": {
        title: "Hire a remote marketing manager who owns results",
        description:
            "Get a dedicated marketing manager who owns strategy and execution like an in-house hire—without the hiring risk. Book a free strategy discussion.",
        keywords: ["hire marketing manager", "fractional CMO", "remote marketer", "Brainito"],
    },
    "/help": {
        title: "Brainito help: billing, plans & account answers",
        description:
            "Find answers to common questions about Brainito audits, plans, billing, and your account.",
        keywords: ["Brainito help", "FAQ", "support"],
    },
    "/privacy-policy": {
        title: "Privacy: how we collect, use & protect your data",
        description:
            "How Brainito collects, uses, and protects personal information when you use our website and services.",
        keywords: ["Brainito privacy", "data policy"],
    },
    "/terms-of-service": {
        title: "Terms of service for Brainito sites & products",
        description:
            "Terms governing access to Brainito websites, products, and services. Please read before using the platform.",
        keywords: ["Brainito terms", "terms of service"],
    },
    "/cookie-policy": {
        title: "Cookie policy: technologies you can control",
        description:
            "Information about cookies and similar technologies used on Brainito properties and how you can control them.",
        keywords: ["cookies", "Brainito cookie policy"],
    },
    "/refund-payment-terms": {
        title: "Refunds, billing & payment terms for Brainito",
        description:
            "Refund eligibility, billing cycles, and payment terms for Brainito products and subscriptions.",
        keywords: ["refund policy", "payment terms", "Brainito billing"],
    },
    "/acceptance-of-terms": {
        title: "Acceptance: how Brainito terms apply to your use",
        description:
            "How agreement to Brainito terms is formed when you use our website, trials, or paid services.",
        keywords: ["accept terms", "Brainito legal"],
    },
    "/acceptable-use-anti-spam-policy": {
        title: "Acceptable use & anti-spam for Brainito services",
        description:
            "Rules for acceptable use of Brainito services, communications, and anti-spam expectations for users and customers.",
        keywords: ["acceptable use", "anti-spam", "Brainito policy"],
    },
    "/data-cookie-policy": {
        title: "Data & cookie policy for Brainito web properties",
        description:
            "How Brainito uses cookies and similar technologies, and how we handle related data to run and improve the product.",
        keywords: ["data policy", "cookies", "Brainito"],
    },
    "/data-processing-agreement-dpa": {
        title: "Data processing agreement (DPA) for Brainito",
        description:
            "Data processing terms for organizations that require a DPA when using Brainito as a processor of personal data.",
        keywords: ["DPA", "data processing agreement", "Brainito"],
    },
    "/other-essential-policies": {
        title: "Other essential Brainito policies & disclosures",
        description:
            "Additional policies and disclosures that apply to specific Brainito offerings, regions, or integrations.",
        keywords: ["Brainito policies", "legal"],
    },
    "/privacy-policy-for-california-residents": {
        title: "California resident privacy notice & your rights",
        description:
            "California-specific privacy disclosures and rights information for residents as required by applicable law.",
        keywords: ["CCPA", "California privacy", "Brainito"],
    },
    "/homepage-demo": {
        title: "Homepage demo: internal Brainito layout preview",
        description: "Internal layout demo for Brainito marketing components.",
        index: false,
    },
};

const DEFAULT_LISTING_PRIMARY = "Marketing audits, plans & accountable growth";

export function buildStaticPageMetadata(path: string): Metadata {
    const entry = PAGE_METADATA_DEFAULTS[path];
    const title = formatSeoTitle(entry?.title ?? DEFAULT_LISTING_PRIMARY);
    const description =
        entry?.description ??
        "Brainito helps businesses grow with marketing audits, plans, and accountable execution.";
    const keywords = entry?.keywords?.join(", ");
    const index = entry?.index !== false;

    const canonicalPath = path === "/" ? "" : path;
    const canonical = `${SITE_URL}${canonicalPath}`;

    const base: Metadata = {
        title,
        description,
        ...(keywords ? { keywords } : {}),
        robots: index ? { index: true, follow: true, googleBot: { index: true, follow: true } } : { index: false, follow: false },
        alternates: { canonical },
        openGraph: {
            type: "website",
            url: canonical,
            siteName: "Brainito",
            locale: "en_US",
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };

    return base;
}
