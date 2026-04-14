"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";

const values = [
    {
        title: "Devotion",
        description: "We commit deeply to every business and stay focused on real outcomes.",
        icon: "/vectors/values1.svg",
    },
    {
        title: "Honesty",
        description: "Growth starts with truth. We communicate clearly and set realistic expectations.",
        icon: "/vectors/values2.svg",
    },
    {
        title: "Transparency",
        description: "Our work is open and explainable. Clients always know what's happening and why.",
        icon: "/vectors/values3.svg",
    },
    {
        title: "Problem Solving",
        description: "We solve real growth challenges using research, data, and clear reasoning.",
        icon: "/vectors/values4.svg",
    },
    {
        title: "Consistent Effort",
        description: "Growth comes from steady execution and disciplined progress.",
        icon: "/vectors/values5.svg",
    },
];

export function OurValuesSection() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <Container className="max-w-[1600px] px-3 sm:px-5 md:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-semibold text-[#101011] mb-4"
                    >
                        Our <span className="text-[#A359D9]">Values</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-[#606266] opacity-80"
                    >
                        The principles that guide everything we do
                    </motion.p>
                </div>

                <div className="mx-auto w-full">
                    {/* Grid of values */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {values.map((value, index) => (
                            <ValueCard key={value.title} value={value} index={index} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}

function ValueCard({ value, index }: { value: (typeof values)[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white px-5 py-5 transition-all duration-300 group hover:bg-[#fcf8ff] sm:gap-5 sm:px-6 md:px-8"
        >
            {/* Icon Container */}
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center">
                <img
                    src={value.icon}
                    alt={value.title}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Text Content */}
            <div className="pt-1">
                <h3 className="text-[20px] font-normal text-[#101011] mb-1.5 leading-tight">
                    {value.title}
                </h3>
                <p className="text-[#101011] text-[13px] leading-relaxed opacity-75">
                    {value.description}
                </p>
            </div>
        </motion.div>
    );
}