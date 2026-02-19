"use client";

import { useState } from "react";
import Link from "next/link";
import { Wifi, Monitor, Coffee, TreePine, TrendingUp, Video, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

type Audience = "nomads" | "owners";

const content: Record<Audience, {
  heading: string;
  tagline: string;
  description: string;
  amenities: { icon: React.ElementType; label: string }[];
}> = {
  nomads: {
    heading: "Work in nature.",
    tagline: "(for digital nomads seeking deep work)",
    description:
      "Nomad Gems curates exclusive, work-ready sanctuaries designed for the modern professional. Each location is verified for high-speed connectivity, ergonomic comfort, and natural beauty, ensuring you can perform at your best while recharging in nature.",
    amenities: [
      { icon: Wifi, label: "Fast Wifi" },
      { icon: Monitor, label: "Workspace" },
      { icon: Coffee, label: "Coffee" },
      { icon: TreePine, label: "Nature" },
    ],
  },
  owners: {
    heading: "Fill your weeknights.",
    tagline: "(turn quiet midweeks into steady revenue)",
    description:
      "Most retreats sit empty Monday to Thursday. Nomad Gems connects your property with remote workers who book longer, prefer midweek stays, and value quiet over nightlife. List once, fill the gaps that weekend tourists never will.",
    amenities: [
      { icon: TrendingUp, label: "More Bookings" },
      { icon: Users, label: "Nomad Network" },
      { icon: Video, label: "Cinematic Content" },
      { icon: BarChart3, label: "Analytics" },
    ],
  },
};

export default function ValueProp() {
  const [audience, setAudience] = useState<Audience>("nomads");
  const active = content[audience];

  return (
    <div
      id="about"
      className="bg-[#3f1d14] content-stretch flex items-start overflow-clip p-[10px] relative shrink-0 w-full"
    >
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] min-h-auto md:min-h-[542px] py-16 items-center justify-center leading-0 not-italic overflow-clip px-6 md:px-[100px] relative text-center">
        
        {/* Audience Toggle */}
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/10">
          <button
            onClick={() => setAudience("nomads")}
            className={cn(
              "px-6 py-2.5 rounded-full font-sans text-xs md:text-sm font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer",
              audience === "nomads"
                ? "bg-[#f46b6b] text-white shadow-lg shadow-[#f46b6b]/20"
                : "text-white/60 hover:text-white/90"
            )}
          >
            Nomads
          </button>
          <button
            onClick={() => setAudience("owners")}
            className={cn(
              "px-6 py-2.5 rounded-full font-sans text-xs md:text-sm font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer",
              audience === "owners"
                ? "bg-[#f46b6b] text-white shadow-lg shadow-[#f46b6b]/20"
                : "text-white/60 hover:text-white/90"
            )}
          >
            Owners
          </button>
        </div>

        {/* Heading — animated */}
        <div
          key={audience + "-heading"}
          className="flex flex-col font-sans font-normal justify-center relative shrink-0 text-[32px] md:text-[48px] text-white w-full tracking-wide animate-in fade-in slide-in-from-bottom-2 duration-400"
        >
          <p className="leading-[1.2] whitespace-pre-wrap">{active.heading}</p>
        </div>

        {/* Tagline — animated */}
        <div
          key={audience + "-tagline"}
          className="flex flex-col font-serif font-medium justify-center relative shrink-0 text-[#f46b6b] text-[28px] md:text-[40px] italic w-full animate-in fade-in slide-in-from-bottom-2 duration-400 delay-75"
        >
          <p className="leading-[1.2] whitespace-pre-wrap" style={{ textWrap: "balance" }}>
            {active.tagline}
          </p>
        </div>

        {/* Description — animated */}
        <div
          key={audience + "-desc"}
          className="flex flex-col font-sans font-normal justify-center relative shrink-0 text-[16px] md:text-[18px] text-white/70 max-w-[640px] leading-relaxed mt-4 animate-in fade-in slide-in-from-bottom-2 duration-400 delay-150"
        >
          <p style={{ textWrap: "balance" }}>{active.description}</p>
        </div>

        {/* Amenities Icons — animated */}
        <div
          key={audience + "-amenities"}
          className="flex flex-wrap gap-8 md:gap-12 mt-8 items-center justify-center text-[#f46b6b] animate-in fade-in slide-in-from-bottom-2 duration-400 delay-200"
        >
          {active.amenities.map((item) => (
            <Link
              key={item.label}
              href="/about#process"
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                <item.icon size={24} className="md:w-[32px] md:h-[32px]" strokeWidth={1.5} />
              </div>
              <span className="font-sans text-xs md:text-sm font-medium text-white/80">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
