"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { Container } from "@/components/ui/section";

const includedItems = [
    {
        title: "Research & Growth Planning",
        description: "Deep market research, competitor mapping, and go-to-market planning to define where to play, how to win, and what to prioritize for growth.",
        image: "/vectors/hire-marketer/handle1.svg",
    },
    {
        title: "Website & Landing Pages",
        description: "Planning, coordination, and continuous optimization of websites and landing pages to improve clarity, engagement, and conversions.",
        image: "/vectors/hire-marketer/handle2.svg",
    },
    {
        title: "Search Visibility (SEO)",
        description: "End-to-end SEO execution covering on-page, technical, and off-page foundations, along with optimization for answer engines and generative search platforms.",
        image: "/vectors/hire-marketer/handle3.svg",
    },
    {
        title: "Social Media Presence",
        description: "Platform-specific strategy and daily execution across Instagram, Facebook, X, TikTok, LinkedIn, YouTube, and Pinterest to drive reach, engagement, and growth.",
        image: "/vectors/hire-marketer/handle4.svg",
    },
    {
        title: "PR & Influencer Outreach",
        description: "Planning and managing PR campaigns and influencer collaborations to build credibility, visibility, and brand trust in your market.",
        image: "/vectors/hire-marketer/handle5.svg",
    },
    {
        title: "Email & Funnel Automation",
        description: "Email campaigns and automated workflows designed to nurture leads, move prospects through funnels, and increase lifetime value.",
        image: "/vectors/hire-marketer/handle6.svg",
    },

    {
        title: "YouTube Growth Strategy",
        description: "Channel positioning, content planning, and performance optimization to build consistent visibility and long-term audience growth.",
        image: "/vectors/hire-marketer/handle7.svg",
    },
    {
        title: "Analytics & Performance Tracking",
        description: "Complete tracking setup using analytics tools, tag management, and conversion tracking to ensure every decision is data-backed.",
        image: "/vectors/hire-marketer/handle8.svg",
    },
    {
        title: "CRM & Sales Pipeline Management",
        description: "CRM setup, integrations, and workflow management to improve lead handling, qualification, and sales follow-through.",
        image: "/vectors/hire-marketer/handle9.svg",
    },
    {
        title: "Events, Webinars & Podcasts",
        description: "End-to-end coordination of online events, webinars, and podcasts to support lead generation and brand authority.",
        image: "/vectors/hire-marketer/handle10.svg",
    },
    {
        title: "Reporting & Optimization",
        description: "Clear performance reporting, funnel analysis, and cross-channel insights to continuously refine strategy and improve outcomes.",
        image: "/vectors/hire-marketer/handle11.svg",
    },
];

const GAP = 40;

export function WhatMarketerHandles() {
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
                        What Your{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#71389A] to-[#CB84FF]">
                            Marketing Manager
                        </span>{" "}
                        Handles
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
                        Your manager owns planning, execution, tracking, and optimization across channels.
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
