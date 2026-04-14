"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Search, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const loadingSteps = [
    {
        icon: Search,
        text: "Scanning website structure...",
        duration: 4000,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        icon: BarChart3,
        text: "Analyzing traffic & SEO metrics...",
        duration: 15000,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        icon: ShieldCheck,
        text: "Evaluating trust factors...",
        duration: 10000,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        icon: Zap,
        text: "Generating AI recommendations...",
        duration: 12000,
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        icon: CheckCircle2,
        text: "Finalizing report...",
        duration: 5000,
        color: "text-primary",
        bg: "bg-primary/10"
    }
];

export function ReportGenerationLoader() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalTime = 200;
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return 95;
                let increment = 0;
                if (prev < 20) {
                    increment = Math.random() * 1.5 + 0.5;
                } else if (prev < 60) {
                    increment = Math.random() * 0.4 + 0.1;
                } else {
                    increment = Math.random() * 0.2 + 0.05;
                }
                return Math.min(prev + increment, 95);
            });
        }, intervalTime);
        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const runSteps = (index: number) => {
            if (index >= loadingSteps.length) return;
            setCurrentStep(index);
            const stepDuration = loadingSteps[index].duration;
            timeoutId = setTimeout(() => {
                runSteps(index + 1);
            }, stepDuration);
        };
        runSteps(0);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const currentStepData = loadingSteps[Math.min(currentStep, loadingSteps.length - 1)];
    const CurrentIcon = currentStepData.icon;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="w-full max-w-md mx-4 p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden bg-white/10 backdrop-blur-md">

                {/* Glowing Background Orbs inside the card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/30 rounded-full blur-[80px] pointer-events-none animate-pulse" />

                {/* Dynamic Icon Animation */}
                <div className="relative mb-8 mt-2">
                    {/* Rotating border/ring effect */}
                    <div className="absolute inset-0 -m-4 border-2 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 -m-4 border-2 border-white/10 rounded-full" />

                    <div className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 relative bg-gradient-to-br from-white/20 to-white/5 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                    )}>
                        <CurrentIcon
                            className={cn(
                                "w-10 h-10 transition-all duration-500 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            )}
                        />

                        {/* Pulse rings */}
                        <div className="absolute inset-0 rounded-full border border-white/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    </div>
                </div>

                {/* Main Text */}
                <h3 className="text-2xl font-bold mb-3 text-white tracking-tight drop-shadow-md">
                    Generating Your Audit
                </h3>

                {/* Step Text */}
                <p className="text-white/80 mb-8 h-6 text-lg font-medium animate-pulse">
                    {currentStepData.text}
                </p>

                {/* Progress Bar Container */}
                <div className="w-full h-3 rounded-full overflow-hidden relative bg-black/20 backdrop-blur-sm border border-white/10">
                    <div
                        className="absolute top-0 left-0 h-full transition-all duration-300 ease-out bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite] w-full transform -skew-x-12" />
                    </div>
                </div>

                {/* Percentage & Footer */}
                <div className="flex justify-between w-full mt-3 px-1">
                    <span className="text-xs font-medium text-white/50 tracking-wider uppercase">AI Analysis</span>
                    <span className="text-xs font-bold text-white/90">{Math.round(progress)}%</span>
                </div>

                {/* Step dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {loadingSteps.map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-500",
                                index <= currentStep
                                    ? "bg-white w-4 blur-[0.5px] shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                                    : "bg-white/20"
                            )}
                        />
                    ))}
                </div>
            </div>
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
