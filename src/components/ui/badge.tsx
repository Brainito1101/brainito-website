import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "soft" | "outline" | "gradient";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variants = {
            default:
                "bg-[#71389A] text-white",
            soft:
                "bg-[#FAF5FF] text-[#71389A] border border-[#e9e0f5]",
            outline:
                "border border-[#71389A] text-[#71389A] bg-transparent",
            gradient:
                "bg-gradient-to-r from-[#71389A] to-[#CB84FF] text-white",
        };

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);
Badge.displayName = "Badge";

export { Badge };
