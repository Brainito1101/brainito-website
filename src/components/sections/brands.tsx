"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/section";

// Default-size logos (52px)
const DEFAULT_LOGO_URLS = [
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1774610284/logo1_euknfl.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1774610284/logo2_dfd8ap.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1774610284/logo3_nxnp2e.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1774610283/logo6_uwceqg.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1774610283/logo8_r2gurc.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1774610283/logo9_qq07bs.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1777468766/Mask_group_zp3gkg.png",
];

// Larger logos (67px — 15px taller than default)
const LARGER_LOGO_URLS = [
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1777468566/logo01_r0j0ke.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1777468566/logo02_p9ab7n.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1777468565/logo03_rea5hu.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1777470837/Group_1059_ktoakc.png",
    "https://res.cloudinary.com/dspez5cnn/image/upload/v1777469253/Mask_group_rbufir.png",
];

// Combined list with size flag for the marquee
const ALL_LOGOS = [
    ...DEFAULT_LOGO_URLS.map((src) => ({ src, large: false })),
    ...LARGER_LOGO_URLS.map((src) => ({ src, large: true })),
];

export function BrandsSection() {
    return (
        <section className="bg-white pb-12 pt-8 md:pt-24">
            <Container>
                {/* ── Logos Marquee ──────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        width: "100%",
                        overflow: "hidden",
                        position: "relative",
                        // Smooth fade on left and right edges
                        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                    }}
                >
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40,
                        }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "max-content",
                        }}
                    >
                        {[0, 1].map((copyIdx) => (
                            <div
                                key={copyIdx}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "80px",
                                    paddingRight: "80px",
                                }}
                            >
                                {ALL_LOGOS.map(({ src, large }, i) => (
                                    <img
                                        key={`${copyIdx}-${i}-${src}`}
                                        src={src}
                                        alt={`Partner brand ${i + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        style={{
                                            height: large ? "67px" : "52px",
                                            width: "auto",
                                            maxWidth: "250px",
                                            objectFit: "contain",
                                            opacity: 0.9,
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
