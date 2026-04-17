"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Mail } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { useAnalysis } from "@/hooks/use-analysis";
import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "@/components/sections/auth-modal";
import { getDashboardEntryUrl, MARKETING_HEALTH_SCORE_PATH } from "@/lib/dashboard-entry";

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
            window.location.href = getDashboardEntryUrl(MARKETING_HEALTH_SCORE_PATH);
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <section
            id="hero"
            className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden pt-[140px] pb-4 md:min-h-screen md:pb-[60px]"
            style={{
                /* White at top, purple glow in the middle, white at bottom */
                background:
                    "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 20%, #F4EEFF 50%, #FAF5FF 80%, #FFFFFF 100%)",
            }}
        >
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            {/* ── Left vector (1.svg) ───────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute bottom-[100px] left-[150px] hidden w-[clamp(120px,18vw,280px)] md:block"
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
                className="pointer-events-none absolute bottom-[60px] right-[180px] hidden w-[clamp(140px,20vw,300px)] md:block"
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
            <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center px-4 text-center sm:px-6">
                {/* Heading */}
                <motion.h1
                    {...fadeUp(0.05)}
                    className="mb-[18px] whitespace-normal text-[clamp(42px,6.5vw,75px)] font-medium leading-[1.12] tracking-[-0.5px] text-[#101011] [font-family:var(--font-poppins),ui-sans-serif] md:text-[clamp(32px,5vw,75px)] md:whitespace-nowrap"
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
                    className="mb-9 max-w-[600px] text-[clamp(19px,3.5vw,28px)] font-normal leading-[1.6] text-[#606266] [font-family:var(--font-poppins),ui-sans-serif] md:text-[clamp(16px,2.5vw,28px)]"
                >
                    <span style={{ color: "#101011" }}>Data - driven</span> website insights and audit{" "}
                    <br className="hidden sm:block" />
                    backed by <span style={{ color: "#101011" }}>10+ years</span> of research.
                </motion.p>

                {/* ── Input + Button Row ───────────────────────────── */}
                <motion.div
                    {...fadeUp(0.25)}
                    className="mb-3.5 flex w-full max-w-[700px] flex-col items-stretch gap-3 md:max-w-[700px] md:flex-row md:flex-wrap md:items-center md:justify-center"
                >
                    {/* Website input */}
                    <div className="flex h-14 w-full min-w-0 shrink-0 items-center gap-2.5 rounded-full border-2 border-[#9B72C0] bg-white/92 px-[15px] shadow-[0_2px_12px_rgba(113,56,154,0.07)] md:w-auto md:max-w-[270px] md:flex-[1_1_180px] md:min-w-[160px]">
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
                    <div className="flex h-14 w-full min-w-0 shrink-0 items-center gap-2.5 rounded-full border-2 border-[#9B72C0] bg-white/92 px-[15px] shadow-[0_2px_12px_rgba(113,56,154,0.07)] md:w-auto md:max-w-[320px] md:flex-[1_1_180px] md:min-w-[160px]">
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

                    <div className="relative z-[1] w-full shrink-0 md:w-auto">
                        <ActionButton
                            type="button"
                            onClick={handleSubmit}
                            disabled={analysisLoading}
                            aria-busy={analysisLoading}
                            className="w-full min-w-0 disabled:cursor-wait disabled:opacity-60 md:min-w-[160px] md:w-auto"
                        >
                            {analysisLoading ? "Redirecting…" : "Get Started"}
                        </ActionButton>
                        {errors.general && <p className="text-red-500 text-xs mt-2 text-center absolute top-full left-0 right-0">{errors.general}</p>}

                        {/* Arrow pointing to the right vector */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="pointer-events-none absolute left-[75%] top-[110%] z-[-1] hidden w-[clamp(90px,12vw,70px)] md:block"
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
                    className="mb-10 text-base text-[#606266] [font-family:var(--font-poppins),ui-sans-serif] md:mb-20"
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
                    className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[#c8b8e0] bg-white/70 px-4 py-2 text-center text-[13px] font-normal text-[#101011] [font-family:var(--font-poppins),ui-sans-serif] backdrop-blur-[6px] md:h-[42px] md:max-w-none md:flex-nowrap md:gap-1.5 md:whitespace-nowrap md:px-[22px] md:py-0"
                >
                    Trusted by{" "}
                    <span style={{ color: "#71389A", fontWeight: 600 }}>1700+</span>{" "}
                    startups and global brands
                </motion.div>
            </div>
        </section>
    );
}
