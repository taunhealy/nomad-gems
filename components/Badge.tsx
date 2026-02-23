"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center justify-center border font-sans font-semibold uppercase tracking-widest leading-none px-4 py-2 text-xs text-white border-white/50 bg-black/20 backdrop-blur-sm rounded-[2px_2px_20px_2px]",
        className
      )}
    >
      {children}
    </div>
  );
}
