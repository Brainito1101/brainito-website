"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";
import { AnimatedText } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";

const plans = [
    {
        id: "free",
        name: "Free AI Plan",
        price: "0",
        period: "month",
        description: "Perfect for\nexploring Brainito",
        features: [
            "1 Free AI Marketing Report",
            "Basic strategy insights",
            "AI-powered recommendations",
            "Limited access to features",
        ],
        cta: "Start Free",
        highlighted: false,
        isPurpleButton: false,
    },
    {
        id: "diy",
        name: "DIY Marketing Plan",
        price: "89",
        period: "month",
        description: "For teams ready\nto execute",
        features: [
            "1 AI Marketing Report",
            "Full marketing strategy",
            "Competitor analysis",
            "Budget ROI analysis",
            "Execution roadmap",
            "30-day action plan",
        ],
        cta: "Subscribe",
        highlighted: false,
        isPurpleButton: true,
    },
    {
        id: "marketer",
        name: "Hire a Marketer",
        price: "2,666",
        period: "month",
        description: "Done-for-you\nmarketing",
        features: [
            "Full marketing team",
            "Multiple specialists",
            "Custom strategy & execution",
            "Dedicated account manager",
            "Priority support",
            "Custom integrations",
        ],
        cta: "Subscribe",
        highlighted: false,
        isPurpleTitle: true,
        isPurpleButton: true,
    },
    {
        id: "team",
        name: "Hire a Team",
        price: null,
        period: null,
        description: "Enterprise\nmarketing team",
        features: [
            "Full marketing team",
            "Multiple specialists",
            "Custom strategy & execution",
            "Dedicated account manager",
            "Priority support",
            "Custom integrations",
        ],
        cta: "Contact",
        highlighted: false,
        isPurpleButton: false,
    },
];

export function PricingPageSection() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section className="py-24 bg-white relative min-h-screen">
            <Container className="max-w-[1400px]">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm mb-6">
                        <span className="text-[14px] text-[#101011] font-medium">Pricing Plan</span>
                    </div>
                    <h2 className="text-[44px] md:text-[56px] font-medium text-[#101011] leading-tight mb-4 tracking-tight">
                        <span className="text-[#71389A]">Simple Pricing.</span> Powerful Results.
                    </h2>
                    <p className="text-[22px] text-dark max-w-2xl text-center">
                        Choose the perfect plan for your marketing needs. Start free or scale with our premium options.
                    </p>
                </motion.div>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4 mb-14">
                    <span className={cn("text-[15px]", !isYearly ? "text-[#101011] font-medium" : "text-[#606266]")}>
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsYearly(!isYearly)}
                        className="w-[52px] h-[28px] bg-white border border-gray-200 shadow-sm rounded-full flex items-center p-1 relative transition-colors duration-300 focus:outline-none"
                        aria-label="Toggle annual billing"
                    >
                        <motion.div
                            layout
                            className="w-[20px] h-[20px] bg-[#71389A] rounded-full absolute shadow-sm"
                            animate={{ left: isYearly ? "28px" : "4px" }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    </button>
                    <span className={cn("text-[15px]", isYearly ? "text-[#101011] font-medium" : "text-[#606266]")}>
                        yearly <span className="text-[#71389A] font-medium ml-1">30%off</span>
                    </span>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-[#FAF5FF] rounded-[2.5rem] p-3 w-full flex flex-col transition-all duration-300 ring-2 ring-transparent hover:ring-[#71389A] hover:bg-[#F5E5FE] cursor-pointer"
                        >
                            {/* Top white box */}
                            <div className="bg-white rounded-[2rem] p-6 lg:p-7 w-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)]">
                                <div className="flex justify-between items-start mb-4 gap-2 min-h-[100px]">
                                    <div className="flex flex-col gap-1.5 flex-1 text-left">
                                        <h3
                                            className={cn(
                                                "text-[17px] xl:text-[18px] font-medium leading-tight",
                                                plan.isPurpleTitle ? "text-[#71389A]" : "text-[#101011]"
                                            )}
                                        >
                                            {plan.name}
                                        </h3>
                                        <p className="text-[11.5px] text-[#606266] leading-[1.3] whitespace-pre-line max-w-[120px]">{plan.description}</p>
                                    </div>
                                    {plan.price !== null ? (
                                        <div className="flex items-baseline gap-1 mt-1 shrink-0">
                                            <span className="text-[28px] xl:text-[32px] tracking-tight font-semibold text-[#101011] leading-none">${plan.price}</span>
                                            <span className="text-[12px] text-[#606266]">/month</span>
                                        </div>
                                    ) : null}
                                </div>

                                {/* CTA Button */}
                                <button className={cn(
                                    "w-full h-[48px] rounded-full text-[15px] font-medium transition-all transform hover:scale-[1.02] group",
                                    plan.isPurpleButton
                                        ? "bg-gradient-to-r from-[#B265E6] to-[#71389A] text-white shadow-[0_6px_16px_-4px_rgba(113,56,154,0.45)]"
                                        : "bg-white text-[#101011] border border-[#71389A] hover:bg-gray-50"
                                )}>
                                    <AnimatedText>{plan.cta}</AnimatedText>
                                </button>
                            </div>

                            {/* Features */}
                            <div className="p-5 lg:px-6 lg:py-5 flex-1">
                                <p className="text-[13px] font-medium text-[#606266] mb-3">Included features:</p>
                                <ul className="space-y-2.5">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-[4px] h-[4px] rounded-full bg-[#101011] flex-shrink-0 mt-[8px]" />
                                            <span className="text-[13.5px] text-[#101011] leading-snug">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
