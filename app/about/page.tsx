"use client";

import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import Image from "next/image";
import { Wifi, Monitor, TreePine, Sun, Mountain, Headphones, Gem } from "lucide-react";
import Footer from "@/components/Footer";

const heroImg =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const features = [
  {
    icon: Wifi,
    title: "High-Speed Connectivity",
    description:
      "Every gem is verified for 10 Mbps+ download speeds (25+ Mbps ideal). Video calls, cloud syncs, and deploys — without the anxiety.",
  },
  {
    icon: Monitor,
    title: "Ergonomic Workspaces",
    description:
      "Dedicated desks, quality chairs, and ample natural light. Your posture and productivity will thank you.",
  },
  {
    icon: Headphones,
    title: "Deep Focus Zones",
    description:
      "Quiet rooms, noise-cancelling environments, and separation from common areas. Built for flow state.",
  },
  {
    icon: Sun,
    title: "Golden Hour Breaks",
    description:
      "Step away from the screen into golden-hour light. Every gem is positioned for stunning natural transitions.",
  },
  {
    icon: Mountain,
    title: "Nature at Your Door",
    description:
      "Trails, lakes, coastlines — minutes away. The kind of environment that makes deep work feel effortless.",
  },
  {
    icon: TreePine,
    title: "Off-Grid Recharge",
    description:
      "Disconnect from the noise without losing connection. Find the balance between wilderness and workflow.",
  },
];

const principles = [
  {
    number: "01",
    title: "Work comes first.",
    description:
      "We don't compromise on connectivity or workspace quality. Every gem is a productivity-first environment.",
  },
  {
    number: "02",
    title: "Nature amplifies focus.",
    description:
      "Studies show proximity to nature boosts cognitive function by 20%. We curate locations that harness this.",
  },
  {
    number: "03",
    title: "Routine, redefined.",
    description:
      "Morning coffee with mountain views. Midday deep work. Sunset walks. A rhythm designed for peak performance.",
  },
];

const stats = [
  { value: "10+", label: "Mbps Minimum" },
  { value: "100%", label: "Verified Stays" },
  { value: "24/7", label: "Support" },
  { value: "3", label: "Countries" },
];

export default function WorkPage() {
  return (
    <div className="bg-[#fff7f0] flex flex-col items-center relative w-full">
      <Navbar />

      {/* Hero Section */}
      <div id="philosophy" className="relative w-full h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            alt="Remote work in nature"
            src={heroImg}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#3f1d14]/80 via-[#3f1d14]/60 to-[#3f1d14]/90" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-12 text-center">
          <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#f46b6b]">
            The Nomad Gems Philosophy
          </span>
          <h1 className="font-serif font-extrabold text-[48px] md:text-[96px] text-white leading-none text-center max-w-[900px]">
            Work Without Walls
          </h1>
          <p className="font-sans text-[16px] md:text-lg text-white/60 max-w-[520px] text-center leading-relaxed">
            Curated stays designed for deep work, surrounded by the kind of nature that makes you feel alive.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-8 w-full md:w-auto">
            <div className="w-full md:w-auto">
              <Button variant="primary" size="md" rounded={false} href="/#gems" className="w-full md:w-auto md:px-10 md:py-4 md:text-base">
                Explore Stays
              </Button>
            </div>
            <div className="w-full md:w-auto">
              <Button variant="outline" size="md" href="/#feature" className="w-full md:w-auto md:px-10 md:py-4 md:text-base">
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="process" className="w-full bg-white py-16 md:py-[120px] px-6 md:px-[100px]">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-20">
            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#f46b6b]">
              What We Verify
            </span>
            <h2 className="font-serif font-medium text-[40px] md:text-[64px] text-black leading-tight">
              Built for Deep Work
            </h2>
            <p className="font-sans text-[18px] text-[#4a4a4a] max-w-[500px] leading-relaxed">
              Every Nomad Gem is rigorously checked against our work-readiness standard.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative flex flex-col gap-5 p-8 rounded-sm bg-[#fff7f0] border border-black/5 hover:border-[#f46b6b]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#f46b6b]/5"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#3f1d14] rounded-full text-[#f46b6b] group-hover:scale-110 transition-transform duration-500">
                  <feature.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-semibold text-[20px] text-black">
                  {feature.title}
                </h3>
                <p className="font-sans text-[15px] text-[#4a4a4a] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div id="principles" className="w-full bg-[#3f1d14] py-16 md:py-[120px] px-6 md:px-[100px]">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-12 md:mb-20">
            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#f46b6b]">
              Our Principles
            </span>
            <div className="w-12 h-px bg-[#f46b6b]/30"></div>
            <h2 className="font-serif font-medium text-[40px] md:text-[64px] text-white leading-tight">
              How We Think About Work
            </h2>
          </div>

          <div className="flex flex-col gap-16">
            {principles.map((p) => (
              <div
                key={p.number}
                className="flex items-start gap-8 md:gap-12 group"
              >
                <span className="font-serif font-extrabold text-[64px] md:text-[80px] text-[#f46b6b]/20 leading-none group-hover:text-[#f46b6b]/40 transition-colors duration-500 select-none">
                  {p.number}
                </span>
                <div className="flex flex-col gap-3 pt-2">
                  <h3 className="font-serif font-medium text-[32px] md:text-[40px] text-white leading-tight">
                    {p.title}
                  </h3>
                  <p className="font-sans text-[17px] text-white/60 leading-relaxed max-w-[500px]">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full bg-[#f46b6b] py-12 md:py-16 px-6 md:px-[100px]">
        <div className="max-w-[1000px] mx-auto flex flex-wrap items-center justify-between gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center min-w-[120px]">
              <span className="font-serif font-extrabold text-[48px] text-white leading-none">
                {stat.value}
              </span>
              <span className="font-sans text-sm uppercase tracking-[0.2em] text-white/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-[#fff7f0] py-16 md:py-[120px] px-6 md:px-[100px]">
        <div className="max-w-[800px] mx-auto flex flex-col items-center text-center gap-8">
          <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#f46b6b]">
            Ready?
          </span>
          <h2 className="font-serif font-medium text-[40px] md:text-[72px] text-black leading-[1.1]">
            Find Your Next<br />Work Sanctuary
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] text-[#4a4a4a] max-w-[500px] leading-relaxed">
            Browse our curated collection of verified, work-ready retreats in nature.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="w-full md:w-auto">
              <Button variant="primary" size="lg" rounded={false} href="/#gems" className="w-full md:w-auto">
                Explore All Gems
              </Button>
            </div>
            <div className="w-full md:w-auto">
              <Button variant="outline" size="lg" href="/#feature" className="text-black w-full md:w-auto">
                Feature Your Retreat
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
