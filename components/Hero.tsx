"use client";

import Image from "next/image";

const imgHero = "https://images.unsplash.com/photo-1697807650304-907257330a3e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[912px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          alt="Hero background"
          src={imgHero}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.52)]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pb-[154px]">
        <h1 className="font-serif font-extrabold text-[96px] text-white leading-none text-center">
          Nomad Gems
        </h1>
        
        <div className="flex items-end gap-[10px]">
          <button 
            onClick={() => scrollToSection("#gems")}
            className="bg-[#f46b6b] h-[48px] w-[215px] flex items-center justify-center font-sans font-regular text-[18px] text-white tracking-wide hover:bg-[#e05a5a] transition-colors cursor-pointer"
          >
            Explore Stays
          </button>
          <button 
            onClick={() => scrollToSection("#feature")}
            className="bg-[#f7e1d1] h-[48px] w-[215px] flex items-center justify-center font-sans font-regular text-[18px] text-[#101010] tracking-wide hover:bg-[#e6d0c0] transition-colors cursor-pointer"
          >
            Feature Your Retreat
          </button>
        </div>
      </div>
    </div>
  );
}
