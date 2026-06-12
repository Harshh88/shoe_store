"use client"
import React from 'react';
import { ArrowUpRight, TrendingUp, Calendar, ShoppingBag, ShoppingCart } from 'lucide-react';

export default function MetricCard({ type, value, label, isHighlighted, onClick }) {
  const IconComponent = type === 'CATALOG' ? ArrowUpRight 
                      : type === 'VELOCITY' ? TrendingUp 
                      : Calendar;

  const WatermarkComponent = type === 'CATALOG' ? ShoppingBag 
                           : type === 'VELOCITY' ? ShoppingCart 
                           : Calendar;

  return (
    <div 
      onClick={onClick}
      className={`rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 cursor-pointer ${
        isHighlighted 
          ? 'bg-[#F7FFB0] text-black shadow-lg shadow-[#F7FFB0]/5 select-none' 
          : 'bg-[#141414] border border-[#222222] text-white hover:border-zinc-700 select-none'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-mono tracking-widest font-bold uppercase ${
          isHighlighted ? 'text-black/60' : 'text-zinc-400'
        }`}>
          {type}
        </span>
        <IconComponent className={`w-5 h-5 ${isHighlighted ? 'text-black' : 'text-zinc-500 group-hover:text-white transition-colors'}`} />
      </div>

      <div className="text-5xl font-black tracking-tight font-mono mb-1">{value}</div>
      <div className={`text-xs font-medium ${isHighlighted ? 'text-black/60' : 'text-zinc-500'}`}>
        {label}
      </div>

      <WatermarkComponent className={`absolute right-[-10px] bottom-[-20px] w-32 h-32 pointer-events-none stroke-1 transition-transform duration-500 group-hover:scale-105 ${
        isHighlighted ? 'text-black/5' : 'text-[#1C1C1C] opacity-40'
      }`} />
    </div>
  );
}