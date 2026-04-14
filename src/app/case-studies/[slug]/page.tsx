import type { CSSProperties } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import {
    ArrowLeft, ArrowRight,
    Check,
    Calendar, Building2, BarChart3, Activity,
} from "lucide-react";
import { caseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from "@/lib/case-studies-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { formatSeoTitle } from "@/lib/page-metadata-defaults";
/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */

type PageParams = { slug: string };

/** Normalised shape used by both the API path and the static-data fallback. */
interface StudyData {
    category: string;
    title: string;
    subtitle: string;
    keyResults: string[];
    image: string;
    aboutBusiness?: string;
    challengeTitle: string;
    challengeContent: string;
    approachTitle: string;
    approachContent: string;
    approachPoints: string[];
    solutionTitle: string;
    solutionContent: string;
    duration?: string;
    industry?: string;
    services?: string[];
    results: { value: string; label: string; description: string; highlight?: boolean }[];
    testimonial?: { name: string; role: string; company: string; quote: string; avatar: string };
    relatedStudies: { slug: string; category: string; title: string; image: string; keyResults: string[] }[];
}

/* ─────────────────────────────────────────────────────────────
   Data fetching
───────────────────────────────────────────────────────────── */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://app.brainito.com/api";

async function getStudyData(slug: string): Promise<StudyData | null> {
    // 1. Try the API
    try {
        const res = await fetch(`${API_BASE}/case-studies/${slug}/`, { next: { revalidate: 3600 } });
        if (res.ok) {
            const json = await res.json();
            const d = json.case_study ?? json;

            // Fetch related via all-studies endpoint
            let related: StudyData["relatedStudies"] = [];
            try {
                const allRes = await fetch(`${API_BASE}/case-studies/`, { next: { revalidate: 3600 } });
                if (allRes.ok) {
                    const allJson = await allRes.json();
                    const all: any[] = allJson.case_studies ?? allJson ?? [];
                    related = all
                        .filter((s: any) => s.slug !== slug)
                        .slice(0, 3)
                        .map((s: any) => ({
                            slug: s.slug,
                            category: s.industry ?? s.category ?? "",
                            title: s.project_name ?? s.title ?? "",
                            image: s.featured_image_url ?? s.thumbnail_url ?? s.image ?? "",
                            keyResults: s.key_results ?? s.metrics ?? [],
                        }));
                }
            } catch { /* keep related empty */ }

            return {
                category: d.industry ?? d.category ?? "",
                title: d.project_name ?? d.title ?? "",
                subtitle: d.impact ?? d.subtitle ?? "",
                keyResults: d.key_results ?? [],
                image: d.featured_image_url ?? d.thumbnail_url ?? d.image ?? "",
                aboutBusiness: d.business_overview ?? d.aboutBusiness,
                challengeTitle: d.challenge_title ?? "The Challenge",
                challengeContent: d.challenge_content ?? d.theChallenge ?? "",
                approachTitle: d.approach_title ?? "Our Approach",
                approachContent: d.approach_content ?? d.ourApproach?.intro ?? "",
                approachPoints: d.approach_points ?? d.ourApproach?.bullets ?? [],
                solutionTitle: d.solution_title ?? "The Solution",
                solutionContent: d.solution_content ?? d.theSolution ?? "",
                duration: d.duration,
                industry: d.industry,
                services: d.services,
                results: (d.metrics ?? []).map((m: any, i: number, arr: any[]) => ({
                    value: m.value ?? m.metric ?? "",
                    label: m.label ?? "",
                    description: m.description ?? "",
                    highlight: m.highlight ?? (arr.length === 3 && i === 2),
                })),
                testimonial: d.testimonial_name
                    ? {
                          name: d.testimonial_name,
                          role: d.testimonial_role ?? "",
                          company: d.testimonial_company ?? "",
                          quote: d.testimonial_quote ?? "",
                          avatar: d.testimonial_avatar ?? "",
                      }
                    : d.testimonial
                      ? {
                            name: d.testimonial.name ?? "",
                            role: d.testimonial.role ?? "",
                            company: d.testimonial.company ?? "",
                            quote: d.testimonial.quote ?? "",
                            avatar: d.testimonial.avatar ?? "",
                        }
                      : undefined,
                relatedStudies: related,
            };
        }
    } catch { /* fall through to static */ }

    // 2. Static fallback
    const s = getCaseStudyBySlug(slug);
    if (!s) return null;

    const related = getRelatedCaseStudies(slug, 3).map((r) => ({
        slug: r.slug,
        category: r.category,
        title: r.title,
        image: r.image,
        keyResults: r.metrics,
    }));

    return {
        category: s.category,
        title: s.title,
        subtitle: s.subtitle,
        keyResults: s.metrics,
        image: s.image,
        aboutBusiness: s.aboutBusiness,
        challengeTitle: "The Challenge",
        challengeContent: s.theChallenge,
        approachTitle: "Our Strategic Approach",
        approachContent: s.ourApproach.intro,
        approachPoints: s.ourApproach.bullets,
        solutionTitle: "The Solution",
        solutionContent: s.theSolution,
        duration: s.duration,
        industry: s.industry,
        services: s.services,
        results: s.results.map((r) => ({
            value: r.metric,
            label: r.label,
            description: r.description,
            highlight: !!r.highlight,
        })),
        testimonial: s.testimonial
            ? { name: s.testimonial.name, role: s.testimonial.role, company: s.testimonial.company, quote: s.testimonial.quote, avatar: s.testimonial.avatar }
            : undefined,
        relatedStudies: related,
    };
}

/* ─────────────────────────────────────────────────────────────
   Static params (keeps local slugs pre-rendered at build time)
───────────────────────────────────────────────────────────── */

export async function generateStaticParams(): Promise<PageParams[]> {
    return caseStudies.map((cs) => ({ slug: cs.slug }));
}

/* ─────────────────────────────────────────────────────────────
   Metadata
───────────────────────────────────────────────────────────── */

/** Right-column dashboard-style visual (decorative); mirrors design mock. */
function ProjectDetailsDashboardVisual({
    duration,
    industry,
    services,
    poppins,
}: {
    duration?: string;
    industry?: string;
    services?: string[];
    poppins: CSSProperties;
}) {
    const flowItems =
        services && services.length > 0
            ? services.slice(0, 5)
            : ["SEO Strategy", "Paid Ads", "Social Media", "Email Automation", "Analytics"];

    return (
        <div
            className="relative w-full overflow-hidden rounded-[24px] md:rounded-[28px] p-5 md:p-7 lg:p-8 min-h-[300px] md:min-h-[380px]"
            style={{
                background: "linear-gradient(145deg, #4c1d6d 0%, #71389A 32%, #8e44ad 62%, #a855f7 100%)",
                boxShadow: "0 28px 64px -14px rgba(113, 56, 154, 0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
                {/* Left stack — overview + flow */}
                <div className="flex flex-col gap-3 md:col-span-5">
                    <div
                        className="rounded-2xl border border-white/25 p-4 text-white md:p-5"
                        style={{
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                        }}
                    >
                        <p style={{ ...poppins, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85, marginBottom: "14px" }}>
                            Project Overview
                        </p>
                        <div className="space-y-3">
                            {duration ? (
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                                        <Calendar className="h-4 w-4 text-white/90" strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <p style={{ ...poppins, fontSize: "11px", opacity: 0.75 }}>Duration</p>
                                        <p style={{ ...poppins, fontSize: "13px", fontWeight: 600 }}>{duration}</p>
                                    </div>
                                </div>
                            ) : null}
                            {industry ? (
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                                        <Building2 className="h-4 w-4 text-white/90" strokeWidth={1.8} />
                                    </div>
                                    <div className="min-w-0">
                                        <p style={{ ...poppins, fontSize: "11px", opacity: 0.75 }}>Industry</p>
                                        <p style={{ ...poppins, fontSize: "13px", fontWeight: 600, lineHeight: 1.35 }} className="break-words">
                                            {industry}
                                        </p>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {flowItems.map((label, i) => (
                            <div
                                key={`${label}-${i}`}
                                className="rounded-full border border-white/30 px-3 py-1.5 text-white/95"
                                style={{
                                    ...poppins,
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    background: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — mini “dashboard” */}
                <div
                    className="flex flex-col rounded-2xl border border-white/40 p-4 shadow-lg md:col-span-7 md:p-5"
                    style={{
                        background: "rgba(255,255,255,0.94)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div className="mb-4 flex items-center justify-between gap-2">
                        <p style={{ ...poppins, fontSize: "13px", fontWeight: 600, color: "#101011" }}>Marketing Performance</p>
                        <BarChart3 className="h-4 w-4 text-[#71389A]" strokeWidth={1.8} />
                    </div>

                    {/* Fake traffic line */}
                    <p style={{ ...poppins, fontSize: "10px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                        Traffic overview
                    </p>
                    <div className="mb-5 flex h-[72px] items-end justify-between gap-1 rounded-xl bg-[#F9F5FF] px-2 pb-2 pt-2">
                        {[22, 34, 26, 44, 30, 52, 38, 58, 46, 62].map((px, i) => (
                            <div
                                key={i}
                                className="min-w-[3px] flex-1 rounded-t-sm bg-gradient-to-t from-[#71389A] to-[#CB84FF] opacity-90"
                                style={{ height: `${px}px` }}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-[#F2E6FF] bg-white p-3">
                            <p style={{ ...poppins, fontSize: "10px", color: "#9ca3af", marginBottom: "6px" }}>Lead generation</p>
                            <div className="flex h-[52px] items-end gap-1">
                                {[20, 32, 24, 40, 28].map((px, i) => (
                                    <div key={i} className="min-w-[4px] flex-1 rounded-t bg-[#71389A]/80" style={{ height: `${px}px` }} />
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl border border-[#F2E6FF] bg-white p-3">
                            <p style={{ ...poppins, fontSize: "10px", color: "#9ca3af", marginBottom: "6px" }}>Spend mix</p>
                            <div className="relative mx-auto mt-1 h-14 w-14 rounded-full border-[6px] border-[#F2E6FF] border-t-[#71389A] border-r-[#CB84FF]" />
                            <div className="mt-2 flex items-center gap-1 text-[#71389A]">
                                <Activity className="h-3 w-3" />
                                <span style={{ ...poppins, fontSize: "10px", fontWeight: 600 }}>+24%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

type ResultMetric = StudyData["results"][number];

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
    const { slug } = await params;
    const data = await getStudyData(slug);
    if (!data) return {};
    return {
        title: formatSeoTitle(data.title),
        description: data.subtitle,
    };
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */

export default async function CaseStudyDetailPage({ params }: { params: Promise<PageParams> }) {
    const { slug } = await params;
    const study = await getStudyData(slug);
    if (!study) notFound();

    const poppins: CSSProperties = { fontFamily: "var(--font-poppins), ui-sans-serif" };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>

                {/* ══════════ HERO ══════════ */}
                <section
                    style={{
                        background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 20%, #F4EEFF 55%, #FAF5FF 80%, #FFFFFF 100%)",
                        paddingTop: "clamp(100px, 12vw, 160px)",
                        paddingBottom: "clamp(48px, 6vw, 80px)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div className="max-w-[1240px] mx-auto px-6 relative z-10">

                        {/* Back link */}
                        <Link
                            href="/case-studies"
                            className="group inline-flex items-center gap-2 mb-10 transition-colors"
                            style={{ ...poppins, fontSize: "14px", fontWeight: 400, color: "#606266", textDecoration: "none" }}
                        >
                            <ArrowLeft
                                size={14}
                                strokeWidth={1.8}
                                className="transition-transform duration-200 group-hover:-translate-x-1"
                                style={{ color: "#71389A" }}
                            />
                            <span className="group-hover:text-[#71389A] transition-colors">Back to Case Studies</span>
                        </Link>

                        {/* Category pill */}
                        <div className="mb-6">
                            <div
                                className="inline-flex items-center px-5 py-2 rounded-full bg-white"
                                style={{ border: "1.5px solid #d4cde8", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}
                            >
                                <span style={{ ...poppins, fontSize: "13px", fontWeight: 400, color: "#101011" }}>
                                    {study.category}
                                </span>
                            </div>
                        </div>

                        {/* Title — smaller, font-medium */}
                        <h1
                            style={{
                                ...poppins,
                                fontSize: "clamp(24px, 3.5vw, 40px)",
                                fontWeight: 500,
                                lineHeight: 1.2,
                                letterSpacing: "-0.8px",
                                color: "#101011",
                                marginBottom: "16px",
                                maxWidth: "760px",
                            }}
                        >
                            {study.title}
                        </h1>

                        {/* Subtitle */}
                        <p
                            style={{
                                ...poppins,
                                fontSize: "clamp(14px, 1.6vw, 16px)",
                                fontWeight: 400,
                                color: "#606266",
                                lineHeight: 1.7,
                                maxWidth: "600px",
                                marginBottom: "28px",
                            }}
                        >
                            {study.subtitle}
                        </p>

                        {/* Key result pills */}
                        <div className="flex flex-wrap gap-3 mb-14">
                            {study.keyResults.map((kr, idx) => (
                                <div
                                    key={idx}
                                    className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full"
                                    style={{
                                        border: "1.5px solid #d4cde8",
                                        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                                        ...poppins,
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        color: "#71389A",
                                    }}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ background: "linear-gradient(135deg, #71389A, #CB84FF)" }}
                                    />
                                    {kr}
                                </div>
                            ))}
                        </div>

                        {/* Hero image */}
                        {study.image && (
                            <div
                                className="w-full overflow-hidden"
                                style={{
                                    borderRadius: "24px",
                                    border: "1px solid rgba(113,56,154,0.1)",
                                    boxShadow: "0 24px 64px -16px rgba(113,56,154,0.18), 0 4px 16px rgba(0,0,0,0.06)",
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full aspect-video object-cover"
                                    loading="lazy"
                                    style={{ display: "block" }}
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════════ PROJECT DETAILS — two columns (text + dashboard visual) ══════════ */}
                <section className="border-t border-[#F2E6FF] bg-white py-14 md:py-20">
                    <div className="mx-auto max-w-[1240px] px-6">
                        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
                            {/* Left — dynamic copy */}
                            <div>
                                <h2
                                    style={{
                                        ...poppins,
                                        fontSize: "clamp(22px, 2.8vw, 28px)",
                                        fontWeight: 600,
                                        color: "#101011",
                                        letterSpacing: "-0.5px",
                                        marginBottom: "36px",
                                    }}
                                >
                                    Project Details
                                </h2>

                                <div className="space-y-8">
                                    {study.duration ? (
                                        <div>
                                            <p style={{ ...poppins, fontSize: "14px", fontWeight: 600, color: "#101011", marginBottom: "8px" }}>
                                                Duration
                                            </p>
                                            <p style={{ ...poppins, fontSize: "15px", fontWeight: 400, color: "#606266", lineHeight: 1.6 }}>
                                                {study.duration}
                                            </p>
                                        </div>
                                    ) : null}

                                    {study.industry ? (
                                        <div>
                                            <p style={{ ...poppins, fontSize: "14px", fontWeight: 600, color: "#101011", marginBottom: "8px" }}>
                                                Industry
                                            </p>
                                            <p style={{ ...poppins, fontSize: "15px", fontWeight: 400, color: "#606266", lineHeight: 1.6 }}>
                                                {study.industry}
                                            </p>
                                        </div>
                                    ) : null}

                                    {study.services && study.services.length > 0 ? (
                                        <div>
                                            <p style={{ ...poppins, fontSize: "14px", fontWeight: 600, color: "#101011", marginBottom: "12px" }}>
                                                Services
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {study.services.map((s, i) => (
                                                    <span
                                                        key={i}
                                                        style={{
                                                            ...poppins,
                                                            fontSize: "13px",
                                                            fontWeight: 500,
                                                            color: "#71389A",
                                                            padding: "8px 14px",
                                                            borderRadius: "9999px",
                                                            border: "1px solid #d4d5d8",
                                                            background: "#fff",
                                                        }}
                                                    >
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>

                                {!study.duration && !study.industry && (!study.services || study.services.length === 0) ? (
                                    <p style={{ ...poppins, fontSize: "15px", color: "#9ca3af" }}>Project details will appear here when available.</p>
                                ) : null}
                            </div>

                            {/* Right — decorative dashboard */}
                            <ProjectDetailsDashboardVisual
                                duration={study.duration}
                                industry={study.industry}
                                services={study.services}
                                poppins={poppins}
                            />
                        </div>
                    </div>
                </section>

                {/* ══════════ STORY — full width (no sidebar) ══════════ */}
                <section className="w-full border-t border-[#F2E6FF] bg-white py-16 md:py-24">
                    <div className="mx-auto w-full max-w-[min(100%,1280px)] px-5 sm:px-8 lg:px-12">
                        <div className="mx-auto w-full max-w-[1100px] space-y-14 md:space-y-16">

                            {/* About the Business */}
                            {study.aboutBusiness && (
                                <div>
                                    <h2
                                        style={{
                                            ...poppins,
                                            fontSize: "clamp(20px, 2.2vw, 26px)",
                                            fontWeight: 600,
                                            color: "#101011",
                                            marginBottom: "18px",
                                            letterSpacing: "-0.35px",
                                        }}
                                    >
                                        About the Business
                                    </h2>
                                    <p
                                        style={{
                                            ...poppins,
                                            fontSize: "clamp(15px, 1.5vw, 17px)",
                                            fontWeight: 400,
                                            color: "#4b5563",
                                            lineHeight: 1.85,
                                            whiteSpace: "pre-line",
                                            maxWidth: "100%",
                                        }}
                                    >
                                        {study.aboutBusiness}
                                    </p>
                                </div>
                            )}

                            <div className="h-px w-full bg-[#F2E6FF]" />

                            {/* Challenge */}
                            <div>
                                <h2
                                    style={{
                                        ...poppins,
                                        fontSize: "clamp(20px, 2.2vw, 26px)",
                                        fontWeight: 600,
                                        color: "#101011",
                                        marginBottom: "18px",
                                        letterSpacing: "-0.35px",
                                    }}
                                >
                                    {study.challengeTitle}
                                </h2>
                                <p
                                    style={{
                                        ...poppins,
                                        fontSize: "clamp(15px, 1.5vw, 17px)",
                                        fontWeight: 400,
                                        color: "#4b5563",
                                        lineHeight: 1.85,
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {study.challengeContent}
                                </p>
                            </div>

                            <div className="h-px w-full bg-[#F2E6FF]" />

                            {/* Approach */}
                            <div>
                                <h2
                                    style={{
                                        ...poppins,
                                        fontSize: "clamp(20px, 2.2vw, 26px)",
                                        fontWeight: 600,
                                        color: "#101011",
                                        marginBottom: "18px",
                                        letterSpacing: "-0.35px",
                                    }}
                                >
                                    {study.approachTitle}
                                </h2>
                                {study.approachContent && (
                                    <p
                                        style={{
                                            ...poppins,
                                            fontSize: "clamp(15px, 1.5vw, 17px)",
                                            fontWeight: 400,
                                            color: "#4b5563",
                                            lineHeight: 1.85,
                                            marginBottom: "24px",
                                        }}
                                    >
                                        {study.approachContent}
                                    </p>
                                )}
                                {study.approachPoints.length > 0 && (
                                    <ul className="m-0 list-none p-0">
                                        {study.approachPoints.map((bullet, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-4 border-b border-[#f3f4f6] py-4 last:border-b-0 md:gap-5 md:py-5"
                                            >
                                                <span
                                                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-sm md:h-8 md:w-8"
                                                    style={{
                                                        background: "linear-gradient(145deg, #DDD6FE 0%, #C4B5FD 55%, #A78BFA 100%)",
                                                    }}
                                                    aria-hidden
                                                >
                                                    <Check className="h-3.5 w-3.5 text-white md:h-4 md:w-4" strokeWidth={2.8} />
                                                </span>
                                                <span
                                                    style={{
                                                        ...poppins,
                                                        fontSize: "clamp(15px, 1.45vw, 16px)",
                                                        fontWeight: 400,
                                                        color: "#374151",
                                                        lineHeight: 1.65,
                                                        paddingTop: "2px",
                                                    }}
                                                >
                                                    {bullet}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="h-px w-full bg-[#F2E6FF]" />

                            {/* Solution */}
                            <div>
                                <h2
                                    style={{
                                        ...poppins,
                                        fontSize: "clamp(20px, 2.2vw, 26px)",
                                        fontWeight: 600,
                                        color: "#101011",
                                        marginBottom: "18px",
                                        letterSpacing: "-0.35px",
                                    }}
                                >
                                    {study.solutionTitle}
                                </h2>
                                <p
                                    style={{
                                        ...poppins,
                                        fontSize: "clamp(15px, 1.5vw, 17px)",
                                        fontWeight: 400,
                                        color: "#4b5563",
                                        lineHeight: 1.85,
                                        borderLeft: "3px solid #CB84FF",
                                        paddingLeft: "22px",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {study.solutionContent}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════ RESULTS ══════════ */}
                {study.results.length > 0 && (() => {
                    const raw = study.results.slice(0, 3);
                    const r = raw.map((item, i) => ({
                        ...item,
                        highlight: item.highlight ?? (raw.length === 3 && i === 2),
                    }));
                    const [a, b, c] = r;

                    const iconOval: CSSProperties = {
                        borderRadius: "99px",
                        background: "#fff",
                        border: "1.5px solid rgba(113,56,154,0.18)",
                        padding: "32px 28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    };

                    const metricCard: CSSProperties = {
                        borderRadius: "99px",
                        background: "#EDE9FA",
                        padding: "28px 36px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                    };

                    const highlightCard: CSSProperties = {
                        borderRadius: "99px",
                        background: "linear-gradient(135deg, #8143b2 0%, #B265E6 100%)",
                        padding: "28px 36px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        boxShadow: "0 12px 36px rgba(113,56,154,0.35)",
                    };

                    const metricVal: CSSProperties = {
                        ...poppins,
                        fontSize: "clamp(36px, 4.5vw, 64px)",
                        fontWeight: 500,
                        color: "#71389A",
                        whiteSpace: "nowrap",
                        letterSpacing: "-2px",
                        lineHeight: 1,
                    };

                    const metricValSmall: CSSProperties = { ...metricVal, fontSize: "clamp(30px, 3.8vw, 52px)" };

                    const metricLbl: CSSProperties = { ...poppins, fontSize: "15px", fontWeight: 700, color: "#374151", marginBottom: "5px" };
                    const metricDesc: CSSProperties = { ...poppins, fontSize: "13.5px", color: "#6B7280", lineHeight: 1.5 };
                    const hlLbl: CSSProperties = { ...poppins, fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.9)", marginBottom: "5px" };
                    const hlDesc: CSSProperties = { ...poppins, fontSize: "13.5px", color: "rgba(255,255,255,0.7)", lineHeight: 1.5 };
                    const hlVal: CSSProperties = { ...metricVal, color: "#fff" };

                    return (
                        <section style={{ background: "#FAFAFA", padding: "72px 0" }}>
                            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>

                                <h2
                                    style={{
                                        ...poppins,
                                        fontSize: "clamp(26px, 3.5vw, 40px)",
                                        fontWeight: 600,
                                        color: "#101011",
                                        textAlign: "center",
                                        marginBottom: "48px",
                                        letterSpacing: "-0.5px",
                                    }}
                                >
                                    The Results
                                </h2>

                                {/* Desktop grid — two rows */}
                                <div className="hidden md:flex md:flex-col" style={{ gap: "0" }}>

                                    {/* Row 1 — 1fr : 1.5fr : 1fr */}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr", gap: "0" }}>
                                        {/* Icon — growth */}
                                        <div style={iconOval}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/vectors/growth.svg" alt="" width={56} height={56} style={{ objectFit: "contain" }} />
                                        </div>

                                        {/* Metric 1 */}
                                        <div style={metricCard}>
                                            <span style={metricVal}>{a.value}</span>
                                            <div>
                                                <p style={metricLbl}>{a.label}</p>
                                                <p style={metricDesc}>{a.description}</p>
                                            </div>
                                        </div>

                                        {/* Icon — dollar */}
                                        <div style={iconOval}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src="/vectors/dollar.svg" alt="" width={44} height={56} style={{ objectFit: "contain" }} />
                                        </div>
                                    </div>

                                    {/* Row 2 — 1.5fr : 1fr : 1.5fr */}
                                    {b && (
                                        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr", gap: "0" }}>
                                            {/* Metric 2 */}
                                            <div style={metricCard}>
                                                <span style={metricValSmall}>{b.value}</span>
                                                <div>
                                                    <p style={{ ...metricLbl, fontSize: "14px", marginBottom: "4px" }}>{b.label}</p>
                                                    <p style={{ ...metricDesc, fontSize: "13px" }}>{b.description}</p>
                                                </div>
                                            </div>

                                            {/* Icon — rocket */}
                                            <div style={iconOval}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src="/vectors/rocket.svg" alt="" width={56} height={56} style={{ objectFit: "contain" }} />
                                            </div>

                                            {/* Metric 3 — highlighted */}
                                            {c && (
                                                <div style={c.highlight ? highlightCard : metricCard}>
                                                    <span style={c.highlight ? hlVal : metricValSmall}>{c.value}</span>
                                                    <div>
                                                        <p style={c.highlight ? hlLbl : { ...metricLbl, fontSize: "14px", marginBottom: "4px" }}>{c.label}</p>
                                                        <p style={c.highlight ? hlDesc : { ...metricDesc, fontSize: "13px" }}>{c.description}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Mobile — stacked cards */}
                                <div className="flex flex-col gap-4 md:hidden">
                                    {r.map((item, idx) => (
                                        <div key={idx} style={item.highlight ? highlightCard : { ...metricCard, borderRadius: "20px", padding: "20px 24px" }}>
                                            <span style={{ ...(item.highlight ? hlVal : metricVal), fontSize: "clamp(28px, 7vw, 40px)" }}>{item.value}</span>
                                            <div>
                                                <p style={item.highlight ? hlLbl : metricLbl}>{item.label}</p>
                                                <p style={item.highlight ? hlDesc : metricDesc}>{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    );
                })()}

                {/* ══════════ TESTIMONIAL ══════════ */}
                {study.testimonial && (
                    <section style={{ background: "#fff", paddingTop: "56px", paddingBottom: "56px" }}>
                        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
                            <div
                                className={`grid w-full items-center gap-[clamp(28px,4vw,40px)] overflow-hidden rounded-[20px] bg-[#F0EAFF] px-[clamp(24px,5vw,52px)] py-[clamp(32px,5vw,48px)] ${
                                    study.testimonial.avatar
                                        ? "grid-cols-1 min-[641px]:grid-cols-[minmax(0,1fr)_auto]"
                                        : "grid-cols-1"
                                }`}
                                style={{ position: "relative" }}
                            >
                                <div className="min-w-0 text-center min-[641px]:text-left">
                                    <h3
                                        style={{
                                            ...poppins,
                                            fontSize: "clamp(25px, 2.3vw, 36px)",
                                            fontWeight: 500,
                                            color: "#101011",
                                            marginBottom: "10px",
                                            letterSpacing: "-0.2px",
                                        }}
                                    >
                                        {study.testimonial.name}
                                    </h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            gap: "10px",
                                            marginBottom: "24px",
                                        }}
                                        className="justify-center min-[641px]:justify-start"
                                    >
                                        {study.testimonial.role ? (
                                            <span
                                                style={{
                                                    ...poppins,
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    height: "26px",
                                                    padding: "0 13px",
                                                    borderRadius: "9999px",
                                                    border: "1px solid rgba(113, 56, 154, 0.4)",
                                                    background: "transparent",
                                                    fontSize: "12px",
                                                    fontWeight: 400,
                                                    color: "#71389A",
                                                }}
                                            >
                                                {study.testimonial.role}
                                            </span>
                                        ) : null}
                                        {study.testimonial.company ? (
                                            <span style={{ ...poppins, fontSize: "14px", fontWeight: 400, color: "#374151" }}>
                                                {study.testimonial.company}
                                            </span>
                                        ) : null}
                                    </div>
                                    <div
                                        style={{
                                            height: "1px",
                                            background: "rgba(0, 0, 0, 0.08)",
                                            marginBottom: "24px",
                                            maxWidth: "460px",
                                        }}
                                        className="mx-auto min-[641px]:mx-0"
                                    />
                                    <p
                                        style={{
                                            ...poppins,
                                            fontSize: "13.5px",
                                            color: "#4B5563",
                                            lineHeight: 1.8,
                                            maxWidth: "460px",
                                            fontStyle: "normal",
                                        }}
                                        className="mx-auto text-center min-[641px]:mx-0 min-[641px]:text-left"
                                    >
                                        {study.testimonial.quote}
                                    </p>
                                </div>
                                {study.testimonial.avatar ? (
                                    <div
                                        style={{
                                            position: "relative",
                                            flexShrink: 0,
                                            width: "230px",
                                            height: "230px",
                                        }}
                                        className="mx-auto min-[641px]:mx-0"
                                    >
                                        <div
                                            aria-hidden
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: "220px",
                                                height: "220px",
                                                borderRadius: "50%",
                                                background: "#DDD0F5",
                                                zIndex: 0,
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: "190px",
                                                height: "190px",
                                                borderRadius: "50%",
                                                overflow: "hidden",
                                                zIndex: 1,
                                            }}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={study.testimonial.avatar}
                                                alt={study.testimonial.name}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    objectPosition: "center top",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </section>
                )}

                {/* ══════════ MORE SUCCESS STORIES ══════════ */}
                {study.relatedStudies.length > 0 && (
                    <section className="py-24 bg-white border-t border-[#F2E6FF]">
                        <div className="max-w-[1240px] mx-auto px-6">
                            <div className="flex items-center justify-between mb-12">
                                <h2 style={{ ...poppins, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 500, color: "#101011", letterSpacing: "-0.5px" }}>
                                    More Success Stories
                                </h2>
                                <Link
                                    href="/case-studies"
                                    className="inline-flex items-center gap-1.5 text-[#71389A] hover:underline transition-colors"
                                    style={{ ...poppins, fontSize: "14px", fontWeight: 500 }}
                                >
                                    View All <ArrowRight size={15} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {study.relatedStudies.map((rel) => (
                                    <Link
                                        key={rel.slug}
                                        href={`/case-studies/${rel.slug}`}
                                        className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-[#F2E6FF] hover:border-[#CB84FF]/60 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="h-44 overflow-hidden bg-[#F9F5FF]">
                                            {rel.image && (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={rel.image}
                                                    alt={rel.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            )}
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <span style={{ ...poppins, fontSize: "11px", fontWeight: 600, color: "#A874D4", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", display: "block" }}>
                                                {rel.category}
                                            </span>
                                            <h3 style={{ ...poppins, fontSize: "15px", fontWeight: 600, color: "#101011", lineHeight: 1.45, marginBottom: "16px" }}
                                                className="group-hover:text-[#71389A] transition-colors line-clamp-2">
                                                {rel.title}
                                            </h3>
                                            <div className="mt-auto flex flex-wrap gap-2">
                                                {rel.keyResults.slice(0, 2).map((kr, i) => (
                                                    <span key={i} style={{ ...poppins, fontSize: "11px", fontWeight: 600, background: "#F9F5FF", color: "#71389A", padding: "3px 10px", borderRadius: "99px", border: "1px solid #F2E6FF" }}>
                                                        {kr}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ══════════ FINAL CTA ══════════ */}
                <CTABannerSection />

            </main>
            <Footer />
        </div>
    );
}
