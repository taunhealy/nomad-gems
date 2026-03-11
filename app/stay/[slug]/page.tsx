"use client";

import { use, useState, useRef, useEffect } from "react";
import { GEMS, ENVIRONMENTS, TOURS, Gem } from "@/lib/data";
import { VideoModal } from "@/components/VideoModal";
import GemCard from "@/components/GemCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Laptop, 
  Wifi, 
  Signal, 
  Star, 
  Check, 
  MapPin,
  ExternalLink,
  Globe,
  MessageCircle,
  Calendar,
  Search,
  Info,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function StayPage({ params }: PageProps) {
  const { slug } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [currentBookingUrl, setCurrentBookingUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const gem = GEMS.find(g => 
    g.id === slug || 
    g.title.toLowerCase().replace(/ /g, "-") === slug ||
    g.href.split("/").pop() === slug
  );

  const handleEnvClick = (src?: string, bookingUrl?: string) => {
    if (src) {
        setCurrentVideoSrc(src);
        setCurrentBookingUrl(bookingUrl || "");
        setIsModalOpen(true);
    }
  };

  if (!gem) {
    return (
      <div className="min-h-screen bg-[#fffefe] flex flex-col items-center justify-center font-sans text-black">
        <Navbar />
        <div className="pt-32 text-center">
            <h1 className="text-4xl font-serif text-black">Gem not found</h1>
            <p className="text-black/40 mt-2 text-sm uppercase tracking-widest font-bold">SLUG: {slug}</p>
            <Link href="/" className="mt-6 text-nomad-red hover:underline inline-block font-medium">Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            size={16} 
            className={cn(
              s <= rating ? "fill-nomad-red text-nomad-red" : "text-gray-300"
            )} 
          />
        ))}
      </div>
    );
  };

  const displayEnvironments = ENVIRONMENTS.filter(e => 
    e.location.includes(gem.location.split(',')[0]) || 
    e.region === gem.region
  ).slice(0, 3);

  const displayTours = TOURS.filter(t => 
    gem.tours?.includes(t.id)
  );

  return (
    <div className="min-h-screen bg-[#fffefe]">
      <Navbar />
      
      {/* Hero Header Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-black text-left">
        {gem.image && (
          <img
            src={gem.image}
            alt={gem.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-[1440px] mx-auto right-0 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-nomad-red text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                {gem.category}
              </span>
              <div className="flex items-center gap-2 text-white/90 text-sm font-sans tracking-wide">
                <MapPin size={16} className="text-nomad-red" />
                {gem.location}
              </div>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif font-medium leading-[0.9] tracking-tighter">
              {gem.title}
            </h1>
          </div>
          
          {gem.bookingUrl && (
            <Button 
              href={gem.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="shadow-2xl mb-4"
            >
              <span className="text-lg">Book Stay</span>
              <ExternalLink className="w-5 h-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-16 md:py-32 text-left">
        
        {/* Intro Section */}
        <section className="mb-32 flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1">
             <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-nomad-red mb-6 font-bold">The Retreat</h3>
             <p className="text-4xl md:text-6xl font-serif leading-[1.1] text-black italic tracking-tighter">
               "{gem.description || "Experience the perfect blend of natural beauty and productive energy."}"
             </p>
          </div>
          <div className="flex-1 text-black/60 text-xl leading-relaxed pt-2 lg:pt-20">
            We provide an honest, boots-on-the-ground look at what it's really like to work from {gem.title}. Rather than just showing the highlights, we audit the strengths and weaknesses of the remote work setup, so you know exactly what to expect before you book.
          </div>
        </section>

        {/* Remote Work Analysis */}
        <section className="mb-32 bg-nomad-brown rounded-[60px] p-8 md:p-16 lg:p-24 text-white overflow-hidden relative border border-white/5 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-nomad-red/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-24 items-start">
            {/* Left Column: Heading & Audit Report */}
            <div className="flex flex-col gap-12 w-full">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-3 py-2.5 px-5 bg-white/5 backdrop-blur-xl rounded-full text-nomad-red border border-white/10 w-fit">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] leading-none">Independent Audit</span>
                </div>
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium leading-[0.9] tracking-tighter text-white m-0">
                  Remote Work <br className="hidden md:block" /> Analysis
                </h2>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mt-4 font-sans">
                  A boots-on-the-ground evaluation of the remote work infrastructure at&nbsp;<span className="text-white font-medium">{gem.title}.</span>
                </p>
              </div>

              {/* Unified Audit Report Card */}
              <div className="glass-card p-10 md:p-12 w-full relative overflow-hidden group shadow-inner">
                
                {/* Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-16 border-b border-white/10 pb-10">
                  <div className="flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-2 premium-tag">
                      <div className="w-1.5 h-1.5 rounded-full bg-nomad-red animate-pulse" />
                      Verification Status
                    </div>
                    <h4 className="professional-heading text-5xl! tracking-tight">Workspace Audit</h4>
                  </div>
                  <div className="flex flex-col gap-3 text-left sm:text-right">
                    <span className="metric-label">Last Verified</span>
                    <div className="flex items-center sm:justify-end gap-3">
                      <Calendar size={18} className="text-nomad-red opacity-60" />
                      <span className="text-2xl font-serif text-white/90 leading-tight tracking-tight">{gem.lastAuditDate || "March 2026"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
                  {/* Section 1: Verified Essentials */}
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-2 metric-label">
                      Verified Essentials
                    </div>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-5 group/item">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 group-hover/item:bg-green-500/20 transition-all shrink-0">
                          <Check size={24} />
                        </div>
                        <span className="text-base font-serif text-white/90 leading-tight">Outside Working Area <br/> with Plug&#8209;point</span>
                      </div>
                      {gem.backupPowerReady && (
                        <div className="flex items-center gap-5 group/item">
                          <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 group-hover/item:bg-green-500/20 transition-all shrink-0">
                            <Check size={24} />
                          </div>
                          <span className="text-base font-serif text-white/90">Backup Power Ready</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 2: Recommended Upgrades */}
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-2 premium-tag">
                      Professional Upgrades
                    </div>
                    <div className="flex flex-col gap-6">
                      {gem.recommendedImprovements && gem.recommendedImprovements.length > 0 ? (
                        gem.recommendedImprovements.map((item, i) => (
                           <div key={i} className="flex items-center gap-5 group/item">
                              <div className="w-12 h-12 rounded-2xl bg-nomad-red/10 border border-nomad-red/20 flex items-center justify-center text-nomad-red group-hover/item:bg-nomad-red/20 transition-all shrink-0">
                                <TrendingUp size={22} />
                              </div>
                              {item.href ? (
                                <a 
                                  href={item.href} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-base font-serif text-white hover:text-nomad-red transition-colors underline decoration-nomad-red/30 underline-offset-8 flex items-center gap-2"
                                >
                                  {item.label}
                                  <ExternalLink size={14} className="opacity-40" />
                                </a>
                              ) : (
                                <span className="text-base font-serif text-white/90">{item.label}</span>
                              )}
                           </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-5 opacity-40">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                            <Info size={22} />
                          </div>
                          <span className="text-base italic font-serif text-white/40">Highly curated setup</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Status */}
                <div className="mt-16 pt-10 border-t border-white/10 text-left">
                  <div className="flex flex-col gap-5">
                    {gem.improvements && gem.improvements.length > 0 ? (
                      <>
                        <span className="metric-label text-white/40">Recent property updates:</span>
                        <ul className="flex flex-wrap gap-x-8 gap-y-3">
                           {gem.improvements.map((imp, i) => (
                             <li key={i} className="flex items-center gap-3 text-sm text-white/70 font-serif">
                               <div className="w-1.5 h-1.5 rounded-full bg-nomad-red/60" />
                               {imp}
                             </li>
                           ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-[10px] text-white/30 italic uppercase tracking-[0.4em] font-bold">Verified for workation compliance</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full text-left self-start lg:mt-32 xl:mt-48">
              {/* Work Areas */}
              <div className="glass-card glass-card-hover p-10 flex flex-col group h-full min-h-[260px]">
                <div className="mb-10">
                  <p className="premium-tag mb-2">Work Areas</p>
                  <h3 className="professional-heading text-3xl! font-medium leading-tight">Dedicated desks</h3>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-nomad-red/10 flex items-center justify-center text-nomad-red group-hover:scale-110 group-hover:bg-nomad-red/20 transition-all duration-500 shadow-lg shadow-nomad-red/5">
                    <Laptop size={28} />
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-5xl font-serif text-white leading-none">{gem.workAreas || 0}</span>
                    <span className="metric-label text-[9px]!">Desks</span>
                  </div>
                </div>
              </div>

              {/* Wifi */}
              <div className="glass-card glass-card-hover p-10 flex flex-col group h-full min-h-[260px]">
                <div className="mb-10">
                  <p className="premium-tag mb-2">WiFi Quality</p>
                  <h3 className="professional-heading text-3xl! font-medium leading-tight">High-bandwidth fiber</h3>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-nomad-red/10 flex items-center justify-center text-nomad-red group-hover:scale-110 group-hover:bg-nomad-red/20 transition-all duration-500 shadow-lg shadow-nomad-red/5">
                    <Wifi size={28} />
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <StarRating rating={gem.wifiQuality || 0} />
                    <span className="metric-label text-[9px]!">ISP Quality</span>
                  </div>
                </div>
              </div>

              {/* Ergonomics */}
              <div className="glass-card glass-card-hover p-10 flex flex-col group h-full min-h-[260px]">
                <div className="mb-10">
                  <p className="premium-tag mb-2">Ergonomics</p>
                  <h3 className="professional-heading text-3xl! font-medium leading-tight">Desk & Chair focus</h3>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-nomad-red/10 flex items-center justify-center text-nomad-red group-hover:scale-110 group-hover:bg-nomad-red/20 transition-all duration-500 shadow-lg shadow-nomad-red/5">
                    <Star size={28} />
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <StarRating rating={gem.ergonomicComfort || 0} />
                    <span className="metric-label text-[9px]!">Comfort</span>
                  </div>
                </div>
              </div>

              {/* Cellular */}
              <div className="glass-card glass-card-hover p-10 flex flex-col group h-full min-h-[260px]">
                <div className="mb-10">
                  <p className="premium-tag mb-2">Signal Strength</p>
                  <h3 className="professional-heading text-3xl! font-medium leading-tight">Reliable backup</h3>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-nomad-red/10 flex items-center justify-center text-nomad-red group-hover:scale-110 group-hover:bg-nomad-red/20 transition-all duration-500 shadow-lg shadow-nomad-red/5">
                    <Signal size={28} />
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <StarRating rating={gem.cellularStrength || 0} />
                    <span className="metric-label text-[9px]!">Signal Strength</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* At a Glance Section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-black/10 pb-8 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-nomad-red font-bold">Quick Details</h3>
              <h2 className="text-5xl md:text-7xl font-serif font-medium leading-none tracking-tight text-black">
                At a Glance
              </h2>
            </div>
            <div className="text-black/40 font-sans uppercase tracking-widest text-sm">
              Contact & Booking Information
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info List */}
            <div className="flex flex-col gap-8">
              {gem.website && (
                <div className="flex items-start gap-6 border-b border-black/5 pb-6">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <Globe size={20} className="text-nomad-red" />
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-black/40 font-bold mb-1">Website</p>
                    <a href={gem.website} target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-black hover:text-nomad-red transition-colors">
                      {gem.website.replace('https://', '').replace('/', '')}
                    </a>
                  </div>
                </div>
              )}

              {gem.address && (
                <div className="flex items-start gap-6 border-b border-black/5 pb-6">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-nomad-red" />
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-black/40 font-bold mb-1">Address</p>
                    <a 
                      href={gem.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gem.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-serif text-black hover:text-nomad-red transition-colors cursor-pointer"
                    >
                      {gem.address}
                    </a>
                  </div>
                </div>
              )}

              {gem.whatsapp && (
                <div className="flex items-start gap-6 border-b border-black/5 pb-6">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <MessageCircle size={20} className="text-nomad-red" />
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-black/40 font-bold mb-1">WhatsApp</p>
                    <a href={`https://wa.me/${gem.whatsapp.replace('+', '')}`} className="text-xl font-serif text-black hover:text-nomad-red transition-colors">
                      {gem.whatsapp}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-6">
               <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-[40px] border border-black/5 flex flex-col gap-8 h-full">
                  <h4 className="text-2xl font-serif italic text-black/80">Ready to book your stay or explore their Google listing?</h4>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    {gem.bookingUrl && (
                      <Button 
                        href={gem.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                        size="lg"
                      >
                        <Calendar size={20} />
                        Book Now
                      </Button>
                    )}
                    
                    {gem.googleMapsUrl && (
                      <Button 
                        href={gem.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        className="flex-1 bg-white border-black/10 text-black hover:border-black"
                        size="lg"
                      >
                        <Search size={20} />
                        View on Google
                      </Button>
                    )}
                  </div>

                  <p className="text-black/40 text-sm font-sans italic">
                    All bookings are handled directly by the property via their official booking engine.
                  </p>
               </div>
            </div>
          </div>
        </section>
        
        {/* Tours Section */}
        {displayTours.length > 0 && (
          <section className="mb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-black/10 pb-8 gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-nomad-red font-bold">Property Tours</h3>
                <h2 className="text-5xl md:text-7xl font-serif font-medium leading-none tracking-tight text-black">
                  The Tour
                </h2>
              </div>
              <div className="text-black/40 font-sans uppercase tracking-widest text-sm">
                Explore {gem.title}
              </div>
            </div>

            {displayTours.length === 1 ? (
              <div className="max-w-[1000px] mx-auto w-full">
                <GemCard 
                  gem={displayTours[0] as any} 
                  onClick={() => handleEnvClick(displayTours[0].src)} 
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayTours.map((tour) => (
                  <GemCard 
                    key={tour.id} 
                    gem={tour as any} 
                    onClick={() => handleEnvClick(tour.src)} 
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Environment Grid */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-black/10 pb-8 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-nomad-red font-bold">Surroundings</h3>
              <h2 className="text-5xl md:text-7xl font-serif font-medium leading-none tracking-tight text-black">
                The Environment
              </h2>
            </div>
            <div className="text-black/40 font-sans uppercase tracking-widest text-sm">
              Discover {gem.location.split(',')[0]}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayEnvironments.map((env) => (
              <GemCard 
                key={env.id} 
                gem={env} 
                onClick={() => handleEnvClick(env.src, env.bookingUrl)} 
              />
            ))}
          </div>
        </section>

      </main>

      <Footer />

      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoSrc={currentVideoSrc}
        bookingUrl={currentBookingUrl}
      />
    </div>
  );
}
