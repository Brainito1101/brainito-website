"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/section";
import Image from "next/image";

type StoryItem = {
    id: number;
    yearTitle: string;
    subtitle: string;
    description: string;
    image: string;
};

const section1Items: StoryItem[] = [
    {
        id: 1,
        yearTitle: "2015 — The First Startup",
        subtitle: "The First Startup and the Cost of Experimentation",
        description:
            "Our founder launched her first startup and gained early traction, but the marketing lacked clear direction. The experience revealed how quickly growth fails without clarity.",
        image: "/vectors/14.svg",
    },
    {
        id: 2,
        yearTitle: "2018 — The Birth of Clarity",
        subtitle: "Turning Failure into Insight",
        description:
            "After the startup closed, the focus shifted to helping founders gain clarity before spending on marketing. This work became the foundation of Brainito's audit-first approach.",
        image: "/vectors/15.svg",
    },
    {
        id: 3,
        yearTitle: "2019 – 2023 — Scaling the audit-first approach",
        subtitle: "Helping Businesses Grow with Direction",
        description:
            "A small team helped more than 1,800 businesses create clear marketing plans they could execute without guesswork or wasted budgets.",
        image: "/vectors/16.svg",
    },
];

const section2Items: StoryItem[] = [
    {
        id: 4,
        yearTitle: "Jan 2024 — Value Bridge Analysis",
        subtitle: "A Framework for Sustainable Growth",
        description:
            "Years of learning were formalized into the Value Bridge Analysis, connecting product value, user demand, market reality, and execution.",
        image: "/vectors/17.svg",
    },
    {
        id: 5,
        yearTitle: "May 2024 — Strategy to Execution",
        subtitle: "The Remote Marketing Manager Model",
        description:
            "To solve execution challenges, we introduced dedicated remote marketing managers who work like an internal team member with full ownership and accountability.",
        image: "/vectors/pana.svg",
    },
    {
        id: 6,
        yearTitle: "2025 — Refinement and Maturity",
        subtitle: "Strengthening the System",
        description:
            "We continued refining both the Value Bridge framework and the Remote Marketing Manager service to improve strategy and execution.",
        image: "/vectors/rafiki.svg",
    },
    {
        id: 7,
        yearTitle: "2026 — Productizing the Mission",
        subtitle: "Expanding Globally",
        description:
            "Our product launched to help founders worldwide gain clarity, grow with direction, and avoid wasting time, money, and effort.",
        image: "/vectors/pana-2.svg",
    },
];

function LaptopMockup({ items, activeId }: { items: StoryItem[]; activeId: number }) {
    const resolvedActiveId = items.some((i) => i.id === activeId) ? activeId : items[0].id;
    return (
        <div className="relative w-full px-2 pb-4">
            <div className="relative z-10 mx-auto w-[96%] overflow-hidden rounded-t-[1.5rem] rounded-b-[4px] border border-gray-800 bg-[#101011] px-[2.5%] pb-[2.8%] pt-[4%] shadow-2xl">
                <div className="relative aspect-[16/10.5] overflow-hidden rounded-[4px] bg-white shadow-inner">
                    {items.map((item) => (
                        <Image
                            key={item.id}
                            src={item.image}
                            alt={item.subtitle}
                            fill
                            className={`object-cover object-[center_54%] transition-opacity duration-700 ${resolvedActiveId === item.id ? "z-10 opacity-100" : "z-0 opacity-0"}`}
                        />
                    ))}
                </div>
                <div className="absolute bottom-[0.8%] left-1/2 -translate-x-1/2 text-[7px] font-medium tracking-[0.2em] text-gray-500 opacity-40">
                    BRAINITO
                </div>
            </div>
            <div className="relative left-[-2.5%] z-20 h-[10px] w-[105%] rounded-b-2xl bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] shadow-lg md:h-[12px]">
                <div className="absolute left-1/2 top-0 h-[3px] w-20 -translate-x-1/2 rounded-b-full bg-black/10"></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -z-10 h-8 w-[90%] -translate-x-1/2 rounded-full bg-black/5 blur-2xl"></div>
        </div>
    );
}

/** Tailwind `md` is 768px — true when layout is mobile column (no sticky timeline). */
function useIsBelowMd() {
    return useSyncExternalStore(
        (onStoreChange) => {
            if (typeof window === "undefined") return () => {};
            const mq = window.matchMedia("(max-width: 767px)");
            mq.addEventListener("change", onStoreChange);
            return () => mq.removeEventListener("change", onStoreChange);
        },
        () => (typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false),
        () => false
    );
}

