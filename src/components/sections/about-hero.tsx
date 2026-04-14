"use client";

import { motion } from "framer-motion";

// ─── Hero marquee stills (same Cloudinary assets as before, delivered as images) ──
const MARQUEE_IMAGES = [
    "https://res.cloudinary.com/desluil7z/video/upload/c_fill,g_auto,w_800,h_1000,q_auto,f_jpg/v1773327518/1st_dsio5h",
    "https://res.cloudinary.com/desluil7z/video/upload/c_fill,g_auto,w_800,h_1000,q_auto,f_jpg/v1773327519/4th_bob7kk",
    "https://res.cloudinary.com/desluil7z/video/upload/c_fill,g_auto,w_800,h_1000,q_auto,f_jpg/v1773327519/6th_am33k5",
    "https://res.cloudinary.com/desluil7z/video/upload/c_fill,g_auto,w_800,h_1000,q_auto,f_jpg/v1773327520/5th_onfpd0",
    "https://res.cloudinary.com/desluil7z/video/upload/c_fill,g_auto,w_800,h_1000,q_auto,f_jpg/v1773327520/3rd_bfnhws",
];

// Mixed shapes — portrait, landscape, square, tall, circle-ish
const SHAPES = [
    { w: 200, h: 280, r: "20px" },
    { w: 250, h: 200, r: "16px" },
    { w: 210, h: 210, r: "105px" },   // circle
    { w: 175, h: 310, r: "22px" },
    { w: 285, h: 195, r: "14px" },
    { w: 215, h: 215, r: "20px" },    // square
    { w: 225, h: 270, r: "28px" },
    { w: 265, h: 185, r: "14px" },
    { w: 180, h: 330, r: "24px" },
    { w: 230, h: 230, r: "115px" },   // circle
];

const GAP = 18;

// Build enough tiles so the strip is definitely wider than any screen
// We repeat the pattern 20 times → ~20 * avg(220px + 18px gap) ≈ 4760px per half
// CSS animation moves -50% so we need 2× the content
function buildStrip(seed: number, count = 20) {
    return Array.from({ length: count }, (_, i) => ({
        imageIdx: (i + seed) % MARQUEE_IMAGES.length,
        shape: SHAPES[(i * 3 + seed) % SHAPES.length],
    }));
}

const ROW1 = buildStrip(0, 20);
const ROW2 = buildStrip(3, 20);

// Orbs & dots (unchanged from original)
const ORBS = [
    { w: 480, x: "4%",  y: "8%",  c: "rgba(203,132,255,0.13)", d: 12 },
    { w: 360, x: "72%", y: "5%",  c: "rgba(113,56,154,0.10)",  d: 15 },
    { w: 290, x: "50%", y: "65%", c: "rgba(203,132,255,0.09)", d: 10 },
    { w: 200, x: "16%", y: "68%", c: "rgba(113,56,154,0.07)",  d: 13 },
];
const DOTS = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: `${5 + (i * 5.9) % 90}%`,
    y: `${8 + (i * 7.1) % 78}%`,
    size: 2.5 + (i % 3),
    dur: 4.5 + (i % 5),
    delay: (i * 0.38) % 4,
    op: 0.12 + (i % 4) * 0.06,
}));

const WORDS = ["Growth", "with", "Control", "&", "Clarity"];

// ── Marquee image card ────────────────────────────────────────────────────────
function MarqueeImageCard({ imageIdx, shape }: { imageIdx: number; shape: (typeof SHAPES)[0] }) {
    return (
        <div style={{
            flexShrink: 0,
            width: shape.w,
            height: shape.h,
            borderRadius: shape.r,
            overflow: "hidden",
            position: "relative",
            border: "1.5px solid rgba(203,132,255,0.28)",
            boxShadow: "0 6px 24px rgba(113,56,154,0.10)",
        }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={MARQUEE_IMAGES[imageIdx]}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.14) 100%)",
                pointerEvents: "none",
            }} />
        </div>
    );
}

