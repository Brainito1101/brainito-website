const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";

export const api = {
    contactForm: async (data: {
        first_name: string;
        last_name: string;
        email: string;
        subject: string;
        message: string;
    }) => {
        const response = await fetch(`${API_BASE_URL}/auth/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to send message');
        }

        return result;
    },
    hireMarketer: async (data: {
        full_name: string;
        phone: string;
        email: string;
        website?: string;
        monthly_budget?: string;
        challenge?: string;
        other_challenge?: string;
    }) => {
        const response = await fetch(`${API_BASE_URL}/auth/hire-marketer/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to submit request');
        }

        return result;
    },

    getCaseStudies: async () => {
        const response = await fetch(`${API_BASE_URL}/case-studies/`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch case studies');
        }

        return result.case_studies;
    },

    getCaseStudy: async (slug: string) => {
        const response = await fetch(`${API_BASE_URL}/case-studies/${slug}/`);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Case study not found');
        }

        return result.case_study;
    },

    getPageSEO: async (path: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/page-seo/by-path/?path=${encodeURIComponent(path)}`);
            if (response.status === 404) return null;

            const result = await response.json();
            if (!response.ok) return null;

            return result.page_seo;
        } catch (error) {
            console.error("Failed to fetch page SEO", error);
            return null;
        }
    },

    newsletterSubscribe: async (email: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/newsletter/subscribe/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || result.error || "Failed to subscribe");
        }
        return result;
    },
};
