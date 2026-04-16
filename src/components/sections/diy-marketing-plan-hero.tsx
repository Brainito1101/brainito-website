"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

export function DIYMarketingPlanHeroSection() {
    const scrollToPricing = () => {
        document.getElementById("pricing")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
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
            <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center px-4 text-center sm:px-6">
                <motion.h1
                    {...fadeUp(0.05)}
                    className="mb-4 text-balance text-[clamp(36px,9.2vw,50px)] font-medium leading-[1.1] tracking-[-0.5px] text-[#101011] [font-family:var(--font-poppins),ui-sans-serif] md:mb-[18px] md:text-[clamp(34px,4.2vw,56px)]"
                >
                    Your Complete{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#71389A] to-[#CB84FF]">
                        DIY Marketing Plan
                    </span>
                </motion.h1>

                <motion.p
                    {...fadeUp(0.15)}
                    className="mb-9 max-w-[700px] text-pretty text-[clamp(17px,4.2vw,23px)] font-normal leading-[1.6] text-[#101011] [font-family:var(--font-poppins),ui-sans-serif] md:mb-11 md:text-[clamp(16px,2.2vw,23px)]"
                >
                    A clear, step-by-step strategy that turns market understanding into focused, accountable action.
                </motion.p>

                <motion.div
                    {...fadeUp(0.25)}
                    className="flex w-full flex-col items-center justify-center"
                >
                    <ActionButton
                        type="button"
                        icon={<ArrowUpRight size={18} />}
                        onClick={scrollToPricing}
                        className="min-w-[200px]"
                    >
                        Get Started
                    </ActionButton>
                </motion.div>
            </div>
        </section>
    );
}