function TimelineDecor() {
    return (
        <>
            <div className="absolute left-1/2 top-0 z-[6] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#A359D9]/30 ring-4 ring-[#A359D9]/5" />
            <div className="absolute bottom-0 left-1/2 z-[6] translate-y-full -translate-x-1/2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7 0V12M7 12L2 7M7 12L12 7"
                        stroke="#A359D9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.4"
                    />
                </svg>
            </div>
        </>
    );
}

/** Scroll-synced row: updates activeId while this block crosses the viewport mid-band. */
function TimelineStoryBlock({
    item,
    activeId,
    setActiveId,
    align,
}: {
    item: StoryItem;
    activeId: number;
    setActiveId: (id: number) => void;
    align: "laptop-left" | "laptop-right";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.42, margin: "-32% 0px -32% 0px" });
    const isActive = activeId === item.id;

    useEffect(() => {
        if (isInView) setActiveId(item.id);
    }, [isInView, item.id, setActiveId]);

    const dotOnContentLeft = align === "laptop-left";

    return (
        <div
            ref={ref}
            className={`relative z-10 flex min-h-[72vh] items-center ${
                align === "laptop-left" ? "justify-start pl-12 lg:pl-16" : "justify-end pr-12 lg:pr-16"
            }`}
        >
            <div
                className={`absolute top-1/2 z-20 -translate-y-1/2 ${
                    dotOnContentLeft ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
                }`}
            >
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setActiveId(item.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-medium shadow-lg transition-all duration-300 ${
                        isActive
                            ? "bg-[#A359D9] text-white ring-4 ring-[#A359D9]/20"
                            : "border border-[#A359D9]/20 bg-white text-gray-400 hover:border-[#A359D9] hover:text-[#A359D9]"
                    }`}
                >
                    {item.id}
                </motion.button>
            </div>
            <motion.div
                initial={{ opacity: 0, x: align === "laptop-left" ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveId(item.id)}
                className={`max-w-[600px] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"} ${
                    align === "laptop-right" ? "text-right" : ""
                }`}
            >
                <h3 className="mb-3 text-xl font-semibold text-[#A359D9] md:text-2xl">{item.yearTitle}</h3>
                <h4 className="mb-3 text-lg font-medium text-[#101011]">{item.subtitle}</h4>
                <p
                    className={`text-[15px] leading-relaxed text-[#606266] md:text-[16px] ${
                        align === "laptop-right" ? "md:ml-auto" : ""
                    }`}
                >
                    {item.description}
                </p>
            </motion.div>
        </div>
    );
}

export function AboutStorySection() {
    const [activeId, setActiveId] = useState(1);
    const isBelowMd = useIsBelowMd();
    const headerMotionInitial = isBelowMd ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };

    return (
        <section className="relative bg-white py-24">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_0%_0%,_#faf5ff_0%,_transparent_50%)]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_100%_100%,_#faf5ff_0%,_transparent_50%)]" />

            <Container>
                {/* Header */}
                <div className="relative z-10 mx-auto mb-16 max-w-3xl px-1 text-center sm:px-0 md:mb-32">
                    <motion.h2
                        initial={headerMotionInitial}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-5 font-semibold tracking-tight text-[#101011] md:text-5xl md:leading-[1.15]"
                    >
                        {/* Mobile: two-line stack so “One mistake” stays prominent and the rest reads cleanly */}
                        <span className="flex flex-col items-center gap-2 text-balance md:hidden">
                            <span className="text-[clamp(28px,7.5vw,36px)] leading-[1.12]">
                                <span className="text-[#A359D9]">One mistake</span>
                                <span className="text-[#101011]"> shaped</span>
                            </span>
                            <span className="text-balance text-[clamp(22px,5.8vw,28px)] font-semibold leading-[1.22] text-[#101011]">
                                everything we do today
                            </span>
                        </span>
                        {/* Desktop: original break after “shaped” */}
                        <span className="hidden md:block">
                            <span className="text-[#A359D9]">One mistake</span> shaped
                            <br />
                            everything we do today
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={headerMotionInitial}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: isBelowMd ? 0 : 0.1 }}
                        className="mx-auto max-w-[600px] text-[16px] leading-relaxed text-[#606266] md:text-[17px] md:opacity-90"
                    >
                        You want to grow your business. You&apos;re motivated by impact and purpose. And you want your marketing to make a difference. We want
                        the same thing.
                    </motion.p>
                </div>

                {/* SECTION 1: Items 1–3 — desktop: sticky laptop left, scrolling text right */}
                <div className="relative mx-auto mb-20 max-w-[1200px] md:mb-32 md:pt-12">
                    {/* Mobile */}
                    <div className="space-y-24 md:hidden">
                        {section1Items.map((item) => {
                            const isActive = activeId === item.id;
                            return (
                                <div key={item.id} className="relative flex flex-col">
                                    <div className="mb-8 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setActiveId(item.id)}
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-medium transition-all duration-300 ${
                                                isActive
                                                    ? "border-[#A359D9] bg-[#A359D9] text-white"
                                                    : "border-[#A359D9]/20 bg-white text-[#A359D9]"
                                            }`}
                                        >
                                            {item.id}
                                        </button>
                                    </div>
                                    {item.id === 1 && <LaptopMockup items={section1Items} activeId={activeId} />}
                                    <div className="mt-8" onMouseEnter={() => setActiveId(item.id)}>
                                        <h3 className="mb-3 text-xl font-semibold text-[#A359D9]">{item.yearTitle}</h3>
                                        <h4 className="mb-3 text-lg font-medium text-[#101011]">{item.subtitle}</h4>
                                        <p className="text-[15px] leading-relaxed text-[#606266]">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop */}
                    <div
                        className="relative hidden md:grid md:grid-cols-2"
                        style={{ gridTemplateRows: `repeat(${section1Items.length}, minmax(72vh, auto))` }}
                    >
                        <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-[5] w-[1.5px] -translate-x-1/2 bg-[#f0e8f6]" />
                        <TimelineDecor />

                        <div className="col-start-1 row-start-1 row-end-[-1] z-10 flex min-h-0 justify-end pr-6 lg:pr-10">
                            <div className="sticky top-28 w-full max-w-[400px] self-start py-10 lg:max-w-[420px]">
                                <LaptopMockup items={section1Items} activeId={activeId} />
                            </div>
                        </div>

                        {section1Items.map((item, i) => (
                            <div key={item.id} className="col-start-2" style={{ gridRow: i + 1 }}>
                                <TimelineStoryBlock item={item} activeId={activeId} setActiveId={setActiveId} align="laptop-left" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: Items 4–7 — desktop: scrolling text left, sticky laptop right */}
                <div className="relative mx-auto max-w-[1200px] md:pt-12">
                    {/* Mobile */}
                    <div className="space-y-24 md:hidden">
                        {section2Items.map((item) => {
                            const isActive = activeId === item.id;
                            return (
                                <div key={item.id} className="relative flex flex-col">
                                    <div className="mb-8 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setActiveId(item.id)}
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-medium transition-all duration-300 ${
                                                isActive
                                                    ? "border-[#A359D9] bg-[#A359D9] text-white"
                                                    : "border-[#A359D9]/20 bg-white text-[#A359D9]"
                                            }`}
                                        >
                                            {item.id}
                                        </button>
                                    </div>
                                    {item.id === 4 && <LaptopMockup items={section2Items} activeId={activeId} />}
                                    <div className="mt-8" onMouseEnter={() => setActiveId(item.id)}>
                                        <h3 className="mb-3 text-xl font-semibold text-[#A359D9]">{item.yearTitle}</h3>
                                        <h4 className="mb-3 text-lg font-medium text-[#101011]">{item.subtitle}</h4>
                                        <p className="text-[15px] leading-relaxed text-[#606266]">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop */}
                    <div
                        className="relative hidden md:grid md:grid-cols-2"
                        style={{ gridTemplateRows: `repeat(${section2Items.length}, minmax(72vh, auto))` }}
                    >
                        <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-[5] w-[1.5px] -translate-x-1/2 bg-[#f0e8f6]" />
                        <TimelineDecor />

                        {section2Items.map((item, i) => (
                            <div key={item.id} className="col-start-1" style={{ gridRow: i + 1 }}>
                                <TimelineStoryBlock item={item} activeId={activeId} setActiveId={setActiveId} align="laptop-right" />
                            </div>
                        ))}

                        <div className="col-start-2 row-start-1 row-end-[-1] z-10 flex min-h-0 justify-start pl-6 lg:pl-10">
                            <div className="sticky top-28 w-full max-w-[400px] self-start py-10 lg:max-w-[420px]">
                                <LaptopMockup items={section2Items} activeId={activeId} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
