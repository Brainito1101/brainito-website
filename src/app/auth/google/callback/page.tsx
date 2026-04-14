"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();
    const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
    const [errorMessage, setErrorMessage] = useState("");
    const hasProcessed = useRef(false);

    useEffect(() => {
        if (hasProcessed.current) return;

        const handleCallback = async () => {
            const code = searchParams.get("code");
            if (!code) {
                const hasAnyParams = searchParams.toString().length > 0;
                if (hasAnyParams) {
                    setStatus('error');
                    setErrorMessage("Missing authorization code from Google.");
                }
                return;
            }

            hasProcessed.current = true;

            try {
                const redirectUri =
                    typeof window !== "undefined"
                        ? `${window.location.origin}/auth/google/callback`
                        : "";
                const res = await fetch(
                    `${API_BASE_URL}/auth/google/callback/?code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(redirectUri)}`
                );
                const data = await res.json();

                if (data.success && data.tokens && data.user) {
                    // Use AuthContext to handle login
                    login(data.user, data.tokens);
                    setStatus('success');

                    // Redirect to dashboard immediately after login
                    setTimeout(() => {
                        const tokenData = encodeURIComponent(JSON.stringify({
                            access: data.tokens.access,
                            refresh: data.tokens.refresh,
                            email: data.user.email,
                            username: data.user.username,
                            profile_picture: data.user.profile_picture || ""
                        }));

                        const pendingWebsite = typeof window !== 'undefined' ? sessionStorage.getItem('pendingWebsite') : null;
                        const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.brainito.com";
                        let redirectUrl = `${dashboardUrl}/dashboard?auth=${tokenData}`;

                        if (pendingWebsite) {
                            redirectUrl += `&pendingWebsite=${encodeURIComponent(pendingWebsite)}`;
                            sessionStorage.removeItem('pendingWebsite');
                            sessionStorage.removeItem('pendingEmail');
                        }

                        window.location.href = redirectUrl;
                    }, 1000);
                } else {
                    setStatus('error');
                    setErrorMessage(data.error || data.message || "Google login failed. Please try again.");
                }
            } catch (err) {
                setStatus('error');
                setErrorMessage("Connection error. Please try again.");
            }
        };

        handleCallback();
    }, [searchParams, login]);

    return (
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
            {status === 'processing' && (
                <>
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Completing Google Sign In</h2>
                    <p className="text-gray-600">Please wait...</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
                    <p className="text-gray-600 mb-4">You&apos;ve been signed in successfully.</p>
                    <p className="text-sm text-gray-500">Redirecting you now...</p>
                </>
            )}

            {status === 'error' && (
                <>
                    <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Failed</h2>
                    <p className="text-gray-600 mb-6">{errorMessage}</p>
                    <button
                        onClick={() => router.push("/")}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                    >
                        Go to Home
                    </button>
                </>
            )}
        </div>
    );
}

export default function GoogleCallback() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
            <Suspense fallback={<Loader2 className="animate-spin text-purple-600" size={32} />}>
                <CallbackContent />
            </Suspense>
        </div>
    );
}
