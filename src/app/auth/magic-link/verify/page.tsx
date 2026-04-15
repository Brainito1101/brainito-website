"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { consumePendingPostLoginDashboardPath } from "@/lib/post-login-redirect";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [errorMessage, setErrorMessage] = useState("");
    const hasVerified = useRef(false);

    useEffect(() => {
        if (hasVerified.current) return;

        const handleVerification = async () => {
            const token = searchParams.get("token");

            if (!token) {
                setStatus('error');
                setErrorMessage("Invalid magic link. No token provided.");
                return;
            }

            hasVerified.current = true;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/magic-link/verify/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                });

                const data = await response.json();

                if (data.success && data.tokens && data.user) {
                    login(data.user, data.tokens);
                    setStatus('success');

                    // Redirect to dashboard after login
                    setTimeout(() => {
                        const tokenData = encodeURIComponent(JSON.stringify({
                            access: data.tokens.access,
                            refresh: data.tokens.refresh,
                            email: data.user.email,
                            username: data.user.username,
                            profile_picture: data.user.profile_picture || ""
                        }));

                        const pendingWebsite = searchParams.get('pendingWebsite');
                        const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.brainito.com";
                        const postLoginPath = consumePendingPostLoginDashboardPath() || "/dashboard/marketing-health-score";
                        let redirectUrl = `${dashboardUrl}${postLoginPath}?auth=${tokenData}`;

                        if (pendingWebsite) {
                            try {
                                const raw = pendingWebsite.trim();
                                const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
                                const host = u.hostname.replace(/^www\./i, "");
                                if (host) {
                                    redirectUrl += `&pending_domain=${encodeURIComponent(host)}`;
                                }
                            } catch {
                                /* ignore */
                            }
                        }

                        window.location.href = redirectUrl;
                    }, 1500);
                } else {
                    setStatus('error');
                    setErrorMessage(data.message || "Invalid or expired magic link. Please request a new one.");
                }
            } catch (err) {
                setStatus('error');
                setErrorMessage("Connection error. Please try again.");
                hasVerified.current = false;
            }
        };

        handleVerification();
    }, [searchParams, login]);

    return (
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            {status === 'verifying' && (
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-6">
                        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Magic Link</h2>
                    <p className="text-gray-600">Please wait while we sign you in...</p>
                </div>
            )}

            {status === 'success' && (
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                    <p className="text-gray-600 mb-4">You&apos;ve been signed in successfully.</p>
                    <p className="text-sm text-gray-500">Redirecting you now...</p>
                </div>
            )}

            {status === 'error' && (
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
                    <p className="text-gray-600 mb-6">{errorMessage}</p>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push("/")}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                            Go to Home
                        </button>

                        <button
                            onClick={() => {
                                router.push("/?auth=open");
                            }}
                            className="w-full border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300"
                        >
                            Request New Magic Link
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function MagicLinkVerify() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <Suspense fallback={<Loader2 className="animate-spin text-purple-600" size={32} />}>
                <VerifyContent />
            </Suspense>
        </div>
    );
}
