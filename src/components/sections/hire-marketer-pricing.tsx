"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";
import { AnimatedText, AnimatedIcon } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const leftFeatures = [
    "Full-time marketing manager (40+ hours/week)",
    "Office infrastructure (Laptop, High-speed internet, Workspace)",
    "Tea, coffee, lunch, and dinner provided",
    "Strategy planning and expert oversight",
    "Access to premium marketing and analytics tools",
    "Continuous monitoring and optimization",
    "Daily execution updates",
    "Weekly performance reviews",
    "Monthly strategy and performance reports",
];

const rightFeatures = [
    "Custom team setup based on your goals",
    "Combination of manager + channel specialists",
    "Pricing based on scope and execution intensity",
    "Dedicated account management",
    "Cross-functional expertise",
];

export function HireMarketerPricingSection() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section id="pricing-marketer" className="py-24 bg-white relative">
            <Container className="max-w-[1100px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    <h2
                        className="font-medium leading-tight mb-4"
                        style={{
                            fontFamily: "var(--font-poppins), ui-sans-serif",
                            fontSize: "clamp(40px, 5vw, 60px)",
                            color: "#71389A",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Pricing
                    </h2>
                    <p
                        className="text-[#606266]"
                        style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "18px" }}
                    >
                        A single monthly price with a friction-free working structure.
                    </p>
                </motion.div>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-14">
                    <span
                        className={cn("text-[14px]", !isYearly ? "text-[#101011] font-medium" : "text-[#606266]")}
                        style={{ fontFamily: "var(--font-poppins), ui-sans-serif" }}
                    >
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="w-12 h-6 bg-[#f2e6ff] rounded-full flex items-center p-1 relative transition-colors duration-300 focus:outline-none"
                        aria-label="Toggle annual billing"
                    >
                        <motion.div
                            layout
                            className="w-4 h-4 bg-[#71389A] rounded-full absolute"
                            animate={{ left: isYearly ? "26px" : "4px" }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span
                        className={cn("text-[14px]", isYearly ? "text-[#101011]" : "text-[#606266]")}
                        style={{ fontFamily: "var(--font-poppins), ui-sans-serif" }}
                    >
                        yearly <span className="text-[#71389A] ml-1">30%off</span>
                    </span>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">

                    {/* Left Card — Dedicated Marketing Manager */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="bg-[#FAF5FF] rounded-[2.5rem] p-3 flex flex-col"
                    >
                        {/* Top white box */}
                        <div className="bg-white rounded-[2rem] p-7 lg:p-9 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
                            <h3
                                className="font-medium mb-4"
                                style={{
                                    fontFamily: "var(--font-poppins), ui-sans-serif",
                                    fontSize: "22px",
                                    color: "#101011",
                                }}
                            >
                                Dedicated Marketing Manager
                            </h3>

                            <div className="flex items-baseline gap-1.5 mb-6">
                                <span
                                    className="font-medium leading-none"
                                    style={{
                                        fontFamily: "var(--font-poppins), ui-sans-serif",
                                        fontSize: "44px",
                                        color: "#101011",
                                        letterSpacing: "-2px",
                                    }}
                                >
                                    ${isYearly ? "2,099" : "2,999"}
                                </span>
                                <span
                                    className="text-[#606266]"
                                    style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "15px" }}
                                >
                                    /month
                                </span>
                            </div>

                            <button
                                className="group w-full h-[48px] rounded-full transition-all transform hover:scale-[1.02] inline-flex items-center justify-center gap-3 overflow-hidden"
                                style={{
                                    background: "linear-gradient(to top right, #B265E6 0%, #71389A 100%)",
                                    border: "1px solid #7A3FAD",
                                    color: "#ffffff",
                                    boxShadow: "0 4px 14px rgba(113, 56, 154, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                                    fontFamily: "var(--font-poppins), ui-sans-serif",
                                }}
                            >
                                <AnimatedText style={{ fontFamily: "var(--font-poppins)", fontSize: "15px", fontWeight: 400 }}>
                                    Get Started
                                </AnimatedText>
                                <AnimatedIcon iconColor="#8E4DBB" icon={<ArrowUpRight size={15} strokeWidth={2} />} />
                            </button>
                        </div>

                        {/* Bottom features */}
                        <div className="p-7 lg:px-9 lg:py-7 flex-1">
                            <p
                                className="text-[#606266] mb-4"
                                style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "13px" }}
                            >
                                Included features:
                            </p>
                            <ul className="space-y-3">
                                {leftFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#101011] flex-shrink-0 mt-[6px]" />
                                        <span
                                            className="text-[#101011]"
                                            style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "14px" }}
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right Card — Hire a Marketing Team */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-[#FAF5FF] rounded-[2.5rem] p-3 flex flex-col"
                    >
                        {/* Top white box */}
                        <div className="bg-white rounded-[2rem] p-7 lg:p-9 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
                            <h3
                                className="font-medium mb-1"
                                style={{
                                    fontFamily: "var(--font-poppins), ui-sans-serif",
                                    fontSize: "22px",
                                    color: "#101011",
                                }}
                            >
                                Hire a Marketing Team
                            </h3>
                            <p
                                className="text-[#606266] mb-4"
                                style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "14px" }}
                            >
                                For businesses requiring multiple specialists
                            </p>

                            <div className="flex items-baseline gap-1.5 mb-6">
                                <span
                                    className="font-medium leading-none"
                                    style={{
                                        fontFamily: "var(--font-poppins), ui-sans-serif",
                                        fontSize: "44px",
                                        color: "#71389A",
                                        letterSpacing: "-2px",
                                    }}
                                >
                                    Custom
                                </span>
                                <span
                                    className="text-[#606266]"
                                    style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "14px" }}
                                >
                                    / based on scope
                                </span>
                            </div>

                            <button
                                className="group w-full h-[48px] rounded-full transition-all transform hover:scale-[1.02] inline-flex items-center justify-center gap-3 overflow-hidden"
                                style={{
                                    background: "transparent",
                                    border: "1.5px solid #71389A",
                                    color: "#71389A",
                                    fontFamily: "var(--font-poppins), ui-sans-serif",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "#FAF5FF"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                            >
                                <AnimatedText style={{ fontFamily: "var(--font-poppins)", fontSize: "15px", fontWeight: 400, color: "#71389A" }}>
                                    Talk to Sales
                                </AnimatedText>
                                <AnimatedIcon iconColor="#71389A" icon={<ArrowUpRight size={15} strokeWidth={2} />} />
                            </button>
                        </div>

                        {/* Bottom features */}
                        <div className="p-7 lg:px-9 lg:py-7 flex-1">
                            <p
                                className="text-[#606266] mb-4"
                                style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "13px" }}
                            >
                                Included features:
                            </p>
                            <ul className="space-y-3">
                                {rightFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#101011] flex-shrink-0 mt-[6px]" />
                                        <span
                                            className="text-[#101011]"
                                            style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "14px" }}
                                        >
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
