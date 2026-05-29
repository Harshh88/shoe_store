"use client"
import React from 'react';
import { Upload, MapPin, Clock, ShieldCheck, Star } from 'lucide-react';
import Header from '@/component/Header';

export default function ShopProfileDashboard() {
  return (
    <div className="flex-1 text-white w-full">
      <Header title="SHOP PROFILE" subtitle="Refine your brand identity within the Kinetic Gallery ecosystem." />

      <div className="space-y-6 mt-6">
        {/* SHOP BANNER UPLOAD ZONE */}
        <div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
            SHOP BANNER <span className="text-zinc-600 lowercase font-normal ml-2">Recommended 1920x450px</span>
          </span>
          <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden border border-[#222222] bg-[#141414] group flex items-center justify-center">
            {/* Background Decorative Graphic Layout (As seen in video) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 opacity-40 mix-blend-luminosity grayscale group-hover:scale-105 transition-transform duration-700 flex gap-4 items-center justify-center p-4">
              <span className="text-7xl select-none">👟</span>
              <span className="text-7xl select-none">👟</span>
              <span className="text-7xl select-none">👟</span>
            </div>

            {/* Upload Trigger Button UI */}
            <button className="z-20 bg-black/60 backdrop-blur-md border border-zinc-800 hover:border-zinc-500 hover:bg-black/80 px-5 py-3 rounded-2xl flex items-center gap-2.5 transition-all group-content">
              <Upload className="w-4 h-4 text-[#D9FA53]" />
              <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-200">CLICK TO UPDATE BANNER</span>
            </button>
          </div>
        </div>

        {/* TWO-COLUMN CONFIGURATION MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT SIDE: CONTROL FIELDS INPUT LAYOUT (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Shop Name Field */}
            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">SHOP NAME</label>
              <input 
                type="text" 
                defaultValue="Kinetic Labs Flagship"
                className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl px-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-colors"
              />
            </div>

            {/* Shop Description Field */}
            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">SHOP DESCRIPTION</label>
              <textarea 
                rows={4}
                defaultValue="The intersection of performance engineering and luxury aesthetics. Kinetic Labs provides curated footwear for the modern urban athlete and high-fashion enthusiast. All items are authenticated in-house."
                className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl px-5 py-4 font-sans text-sm text-zinc-300 leading-relaxed transition-colors resize-none"
              />
            </div>

            {/* Location & Address Composite Layout */}
            <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-[#1C1C1C] pb-3">
                <MapPin className="w-4 h-4 text-[#D9FA53]" />
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">LOCATION & ADDRESS</span>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  defaultValue="128 Neon Boulevard, District 7"
                  className="w-full bg-[#090909] border border-[#1C1C1C] focus:border-zinc-800 outline-none rounded-xl px-4 py-3.5 font-sans text-sm text-white transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    defaultValue="Neo-Tokyo"
                    className="w-full bg-[#090909] border border-[#1C1C1C] focus:border-zinc-800 outline-none rounded-xl px-4 py-3.5 font-sans text-sm text-white transition-colors"
                  />
                  <input 
                    type="text" 
                    defaultValue="100-0001"
                    className="w-full bg-[#090909] border border-[#1C1C1C] focus:border-zinc-800 outline-none rounded-xl px-4 py-3.5 font-mono text-sm text-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: METRICS AND OPERATING SCHEDULE (Spans 1 column) */}
          <div className="space-y-6">
            {/* Operating Hours Block */}
            <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6">
              <div className="flex items-center justify-between border-b border-[#1C1C1C] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D9FA53]" />
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">OPERATING HOURS</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-zinc-400 font-bold">
                  <span>MON - FRI</span>
                  <span className="text-white font-black tracking-wide">09:00 — 21:00</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400 font-bold">
                  <span>SATURDAY</span>
                  <span className="text-white font-black tracking-wide">10:00 — 23:00</span>
                </div>
                <div className="flex justify-between items-center text-zinc-500 font-bold">
                  <span>SUNDAY</span>
                  <span className="bg-[#2A1818] text-rose-500 border border-rose-950 px-2 py-0.5 rounded text-[10px] tracking-wider font-black">CLOSED</span>
                </div>
              </div>
            </div>

            {/* Gallery Identity Badge Deck */}
            <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#1C1C1C] pb-2">GALLERY IDENTITY</span>
              
              {/* Verified Seller Badge Row */}
              <div className="flex justify-between items-center bg-[#090909] border border-[#1C1C1C] p-3 rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#D9FA53]" />
                  <span className="text-xs text-zinc-400 font-bold tracking-wide font-sans">VERIFIED SELLER</span>
                </div>
                <span className="text-[10px] font-mono font-black bg-[#1C1C1C] text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 uppercase">OA A</span>
              </div>

              {/* User Rating Row */}
              <div className="flex justify-between items-center bg-[#090909] border border-[#1C1C1C] p-3 rounded-2xl">
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-[#D9FA53] fill-[#D9FA53]" />
                  <span className="text-xs text-zinc-400 font-bold tracking-wide font-sans">USER RATING</span>
                </div>
                <span className="text-xs font-mono font-black text-white tracking-wide">4.9/5.0</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM GLOBAL ACTION ROW */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#141414] mt-4">
          <button className="bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-300 border border-[#262626] font-mono text-xs font-black tracking-widest px-6 py-3.5 rounded-xl transition-colors uppercase">
            DISCARD
          </button>
          <button className="bg-[#D9FA53] hover:bg-[#cbe947] text-black font-mono text-xs font-black tracking-widest px-8 py-3.5 rounded-xl transition-transform active:scale-[0.98] shadow-lg shadow-[#D9FA53]/5 uppercase">
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}