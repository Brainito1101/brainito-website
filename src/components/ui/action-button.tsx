"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedText, AnimatedIcon } from "@/components/ui/animated-button";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactNode;
    /** Merged into the label span; use for responsive type (e.g. `text-sm md:text-[17px]`). */
    textClassName?: string;
}

export function ActionButton({
    children,
    className,
    icon,
    textClassName,
    ...props
}: ActionButtonProps) {
    return (
        <button
            className={cn(
                "group relative inline-flex items-center justify-center gap-3",
                "px-8 rounded-full overflow-hidden transition-all duration-300",
                className
            )}
            style={{
                height: "56px",
                // Matching the exact vibrant purple gradient and border
                background: "linear-gradient(to top right, #B265E6 0%, #71389A 100%)",
                border: "1px solid #7A3FAD",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(113, 56, 154, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(113, 56, 154, 0.4), inset 0 1px 0 rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(113, 56, 154, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)";
            }}
            {...props}
        >
            <AnimatedText
                className={cn(
                    "relative z-10 [font-family:var(--font-poppins),ui-sans-serif] font-normal tracking-[0.2px]",
                    textClassName ?? "text-[17px]"
                )}
            >
                {children}
            </AnimatedText>

            <AnimatedIcon
                className="ml-[6px]"
                iconColor="#8E4DBB"
                icon={icon}
            />
        </button>
    );
}
