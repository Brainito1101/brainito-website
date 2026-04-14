"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Globe, Mail, ArrowUpRight } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { useAnalysis } from "@/hooks/use-analysis";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

export function DIYMarketingPlanHeroSection() {
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const { runAnalysis, loading, errors } = useAnalysis();

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        runAnalysis(website, email, "From DIY Marketing Plan Page");
    };

    return (
        <section
            id="hero"
            style={{
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
                        fontSize: "clamp(32px, 4.5vw, 60px)",
                        fontWeight: 500,
                        lineHeight: 1.12,
                        color: "#101011",
                        marginBottom: "18px",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Your Complete <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#71389A] to-[#CB84FF]">DIY Marketing Plan</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    {...fadeUp(0.15)}
                    style={{
                        fontFamily: "var(--font-poppins), ui-sans-serif",
                        fontSize: "clamp(16px, 2.2vw, 23px)",
                        fontWeight: 400,
                        color: "#101011",
                        lineHeight: 1.6,
                        marginBottom: "46px",
                        maxWidth: "700px",
                    }}
                >
                    A clear, step-by-step strategy that turns market understanding into focused, accountable action.
                </motion.p>

                {/* ── Input + Button Row ───────────────────────────── */}
                <motion.div
                    {...fadeUp(0.25)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                        maxWidth: "680px",
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
                            maxWidth: "240px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            height: "56px",
                            borderRadius: "9999px",
                            border: "2px solid #9B72C0",
                            background: "rgba(255,255,255,0.92)",
                            padding: "0 20px",
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
                                fontSize: "15px",
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
                            maxWidth: "245px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            height: "56px",
                            borderRadius: "9999px",
                            border: "2px solid #9B72C0",
                            background: "rgba(255,255,255,0.92)",
                            padding: "0 20px",
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
                                fontSize: "15px",
                                color: "#101011",
                                fontWeight: 400,
                            }}
                        />
                    </div>

                    {/* Get Started button */}
                    <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                        <ActionButton
                            type="button"
                            icon={<ArrowUpRight size={18} />}
                            onClick={handleSubmit}
                            disabled={loading}
                            aria-busy={loading}
                            className="disabled:opacity-60 disabled:cursor-wait"
                        >
                            {loading ? "Redirecting…" : "Create My Plan"}
                        </ActionButton>
                    </div>

                    {/* Field Errors */}
                    <div className="w-full flex flex-col items-center gap-1 mt-2">
                        {errors.website && <p className="text-red-500 text-xs">{errors.website}</p>}
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        {errors.general && <p className="text-red-500 text-xs">{errors.general}</p>}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
