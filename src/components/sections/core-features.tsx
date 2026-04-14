"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/section";

const features = [
    {
        subtitle: "Data-Driven Growth Insights",
        title: "Build <span style=\"color:#71389A;font-weight:500\">DIY</span> Marketing Plan",
        description:
            "Create your comprehensive marketing strategy with our guided templates and execution roadmap.",
        points: [
            "Clear strategy built around your business goals",
            "Campaign execution without hiring in-house",
        ],
        image: "/vectors/6.svg",
    },
    {
        subtitle: "Data-Driven Growth Insights",
        title: "<span style=\"color:#71389A;font-weight:500\">Action Board</span> to Manage Activities",
        description:
            "Track all your marketing activities in one view. Spot trends and manage campaigns instantly.",
        points: [
            "Visual performance dashboards",
            "Retention and conversion analysis",
        ],
        image: "/vectors/3.svg",
    },
    {
        subtitle: "Execution Without Hiring",
        title: "Hire Marketing <span style=\"color:#71389A;font-weight:500\">Manager</span>",
        description:
            "Dedicated marketing manager at our office works like a team member for execution.",
        points: [
            "Strategy translated into real execution",
            "No recruitment, training, or overhead costs",
        ],
        image: "/vectors/9.svg",
    },
    {
        subtitle: "Performance Intelligence",
        title: "Monthly <span style=\"color:#71389A;font-weight:500\">Reporting</span> & Analysis",
        description:
            "Visualize your performance with interactive charts. Get insights on what drives retention.",
        points: [
            "Visual dashboards with real metrics",
            "Conversion and retention breakdown",
        ],
        image: "/vectors/4.svg",
    },
];

export function CoreFeaturesSection() {
    return (
        <section id="features" className="py-24 bg-white">
            <Container className="max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-[52px] font-normal tracking-tight text-[#71389A] mb-3">
                        Core Features
                    </h2>
                    <p className="text-[#606266] text-base leading-relaxed">
                        Marketing Platform Made for Growth Driven Execution
                    </p>
                </motion.div>

                {/* Features List */}
                <div className="flex flex-col gap-10 md:gap-14">
                    {features.map((feature, i) => {
                        const isEven = i % 2 !== 0;

                        if (isEven) {
                            // RIGHT ALIGNED VECTOR CARD
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.55, delay: i * 0.08 }}
                                    className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 lg:gap-20 bg-[#F5F0FF] rounded-[1.5rem] p-6 md:p-10 lg:p-12"
                                >
                                    {/* Purple gradient image box */}
                                    <div className="flex-shrink-0 w-full md:w-auto flex justify-center lg:pr-8">
                                        <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] rounded-2xl bg-gradient-to-tl from-[#e4d0fe] from-20% to-[#a770f6] to-80% flex items-center justify-center p-6 lg:p-8">
                                            <Image
                                                src={feature.image}
                                                alt="Feature Illustration"
                                                width={260}
                                                height={260}
                                                className="w-full h-full object-contain drop-shadow-2xl"
                                            />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 w-full flex flex-col justify-center lg:pr-16 lg:pl-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#71389A]" />
                                            <span className="text-[13px] font-bold text-[#71389A]">
                                                {feature.subtitle}
                                            </span>
                                        </div>

                                        <h3
                                            className="text-[26px] lg:text-[32px] font-normal text-[#101011] mb-5 leading-tight"
                                            dangerouslySetInnerHTML={{ __html: feature.title }}
                                        />

                                        <p className="text-[#606266] text-sm md:text-base leading-relaxed mb-8 max-w-[460px]">
                                            {feature.description}
                                        </p>

                                        <ul className="space-y-4">
                                            {feature.points.map((point, j) => (
                                                <li key={j} className="flex items-center gap-3">
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e8d9f8] flex items-center justify-center">
                                                        <Check className="w-3.5 h-3.5 text-[#71389A] stroke-[3]" />
                                                    </div>
                                                    <span className="text-[#101011] text-[14px] md:text-[15px] font-medium">
                                                        {point}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            );
                        }

                        // LEFT ALIGNED VECTOR CARD
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.55, delay: i * 0.08 }}
                                className="flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-20 bg-[#F5F0FF] rounded-[1.5rem] p-6 md:p-10 lg:p-12"
                            >
                                {/* Purple gradient image box */}
                                <div className="flex-shrink-0 w-full md:w-auto flex justify-center lg:pl-12">
                                    <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] rounded-2xl bg-gradient-to-br from-[#e4d0fe] from-20% to-[#a770f6] to-80% flex items-center justify-center p-6 lg:p-8">
                                        <Image
                                            src={feature.image}
                                            alt="Feature Illustration"
                                            width={260}
                                            height={260}
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                        />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="flex-1 w-full flex flex-col justify-center lg:pl-28 lg:pr-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#71389A]" />
                                        <span className="text-[13px] font-bold text-[#71389A]">
                                            {feature.subtitle}
                                        </span>
                                    </div>

                                    <h3
                                        className="text-[26px] lg:text-[32px] font-normal text-[#101011] mb-5 leading-tight"
                                        dangerouslySetInnerHTML={{ __html: feature.title }}
                                    />

                                    <p className="text-[#606266] text-sm md:text-base leading-relaxed mb-8 max-w-[460px]">
                                        {feature.description}
                                    </p>

                                    <ul className="space-y-4">
                                        {feature.points.map((point, j) => (
                                            <li key={j} className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#e8d9f8] flex items-center justify-center">
                                                    <Check className="w-3.5 h-3.5 text-[#71389A] stroke-[3]" />
                                                </div>
                                                <span className="text-[#101011] text-[14px] md:text-[15px] font-medium">
                                                    {point}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
