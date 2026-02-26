import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import Image from "next/image";
import { Gem } from "lucide-react";
import LatestGems from "@/components/LatestGems";
import Link from "next/link";
import Button from "@/components/Button";
import BlogSection from "@/components/BlogSection";
import EnvironmentCards from "@/components/EnvironmentCards";
import Footer from "@/components/Footer";
const imgCard = "/images/card_img.png";

export default function Home() {
  return (
    <div className="bg-[#fff7f0] content-stretch flex flex-col items-center relative size-full">
      <Navbar />
      <Hero />
      
      {/* Value Prop Section */}
      <ValueProp />

      {/* Works / Latest Gems Section */}
      <div id="gems" className="w-full">
        <LatestGems />
      </div>

      {/* Feature Your Retreat Section */}
      <div id="feature" className="bg-white w-full flex flex-col items-center py-16 md:py-[80px] px-6 md:px-[100px]">
        <div className="max-w-[800px] w-full flex flex-col items-center gap-8 md:gap-12 text-center">
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif font-medium text-[40px] md:text-[72px] text-black leading-tight">
              Feature Your Retreat
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] text-[#4a4a4a] leading-relaxed max-w-[600px] mx-auto">
              Own a work-ready retreat in nature? We'd love to feature your property on Nomad Gems. 
              Share your details and we'll get back to you.
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-center">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="h-[56px] w-full md:w-[380px] bg-[#fff0e6] rounded-full px-8 font-sans text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f46b6b] transition-all border border-[#f46b6b]/20"
              suppressHydrationWarning
            />
            <div className="w-full md:w-auto">
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Optional: Small helper text */}
          <p className="font-sans text-sm text-black/40 italic">
            We typically respond within 24 hours
          </p>
        </div>
      </div>

      {/* Environment Section */}
      <EnvironmentCards />

      {/* Blog Section */}
      <BlogSection />

      <Footer />
    </div>
  );
}
