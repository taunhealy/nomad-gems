import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import Image from "next/image";
import { Gem } from "lucide-react";
import LatestGems from "@/components/LatestGems";
import MapSection from "@/components/MapSection";
import Link from "next/link";
import Button from "@/components/Button";
import BlogSection from "@/components/BlogSection";
import EnvironmentCards from "@/components/EnvironmentCards";
import Footer from "@/components/Footer";
const imgCard = "/images/card_img.png";

export default function Home() {
  return (
    <div className="bg-[#fff7f0] content-stretch flex flex-col items-center relative size-full overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Value Prop Section */}
      <ValueProp />

      {/* Latest Gems Section */}
      <div id="gems" className="w-full">
        <LatestGems />
      </div>

      {/* Environment Section */}
      <EnvironmentCards />

      {/* Map Section */}
      <MapSection />

      {/* Blog Section */}
      <BlogSection />

      <Footer />
    </div>
  );
}
