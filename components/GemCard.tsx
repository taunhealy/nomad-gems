"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Gem } from "../lib/data";
import Badge from "./Badge";

interface GemCardProps {
  gem: Gem;
  onClick: (src?: string, bookingUrl?: string) => void;
}

export default function GemCard({ gem, onClick }: GemCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!(gem.locked || gem.comingSoon) && videoRef.current && gem.src && !isYoutube(gem.src)) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Autoplay prevented:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const isYoutube = (url?: string) => {
    return url ? url.includes("youtube.com") || url.includes("youtu.be") : false;
  };

  const hasPlayableVideo = gem.src && !isYoutube(gem.src);
  const isEnvironment = gem.id.startsWith("e");

  return (
    <div
      className={`flex flex-col gap-4 w-full group ${gem.locked || gem.comingSoon ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => !(gem.locked || gem.comingSoon) && onClick(gem.src, gem.bookingUrl)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="bg-white p-2 rounded-[16px] w-full aspect-3/2 relative overflow-hidden transition-all duration-500 hover:shadow-lg">
        <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-gray-200">
          {!isEnvironment && (
            <Image
              alt={gem.title}
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 z-10"
              src={gem.image}
              fill
            />
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4 md:left-4 z-40 pointer-events-none">
            <Badge>{gem.region || gem.category}</Badge>
          </div>

          {/* Hover Video Layer */}
          {hasPlayableVideo && !(gem.locked || gem.comingSoon) && (
            <video
              ref={videoRef}
              src={gem.src}
              poster={isEnvironment ? undefined : gem.image}
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover z-20 ${
                isEnvironment 
                  ? "opacity-100" 
                  : `transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`
              }`}
              muted
              playsInline
              loop
              onLoadedMetadata={() => {
                if (isEnvironment && videoRef.current) {
                  videoRef.current.currentTime = 0.01;
                }
              }}
            />
          )}

          {/* Locked State Overlay */}
          {(gem.locked || gem.comingSoon) && (
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30 bg-black/40 backdrop-blur-[2px]">
                {gem.comingSoon ? (
                    <div className="px-6 py-3 bg-[#f46b6b]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                         <span className="font-sans text-white text-xs font-bold tracking-widest uppercase">Coming Soon</span>
                    </div>
                ) : (
                    <div className="w-16 h-16 bg-[#f46b6b]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                         <svg 
                            className="w-6 h-6 text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                )}
             </div>
          )}

          {/* Play Button Overlay */}
          {!(gem.locked || gem.comingSoon) && gem.src && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30">
              <div className="w-16 h-16 bg-[#f46b6b]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                <Play className="w-6 h-6 ml-1 text-white fill-white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex justify-between items-center gap-4 w-full text-left mt-2">
        <div className="shrink grid gap-0.5">
          <p>
            <span className={`font-serif lg:text-3xl text-xl tracking-tighter leading-tight text-black transition-all ${!(gem.locked || gem.comingSoon) ? "group-hover:underline decoration-1 underline-offset-4" : ""}`}>
              {gem.title}
            </span>
          </p>
          <p className="font-sans text-xs tracking-widest uppercase text-black/60">
            {gem.location}
          </p>
        </div>

        <div className="flex flex-row items-center shrink-0">
          {!(gem.locked || gem.comingSoon) && (
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1 text-black"
                viewBox="0 0 21 20"
                stroke="currentColor"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 10H18M18 10L12.1667 4.16675M18 10L12.1667 15.8334"
                ></path>
              </svg>
          )}
        </div>
      </div>
    </div>
  );
}
