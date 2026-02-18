"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BlogPost } from "../lib/blog-data";

const BLOG_FILTERS = ["All", "Owners", "Nomads"] as const;
type BlogFilter = (typeof BLOG_FILTERS)[number];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group cursor-pointer flex flex-col gap-4"
    >
      {/* Image */}
      <div className="relative w-full aspect-16/10 rounded-[12px] overflow-hidden bg-gray-200">
        <Image
          alt={post.title}
          src={post.image}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full font-sans text-xs font-semibold uppercase tracking-widest text-black/70">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-black/40">
          <span>{post.readTime}</span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <h3 className="font-serif text-2xl lg:text-3xl tracking-tighter leading-tight text-black group-hover:underline decoration-1 underline-offset-4 transition-all">
          {post.title}
        </h3>
        <p className="font-sans text-sm text-black/60 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>("All");

  const filteredPosts =
    activeFilter === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeFilter);

  return (
    <div
      id="blog"
      className="bg-[#fff7f0] w-full flex flex-col items-center py-16 md:py-[120px] px-6 md:px-[100px] gap-8 md:gap-[60px]"
    >
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <div className="w-full flex flex-col gap-6 items-start text-black mb-8 md:mb-[60px]">
          <h2 className="font-serif font-medium text-[40px] md:text-[72px] leading-tight">
            Insights
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] leading-relaxed max-w-[540px]">
            Practical strategies for retreat owners looking to maximise
            occupancy and attract the right guests.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {BLOG_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-sans text-sm font-semibold uppercase tracking-widest cursor-pointer transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#f46b6b] text-white"
                    : "bg-black/5 text-black/50 hover:bg-black/10 hover:text-black/70"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

