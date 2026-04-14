"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { CaseStudy, getRelatedCaseStudies } from "@/lib/case-studies-data";
import { CTABannerSection } from "@/components/sections/cta-banner";
import styles from "./case-study-detail.module.css";

/* ─────────── helpers ─────────── */

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const inView = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

/* ─────────── component ─────────── */

interface CaseStudyDetailProps {
    caseStudy: CaseStudy;
}

export function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
    const related = getRelatedCaseStudies(caseStudy.slug, 3);

    return (
        <>
            {/* ══════════ SECTION 1 — HERO ══════════ */}
            <section className={styles.heroSection}>
                <div className={styles.container}>

                    {/* Back link */}
                    <motion.div {...fadeUp(0)} className={styles.backLinkContainer}>
                        <Link href="/case-studies" className={styles.backLink}>
                            <ArrowLeft size={14} />
                            Back to Case Studies
                        </Link>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        {...fadeUp(0.05)}
                        className={styles.heroTitle}
                    >
                        {caseStudy.category}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        {...fadeUp(0.1)}
                        className={styles.heroSubtitle}
                    >
                        {caseStudy.subtitle}
                    </motion.p>

                    {/* Metric pill tags */}
                    <motion.div
                        {...fadeUp(0.13)}
                        className={styles.metricPills}
                    >
                        {caseStudy.metrics.map((m, i) => (
                            <span key={i} className={styles.metricPill}>
                                {m}
                            </span>
                        ))}
                    </motion.div>

                    {/* Hero image */}
                    <motion.div
                        {...fadeUp(0.16)}
                        className={styles.heroImageContainer}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.category}
                            className={styles.heroImage}
                        />
                    </motion.div>
                </div>
            </section>

            {/* ══════════ SECTION 2 — PROJECT DETAILS ══════════ */}
            <section className={styles.projectDetailsSection}>
                <div className={styles.container}>
                    <div className={styles.projDetailsGrid}>
                        {/* LEFT — labels */}
                        <motion.div {...inView(0)}>
                            <p className={styles.projectDetailsTitle}>
                                Project Details
                            </p>

                            {/* Duration */}
                            <div className={styles.detailItem}>
                                <p className={styles.detailLabel}>Duration</p>
                                <p className={styles.detailValue}>{caseStudy.duration}</p>
                            </div>

                            {/* Industry */}
                            <div className={styles.detailItem}>
                                <p className={styles.detailLabel}>Industry</p>
                                <p className={styles.detailValue}>{caseStudy.industry}</p>
                            </div>

                            {/* Services */}
                            <div>
                                <p className={styles.detailLabel}>Services</p>
                                <div className={styles.servicesWrapper}>
                                    {caseStudy.services.map((s, i) => (
                                        <span key={i} className={styles.serviceBadge}>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT — purple dashboard card */}
                        <motion.div {...inView(0.1)}>
                            <div className={styles.dashboardCard}>
                                {/* Decorative glow */}
                                <div className={styles.decorativeGlow1} />
                                <div className={styles.decorativeGlow2} />

                                {/* Mini dashboard grid */}
                                <p className={styles.dashboardLabel}>Project Overview</p>
                                <div className={styles.miniDashboardGrid}>
                                    {[
                                        { label: "SEO Strategy", icon: "🔍" },
                                        { label: "Paid Ads", icon: "🎯" },
                                        { label: "Social Media", icon: "📱" },
                                        { label: "Email Automation", icon: "✉️" },
                                        { label: "Marketing Performance", icon: "📈" },
                                        { label: "Analytics", icon: "📊" },
                                    ].map((item, i) => (
                                        <div key={i} className={styles.dashboardItem}>
                                            <span className={styles.dashboardItemIcon}>{item.icon}</span>
                                            <span className={styles.dashboardItemLabel}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Metrics row */}
                                <div className={styles.metricsRow}>
                                    {caseStudy.metrics.map((m, i) => (
                                        <div key={i} className={styles.metricBox}>
                                            <p className={styles.metricBoxValue}>{m}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════ SECTION 3 — CONTENT ══════════ */}
            <section className={styles.contentSection}>
                <div className={styles.container}>

                    {/* About the Business */}
                    <motion.div {...inView(0)} className={styles.contentBlock}>
                        <h2 className={styles.sectionHeading}>
                            About the Business
                        </h2>
                        <p className={styles.contentText}>
                            {caseStudy.aboutBusiness}
                        </p>
                    </motion.div>

                    {/* Thin divider */}
                    <div className={styles.divider} />

                    {/* The Challenge */}
                    <motion.div {...inView(0)} className={styles.contentBlock}>
                        <h2 className={styles.sectionHeading}>
                            The Challenge
                        </h2>
                        <p className={styles.contentText}>
                            {caseStudy.theChallenge}
                        </p>
                    </motion.div>

                    {/* Thin divider */}
                    <div className={styles.divider} />

                    {/* Our Approach */}
                    <motion.div {...inView(0)} className={styles.contentBlock}>
                        <h2 className={styles.sectionHeading}>
                            Our Approach
                        </h2>
                        <p className={styles.approachIntro}>
                            {caseStudy.ourApproach.intro}
                        </p>
                        <ul className={styles.approachList}>
                            {caseStudy.ourApproach.bullets.map((bullet, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, ease: "easeOut" }}
                                    className={styles.approachItem}
                                >
                                    <span className={styles.checkCircle}>
                                        <Check size={11} color="#fff" strokeWidth={2.5} />
                                    </span>
                                    {bullet}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Thin divider */}
                    <div className={styles.divider} />

                    {/* The Solution */}
                    <motion.div {...inView(0)}>
                        <h2 className={styles.sectionHeading}>
                            The Solution
                        </h2>
                        <p className={styles.contentText}>
                            {caseStudy.theSolution}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ══════════ SECTION 4 — THE RESULTS ══════════ */}
            <section className={styles.resultsSection}>
                <div className={styles.container}>

                    <motion.h2
                        {...inView(0)}
                        className={styles.resultsHeading}
                    >
                        The Results
                    </motion.h2>

                    {/* Result grid */}
                    <div className={styles.resultsGrid}>

                        {/* ROW 1 */}
                        <div className={`${styles.resultsRow} ${styles.resultsRow1}`}>
                            {/* Cell 1 — Growth icon */}
                            <motion.div
                                {...inView(0)}
                                className={styles.iconOval}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/vectors/growth.svg" alt="Growth" width={56} height={56} className={styles.iconImage} />
                            </motion.div>

                            {/* Cell 2 — Main metric */}
                            <motion.div
                                {...inView(0.08)}
                                className={styles.metricCard}
                            >
                                <span className={styles.metricValue}>
                                    {caseStudy.results[0].metric}
                                </span>
                                <div>
                                    <p className={styles.metricLabel}>{caseStudy.results[0].label}</p>
                                    <p className={styles.metricDescription}>{caseStudy.results[0].description}</p>
                                </div>
                            </motion.div>

                            {/* Cell 3 — Dollar icon */}
                            <motion.div
                                {...inView(0.14)}
                                className={styles.iconOval}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/vectors/dollar.svg" alt="Dollar" width={44} height={56} className={styles.iconImage} />
                            </motion.div>
                        </div>

                        {/* ROW 2 */}
                        <div className={`${styles.resultsRow} ${styles.resultsRow2}`}>
                            {/* Cell 4 — ROAS metric */}
                            <motion.div
                                {...inView(0.06)}
                                className={styles.metricCard}
                            >
                                <span className={`${styles.metricValue} ${styles.metricValueSmall}`}>
                                    {caseStudy.results[1].metric}
                                </span>
                                <div>
                                    <p className={`${styles.metricLabel} ${styles.metricLabelSmall}`}>{caseStudy.results[1].label}</p>
                                    <p className={`${styles.metricDescription} ${styles.metricDescriptionSmall}`}>{caseStudy.results[1].description}</p>
                                </div>
                            </motion.div>

                            {/* Cell 5 — Rocket icon */}
                            <motion.div
                                {...inView(0.12)}
                                className={styles.iconOval}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/vectors/rocket.svg" alt="Rocket" width={56} height={56} className={styles.iconImage} />
                            </motion.div>

                            {/* Cell 6 — Highlight metric */}
                            <motion.div
                                {...inView(0.18)}
                                className={styles.highlightMetricCard}
                            >
                                <span className={styles.highlightMetricValue}>
                                    {caseStudy.results[2].metric}
                                </span>
                                <div>
                                    <p className={styles.highlightMetricLabel}>{caseStudy.results[2].label}</p>
                                    <p className={styles.highlightMetricDescription}>{caseStudy.results[2].description}</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ SECTION 5 — TESTIMONIAL CARD ══════════ */}
            {caseStudy.testimonial && (
                <section className={styles.testimonialSection}>
                    <div className={styles.container}>
                        <motion.div
                            {...inView(0)}
                            className={styles.testimonialCard}
                        >
                            {/* LEFT — text content */}
                            <div style={{ position: "relative", zIndex: 1 }}>
                                {/* Name */}
                                <h3 className={styles.testimonialName}>
                                    {caseStudy.testimonial.name}
                                </h3>

                                {/* Role badge + Company */}
                                <div className={styles.roleBadgeRow}>
                                    <span className={styles.roleBadge}>
                                        {caseStudy.testimonial.role}
                                    </span>
                                    <span className={styles.companyName}>
                                        {caseStudy.testimonial.company}
                                    </span>
                                </div>

                                {/* Quote */}
                                <p className={styles.testimonialQuote}>
                                    &quot;{caseStudy.testimonial.quote}&quot;
                                </p>
                            </div>

                            {/* RIGHT — avatar */}
                            <div className={styles.avatarWrapper}>
                                <div className={styles.avatarBlob} />
                                <div className={styles.photoCircle}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={caseStudy.testimonial.avatar}
                                        alt={caseStudy.testimonial.name}
                                        className={styles.avatarImage}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ══════════ SECTION 6 — MORE SUCCESS STORIES ══════════ */}
            <section className={styles.moreStoriesSection}>
                <div className={styles.container}>
                    <motion.h2
                        {...inView(0)}
                        className={styles.moreStoriesHeading}
                    >
                        More Success Stories
                    </motion.h2>

                    <div className={styles.storiesGrid}>
                        {related.map((study, i) => (
                            <motion.div
                                key={study.slug}
                                {...inView(i * 0.08)}
                            >
                                <Link href={`/case-studies/${study.slug}`} className={styles.storyCard}>
                                    {/* Image */}
                                    <div className={styles.storyImageWrapper}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={study.image}
                                            alt={study.category}
                                            className={styles.storyImage}
                                        />
                                    </div>
                                    {/* Content */}
                                    <div className={styles.storyContent}>
                                        <span className={styles.storyCategory}>
                                            {study.category}
                                        </span>
                                        <h3 className={styles.storyTitle}>
                                            {study.title}
                                        </h3>
                                        <div className={styles.readMoreBtn}>
                                            Read More <ArrowUpRight size={12} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* View all CTA */}
                    <motion.div {...inView(0.2)} className={styles.viewAllContainer}>
                        <Link href="/case-studies" style={{ textDecoration: "none" }}>
                            <button className={styles.viewAllBtn}>
                                View all Case Studies
                                <ArrowUpRight size={15} />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ══════════ CTA BANNER ══════════ */}
            <CTABannerSection />
        </>
    );
}
