"use client"
import React from 'react';
import { useState,useEffect } from "react";
import { ArrowUpRight, TrendingUp, Calendar, ShoppingBag, ShoppingCart } from 'lucide-react';

export default function MetricCard({ type, value, label, isHighlighted }) {
  // Map icons based on card type dynamically
  const IconComponent = type === 'CATALOG' ? ArrowUpRight 
                      : type === 'VELOCITY' ? TrendingUp 
                      : Calendar;

  const WatermarkComponent = type === 'CATALOG' ? ShoppingBag 
                           : type === 'VELOCITY' ? ShoppingCart 
                           : Calendar;

    // const [totalBooking,setTotalBooking] = useState(null);                       
    // useEffect(()=>{
    //   try{
    //     const booking = localStorage.getItem("bookings");
    //     setTotalBooking(booking);
    //   }catch(err){

    //   }
    // },[])                    
    // console.log(JSON.parse(totalBooking).length)
  return (
    <div className={`rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 ${
      isHighlighted 
        ? 'bg-[#D9FA53] text-black shadow-lg shadow-[#D9FA53]/5' 
        : 'bg-[#141414] border border-[#222222] text-white hover:border-zinc-700'
    }`}>
      {/* Top Header Label Line */}
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-mono tracking-widest font-bold uppercase ${
          isHighlighted ? 'text-black/60' : 'text-zinc-400'
        }`}>
          {type}
        </span>
        <IconComponent className={`w-5 h-5 ${isHighlighted ? 'text-black' : 'text-zinc-500 group-hover:text-white transition-colors'}`} />
      </div>

      {/* Numerical Metrics Group */}
      <div className="text-5xl font-black tracking-tight font-mono mb-1">{value}</div>
      <div className={`text-xs font-medium ${isHighlighted ? 'text-black/60' : 'text-zinc-500'}`}>
        {label}
      </div>

      {/* Decorative Vector Watermark background asset */}
      <WatermarkComponent className={`absolute right-[-10px] bottom-[-20px] w-32 h-32 pointer-events-none stroke-1 transition-transform duration-500 group-hover:scale-105 ${
        isHighlighted ? 'text-black/5' : 'text-[#1C1C1C] opacity-40'
      }`} />
    </div>
  );
}