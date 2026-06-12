"use client"
import React from 'react';

export default function MetricsOverview({ metricsData }) {
  return (
    <section className="bg-[#141414] border border-[#222222] rounded-3xl p-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#222222]">
        {metricsData.map((metric, index) => (
          <div 
            key={metric.label} 
            className={`first:pt-0 pt-4 md:pt-0 ${index === 0 ? 'md:pr-4' : 'md:px-6'}`}
          >
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">
              {metric.label}
            </span>
            <div className={`text-3xl font-black font-mono tracking-tight ${metric.isHighlight ? 'text-[#F7FFB0]' : 'text-white'}`}>
              {metric.value}
              {metric.unit && (
                <span className="text-xs text-zinc-500 font-bold tracking-normal uppercase ml-1.5">{metric.unit}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}