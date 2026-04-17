"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedText, AnimatedIcon } from "@/components/ui/animated-button";
import { Container } from "@/components/ui/section";
import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "@/components/sections/auth-modal";
import { getDashboardEntryUrl, MARKETING_HEALTH_SCORE_PATH } from "@/lib/dashboard-entry";
import { setPendingPostLoginDashboardPath } from "@/lib/post-login-redirect";

const marqueeText = "BRAINITO INC • BRAINITO INC • BRAINITO INC • BRAINITO INC • BRAINITO INC • ";

const CALENDLY_GROWTH_SESSION = "https://calendly.com/brainito/growth-session";

export function CTABannerSection() {
    const { user, loading: authLoading } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleTalkToSales = () => {
        window.open(CALENDLY_GROWTH_SESSION, "_blank", "noopener,noreferrer");
    };

    const handleGetStarted = () => {
        if (authLoading) return;
        if (user) {
            window.location.href = getDashboardEntryUrl(MARKETING_HEALTH_SCORE_PATH);
            return;
        }
        setPendingPostLoginDashboardPath(MARKETING_HEALTH_SCORE_PATH);
        setShowAuthModal(true);
    };

    return (
        <section className="bg-white py-12 md:py-24 px-3 sm:px-4 md:px-8">
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            <Container className="max-w-[1400px] px-3 sm:px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-[2.5rem] bg-gradient-to-b from-[#a45ec9] to-[#8143b2] overflow-hidden py-16 md:py-20 text-center shadow-[0_20px_40px_-15px_rgba(129,67,178,0.5)]"
                >
                    {/* Soft White Bottom Glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[60%] h-[150px] bg-white/75 blur-[90px] pointer-events-none" />
                    {/* Scrolling Marquee */}
                    <div className="absolute top-8 md:top-10 left-0 w-full overflow-hidden flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] select-none pointer-events-none opacity-[0.85]">
                        <div className="animate-marquee-left flex whitespace-nowrap">
                            <span className="text-[100px] md:text-[140px] font-medium text-white leading-none tracking-tight">
                                {marqueeText}
                            </span>
                            <span className="text-[100px] md:text-[140px] font-medium text-white leading-none tracking-tight">
                                {marqueeText}
                            </span>
                        </div>
                    </div>

                    {/* Faint divider below marquee */}
                    <div className="absolute top-[140px] md:top-[190px] left-1/2 -translate-x-1/2 w-[60%] h-px bg-white/[0.2]" />

                    {/* Content */}
                    <div className="relative z-10 mt-30 md:mt-40 px-4 sm:px-6 md:px-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-[26px] md:text-[32px] lg:text-[36px] font-medium text-white leading-tight mb-4 tracking-normal"
                        >
                            Ready to Unlock Your Growth Strategy?
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-white text-[14px] md:text-[15px] max-w-xl mx-auto mb-8 font-normal leading-relaxed"
                        >
                            Join thousands of businesses that have already unlocked <br className="hidden md:block" />
                            their growth potential with Brainito.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:flex-row md:max-w-lg"
                        >
                            <button
                                type="button"
                                onClick={handleGetStarted}
                                disabled={authLoading}
                                className="flex items-center h-[56px] rounded-full pl-4 pr-4 bg-gradient-to-b from-[#8549b0] to-[#ba76ec] border border-[#6b3191] text-white hover:brightness-110 transition-all shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] group disabled:opacity-60 disabled:pointer-events-none"
                            >
                                <AnimatedText className="font-normal text-[16px] flex items-center mr-4">
                                    Get Started <span className="text-[10px] opacity-90 mx-2">•</span> it&apos;s free
                                </AnimatedText>
                                <AnimatedIcon icon={<ArrowRight size={18} strokeWidth={1.5} />} />
                            </button>

                            <button
                                type="button"
                                onClick={handleTalkToSales}
                                className="h-[56px] rounded-full px-14 bg-white text-[#101011] font-normal border border-[#6b3191] hover:bg-gray-50 transition-all text-[16px] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.2)] group"
                            >
                                <AnimatedText>Talk to sales</AnimatedText>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
