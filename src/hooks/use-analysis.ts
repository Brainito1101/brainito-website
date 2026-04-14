"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

interface AnalysisErrors {
    website?: string;
    email?: string;
    general?: string;
}

function fireAdsConversionEvent() {
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "conversion", {
            send_to: "AW-17618812380/X_9kCLXD1vobENz7ptFB",
        });
    }
}

export function useAnalysis() {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<AnalysisErrors>({});

    const extractDomain = (input: string): string => {
        try {
            let cleaned = input.trim().toLowerCase();
            cleaned = cleaned.replace(/^https?:\/\//, ""); 
            cleaned = cleaned.replace(/^www\./, "");       
            cleaned = cleaned.split("/")[0];               
            cleaned = cleaned.split("?")[0];               
            return cleaned;
        } catch {
            return "";
        }
    };

    const isValidDomain = (domain: string): boolean => {
        const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
        return domainRegex.test(domain);
    };

    const runAnalysis = async (websiteUrl: string, email: string, source: string) => {
        setErrors({});
        const domain = extractDomain(websiteUrl);

        if (!isValidDomain(domain)) {
            setErrors({ general: "Please enter a valid domain (e.g., example.com)" });
            return;
        }

        setLoading(true);
        const cleanedURL = `https://${domain}`;

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";
        const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.brainito.com";

        try {
            const endpoint = user
                ? `${API_BASE_URL}/analyze/`
                : `${API_BASE_URL}/analyze-guest/`;

            const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (accessToken) {
                headers["Authorization"] = `Bearer ${accessToken}`;
            }

            const res = await fetch(endpoint, {
                method: "POST",
                headers,
                body: JSON.stringify({
                    website: cleanedURL,
                    email: email.trim(),
                    source: source,
                    // Marketing site: queue health score scan only (no DIY GPT marketing audit).
                    health_scan_only: true,
                }),
            });

            const data = await res.json();

            if (res.status === 401 && user) {
                logout();
                setErrors({ general: "Your session expired. Please login again." });
                setLoading(false);
                return;
            }

            if (!res.ok) {
                if (data.error === "validation_failed" && data.errors) {
                    setErrors({
                        website: data.errors.website,
                        email: data.errors.email,
                        general: data.errors.general || data.message
                    });
                } else {
                    setErrors({ general: data.message || "Something went wrong. Please try again." });
                }
                setLoading(false);
                return;
            }

            if (data.result || data.success) {
                fireAdsConversionEvent();
                const guestParam = user ? "" : "&guest=true";
                const scanUid =
                    typeof (data as { scan_uid?: unknown }).scan_uid === "string"
                        ? (data as { scan_uid: string }).scan_uid.trim()
                        : "";
                const aid =
                    data.analysis_id != null && data.analysis_id !== ""
                        ? `&analysis_id=${encodeURIComponent(String(data.analysis_id))}`
                        : "";
                if (scanUid) {
                    window.location.href = `${DASHBOARD_URL}/dashboard/marketing-health-score?scan_uid=${encodeURIComponent(scanUid)}${aid}${guestParam}`;
                } else {
                    window.location.href = `${DASHBOARD_URL}/dashboard?analysis_id=${data.analysis_id}${guestParam}`;
                }
            } else {
                setErrors({ general: "Something went wrong. Please try again." });
                setLoading(false);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors({ general: "Server error. Please try again later." });
            setLoading(false);
        }
    };

    return { runAnalysis, loading, errors, setErrors };
}
