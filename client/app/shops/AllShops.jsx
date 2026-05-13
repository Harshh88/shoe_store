import React from 'react';
import { Star, Clock, MapPin, Heart, Search } from 'lucide-react';
import { useShop } from "@/context/ShopContext";
import Link from 'next/link';

const ShopGrid = () => {
  const { shops } = useShop();

  return (
    <div className="bg-[#0E0E0E] min-h-screen font-sans pb-20">
      <div className="w-full">
        
        {/* Minimalist Header */}
        <div className="max-w-[1400px] mx-auto my-[-2rem] pt-20 pb-16 px-6 lg:px-12 flex justify-between items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#E2FB6C] rounded-full shadow-[0_0_8px_#E2FB6C]"></span>
              <h1 className="text-zinc-500 text-[10px] font-black tracking-[0.4em] uppercase">
                Directory 2024
              </h1>
            </div>
            <h2 className="text-white text-4xl font-medium tracking-tight">All Stores</h2>
          </div>
          
          <div className="relative border-b border-zinc-800 pb-2">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
              type="text"
              placeholder="SEARCH..."
              className="bg-transparent text-white pl-8 pr-4 focus:outline-none text-xs tracking-widest w-[200px]"
            />
          </div>
        </div>

        {/* Vertical List with Proper Breathing Space */}
        <div className="flex flex-col gap-24 px-6 lg:px-[4rem]"> 
          {/* gap-24 se shops ke beech badiya space aayega */}
          {shops.map((shop) => (
            <Link 
              href={`/shops/${shop.id}`} 
              key={shop.id} 
              className="group relative block w-full overflow-hidden"
            >
              <div className="relative h-[85vh] w-full rounded-[2rem] overflow-hidden"> 
                {/* Halka sa rounded corner page ke sath soft blend karta hai */}
                
                {/* Full Bleed Image */}
                <img
                  src={shop.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={shop.name}
                />
                
                {/* Overlay - Smoother and more integrated */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Info Container */}
                <div className="absolute inset-0 flex flex-col justify-between p-10 lg:p-16">
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="px-5 py-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full">
                      <p className="text-[10px] font-bold text-white tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        ACTIVE NOW
                      </p>
                    </div>
                    <button className="p-4 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white hover:bg-[#E2FB6C] hover:text-black transition-all duration-500">
                      <Heart size={20} />
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-[#F7FFB0]/80 text-[11px] font-bold tracking-[0.5em] mb-4 block uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                        View Selection
                      </span>
                      {/* Font size slightly adjusted for better vertical flow */}
                      <h2 className="text-[10vw] font-black italic tracking-tighter text-white uppercase leading-[0.8] mix-blend-screen">
                        {shop.name}
                      </h2>
                    </div>

                    {/* Meta Info Row */}
                    <div className="flex flex-wrap items-end justify-between gap-6 pt-10 border-t border-white/5">
                      <div className="flex gap-16">
                        <div className="space-y-2">
                          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Delivery</p>
                          <p className="text-white text-base font-bold tracking-tighter">{shop.deliveryTime || "30-45 MIN"}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Location</p>
                          <p className="text-white text-base font-bold tracking-tighter">{shop.distance || "2.4 KM"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/5">
                        <div className="text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-white font-black text-3xl tracking-tighter">{shop.rating || "4.8"}</span>
                            <Star size={20} className="fill-[#E2FB6C] text-[#F7FFB0]/80" />
                          </div>
                          <p className="text-zinc-400 text-[9px] uppercase font-bold tracking-widest">{shop.reviews || "1.2K"} Verified Reviews</p>
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