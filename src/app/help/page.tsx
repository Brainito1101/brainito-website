import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Search, Mail, MessageCircle, Zap, FileText, Users, CreditCard } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
    {
        icon: Zap,
        title: "Getting Started",
        description: "Learn the basics of using Brainito",
        questions: [
            {
                question: "How do I get started with Brainito?",
                answer: "Simply enter your website URL on our homepage or DIY Marketing Plan page, and our AI will analyze your website to create a personalized marketing strategy."
            },
            {
                question: "What information do I need to provide?",
                answer: "You only need to provide your website URL to get started. Our AI will analyze your site and create a customized marketing plan based on your business, industry, and target audience."
            },
            {
                question: "How long does the analysis take?",
                answer: "The initial analysis typically takes 2-3 minutes. You'll receive a comprehensive marketing audit report immediately after the analysis is complete."
            },
            {
                question: "Is there a free trial available?",
                answer: "Yes! We offer a free AI-powered marketing audit that gives you a preview of our capabilities. You can upgrade to a full plan anytime to access the complete strategy."
            }
        ]
    },
    {
        icon: FileText,
        title: "DIY Marketing Plan",
        description: "Help with your marketing plan",
        questions: [
            {
                question: "What's included in the DIY Marketing Plan?",
                answer: "The DIY Marketing Plan includes a comprehensive 9-module strategy covering website analysis, competitor research, content calendar, SEO recommendations, social media strategy, and more."
            },
            {
                question: "Can I customize my marketing plan?",
                answer: "Yes, the DIY plan provides recommendations tailored to your business. You can prioritize different modules and adapt strategies based on your specific goals and resources."
            },
            {
                question: "How often is the plan updated?",
                answer: "Your marketing plan is continuously updated with fresh insights. You can also request a re-analysis anytime to reflect changes in your business or market conditions."
            },
            {
                question: "Do I get access to templates and tools?",
                answer: "Absolutely! The DIY plan comes with ready-to-use templates for content calendars, social media posts, email campaigns, and more to help you execute your strategy efficiently."
            }
        ]
    },
    {
        icon: Users,
        title: "Hire a Marketer",
        description: "Working with your dedicated marketer",
        questions: [
            {
                question: "How does the Hire a Marketer service work?",
                answer: "When you hire a marketer through Brainito, we match you with a dedicated marketing professional who executes your strategy with daily check-ins and full transparency."
            },
            {
                question: "How do I contact my assigned marketer?",
                answer: "Once matched with a marketer, you'll have direct communication channels including chat, email, and scheduled video calls for strategy reviews."
            },
            {
                question: "What tasks can my marketer help with?",
                answer: "Your dedicated marketer handles everything from content creation and social media management to SEO optimization, paid advertising, email marketing, and performance reporting."
            },
            {
                question: "Can I change my marketer if needed?",
                answer: "Yes, if you feel the fit isn't right, you can request a new marketer. Our priority is ensuring you have the best possible partnership for your business goals."
            },
            {
                question: "How do I track my marketer's work?",
                answer: "You'll receive daily updates, weekly reports, and access to a real-time dashboard showing all activities, deliverables, and performance metrics."
            }
        ]
    },
    {
        icon: CreditCard,
        title: "Billing & Plans",
        description: "Payments, subscriptions, and refunds",
        questions: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, and UPI payments. Enterprise clients can also pay via bank transfer."
            },
            {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. Please refer to our Refund Policy for details on refunds and cancellation terms."
            },
            {
                question: "Do you offer refunds?",
                answer: "We offer refunds based on our Refund Policy. Generally, refunds are available within the first 7 days if you're not satisfied with our service. See our Refund Policy page for complete details."
            },
            {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle."
            },
            {
                question: "How do I update my billing information?",
                answer: "You can update your payment method and billing details through your account settings or by contacting our support team."
            }
        ]
    }
];

import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/help");
}

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="pt-40 pb-20 bg-gradient-to-b from-[#F9F5FF] to-white border-b border-[#F2E6FF]">
                    <div className="max-w-[1240px] mx-auto px-6 text-center">
                        <h1 className="text-[40px] md:text-[56px] font-bold text-[#101011] mb-6 tracking-tight">
                            Help & Support
                        </h1>
                        <p className="text-[18px] text-[#606266] max-w-2xl mx-auto mb-10">
                            Find answers to your questions or get in touch with our support team.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B72C0] transition-colors group-focus-within:text-[#71389A]" />
                            <input 
                                type="text"
                                placeholder="Search for help..." 
                                className="w-full h-14 pl-14 pr-6 rounded-full border border-[#F2E6FF] bg-white text-[#101011] placeholder:text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-[#CB84FF]/20 focus:border-[#CB84FF] transition-all"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories & Questions */}
                <section className="py-24 bg-white">
                    <div className="max-w-[800px] mx-auto px-6 space-y-20">
                        {categories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="scroll-mt-32" id={category.title.toLowerCase().replace(/\s+/g, '-')}>
                                {/* Category Header */}
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 rounded-2xl bg-[#F9F5FF] flex items-center justify-center flex-shrink-0 border border-[#F2E6FF]">
                                        <category.icon className="w-8 h-8 text-[#71389A]" />
                                    </div>
                                    <div>
                                        <h2 className="text-[22px] font-bold text-[#101011]">{category.title}</h2>
                                        <p className="text-[15px] text-[#606266] font-normal">{category.description}</p>
                                    </div>
                                </div>

                                {/* Questions Accordion */}
                                <Accordion type="single" collapsible className="space-y-4">
                                    {category.questions.map((faq, faqIndex) => (
                                        <AccordionItem 
                                            key={faqIndex} 
                                            value={`item-${categoryIndex}-${faqIndex}`}
                                            className="bg-white rounded-2xl border border-[#F2E6FF] px-7 data-[state=open]:border-[#CB84FF] data-[state=open]:shadow-[0_4px_20px_rgba(203,132,255,0.08)] transition-all"
                                        >
                                            <AccordionTrigger className="text-left text-[16px] font-semibold text-[#101011] hover:text-[#71389A] hover:no-underline py-5">
                                                {faq.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-[#606266] text-[15px] leading-relaxed pb-6">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Support */}
                <section className="py-24 bg-[#F9F5FF] border-t border-[#F2E6FF]">
                    <div className="max-w-[1240px] mx-auto px-6 text-center">
                        <h2 className="text-[32px] md:text-[40px] font-bold text-[#101011] mb-5 tracking-tight">
                            Still Need Help?
                        </h2>
                        <p className="text-[16px] text-[#606266] mb-10 max-w-xl mx-auto">
                            Our support team is here to help you with any questions or issues.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
                            <a 
                                href="mailto:support@brainito.com"
                                className="inline-flex items-center justify-center px-10 h-[56px] rounded-full bg-gradient-to-r from-[#71389A] to-[#ba76ec] text-white font-semibold text-[16px] hover:brightness-110 transition-all shadow-lg shadow-[#71389A]/20"
                            >
                                <Mail className="mr-2.5 w-5 h-5" /> Email Support
                            </a>
                            <a 
                                href="/contact"
                                className="inline-flex items-center justify-center px-10 h-[56px] rounded-full border-2 border-[#101011] text-[#101011] font-semibold text-[16px] hover:bg-[#101011] hover:text-white transition-all"
                            >
                                <MessageCircle className="mr-2.5 w-5 h-5" /> Contact Us
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
