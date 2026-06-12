"use client"
import React from 'react';

export default function BestSellerCard({ title, subtitle, actionText, fallbackImage }) {
  return (
    <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[190px] group hover:border-zinc-800 transition-all duration-300">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-3">
          BEST_SELLER
        </span>
        <h3 className="text-xl font-black font-mono tracking-wide text-white mb-1">
          {title}
        </h3>
        <p className="text-xs font-bold text-[#F7FFB0] tracking-wide uppercase">
          {subtitle}
        </p>
      </div>

      <div className="mt-5 z-10">
        <button className="bg-[#F7FFB0] hover:bg-white text-black text-xs font-black tracking-wider px-5 py-2.5 rounded-full transition-colors font-mono uppercase">
          {actionText}
        </button>
      </div>

      <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-zinc-900/60 to-transparent skew-x-12 pointer-events-none flex items-end justify-center overflow-hidden">
        <span className="text-6xl filter drop-shadow-2xl mb-2 transform -rotate-12 transition-transform duration-500 group-hover:scale-110 select-none">
          {fallbackImage}
        </span>
      </div>
    </div>
  );
}