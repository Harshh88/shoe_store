"use client"
import React from 'react';

export default function NetworkStatus({ latency, serverLoad }) {
  return (
    <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6">
      <h3 className="font-mono font-bold tracking-wider text-xs text-white mb-5">NETWORK_STATUS</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold font-mono mb-1.5">
            <span className="text-zinc-500">API Latency</span>
            <span className="text-white">{latency}ms</span>
          </div>
          <div className="w-full bg-[#1C1C1C] h-1 rounded-full overflow-hidden">
            <div className="bg-[#F7FFB0] h-full" style={{ width: `${Math.min((latency/20)*100, 100)}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold font-mono mb-1.5">
            <span className="text-zinc-500">Server Load</span>
            <span className="text-white">{serverLoad}%</span>
          </div>
          <div className="w-full bg-[#1C1C1C] h-1 rounded-full overflow-hidden">
            <div className="bg-zinc-600 h-full" style={{ width: `${serverLoad}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}