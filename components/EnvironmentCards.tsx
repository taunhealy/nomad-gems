"use client";

import { useState } from "react";
import ArrowLink from "./ArrowLink";
import { ENVIRONMENTS } from "../lib/data";
import { VideoModal } from "./VideoModal";
import GemCard from "./GemCard";

export default function EnvironmentCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [currentBookingUrl, setCurrentBookingUrl] = useState("");

  const handleGemClick = (src?: string, bookingUrl?: string) => {
    if (src) {
        setCurrentVideoSrc(src);
        setCurrentBookingUrl(bookingUrl || "");
        setIsModalOpen(true);
    }
  };

  return (
    <div id="environments" className="bg-[#fffefe] w-full flex flex-col items-center py-16 md:py-[120px] px-6 md:px-[100px] gap-8 md:gap-[60px]">
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoSrc={currentVideoSrc}
        bookingUrl={currentBookingUrl}
      />

      {/* Content Container with fixed max-width */}
      <div className="w-full max-w-[1440px]">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row gap-6 items-start md:items-end justify-between border-b border-black/10 pb-8 text-black">
          <div className="flex flex-col gap-4 items-start">
             <h2 className="font-serif font-medium text-[40px] md:text-[72px] leading-tight">
               Environments
             </h2>
             <p className="font-sans text-[16px] md:text-[18px] text-[#4a4a4a] leading-relaxed max-w-[540px]">
               Show the beauty of your area. Our environments help drive long and meaningful focus. Explore the areas surrounding the gems.
             </p>
          </div>
          <ArrowLink text="View All Environments" href="#environments" />
        </div>

        {/* Content */}
        <div className="w-full flex flex-col gap-8 md:gap-[60px] mt-8 md:mt-[60px]">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-w-full">
            {ENVIRONMENTS.map((gem) => (
              <GemCard 
                key={gem.id} 
                gem={gem} 
                onClick={(src, bookingUrl) => handleGemClick(src, bookingUrl)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
