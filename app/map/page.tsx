"use client";

import { useState } from "react";
import { GEMS, ENVIRONMENTS } from "@/lib/data";
import GemCard from "@/components/GemCard";
import DynamicMap from "@/components/DynamicMap";
import { VideoModal } from "@/components/VideoModal";
import Navbar from "@/components/Navbar";

export default function MapPage() {
  const allListings = [...GEMS, ...ENVIRONMENTS].filter(g => g.coordinates); // only include those with coordinates
  const [selectedGemId, setSelectedGemId] = useState<string | null>(null);

  // Video modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const [activeBookingUrl, setActiveBookingUrl] = useState("");

  const handleGemClick = (src?: string, bookingUrl?: string) => {
    if (src) {
      setActiveVideo(src);
      setActiveBookingUrl(bookingUrl || "");
      setIsModalOpen(true);
    } else if (bookingUrl) {
      window.open(bookingUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden bg-[#FAF9F6]">
      <Navbar />

      {/* Full-screen split layout below the fixed navbar */}
      <div className="flex flex-1 w-full overflow-hidden pt-[80px]">

        {/* Listings sidebar */}
        <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%] flex flex-col h-full overflow-y-auto custom-scrollbar px-6 md:px-10 py-8 shrink-0">
          <div className="mb-8 shrink-0">
            <h1 className="font-serif text-4xl md:text-5xl text-black tracking-tight mb-2">
              Explore Map
            </h1>
            <p className="font-sans text-sm tracking-widest uppercase text-black/60">
              Discover unique stays and environments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-10 pb-8">
            {allListings.map((gem) => (
              <div
                key={gem.id}
                onMouseEnter={() => setSelectedGemId(gem.id)}
                onMouseLeave={() => setSelectedGemId(null)}
              >
                <GemCard gem={gem} onClick={handleGemClick} />
              </div>
            ))}
          </div>
        </div>

        {/* Map — fills remaining space */}
        <div className="flex-1 h-full">
          <DynamicMap
            gems={allListings}
            selectedGemId={selectedGemId}
            onMarkerClick={(id) => {
              setSelectedGemId(id);
            }}
          />
        </div>

      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={activeVideo}
        bookingUrl={activeBookingUrl}
      />
    </div>
  );
}
