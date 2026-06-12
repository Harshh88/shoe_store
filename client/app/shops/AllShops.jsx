"use client";
import React from 'react';
import { Star, MapPin, Heart, Search } from 'lucide-react';
import { useShop } from "@/context/ShopContext";
import Link from 'next/link';

const ShopGrid = () => {
  const { shops } = useShop();

  return (
    <div className="bg-[#0E0E0E] min-h-screen font-sans pb-20">
      <div className="w-full">
        
        <div className="max-w-[1400px] mx-auto pt-20 pb-16 px-6 lg:px-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#F7FFB0] rounded-full shadow-[0_0_8px_#F7FFB0]"></span>
              <h1 className="text-zinc-500 text-[10px] font-black tracking-[0.4em] uppercase">
                Directory 2024
              </h1>
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-medium tracking-tight">All Stores</h2>
          </div>
          
          <div className="relative border-b border-zinc-800 pb-2 w-full md:w-auto">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
              type="text"
              placeholder="SEARCH..."
              className="bg-transparent text-white pl-8 pr-4 focus:outline-none text-xs tracking-widest w-full md:w-[200px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24 px-4 sm:px-6 lg:px-[4rem]"> 
          {shops.map((shop) => (
            <Link 
              href={`/shops/${shop.id}`} 
              key={shop.id} 
              className="group relative block w-full overflow-hidden"
            >
              <div className="relative h-[50vh] sm:h-[65vh] lg:h-[85vh] w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden"> 
                
                <img
                  src={shop.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={shop.name}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-16">
                  
                  <div className="flex justify-between items-start">
                    <div className="px-4 py-1.5 sm:px-5 sm:py-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full">
                      <p className="text-[9px] sm:text-[10px] font-bold text-white tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        ACTIVE NOW
                      </p>
                    </div>
                    <button className="p-3 sm:p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white hover:bg-[#F7FFB0] hover:text-black transition-all duration-500">
                      <Heart size={18} className="sm:w-[20px] sm:h-[20px]" />
                    </button>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <span className="text-[#F7FFB0]/80 text-[10px] sm:text-[11px] font-bold tracking-[0.5em] mb-2 sm:mb-4 block uppercase lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-700">
                        View Selection
                      </span>
                      <h2 className="text-4xl sm:text-6xl lg:text-[10vw] font-black italic tracking-tighter text-white uppercase leading-[0.9] sm:leading-[0.8] mix-blend-screen">
                        {shop.name}
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pt-4 sm:pt-10 border-t border-white/5">
                      <div className="flex gap-8 sm:gap-16">
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">Delivery</p>
                          <p className="text-white text-sm sm:text-base font-bold tracking-tighter">{shop.deliveryTime || "30-45 MIN"}</p>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-zinc-500 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">Location</p>
                          <p className="text-white text-sm sm:text-base font-bold tracking-tighter">{shop.distance || "2.4 KM"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 self-start sm:self-auto">
                        <div className="text-left">
                          <div className="flex items-center gap-1.5 sm:gap-2 justify-end">
                            <span className="text-white font-black text-2xl sm:text-3xl tracking-tighter">{shop.rating || "4.8"}</span>
                            <Star size={16} className="fill-[#F7FFB0] text-[#F7FFB0] sm:w-[20px] sm:h-[20px]" />
                          </div>
                          <p className="text-zinc-400 text-[8px] sm:text-[9px] uppercase font-bold tracking-widest">{shop.reviews || "1.2K"} Reviews</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopGrid;