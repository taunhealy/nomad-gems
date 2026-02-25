"use client";

import * as React from "react";
import Image from "next/image";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GEMS, ENVIRONMENTS, Gem } from "../lib/data";
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

  const isEnvironment = ENVIRONMENTS.some(e => e.src === currentSrc);
  const relatedVideos = isEnvironment ? ENVIRONMENTS : GEMS;
  const sidebarTitle = isEnvironment ? "More Environments" : "More Gems";

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

  // Sync prop changes
  React.useEffect(() => {
    setCurrentSrc(videoSrc);
    setCurrentBookingUrl(bookingUrl);
  }, [videoSrc, bookingUrl]);

  // Handle Video Source Change (Reset state)
  const handleVideoChange = (newSrc: string, slug?: string) => {
    setCurrentSrc(newSrc);
    setIsPlaying(true);
    setProgress(0);

    // Look up the booking URL for the new video
    const matchedGem = [...GEMS, ...ENVIRONMENTS].find((g) => g.src === newSrc);
    setCurrentBookingUrl(matchedGem?.bookingUrl || "");

    // Update URL to make it shareable
    if (matchedGem && matchedGem.href) {
        window.history.replaceState(null, '', matchedGem.href);
    }
  };

  // Sync initial URL when modal opens
  React.useEffect(() => {
    if (isOpen && currentSrc) {
      const matchedGem = [...GEMS, ...ENVIRONMENTS].find((g) => g.src === currentSrc);
      if (matchedGem && matchedGem.href) {
        window.history.replaceState(null, '', matchedGem.href);
      }
    } else if (!isOpen && pathname) {
      window.history.replaceState(null, '', pathname);
    }
  }, [isOpen, currentSrc, pathname]);

  // Autoplay effect when src changes or modal opens
  React.useEffect(() => {
    let mounted = true;

    if (isOpen && videoRef.current) {
        videoRef.current.load();
        
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    if (mounted) setIsPlaying(true);
                })
                .catch((error) => {
                    if (mounted) {
                        setIsPlaying(false);
                        // AbortError is expected if user navigates away or pauses quickly
                        if (error.name !== 'AbortError') {
                            console.error("Video playback failed:", error);
                        }
                    }
                });
        }
    } else {
        setIsPlaying(false);
    }

    return () => {
        mounted = false;
    };
  }, [isOpen, currentSrc]);

  // Handle Esc key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "unset";
    }
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
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, clickedX / width));
        
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
    <div className="fixed inset-0 z-50 bg-[#3f1d14]/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300 p-0 md:p-8" style={{ zIndex: 100 }}>
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white/50 hover:text-[#f46b6b] transition-colors p-2 bg-black/20 backdrop-blur-md rounded-full md:bg-transparent md:backdrop-blur-none"
      >
        <X size={24} />
      </button>
      
      {/* Modal Layout Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] h-dvh md:h-auto md:max-h-[90vh] md:aspect-video bg-[#3f1d14] border-0 md:border md:border-[#f46b6b]/20 rounded-none md:rounded-xl overflow-hidden shadow-2xl">
        
        {/* Main Video Area */}
        <div 
            ref={containerRef}
            className="relative w-full aspect-video shrink-0 lg:aspect-auto lg:flex-1 bg-black group overflow-hidden"
            onMouseMove={resetControlsTimeout}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onClick={(e) => {
              const rootIsYoutube = !!currentSrc && (currentSrc.includes("youtube.com") || currentSrc.includes("youtu.be"));
              if (!rootIsYoutube) togglePlay(e);
            }}
        >
            {(!currentSrc) ? null : (currentSrc.includes("youtube.com") || currentSrc.includes("youtu.be")) ? (
                <iframe
                    src={(() => {
                      const videoId = currentSrc.includes("youtu.be")
                        ? currentSrc.split("/").pop()?.split("?")[0]
                        : currentSrc.split("v=")[1]?.split("&")[0];
                      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0`;
                    })()}
                    className="w-full h-full object-contain"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <video
                    ref={videoRef}
                    src={currentSrc}
                    className="w-full h-full object-contain"
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    loop
                    playsInline
                />
            )}

            {/* Book Now Button - Top Right */}
            {currentBookingUrl && (
              <Button
                href={currentBookingUrl.startsWith("http") ? currentBookingUrl : `https://${currentBookingUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                className={cn(
                  "absolute top-4 left-4 md:left-auto md:right-4 z-30 text-white transition-all duration-300",
                  showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                )}
              >
                Book Now
                <ExternalLink size={14} />
              </Button>
            )}

            {/* Center Play/Pause Button Overlay */}
            {(!(!!currentSrc && (currentSrc.includes("youtube.com") || currentSrc.includes("youtu.be"))) && (!isPlaying || showControls)) && (
                <div className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-300",
                    !isPlaying ? "bg-black/20 backdrop-blur-[1px]" : "bg-transparent pointer-events-none"
                )}>
                     <div 
                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition-transform duration-300 text-white cursor-pointer pointer-events-auto hover:bg-[#f46b6b]/20 hover:border-[#f46b6b]"
                        onClick={togglePlay}
                     >
                        {isPlaying ? (
                             <Pause size={32} className="fill-white" />
                        ) : (
                             <Play size={32} className="ml-1 fill-white" />
                        )}
                     </div>
                </div>
            )}

            {/* Custom Controls Bar */}
            {!(!!currentSrc && (currentSrc.includes("youtube.com") || currentSrc.includes("youtu.be"))) && (
                <div 
                    className={cn(
                        "absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4 md:p-6 pt-12 transition-opacity duration-300 flex flex-col gap-4",
                        showControls ? "opacity-100" : "opacity-0"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Progress Bar */}
                    <div 
                        ref={progressRef}
                        className="w-full h-4 cursor-pointer group/progress relative flex items-center"
                        onClick={handleSeek}
                    >
                        <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#f46b6b] relative"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        {/* Scrub Handle */}
                        <div 
                            className="absolute h-3 w-3 bg-[#f46b6b] rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity transform scale-0 group-hover/progress:scale-100"
                            style={{ left: `${progress}%`, transform: `translateX(-50%)` }}
                        />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between font-mono text-xs text-white uppercase tracking-wider">
                        <div className="flex items-center gap-6">
                            <button onClick={togglePlay} className="hover:text-[#f46b6b] transition-colors">
                                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                            </button>
                            
                            <div className="flex items-center gap-2 opacity-60">
                                 <span>{formatTime(videoRef.current ? videoRef.current.currentTime : 0)}</span>
                                 <span>/</span>
                                 <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={toggleMute} className="hover:text-[#f46b6b] transition-colors">
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                            <button onClick={toggleFullscreen} className="hover:text-[#f46b6b] transition-colors">
                                 {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Sidebar */}
        <div className="flex-1 w-full lg:w-[360px] lg:flex-none bg-[#3f1d14] flex flex-col border-t lg:border-t-0 lg:border-l border-[#f46b6b]/10 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[#f46b6b]/10 bg-[#3f1d14]">
                <span className="font-serif text-lg text-[#f46b6b] tracking-wide">{sidebarTitle}</span>
            </div>

            {/* Video List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-4 bg-[#3f1d14]">
                {relatedVideos.map((gem) => (
                    <div 
                        key={gem.id}
                        onClick={() => !gem.locked && gem.src && handleVideoChange(gem.src, gem.id)}
                        className={cn(
                            "flex gap-4 group p-2 -mx-2 rounded-lg transition-colors items-center",
                            gem.locked || !gem.src ? "cursor-not-allowed opacity-60" : "cursor-pointer",
                            currentSrc === gem.src ? "bg-[#f46b6b]/10 border border-[#f46b6b]/20" : "hover:bg-[#f46b6b]/5 border border-transparent"
                        )}
                    >
                        {/* Thumbnail */}
                        <div className="relative w-[100px] aspect-video rounded-md overflow-hidden bg-black/20 shrink-0 border border-[#f46b6b]/10 group-hover:border-[#f46b6b]/30 transition-colors">
                            {(gem.id.startsWith("e") && gem.src && !(gem.src.includes("youtube.com") || gem.src.includes("youtu.be"))) ? (
                                <video
                                    src={gem.src}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    preload="auto"
                                    muted
                                    playsInline
                                    onLoadedMetadata={(e) => {
                                        const video = e.target as HTMLVideoElement;
                                        video.currentTime = gem.thumbnailTime ?? 0.01;
                                    }}
                                />
                            ) : (
                                <Image
                                    src={gem.image}
                                    alt={gem.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            )}
                            {/* Playing Indicator */}
                            {currentSrc === gem.src ? (
                                <div className="absolute inset-0 bg-[#f46b6b]/20 flex items-center justify-center">
                                    <svg 
                                        className="w-5 h-5 text-[#f46b6b] drop-shadow-[0_0_8px_rgba(244,107,107,0.8)] animate-pulse"
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 3h12l4 6-10 13L2 9Z" fill="currentColor" fillOpacity="0.2"/>
                                        <path d="M11 3 8 9l4 13 4-13-3-6" />
                                        <path d="M2 9h20" />
                                    </svg>
                                </div>
                            ) : (gem.locked || !gem.src) && (
                                /* Coming Soon Overlay */
                                <div className="absolute inset-0 bg-[#3f1d14]/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10 w-full h-full">
                                    <div className="p-1.5 bg-[#f46b6b]/20 rounded-full backdrop-blur-md border border-[#f46b6b]/40">
                                        <Lock className="w-3 h-3 text-[#f46b6b]" />
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Info */}
                        <div className="flex flex-col justify-center gap-1">
                            <h4 className={cn(
                                "font-serif text-sm font-medium leading-tight transition-colors",
                                currentSrc === gem.src ? "text-[#f46b6b]" : "text-[#fff7f0] group-hover:text-[#f46b6b]"
                            )}>
                                {gem.title}
                            </h4>
                            <span className="font-sans text-[10px] uppercase tracking-wide text-[#fff7f0]/50">
                                {gem.location}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            {currentBookingUrl && (
                <div className="p-6 border-t border-[#f46b6b]/10 bg-[#371911]">
                    <a 
                        href={currentBookingUrl.startsWith('http') ? currentBookingUrl : `https://${currentBookingUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between p-4 rounded-lg bg-[#f46b6b] hover:bg-[#d65252] transition-colors text-white group shadow-lg shadow-[#f46b6b]/10"
                    >
                        <div className="flex flex-col">
                            <span className="font-serif font-bold text-sm">Book Your Stay</span>
                            <span className="font-sans text-xs opacity-80">Experience Nomad Gems</span>
                        </div>
                        <ExternalLink size={18} className="opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
