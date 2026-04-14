import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    as?: "section" | "div";
    variant?: "white" | "alpha" | "gradient" | "dark";
    noPadding?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, as: Tag = "section", variant = "white", noPadding = false, ...props }, ref) => {
        const variants = {
            white: "bg-white",
            alpha: "bg-[#FAF5FF]",
            gradient: "gradient-bg",
            dark: "bg-[#101011]",
        };

        return (
            <Tag
                // @ts-expect-error – polymorphic ref
                ref={ref}
                className={cn(
                    variants[variant],
                    !noPadding && "py-20 px-4 md:px-8",
                    className
                )}
                {...props}
            />
        );
    }
);
Section.displayName = "Section";

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("mx-auto w-full max-w-6xl px-4 md:px-8", className)}
            {...props}
        />
    )
);
Container.displayName = "Container";

const SectionLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span
        className={cn(
            "inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#71389A] bg-[#FAF5FF] border border-[#e9e0f5] rounded-full px-4 py-1.5 mb-4",
            className
        )}
    >
        {children}
    </span>
);

const SectionHeading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h2 className={cn("text-3xl md:text-4xl font-bold text-[#101011] leading-tight", className)}>
        {children}
    </h2>
);

const SectionSubheading = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p className={cn("text-base text-[#606266] leading-relaxed max-w-xl mx-auto", className)}>
        {children}
    </p>
);

export { Section, Container, SectionLabel, SectionHeading, SectionSubheading };
