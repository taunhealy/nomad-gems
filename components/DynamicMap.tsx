"use client";

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-50/80 backdrop-blur-sm rounded-[24px] flex items-center justify-center border border-black/5 animate-pulse">
      <p className="font-sans text-xs tracking-widest uppercase text-black/40">Loading Map...</p>
    </div>
  )
});

export default DynamicMap;
