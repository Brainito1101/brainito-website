import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", icon, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-1">
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#606266]">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        ref={ref}
                        className={cn(
                            "w-full rounded-full border border-[#e9e0f5] bg-white px-5 py-3 text-sm text-[#101011] placeholder:text-[#a0a0a0] outline-none transition-all duration-200",
                            "focus:border-[#71389A] focus:ring-2 focus:ring-[#71389A]/20",
                            "disabled:cursor-not-allowed disabled:opacity-60",
                            icon && "pl-10",
                            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs text-red-500 px-2">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
