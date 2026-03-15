"use client";

import { useState } from "react";
import Image from "next/image";
import TabFilter from "./TabFilter";
import ArrowLink from "./ArrowLink";
import { useRouter } from "next/navigation";
import { GEMS } from "../lib/data";
import { VideoModal } from "./VideoModal";
import GemCard from "./GemCard";
import { Gem as GemIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const imgCard = "/images/card_img.png";

export default function LatestGems() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [currentBookingUrl, setCurrentBookingUrl] = useState("");
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  
  const categories = ["All", "Cottage", "Villa", "Cabin"];

  const handleGemClick = (gem: any) => {
    if (gem.href && gem.href !== "#") {
      router.push(gem.href);
    } else if (gem.src) {
      setCurrentVideoSrc(gem.src);
      setCurrentBookingUrl(gem.bookingUrl || "");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-[#fff7f0] w-full flex flex-col items-center py-16 md:py-[120px] px-6 md:px-[100px] gap-8 md:gap-[60px]">
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoSrc={currentVideoSrc}
        bookingUrl={currentBookingUrl}
      />

      {/* Content Container with fixed max-width */}
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <div className="w-full flex flex-col gap-6 items-start text-black">
          <h2 className="font-serif font-medium text-[40px] md:text-[72px] leading-tight">
            Latest Gems
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] leading-relaxed max-w-[540px]">
            Immerse yourself in nature to enable deep focus and relaxation. These are the gems we've experienced.
          </p>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col gap-8 md:gap-[60px] mt-8 md:mt-[60px]">
          {/* Controls: Categories & View All */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8 border-b border-black/10 pb-4">
            <div className="flex items-center gap-4 sm:gap-8">
              <TabFilter 
                tabs={categories} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
              <div className="hidden sm:block h-8 w-px bg-black/10 mx-2" />
              <button 
                suppressHydrationWarning
                onClick={() => setIsVerifiedOnly(!isVerifiedOnly)}
                className={cn(
                  "relative group p-2 rounded-full transition-all duration-300",
                  isVerifiedOnly ? "bg-nomad-red/10 text-nomad-red shadow-[0_0_15px_rgba(244,107,107,0.2)]" : "text-black/40 hover:text-black"
                )}
              >
                <GemIcon size={28} className={cn("transition-transform duration-500", isVerifiedOnly ? "fill-nomad-red/20 scale-110" : "group-hover:scale-110")} strokeWidth={1.5} />
                
                {/* Branded Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-nomad-brown backdrop-blur-xl text-white rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-2xl z-50 pointer-events-none border border-white/10 text-center">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-nomad-red">Curated Filter</span>
                    <p className="font-serif italic text-xs text-white/90 leading-relaxed">
                      "Show only verified nomad-ready gems"
                    </p>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-nomad-brown rotate-45 border-r border-b border-white/10" />
                </div>
              </button>
            </div>

            <ArrowLink text="View Full Collection" href="/map" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-w-full">
            {GEMS.filter(gem => 
              (activeTab === "All" || gem.category === activeTab) && 
              (!isVerifiedOnly || gem.verified)
            ).map((gem) => (
              <GemCard 
                key={gem.id} 
                gem={gem} 
                onClick={() => handleGemClick(gem)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
