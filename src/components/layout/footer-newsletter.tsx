"use client";

import { useState } from "react";
import { AnimatedText } from "@/components/ui/animated-button";
import { api } from "@/lib/api";

export function FooterNewsletter() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        setIsLoading(true);

        try {
            await api.newsletterSubscribe(email.trim());
            setSuccessMessage("Successfully subscribed to our newsletter!");
            setEmail("");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong. Please try again later.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 5000);
        }
    };

    return (
        <div>
            <h4 className="text-[16px] font-medium text-[#101011] mb-5">Subscribe for our newsletter</h4>
            <form
                onSubmit={handleSubscribe}
                className="relative w-full max-w-[380px] h-[52px] rounded-full border border-[#e9e0f5] bg-white flex items-center p-1 focus-within:border-[#CB84FF] transition-colors shadow-sm"
            >
                <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full bg-transparent pl-5 pr-4 text-[14px] text-[#101011] placeholder:text-[#a0a0a0] focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="h-full px-8 rounded-full bg-gradient-to-r from-[#8549b0] to-[#ba76ec] text-white font-medium text-[14px] hover:brightness-110 transition-all flex-shrink-0 group disabled:opacity-60"
                >
                    <AnimatedText>{isLoading ? "..." : "Subscribe"}</AnimatedText>
                </button>
            </form>
            {successMessage ? (
                <p className="text-[12px] text-[#71389A] font-medium mt-2">{successMessage}</p>
            ) : null}
            {errorMessage ? (
                <p className="text-[12px] text-red-500 font-medium mt-2">{errorMessage}</p>
            ) : null}
        </div>
    );
}
