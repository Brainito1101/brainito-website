const dashboardBase = () =>
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DASHBOARD_URL) || "https://app.brainito.com";

/**
 * Opens the dashboard with ?auth= when website localStorage has JWTs, so the dashboard
 * (different origin/port) can hydrate the session via AuthContext.
 */
export function getDashboardEntryUrl(path = "/dashboard"): string {
    const base = dashboardBase();
    const normalized = path.startsWith("/") ? path : `/${path}`;

    if (typeof window === "undefined") {
        return `${base}${normalized}`;
    }

    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    const email = localStorage.getItem("user_email");
    if (!access || !email) {
        return `${base}${normalized}`;
    }

    const tokenData = encodeURIComponent(
        JSON.stringify({
            access,
            refresh: refresh || "",
            email,
            username: localStorage.getItem("username") || "",
            profile_picture: localStorage.getItem("profile_picture") || "",
        }),
    );
    const joiner = normalized.includes("?") ? "&" : "?";
    return `${base}${normalized}${joiner}auth=${tokenData}`;
}
