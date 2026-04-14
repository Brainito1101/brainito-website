import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function AnimatedText({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <span
            className={cn(
                "relative flex flex-col overflow-hidden leading-[1.2em]",
                className
            )}
            style={style}
        >
            <span className="flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                {children}
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-full group-hover:translate-y-0">
                {children}
            </span>
        </span>
    );
}

export function AnimatedIcon({
    icon,
    className,
    iconColor = "#101011",
}: {
    icon?: React.ReactNode;
    className?: string;
    iconColor?: string;
}) {
    return (
        <span
            className={cn(
                "relative z-10 rounded-full bg-white transition-all duration-500 overflow-hidden block flex-shrink-0",
                className
            )}
            style={{
                width: "30px",
                height: "30px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                color: iconColor,
            }}
        >
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-full">
                {icon || <ArrowUpRight size={15} strokeWidth={2} style={{ color: iconColor }} />}
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -translate-x-full group-hover:translate-x-0">
                {icon || <ArrowUpRight size={15} strokeWidth={2} style={{ color: iconColor }} />}
            </span>
        </span>
    );
}

export function AnimatedButton({
    children,
    className,
    as: Component = "button",
    ...props
}: any) {
    return (
        <Component className={cn("group transition-all duration-300", className)} {...props}>
            <AnimatedText>{children}</AnimatedText>
        </Component>
    );
}
