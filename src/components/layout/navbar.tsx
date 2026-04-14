"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedText } from "@/components/ui/animated-button";
import { AuthModal } from "@/components/sections/auth-modal";
import { useAuth } from "@/contexts/auth-context";
import { getDashboardEntryUrl } from "@/lib/dashboard-entry";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { user, loading, logout } = useAuth();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("auth") === "open") {
            setShowAuthModal(true);
            params.delete("auth");
            const next = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
            window.history.replaceState({}, "", next);
        }
    }, []);

    const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.brainito.com';

    const goToDashboard = () => {
        window.location.href = getDashboardEntryUrl("/dashboard");
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-[0_1px_12px_rgba(113,56,154,0.08)]"
                    : "bg-transparent"
            )}
        >
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
                <nav className="flex items-center justify-between h-16 md:h-[72px]">

                    {/* ── Logo ─────────────────────────────────────────── */}
                    <Link href="/" className="flex items-center select-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/brainito.png"
                            alt="Brainito"
                            className="h-[26px] w-auto md:h-[30px]"
                        />
                    </Link>

                    {/* ── Desktop Buttons ───────────────────────────────── */}
                    <div className="hidden md:flex items-center gap-3">
                        {loading ? (
                            <span
                                className="text-sm text-[#9B72C0] px-4"
                                style={{ fontFamily: "var(--font-poppins), ui-sans-serif" }}
                            >
                                …
                            </span>
                        ) : !user ? (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="group"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "38px",
                                    paddingLeft: "24px",
                                    paddingRight: "24px",
                                    borderRadius: "9999px",
                                    border: "2px solid #71389A",
                                    background: "transparent",
                                    color: "#606266",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    fontFamily: "var(--font-poppins), ui-sans-serif",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#FAF5FF";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                <AnimatedText>Login</AnimatedText>
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={goToDashboard}
                                    className="group"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        height: "38px",
                                        paddingLeft: "20px",
                                        paddingRight: "20px",
                                        borderRadius: "9999px",
                                        border: "2px solid #71389A",
                                        background: "#FAF5FF",
                                        color: "#71389A",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                        fontFamily: "var(--font-poppins), ui-sans-serif",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        whiteSpace: "nowrap",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#F4EEFF";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "#FAF5FF";
                                    }}
                                >
                                    <LayoutDashboard size={18} />
                                    <AnimatedText>Go to Dashboard</AnimatedText>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => logout()}
                                    className="text-sm text-[#606266] hover:text-[#71389A] px-2 py-1 underline-offset-2 hover:underline"
                                    style={{ fontFamily: "var(--font-poppins), ui-sans-serif" }}
                                >
                                    Log out
                                </button>
                            </div>
                        )}

                        {/* Hire Marketer — gradient purple pill with glassy sheen */}
                        <Link
                            href="/hire-marketer"
                            className="group"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "38px",
                                paddingLeft: "24px",
                                paddingRight: "24px",
                                borderRadius: "9999px",
                                border: "2px solid #71389A",
                                background: "linear-gradient(to top right, #B265E6 0%, #71389A 100%)",
                                color: "#ffffff",
                                fontSize: "14px",
                                fontWeight: 300,
                                fontFamily: "var(--font-poppins), ui-sans-serif",
                                textDecoration: "none",
                                boxShadow: "0 4px 14px rgba(113, 56, 154, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                                position: "relative",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 6px 22px rgba(113, 56, 154, 0.50), inset 0 1px 0 rgba(255,255,255,0.22)";
                                e.currentTarget.style.transform = "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 4px 16px rgba(113, 56, 154, 0.38), inset 0 1px 0 rgba(255,255,255,0.22)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <AnimatedText>Hire Marketer</AnimatedText>
                        </Link>
                    </div>

                    {/* ── Mobile Toggle ─────────────────────────────────── */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex size-11 items-center justify-center rounded-xl text-[#606266] hover:text-[#71389A] hover:bg-[#FAF5FF] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} strokeWidth={2.25} /> : <Menu size={24} strokeWidth={2.25} />}
                    </button>
                </nav>
            </div>

            {/* ── Mobile Menu ──────────────────────────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-white border-t border-[#e9e0f5] shadow-lg"
                    >
                        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
                            {loading ? (
                                <div className="px-4 py-3 text-center text-sm text-[#9B72C0]">…</div>
                            ) : (
                                <>
                                    {user && (
                                        <div className="px-4 py-3 bg-[#FAF5FF] rounded-2xl mb-2">
                                            <p className="text-xs text-[#71389A] font-semibold uppercase tracking-wider mb-1">Signed in as</p>
                                            <p className="text-[#101011] font-medium truncate">{user.email}</p>
                                        </div>
                                    )}

                                    {!user ? (
                                        <button
                                            onClick={() => {
                                                setMobileOpen(false);
                                                setShowAuthModal(true);
                                            }}
                                            className="group"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: "40px",
                                                borderRadius: "9999px",
                                                border: "2px solid #71389A",
                                                background: "transparent",
                                                color: "#606266",
                                                fontSize: "14px",
                                                fontWeight: 500,
                                                fontFamily: "var(--font-poppins), ui-sans-serif",
                                                textDecoration: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <AnimatedText>Login</AnimatedText>
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setMobileOpen(false);
                                                    goToDashboard();
                                                }}
                                                className="flex items-center justify-center gap-2 h-10 rounded-full border-2 border-[#71389A] bg-[#FAF5FF] text-[#71389A] font-medium"
                                            >
                                                <LayoutDashboard size={16} />
                                                Go to Dashboard
                                            </button>
                                            <a
                                                href={`${DASHBOARD_URL}/dashboard/settings`}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center justify-center gap-2 h-10 rounded-full border-2 border-[#e9e0f5] text-[#606266] font-medium"
                                            >
                                                <Settings size={16} />
                                                Edit profile
                                            </a>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setMobileOpen(false);
                                                }}
                                                className="flex items-center justify-center gap-2 h-10 rounded-full border-2 border-red-200 text-red-500 font-medium"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                            
                            <Link
                                href="/hire-marketer"
                                className="group"
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "40px",
                                    borderRadius: "9999px",
                                    background: "linear-gradient(to top right, #B265E6 0%, #71389A 100%)",
                                    color: "#ffffff",
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    fontFamily: "var(--font-poppins), ui-sans-serif",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 14px rgba(113, 56, 154, 0.3)",
                                }}
                            >
                                <AnimatedText>Hire Marketer</AnimatedText>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </header>
    );
}
