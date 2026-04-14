"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";
import { Check } from "lucide-react";
import Image from "next/image";

const missionData = [
    {
        title: "Our Mission",
        description: "To help businesses gain clarity in marketing so great products can grow with direction, purpose, and consistent results.",
        icon: "/vectors/values6.svg", // Using existing vector as placeholder
        items: [
            "Bring clarity to marketing strategy",
            "Help valuable products reach the right people",
            "Enable sustainable and consistent business growth"
        ]
    },
    {
        title: "Our Mission",
        description: "To build a world where meaningful products succeed because they reach the people who truly need them.",
        icon: "/vectors/values7.svg", // Using existing vector as placeholder
        items: [
            "Empower purpose-driven businesses globally",
            "Connect value with real market demand",
            "Create positive and sustainable impact"
        ]
    }
];

export function OurMissionSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_#faf5ff_0%,_transparent_50%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_#faf5ff_0%,_transparent_50%)] pointer-events-none" />
            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">
                    {missionData.map((mission, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col"
                        >
                            {/* Icon/Vector Placeholder */}
                            <div className="mb-8 w-20 h-20 relative">
                                <div className="absolute inset-0 bg-[#A359D9]/5 rounded-full blur-2xl" />
                                <Image
                                    src={mission.icon}
                                    alt="Mission Icon"
                                    width={60}
                                    height={60}
                                    className="relative z-10"
                                />
                            </div>

                            {/* Title */}
                            <h2 className="text-xl md:text-2xl font-normal text-[#101011] mb-6">
                                {mission.title}
                            </h2>

                            {/* Description */}
                            <p className="text-black text-sm leading-relaxed mb-8 opacity-90">
                                {mission.description}
                            </p>

                            {/* Checklist */}
                            <ul className="space-y-4">
                                {mission.items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-[#606266]">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EBD9FC] flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-[#A359D9]" strokeWidth={3} />
                                        </div>
                                        <span className="text-[15px]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
