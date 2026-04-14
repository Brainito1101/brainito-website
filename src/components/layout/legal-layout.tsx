"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";

interface LegalLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="pt-40 pb-16 bg-gradient-to-b from-[#F9F5FF] to-white border-b border-[#F2E6FF]">
                    <div className="max-w-[1240px] mx-auto px-6 text-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[40px] md:text-[56px] font-bold text-[#101011] mb-4 tracking-tight"
                        >
                            {title}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[#606266] text-[16px]"
                        >
                            Last updated: {lastUpdated}
                        </motion.p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-20">
                    <div className="max-w-[800px] mx-auto px-6">
                        <div className="prose prose-purple max-w-none">
                            <style>{`
                                .prose h2 {
                                    font-size: 24px;
                                    font-weight: 700;
                                    color: #101011;
                                    margin-top: 40px;
                                    margin-bottom: 16px;
                                }
                                .prose p {
                                    font-size: 16px;
                                    line-height: 1.7;
                                    color: #4B4D52;
                                    margin-bottom: 24px;
                                }
                                .prose ul {
                                    list-style-type: disc;
                                    padding-left: 20px;
                                    margin-bottom: 24px;
                                }
                                .prose li {
                                    font-size: 16px;
                                    color: #4B4D52;
                                    margin-bottom: 8px;
                                }
                                .prose strong {
                                    color: #101011;
                                    font-weight: 600;
                                }
                            `}</style>
                            {children}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
