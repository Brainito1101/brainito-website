"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
    email: string;
    username: string;
    profile_picture?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User, tokens: { access: string; refresh: string }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.brainito.com";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // BROADCAST CHANNEL: Listen for cross-origin logout signals
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const logoutChannel = new BroadcastChannel('brainito_logout');

        logoutChannel.onmessage = (event) => {
            if (event.data === 'FORCE_LOGOUT') {
                console.log('[Website] Received FORCE_LOGOUT from broadcast channel');
                localStorage.clear();
                sessionStorage.clear();
                setUser(null);
                window.location.href = '/?logout=true';
            }
        };

        return () => logoutChannel.close();
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            if (typeof window === 'undefined') return;

            console.log('[WEBSITE AUTH] ========== AUTH INITIALIZATION STARTING ==========');

            const path = window.location.pathname;
            if (path.startsWith('/logout-sync') || path.startsWith('/auth/logout')) {
                console.log('[WEBSITE AUTH] On logout-sync page - skipping auth initialization');
                setLoading(false);
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const hasForceLogout = urlParams.get('force_logout');
            const logoutParam = urlParams.get('logout');

            if (hasForceLogout === 'true') {
                console.log('[WEBSITE AUTH] force_logout detected — skipping auth init');
                setUser(null);
                setLoading(false);
                return;
            }

            if (logoutParam === 'true') {
                console.log('[WEBSITE AUTH] Logout query detected — clearing storage');
                localStorage.clear();
                sessionStorage.clear();
                setUser(null);
                urlParams.delete('logout');
                const newUrl =
                    window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
                window.history.replaceState({}, '', newUrl);
                setLoading(false);
                return;
            }

            // CHECK FOR AUTH PARAMETER (SSO from Dashboard)
            const authParam = urlParams.get('auth');
            if (authParam) {
                try {
                    console.log('[Website AuthContext] Auth parameter detected, attempting hydration');
                    const authData = JSON.parse(decodeURIComponent(authParam));

                    if (authData.access && authData.email) {
                        localStorage.setItem("access_token", authData.access);
                        if (authData.refresh) localStorage.setItem("refresh_token", authData.refresh);
                        localStorage.setItem("user_email", authData.email);
                        if (authData.username) localStorage.setItem("username", authData.username);
                        if (authData.profile_picture) localStorage.setItem("profile_picture", authData.profile_picture);

                        // Clean up URL
                        urlParams.delete('auth');
                        const newUrl = window.location.pathname +
                            (urlParams.toString() ? '?' + urlParams.toString() : '');
                        window.history.replaceState({}, '', newUrl);

                        setUser({
                            email: authData.email,
                            username: authData.username || "",
                            profile_picture: authData.profile_picture || ""
                        });
                        setLoading(false);
                        return;
                    }
                } catch (error) {
                    console.error("Error parsing auth parameter:", error);
                }
            }

            // Normal auth initialization flow
            const access = localStorage.getItem("access_token");
            const refresh = localStorage.getItem("refresh_token");
            const email = localStorage.getItem("user_email");
            const username = localStorage.getItem("username");
            const profile_picture = localStorage.getItem("profile_picture");

            if (!access || !email) {
                setLoading(false);
                return;
            }

            try {
                const verifyRes = await fetch(`${API_BASE_URL}/auth/verify-token/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: access })
                });

                if (verifyRes.ok) {
                    setUser({ email, username: username || "", profile_picture: profile_picture || "" });
                } else if (refresh) {
                    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh/`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh: refresh })
                    });

                    const refreshData = await refreshRes.json();

                    if (refreshRes.ok && refreshData.success && refreshData.access) {
                        localStorage.setItem("access_token", refreshData.access);
                        setUser({ email, username: username || "", profile_picture: profile_picture || "" });
                    } else {
                        localStorage.clear();
                        setUser(null);
                    }
                } else {
                    localStorage.clear();
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                const currentAccess = localStorage.getItem("access_token");
                const currentEmail = localStorage.getItem("user_email");

                if (currentAccess && currentEmail) {
                    const currentUsername = localStorage.getItem("username");
                    const currentProfilePicture = localStorage.getItem("profile_picture");
                    setUser({
                        email: currentEmail,
                        username: currentUsername || "",
                        profile_picture: currentProfilePicture || ""
                    });
                } else {
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = (user: User, tokens: { access: string; refresh: string }) => {
        localStorage.setItem("access_token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        localStorage.setItem("user_email", user.email);
        localStorage.setItem("username", user.username);
        if (user.profile_picture) localStorage.setItem("profile_picture", user.profile_picture);

        setUser(user);

        // Seed the dashboard's localStorage via hidden iframe so both apps share the same session
        try {
            const authPayload = encodeURIComponent(JSON.stringify({
                access: tokens.access,
                refresh: tokens.refresh,
                email: user.email,
                username: user.username,
                profile_picture: user.profile_picture || "",
            }));
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'display:none;width:0;height:0;border:0;position:absolute;';
            iframe.src = `${DASHBOARD_URL}/?auth=${authPayload}`;
            document.body.appendChild(iframe);
            setTimeout(() => {
                if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
            }, 5000);
        } catch (_e) {
            // Non-critical — dashboard will pick up tokens on next navigation
        }
    };

    const logout = async () => {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (accessToken) {
            try {
                await fetch(`${API_BASE_URL}/auth/logout/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ refresh: refreshToken })
                });
            } catch (error) {
                console.error('[Website] Backend logout failed:', error);
            }
        }

        localStorage.clear();
        sessionStorage.clear();
        setUser(null);

        window.location.href = `${DASHBOARD_URL}/logout-sync?source=website`;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
