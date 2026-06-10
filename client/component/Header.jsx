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
      
      {/* Desktop Quick Nav Links */}
      <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
        {/* <a href="#" className="hover:text-white transition-colors">Dashboard</a>
        <a href="#" className="text-white border-b-2 border-[#E2F952] pb-1 font-semibold">Products</a>
        <a href="#" className="hover:text-white transition-colors">Orders</a> */}
        {/* <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm ml-2">
          👨‍💼
        </div> */}
      </div>
    </header>
  );
}