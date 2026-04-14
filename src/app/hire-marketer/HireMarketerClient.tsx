"use client";

import { useState } from "react";
import { 
    ArrowRight, FileText, Target, Users, Zap, BarChart3, 
    Globe, Search, Share2, Megaphone, Mail, Youtube, PieChart, 
    Sparkles
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { toast } from "sonner";

const steps = [
    {
        title: "Share Requirements",
        description: "Submit your business goals, current challenges, and expectations.",
        icon: FileText,
        color: "bg-[#F9F5FF]",
        iconColor: "text-[#71389A]"
    },
    {
        title: "Strategy Mapping",
        description: "We define the exact responsibilities, skill set, and KPIs.",
        icon: Target,
        color: "bg-[#FFF1F2]",
        iconColor: "text-red-500"
    },
    {
        title: "Manager Matching",
        description: "We assign a marketing manager aligned with your industry.",
        icon: Users,
        color: "bg-[#F0F9FF]",
        iconColor: "text-blue-500"
    },
    {
        title: "Execution Begins",
        description: "Your manager starts execution with daily check-ins.",
        icon: Zap,
        color: "bg-[#FFF7ED]",
        iconColor: "text-orange-500"
    },
    {
        title: "Reporting",
        description: "Daily updates, weekly reviews, and monthly reports.",
        icon: BarChart3,
        color: "bg-[#F0FDF4]",
        iconColor: "text-green-500"
    }
];

const responsibilities = [
    {
        title: "Research & Planning",
        icon: Search,
        description: "Deep market research, competitor mapping, and go-to-market planning."
    },
    {
        title: "Website & Landing Pages",
        icon: Globe,
        description: "Coordination and continuous optimization for clarity and conversions."
    },
    {
        title: "Search Visibility (SEO)",
        icon: Share2,
        description: "End-to-end SEO execution covering on-page, technical, and off-page."
    },
    {
        title: "Social Media Presence",
        icon: Megaphone,
        description: "Platform-specific strategy and daily execution across all platforms."
    },
    {
        title: "PR & Influencers",
        icon: Target,
        description: "Managing PR campaigns and influencer collaborations for brand trust."
    },
    {
        title: "Email & Automation",
        icon: Mail,
        description: "Automated workflows designed to nurture leads and increase LTV."
    },
    {
        title: "YouTube Growth",
        icon: Youtube,
        description: "Channel positioning, content planning, and performance optimization."
    },
    {
        title: "Analytics & Tracking",
        icon: PieChart,
        description: "Complete tracking setup to ensure every decision is data-backed."
    }
];

const faqs = [
    {
        question: "What is Hire Marketer?",
        answer: "Hire Marketer is a full-time, trained marketing manager dedicated to your business, acting as an accountable growth owner without in-house hiring complexity."
    },
    {
        question: "Are you an agency or freelancers?",
        answer: "We are neither; you get a dedicated full-time marketing manager supported by our internal strategy, content, design, and execution team."
    },
    {
        question: "Where is your team based?",
        answer: "Our team is based in Ahmedabad, India."
    },
    {
        question: "How long does hiring take?",
        answer: "Hiring typically takes 2–4 weeks depending on role complexity and requirements."
    }
];

export function HireMarketerClient() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setSelectedChallenge] = useState("");
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        email: "",
        website: "",
        monthly_budget: "",
        challenge: "",
        other_challenge: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.hireMarketer(formData);
            toast.success("Thank you! Our team will contact you shortly.");
            
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'conversion', {
                    'send_to': 'AW-17618812380/0Pg7CNOS5PMbENz7ptFB',
                    'value': 1.0,
                    'currency': 'USD'
                });
            }

            window.open("https://calendly.com/brainito/growth-session", "_blank");
            
            setFormData({
                full_name: "",
                phone: "",
                email: "",
                website: "",
                monthly_budget: "",
                challenge: "",
                other_challenge: "",
            });
            setSelectedChallenge("");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to submit request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            {/* Hero & Form Section */}
            <section className="pt-40 pb-24 bg-gradient-to-b from-[#F9F5FF] to-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CB84FF]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        {/* Left: Content */}
                        <div className="lg:col-span-7">
                            <h1 className="text-[48px] md:text-[72px] font-black text-[#101011] mb-8 leading-[1.05] tracking-tight">
                                Hire Your Dedicated <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#71389A] to-[#CB84FF]">Marketing Manager</span>
                            </h1>
                            <p className="text-[20px] text-[#606266] mb-12 max-w-xl leading-relaxed font-medium">
                                A full-time, high-performance marketing manager who owns your growth. No hiring risk, no complexity.
                            </p>

                            {/* Special Offer */}
                            <div className="bg-white rounded-3xl p-8 border-2 border-[#F2E6FF] shadow-xl shadow-purple-500/5 max-w-lg relative group">
                                <div className="absolute -top-4 right-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    Limited Time Offer
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-7 h-7 text-orange-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-[20px] font-bold text-[#101011] mb-1">Free Customer Landing Page</h4>
                                        <p className="text-[#606266] text-[15px] font-medium leading-relaxed">
                                            Get a custom conversion-optimized landing page when you hire a marketer this month.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:col-span-5">
                            <div className="bg-white rounded-[40px] p-10 border border-[#F2E6FF] shadow-2xl relative">
                                <div className="absolute -inset-1 bg-gradient-to-br from-[#71389A]/10 to-[#CB84FF]/10 rounded-[42px] -z-10 blur-sm" />
                                
                                <h3 className="text-[24px] font-bold text-[#101011] mb-8">Request a Free Strategy Discovery</h3>
                                
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-[#101011] uppercase tracking-wider ml-1">Full Name</label>
                                            <input 
                                                type="text" required placeholder="John Doe"
                                                className="w-full h-14 px-5 rounded-2xl border border-[#F2E6FF] bg-[#F9F5FF]/30 focus:outline-none focus:ring-2 focus:ring-[#CB84FF]/20 focus:border-[#CB84FF] transition-all"
                                                value={formData.full_name}
                                                onChange={e => setFormData({...formData, full_name: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-[#101011] uppercase tracking-wider ml-1">Phone</label>
                                            <input 
                                                type="tel" required placeholder="+1..."
                                                className="w-full h-14 px-5 rounded-2xl border border-[#F2E6FF] bg-[#F9F5FF]/30 focus:outline-none focus:ring-2 focus:ring-[#CB84FF]/20 focus:border-[#CB84FF] transition-all"
                                                value={formData.phone}
                                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-[#101011] uppercase tracking-wider ml-1">Business Email</label>
                                        <input 
                                            type="email" required placeholder="john@company.com"
                                            className="w-full h-14 px-5 rounded-2xl border border-[#F2E6FF] bg-[#F9F5FF]/30 focus:outline-none focus:ring-2 focus:ring-[#CB84FF]/20 focus:border-[#CB84FF] transition-all"
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-[#101011] uppercase tracking-wider ml-1">Website URL</label>
                                        <input 
                                            type="text" placeholder="https://..."
                                            className="w-full h-14 px-5 rounded-2xl border border-[#F2E6FF] bg-[#F9F5FF]/30 focus:outline-none focus:ring-2 focus:ring-[#CB84FF]/20 focus:border-[#CB84FF] transition-all"
                                            value={formData.website}
                                            onChange={e => setFormData({...formData, website: e.target.value})}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-[#101011] uppercase tracking-wider ml-1">Monthly Budget</label>
                                            <Select value={formData.monthly_budget} onValueChange={(v: string) => setFormData({...formData, monthly_budget: v})}>
                                                <SelectTrigger className="h-14 rounded-2xl border-[#F2E6FF] bg-[#F9F5FF]/30">
                                                    <SelectValue placeholder="Select budget" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="under-5k">Under $5k</SelectItem>
                                                    <SelectItem value="5k-10k">$5k - $10k</SelectItem>
                                                    <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                                                    <SelectItem value="25k-plus">$25k+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-[#101011] uppercase tracking-wider ml-1">#1 Challenge</label>
                                            <Select value={formData.challenge} onValueChange={(v: string) => {
                                                setFormData({...formData, challenge: v});
                                                setSelectedChallenge(v);
                                            }}>
                                                <SelectTrigger className="h-14 rounded-2xl border-[#F2E6FF] bg-[#F9F5FF]/30">
                                                    <SelectValue placeholder="Primary Goal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="traffic">Traffic Growth</SelectItem>
                                                    <SelectItem value="leads">Lead Gen</SelectItem>
                                                    <SelectItem value="conversions">Conversions</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <button 
                                        disabled={isSubmitting}
                                        className="w-full h-[64px] mt-4 rounded-full bg-[#101011] text-white font-bold text-[18px] hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3 group"
                                    >
                                        {isSubmitting ? "Submitting..." : "Book Strategy Call"}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white border-y border-[#F2E6FF]">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-[#101011] mb-5 tracking-tight">Structured for Success</h2>
                        <p className="text-[18px] text-[#606266]">A transparent process designed for immediate impact.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className={`w-20 h-20 rounded-3xl ${step.color} border border-[#F2E6FF] flex items-center justify-center mb-6`}>
                                    <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                                </div>
                                <h3 className="text-[18px] font-bold text-[#101011] mb-2">{step.title}</h3>
                                <p className="text-[14px] text-[#606266] leading-relaxed font-medium">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What They Do */}
            <section className="py-24 bg-[#101011] text-white overflow-hidden">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-[36px] md:text-[56px] font-black mb-6 tracking-tight">Your Growth Engine Owners</h2>
                        <p className="text-[#a0a0a0] text-[18px] max-w-2xl mx-auto">They own the planning, execution, and optimization so you can focus on your business.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {responsibilities.map((resp, idx) => (
                            <div key={idx} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-[#71389A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <resp.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-[18px] font-bold mb-3">{resp.title}</h3>
                                <p className="text-[14px] text-[#a0a0a0] leading-relaxed mb-4">{resp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-24 bg-white">
                <div className="max-w-[1240px] mx-auto px-6">
                     <div className="text-center mb-20">
                        <h2 className="text-[36px] md:text-[48px] font-bold text-[#101011] mb-5 tracking-tight">Why Choose This Model?</h2>
                        <p className="text-[18px] text-[#606266]">Traditional models vs. Brainito's dedicated growth ownership.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-0">
                            <thead>
                                <tr>
                                    <th className="p-6 text-left border-b border-[#F2E6FF] text-[#606266] uppercase tracking-widest text-[11px] font-black">Feature</th>
                                    <th className="p-6 text-left border-b border-[#F2E6FF] bg-[#F9F5FF] text-[#101011] font-bold rounded-t-3xl">In-House</th>
                                    <th className="p-6 text-left border-b border-[#F2E6FF] bg-[#F9F5FF] text-[#101011] font-bold">Agency</th>
                                    <th className="p-6 text-left border-b border-[#CB84FF] bg-[#101011] text-white font-bold rounded-t-3xl shadow-xl">Brainito Manager</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["Cost Structure", "High Fixed + Benefits", "High Retainers", "Predictable Monthly Fee"],
                                    ["Onboarding", "2-3 Months", "Slow & Formal", "Fast & Execution-First"],
                                    ["Accountability", "Single Employee", "Fragmented", "Growth Owner"],
                                    ["Transparency", "Internal Reporting", "Monthly Reports", "Daily Updates"],
                                    ["Matching", "Lucky Dip", "Assigned Staff", "Expert Curated"]
                                ].map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="p-6 border-b border-[#F2E6FF] text-[15px] font-bold text-[#101011]">{row[0]}</td>
                                        <td className="p-6 border-b border-[#F2E6FF] text-[14px] text-[#606266] font-medium">{row[1]}</td>
                                        <td className="p-6 border-b border-[#F2E6FF] text-[14px] text-[#606266] font-medium">{row[2]}</td>
                                        <td className="p-6 border-b border-[#101011]/10 bg-[#101011] text-white text-[15px] font-bold">{row[3]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-[#F9F5FF] border-y border-[#F2E6FF]">
                <div className="max-w-[800px] mx-auto px-6">
                    <h2 className="text-[32px] font-bold text-[#101011] mb-12 text-center tracking-tight">Everything You Need to Know</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <AccordionItem 
                                key={idx} 
                                value={`item-${idx}`}
                                className="bg-white rounded-2xl border border-[#F2E6FF] px-8 py-2 data-[state=open]:shadow-xl transition-all"
                            >
                                <AccordionTrigger className="text-[17px] font-bold text-[#101011] hover:text-[#71389A] text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#606266] text-[16px] leading-relaxed pt-2">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </main>
    );
}
