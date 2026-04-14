"use client";

import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthModal } from "@/components/sections/auth-modal";
import { stripePaymentLinkForHomePricingPlanId } from "@/lib/stripe-payment-links";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";
const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.brainito.com";

type PlanCard = {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: { name: string; disabled: boolean }[];
    cta: string;
    highlighted: boolean;
    stripe_price_id?: string;
};

const defaultPlans: PlanCard[] = [
    {
        id: "free",
        name: "Free",
        price: "0",
        period: "month",
        description: "Perfect for getting\nstarted",
        features: [
            { name: "Website audit", disabled: false },
            { name: "Basic strategy", disabled: false },
            { name: "AI-powered insights", disabled: false },
        ],
        cta: "Start Free",
        highlighted: false,
    },
    {
        id: "standard",
        name: "Standard",
        price: "99",
        period: "month",
        description: "For growing\nbusinesses",
        features: [
            { name: "Full marketing strategy", disabled: false },
            { name: "Execution roadmap", disabled: false },
            { name: "30-day action plan", disabled: false },
            { name: "1 Hour Consultation", disabled: false },
        ],
        cta: "Subscribe Now",
        highlighted: true,
        stripe_price_id: undefined,
    },
    {
        id: "premium",
        name: "Premium",
        price: "2,999",
        period: "month",
        description: "For enterprises\n& agencies",
        features: [
            { name: "Dedicated marketer", disabled: false },
            { name: "Full execution", disabled: false },
            { name: "Weekly reporting", disabled: false },
            { name: "Strategy optimization", disabled: false },
            { name: "Priority support", disabled: false },
        ],
        cta: "Subscribe Now",
        highlighted: false,
        stripe_price_id: undefined,
    },
];

export function PricingSection() {
    const [isYearly, setIsYearly] = useState(true);
    const [processingPlan, setProcessingPlan] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();
    const [plans, setPlans] = useState<PlanCard[]>(defaultPlans);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const response = await fetch(`${API_URL}/payments/plans/`);
                const data = await response.json();
                if (cancelled || !data.success || !Array.isArray(data.plans)) return;

                let diy: { stripe_price_id?: string; price_monthly?: number; name?: string } | undefined;
                let marketer: { stripe_price_id?: string; price_monthly?: number; name?: string } | undefined;

                for (const p of data.plans as { name?: string; stripe_price_id?: string; price_monthly?: number }[]) {
                    const n = (p.name || "").toLowerCase();
                    if (n.includes("diy")) diy = p;
                    else if (n.includes("marketer")) marketer = p;
                }

                setPlans((prev) =>
                    prev.map((plan) => {
                        if (plan.id === "standard" && diy?.stripe_price_id) {
                            const pm = Number(diy.price_monthly);
                            return {
                                ...plan,
                                stripe_price_id: diy.stripe_price_id,
                                price: Number.isFinite(pm) ? pm.toLocaleString("en-US") : plan.price,
                            };
                        }
                        if (plan.id === "premium" && marketer?.stripe_price_id) {
                            const pm = Number(marketer.price_monthly);
                            return {
                                ...plan,
                                stripe_price_id: marketer.stripe_price_id,
                                price: Number.isFinite(pm) ? pm.toLocaleString("en-US") : plan.price,
                            };
                        }
                        return plan;
                    })
                );
            } catch (e) {
                console.error("Error fetching plans:", e);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const handlePlanClick = async (plan: PlanCard) => {
        if (plan.id === "free") {
            if (user) {
                window.location.href = `${DASHBOARD_URL}/dashboard`;
            } else {
                setShowAuthModal(true);
            }
            return;
        }

        const paymentLink = stripePaymentLinkForHomePricingPlanId(plan.id);
        if (paymentLink && !user) {
            window.location.href = paymentLink;
            return;
        }

        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (plan.stripe_price_id) {
            setProcessingPlan(plan.id);
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await fetch(`${API_URL}/payments/create-checkout-session/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        price_id: plan.stripe_price_id,
                    }),
                });

                const data = await response.json();

                if (data.checkout_url) {
                    window.location.href = data.checkout_url;
                } else {
                    throw new Error(data.error || "Failed to create checkout session");
                }
            } catch (error: unknown) {
                console.error("Checkout error:", error);
                const message =
                    error instanceof Error ? error.message : "Failed to start checkout. Please try again.";
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

        router.push("/contact");
    };

    return (
        <section id="pricing" className="py-24 bg-white relative">
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            <Container className="max-w-[1400px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 flex flex-col items-center"
                >
                    <h2 className="text-[44px] md:text-[52px] font-medium text-[#101011] leading-tight mb-4">
                        Simple Pricing for <span className="text-[#71389A]">Everyone</span>
                    </h2>
                    <p className="text-[17px] text-[#606266] max-w-2xl text-center">
                        Choose the plan that&apos;s right for your business. All plans include core features.
                    </p>
                </motion.div>

                <div className="flex items-center justify-center gap-4 mb-14">
                    <span className={cn("text-[14px]", !isYearly ? "text-[#101011] font-medium" : "text-[#606266]")}>
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
                    <span className={cn("text-[14px]", isYearly ? "text-[#101011]" : "text-[#606266]")}>
                        yearly <span className="text-[#71389A] ml-1">30%off</span>
                    </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-10 xl:gap-12 items-stretch">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-[#FAF5FF] rounded-[2.5rem] p-3 w-full flex flex-col"
                        >
                            <div className="bg-white rounded-[2rem] p-6 lg:p-8 w-full shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
                                <div className="flex justify-between items-start mb-8 gap-2">
                                    <div className="flex flex-col gap-1.5 flex-1 text-left">
                                        <h3 className="text-[21px] font-medium text-[#101011] leading-none mb-1">{plan.name}</h3>
                                        <p className="text-[14px] text-[#606266] leading-[1.3] max-w-[130px] whitespace-pre-line">{plan.description}</p>
                                    </div>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-[46px] tracking-tight font-medium text-[#101011] leading-none">${plan.price}</span>
                                        <span className="text-[14px] text-[#606266]">/{plan.period}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handlePlanClick(plan)}
                                    disabled={processingPlan === plan.id}
                                    className={cn(
                                        "w-full h-[52px] rounded-full text-[16px] transition-all transform hover:scale-[1.02] group flex justify-center items-center outline-none",
                                        plan.highlighted
                                            ? "bg-gradient-to-b from-[#8241b0] to-[#bd60ff] text-white border border-[#8241b0] shadow-[0_20px_40px_-12px_rgba(189,96,255,0.6)]"
                                            : "bg-[#18181B] text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]",
                                        processingPlan === plan.id && "opacity-80 cursor-not-allowed scale-100"
                                    )}
                                >
                                    {processingPlan === plan.id ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <AnimatedText>{plan.cta}</AnimatedText>
                                    )}
                                </button>
                            </div>

                            <div className="p-6 lg:px-8 lg:py-6 flex-1">
                                <p className="text-[13px] text-[#606266] mb-2">Included features:</p>
                                <ul className="space-y-1.5">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "w-1 h-1 rounded-full flex-shrink-0 relative top-[1px]",
                                                    feature.disabled ? "bg-[#a1a1aa]" : "bg-[#101011]"
                                                )}
                                            />
                                            <span
                                                className={cn(
                                                    "text-[14px]",
                                                    feature.disabled
                                                        ? "text-[#a1a1aa] line-through decoration-[#a1a1aa]/60"
                                                        : "text-[#101011]"
                                                )}
                                            >
                                                {feature.name}
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
