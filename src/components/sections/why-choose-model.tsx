"use client";

import { motion } from "framer-motion";

const tableData = [
    {
        aspect: "Cost Structure",
        inHouse: "High fixed cost (salary, benefits, infra)",
        freelancer: "Fragmented billing, hidden costs",
        agency: "High retainers with limited flexibility",
        brainito: "Predictable monthly fee, all-inclusive",
    },
    {
        aspect: "Hiring & Onboarding",
        inHouse: "Long hiring cycles (2-4 months)",
        freelancer: "Quick but unreliable",
        agency: "No hiring, but slow onboarding",
        brainito: "Fast matching, immediate execution",
    },
    {
        aspect: "Focus & Dedication",
        inHouse: <span style={{ color: "#101011", fontWeight: 500 }}>100% dedicated to your business</span>,
        freelancer: "Split across multiple clients",
        agency: "Junior staff, divided attention",
        brainito: "100% dedicated to your business",
    },
    {
        aspect: "Accountability",
        inHouse: "Single point of failure",
        freelancer: "Low accountability",
        agency: "Multiple layers, slow feedback",
        brainito: "Single owner, backed by experts",
    },
    {
        aspect: "Strategy Depth",
        inHouse: "Limited multi-industry exposure",
        freelancer: "Execution-focused only",
        agency: "Template-driven strategies",
        brainito: "Proven frameworks across industries",
    },
    {
        aspect: "Transparency",
        inHouse: "Depends on internal reporting",
        freelancer: "Limited visibility",
        agency: "Monthly reports only",
        brainito: "Daily updates, full transparency",
    },
    {
        aspect: "Scalability",
        inHouse: "Rehiring required to scale",
        freelancer: "Hard to scale reliably",
        agency: "Expensive to add resources",
        brainito: "Scale without rehiring risk",
    },
];

export function WhyChooseModelSection() {
    return (
        <section className="py-24 bg-[#FFFFFF]">
            <div className="max-w-[1340px] mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            fontFamily: "var(--font-poppins), ui-sans-serif",
                            fontSize: "clamp(32px, 4.5vw, 44px)",
                            fontWeight: 500,
                            color: "#101011",
                            marginBottom: "16px",
                            letterSpacing: "-0.2px"
                        }}
                    >
                        Why Companies <span style={{ color: "#71389A" }}>Choose This Model</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontFamily: "var(--font-poppins), ui-sans-serif",
                            fontSize: "18px",
                            color: "#606266"
                        }}
                    >
                        Traditional Hiring Models vs Brainito's Dedicated Manager
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="overflow-x-auto rounded-[20px]"
                    style={{
                        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)",
                        border: "1px solid rgba(0,0,0,0.05)",
                        backgroundColor: "#FFFFFF"
                    }}
                >
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr>
                                <th className="py-4 px-6 md:px-8 font-medium text-[16px]" style={{ backgroundColor: "#F4EBFC", color: "#71389A", fontFamily: "var(--font-poppins), ui-sans-serif", width: "16%" }}>Aspect</th>
                                <th className="py-4 px-6 font-medium text-[16px]" style={{ backgroundColor: "#F4EBFC", color: "#71389A", fontFamily: "var(--font-poppins), ui-sans-serif", width: "21%" }}>In-House Manager</th>
                                <th className="py-4 px-6 font-medium text-[16px]" style={{ backgroundColor: "#F4EBFC", color: "#71389A", fontFamily: "var(--font-poppins), ui-sans-serif", width: "21%" }}>Freelancer</th>
                                <th className="py-4 px-6 font-medium text-[16px]" style={{ backgroundColor: "#F4EBFC", color: "#71389A", fontFamily: "var(--font-poppins), ui-sans-serif", width: "21%" }}>Traditional Agency</th>
                                <th className="py-4 px-6 md:px-8 font-medium text-[16px]" style={{ backgroundColor: "#71389A", color: "#FFFFFF", fontFamily: "var(--font-poppins), ui-sans-serif", width: "21%" }}>Brainito's Manager</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => {
                                const isEven = index % 2 === 0;
                                const bg14 = isEven ? "#FFFFFF" : "#FAF5FF";
                                const bg5 = isEven ? "#FAF5FF" : "#FFFFFF";

                                return (
                                    <tr key={index}>
                                        <td className="py-3 px-6 md:px-8 text-[14px]" style={{ backgroundColor: bg14, color: "#101011", fontFamily: "var(--font-poppins), ui-sans-serif" }}>
                                            {row.aspect}
                                        </td>
                                        <td className="py-3 px-6 text-[14px] leading-relaxed" style={{ backgroundColor: bg14, color: typeof row.inHouse === "string" ? "#606266" : "inherit", fontFamily: "var(--font-poppins), ui-sans-serif" }}>
                                            {row.inHouse}
                                        </td>
                                        <td className="py-3 px-6 text-[14px] leading-relaxed" style={{ backgroundColor: bg14, color: "#606266", fontFamily: "var(--font-poppins), ui-sans-serif" }}>
                                            {row.freelancer}
                                        </td>
                                        <td className="py-3 px-6 text-[14px] leading-relaxed" style={{ backgroundColor: bg14, color: "#606266", fontFamily: "var(--font-poppins), ui-sans-serif" }}>
                                            {row.agency}
                                        </td>
                                        <td className="py-3 px-6 md:px-8 text-[14px] leading-relaxed" style={{ backgroundColor: bg5, color: "#101011", fontFamily: "var(--font-poppins), ui-sans-serif" }}>
                                            {row.brainito}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </section>
    );
}
