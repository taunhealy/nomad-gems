"use client";

import { useState } from "react";
import Image from "next/image";
import TabFilter from "./TabFilter";
import ArrowLink from "./ArrowLink";
import { GEMS } from "../lib/data";
import { VideoModal } from "./VideoModal";
import GemCard from "./GemCard";

const imgCard = "/images/card_img.png";

export default function LatestGems() {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [currentBookingUrl, setCurrentBookingUrl] = useState("");
  
  const categories = ["All", "Activity", "Villa", "Cabin"];

  const handleGemClick = (src?: string, bookingUrl?: string) => {
    if (src) {
        setCurrentVideoSrc(src);
        setCurrentBookingUrl(bookingUrl || "");
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
            <TabFilter 
              tabs={categories} 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />

            <ArrowLink text="View All Gems" href="/work" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full min-w-full">
            {GEMS.filter(gem => activeTab === "All" || gem.category === activeTab).map((gem) => (
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
