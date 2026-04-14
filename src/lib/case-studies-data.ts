export interface ResultItem {
    icon: string;
    metric: string;
    label: string;
    description: string;
    highlight?: boolean;
}

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    avatar: string;
}

export interface CaseStudy {
    slug: string;
    category: string;
    title: string;
    subtitle: string;
    image: string;
    metrics: string[];
    duration: string;
    industry: string;
    services: string[];
    aboutBusiness: string;
    theChallenge: string;
    ourApproach: {
        intro: string;
        bullets: string[];
    };
    theSolution: string;
    results: ResultItem[];
    testimonial?: Testimonial;
    ctaImage?: string;
}

export const caseStudies: CaseStudy[] = [
    {
        slug: "d2c-brand",
        category: "D2C Brand",
        title: "Scaled from Local Seller to Nationwide D2C Brand in 90 Days",
        subtitle:
            "A Europe-based direct-to-consumer brand went from fragmented local reach to a fully scalable growth engine in just 90 days.",
        image:
            "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=1400",
        metrics: ["+340% Revenue Growth", "4.2x ROAS", "↓45% CAC"],
        duration: "90 Days",
        industry: "e-commerce, marketplace, d2c",
        services: [
            "Full Marketing Strategy",
            "Paid Advertising",
            "SEO",
            "Social Media Management",
            "Email Automation",
        ],
        aboutBusiness:
            "D2C Brand is a Europe-based direct-to-consumer hobby and lifestyle brand, offering products designed for creativity, personal interests, and everyday enjoyment. The brand had strong product-market fit but limited digital scale beyond its local market.",
        theChallenge:
            "D2C Brand had quality products and early traction but struggled to grow beyond a limited regional audience. Marketing efforts were fragmented, ad spend lacked efficiency, and there was no clear, scalable growth strategy to support nationwide expansion.",
        ourApproach: {
            intro:
                "We started with a deep audit of existing marketing performance and built a focused, execution-first growth strategy.",
            bullets: [
                "Audience segmentation and demand mapping",
                "Structured Meta and Google Ads campaigns",
                "Funnel-aligned content strategy",
                "Landing page and conversion rate optimization",
                "Daily monitoring with weekly performance reviews",
            ],
        },
        theSolution:
            "Brainito implemented a scalable marketing system with clear ownership. A dedicated marketing manager handled day-to-day execution, optimization, and reporting. Campaigns were continuously refined using real-time data, enabling efficient scale across European markets.",
        results: [
            {
                icon: "chart",
                metric: "+340%",
                label: "Revenue Growth",
                description:
                    "Year-over-year revenue increase after campaign optimization.",
                highlight: false,
            },
            {
                icon: "roas",
                metric: "↑ 4.2x",
                label: "Return on Ad Spend",
                description:
                    "Marketing campaigns generated 4.2x return on advertising spend.",
                highlight: false,
            },
            {
                icon: "cac",
                metric: "↓ 45%",
                label: "Customer Acquisition Cost",
                description:
                    "Reduced CAC through optimized funnels and targeted ads.",
                highlight: true,
            },
        ],
        testimonial: {
            name: "Kane Williamson",
            role: "Founder",
            company: "D2C Brand",
            quote: "Working with Brainito completely transformed our business. Their data-driven approach and dedicated execution helped us achieve results we didn't think were possible. We scaled from a local seller to a nationwide brand in just 90 days.",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300",
        },
    },
    {
        slug: "network-mapping-software",
        category: "Network Mapping Software Company",
        title: "From High Costs to High Conversions: Fixing Lead Generation at Scale",
        subtitle:
            "A B2B SaaS company transformed its marketing funnel and slashed customer acquisition costs while tripling qualified leads.",
        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1400",
        metrics: ["+3x Qualified Leads", "−52% CPL", "85% Pipeline Growth"],
        duration: "120 Days",
        industry: "SaaS, B2B, technology",
        services: [
            "Full Marketing Strategy",
            "Paid Advertising",
            "Content Marketing",
            "Marketing Automation",
        ],
        aboutBusiness:
            "A UK-based B2B software company offering network mapping and IT infrastructure visualization tools. The business serves enterprise clients but relied heavily on outbound sales and had little inbound marketing traction.",
        theChallenge:
            "Despite a strong product, the company struggled with high cost-per-lead and poor inbound traffic. The sales team was doing all the heavy lifting with no marketing-qualified pipeline to work from, creating a bottleneck on growth.",
        ourApproach: {
            intro:
                "We restructured the demand generation approach from ABM-driven outbound to a scalable inbound-led model.",
            bullets: [
                "ICP definition and buyer journey mapping",
                "LinkedIn and Google Ads campaign buildout",
                "SEO-driven technical content strategy",
                "CRM automation and lead scoring setup",
                "Monthly performance reviews and bidding optimization",
            ],
        },
        theSolution:
            "Brainito rebuilt the lead generation engine from the ground up, combining targeted paid campaigns with content that addressed real buyer concerns. A dedicated growth manager oversaw execution while the team focused on product and sales.",
        results: [
            {
                icon: "leads",
                metric: "+3x",
                label: "Qualified Leads",
                description:
                    "Tripled inbound qualified leads within 4 months of campaign launch.",
                highlight: false,
            },
            {
                icon: "cpl",
                metric: "−52%",
                label: "Cost Per Lead",
                description:
                    "Halved the cost per qualified lead through smarter bidding and targeting.",
                highlight: false,
            },
            {
                icon: "pipeline",
                metric: "85%",
                label: "Pipeline Growth",
                description:
                    "Sales pipeline expanded 85% giving the team more to close.",
                highlight: true,
            },
        ],
        testimonial: {
            name: "James Thornton",
            role: "Head of Marketing",
            company: "Network Mapping Software",
            quote: "Brainito rebuilt our entire inbound engine. Within 4 months we had a pipeline we could actually rely on — triple the leads at half the cost. Our sales team finally had enough to work with.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        },
    },
    {
        slug: "dating-coach",
        category: "Dating Coach",
        title: "From Invisible to Influential: Building Authority in Online Coaching",
        subtitle:
            "A personal brand went from zero online presence to a recognized authority with a growing paid community.",
        image:
            "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=1400",
        metrics: ["+1200% Social Reach", "68% Conversion Rate", "4.8x Revenue"],
        duration: "60 Days",
        industry: "coaching, personal brand, e-learning",
        services: [
            "Brand Strategy",
            "Social Media Management",
            "Content Creation",
            "Paid Advertising",
            "Email Automation",
        ],
        aboutBusiness:
            "A certified dating and relationship coach with years of experience but minimal online visibility. The coach relied on word-of-mouth referrals and wanted to build a sustainable digital-first business with recurring revenue.",
        theChallenge:
            "Despite genuine expertise, the coach had no content strategy, no audience, and no digital funnel. Social media was inconsistent, and there was no system for turning followers into paying clients.",
        ourApproach: {
            intro:
                "We built a full-stack personal brand and monetization system tailored for the coaching niche.",
            bullets: [
                "Brand identity and content pillars definition",
                "Short-form video content strategy and distribution",
                "Community building and engagement strategy",
                "Webinar funnel and lead magnet setup",
                "Email nurture sequences for conversions",
            ],
        },
        theSolution:
            "Brainito deployed a content engine that turned expertise into authority content. Combined with targeted paid promotion and a structured community funnel, the coach went from invisible to in-demand in 60 days.",
        results: [
            {
                icon: "social",
                metric: "+1200%",
                label: "Social Reach",
                description:
                    "Reach grew from near zero to over 120K across platforms.",
                highlight: false,
            },
            {
                icon: "conversion",
                metric: "68%",
                label: "Conversion Rate",
                description:
                    "68% of webinar attendees converted to paid clients.",
                highlight: false,
            },
            {
                icon: "revenue",
                metric: "4.8x",
                label: "Revenue Growth",
                description:
                    "Monthly coaching revenue grew 4.8x within the first two months.",
                highlight: true,
            },
        ],
        testimonial: {
            name: "Sofia Reyes",
            role: "Dating Coach",
            company: "Personal Brand",
            quote: "I went from zero online presence to being recognized in my niche. Brainito gave me the content strategy and funnel that converted followers into real paying clients — faster than I imagined.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        },
    },
    {
        slug: "local-delivery-marketplace",
        category: "Local Delivery Marketplace",
        title: "Smart Marketing for Smart Delivery: Building Demand During a Crisis",
        subtitle:
            "A last-mile delivery marketplace scaled operations and rider acquisition during peak demand disruption.",
        image:
            "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1400",
        metrics: ["+40% Daily Deliveries", "−30% Driver Acquisition Cost", "2.3x Orders"],
        duration: "75 Days",
        industry: "logistics, delivery, marketplace",
        services: [
            "Performance Marketing",
            "Local SEO",
            "App Store Optimization",
            "Social Media Advertising",
        ],
        aboutBusiness:
            "A hyperlocal delivery startup operating across 6 cities, connecting local businesses with end consumers and freelance delivery riders. The platform needed both supply (riders) and demand (businesses) growth simultaneously.",
        theChallenge:
            "The marketplace faced a classic two-sided platform challenge — driver supply wasn't keeping up with order growth, and marketing spend was inefficient with no clear attribution model across channels.",
        ourApproach: {
            intro:
                "We implemented a dual-sided growth strategy, running separate funnels for rider acquisition and merchant onboarding.",
            bullets: [
                "Geo-targeted paid campaigns by city",
                "Driver acquisition funnel optimization",
                "Merchant onboarding email and retargeting sequences",
                "App store optimization and review management",
                "Weekly A/B testing on creatives and landing pages",
            ],
        },
        theSolution:
            "Brainito separated the marketing functions for each side of the marketplace and built distinct funnels for riders and merchants. Local campaigns drove high-intent traffic while automation kept conversion rates consistent.",
        results: [
            {
                icon: "deliveries",
                metric: "+40%",
                label: "Daily Deliveries",
                description:
                    "Average daily deliveries increased 40% across all cities.",
                highlight: false,
            },
            {
                icon: "driver",
                metric: "−30%",
                label: "Driver Acquisition Cost",
                description:
                    "Reduced rider onboarding cost with better geo-targeting.",
                highlight: false,
            },
            {
                icon: "orders",
                metric: "2.3x",
                label: "Order Volume",
                description:
                    "Order volume more than doubled within 75 days.",
                highlight: true,
            },
        ],
        testimonial: {
            name: "Marcus Chen",
            role: "CEO",
            company: "Local Delivery Marketplace",
            quote: "The dual-sided strategy Brainito built was exactly what we needed. They understood our marketplace challenge and solved both sides simultaneously — drivers and merchants grew together.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
        },
    },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return caseStudies.find((cs) => cs.slug === slug);
}

export function getRelatedCaseStudies(slug: string, count = 3): CaseStudy[] {
    return caseStudies.filter((cs) => cs.slug !== slug).slice(0, count);
}
