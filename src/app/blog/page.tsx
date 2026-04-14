import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS, CARD_GRADIENTS } from "@/lib/blog-data";

import { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("/blog");
}

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="pt-40 pb-20 bg-gradient-to-b from-[#F9F5FF] to-white border-b border-[#F2E6FF]">
                    <div className="max-w-[1240px] mx-auto px-6 text-center">
                        <h1 className="text-[40px] md:text-[56px] font-bold text-[#101011] mb-6 tracking-tight">
                            Brainito Blog
                        </h1>
                        <p className="text-[18px] text-[#606266] max-w-3xl mx-auto">
                            Insights, strategies, and tips to help you grow your business with smarter marketing.
                        </p>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-24 bg-white">
                    <div className="max-w-[1240px] mx-auto px-6">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-[32px] font-bold text-[#101011] tracking-tight">Latest Articles</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {BLOG_POSTS.map((post, index) => (
                                <Link 
                                    key={post.slug} 
                                    href={`/blog/${post.slug}`}
                                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#F2E6FF] hover:border-[#CB84FF] hover:shadow-[0_8px_30px_rgba(203,132,255,0.08)] transition-all duration-300"
                                >
                                    <div className={`h-52 bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]}`} />
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="inline-block bg-[#F9F5FF] text-[#71389A] text-[12px] font-semibold px-3 py-1 rounded-full border border-[#F2E6FF]">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-[20px] font-bold text-[#101011] mb-3 line-clamp-2 leading-snug group-hover:text-[#71389A] transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-[#606266] text-[15px] mb-6 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center gap-5 text-[13px] text-[#a0a0a0] font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" /> {post.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-4 h-4" /> {post.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-24 bg-[#F9F5FF] border-t border-[#F2E6FF]">
                    <div className="max-w-[1240px] mx-auto px-6 text-center">
                        <h2 className="text-[32px] md:text-[40px] font-bold text-[#101011] mb-5 tracking-tight">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-[16px] text-[#606266] mb-10 max-w-xl mx-auto">
                            Get the latest marketing insights and tips delivered straight to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 h-[56px] px-6 rounded-full border border-[#F2E6FF] bg-white focus:outline-none focus:ring-2 focus:ring-[#CB84FF]/20 focus:border-[#CB84FF] transition-all"
                            />
                            <button className="h-[56px] px-10 rounded-full bg-[#101011] text-white font-semibold text-[16px] hover:bg-black transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
