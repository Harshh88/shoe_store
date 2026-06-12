"use client"
import React from 'react';

export default function Header({ title, subtitle }) {
  return (
    <header className="flex justify-between items-center mb-6 md:mb-8">
      <div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight font-mono mb-1 md:mb-2 text-white">
          {title}
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm tracking-wide font-medium uppercase">
          {subtitle}
        </p>
      </div>
      
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
        {/* <a href="#" className="hover:text-[#F7FFB0]/80 transition-colors">Dashboard</a>
        <a href="#" className="text-white border-b-2 border-[#F7FFB0] pb-1 font-semibold">Products</a>
        <a href="#" className="hover:text-[#F7FFB0]/80 transition-colors">Orders</a> */}
      </div>
    </header>
  );
}