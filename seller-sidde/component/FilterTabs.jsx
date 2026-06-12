"use client"
import React from 'react';

export default function FilterTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 mb-6 md:mb-8 no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider whitespace-nowrap transition-all duration-200 border ${
            activeTab === tab 
              ? 'bg-[#F7FFB0] text-black border-[#F7FFB0]' 
              : 'bg-[#141414] text-zinc-400 border-[#222222] hover:text-[#F7FFB0]/80 hover:border-[#F7FFB0]/50'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}