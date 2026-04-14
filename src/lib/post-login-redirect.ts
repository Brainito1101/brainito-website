const STORAGE_KEY = "brainito_post_login_dashboard";

type Stored = { path: string; exp: number };

/** Remember a dashboard path to use after OAuth or magic-link login (TTL 30m). */
export function setPendingPostLoginDashboardPath(path: string) {
    if (typeof window === "undefined") return;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const payload: Stored = { path: normalized, exp: Date.now() + 30 * 60 * 1000 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

/** Returns a pending path if valid, then clears storage. */
export function consumePendingPostLoginDashboardPath(): string | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Stored;
        localStorage.removeItem(STORAGE_KEY);
        if (!parsed.path || typeof parsed.exp !== "number" || Date.now() > parsed.exp) return null;
        return parsed.path.startsWith("/") ? parsed.path : null;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}
