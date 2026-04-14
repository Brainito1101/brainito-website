"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LogoutSyncInner() {
    const searchParams = useSearchParams();

    useEffect(() => {
        console.log("[Website LogoutSync] Page loaded - clearing all auth data");

        localStorage.clear();
        sessionStorage.clear();
        console.log("[Website LogoutSync] Website storage cleared");

        const source = searchParams.get("source");

        if (source === "dashboard") {
            console.log("[Website LogoutSync] Redirecting to homepage (initiated by dashboard)");
            window.location.href = "/";
        } else {
            console.log("[Website LogoutSync] Redirecting to homepage with logout flag");
            window.location.href = "/?logout=true";
        }
    }, [searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Logging out...</h2>
                <p className="text-gray-500">Please wait while we secure your session.</p>
            </div>
        </div>
    );
}

export function LogoutSyncContent() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600">
                    Loading...
                </div>
            }
        >
            <LogoutSyncInner />
        </Suspense>
    );
}
