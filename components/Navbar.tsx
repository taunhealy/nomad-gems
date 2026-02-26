"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ArrowLink from "./ArrowLink";
import GemCard from "./GemCard";
import { VideoModal } from "./VideoModal";
import { GEMS, ENVIRONMENTS } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/blog-data";
import Image from "next/image";

// Pages that don't scroll — navbar should always be solid on these
const ALWAYS_SOLID_PATHS = ["/map"];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [currentBookingUrl, setCurrentBookingUrl] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Build the timeline once on mount
  useGSAP(() => {
    if (!containerRef.current || !linksRef.current || !footerRef.current) return;

    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => setIsMenuVisible(false),
    });

    tl.to(containerRef.current, {
      xPercent: 0,
      x: 0,
      duration: 0.8,
      ease: "power3.inOut",
    })
    .fromTo(
      linksRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4" // overlap with slide
    )
    .fromTo(
      footerRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );

    tlRef.current = tl;
  }, { scope: containerRef });

  useGSAP(() => {
    if (!tlRef.current) return;
    if (isMenuOpen) {
      setIsMenuVisible(true);
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const alwaysSolid = ALWAYS_SOLID_PATHS.includes(pathname);
  const isSolid = (alwaysSolid || isHovered || isScrolled) && !isMenuVisible;

  return (
    <nav 
      className={`flex items-center justify-between px-6 md:px-[90px] h-[80px] w-full fixed top-0 z-50 transition-colors duration-300 ${isSolid ? "bg-white border-b border-black/5" : "bg-transparent border-b border-transparent"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center h-full p-[10px] z-[200] relative">
        <Link 
          href="/" 
          className={`font-serif font-bold text-[24px] leading-none text-center transition-colors duration-300 ${isMenuVisible ? "text-white" : isSolid ? "text-black" : "text-white"}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Nomad Gems
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center h-full gap-[30px] justify-end">
        {/* About — mega menu */}
        <div 
            className="h-full flex items-center"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
        >
            <Link
            href="/about"
            className={`group flex items-center justify-center font-sans text-[16px] uppercase tracking-widest transition-colors duration-300 cursor-pointer h-full ${isSolid ? (isAboutOpen ? "text-black" : "text-black/60 hover:text-black") : (isAboutOpen ? "text-white" : "text-white/80 hover:text-white")}`}
            >
            <span className="relative">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#f46b6b] transition-all duration-300 group-hover:w-full" />
            </span>
            </Link>

            {/* Scale-in Mega Menu */}
            <div 
                className={`absolute left-0 top-[80px] w-full bg-white border-b border-black/5 shadow-xl transition-all duration-300 origin-top overflow-hidden ${
                    isAboutOpen ? "opacity-100 visible max-h-[600px]" : "opacity-0 invisible max-h-0"
                }`}
            >
                <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[90px] py-12 flex gap-16">
                    {/* Navigation */}
                    <div className="flex flex-col gap-6 w-1/3 border-r border-black/10 pr-8">
                         <span className="font-serif font-medium text-2xl text-black mb-2">Company</span>
                         <ArrowLink text="Our Philosophy" href="/about#philosophy" />
                         <ArrowLink text="Verification Process" href="/about#process" />
                         <ArrowLink text="Our Principles" href="/about#principles" />
                         <ArrowLink text="Contact Us" href="#contact" />
                    </div>

                    {/* Featured Content */}
                    <div className="flex flex-col gap-4 w-2/3">
                        <h4 className="font-serif font-medium text-3xl text-black">Work Without Walls</h4>
                        <p className="font-sans text-black/60 max-w-[400px] leading-relaxed">
                            We believe that deep focus happens best in nature. That's why we're building a network of verified stays designed for productivity.
                        </p>
                         <div className="mt-4">
                            <ArrowLink text="Read Our Story" href="/about" />
                         </div>
                    </div>
                </div>
            </div>
        </div>


        {/* Map */}
        <div 
            className="h-full flex items-center"
            onMouseEnter={() => setIsMapOpen(true)}
            onMouseLeave={() => setIsMapOpen(false)}
        >
            <Link
            href="/map"
            className={`group flex items-center justify-center font-sans text-[16px] uppercase tracking-widest transition-colors duration-300 cursor-pointer h-full ${isSolid ? (isMapOpen ? "text-black" : "text-black/60 hover:text-black") : (isMapOpen ? "text-white" : "text-white/80 hover:text-white")}`}
            >
            <span className="relative">
              Gems
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#f46b6b] transition-all duration-300 group-hover:w-full" />
            </span>
            </Link>

            {/* Scale-in Mega Menu */}
            <div 
                className={`absolute left-0 top-[80px] w-full bg-white border-b border-black/5 shadow-xl transition-all duration-300 origin-top overflow-hidden ${
                    isMapOpen ? "opacity-100 visible max-h-[600px]" : "opacity-0 invisible max-h-0"
                }`}
            >
                <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[90px] py-12 flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-black/10 pb-4">
                        <span className="font-serif font-medium text-2xl text-black">Latest Additions</span>
                        <ArrowLink text="View Full Collection" href="/work" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8">
                        {GEMS.slice(0, 3).map((gem) => (
                            <div key={gem.id} className="w-full">
                                <GemCard 
                                    gem={gem} 
                                    onClick={(src, bookingUrl) => {
                                        if (src) {
                                            setCurrentVideoSrc(src);
                                            setCurrentBookingUrl(bookingUrl || "");
                                            setIsModalOpen(true);
                                        }
                                    }} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


        {/* Contact — mega menu */}
        <div 
            className="h-full flex items-center"
            onMouseEnter={() => setIsContactOpen(true)}
            onMouseLeave={() => setIsContactOpen(false)}
        >
            <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setIsContactOpen(false);
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`group flex items-center justify-center font-sans text-[16px] uppercase tracking-widest transition-colors duration-300 cursor-pointer h-full ${isSolid ? (isContactOpen ? "text-black" : "text-black/60 hover:text-black") : (isContactOpen ? "text-white" : "text-white/80 hover:text-white")}`}
            >
            <span className="relative">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#f46b6b] transition-all duration-300 group-hover:w-full" />
            </span>
            </Link>

            {/* Scale-in Mega Menu */}
            <div 
                className={`absolute left-0 top-[80px] w-full bg-white border-b border-black/5 shadow-xl transition-all duration-300 origin-top overflow-hidden ${
                    isContactOpen ? "opacity-100 visible max-h-[600px]" : "opacity-0 invisible max-h-0"
                }`}
            >
                <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[90px] py-12 flex flex-col gap-8">
                    <div className="flex items-center justify-between border-b border-black/10 pb-4">
                        <span className="font-serif font-medium text-2xl text-black">Get in Touch</span>
                        <ArrowLink text="Email Now" href="mailto:hello@blueowlmedia.nz" /> 
                    </div>

                    <div>
                        <a 
                            href="mailto:hello@blueowlmedia.nz" 
                            className="font-serif font-medium text-4xl md:text-5xl text-black hover:text-[#f46b6b] transition-colors leading-tight"
                        >
                            hello@blueowlmedia.nz
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoSrc={currentVideoSrc}
        bookingUrl={currentBookingUrl}
      />

      {/* Mobile Menu Button */}
      <button 
        className={`md:hidden z-[200] relative w-[48px] h-[48px] flex items-center justify-center transition-colors duration-300 cursor-pointer ${isMenuVisible ? "text-white" : isSolid ? "text-black" : "text-white"}`}
        onClick={toggleMenu}
      >
        <Menu 
          size={32} 
          strokeWidth={1.5} 
          className={`absolute transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuVisible ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} 
        />
        <X 
          size={32} 
          strokeWidth={1.5} 
          className={`absolute transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMenuVisible ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} 
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        ref={containerRef}
        className="fixed inset-0 bg-[#3f1d14] flex flex-col p-8 pt-[120px] md:hidden z-[100] translate-x-full overflow-y-auto"
      >
        <div ref={linksRef} className="flex flex-col gap-6 md:gap-8 items-start pb-8">
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="font-serif text-[48px] text-[#f46b6b] hover:text-white transition-colors leading-none tracking-tight opacity-0"
          >
            About
          </Link>
          <Link
            href="/map"
            onClick={() => setIsMenuOpen(false)}
            className="font-serif text-[48px] text-[#f46b6b] hover:text-white transition-colors leading-none tracking-tight opacity-0"
          >
            Gems
          </Link>
          
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="font-serif text-[48px] text-[#f46b6b] hover:text-white transition-colors leading-none tracking-tight opacity-0"
          >
            Contact
          </Link>

          {/* Featured Gem in Mobile Menu */}
          <div className="w-full mt-8 opacity-0">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#f46b6b] mb-4 block">Featured Gem</span>
            <div className="w-full max-w-[320px]">
               <GemCard 
                  gem={GEMS[0]} 
                  variant="dark"
                  onClick={(src, bookingUrl) => {
                      setIsMenuOpen(false);
                      if (src) {
                          setCurrentVideoSrc(src);
                          setCurrentBookingUrl(bookingUrl || "");
                          setIsModalOpen(true);
                      } else if (bookingUrl) {
                          window.open(bookingUrl, "_blank");
                      }
                  }} 
               />
            </div>
          </div>
        </div>

        <div ref={footerRef} className="flex flex-col gap-6 border-t border-white/10 pt-8 opacity-0 mt-auto pb-4">
            <div className="flex flex-col gap-2">
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#f46b6b]">Contact</span>
                <a href="mailto:hello@blueowlmedia.nz" className="font-sans text-lg text-white/60">hello@blueowlmedia.nz</a>
            </div>
            
            <p className="font-sans text-xs text-white/20 uppercase tracking-widest mt-4">
                © 2026 Nomad Gems
            </p>
        </div>
      </div>
    </nav>
  );
}
