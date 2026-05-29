"use client"
import React from 'react';

export default function AppointmentCard({ type, name, date, day, time, detailLabel, detailValue }) {
  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">{type}</span>
            <h3 className="text-2xl font-black font-mono tracking-wide text-white">{name}</h3>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black font-mono text-white leading-none">{date}</div>
            <div className="text-[10px] font-mono font-bold text-zinc-500 uppercase">{day}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">TIME SLOT</span>
            <div className="text-sm font-bold text-white font-mono">{time}</div>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">{detailLabel}</span>
            <div className="text-sm font-bold text-white font-mono">{detailValue}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 bg-[#D9FA53] hover:bg-[#cbe947] text-black text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase">CONFIRM</button>
        <button className="flex-1 bg-[#1A1A1A] hover:bg-zinc-800 text-white text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase border border-[#262626]">CANCEL</button>
      </div>
    </div>
  );
}