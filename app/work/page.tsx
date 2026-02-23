"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import TabFilter from "@/components/TabFilter";
import GemCard from "@/components/GemCard";
import { VideoModal } from "@/components/VideoModal";
import { GEMS } from "@/lib/data";
import { Gem } from "lucide-react";

const categories = ["All", "Cottage", "Villa", "Cabin"];

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("All");
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

  const filteredGems =
    activeTab === "All"
      ? GEMS
      : GEMS.filter((gem) => gem.category === activeTab);

  return (
    <div className="bg-[#fff7f0] flex flex-col items-center relative w-full min-h-screen">
      <Navbar />

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={currentVideoSrc}
        bookingUrl={currentBookingUrl}
      />

      {/* Hero Header */}
      <div className="w-full bg-[#3f1d14] pt-[80px]">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px] py-16 md:py-[80px] flex flex-col gap-4">
          <span className="font-sans text-sm uppercase tracking-[0.3em] text-[#f46b6b]">
            Our Collection
          </span>
          <h1 className="font-serif font-extrabold text-[48px] md:text-[80px] text-white leading-none">
            All Gems
          </h1>
          <p className="font-sans text-lg text-white/50 max-w-[520px] leading-relaxed mt-2">
            Work-ready sanctuaries verified for connectivity, comfort, and natural beauty. Browse, filter, and find your next retreat.
          </p>
        </div>
      </div>

      {/* Gems Grid Section */}
      <div className="w-full flex flex-col items-center py-16 md:py-[80px] px-6 md:px-[100px]">
        <div className="w-full max-w-[1440px] flex flex-col gap-8 md:gap-[60px]">
          {/* Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-8 border-b border-black/10 pb-4">
            <TabFilter
              tabs={categories}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <span className="font-sans text-sm text-black/40 tracking-widest uppercase">
              {filteredGems.length} {filteredGems.length === 1 ? "gem" : "gems"}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {filteredGems.map((gem) => (
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
