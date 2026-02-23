"use client";

import { use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { post, prevPost, nextPost } = useMemo(() => {
    const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
    
    if (currentIndex === -1) return { post: null, prevPost: null, nextPost: null };

    return {
      post: BLOG_POSTS[currentIndex],
      prevPost: currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null,
      nextPost: currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null,
    };
  }, [slug]);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#fff7f0] min-h-screen flex flex-col relative w-full">
      <Navbar />

      <main className="flex-1 flex flex-col items-center py-[120px] px-6 md:px-[100px]">
        <article className="max-w-[800px] w-full flex flex-col gap-10">
          {/* Back Link */}
          <Link
            href="/#blog"
            className="flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-black/50 hover:text-black transition-colors self-start group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to articles
          </Link>

          {/* Hero Image */}
          <div className="relative w-full aspect-video rounded-[12px] overflow-hidden shadow-sm">
            <Image
              alt={post.title}
              src={post.image}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Header */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4 font-sans text-xs uppercase tracking-widest text-black/40">
              <span className="px-3 py-1 bg-[#f46b6b]/10 text-[#f46b6b] rounded-full font-semibold">
                {post.category}
              </span>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-black/20" />
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <h1 className="font-serif font-medium text-[40px] md:text-[56px] text-black leading-tight tracking-tight">
              {post.title}
            </h1>

            <p className="font-sans text-xl text-black/60 leading-relaxed border-l-4 border-[#f46b6b] pl-6">
              {post.excerpt}
            </p>
          </div>

          <div className="w-full h-px bg-black/10 my-2" />

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {post.sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-4">
                <h2 className="font-serif font-medium text-[28px] text-black leading-tight">
                  {section.heading}
                </h2>
                <p className="font-sans text-[18px] text-black/70 leading-[1.8] whitespace-pre-wrap">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-black/10 mt-8" />

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 pt-8">
            {/* Previous Post */}
            <div className="flex-1">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group flex flex-col gap-2 p-6 rounded-lg border border-black/5 hover:border-[#f46b6b]/30 hover:bg-white transition-all h-full"
                >
                  <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-black/40 group-hover:text-[#f46b6b] transition-colors">
                    <ArrowLeft size={14} />
                    Previous Article
                  </div>
                  <span className="font-serif text-xl text-black leading-tight group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="h-full flex items-center p-6 text-black/20 font-sans text-xs uppercase tracking-widest select-none">
                  First Article
                </div>
              )}
            </div>

            {/* Next Post */}
            <div className="flex-1">
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex flex-col gap-2 p-6 rounded-lg border border-black/5 hover:border-[#f46b6b]/30 hover:bg-white transition-all h-full items-end text-right"
                >
                  <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-black/40 group-hover:text-[#f46b6b] transition-colors">
                    Next Article
                    <ArrowRight size={14} />
                  </div>
                  <span className="font-serif text-xl text-black leading-tight group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div className="h-full flex items-center justify-end p-6 text-black/20 font-sans text-xs uppercase tracking-widest select-none">
                  Latest Article
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
