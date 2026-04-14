"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import Link from "next/link";
import { AuthModal } from "@/components/sections/auth-modal";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";
import { AnimatedText } from "@/components/ui/animated-button";
import { cn } from "@/lib/utils";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { stripePaymentLinkForPlanName } from "@/lib/stripe-payment-links";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";

interface Plan {
    name: string;
    priceMonthly: number | null;
    description: string;
    features: string[];
    cta: string;
    stripe_price_id?: string;
    variant: "outline" | "gradient" | "dark" | "contact";
}

const faqs = [
    {
        question: "How is billing handled?",
        answer: "Billing is done monthly on a subscription basis. All paid plans are recurring subscriptions.",
    },
    {
        question: "When will I be charged?",
        answer: "You are charged at the start of each billing cycle for all paid plans.",
    },
    {
        question: "Are there any long-term contracts?",
        answer: "No, subscription plans are month-to-month and can be canceled anytime.",
    },
    {
        question: "Can I upgrade or downgrade my plan?",
        answer: "Yes, plans can be changed at any time. Changes take effect at the start of the next billing cycle.",
    },
    {
        question: "Is there a setup fee?",
        answer: "No separate setup fee for any plan.",
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards and debit cards through Stripe.",
    },
    {
        question: "Do you offer refunds?",
        answer: "Refunds are handled on a case-by-case basis. Please contact support for assistance.",
    },
];

