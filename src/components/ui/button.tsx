import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost" | "secondary" | "gradient";
    size?: "sm" | "md" | "lg" | "xl";
    loading?: boolean;
    children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            loading = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const base =
            "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#71389A] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap";

        const variants = {
            primary:
                "bg-[#71389A] text-white hover:bg-[#5e2d84] shadow-[0_4px_14px_rgba(113,56,154,0.3)] hover:shadow-[0_6px_20px_rgba(113,56,154,0.4)] hover:-translate-y-0.5",
            gradient:
                "bg-gradient-to-r from-[#71389A] to-[#CB84FF] text-white shadow-[0_4px_14px_rgba(113,56,154,0.3)] hover:shadow-[0_6px_20px_rgba(113,56,154,0.4)] hover:-translate-y-0.5",
            outline:
                "border-2 border-[#71389A] text-[#71389A] bg-transparent hover:bg-[#71389A] hover:text-white",
            ghost:
                "bg-transparent text-[#71389A] hover:bg-[#FAF5FF]",
            secondary:
                "bg-[#FAF5FF] text-[#71389A] hover:bg-[#f0e6ff]",
        };

        const sizes = {
            sm: "text-xs px-4 py-2 h-8",
            md: "text-sm px-5 py-2.5 h-10",
            lg: "text-base px-7 py-3 h-12",
            xl: "text-lg px-10 py-4 h-14",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(base, variants[variant], sizes[size], className)}
                {...props}
            >
                {loading && (
                    <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
