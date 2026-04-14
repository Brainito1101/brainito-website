"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-button";
import { ActionButton } from "@/components/ui/action-button";
import { caseStudies as staticCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies-data";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface CaseStudiesSectionProps {
    hideHeader?: boolean;
    showViewAll?: boolean;
    count?: number;
}

export function CaseStudiesSection({
    hideHeader = false,
    showViewAll = true,
    count
}: CaseStudiesSectionProps) {
    const [studies, setStudies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const data = await api.getCaseStudies();
                if (data && data.length > 0) {
                    // Map API fields to component fields
                    const mappedData = data.map((d: any) => ({
                        slug: d.slug,
                        category: d.industry || "Marketing",
                        title: d.project_name,
                        image: d.thumbnail_url || "/case-studies/placeholder.jpg",
                        impact: d.impact
                    }));
                    setStudies(mappedData);
                } else {
                    setStudies(staticCaseStudies);
                }
            } catch (error) {
                console.error("Error fetching case studies:", error);
                setStudies(staticCaseStudies);
            } finally {
                setLoading(false);
            }
        };

        fetchStudies();
    }, []);

    const displayStudies = count ? studies.slice(0, count) : studies;

    return (
        <section className="py-24 bg-[#FFFFFF]">
            <div className="max-w-[1240px] mx-auto px-6">
                {!hideHeader && (
                    <div className="text-center mb-16 md:mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                fontFamily: "var(--font-poppins), ui-sans-serif",
                                fontSize: "clamp(36px, 4.5vw, 56px)",
                                fontWeight: 500,
                                color: "#101011",
                                marginBottom: "20px",
                                letterSpacing: "-1px",
                                lineHeight: 1.1
                            }}
                        >
                            <span style={{ color: "#71389A" }}>Proven Results</span> Across Industries
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{
                                fontFamily: "var(--font-poppins), ui-sans-serif",
                                fontSize: "17px",
                                color: "#606266",
                                maxWidth: "600px",
                                margin: "0 auto",
                                lineHeight: 1.6
                            }}
                        >
                            Each case study demonstrates structured execution,<br className="hidden md:block" />
                            consistent tracking, and measurable outcomes.
                        </motion.p>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="animate-spin text-[#71389A]" size={40} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayStudies.map((study, index) => {
                            const detailHref = getCaseStudyBySlug(study.slug)
                                ? `/case-studies/${study.slug}`
                                : "/case-studies";
                            return (
                            <motion.div
                                key={study.slug ?? index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-[24px] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg"
                                style={{
                                    boxShadow: "0 2px 20px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.02)",
                                    border: "1px solid rgba(0,0,0,0.04)"
                                }}
                            >
                                {/* Image Container */}
                                <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={study.image}
                                        alt={study.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>

                                {/* Content Block */}
                                <div style={{ padding: "20px 20px 20px 20px" }} className="flex flex-col flex-1">
                                    <span
                                        className="font-medium mb-2 block"
                                        style={{ color: "#A874D4", fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "15px" }}
                                    >
                                        {study.category}
                                    </span>
                                    <h3
                                        className="text-[#101011] mb-5 leading-[1.45]"
                                        style={{ fontFamily: "var(--font-poppins), ui-sans-serif", fontSize: "14px", fontWeight: 600 }}
                                    >
                                        {study.title}
                                    </h3>

                                    <div className="mt-auto pt-1">
                                        <Link href={detailHref} style={{ textDecoration: "none" }}>
                                            <button
                                                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden transition-all duration-300"
                                                style={{
                                                    height: "36px",
                                                    padding: "0 16px 0 20px",
                                                    borderRadius: "99px",
                                                    border: "1.5px solid #D1D5DB",
                                                    background: "transparent",
                                                    cursor: "pointer",
                                                    fontFamily: "var(--font-poppins), ui-sans-serif",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.border = "1.5px solid #71389A";
                                                    e.currentTarget.style.color = "#71389A";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.border = "1.5px solid #D1D5DB";
                                                    e.currentTarget.style.color = "#374151";
                                                }}
                                            >
                                                <AnimatedText
                                                    style={{
                                                        fontFamily: "var(--font-poppins), ui-sans-serif",
                                                        fontSize: "13px",
                                                        fontWeight: 500,
                                                        color: "inherit",
                                                    }}
                                                >
                                                    Read More
                                                </AnimatedText>
                                                <span
                                                    className="relative rounded-full bg-white overflow-hidden block flex-shrink-0 transition-all duration-300 group-hover:bg-[#F3E8FF]"
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                                                    }}
                                                >
                                                    <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-full">
                                                        <ArrowUpRight size={12} strokeWidth={2} style={{ color: "#6B7280" }} />
                                                    </span>
                                                    <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-full group-hover:translate-x-0">
                                                        <ArrowUpRight size={12} strokeWidth={2} style={{ color: "#71389A" }} />
                                                    </span>
                                                </span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                        })}
                    </div>
                )}

                {/* View All Case Studies CTA */}
                {showViewAll && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center mt-16"
                    >
                        <Link href="/case-studies">
                            <ActionButton icon={<ArrowUpRight size={18} />}>
                                View all case studies
                            </ActionButton>
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
