"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { Container } from "@/components/ui/section";

const includedItems = [
    {
        title: "Website Analysis",
        description: "Get a complete breakdown of your website's performance, trust score, and visibility metrics. Understand your digital presence at a glance.",
        image: "/vectors/11.svg",
    },
    {
        title: "Competitor Analysis",
        description: "Discover what your competitors are doing right and where they're falling short. Get actionable insights to outperform them.",
        image: "/vectors/13.svg",
    },
    {
        title: "Buyer Persona",
        description: "Detailed customer profiles with demographics, goals, and pain points. Know exactly who you're marketing to.",
        image: "/vectors/14.svg",
    },
    {
        title: "Demand Insights",
        description: "Keyword opportunities, search volumes, and content ideas across Google, YouTube, Instagram, and Facebook.",
        image: "/vectors/amico.svg",
    },
    {
        title: "Customer Journey",
        description: "Map every touchpoint from awareness to purchase. Understand how customers find and choose you.",
        image: "/vectors/15.svg",
    },
    {
        title: "Marketing Plan",
        description: "Phase-by-phase action plan with timelines, budgets, key objectives, and expected outcomes.",
        image: "/vectors/16.svg",
    },

    {
        title: "Budget Projections",
        description: "12-month budget forecasts with traffic, leads, and ROI projections. Know your numbers before you spend.",
        image: "/vectors/rafiki.svg",
    },
    {
        title: "Action Board",
        description: "Track and manage all marketing tasks in one place. Stay organized with due dates, assignments, and progress tracking.",
        image: "/vectors/bro.svg",
    },
    {
        title: "Monthly Reports",
        description: "Automated performance reports with key metrics, insights, and recommendations for continuous improvement.",
        image: "/vectors/17.svg",
    },
];

const GAP = 40;

export function DIYMarketingPlanIncludesSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            // Scroll by one card width roughly
            const firstChild = scrollRef.current.firstElementChild as HTMLElement;
            const scrollAmount = firstChild ? firstChild.offsetWidth + GAP : 380;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <Container className="max-w-[1400px]">

                {/* ── Heading (centered) ───────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center px-4 mb-8"
                >
                    <h2
                        style={{
                            fontFamily: "var(--font-poppins), ui-sans-serif",
                            fontSize: "clamp(30px, 4vw, 54px)",
                            fontWeight: 500,
                            lineHeight: 1.15,
                            color: "#101011",
                            marginBottom: "14px",
                        }}
                    >
                        What{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#71389A] to-[#CB84FF]">
                            DIY Marketing
                        </span>{" "}
                        Plan Includes
                    </h2>
                    <p
                        style={{
                            fontFamily: "var(--font-poppins), ui-sans-serif",
                            fontSize: "20px",
                            color: "#606266",
                            lineHeight: 1.6,
                            maxWidth: "420px",
                            margin: "0 auto",
                        }}
                    >
                        Everything you need to plan your marketing strategy and execute clearly.
                    </p>
                </motion.div>

                {/* ── Arrows Row (above cards, pushed to sides) ────────────────────────── */}
                <div className="flex items-center justify-between px-2 mb-8 relative z-10 w-full">
                    {/* Left arrow — outlined */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        onClick={() => scroll("left")}
                        aria-label="Previous"
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "9999px",
                            border: "1.5px solid #9B72C0",
                            background: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#71389A",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#F5F0FF"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
                    >
                        <ChevronLeft size={24} />
                    </motion.button>

                    {/* Right arrow — filled purple */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        onClick={() => scroll("right")}
                        aria-label="Next"
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "9999px",
                            background: "linear-gradient(to top right, #B265E6 0%, #71389A 100%)",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            cursor: "pointer",
                            boxShadow: "0 4px 14px rgba(113,56,154,0.35)",
                        }}
                    >
                        <ChevronRight size={24} />
                    </motion.button>
                </div>

                {/* ── Cards track with right-fade peek ────────────────────────── */}
                <div style={{ position: "relative", width: "100%", paddingLeft: "8px" }}>
                    {/* Scrollable area */}
                    <div
                        ref={scrollRef}
                        style={{
                            display: "flex",
                            overflowX: "auto",
                            gap: `${GAP}px`,
                            paddingBottom: "32px",
                            paddingTop: "8px",
                            paddingRight: "8px",
                            scrollSnapType: "x mandatory",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                        className="[&::-webkit-scrollbar]:hidden pr-12 md:pr-24"
                    >
                        {includedItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.35) }}
                                className="group bg-white hover:bg-[#F5F0FF] border border-[#e5e5e5] hover:border-[#c8a8f0] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(113,56,154,0.09)] transition-all duration-300"
                                style={{
                                    flexShrink: 0,
                                    // Fixed width to remain compact regardless of ultra-wide containers
                                    width: "300px",
                                    minWidth: "300px",
                                    borderRadius: "14px",
                                    padding: "35px 24px 38px",
                                    scrollSnapAlign: "start",
                                    cursor: "pointer",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {/* Image */}
                                <div style={{ width: "120px", height: "120px", marginBottom: "15px", position: "relative" }}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain"
                                        style={{ objectPosition: "left center" }}
                                    />
                                </div>

                                {/* Title */}
                                <h3
                                    style={{
                                        fontFamily: "var(--font-poppins), ui-sans-serif",
                                        fontSize: "19px",
                                        fontWeight: 600,
                                        color: "#101011",
                                        marginBottom: "12px",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p
                                    style={{
                                        fontFamily: "var(--font-poppins), ui-sans-serif",
                                        fontSize: "14px",
                                        color: "#606266",
                                        lineHeight: 1.65,
                                        margin: 0,
                                    }}
                                >
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right fade overlay — more subtle peek */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: "32px",
                            width: "80px",
                            pointerEvents: "none",
                            background: "linear-gradient(to left, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
                            zIndex: 1,
                        }}
                    />
                </div>

                {/* ── Explore Features Button ───────────────────── */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                    <ActionButton icon={<ArrowUpRight size={18} />}>
                        Explore Features
                    </ActionButton>
                </div>

            </Container>
        </section>
    );
}
