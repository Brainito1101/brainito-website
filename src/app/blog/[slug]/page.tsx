import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Twitter, Linkedin, Facebook, Share2, ArrowRight } from "lucide-react";
import { BLOG_POSTS, CARD_GRADIENTS } from "@/lib/blog-data";
import { formatSeoTitle } from "@/lib/page-metadata-defaults";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const post = BLOG_POSTS.find(p => p.slug === params.slug);
    if (!post) return {};

    return {
        title: formatSeoTitle(post.title),
        description: post.excerpt,
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = BLOG_POSTS.find(p => p.slug === params.slug);
    
    if (!post) {
        notFound();
    }

    const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="pt-40 pb-16 bg-gradient-to-b from-[#F9F5FF] to-white">
                    <div className="max-w-[1240px] mx-auto px-6">
                        <Link 
                            href="/blog" 
                            className="inline-flex items-center gap-2 text-[#606266] hover:text-[#71389A] mb-10 transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        <div className="max-w-4xl">
                            <span className="inline-block bg-[#F9F5FF] text-[#71389A] text-[14px] font-semibold px-4 py-1.5 rounded-full mb-6 border border-[#F2E6FF]">
                                {post.category}
                            </span>

                            <h1 className="text-[36px] md:text-[56px] font-bold text-[#101011] mb-8 leading-[1.15] tracking-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-[#606266]">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#71389A] to-[#CB84FF] flex items-center justify-center text-white font-bold text-lg">
                                        {post.author.split(' ')[0][0]}{post.author.split(' ').length > 1 ? post.author.split(' ')[1][0] : ''}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#101011] leading-none mb-1">{post.author}</p>
                                        <p className="text-[13px]">{post.authorRole || 'Marketing Expert'}</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-[1px] h-8 bg-[#F2E6FF]" />
                                <div className="flex items-center gap-2 font-medium text-[14px]">
                                    <Calendar className="w-4 h-4 text-[#9B72C0]" /> {post.date}
                                </div>
                                <div className="hidden sm:block w-[1px] h-8 bg-[#F2E6FF]" />
                                <div className="flex items-center gap-2 font-medium text-[14px]">
                                    <Clock className="w-4 h-4 text-[#9B72C0]" /> {post.readTime}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Image Placeholder */}
                <section className="bg-white">
                    <div className="max-w-[1240px] mx-auto px-6">
                        <div className="max-w-4xl">
                            <div className={`aspect-[21/9] rounded-[32px] bg-gradient-to-br ${CARD_GRADIENTS[0]} border border-[#F2E6FF] flex items-center justify-center`}>
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-[#F2E6FF]">
                                        <Share2 className="w-8 h-8 text-[#71389A]" />
                                    </div>
                                    <span className="text-[18px] font-bold text-[#71389A]/40 uppercase tracking-widest">Article Insight</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-24 bg-white">
                    <div className="max-w-[1240px] mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Share Sidebar */}
                            <aside className="lg:col-span-1 hidden lg:block">
                                <div className="sticky top-32 flex flex-col gap-4">
                                    <p className="text-[12px] font-bold text-[#a0a0a0] uppercase tracking-wider mb-2">Share</p>
                                    <button className="w-12 h-12 rounded-full border border-[#F2E6FF] flex items-center justify-center hover:bg-[#F9F5FF] hover:border-[#CB84FF] transition-all group">
                                        <Twitter className="w-5 h-5 text-[#606266] group-hover:text-[#71389A]" />
                                    </button>
                                    <button className="w-12 h-12 rounded-full border border-[#F2E6FF] flex items-center justify-center hover:bg-[#F9F5FF] hover:border-[#CB84FF] transition-all group">
                                        <Linkedin className="w-5 h-5 text-[#606266] group-hover:text-[#71389A]" />
                                    </button>
                                    <button className="w-12 h-12 rounded-full border border-[#F2E6FF] flex items-center justify-center hover:bg-[#F9F5FF] hover:border-[#CB84FF] transition-all group">
                                        <Facebook className="w-5 h-5 text-[#606266] group-hover:text-[#71389A]" />
                                    </button>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <div className="lg:col-span-8">
                                <article className="prose prose-lg max-w-none">
                                    <p className="text-[20px] text-[#606266] leading-relaxed mb-10 font-medium italic border-l-4 border-[#CB84FF] pl-8 py-2">
                                        {post.excerpt}
                                    </p>

                                    <h2 className="text-[32px] font-bold text-[#101011] mt-12 mb-6 tracking-tight">Introduction</h2>
                                    <p className="text-[#606266] leading-relaxed mb-8">
                                        The landscape of marketing is shifting more rapidly than ever. As we look towards 2025, the integration of artificial intelligence is no longer a luxury but a fundamental necessity for businesses seeking sustainable growth and competitive advantage.
                                    </p>
                                    <p className="text-[#606266] leading-relaxed mb-8">
                                        At Brainito, we've spent thousands of hours analyzing market patterns and business growth trajectories. What we've discovered is that the most successful companies are those that bridge the gap between complex data and actionable strategy through AI-powered clarity.
                                    </p>

                                    <h2 className="text-[32px] font-bold text-[#101011] mt-12 mb-6 tracking-tight">Key Strategies for Growth</h2>
                                    <p className="text-[#606266] leading-relaxed mb-8">
                                        Strategic growth in the modern era requires a multi-faceted approach. It's about understanding not just where your customers are today, but where they will be tomorrow. This predictive capability is where AI truly shines, offering insights that were previously inaccessible to small and medium enterprises.
                                    </p>

                                    <blockquote className="my-12 p-10 bg-[#F9F5FF] rounded-[32px] border border-[#F2E6FF] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                            <Share2 size={60} className="text-[#71389A]" />
                                        </div>
                                        <p className="text-[22px] font-bold text-[#101011] italic relative z-10 leading-snug">
                                            "The future of marketing is built on the foundation of data-driven clarity and the human touch of authentic execution."
                                        </p>
                                    </blockquote>

                                    <h2 className="text-[32px] font-bold text-[#101011] mt-12 mb-6 tracking-tight">Actionable Takeaways</h2>
                                    <ul className="space-y-4 my-8">
                                        <li className="flex items-start gap-4 text-[#606266]">
                                            <div className="w-6 h-6 rounded-full bg-[#CB84FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-[#71389A]" />
                                            </div>
                                            <span>Prioritize data accuracy over quantity to feed your AI models better insights.</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#606266]">
                                            <div className="w-6 h-6 rounded-full bg-[#CB84FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-[#71389A]" />
                                            </div>
                                            <span>Focus on hyper-personalization across all customer touchpoints.</span>
                                        </li>
                                        <li className="flex items-start gap-4 text-[#606266]">
                                            <div className="w-6 h-6 rounded-full bg-[#CB84FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-[#71389A]" />
                                            </div>
                                            <span>Use AI to automate repetitive tasks, freeing up human creativity for strategy.</span>
                                        </li>
                                    </ul>

                                    <h2 className="text-[32px] font-bold text-[#101011] mt-12 mb-6 tracking-tight">Conclusion</h2>
                                    <p className="text-[#606266] leading-relaxed mb-8">
                                        As we wrap up our analysis, the message is clear: the tools for world-class marketing are now accessible to everyone. The differentiator will be how you choose to implement these strategies and the clarity you bring to your business vision.
                                    </p>
                                </article>

                                {/* Author Bio */}
                                <div className="mt-20 p-10 rounded-[32px] bg-[#F9F5FF] border border-[#F2E6FF] flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left transition-all hover:shadow-xl hover:shadow-purple-500/5">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#71389A] to-[#CB84FF] flex items-center justify-center text-white font-bold text-3xl shadow-lg border-4 border-white flex-shrink-0">
                                        {post.author.split(' ')[0][0]}{post.author.split(' ').length > 1 ? post.author.split(' ')[1][0] : ''}
                                    </div>
                                    <div>
                                        <h3 className="text-[24px] font-bold text-[#101011] mb-2">{post.author}</h3>
                                        <p className="text-[#71389A] font-bold text-[14px] uppercase tracking-widest mb-4">About the Author</p>
                                        <p className="text-[#606266] leading-relaxed text-[15px]">
                                            The Brainito team consists of marketing experts and data analysts dedicated to helping businesses grow. We combine human expertise with AI-driven insights to create actionable marketing strategies that deliver measurable results.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                <section className="py-24 bg-white border-t border-[#F2E6FF]">
                    <div className="max-w-[1240px] mx-auto px-6 font-poppins">
                        <h2 className="text-[32px] font-bold text-[#101011] mb-12 tracking-tight">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost, index) => (
                                <Link 
                                    key={relatedPost.slug} 
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#F2E6FF] hover:border-[#CB84FF] hover:shadow-[0_8px_30px_rgba(203,132,255,0.08)] transition-all duration-300"
                                >
                                    <div className={`h-44 bg-gradient-to-br ${CARD_GRADIENTS[(index + 1) % CARD_GRADIENTS.length]}`} />
                                    <div className="p-7">
                                        <span className="inline-block bg-[#F9F5FF] text-[#71389A] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#F2E6FF] mb-4">
                                            {relatedPost.category}
                                        </span>
                                        <h3 className="text-[18px] font-bold text-[#101011] mb-3 group-hover:text-[#71389A] transition-colors line-clamp-2 leading-tight">
                                            {relatedPost.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[12px] text-[#a0a0a0] font-medium">
                                            <Clock className="w-3.5 h-3.5" /> {relatedPost.readTime}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-[#101011] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/20 to-transparent pointer-events-none" />
                    <div className="max-w-[1240px] mx-auto px-6 text-center relative z-10">
                        <h2 className="text-[32px] md:text-[48px] font-bold text-white mb-6 tracking-tight leading-tight">
                            Ready to Transform<br />Your Marketing?
                        </h2>
                        <p className="text-[#a0a0a0] text-[18px] mb-10 max-w-2xl mx-auto">
                            Get your personalized AI-powered marketing strategy today and start growing your business with data-driven clarity.
                        </p>
                        <Link 
                            href="/diy-marketing-plan"
                            className="inline-flex items-center justify-center px-10 h-[64px] rounded-full bg-gradient-to-r from-[#71389A] to-[#ba76ec] text-white font-bold text-[18px] hover:brightness-110 transition-all shadow-2xl shadow-purple-500/20 group"
                        >
                            Get Your Marketing Plan <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
