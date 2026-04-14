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
            <Container className="max-w-[800px] relative z-10">
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
                    <div
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "24px",
                            padding: "40px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
                            border: "1px solid rgba(0,0,0,0.04)",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#71389A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <FileText size={20} color="#FFFFFF" />
                            </div>
                            <h2 style={{ fontFamily: "var(--font-poppins)", fontSize: "20px", fontWeight: 500, color: "#111827" }}>
                                Request a Free Strategy Discussion
                            </h2>
                        </div>

                        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div>
                                    <label style={{ display: "block", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 500, color: "#4B5563", marginBottom: "8px" }}>Full Name*</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        required
                                        placeholder="Full name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            height: "48px",
                                            borderRadius: "99px",
                                            backgroundColor: "#F3F4F6",
                                            border: "1px solid transparent",
                                            padding: "0 24px",
                                            fontFamily: "var(--font-poppins)",
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 500, color: "#4B5563", marginBottom: "8px" }}>Phone*</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            height: "48px",
                                            borderRadius: "99px",
                                            backgroundColor: "#F3F4F6",
                                            border: "1px solid transparent",
                                            padding: "0 24px",
                                            fontFamily: "var(--font-poppins)",
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div>
                                    <label style={{ display: "block", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 500, color: "#4B5563", marginBottom: "8px" }}>Business Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            height: "48px",
                                            borderRadius: "99px",
                                            backgroundColor: "#F3F4F6",
                                            border: "1px solid transparent",
                                            padding: "0 24px",
                                            fontFamily: "var(--font-poppins)",
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 500, color: "#4B5563", marginBottom: "8px" }}>Website / App URL</label>
                                    <input
                                        type="url"
                                        name="website"
                                        placeholder="https://yourcompany.com"
                                        value={formData.website}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            height: "48px",
                                            borderRadius: "99px",
                                            backgroundColor: "#F3F4F6",
                                            border: "1px solid transparent",
                                            padding: "0 24px",
                                            fontFamily: "var(--font-poppins)",
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div>
                                    <label style={{ display: "block", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 500, color: "#4B5563", marginBottom: "8px" }}>Monthly Budget</label>
                                    <div style={{ position: "relative" }}>
                                        <CustomSelect
                                            options={budgetOptions}
                                            placeholder="Select budget"
                                            value={formData.monthly_budget}
                                            onChange={handleBudgetChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: "block", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 500, color: "#4B5563", marginBottom: "8px" }}>#1 Challenge</label>
                                    <div style={{ position: "relative" }}>
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
                                    <label style={{ display: "block", fontFamily: "var(--font-poppins)", fontSize: "13px", fontWeight: 500, color: "#4B5563", marginBottom: "8px" }}>Describe your challenge</label>
                                    <input
                                        type="text"
                                        name="other_challenge"
                                        placeholder="Describe your challenge..."
                                        value={formData.other_challenge}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            height: "48px",
                                            borderRadius: "99px",
                                            backgroundColor: "#F3F4F6",
                                            border: "1px solid transparent",
                                            padding: "0 24px",
                                            fontFamily: "var(--font-poppins)",
                                            fontSize: "14px",
                                            outline: "none",
                                        }}
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
            </Container>
        </section>
    );
}
