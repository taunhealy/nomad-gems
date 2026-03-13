"use client";

import { useState, useMemo } from "react";
import { GEMS, ENVIRONMENTS, Gem } from "@/lib/data";
import GemCard from "./GemCard";
import DynamicMap from "./DynamicMap";
import { VideoModal } from "./VideoModal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FilterType = "all" | "stays" | "environments";

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: "All",          value: "all"          },
  { label: "Stays",        value: "stays"        },
  { label: "Environments", value: "environments" },
];

export default function MapSection() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedGemId, setSelectedGemId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const [activeBookingUrl, setActiveBookingUrl] = useState("");

  const filteredGems = useMemo(() => {
    const all = [...GEMS, ...ENVIRONMENTS].filter(g => g.coordinates);
    if (filter === "stays") return GEMS.filter(g => g.coordinates);
    if (filter === "environments") return ENVIRONMENTS.filter(g => g.coordinates);
    return all;
  }, [filter]);

  const handleGemClick = (gem: Gem) => {
    if (gem.href && gem.href !== "#") {
      router.push(gem.href);
    } else if (gem.src) {
      setActiveVideo(gem.src);
      setActiveBookingUrl(gem.bookingUrl || "");
      setIsModalOpen(true);
    } else if (gem.bookingUrl) {
      window.open(gem.bookingUrl, "_blank");
    }
  };

  return (
    <section className="w-full bg-[#fff7f0] py-16 md:py-[120px] px-6 md:px-[100px]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif font-medium text-[40px] md:text-[64px] text-black leading-tight">
              Explore the Map
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] text-[#4a4a4a] leading-relaxed max-w-[600px]">
              Locate your next nature workation. Zoom in to discover hidden gems 
              and immersive environments across the map.
            </p>
          </div>
          <Link 
            href="/map" 
            className="group flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-black hover:text-[#f46b6b] transition-all"
          >
            Open Full Map
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-[#3f1d14]/5 border border-black/5 h-[600px] md:h-[750px]">
          
          {/* Left Side: Thumbnails */}
          <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col h-full bg-[#FAF9F6]">
            <div className="p-6 border-b border-black/5 bg-white/50 backdrop-blur-md sticky top-0 z-10 flex flex-col gap-4">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#f46b6b] font-bold">
                Featured Locations
              </span>
              
              {/* Filter Pills */}
              <div className="flex gap-2 flex-wrap">
                {FILTER_OPTIONS.map(({ label, value }) => (
                  <button
                    key={value}
                    suppressHydrationWarning
                    onClick={() => { setFilter(value); setSelectedGemId(null); }}
                    className={`px-4 py-1.5 rounded-full font-sans text-[10px] tracking-widest uppercase cursor-pointer transition-all duration-200 border ${
                      filter === value
                        ? "bg-[#f46b6b] text-white border-[#f46b6b] shadow-sm"
                        : "bg-transparent text-black/50 border-black/15 hover:border-[#f46b6b]/50 hover:text-black"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {filteredGems.map((gem: Gem) => (
                <div 
                  key={gem.id}
                  className={`transition-all duration-300 transform ${
                    selectedGemId === gem.id ? "scale-[1.02] opacity-100" : "scale-100 opacity-80 hover:opacity-100"
                  }`}
                  onMouseEnter={() => setSelectedGemId(gem.id)}
                >
                  <GemCard 
                    gem={gem} 
                    onClick={() => handleGemClick(gem)}
                  />
                </div>
              ))}
              {filteredGems.length === 0 && (
                <div className="h-full flex items-center justify-center text-center p-10">
                  <p className="font-sans text-sm text-black/40">No {filter} found with coordinates.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white/30 border-t border-black/5 text-center">
              <p className="font-sans text-[11px] text-black/40 italic">
                {filteredGems.length} items • Hover to locate
              </p>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="flex-1 relative h-[400px] md:h-full z-0">
            <DynamicMap 
              gems={filteredGems}
              selectedGemId={selectedGemId}
              onMarkerClick={(id) => setSelectedGemId(id)}
              onThumbnailClick={handleGemClick}
            />
          </div>
        </div>
      </div>

      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoSrc={activeVideo}
        bookingUrl={activeBookingUrl}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
}
