"use client";

interface TabFilterProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export default function TabFilter({ tabs, activeTab, onTabChange, className = "" }: TabFilterProps) {
  return (
    <div className={`flex items-center gap-12 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className="relative group py-2 cursor-pointer"
        >
          <span
            className={`font-serif text-[24px] capitalize transition-colors duration-300 ${
              activeTab === tab ? "text-black" : "text-black/40 group-hover:text-black"
            }`}
          >
            {tab}
          </span>
          <span
            className={`absolute bottom-0 left-0 h-[2px] bg-[#f46b6b] transition-all duration-300 ${
              activeTab === tab ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </button>
      ))}
    </div>
  );
}
