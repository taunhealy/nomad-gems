import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Image from "next/image";
import { Wifi, Monitor, Coffee, TreePine, Gem } from "lucide-react";
import LatestGems from "@/components/LatestGems";
import Link from "next/link";
import Button from "@/components/Button";
import BlogSection from "@/components/BlogSection";

const imgCard = "/images/card_img.png";

export default function Home() {
  return (
    <div className="bg-[#fff7f0] content-stretch flex flex-col items-center relative size-full">
      <Navbar />
      <Hero />
      
      {/* Value Prop Section */}
      <div id="about" className="bg-[#3f1d14] content-stretch flex items-start overflow-clip p-[10px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] min-h-auto md:min-h-[542px] py-16 items-center justify-center leading-0 not-italic overflow-clip px-6 md:px-[100px] relative text-center">
          <div className="flex flex-col font-sans font-normal justify-center relative shrink-0 text-[32px] md:text-[48px] text-white w-full tracking-wide">
            <p className="leading-[1.2] whitespace-pre-wrap">Work in nature.</p>
          </div>
          <div className="flex flex-col font-serif font-medium justify-center relative shrink-0 text-[#f46b6b] text-[28px] md:text-[40px] italic w-full">
            <p className="leading-[1.2] whitespace-pre-wrap" style={{ textWrap: "balance" }}>(for digital nomads seeking deep work)</p>
          </div>

          {/* Description */}
          <div className="flex flex-col font-sans font-normal justify-center relative shrink-0 text-[16px] md:text-[18px] text-white/70 max-w-[600px] leading-relaxed mt-4">
            <p>
              Nomad Gems curates exclusive, work-ready sanctuaries designed for the modern professional. 
              Each location is verified for high-speed connectivity, ergonomic comfort, and natural beauty, 
              ensuring you can perform at your best while recharging in nature.
            </p>
          </div>

          {/* Amenities Icons */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-8 items-center justify-center text-[#f46b6b]">
            <Link href="/about#process" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <Wifi size={24} className="md:w-[32px] md:h-[32px]" strokeWidth={1.5} />
              </div>
              <span className="font-sans text-xs md:text-sm font-medium text-white/80">Fast Wifi</span>
            </Link>
            <Link href="/about#process" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <Monitor size={24} className="md:w-[32px] md:h-[32px]" strokeWidth={1.5} />
              </div>
              <span className="font-sans text-xs md:text-sm font-medium text-white/80">Workspace</span>
            </Link>
            <Link href="/about#process" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <Coffee size={24} className="md:w-[32px] md:h-[32px]" strokeWidth={1.5} />
              </div>
              <span className="font-sans text-xs md:text-sm font-medium text-white/80">Coffee</span>
            </Link>
            <Link href="/about#process" className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <TreePine size={24} className="md:w-[32px] md:h-[32px]" strokeWidth={1.5} />
              </div>
              <span className="font-sans text-xs md:text-sm font-medium text-white/80">Nature</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Works / Latest Gems Section */}
      <div id="gems" className="w-full">
        <LatestGems />
      </div>

      {/* Feature Your Retreat Section */}
      <div id="feature" className="bg-white w-full flex flex-col items-center py-16 md:py-[80px] px-6 md:px-[100px]">
        <div className="max-w-[800px] w-full flex flex-col items-center gap-8 md:gap-12 text-center">
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif font-medium text-[40px] md:text-[72px] text-black leading-tight">
              Feature Your Retreat
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] text-[#4a4a4a] leading-relaxed max-w-[600px] mx-auto">
              Own a work-ready retreat in nature? We'd love to feature your property on Nomad Gems. 
              Share your details and we'll get back to you.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="h-[56px] w-full md:w-[380px] bg-[#fff0e6] rounded-full px-8 font-sans text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f46b6b] transition-all border border-[#f46b6b]/20"
            />
            <div className="w-full md:w-auto">
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Optional: Small helper text */}
          <p className="font-sans text-sm text-black/40 italic">
            We typically respond within 24 hours
          </p>
        </div>
      </div>

      {/* Blog Section */}
      <BlogSection />

      {/* Footer Section - Premium Refactor */}
      <div id="contact" className="bg-[#3f1d14] w-full flex flex-col px-12 md:px-[100px] py-16 md:py-[120px] text-[#c73f3b] gap-12 md:gap-24">
        
        {/* Main Content Row */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-12">
          {/* Left Column: Navigation */}
          <div className="flex flex-col gap-6 font-serif font-bold text-[24px] tracking-wide">
            <Link href="/about" className="hover:text-[#f46b6b] transition-colors">About</Link>
            <Link href="/work" className="hover:text-[#f46b6b] transition-colors flex items-center gap-2">
              <Gem size={24} strokeWidth={2} /> Gems
            </Link>
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
           <span className="font-bold text-[#c73f3b] opacity-80 cursor-pointer hover:opacity-100 transition-opacity">Follow on Youtube</span>
        </div>

      </div>
    </div>
  );
}
