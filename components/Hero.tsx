"use client";

import Image from "next/image";
import Button from "./Button";

const imgHero = "https://images.unsplash.com/photo-1697807650304-907257330a3e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen max-h-[900px] min-h-[600px] overflow-hidden">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-12 text-center">
        <h1 className="font-serif font-extrabold text-[48px] md:text-[96px] text-white leading-none text-center">
          Nomad Gems
        </h1>
        
        <div className="flex flex-col md:flex-row items-center gap-[10px] text-white w-full md:w-auto">
          <div className="w-full md:w-auto">
            <Button 
              variant="primary" 
              size="md"
              rounded={false}
              onClick={() => scrollToSection("#gems")}
              className="w-full md:w-auto md:px-10 md:py-4 md:text-base"
            >
              Explore Stays
            </Button>
          </div>
          <div className="w-full md:w-auto">
            <Button 
              variant="outline" 
              size="md"
              onClick={() => scrollToSection("#feature")}
              className="w-full md:w-auto md:px-10 md:py-4 md:text-base"
            >
              Feature Your Retreat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
