"use client";

import * as React from "react";
import Image from "next/image";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, ExternalLink, Lock, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GEMS, ENVIRONMENTS, Gem, getYoutubeThumbnail } from "../lib/data";
import Button from "./Button";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  bookingUrl?: string;
}

export function VideoModal({ isOpen, onClose, videoSrc, bookingUrl }: VideoModalProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  const [currentSrc, setCurrentSrc] = React.useState(videoSrc);
  const [currentBookingUrl, setCurrentBookingUrl] = React.useState(bookingUrl);
  
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);

  // Derived logic for categorization and state
  const isYoutube = currentSrc?.includes("youtube.com") || currentSrc?.includes("youtu.be");
  const activeGem = [...GEMS, ...ENVIRONMENTS].find(g => g.src === currentSrc);
  const isEnvironment = ENVIRONMENTS.some(e => e.src === currentSrc);
  const relatedVideos = isEnvironment ? ENVIRONMENTS : GEMS;
  const sidebarTitle = isEnvironment ? "Regional Context" : "The Gems";

  // Helper to handle auto-hide
  const resetControlsTimeout = React.useCallback(() => {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
      }
      if (isPlaying) {
          controlsTimeoutRef.current = setTimeout(() => {
              setShowControls(false);
          }, 3000);
      }
  }, [isPlaying]);

  // Effect to manage controls visibility based on play state
  React.useEffect(() => {
      if (isPlaying) {
          resetControlsTimeout();
      } else {
          setShowControls(true);
          if (controlsTimeoutRef.current) {
              clearTimeout(controlsTimeoutRef.current);
          }
      }
      return () => {
          if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      };
  }, [isPlaying, resetControlsTimeout]);

  // Sync prop changes immediately when modal opens or props change
  React.useEffect(() => {
    if (isOpen) {
      setCurrentSrc(videoSrc);
      setCurrentBookingUrl(bookingUrl);
      setIsPlaying(true);
      setProgress(0);
      
      // Force video reload if it's a direct file
      if (videoRef.current && !videoSrc.includes("youtube") && !videoSrc.includes("youtu.be")) {
        videoRef.current.load();
      }
    }
  }, [isOpen, videoSrc, bookingUrl]);

  // Handle Video Source Change (Reset state for sidebar clicks)
  const handleVideoChange = (newSrc: string) => {
    setCurrentSrc(newSrc);
    setIsPlaying(true);
    setProgress(0);

    const matchedGem = [...GEMS, ...ENVIRONMENTS].find((g) => g.src === newSrc);
    setCurrentBookingUrl(matchedGem?.bookingUrl || "");

    if (matchedGem && matchedGem.href && matchedGem.href !== "#") {
        window.history.replaceState(null, '', matchedGem.href);
    }
    
    // Force reload
    if (videoRef.current && !newSrc.includes("youtube") && !newSrc.includes("youtu.be")) {
        videoRef.current.load();
    }
  };

  // Sync initial URL when modal opens
  React.useEffect(() => {
    if (isOpen && currentSrc) {
      const matchedGem = [...GEMS, ...ENVIRONMENTS].find((g) => g.src === currentSrc);
      if (matchedGem && matchedGem.href && matchedGem.href !== "#") {
        window.history.replaceState(null, '', matchedGem.href);
      }
    } else if (!isOpen && pathname) {
      window.history.replaceState(null, '', pathname);
    }
  }, [isOpen, currentSrc, pathname]);

  // Playback control effect
  React.useEffect(() => {
    if (isOpen && videoRef.current && !isYoutube) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        }
    }
  }, [isOpen, currentSrc, isYoutube]);

  // Handle Esc key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lock body scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration;
        setProgress((current / total) * 100);
        setDuration(total);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
    } else {
        document.exitFullscreen();
        setIsFullscreen(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current && progressRef.current) {
        const rect = progressRef.current.getBoundingClientRect();
        const clickedX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickedX / rect.width));
        videoRef.current.currentTime = percentage * videoRef.current.duration;
        setProgress(percentage * 100);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-nomad-brown/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-12 animate-in fade-in duration-500">
      
      {/* Dynamic Background Light (Branding) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-nomad-red/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute top-6 right-6 z-110 flex items-center gap-4">
        {/* Download Button (Direct Videos Only) */}
        {!isYoutube && currentSrc && (
          <a 
            href={currentSrc} 
            download 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-nomad-red transition-all duration-300 flex items-center gap-2 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Download</span>
            <Download size={28} strokeWidth={1.5} />
          </a>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="text-white/50 hover:text-nomad-red transition-all duration-300 transform hover:rotate-90"
        >
          <X size={32} strokeWidth={1} />
        </button>
      </div>

      <div className="relative w-full max-w-[1600px] h-full flex flex-col lg:flex-row bg-[#2a130d]/80 rounded-[40px] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        
        {/* Main Cinema Area */}
        <div 
          ref={containerRef}
          className="relative flex-1 bg-black group overflow-hidden flex flex-col"
          onMouseMove={resetControlsTimeout}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* Video Player */}
          <div className="relative flex-1 flex items-center justify-center" onClick={(e) => !isYoutube && togglePlay(e)}>
            {isYoutube ? (
               <iframe
                src={(() => {
                  const videoId = currentSrc.includes("youtu.be")
                    ? currentSrc.split("/").pop()?.split("?")[0]
                    : currentSrc.split("v=")[1]?.split("&")[0];
                  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`;
                })()}
                className="w-full h-full"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : currentSrc ? (
              <video
                ref={videoRef}
                src={currentSrc}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                loop
                playsInline
              />
            ) : null}

            {/* Nomad Verified Badge Integration */}
            {activeGem?.verified && (
               <div className={cn(
                  "absolute top-8 left-8 z-30 transition-all duration-500",
                  showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
               )}>
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-nomad-red/90 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                     <svg className="w-5 h-5 text-white fill-white/20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3l1.5 4.5l4.5 1.5l-4.5 1.5l-1.5 4.5l-1.5-4.5l-4.5-1.5l4.5-1.5z" />
                     </svg>
                     <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Nomad Verified Stay</span>
                  </div>
               </div>
            )}
            
            {/* Center Play/Pause Overlay (Non-YT) */}
            {!isYoutube && !isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-500">
                <div onClick={togglePlay} className="w-24 h-24 rounded-full bg-nomad-red flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                  <Play size={40} className="ml-1 text-white fill-white" />
                </div>
              </div>
            )}
          </div>

          {/* Nomad Custom Interface (Non-YT) */}
          {!isYoutube && (
            <div className={cn(
              "absolute bottom-0 left-0 right-0 p-8 md:p-12 transition-all duration-500",
              showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <div className="glass-card bg-nomad-brown/80 backdrop-blur-2xl border-white/10 p-6 flex flex-col gap-4">
                {/* Progress */}
                <div ref={progressRef} onClick={handleSeek} className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer group/seek relative overflow-hidden">
                   <div className="h-full bg-nomad-red transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8 text-white">
                    <button onClick={togglePlay} className="hover:text-nomad-red transition-colors">
                       {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                       <span className="text-white">{formatTime(videoRef.current?.currentTime || 0)}</span>
                       <span>/</span>
                       <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-white/60">
                    <button onClick={toggleMute} className="hover:text-white transition-colors">
                       {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button onClick={toggleFullscreen} className="hover:text-white transition-colors">
                       {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Curation Sidebar */}
        <div className="w-full lg:w-[420px] bg-nomad-brown flex flex-col border-t lg:border-t-0 lg:border-l border-white/5">
          {/* Header */}
          <div className="p-8 border-b border-white/5">
            <h3 className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-nomad-red mb-2">Collection</h3>
            <h4 className="text-2xl font-serif italic text-white/90">{sidebarTitle}</h4>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
            {relatedVideos.map((item) => (
              <div 
                key={item.id}
                onClick={() => !item.locked && item.src && handleVideoChange(item.src)}
                className={cn(
                  "relative flex gap-5 p-4 rounded-3xl transition-all duration-500 group",
                  item.src === currentSrc ? "bg-white/5 border-white/10" : "hover:bg-white/2 border-transparent",
                  item.locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer border"
                )}
              >
                <div className="relative w-24 aspect-square rounded-2xl overflow-hidden shrink-0 border border-white/5 bg-black/20">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                    />
                  ) : (item.src && (item.src.includes("youtube.com") || item.src.includes("youtu.be"))) ? (
                    <img 
                      src={getYoutubeThumbnail(item.src)} 
                      alt="" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                    />
                  ) : item.src ? (
                    <video 
                      src={item.src} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      muted
                      playsInline
                      onLoadedMetadata={(e) => {
                        e.currentTarget.currentTime = item.thumbnailTime || 1;
                      }}
                    />
                  ) : null}
                  {item.src === currentSrc && (
                    <div className="absolute inset-0 bg-nomad-red/20 flex items-center justify-center backdrop-blur-[1px]">
                       <div className="w-8 h-8 rounded-full bg-nomad-red flex items-center justify-center">
                          <Volume2 size={14} className="text-white animate-pulse" />
                       </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-1">
                   <h5 className={cn(
                     "font-serif text-lg leading-tight transition-colors",
                     item.src === currentSrc ? "text-nomad-red" : "text-white/80 group-hover:text-white"
                   )}>
                     {item.title}
                   </h5>
                   <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-white/30">
                     {item.location}
                   </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar CTA */}
          {currentBookingUrl && (
            <div className="p-8 bg-black/20 border-t border-white/5">
               <a 
                 href={currentBookingUrl.startsWith("http") ? currentBookingUrl : `https://${currentBookingUrl}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group flex flex-col gap-1 w-full p-6 rounded-3xl bg-nomad-red hover:bg-[#ff8080] transition-all duration-500 shadow-2xl shadow-nomad-red/10 overflow-hidden relative"
               >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:scale-150" />
                  <span className="text-white font-serif text-xl z-10 flex items-center gap-2">
                    Book this Stay <ExternalLink size={16} strokeWidth={1.5} />
                  </span>
                  <span className="text-white/60 text-[10px] font-sans font-bold uppercase tracking-widest z-10">
                    DIRECT PROPERTY LINK
                  </span>
               </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
