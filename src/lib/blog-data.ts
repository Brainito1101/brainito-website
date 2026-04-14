export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    authorRole?: string;
    date: string;
    readTime: string;
    category: string;
    content?: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: "ai-powered-marketing-trends-2025",
        title: "The Future of AI-Powered Marketing: Trends for 2025",
        excerpt: "Discover how artificial intelligence is revolutionizing marketing strategies and what it means for your business growth.",
        author: "Brainito Team",
        authorRole: "Marketing Experts",
        date: "January 5, 2025",
        readTime: "8 min read",
        category: "AI & Marketing"
    },
    {
        slug: "growth-marketing-strategies",
        title: "10 Growth Marketing Strategies That Actually Work",
        excerpt: "Learn the proven tactics that successful startups use to scale their marketing efforts efficiently.",
        author: "Marketing Team",
        authorRole: "Growth Specialists",
        date: "January 3, 2025",
        readTime: "6 min read",
        category: "Growth"
    },
    {
        slug: "marketing-plan-30-days",
        title: "How to Create a Marketing Plan in 30 Days",
        excerpt: "A step-by-step guide to building a comprehensive marketing strategy for your business.",
        author: "Strategy Team",
        authorRole: "Strategic Planners",
        date: "December 28, 2024",
        readTime: "10 min read",
        category: "Strategy"
    },
    {
        slug: "content-marketing-2025",
        title: "Content Marketing Best Practices for 2025",
        excerpt: "Stay ahead of the curve with these content marketing tips and techniques.",
        author: "Content Team",
        authorRole: "Creative Directors",
        date: "December 22, 2024",
        readTime: "7 min read",
        category: "Content"
    },
    {
        slug: "social-media-marketing-guide",
        title: "Social Media Marketing: A Complete Guide",
        excerpt: "Master social media marketing with our comprehensive guide covering all major platforms.",
        author: "Social Team",
        authorRole: "Social Strategists",
        date: "December 18, 2024",
        readTime: "12 min read",
        category: "Social Media"
    },
    {
        slug: "seo-fundamentals",
        title: "SEO Fundamentals Every Marketer Should Know",
        excerpt: "Boost your organic traffic with these essential SEO strategies and best practices.",
        author: "SEO Team",
        authorRole: "SEO Experts",
        date: "December 15, 2024",
        readTime: "9 min read",
        category: "SEO"
    },
    {
        slug: "email-marketing-automation",
        title: "Email Marketing Automation: Getting Started",
        excerpt: "Learn how to set up effective email automation workflows that convert.",
        author: "Email Team",
        authorRole: "Automation Specialists",
        date: "December 10, 2024",
        readTime: "5 min read",
        category: "Email"
    },
    {
        slug: "brand-awareness-budget",
        title: "Building Brand Awareness on a Budget",
        excerpt: "Effective strategies to increase your brand visibility without breaking the bank.",
        author: "Brand Team",
        authorRole: "Brand Strategists",
        date: "December 5, 2024",
        readTime: "6 min read",
        category: "Branding"
    },
    {
        slug: "consumer-behavior-psychology",
        title: "The Psychology of Consumer Behavior",
        excerpt: "Understanding what drives your customers to make purchasing decisions.",
        author: "Research Team",
        authorRole: "Behavioral Analysts",
        date: "December 1, 2024",
        readTime: "8 min read",
        category: "Psychology"
    }
];

export const CARD_GRADIENTS = [
    "from-[#F9F5FF] to-[#FFF7ED]",
    "from-[#FFF7ED] to-[#F9F5FF]",
    "from-[#F9F5FF] to-[#FFF1F2]",
    "from-[#FEF3C7] to-[#F9F5FF]",
    "from-[#F9F5FF] to-[#FFF1F2]",
    "from-[#FFF7ED] to-[#F9F5FF]",
    "from-[#F9F5FF] to-[#FEF3C7]",
    "from-[#FFF1F2] to-[#F9F5FF]",
    "from-[#F9F5FF] to-[#FFF7ED]",
];
