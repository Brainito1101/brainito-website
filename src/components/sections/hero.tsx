"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Mail } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { useAnalysis } from "@/hooks/use-analysis";
import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "@/components/sections/auth-modal";
import { getDashboardEntryUrl } from "@/lib/dashboard-entry";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

export function HeroSection() {
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const { runAnalysis, loading: analysisLoading, errors } = useAnalysis();
    const { user, loading: authLoading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        runAnalysis(website, email, "From Homepage Hero");
    };

    const handleLoginClick = () => {
        if (authLoading) return;
        if (user) {
            window.location.href = getDashboardEntryUrl("/dashboard");
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <section
            id="hero"
            style={{
                /* White at top, purple glow in the middle, white at bottom */
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 20%, #F4EEFF 50%, #FAF5FF 80%, #FFFFFF 100%)",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                paddingTop: "80px",
                paddingBottom: "60px",
            }}
        >
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            {/* ── Left vector (1.svg) ───────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "absolute",
                    left: "150px",
                    bottom: "100px",
                    width: "clamp(120px, 18vw, 280px)",
                    pointerEvents: "none",
                }}
            >
                <Image
                    src="/vectors/1.svg"
                    alt=""
                    width={280}
                    height={340}
                    style={{ width: "100%", height: "auto" }}
                    priority
                />
            </motion.div>

            {/* ── Right vector (8.svg) ─────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    position: "absolute",
                    right: "180px",
                    bottom: "60px",
                    width: "clamp(140px, 20vw, 300px)",
                    pointerEvents: "none",
                }}
            >
                <Image
                    src="/vectors/8.svg"
                    alt=""
                    width={320}
                    height={300}
                    style={{ width: "100%", height: "auto" }}
                />
            </motion.div>

            {/* ── Centre content ───────────────────────────────────── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "1000px",
                    padding: "0 24px",
                }}
            >
                {/* Heading */}
                <motion.h1
                    {...fadeUp(0.05)}
                    style={{
                        fontFamily: "var(--font-poppins), ui-sans-serif",
                        fontSize: "clamp(32px, 5vw, 75px)",
                        fontWeight: 500,
                        lineHeight: 1.12,
                        color: "#101011",
                        marginBottom: "18px",
                        letterSpacing: "-0.5px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <span
                        className="bg-clip-text text-transparent bg-gradient-to-r from-[#71389A] to-[#CB84FF]"
                    >
                        Free
                    </span>{" "}
                    Marketing Audit Report
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    {...fadeUp(0.15)}
                    style={{
                        fontFamily: "var(--font-poppins), ui-sans-serif",
                        fontSize: "clamp(16px, 2.5vw, 28px)",
                        fontWeight: 400,
                        color: "#606266",
                        lineHeight: 1.6,
                        marginBottom: "36px",
                        maxWidth: "600px",
                    }}
                >
                    <span style={{ color: "#101011" }}>Data - driven</span> website insights and audit{" "}
                    <br className="hidden sm:block" />
                    backed by <span style={{ color: "#101011" }}>10+ years</span> of research.
                </motion.p>

                {/* ── Input + Button Row ───────────────────────────── */}
                <motion.div
                    {...fadeUp(0.25)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                        maxWidth: "700px",
                        marginBottom: "14px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {/* Website input */}
                    <div
                        style={{
                            flex: "1 1 180px",
                            minWidth: "160px",
                            maxWidth: "270px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            height: "56px",
                            borderRadius: "9999px",
                            border: "2px solid #9B72C0",
                            background: "rgba(255,255,255,0.92)",
                            padding: "0 15px",
                            boxShadow: "0 2px 12px rgba(113,56,154,0.07)",
                        }}
                    >
                        <Globe
                            size={16}
                            style={{ color: "#9B72C0", flexShrink: 0 }}
                        />
                        <input
                            type="text"
                            placeholder="example.com"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontFamily: "var(--font-poppins), ui-sans-serif",
                                fontSize: "13px",
                                color: "#101011",
                                fontWeight: 400,
                            }}
                        />
                    </div>

                    {/* Email input */}
                    <div
                        style={{
                            flex: "1 1 180px",
                            minWidth: "160px",
                            maxWidth: "320px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            height: "56px",
                            borderRadius: "9999px",
                            border: "2px solid #9B72C0",
                            background: "rgba(255,255,255,0.92)",
                            padding: "0 15px",
                            boxShadow: "0 2px 12px rgba(113,56,154,0.07)",
                        }}
                    >
                        <Mail
                            size={16}
                            style={{ color: "#9B72C0", flexShrink: 0 }}
                        />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                flex: 1,
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                fontFamily: "var(--font-poppins), ui-sans-serif",
                                fontSize: "13px",
                                color: "#101011",
                                fontWeight: 400,
                            }}
                        />
                    </div>

                    <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                        <ActionButton
                            type="button"
                            onClick={handleSubmit}
                            disabled={analysisLoading}
                            aria-busy={analysisLoading}
                            className="min-w-[160px] sm:min-w-[160px] disabled:opacity-60 disabled:cursor-wait"
                        >
                            {analysisLoading ? "Redirecting…" : "Get Started"}
                        </ActionButton>
                        {errors.general && <p className="text-red-500 text-xs mt-2 text-center absolute top-full left-0 right-0">{errors.general}</p>}

                        {/* Arrow pointing to the right vector */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                position: "absolute",
                                top: "110%",
                                left: "75%",
                                width: "clamp(90px, 12vw, 70px)",
                                pointerEvents: "none",
                                zIndex: -1,
                            }}
                        >
                            <Image
                                src="/vectors/10.svg"
                                alt=""
                                width={109}
                                height={78}
                                style={{ width: "100%", height: "auto" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Login hint */}
                <motion.p
                    {...fadeUp(0.35)}
                    style={{
                        fontFamily: "var(--font-poppins), ui-sans-serif",
                        fontSize: "16px",
                        color: "#606266",
                        marginBottom: "80px",
                    }}
                >
                    <button
                        type="button"
                        onClick={handleLoginClick}
                        disabled={authLoading}
                        style={{
                            color: "#71389A",
                            fontWeight: 500,
                            textDecoration: "none",
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: authLoading ? "wait" : "pointer",
                            font: "inherit",
                            opacity: authLoading ? 0.6 : 1,
                        }}
                    >
                        {user ? "Go to Dashboard" : "Login"}
                    </button>{" "}
                    {user ? "— you're signed in." : "if account already exists"}
                </motion.p>

                {/* Trusted badge */}
                <motion.div
                    {...fadeUp(0.45)}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        height: "42px",
                        paddingLeft: "22px",
                        paddingRight: "22px",
                        borderRadius: "9999px",
                        border: "1.5px solid #c8b8e0",
                        background: "rgba(255,255,255,0.70)",
                        backdropFilter: "blur(6px)",
                        fontFamily: "var(--font-poppins), ui-sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#101011",
                        whiteSpace: "nowrap",
                    }}
                >
                    Trusted by{" "}
                    <span style={{ color: "#71389A", fontWeight: 600 }}>1700+</span>{" "}
                    startups and global brands
                </motion.div>
            </div>
        </section>
    );
}
