"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, FileText, ArrowUpRight, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { ActionButton } from "@/components/ui/action-button";

const budgetOptions = [
    { label: "Under $5,000", value: "budget-1" },
    { label: "Under $5,000", value: "budget-2" },
    { label: "Under $5,000", value: "budget-3" },
    { label: "Under $5,000", value: "budget-4" },
    { label: "Under $5,000", value: "budget-5" },
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

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

import { api } from "@/lib/api";
import { toast } from "sonner";

export function HireMarketerHeroSection() {
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
        <section
            id="hero"
            className="relative flex min-h-0 flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF5FF] via-[#FDFBFF] via-50% to-[#FFFFFF] pt-[110px] pb-10 sm:pt-[120px] md:min-h-screen md:pb-[80px]"
        >
            <div className="relative z-10 grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-4 sm:px-6 md:grid-cols-2 md:gap-10 lg:gap-[40px]">
                {/* Left Column */}
                <motion.div {...fadeUp(0.05)} className="flex flex-col">
                    <h1 className="mb-5 font-poppins text-[clamp(32px,8.2vw,44px)] font-semibold leading-[1.1] tracking-[-0.75px] text-[#71389A] sm:text-[clamp(34px,6.8vw,50px)] md:mb-8 md:tracking-[-1px] md:text-[clamp(36px,4.5vw,64px)]">
                        Hire Marketing
                        <br />
                        <span className="text-[#A874D4]">Manager</span>
                    </h1>

                    <ul className="mb-8 flex flex-col gap-4 md:mb-10 md:gap-5">
                        {[
                            "Full-time, trained marketing manager dedicated to your business.",
                            "Single accountable owner focused on driving your growth.",
                            "No in-house hiring complexity, saving time and resources.",
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gray-600 md:size-6" />
                                <span className="font-poppins text-[15px] leading-snug text-gray-600 md:text-[17px] md:leading-[1.5] lg:text-[18px]">
                                    {text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Offer Box */}
                    <div className="mb-6 rounded-2xl border bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:mb-8 sm:p-5">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-5">
                            <div className="bg-gradient-to-r from-[#71389A] to-[#A874D4] rounded-full px-3 py-1 flex items-center gap-[6px]">
                                <div className="w-[6px] h-[6px] bg-white rounded-full" />
                                <span className="font-poppins text-[13px] text-white font-medium">
                                    Special offer
                                </span>
                            </div>
                            <div className="bg-green-500 rounded-full px-3 py-1 flex items-center gap-[6px]">
                                <div className="w-[6px] h-[6px] bg-white rounded-full" />
                                <span className="font-poppins text-[13px] text-white font-medium">
                                    Free
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center mt-1">
                                <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
                                <div className="w-[2px] h-4 bg-gray-200 my-[2px]" />
                                <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
                            </div>
                            <div>
                                <h3 className="mb-1 font-poppins text-base font-medium text-gray-900 md:text-lg">
                                    Free Customer Landing Page
                                </h3>
                                <p className="font-poppins text-xs text-gray-500 md:text-sm">
                                    When you hire a marketer this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Icons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#71389A]">
                                <User size={18} color="#FFFFFF" />
                            </div>
                            <span className="font-poppins text-sm text-gray-600 md:text-[15px]">Managed by experts</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#71389A]">
                                <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
                            </div>
                            <span className="font-poppins text-sm text-gray-600 md:text-[15px]">Immediate execution</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column (Form) */}
                <motion.div {...fadeUp(0.15)} className="mx-auto w-full min-w-0 max-w-[560px]">
                    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[10px_15px_50px_rgba(0,0,0,0.06)] sm:rounded-[24px] sm:p-8 md:p-10">
                        <div className="mb-6 flex items-start gap-3 sm:mb-8 sm:items-center sm:gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#71389A] sm:h-10 sm:w-10">
                                <FileText size={20} color="#FFFFFF" />
                            </div>
                            <h2 className="min-w-0 text-left font-poppins text-[16px] font-medium leading-snug text-gray-900 sm:text-[18px] md:text-[20px]">
                                Request a Free Strategy Discussion
                            </h2>
                        </div>

                        <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-gray-600 sm:mb-2 sm:text-[13px]">
                                        Full Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        required
                                        placeholder="Full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-gray-100 px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-gray-600 sm:mb-2 sm:text-[13px]">
                                        Phone*
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-gray-100 px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                    />
                                </div>
                            </div>

                            <div className="min-w-0">
                                <label className="mb-1.5 block font-poppins text-[12px] font-medium text-gray-600 sm:mb-2 sm:text-[13px]">
                                    Business Email*
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-11 w-full min-w-0 rounded-full border border-transparent bg-gray-100 px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                />
                            </div>

                            <div className="min-w-0">
                                <label className="mb-1.5 block font-poppins text-[12px] font-medium text-gray-600 sm:mb-2 sm:text-[13px]">
                                    Website / App URL
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="https://yourcompany.com"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="h-11 w-full min-w-0 rounded-full border border-transparent bg-gray-100 px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                                <div className="min-w-0">
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-gray-600 sm:mb-2 sm:text-[13px]">
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
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-gray-600 sm:mb-2 sm:text-[13px]">
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
                                    <label className="mb-1.5 block font-poppins text-[12px] font-medium text-gray-600 sm:mb-2 sm:text-[13px]">
                                        Describe your challenge
                                    </label>
                                    <input
                                        type="text"
                                        name="other_challenge"
                                        placeholder="Describe your challenge..."
                                        value={formData.other_challenge}
                                        onChange={handleChange}
                                        className="h-11 w-full min-w-0 rounded-full border border-transparent bg-gray-100 px-4 font-poppins text-sm outline-none sm:h-12 sm:px-6"
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
            </div>
        </section>
    );
}