// ── Marquee row ───────────────────────────────────────────────────────────────
// Key insight: the strip is [ tiles + tiles ] side by side.
// Animation moves translateX from 0 → -50% (one full copy width).
// This looks seamless because copy-1 and copy-2 are identical.
// reverse=true goes from -50% → 0 (opposite direction).
function MarqueeRow({ tiles, duration, reverse = false }: {
    tiles: typeof ROW1;
    duration: number;
    reverse?: boolean;
}) {
    const doubled = [...tiles, ...tiles];
    const animName = reverse ? "marquee-rtl" : "marquee-ltr";

    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: GAP,
                // width is determined by content; no explicit max-content needed here
                // because the tiles themselves have fixed widths
                animation: `${animName} ${duration}s linear infinite`,
                willChange: "transform",
            }}>
                {doubled.map((t, i) => (
                    <MarqueeImageCard key={i} imageIdx={t.imageIdx} shape={t.shape} />
                ))}
            </div>
        </div>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function AboutHero() {
    return (
        <section
            id="about-hero"
            style={{
                background: "linear-gradient(180deg,#FFFFFF 0%,#FAF5FF 18%,#F0E8FF 50%,#FAF5FF 82%,#FFFFFF 100%)",
                paddingTop: "clamp(80px,10vw,140px)",
                paddingBottom: "clamp(60px,8vw,110px)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* ── CSS keyframes — translateX is GPU-composited, zero JS cost ── */}
            <style>{`
                @keyframes marquee-ltr {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - ${GAP / 2}px)); }
                }
                @keyframes marquee-rtl {
                    0%   { transform: translateX(calc(-50% - ${GAP / 2}px)); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            {/* Orbs */}
            {ORBS.map((o, i) => (
                <motion.div key={i} style={{
                    position: "absolute", width: o.w, height: o.w,
                    left: o.x, top: o.y, borderRadius: "50%",
                    background: `radial-gradient(circle,${o.c} 0%,transparent 70%)`,
                    pointerEvents: "none", zIndex: 0,
                }}
                    animate={{ x: [0,26,-16,10,0], y: [0,-20,13,-7,0], scale: [1,1.07,0.94,1.04,1] }}
                    transition={{ duration: o.d, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: i * 1.8 }}
                />
            ))}

            {/* Dots */}
            {DOTS.map(d => (
                <motion.div key={d.id} style={{
                    position: "absolute", left: d.x, top: d.y,
                    width: d.size, height: d.size, borderRadius: "50%",
                    background: "#9B5ED4", opacity: d.op, pointerEvents: "none", zIndex: 0,
                }}
                    animate={{ y: [0,-16,0], opacity: [d.op, d.op*1.8, d.op], scale: [1,1.5,1] }}
                    transition={{ duration: d.dur, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
                />
            ))}

            {/* Text */}
            <div className="max-w-[1600px] mx-auto px-6 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: -14, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mb-8"
                >
                    <motion.div
                        className="inline-flex items-center px-[22px] py-[9px] rounded-full bg-white"
                        style={{ border: "1.5px solid #d4cde8", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                        whileHover={{ boxShadow: "0 4px 20px rgba(113,56,154,0.18)", borderColor: "#b08cdc", scale: 1.04 }}
                        transition={{ duration: 0.22 }}
                    >
                        <span style={{ fontFamily: "var(--font-poppins),ui-sans-serif", fontSize: "14px", fontWeight: 400, color: "#101011" }}>
                            About Us
                        </span>
                    </motion.div>
                </motion.div>

                <div style={{
                    fontFamily: "var(--font-poppins),ui-sans-serif",
                    fontSize: "clamp(34px,5.5vw,56px)",
                    fontWeight: 500, lineHeight: 1.12, letterSpacing: "-2px", marginBottom: "22px",
                }}>
                    {WORDS.map((w, wi) => (
                        <motion.span key={wi}
                            initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.55, delay: 0.12 + wi * 0.11, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                display: "inline-block", marginRight: "0.26em",
                                background: wi < 2 ? "linear-gradient(to bottom,#71389A 0%,#CB84FF 100%)" : "none",
                                WebkitBackgroundClip: wi < 2 ? "text" : "none",
                                WebkitTextFillColor: wi < 2 ? "transparent" : "#101011",
                                backgroundClip: wi < 2 ? "text" : "none",
                                color: wi >= 2 ? "#101011" : "inherit",
                            }}
                        >{w}</motion.span>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.66 }}
                    style={{
                        fontFamily: "var(--font-poppins),ui-sans-serif",
                        fontSize: "clamp(15px,2vw,18px)", color: "#3d3d3d",
                        lineHeight: 1.75, maxWidth: "540px", margin: "0 auto",
                        fontWeight: 400, marginBottom: "clamp(52px,7vw,88px)",
                    }}
                >
                    Where AI-driven insights meet human-led execution. Helping
                    businesses grow through clarity and data.
                </motion.p>
            </div>

            {/* ══ IMAGE MARQUEE ════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    // Full bleed — stretch past any padding
                    position: "relative",
                    left: "50%",
                    right: "50%",
                    marginLeft: "-50vw",
                    marginRight: "-50vw",
                    width: "100vw",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                    // Soft fade on edges
                    maskImage: "linear-gradient(to right,transparent 0%,black 5%,black 95%,transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right,transparent 0%,black 5%,black 95%,transparent 100%)",
                }}
            >
                <MarqueeRow tiles={ROW1} duration={40} reverse={false} />
            </motion.div>
        </section>
    );
}