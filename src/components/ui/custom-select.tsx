"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectOption {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function CustomSelect({ options, placeholder, value, onChange, className }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-[48px] rounded-[99px] bg-[#F3F4F6] flex items-center justify-between px-6 transition-colors shadow-none outline-none"
                style={{
                    border: isOpen ? "1px solid #71389A" : "1px solid transparent",
                    fontFamily: "var(--font-poppins)",
                    fontSize: "14px",
                    color: selectedOption ? "#111827" : "#6B7280",
                }}
            >
                <span>{selectedOption ? selectedOption.label : placeholder}</span>
                <ChevronDown
                    size={16}
                    color="#6B7280"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease-in-out",
                    }}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-full mt-2 bg-[#F3F4F6] rounded-[24px] p-2 shadow-lg"
                        style={{ border: "1px solid rgba(0,0,0,0.05)" }}
                    >
                        <ul className="flex flex-col w-full">
                            {options.map((option) => {
                                const isSelected = value === option.value;
                                return (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange(option.value);
                                                setIsOpen(false);
                                            }}
                                            className="w-full flex items-center px-4 py-2 rounded-full text-left transition-colors"
                                            style={{
                                                backgroundColor: isSelected ? "#71389A" : "transparent",
                                                color: isSelected ? "#FFFFFF" : "#4B5563",
                                                fontFamily: "var(--font-poppins)",
                                                fontSize: "14px",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)";
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected) {
                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                }
                                            }}
                                        >
                                            <span className="mr-2">&bull;</span>
                                            {option.label}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
