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
            className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden pt-[120px] pb-10 sm:pt-[130px] md:min-h-screen md:pb-[60px]"
            style={{
                background:
                    "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 20%, #F4EEFF 50%, #FAF5FF 80%, #FFFFFF 100%)",
            }}
        >
            {/* ── Centre content ───────────────────────────────────── */}
            <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center px-4 text-center sm:px-6">
                {/* Heading — fluid type; slightly smaller than peak mobile size */}
                <motion.h1
                    {...fadeUp(0.05)}
                    className="mb-4 text-balance text-[clamp(36px,9.2vw,50px)] font-medium leading-[1.1] tracking-[-0.5px] text-[#101011] [font-family:var(--font-poppins),ui-sans-serif] md:mb-[18px] md:text-[clamp(34px,4.2vw,56px)]"
                >
                    Your Complete{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#71389A] to-[#CB84FF]">
                        DIY Marketing Plan
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    {...fadeUp(0.15)}
                    className="mb-9 max-w-[700px] text-pretty text-[clamp(17px,4.2vw,23px)] font-normal leading-[1.6] text-[#101011] [font-family:var(--font-poppins),ui-sans-serif] md:mb-11 md:text-[clamp(16px,2.2vw,23px)]"
                >
                    A clear, step-by-step strategy that turns market understanding into focused, accountable action.
                </motion.p>

                {/* ── Input + Button — stack full-width on mobile ───── */}
                <motion.div
                    {...fadeUp(0.25)}
                    className="mb-2 flex w-full max-w-[680px] flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center md:justify-center"
                >
                    {/* Website input */}
                    <div className="flex h-14 w-full min-w-0 shrink-0 items-center gap-2.5 rounded-full border-2 border-[#9B72C0] bg-white/92 px-5 shadow-[0_2px_12px_rgba(113,56,154,0.07)] md:w-auto md:max-w-[270px] md:flex-[1_1_180px] md:min-w-[160px]">
                        <Globe size={16} className="shrink-0 text-[#9B72C0]" />
                        <input
                            type="text"
                            placeholder="example.com"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] font-normal text-[#101011] outline-none [font-family:var(--font-poppins),ui-sans-serif] placeholder:text-[#606266]/70"
                        />
                    </div>

                    {/* Email input */}
                    <div className="flex h-14 w-full min-w-0 shrink-0 items-center gap-2.5 rounded-full border-2 border-[#9B72C0] bg-white/92 px-5 shadow-[0_2px_12px_rgba(113,56,154,0.07)] md:w-auto md:max-w-[280px] md:flex-[1_1_180px] md:min-w-[160px]">
                        <Mail size={16} className="shrink-0 text-[#9B72C0]" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="min-w-0 flex-1 border-0 bg-transparent text-[15px] font-normal text-[#101011] outline-none [font-family:var(--font-poppins),ui-sans-serif] placeholder:text-[#606266]/70"
                        />
                    </div>

                    <div className="relative z-[1] w-full shrink-0 md:w-auto">
                        <ActionButton
                            type="button"
                            icon={<ArrowUpRight size={18} />}
                            onClick={handleSubmit}
                            disabled={loading}
                            aria-busy={loading}
                            className="w-full min-w-0 disabled:cursor-wait disabled:opacity-60 md:min-w-[180px] md:w-auto"
                        >
                            {loading ? "Redirecting…" : "Create My Plan"}
                        </ActionButton>
                    </div>

                    {/* Field Errors */}
                    <div className="mt-1 flex w-full flex-col items-center gap-1 md:mt-2">
                        {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        {errors.general && <p className="text-xs text-red-500">{errors.general}</p>}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
