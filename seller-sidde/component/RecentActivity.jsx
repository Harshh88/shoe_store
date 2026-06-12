"use client"
import React from 'react';
import { ShoppingCart, MapPin, Plus } from 'lucide-react';

export default function RecentActivity({ activities, onViewAllClick }) {
  const getIcon = (type) => {
    switch (type) {
      case 'ORDER': return <ShoppingCart className="w-4 h-4 text-[#F7FFB0]" />;
      case 'BOOKING': return <MapPin className="w-4 h-4 text-[#F7FFB0]" />;
      default: return <Plus className="w-4 h-4 text-[#F7FFB0]" />;
    }
  };

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono font-bold tracking-wider text-sm text-white">RECENT_ACTIVITY</h3>
        <button 
          onClick={onViewAllClick}
          className="text-xs text-zinc-400 hover:text-white cursor-pointer transition-colors font-bold tracking-wider font-mono"
        >
          VIEW ALL
        </button>
      </div>

      <div className="space-y-5">
        {activities.map((item, index) => (
          <div key={index} className="flex items-center justify-between border-b border-[#1C1C1C] pb-4 last:border-0 last:pb-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-zinc-900 shrink-0">
                {getIcon(item.type)}
              </div>
              <div>
                <h5 className="text-sm font-bold text-white tracking-wide">{item.title}</h5>
                <p className="text-xs text-zinc-500 mt-0.5">{item.meta}</p>
              </div>
            </div>

            {item.value ? (
              <span className="font-mono font-black text-sm text-white">{item.value}</span>
            ) : item.badge ? (
              <span className="text-[10px] tracking-widest font-mono font-bold bg-[#1C1C1C] text-zinc-400 px-2.5 py-1 rounded">
                {item.badge}
              </span>
            ) : (
              <span className="text-xs font-mono text-zinc-500 tracking-wide">{item.sku}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}