function formatMoney(n: number): string {
    return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function PricingClient() {
    const { user } = useAuth();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [processingPlan, setProcessingPlan] = useState<string | null>(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch(`${API_URL}/payments/plans/`);
                const data = await response.json();

                if (data.success && data.plans) {
                    const mappedPlans: Plan[] = [
                        {
                            name: "Free AI Plan",
                            priceMonthly: 0,
                            description: "Perfect for\nexploring Brainito",
                            features: [
                                "1 Free AI Marketing Report",
                                "Basic strategy insights",
                                "AI-powered recommendations",
                                "Limited access to features",
                            ],
                            cta: "Start Free",
                            variant: "dark",
                        },
                        ...data.plans.map((plan: { name?: string; price_monthly?: number; stripe_price_id?: string }) => {
                            const name = plan.name || "";
                            const isDIY = name.includes("DIY");
                            const isMarketer = name.includes("Marketer");
                            const monthly = Number(plan.price_monthly) || 0;

                            return {
                                name: plan.name,
                                priceMonthly: monthly,
                                description: isDIY
                                    ? "For teams ready\nto execute"
                                    : isMarketer
                                        ? "Done-for-you\nmarketing"
                                        : "Custom solution",
                                features: isDIY
                                    ? [
                                        "1 AI Marketing Report",
                                        "Full marketing strategy",
                                        "Competitor analysis",
                                        "Budget ROI analysis",
                                        "Execution roadmap",
                                        "30-day action plan",
                                    ]
                                    : isMarketer
                                        ? [
                                            "Full marketing team",
                                            "Multiple specialists",
                                            "Custom strategy & execution",
                                            "Dedicated account manager",
                                            "Priority support",
                                            "Custom integrations",
                                        ]
                                        : ["Custom features", "Dedicated support"],
                                cta: "Subscribe Now",
                                stripe_price_id: plan.stripe_price_id,
                                variant: "gradient" as const,
                            };
                        }),
                        {
                            name: "Hire a Team",
                            priceMonthly: null,
                            description: "Enterprise\nmarketing team",
                            features: [
                                "Full marketing team",
                                "Multiple specialists",
                                "Custom strategy & execution",
                                "Dedicated account manager",
                                "Priority support",
                                "Custom integrations",
                            ],
                            cta: "Contact Sales",
                            variant: "contact",
                        },
                    ];

                    setPlans(mappedPlans);
                }
            } catch (error) {
                console.error("Error fetching plans:", error);
                toast.error("Failed to load pricing plans. Please refresh the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const getPriceDisplay = (plan: Plan) => {
        if (plan.priceMonthly === null) return { label: "Custom", suffix: "/ based on scope" };
        if (plan.priceMonthly === 0) return { label: "$0", suffix: "/month" };
        const monthly = plan.priceMonthly;
        return {
            label: `$${formatMoney(monthly)}`,
            suffix: "/month",
        };
    };

    const handlePlanClick = async (plan: Plan) => {
        if (plan.name === "Free AI Plan") {
            if (user) {
                window.location.href = `${process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.brainito.com"}/dashboard`;
            } else {
                setShowAuthModal(true);
            }
            return;
        }

        if (plan.name === "Hire a Team") {
            window.location.href = "/contact";
            return;
        }

        const paymentLink = stripePaymentLinkForPlanName(plan.name);
        if (paymentLink && !user) {
            window.location.href = paymentLink;
            return;
        }

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (plan.stripe_price_id) {
            setProcessingPlan(plan.name);
            try {
                const accessToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
                const response = await fetch(`${API_URL}/payments/create-checkout-session/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ price_id: plan.stripe_price_id }),
                });
                const data = await response.json();
                if (data.checkout_url) {
                    window.location.href = data.checkout_url;
                } else {
                    throw new Error(data.error || "Failed to create checkout session");
                }
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : "Failed to start checkout. Please try again.";
                toast.error(message);
            } finally {
                setProcessingPlan(null);
            }
            return;
        }

        if (paymentLink) {
            window.location.href = paymentLink;
            return;
        }

        toast.error("Checkout is not available for this plan right now. Please try again later or contact support.");
    };

    return (
        <main>
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            {/* ── Hero ── */}
            <section className="pt-40 pb-16 bg-gradient-to-b from-[#F9F5FF] to-white">
                <Container className="max-w-[min(100%,1600px)] px-4 sm:px-6 lg:px-10 text-center flex flex-col items-center">
                    {/* Pill badge */}
                    <span className="inline-block text-[13px] font-medium text-[#101011] bg-white border border-[#e5e7eb] rounded-full px-5 py-1.5 mb-8 shadow-sm">
                        Pricing Plan
                    </span>

                    <h1 className="text-[34px] sm:text-[40px] md:text-[48px] lg:text-[52px] font-medium leading-tight tracking-tight mb-5">
                        <span className="text-[#71389A]">Simple Pricing.</span>{" "}
                        <span className="text-[#101011]">Powerful Results.</span>
                    </h1>

                    <p className="text-[17px] text-[#606266] max-w-xl">
                        Choose the perfect plan for your marketing needs. Start free or scale with our premium options.
                    </p>
                </Container>
            </section>

            {/* ── Plans Grid ── */}
            <section className="pb-28 bg-white">
                <Container className="max-w-[min(100%,1600px)] px-4 sm:px-6 lg:px-10">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-[#71389A] mb-4" />
                            <p className="text-[#606266] font-medium">Loading plans…</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-8 items-stretch">
                            {plans.map((plan, i) => {
                                const { label, suffix } = getPriceDisplay(plan);
                                const isCustom = plan.priceMonthly === null;
                                const isProcessing = processingPlan === plan.name;

                                return (
                                    <motion.div
                                        key={plan.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08, duration: 0.45 }}
                                        className="bg-[#FAF5FF] rounded-[2.5rem] p-3 flex flex-col"
                                    >
                                        {/* White top card */}
                                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                                            <div className="flex justify-between items-start gap-3 mb-6">
                                                <div className="flex flex-col gap-1 flex-1 min-w-0">
                                                    <h3 className="text-[15px] md:text-[16px] font-medium text-[#101011] leading-snug">
                                                        {plan.name}
                                                    </h3>
                                                    <p className="text-[12px] md:text-[13px] text-[#606266] leading-[1.4] whitespace-pre-line">
                                                        {plan.description}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end flex-shrink-0 text-right">
                                                    <div className="flex items-baseline gap-0.5">
                                                        <span
                                                            className={cn(
                                                                "text-[24px] md:text-[26px] lg:text-[28px] tracking-tight font-medium leading-none tabular-nums",
                                                                isCustom ? "text-[#71389A]" : "text-[#101011]"
                                                            )}
                                                        >
                                                            {label}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] md:text-[12px] text-[#606266] mt-0.5">{suffix}</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handlePlanClick(plan)}
                                                disabled={isProcessing}
                                                className={cn(
                                                    "group relative flex h-[48px] w-full items-center justify-center overflow-hidden rounded-full text-[14px] focus:outline-none",
                                                    "transition-all duration-200 ease-in-out",
                                                    plan.variant === "gradient" &&
                                                        "border-2 border-[#71389A] text-white disabled:transform-none",
                                                    plan.variant === "dark" &&
                                                        "border-2 border-[#71389A] bg-white text-[#101011] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:-translate-y-px hover:bg-[#FAF5FF] hover:shadow-[0_6px_22px_rgba(113,56,154,0.2)] disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]",
                                                    plan.variant === "contact" &&
                                                        "border-2 border-[#71389A] bg-transparent text-[#71389A] hover:-translate-y-px hover:bg-[#FAF5FF] hover:shadow-[0_4px_14px_rgba(113,56,154,0.15)] disabled:hover:translate-y-0 disabled:hover:bg-transparent disabled:hover:shadow-none",
                                                    isProcessing && "cursor-not-allowed opacity-70"
                                                )}
                                                style={
                                                    plan.variant === "gradient"
                                                        ? {
                                                              background:
                                                                  "linear-gradient(to top right, #B265E6 0%, #71389A 100%)",
                                                              boxShadow:
                                                                  "0 4px 14px rgba(113, 56, 154, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                                                              fontFamily: "var(--font-poppins), ui-sans-serif",
                                                              fontWeight: 300,
                                                          }
                                                        : { fontFamily: "var(--font-poppins), ui-sans-serif" }
                                                }
                                                onMouseEnter={
                                                    plan.variant === "gradient" && !isProcessing
                                                        ? (e) => {
                                                              e.currentTarget.style.boxShadow =
                                                                  "0 6px 22px rgba(113, 56, 154, 0.5), inset 0 1px 0 rgba(255,255,255,0.22)";
                                                              e.currentTarget.style.transform = "translateY(-1px)";
                                                          }
                                                        : undefined
                                                }
                                                onMouseLeave={
                                                    plan.variant === "gradient" && !isProcessing
                                                        ? (e) => {
                                                              e.currentTarget.style.boxShadow =
                                                                  "0 4px 16px rgba(113, 56, 154, 0.38), inset 0 1px 0 rgba(255,255,255,0.22)";
                                                              e.currentTarget.style.transform = "translateY(0)";
                                                          }
                                                        : undefined
                                                }
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 shrink-0 animate-spin" />
                                                        <span>Processing…</span>
                                                    </>
                                                ) : (
                                                    <AnimatedText
                                                        className={cn(
                                                            plan.variant === "gradient" && "text-white",
                                                            plan.variant === "dark" && "text-[#101011]",
                                                            plan.variant === "contact" && "text-[#71389A]"
                                                        )}
                                                    >
                                                        {plan.cta}
                                                    </AnimatedText>
                                                )}
                                            </button>
                                        </div>

                                        {/* Features */}
                                        <div className="p-6 lg:px-7 lg:py-6 flex-1">
                                            <p className="text-[12px] text-[#606266] mb-3">Included features:</p>
                                            <ul className="space-y-2">
                                                {plan.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#101011] flex-shrink-0 mt-[6px]" />
                                                        <span className="text-[13px] text-[#101011] leading-snug">
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </Container>
            </section>

            {/* ── FAQ ── */}
            <section className="py-24 bg-[#FAF5FF] border-t border-[#f2e6ff]">
                <Container className="max-w-[800px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-[32px] md:text-[40px] font-medium text-[#101011] tracking-tight mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[16px] text-[#606266]">
                            Everything you need to know about our pricing and plans.
                        </p>
                    </motion.div>

                    <Accordion type="single" collapsible className="space-y-3">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="bg-white rounded-2xl border border-[#f2e6ff] px-6 md:px-7 data-[state=open]:border-[#d8b4fe] data-[state=open]:shadow-md transition-all"
                            >
                                <AccordionTrigger className="text-[#101011] font-medium text-[15px] hover:text-[#71389A] text-left py-5">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#606266] text-[14px] leading-relaxed pb-5">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-10 text-center">
                        <Link
                            href="/help"
                            className="text-[#71389A] font-medium text-[15px] hover:underline"
                        >
                            View all FAQs →
                        </Link>
                    </div>
                </Container>
            </section>

            {/* ── Final CTA ── */}
            <CTABannerSection />
        </main>
    );
}
