"use client";

import { motion } from "framer-motion";

export function CaseStudiesHero() {
    return (
        <section
            id="case-studies-hero"
            style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 20%, #F4EEFF 50%, #FAF5FF 80%, #FFFFFF 100%)",
                paddingTop: "clamp(80px, 10vw, 140px)",
                paddingBottom: "clamp(72px, 9vw, 128px)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">

                {/* ── Pill Badge ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="inline-block mb-9"
                >
                    <div
                        className="inline-flex items-center px-[22px] py-[9px] rounded-full bg-white"
                        style={{ border: "1.5px solid #d4cde8", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                    >
                        <span
                            style={{
                                fontFamily: "var(--font-poppins), ui-sans-serif",
                                fontSize: "14px",
                                fontWeight: 400,
                                color: "#101011",
                            }}
                        >
                            Case Studies
                        </span>
                    </div>
                </motion.div>

                {/* ── Heading ── */}
                <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        fontFamily: "var(--font-poppins), ui-sans-serif",
                        fontSize: "clamp(42px, 7vw, 72px)",
                        fontWeight: 500,
                        lineHeight: 1.12,
                        letterSpacing: "-2px",
                        marginBottom: "28px",
                    }}
                >
                    <span
                        style={{
                            background: "linear-gradient(to bottom, #71389A 0%, #CB84FF 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Brainito&apos;s
                    </span>
                    {" "}
                    <span style={{ color: "#101011" }}>Case Studies</span>
                </motion.h1>

                {/* ── Body text ── */}
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontFamily: "var(--font-poppins), ui-sans-serif",
                        fontSize: "clamp(15px, 2vw, 18px)",
                        color: "#101011",
                        lineHeight: 1.7,
                        maxWidth: "560px",
                        margin: "0 auto",
                        fontWeight: 400,
                    }}
                >
                    Real results from real businesses. See how Brainito has helped
                    <br className="hidden md:block" />
                    companies like yours achieve remarkable growth.
                </motion.p>

            </div>
        </section>
    );
}