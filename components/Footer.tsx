"use client";

import Link from "next/link";
import { Gem } from "lucide-react";
import Button from "./Button";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#3f1d14] w-full flex flex-col px-12 md:px-[100px] py-16 md:py-[120px] text-[#c73f3b] gap-12 md:gap-24">
      
      {/* Main Content Row */}
      <div className="w-full flex flex-col md:flex-row justify-between gap-12">
        {/* Left Column: Navigation */}
        <div className="flex flex-col gap-6 font-serif font-bold text-[24px] tracking-wide">
          <Link href="/about" className="hover:text-[#f46b6b] transition-colors">About</Link>
          <Link href="/work" className="hover:text-[#f46b6b] transition-colors flex items-center gap-2">
            <Gem size={24} strokeWidth={2} /> Gems
          </Link>
          <Link href="/#blog" className="hover:text-[#f46b6b] transition-colors">Blog</Link>
          <Link href="#contact" className="hover:text-[#f46b6b] transition-colors">Contact</Link>
        </div>

        {/* Right Column: Subscribe & Brand */}
        <div className="flex flex-col items-start md:items-end gap-16 md:gap-[120px]">
           {/* Subscribe Block */}
           <div className="flex flex-col items-start gap-8 w-full md:w-auto">
              <h2 className="font-serif font-medium text-[36px] md:text-[48px] text-[#f46b6b] leading-none">
                Subscribe For Updates
              </h2>
              
              <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="h-[56px] w-full md:w-[280px] bg-[#ffcbcb] rounded-full px-8 font-sans text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[#f46b6b] transition-all"
                  suppressHydrationWarning
                />
                <div className="w-full md:w-auto">
                  <Button variant="primary" size="lg" rounded={false} className="w-full md:w-auto">
                    Subscribe
                  </Button>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="w-full h-px bg-[#f46b6b]/20" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-white/50 text-sm tracking-widest uppercase w-full">
         <span>© 2026 Nomad Gems. All Rights Reserved. Built By Kea Logic.</span>
         <Link href="https://www.youtube.com/@nomad-gems" target="_blank" rel="noopener noreferrer" className="font-bold text-[#c73f3b] opacity-80 cursor-pointer hover:opacity-100 transition-opacity">Follow on Youtube</Link>
      </div>

    </footer>
  );
}
