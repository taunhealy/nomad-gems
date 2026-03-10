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
  Briefcase,
  MapPin,
  ExternalLink,
  Globe,
  MessageCircle,
  Calendar,
  Search
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
            <Link href="/" className="mt-6 text-[#f46b6b] hover:underline inline-block font-medium">Back to home</Link>
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
              s <= rating ? "fill-[#f46b6b] text-[#f46b6b]" : "text-gray-300"
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
      
      {/* Hero Video Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden bg-black text-left">
        {gem.src && (
          <video
            src={gem.src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-[1440px] mx-auto right-0 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#f46b6b] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                {gem.category}
              </span>
              <div className="flex items-center gap-2 text-white/90 text-sm font-sans tracking-wide">
                <MapPin size={16} className="text-[#f46b6b]" />
                {gem.location}
              </div>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif font-medium leading-[0.9] tracking-tighter">
              {gem.title}
            </h1>
          </div>
          
          {gem.bookingUrl && (
            <a 
              href={gem.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f46b6b] text-white px-10 py-5 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-500 shadow-2xl flex items-center gap-3 group w-fit mb-4"
            >
              <span className="text-lg">Book Stay</span>
              <ExternalLink className="w-5 h-5 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-16 md:py-32 text-left">
        
        {/* Intro Section */}
        <section className="mb-32 flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1">
             <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-[#f46b6b] mb-6 font-bold">The Retreat</h3>
             <p className="text-4xl md:text-6xl font-serif leading-tight text-black italic tracking-tighter">
               "{gem.description || "Experience the perfect blend of natural beauty and productive energy."}"
             </p>
          </div>
          <div className="flex-1 text-black/60 text-xl leading-relaxed pt-2 lg:pt-20">
            We provide an honest, boots-on-the-ground look at what it's really like to work from {gem.title}. Rather than just showing the highlights, we audit the strengths and weaknesses of the remote work setup, so you know exactly what to expect before you book.
          </div>
        </section>

        {/* Remote Work Analysis */}
        <section className="mb-32 bg-[#3f1d14] rounded-[40px] p-8 md:p-20 text-white overflow-hidden relative border border-white/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#f46b6b]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col xl:flex-row gap-16 xl:gap-32">
            {/* Left: Heading */}
            <div className="flex-1 flex flex-col gap-8">
              <div className="inline-flex items-center gap-3 py-2 px-4 bg-white/10 backdrop-blur-md rounded-xl text-[#f46b6b] border border-white/10 w-fit">
                <Briefcase size={20} />
                <span className="text-sm font-bold uppercase tracking-widest">Workspace Audit</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-medium leading-none tracking-tight text-white mb-2">
                Remote Work <br className="hidden md:block" /> Analysis
              </h2>
              <p className="text-white/60 text-xl leading-relaxed max-w-lg">
                An analysis of the remote work infrastructure at {gem.title}.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                 <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <Check size={20} />
                    </div>
                    <span className="text-sm font-medium">Backup Power Ready</span>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <Check size={20} />
                    </div>
                    <span className="text-sm font-medium">Outside Work Area with Plug-point</span>
                 </div>
              </div>
            </div>

            {/* Right: Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Work Areas */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col gap-6 hover:bg-white/15 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f46b6b]/20 flex items-center justify-center text-[#f46b6b] group-hover:scale-110 transition-transform">
                    <Laptop size={24} />
                  </div>
                  <span className="text-3xl font-serif font-bold">{gem.workAreas || 0}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Work Areas</h3>
                  <p className="text-sm text-white/50 mt-1 uppercase tracking-tighter font-bold">Dedicated desks</p>
                </div>
              </div>

              {/* Wifi */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col gap-6 hover:bg-white/15 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f46b6b]/20 flex items-center justify-center text-[#f46b6b] group-hover:scale-110 transition-transform">
                    <Wifi size={24} />
                  </div>
                  <StarRating rating={gem.wifiQuality || 0} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">WiFi Quality</h3>
                  <p className="text-sm text-white/50 mt-1 uppercase tracking-tighter font-bold">High-bandwidth fiber</p>
                </div>
              </div>

              {/* Ergonomics */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col gap-6 hover:bg-white/15 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f46b6b]/20 flex items-center justify-center text-[#f46b6b] group-hover:scale-110 transition-transform">
                    <Star size={24} />
                  </div>
                  <StarRating rating={gem.ergonomicComfort || 0} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ergonomics</h3>
                  <p className="text-sm text-white/50 mt-1 uppercase tracking-tighter font-bold">Verified comfort</p>
                </div>
              </div>

              {/* Cellular */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col gap-6 hover:bg-white/15 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f46b6b]/20 flex items-center justify-center text-[#f46b6b] group-hover:scale-110 transition-transform">
                    <Signal size={24} />
                  </div>
                  <StarRating rating={gem.cellularStrength || 0} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Signal Strength</h3>
                  <p className="text-sm text-white/50 mt-1 uppercase tracking-tighter font-bold">Reliable backup</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* At a Glance Section */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-black/10 pb-8 gap-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-[#f46b6b] font-bold">Quick Details</h3>
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
                    <Globe size={20} className="text-[#f46b6b]" />
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-black/40 font-bold mb-1">Website</p>
                    <a href={gem.website} target="_blank" rel="noopener noreferrer" className="text-xl font-serif text-black hover:text-[#f46b6b] transition-colors">
                      {gem.website.replace('https://', '').replace('/', '')}
                    </a>
                  </div>
                </div>
              )}

              {gem.address && (
                <div className="flex items-start gap-6 border-b border-black/5 pb-6">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#f46b6b]" />
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-black/40 font-bold mb-1">Address</p>
                    <p className="text-xl font-serif text-black">{gem.address}</p>
                  </div>
                </div>
              )}

              {gem.whatsapp && (
                <div className="flex items-start gap-6 border-b border-black/5 pb-6">
                  <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                    <MessageCircle size={20} className="text-[#f46b6b]" />
                  </div>
                  <div>
                    <p className="text-xs font-sans uppercase tracking-widest text-black/40 font-bold mb-1">WhatsApp</p>
                    <a href={`https://wa.me/${gem.whatsapp.replace('+', '')}`} className="text-xl font-serif text-black hover:text-[#f46b6b] transition-colors">
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
                      <a 
                        href={gem.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#f46b6b] text-white px-8 py-5 rounded-full font-bold hover:bg-black transition-all flex items-center justify-center gap-3 flex-1 text-center"
                      >
                        <Calendar size={20} />
                        <span>Book Now</span>
                      </a>
                    )}
                    
                    {gem.googleMapsUrl && (
                      <a 
                        href={gem.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-black/10 text-black px-8 py-5 rounded-full font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 flex-1 text-center"
                      >
                        <Search size={20} />
                        <span>View on Google</span>
                      </a>
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
                <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-[#f46b6b] font-bold">Property Tours</h3>
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
              <h3 className="text-xs font-sans uppercase tracking-[0.3em] text-[#f46b6b] font-bold">Surroundings</h3>
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
