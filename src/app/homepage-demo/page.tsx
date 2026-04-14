"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { 
    ArrowRight, Heart, TrendingUp, Target, Users, Zap, Shield, 
    BarChart, MessageSquare, Clock, CheckCircle2, Star, Sparkles, 
    Globe, Rocket, Eye, Award, Check, Upload, Search, Settings, 
    ChevronRight, Quote, Share2, Megaphone, PieChart, Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function HomepageDemoPage() {
    const [count, setCount] = useState(1758);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => Math.min(prev + 1, 2100));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonialIndex((prev) => (prev + 1) % 4);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const logos = [
        { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
        { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
        { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
        { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { name: "Adobe", url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Adobe_Corporate_Horizontal_Red_HEX.svg" },
        { name: "Zoom", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" },
        { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    ];

    return (
        <div className="min-h-screen bg-white font-poppins">
            <Navbar />
            <main>
                {/* Variant Hero Section */}
                <section className="pt-40 pb-32 bg-[#F9F5FF] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#CB84FF]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white rounded-full border border-[#F2E6FF] shadow-sm mb-10 animate-fade-in">
                            <Heart className="w-5 h-5 text-[#71389A] fill-[#71389A]" />
                            <span className="text-[14px] font-bold text-[#101011]">
                                Trusted by <span className="text-[#71389A] tabular-nums">{count.toLocaleString()}</span>+ Businesses
                            </span>
                        </div>

                        <h1 className="text-[48px] md:text-[84px] font-[900] text-[#101011] mb-8 leading-[1] tracking-tighter">
                            Grow Your Brand With <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#71389A] via-[#CB84FF] to-[#71389A] bg-[length:200%_auto] animate-gradient">Intelligence</span>
                        </h1>

                        <p className="text-[20px] md:text-[24px] text-[#606266] mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                            The all-in-one platform for AI-powered marketing strategy, 
                            real-time analytics, and dedicated growth execution.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
                            <div className="w-full relative group">
                                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#CB84FF]" />
                                <input 
                                    type="url" placeholder="Your website URL"
                                    className="w-full h-[64px] pl-14 pr-6 rounded-2xl border-2 border-white bg-white/70 backdrop-blur-md focus:outline-none focus:border-[#CB84FF] focus:bg-white transition-all shadow-xl shadow-purple-500/5 font-medium"
                                />
                            </div>
                            <button className="w-full md:w-auto h-[64px] px-12 rounded-full bg-[#101011] text-white font-bold text-[18px] hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 group whitespace-nowrap">
                                Get Free Audit
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="mt-16 flex flex-wrap justify-center gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                             {logos.map((logo, idx) => (
                                <img key={idx} src={logo.url} alt={logo.name} className="h-8 w-auto" />
                             ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid - Modern Style */}
                <section className="py-32 bg-white">
                    <div className="max-w-[1240px] mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-[40px] md:text-[56px] font-black text-[#101011] mb-4 tracking-tight">Features Built for Scale</h2>
                            <p className="text-[18px] text-[#606266] font-medium">Everything you need to dominate your market.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: TrendingUp, title: "Predictive Analytics", desc: "Know what's going to work before you even launch the campaign." },
                                { icon: Target, title: "Precision Targeting", desc: "Reach your ideal customers with surgical precision across all channels." },
                                { icon: Zap, title: "Instant Execution", desc: "Turn strategies into live campaigns in minutes, not weeks." },
                                { icon: Shield, title: "Brand Safety", desc: "Monitor and protect your brand reputation 24/7 with AI agents." },
                                { icon: MessageSquare, title: "Customer Voice", desc: "Hear what your customers are really saying across social and web." },
                                { icon: Rocket, title: "Global Expansion", desc: "Scale across borders with localized insights and native strategy." }
                            ].map((f, i) => (
                                <div key={i} className="group p-10 rounded-[40px] border border-[#F2E6FF] bg-[#F9F5FF]/30 hover:bg-white hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#F2E6FF] flex items-center justify-center mb-8 group-hover:bg-[#71389A] group-hover:border-[#71389A] transition-all">
                                        <f.icon className="w-7 h-7 text-[#71389A] group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-[22px] font-bold text-[#101011] mb-4">{f.title}</h3>
                                    <p className="text-[#606266] leading-relaxed font-medium">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Results Section */}
                <section className="py-32 bg-[#101011] text-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#71389A]/20 rounded-full blur-[180px] -z-10" />
                    <div className="max-w-[1240px] mx-auto px-6 text-center">
                        <h2 className="text-[40px] md:text-[64px] font-black mb-16 tracking-tighter">Real Data. Real Growth.</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            <div>
                                <p className="text-[48px] md:text-[72px] font-black text-[#CB84FF] mb-2 tracking-tighter">4.8x</p>
                                <p className="text-[14px] font-bold uppercase tracking-widest text-[#a0a0a0]">Avg ROAS</p>
                            </div>
                            <div>
                                <p className="text-[48px] md:text-[72px] font-black text-[#CB84FF] mb-2 tracking-tighter">1.7k+</p>
                                <p className="text-[14px] font-bold uppercase tracking-widest text-[#a0a0a0]">Brands Scaled</p>
                            </div>
                            <div>
                                <p className="text-[48px] md:text-[72px] font-black text-[#CB84FF] mb-2 tracking-tighter">92%</p>
                                <p className="text-[14px] font-bold uppercase tracking-widest text-[#a0a0a0]">Client Success Rate</p>
                            </div>
                            <div>
                                <p className="text-[48px] md:text-[72px] font-black text-[#CB84FF] mb-2 tracking-tighter">102%</p>
                                <p className="text-[14px] font-bold uppercase tracking-widest text-[#a0a0a0]">Retention</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final Call to Action */}
                <section className="py-32 bg-white">
                    <div className="max-w-[1000px] mx-auto px-6 text-center">
                         <div className="bg-[#101011] rounded-[60px] p-16 md:p-32 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#71389A]/30 to-transparent opacity-50" />
                            <div className="relative z-10">
                                <h2 className="text-[36px] md:text-[64px] font-black text-white mb-8 tracking-tight leading-[1]">Ready to Dominate?</h2>
                                <p className="text-white/70 text-[18px] mb-12 max-w-xl mx-auto font-medium">
                                    Join the elite brands that use Brainito to automate growth and crush their targets.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                    <button className="h-[64px] px-12 rounded-full bg-[#CB84FF] text-[#101011] font-bold text-[18px] hover:brightness-110 transition-all shadow-xl shadow-purple-500/20">
                                        Start Free Trial
                                    </button>
                                    <button className="h-[64px] px-12 rounded-full bg-white/10 text-white font-bold text-[18px] hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
                                        View Demo Video
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
