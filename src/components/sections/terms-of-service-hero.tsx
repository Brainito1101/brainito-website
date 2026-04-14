import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalHeroProps {
  title: string;
  lastUpdated: string;
  subtitle?: string;
  description: string | React.ReactNode;
  activePolicy: string;
}

export function TermsOfServiceHero({
  title,
  lastUpdated,
  subtitle,
  description,
  activePolicy,
}: LegalHeroProps) {
  const policies = [
    { text: "Terms of Service", slug: "terms-of-service" },
    { text: "Privacy Policy", slug: "privacy-policy" },
    { text: "Privacy Policy for California Residents", slug: "privacy-policy-for-california-residents" },
    { text: "Cookie Policy", slug: "cookie-policy" },
    { text: "Data Processing Agreement (DPA)", slug: "data-processing-agreement-dpa" },
    { text: "Refund & Payment Terms", slug: "refund-payment-terms" },
    { text: "Acceptable Use / Anti-Spam Policy", slug: "acceptable-use-anti-spam-policy" },
    { text: "Other Essential Policies", slug: "other-essential-policies" },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#FAF5FF] via-[#FDFBFF] to-white pt-32 pb-16">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="w-full">
          {/* Back Link */}
          <Link
            href="/#legal"
            className="inline-flex items-center text-[#606266] text-[15px] hover:text-[#101011] mb-12 transition-colors font-normal"
          >
            <ArrowLeft className="w-[15px] h-[15px] mr-[6px]" />
            Back to Legal
          </Link>

          {/* Title */}
          <h1 className="text-[2.75rem] md:text-[3.5rem] font-medium text-[#71389A] mb-8 tracking-tight leading-tight">
            {title}
          </h1>

          {/* Date */}
          <p className="text-[#606266] mb-8 text-[15px] font-normal">
            Last Updated: {lastUpdated}
          </p>

          {/* Conditionally rendered Subtitle */}
          {subtitle && (
            <p className="text-[#A465D8] text-base mb-4 font-normal">
              {subtitle}
            </p>
          )}

          {/* Description */}
          <div className="text-[#606266] text-[15px] mb-12 leading-relaxed max-w-5xl font-normal">
            {description}
          </div>
        </div>

        {/* Policy Pills */}
        <div className="flex flex-wrap gap-x-3 gap-y-3 mt-4">
          {policies.map((pill, index) => {
            const isActive = pill.text === activePolicy;
            return (
              <Link
                key={index}
                href={`/${pill.slug}`}
                className={`px-5 py-2 rounded-full border text-[13.5px] font-normal transition-colors ${
                  isActive
                    ? "border-[#71389A] text-[#71389A] bg-white shadow-sm hover:bg-[#FAF5FF]"
                    : "border-gray-200/80 text-[#828487] hover:border-gray-300 hover:bg-gray-50 bg-white"
                }`}
              >
                {pill.text}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
