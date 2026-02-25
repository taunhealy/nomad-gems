"use client";

import { useState } from "react";
import { GEMS, ENVIRONMENTS } from "@/lib/data";
import GemCard from "@/components/GemCard";
import DynamicMap from "@/components/DynamicMap";
import { VideoModal } from "@/components/VideoModal";
import Navbar from "@/components/Navbar";
import { Map, LayoutGrid } from "lucide-react";

type MobileTab  = "map" | "listings";
type FilterType = "all" | "stays" | "environments";

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: "All",          value: "all"          },
  { label: "Stays",        value: "stays"        },
  { label: "Environments", value: "environments" },
];

export default function GemsPage() {
  const allWithCoords  = [...GEMS, ...ENVIRONMENTS].filter(g => g.coordinates);
  const staysWithCoords = GEMS.filter(g => g.coordinates);
  const envsWithCoords  = ENVIRONMENTS.filter(g => g.coordinates);

  const [filter,        setFilter]        = useState<FilterType>("all");
  const [selectedGemId, setSelectedGemId] = useState<string | null>(null);
  const [mobileTab,     setMobileTab]     = useState<MobileTab>("map");

  const [isModalOpen,     setIsModalOpen]     = useState(false);
  const [activeVideo,     setActiveVideo]     = useState("");
  const [activeBookingUrl, setActiveBookingUrl] = useState("");

  const filteredListings =
    filter === "stays"        ? staysWithCoords :
    filter === "environments" ? envsWithCoords  :
    allWithCoords;

  const handleGemClick = (src?: string, bookingUrl?: string) => {
    if (src) {
      setActiveVideo(src);
      setActiveBookingUrl(bookingUrl || "");
      setIsModalOpen(true);
    } else if (bookingUrl) {
      window.open(bookingUrl, "_blank");
    }
  };

  /** Filter pill bar — shared between desktop sidebar and mobile overlay */
  const filterBar = (
    <div className="flex gap-2 flex-wrap mb-6 shrink-0">
      {FILTER_OPTIONS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => { setFilter(value); setSelectedGemId(null); }}
          className={`px-4 py-1.5 rounded-full font-sans text-xs tracking-widest uppercase transition-all duration-200 border ${
            filter === value
              ? "bg-[#f46b6b] text-white border-[#f46b6b] shadow-sm"
              : "bg-transparent text-black/50 border-black/15 hover:border-[#f46b6b]/50 hover:text-black"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const listingsPanel = (
    <>
      {/* Header */}
      <div className="mb-5 shrink-0">
        <h1 className="font-serif text-4xl md:text-5xl text-black tracking-tight mb-1">
          Gems
        </h1>
        <p className="font-sans text-sm tracking-widest uppercase text-black/50">
          Discover unique stays and environments
        </p>
      </div>

      {/* Filter pills */}
      {filterBar}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-10 pb-8">
        {filteredListings.map((gem) => (
          <div
            key={gem.id}
            onMouseEnter={() => setSelectedGemId(gem.id)}
            onMouseLeave={() => setSelectedGemId(null)}
          >
            <GemCard gem={gem} onClick={handleGemClick} />
          </div>
        ))}
        {filteredListings.length === 0 && (
          <p className="font-sans text-sm text-black/40 col-span-2">
            No listings found.
          </p>
        )}
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden bg-[#FAF9F6]">
      <Navbar />

      {/* Main content — below fixed navbar */}
      <div className="flex flex-1 w-full overflow-hidden pt-[80px] relative">

        {/* ── Desktop: listings sidebar ── */}
        <div className="hidden md:flex flex-col w-[45%] lg:w-[40%] xl:w-[35%] h-full overflow-y-auto custom-scrollbar px-10 py-8 shrink-0">
          {listingsPanel}
        </div>

        {/* ── Single DynamicMap — always mounted ── */}
        <div className="flex-1 h-full min-w-0">
          <DynamicMap
            gems={filteredListings}
            selectedGemId={selectedGemId}
            onMarkerClick={(id) => setSelectedGemId(id)}
          />
        </div>

        {/* ── Mobile: listings slide-up overlay ── */}
        <div
          className={`md:hidden absolute inset-x-0 top-[80px] bottom-16 bg-[#FAF9F6] z-30 overflow-y-auto custom-scrollbar px-5 py-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileTab === "listings" ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {listingsPanel}
        </div>

        {/* ── Mobile: tab bar ── */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-black/10 flex items-stretch z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <button
            id="mobile-tab-map"
            onClick={() => setMobileTab("map")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
              mobileTab === "map" ? "text-[#f46b6b]" : "text-black/40"
            }`}
          >
            <Map size={20} strokeWidth={1.5} />
            <span className="font-sans text-[10px] tracking-widest uppercase">Map</span>
          </button>
          <button
            id="mobile-tab-listings"
            onClick={() => setMobileTab("listings")}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
              mobileTab === "listings" ? "text-[#f46b6b]" : "text-black/40"
            }`}
          >
            <LayoutGrid size={20} strokeWidth={1.5} />
            <span className="font-sans text-[10px] tracking-widest uppercase">Gems</span>
          </button>
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
