"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/section";
import Image from "next/image";

const steps = [
    {
        number: "Step 1",
        title: "Get Your DIY Marketing Plan",
        description:
            "AI audits your website and delivers a ready-to-execute 30-day strategy with actionable insights.",
        image: "/vectors/5.svg",
    },
    {
        number: "Step 2",
        title: "Hire a Marketer",
        description:
            "Work with a dedicated marketer who turns your strategy into measurable execution.",
        image: "/vectors/7.svg",
    },
    {
        number: "Step 3",
        title: "Build Your Growth Engine",
        description:
            "Scale ads, content, funnels, and reporting like a pro inside Brainito.",
        image: "/vectors/2.svg",
    },
];

export function HowItWorksSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const ballY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="how-it-works" className="py-24 md:py-32 bg-[#FFFFFF] relative overflow-hidden">
            {/* Ambient Background Glow for Step 1 */}
            <div className="hidden md:block absolute top-[25%] -right-[15%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#CB84FF] to-[#71389A] opacity-[0.06] blur-[100px] pointer-events-none z-0" />

            <Container>
                {/* Header */}
                <div className="text-center mb-24 md:mb-32">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-[60px] font-normal tracking-tight text-[#101011] mb-6"
                    >
                        How it{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#71389A] to-[#CB84FF]">
                            works?
                        </span>
                    </motion.h2>
                </div>

                {/* Steps Container */}
                <div ref={containerRef} className="relative max-w-5xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[24px] md:left-1/2 -top-16 -bottom-12 w-px md:w-[10px] -translate-x-1/2 bg-transparent z-0">
                        <div
                            className="absolute inset-0"
                            style={{
                                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 100%)'
                            }}
                        >
                            {/* Background faded line */}
                            <div className="absolute inset-0 bg-[#e9e0f5]" />
                            {/* Animated fill line */}
                            <motion.div
                                style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                                className="absolute inset-0 bg-gradient-to-b from-[#A359D9] to-[#71389A] z-10"
                            />
                        </div>
                        {/* The Ball */}
                        <motion.div
                            style={{ top: ballY }}
                            className="absolute left-1/2 -translate-x-1/2 -mt-3.5 md:-mt-6 w-7 h-7 md:w-12 md:h-12 rounded-full bg-[#A359D9] shadow-[0_0_16px_rgba(163,89,217,0.6)] z-10"
                        />
                    </div>

                    <div className="flex flex-col gap-20 md:gap-32">
                        {steps.map((step, index) => {
                            const isEven = index % 2 !== 0; // index 1 is step 2 (Hire a marketer)

                            return (
                                <div key={step.number} className={`relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Image Side */}
                                    <div className={`flex-1 flex justify-center w-full pl-12 md:pl-0 ${!isEven ? 'md:justify-end md:pr-16 lg:pr-24' : 'md:justify-start md:pl-16 lg:pl-24'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                            className="w-full max-w-[130px] md:max-w-[180px]"
                                        >
                                            <Image
                                                src={step.image}
                                                alt={step.title}
                                                width={200}
                                                height={200}
                                                className="w-full h-auto object-contain"
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Text Side */}
                                    <div className={`flex-1 w-full pl-12 md:pl-0 text-left ${isEven ? 'md:text-right md:pr-16 lg:pr-24' : 'md:text-left md:pl-16 lg:pl-24'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.7, ease: "easeOut" }}
                                            className="max-w-[420px]"
                                            style={{ marginLeft: isEven ? 'auto' : '0', marginRight: isEven ? '0' : 'auto' }}
                                        >
                                            <p className="text-[#A359D9] font-medium text-[13px] mb-3">{step.number}</p>
                                            <h3 className="text-[22px] md:text-[26px] font-medium text-[#101011] mb-4 tracking-tight">
                                                {step.title}
                                            </h3>
                                            <p className="text-[#606266] leading-[1.65] text-[14px] md:text-[15px]">
                                                {step.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
