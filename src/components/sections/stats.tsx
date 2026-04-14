"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container, SectionLabel } from "@/components/ui/section";

const stats = [
    { value: 50000, suffix: "+", label: "Reports Generated", color: "#71389A" },
    { value: 98, suffix: "%", label: "Customer Satisfaction", color: "#CB84FF" },
    { value: 300, suffix: "%", label: "Average ROI Increase", color: "#71389A" },
    { value: 12, suffix: "K+", label: "Businesses Helped", color: "#CB84FF" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                    let start = 0;
                    const end = value;
                    const duration = 2000;
                    const step = (timestamp: number) => {
                        if (!start) start = timestamp;
                        const progress = Math.min((timestamp - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setDisplay(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, started]);

    return (
        <div ref={ref} className="tabular-nums">
            {display.toLocaleString()}
            {suffix}
        </div>
    );
}

export function StatsSection() {
    return (
        <section className="py-20 bg-[#FAF5FF]">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <SectionLabel>Loved by Thousands</SectionLabel>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#101011] mt-3">
                        Real Results, Real Businesses
                    </h2>
                    <p className="text-[#606266] mt-3 max-w-lg mx-auto">
                        Join thousands of entrepreneurs and marketers who trust Brainito to power their growth.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl border border-[#e9e0f5] p-6 text-center shadow-[0_4px_24px_rgba(113,56,154,0.07)] hover:shadow-[0_8px_32px_rgba(113,56,154,0.14)] transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div
                                className="text-4xl md:text-5xl font-bold mb-2 gradient-text"
                            >
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-sm font-medium text-[#606266]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
