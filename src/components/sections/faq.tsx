"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "How Brainito help businesses?",
        answer: "Brainito help businesses build clear, data-driven marketing strategies and execute them with dedicated marketing managers."
    },
    {
        question: "Who is this for?",
        answer: "Ideal for founders, CEOs, and business owners who want structured, measurable digital growth."
    },
    {
        question: "Can I start with strategy only?",
        answer: "Yes. You can begin with a DIY Marketing Plan and upgrade to execution anytime."
    },
    {
        question: "Do you provide ongoing execution support?",
        answer: "Yes. You can hire a full-time marketing manager to execute and manage growth."
    },
    {
        question: "How quickly can I get started?",
        answer: "Strategy can start immediately, and dedicated manager onboarding takes 2–4 weeks."
    }
];

function FAQItem({ question, answer, isOpen, onToggle }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                isOpen
                    ? "bg-[#FAF5FF] border-[#e9e0f5]"
                    : "bg-white border-[#e9e0f5] hover:border-[#d9c8eb]"
            )}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                aria-expanded={isOpen}
            >
                <span
                    className={cn(
                        "text-[15px] md:text-[16px] transition-colors font-medium",
                        isOpen ? "text-[#71389A]" : "text-[#101011]"
                    )}
                >
                    {question}
                </span>
                <span
                    className={cn(
                        "flex-shrink-0 ml-4 transition-transform duration-300",
                        isOpen ? "rotate-180 text-[#71389A]" : "text-[#101011]"
                    )}
                >
                    <ChevronDown size={20} className="opacity-70" />
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="px-5 md:px-6 pb-6">
                            <div className="w-full h-px bg-[#eadafc] mb-5" />
                            <p className="text-[14px] md:text-[15px] text-[#606266] leading-relaxed max-w-[90%]">
                                {answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-white">
            <Container className="max-w-[1000px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[44px] md:text-[58px] font-medium text-[#71389A] leading-tight mb-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-[18px] md:text-[23px] text-[#606266] max-w-2xl mx-auto">
                        Everything you need to know about Brainito
                    </p>
                </motion.div>

                <div className="space-y-4 md:space-y-5">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                        >
                            <FAQItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
