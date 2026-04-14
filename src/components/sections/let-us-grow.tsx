"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";
import { FileText, ArrowUpRight, Loader2 } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import { ActionButton } from "@/components/ui/action-button";
import { api } from "@/lib/api";
import { toast } from "sonner";

const budgetOptions = [
    { label: "Under $5,000", value: "under-5k" },
    { label: "$5,000 - $10,000", value: "5k-10k" },
    { label: "$10,000 - $25,000", value: "10k-25k" },
    { label: "$25,000 - $50,000", value: "25k-50k" },
    { label: "$50,000+", value: "50k-plus" },
];

const challengeOptions = [
    { label: "Branding & Awareness", value: "branding" },
    { label: "Traffic Growth", value: "traffic" },
    { label: "Lead Generation", value: "leads" },
    { label: "Conversions & Sales", value: "conversions" },
    { label: "Funnel Optimization", value: "funnel" },
    { label: "Scaling Paid Ads", value: "ads" },
    { label: "Other", value: "other" },
];

export function LetUsGrowSection() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        email: "",
        website: "",
        monthly_budget: "",
        challenge: "",
        other_challenge: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBudgetChange = (value: string) => {
        setFormData({ ...formData, monthly_budget: value });
    };

    const handleChallengeChange = (value: string) => {
        setFormData({ ...formData, challenge: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.hireMarketer(formData);

            // Track Google Ads conversion
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17618812380/0Pg7CNOS5PMbENz7ptFB',
                    'value': 1.0,
                    'currency': 'USD'
                });
            }

            toast.success("Request submitted successfully!");

            // Open Calendly link in new tab
            window.open("https://calendly.com/brainito/growth-session", "_blank");

            // Reset form
            setFormData({
                full_name: "",
                phone: "",
                email: "",
                website: "",
                monthly_budget: "",
                challenge: "",
                other_challenge: "",
            });
        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 50%, #FFFFFF 100%)" }}>
            <Container className="relative z-10 max-w-[800px] min-w-0">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 flex flex-col items-center"
                >
                    <h2
                        className="font-medium leading-tight mb-4"
                        style={{
                            fontFamily: "var(--font-poppins), ui-sans-serif",
                            fontSize: "clamp(40px, 5vw, 60px)",
                            color: "#101011",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        <span style={{ color: "#71389A" }}>Let's Grow</span> Your Business
                    </h2>
                    <p
                        className="text-[#606266] max-w-2xl text-center"
                        style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "18px" }}
                    >
                        A structured hiring and execution process designed for<br className="hidden md:block" /> speed and accountability
                    </p>
                </motion.div>

                {/* Form Wrapper */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <div className="min-w-0 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:rounded-[24px] sm:p-8 md:p-10">
                        <div className="mb-6 flex items-start gap-3 sm:mb-8 sm:items-center sm:gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#71389A] sm:h-10 sm:w-10">
                                <FileText size={20} color="#FFFFFF" />
                            </div>
                            <h2 className="min-w-0 text-left font-poppins text-[16px] font-medium leading-snug text-gray-900 sm:text-[18px] md:text-[20px]">
                                Request a Free Strategy Discussion
                            </h2>
                        </div>

                        <form className="flex min-w-0 flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
                            <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-[#4B5563] sm:mb-2 sm:text-[13px]">
                                        Full Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        required
                                        placeholder="Full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-[#F3F4F6] px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-[#4B5563] sm:mb-2 sm:text-[13px]">
                                        Phone*
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-[#F3F4F6] px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                    />
                                </div>
                            </div>

                            <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-[#4B5563] sm:mb-2 sm:text-[13px]">
                                        Business Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-[#F3F4F6] px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-[#4B5563] sm:mb-2 sm:text-[13px]">
                                        Website / App URL
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        placeholder="https://yourcompany.com"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-[#F3F4F6] px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                    />
                                </div>
                            </div>

                            <div className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-[#4B5563] sm:mb-2 sm:text-[13px]">
                                        Monthly Budget
                                    </label>
                                    <div className="relative min-w-0">
                                        <CustomSelect
                                            options={budgetOptions}
                                            placeholder="Select budget"
                                            value={formData.monthly_budget}
                                            onChange={handleBudgetChange}
                                        />
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-[#4B5563] sm:mb-2 sm:text-[13px]">
                                        #1 Challenge
                                    </label>
                                    <div className="relative min-w-0">
                                        <CustomSelect
                                            options={challengeOptions}
                                            placeholder="Select challenge"
                                            value={formData.challenge}
                                            onChange={handleChallengeChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {formData.challenge === "other" && (
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-[#4B5563] sm:mb-2 sm:text-[13px]">
                                        Describe your challenge
                                    </label>
                                    <input
                                        type="text"
                                        name="other_challenge"
                                        placeholder="Describe your challenge..."
                                        value={formData.other_challenge}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-[#F3F4F6] px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                    />
                                </div>
                            )}

                            <ActionButton
                                className="mt-2 w-full min-w-0 gap-2 px-4 sm:mt-3 sm:gap-3 sm:px-6 md:px-8"
                                textClassName="whitespace-nowrap text-[13px] leading-tight sm:text-sm md:text-[17px] md:leading-normal"
                                type="submit"
                                disabled={loading}
                                icon={
                                    loading ? (
                                        <Loader2 className="size-4 shrink-0 animate-spin sm:size-[18px]" />
                                    ) : (
                                        <ArrowUpRight className="size-4 shrink-0 sm:size-[18px]" />
                                    )
                                }
                            >
                                {loading ? (
                                    <span className="whitespace-nowrap">Submitting…</span>
                                ) : (
                                    <>
                                        <span className="md:hidden">Book strategy call</span>
                                        <span className="hidden md:inline">Request Strategy Discussion</span>
                                    </>
                                )}
                            </ActionButton>
                        </form>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
