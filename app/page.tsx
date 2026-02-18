import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Image from "next/image";
import { Wifi, Monitor, Coffee, TreePine } from "lucide-react";
import LatestGems from "@/components/LatestGems";
import Button from "@/components/Button";

const imgCard = "/images/card_img.png";

export default function Home() {
  return (
    <div className="bg-[#fff7f0] content-stretch flex flex-col items-center relative size-full">
      <Navbar />
      <Hero />
      
      {/* Value Prop Section */}
      <div id="about" className="bg-white content-stretch flex items-start overflow-clip p-[10px] relative shrink-0 w-full">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] min-h-[542px] py-16 items-center justify-center leading-[0] not-italic overflow-clip px-[100px] relative text-center">
          <div className="flex flex-col font-sans font-normal justify-center relative shrink-0 text-[48px] text-black w-full tracking-tighter">
            <p className="leading-[1.2] whitespace-pre-wrap">Work in nature.</p>
          </div>
          <div className="flex flex-col font-serif font-medium justify-center relative shrink-0 text-[#8c8c8c] text-[40px] italic w-full">
            <p className="leading-[1.2] whitespace-pre-wrap">(for digital nomads seeking deep work)</p>
          </div>

          {/* Description */}
          <div className="flex flex-col font-sans font-normal justify-center relative shrink-0 text-[18px] text-[#4a4a4a] max-w-[600px] leading-relaxed mt-4">
            <p>
              Nomad Gems curates exclusive, work-ready sanctuaries designed for the modern professional. 
              Each location is verified for high-speed connectivity, ergonomic comfort, and natural beauty, 
              ensuring you can perform at your best while recharging in nature.
            </p>
          </div>

          {/* Amenities Icons */}
          <div className="flex gap-12 mt-8 items-center justify-center text-[#f46b6b]">
            <div className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-[#fff0e6] rounded-full group-hover:bg-[#ffe0cc] transition-colors">
                <Wifi size={32} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-sm font-medium text-black">Fast Wifi</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-[#fff0e6] rounded-full group-hover:bg-[#ffe0cc] transition-colors">
                <Monitor size={32} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-sm font-medium text-black">Workspace</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-[#fff0e6] rounded-full group-hover:bg-[#ffe0cc] transition-colors">
                <Coffee size={32} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-sm font-medium text-black">Coffee</span>
            </div>
            <div className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="p-4 bg-[#fff0e6] rounded-full group-hover:bg-[#ffe0cc] transition-colors">
                <TreePine size={32} strokeWidth={1.5} />
              </div>
              <span className="font-sans text-sm font-medium text-black">Nature</span>
            </div>
          </div>
        </div>
      </div>

      {/* Works / Latest Gems Section */}
      <div id="gems">
        <LatestGems />
      </div>

      {/* Feature Your Retreat Section */}
      <div id="feature" className="bg-white w-full flex flex-col items-center py-[120px] px-[100px]">
        <div className="max-w-[800px] w-full flex flex-col items-center gap-12 text-center">
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif font-medium text-[72px] text-black leading-tight">
              Feature Your Retreat
            </h2>
            <p className="font-sans text-[18px] text-[#4a4a4a] leading-relaxed max-w-[600px] mx-auto">
              Own a work-ready retreat in nature? We'd love to feature your property on Nomad Gems. 
              Share your details and we'll get back to you.
            </p>
          </div>

          {/* Form */}
          <div className="flex items-center gap-4 w-full justify-center">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="h-[56px] w-[380px] bg-[#fff0e6] rounded-full px-8 font-sans text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f46b6b] transition-all border border-[#f46b6b]/20"
            />
            <Button variant="primary" size="lg">
              Get In Touch
            </Button>
          </div>

          {/* Optional: Small helper text */}
          <p className="font-sans text-sm text-black/40 italic">
            We typically respond within 24 hours
          </p>
        </div>
      </div>

      {/* Footer Section - Premium Refactor */}
      <div id="contact" className="bg-[#3f1d14] w-full flex flex-row items-stretch justify-between px-[100px] py-[120px] text-[#c73f3b]">
        
        {/* Left Column: Navigation & Info */}
        <div className="flex flex-col justify-between h-full gap-24">
          <div className="flex flex-col gap-6 font-serif font-bold text-[24px] tracking-wide">
            <a href="/about" className="hover:text-[#f46b6b] transition-colors">About</a>
            <a href="/gems" className="hover:text-[#f46b6b] transition-colors">Gems</a>
            <a href="/contact" className="hover:text-[#f46b6b] transition-colors">Contact</a>
          </div>

          <div className="flex flex-col gap-2 font-sans text-white/50 text-sm tracking-widest uppercase">
            <span className="font-bold text-[#c73f3b] opacity-80 cursor-pointer hover:opacity-100 transition-opacity">Follow on Youtube</span>
            <span>© 2026 Nomad Gems. All Rights Reserved. Built By Kea Logic.</span>
          </div>
        </div>

        {/* Right Column: Subscribe & Brand */}
        <div className="flex flex-col items-end gap-[120px]">
           {/* Subscribe Block */}
           <div className="flex flex-col items-start gap-8">
              <h2 className="font-serif font-medium text-[48px] text-[#f46b6b] leading-none">
                Subscribe For Updates
              </h2>
              
              <div className="flex items-center gap-4">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="h-[56px] w-[320px] bg-[#ffcbcb] rounded-full px-8 font-sans text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[#f46b6b] transition-all"
                />
                <button className="h-[56px] px-8 bg-[#f46b6b] rounded-full font-sans font-bold text-white uppercase tracking-widest hover:bg-[#d65252] transition-colors cursor-pointer">
                  Subscribe
                </button>
              </div>
           </div>

           {/* Brand Logo */}
           <div className="mt-auto">
              <h1 className="font-serif font-bold text-[80px] text-[#f46b6b] leading-none opacity-20 select-none">
                Nomad Gems
              </h1>
           </div>
        </div>

      </div>
    </div>
  );
}
