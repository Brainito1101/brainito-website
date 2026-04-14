"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, FileText, ArrowRight, ArrowUpRight, User } from "lucide-react";
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
import { Loader2 } from "lucide-react";

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
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-[120px] pb-[80px] bg-gradient-to-b from-[#FAF5FF] via-[#FDFBFF] via-50% to-[#FFFFFF]"
        >
            <div
                className="relative z-10 w-full max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-2 gap-[40px] items-center"
            >
                {/* Left Column */}
                <motion.div {...fadeUp(0.05)} className="flex flex-col">
                    <h1 className="font-poppins text-[clamp(36px,4.5vw,64px)] font-semibold leading-[1.1] text-[#71389A] mb-8 tracking-[-1px]">
                        Hire Marketing
                        <br />
                        <span className="text-[#A874D4]">Manager</span>
                    </h1>

                    <ul className="flex flex-col gap-5 mb-10">
                        {[
                            "Full-time, trained marketing manager dedicated to your business.",
                            "Single accountable owner focused on driving your growth.",
                            "No in-house hiring complexity, saving time and resources.",
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 size={24} className="text-gray-600 shrink-0 mt-[2px]" />
                                <span className="font-poppins text-[18px] text-gray-600 leading-[1.5]">
                                    {text}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Offer Box */}
                    <div className="border rounded-2xl p-5 bg-white mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <div className="flex justify-between mb-5">
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
                                <h3 className="font-poppins text-lg text-gray-900 font-medium mb-1">
                                    Free Customer Landing Page
                                </h3>
                                <p className="font-poppins text-sm text-gray-500">
                                    When you hire a marketer this month
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Icons */}
                    <div className="flex gap-8 items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#71389A] flex items-center justify-center">
                                <User size={18} color="#FFFFFF" />
                            </div>
                            <span className="font-poppins text-[15px] text-gray-600">Managed by experts</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#71389A] flex items-center justify-center">
                                <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
                            </div>
                            <span className="font-poppins text-[15px] text-gray-600">Immediate execution</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column (Form) */}
                <motion.div {...fadeUp(0.15)} className="w-full max-w-[560px] mx-auto">
                    <div className="bg-white rounded-[24px] p-10 shadow-[10px_15px_50px_rgba(0,0,0,0.06)] border border-black/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-full bg-[#71389A] flex items-center justify-center">
                                <FileText size={20} color="#FFFFFF" />
                            </div>
                            <h2 className="font-poppins text-[20px] font-medium text-gray-900">
                                Request a Free Strategy Discussion
                            </h2>
                        </div>

                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block font-poppins text-[13px] font-medium text-gray-600 mb-2">Full Name*</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        required
                                        placeholder="Full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-full bg-gray-100 border border-transparent px-6 font-poppins text-sm outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-poppins text-[13px] font-medium text-gray-600 mb-2">Phone*</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-full bg-gray-100 border border-transparent px-6 font-poppins text-sm outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-poppins text-[13px] font-medium text-gray-600 mb-2">Business Email*</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-12 rounded-full bg-gray-100 border border-transparent px-6 font-poppins text-sm outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-poppins text-[13px] font-medium text-gray-600 mb-2">Website / App URL</label>
                                <input
                                    type="url"
                                    name="website"
                                    placeholder="https://yourcompany.com"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full h-12 rounded-full bg-gray-100 border border-transparent px-6 font-poppins text-sm outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block font-poppins text-[13px] font-medium text-gray-600 mb-2">Monthly Budget</label>
                                    <div className="relative">
                                        <CustomSelect
                                            options={budgetOptions}
                                            placeholder="Select budget"
                                            value={formData.monthly_budget}
                                            onChange={handleBudgetChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block font-poppins text-[13px] font-medium text-gray-600 mb-2">#1 Challenge</label>
                                    <div className="relative">
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
                                <div>
                                    <label className="block font-poppins text-[13px] font-medium text-gray-600 mb-2">Describe your challenge</label>
                                    <input
                                        type="text"
                                        name="other_challenge"
                                        placeholder="Describe your challenge..."
                                        value={formData.other_challenge}
                                        onChange={handleChange}
                                        className="w-full h-12 rounded-full bg-gray-100 border border-transparent px-6 font-poppins text-sm outline-none"
                                    />
                                </div>
                            )}

                            <ActionButton
                                className="w-full mt-3"
                                type="submit"
                                disabled={loading}
                                icon={loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowUpRight size={18} />}
                            >
                                {loading ? "Submitting..." : "Request Strategy Discussion"}
                            </ActionButton>

                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
