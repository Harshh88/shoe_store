"use client"
import React from 'react';
import { Plus, X } from 'lucide-react';

export default function AddProductButton({ isOpen, onClick }) {
  return (
    <div className="mb-6 md:mb-8">
      <button 
        onClick={onClick}
        className="w-full bg-[#F7FFB0] hover:bg-[#F7FFB0] text-black font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-[0.99]"
      >
        {isOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5 stroke-[2.5]" />}
        <span className="font-mono tracking-wider text-sm uppercase">ADD PRODUCT</span>
      </button>
    </div>
  );
}