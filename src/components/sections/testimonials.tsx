"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/section";

const testimonialsCol1 = [
    {
        name: "Béatrice Dunski",
        role: "Founder, Paintawaytours",
        text: "The product showed strong strategic clarity and professionalism. It helped us align our digital marketing approach with our budget and business goals. Highly recommended.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=lisa",
    },
    {
        name: "Marc Bazy",
        role: "Founder, Upscale Digital",
        text: "A reliable and well-structured product experience. Communication, execution, and delivery were consistently smooth. We would recommend it without hesitation.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=emily",
    },
    {
        name: "Ytagesu Habte",
        role: "Founder, Ciride.co",
        text: "Delivered a clear and actionable marketing strategy aligned with our growth objectives. We plan to continue using this product going forward.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=sarah",
    },
    {
        name: "Kashi Keefe",
        role: "Founder, TheBreathCoachSchool.com",
        text: "Clear, effective, and delivered exactly as expected. The value was evident from the start.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=marcus",
    },
];

const testimonialsCol2 = [
    {
        name: "Daniel Ocean",
        role: "Founder, Ocean Cafe",
        text: "Delivered a well-structured marketing strategy backed by strong data analysis. Clear thinking, professional execution, and actionable insights throughout. Highly recommended.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=ytagesu",
    },
    {
        name: "Johnny Yepez",
        role: "Founder, Business Capital Mastery",
        text: "High-quality product with smooth execution. Minor refinements added clarity and elevated the overall quality of the final output.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=beatrice",
    },
    {
        name: "Gerard Gildharry",
        role: "Founder, Skinny Food Co",
        text: "Provided insightful, data-backed outputs that were both practical and useful for informed decision-making.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=marcus",
    },
    {
        name: "Chambers",
        role: "Founder, TheHourlyAdvisor.com",
        text: "Detailed, practical, and highly informative. The guidance provided strong direction for long-term strategic planning.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=sarah",
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1 justify-center mb-4">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? "fill-[#8b5cf6] text-[#8b5cf6]" : "fill-[#ede4ff] text-[#ede4ff]"
                        }`}
                />
            ))}
        </div>
    );
}

function TestimonialCard({ testimonial }: { testimonial: any }) {
    return (
        <div className="bg-[#FAF5FF] rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center w-full">
            <div className="mb-4">
                <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                />
            </div>
            <h4 className="text-[16px] lg:text-[18px] font-medium text-[#101011] mb-1">
                {testimonial.name}
            </h4>
            <p className="text-[13px] text-[#606266] mb-5">
                {testimonial.role}
            </p>

            {/* Faint faded divider */}
            <div className="w-full max-w-[85%] h-px bg-[#f2e6ff] mb-6" />

            <StarRating rating={testimonial.rating} />

            <p className="text-[#101011] text-[13px] md:text-[14px] leading-relaxed font-normal opacity-90">
                &quot;{testimonial.text}&quot;
            </p>
        </div>
    );
}

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-white overflow-hidden relative pt-4 pb-24 md:pt-12 lg:pt-20">
            <Container className="max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col max-w-lg lg:col-span-4"
                    >
                        <h2 className="text-[44px] md:text-[56px] lg:text-[64px] font-normal leading-tight text-[#101011] mb-6">
                            <span className="text-[#71389A]">Loved</span> by<br />
                            Thousands
                        </h2>
                        <p className="text-lg md:text-[20px] text-[#606266] leading-relaxed mb-10 max-w-md">
                            See what our customers have to say about their experience with Brainito
                        </p>

                        <div className="flex items-center gap-4">
                            {/* Avatar stack */}
                            <div className="flex -space-x-3 group cursor-pointer">
                                <div className="relative z-30 transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1">
                                    <Image src="https://i.pravatar.cc/150?u=1" alt="User 1" width={40} height={40} className="rounded-full border-2 border-white object-cover" />
                                </div>
                                <div className="relative z-20 transition-transform duration-300 group-hover:-translate-y-1">
                                    <Image src="https://i.pravatar.cc/150?u=2" alt="User 2" width={40} height={40} className="rounded-full border-2 border-white object-cover" />
                                </div>
                                <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1">
                                    <Image src="https://i.pravatar.cc/150?u=3" alt="User 3" width={40} height={40} className="rounded-full border-2 border-white object-cover" />
                                </div>
                            </div>

                            {/* Rating snippet */}
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-[17px] font-medium text-[#101011]">4.5/5</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-[18px] h-[18px] fill-[#ecc94b] text-[#ecc94b]" />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-[14px] text-[#606266]">
                                    Based on 10K+ reviews
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Scrolling Columns */}
                    <div className="h-[650px] lg:h-[750px] relative overflow-hidden flex gap-8 lg:gap-10 items-start mt-10 lg:mt-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] lg:col-span-8">
                        {/* Same pb on each strip as gap between cards so the strip boundary does not look “stuck together”; -50% still matches one full strip. */}
                        <div className="flex-1 flex flex-col animate-marquee-up will-change-transform pt-6 min-w-0 [backface-visibility:hidden]">
                            <div className="flex flex-col gap-8 pb-8">
                                {testimonialsCol1.map((testimonial, i) => (
                                    <TestimonialCard key={`col1-a-${i}`} testimonial={testimonial} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-8 pb-8">
                                {testimonialsCol1.map((testimonial, i) => (
                                    <TestimonialCard key={`col1-b-${i}`} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col animate-marquee-down will-change-transform -mt-[300px] min-w-0 [backface-visibility:hidden]">
                            <div className="flex flex-col gap-8 pb-8">
                                {testimonialsCol2.map((testimonial, i) => (
                                    <TestimonialCard key={`col2-a-${i}`} testimonial={testimonial} />
                                ))}
                            </div>
                            <div className="flex flex-col gap-8 pb-8">
                                {testimonialsCol2.map((testimonial, i) => (
                                    <TestimonialCard key={`col2-b-${i}`} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
