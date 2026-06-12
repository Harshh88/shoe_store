"use client";

import React from "react";
import Link from "next/link";
import LogoMain from "@/component/LogoMain";
import { Footer } from "@/component/HomeFooter";
import { ShoppingBag, Star } from "lucide-react";
import NavBar from "@/component/NavBar";
import { useRouter } from "next/navigation";

export default function ProductsMarketplace({
  filteredProducts,
  loading,
  searchQuery,
  setSearchQuery,
  cartCount,
  addCart
}) {
  const router = useRouter();

  return (
    <div className="bg-[#0E0E0E] min-h-screen text-white flex flex-col justify-between antialiased">
      <header className="flex flex-col md:flex-row py-4 px-4 sm:px-8 gap-4 items-center justify-between border-b border-[#141414] bg-[#0E0E0E] w-full">
        <div className="flex items-center justify-between md:justify-start gap-4 sm:gap-8 w-full md:w-[50%]">
          <Link href="/"><LogoMain className="shrink-0" /></Link>
          <div className="flex-1 max-w-xs sm:max-w-sm bg-[#111111] border border-[#1F1F1F] rounded-full px-4 py-1.5 flex items-center gap-2 focus-within:border-[#333] transition-all">
            <input 
              type="text" 
              placeholder="SEARCH INVENTORY..." 
              className="bg-transparent w-full text-[10px] sm:text-[11px] font-bold outline-none text-white tracking-widest placeholder-gray-700 uppercase"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end w-full md:w-auto text-xs font-semibold tracking-wide text-gray-400">
          <NavBar
            links={[
              { label: "Shops", href: "/shops" },
              { label: "Products", href: "/products" },
            ]}
            artCount={cartCount}
            className="w-full"
          />
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-8 py-8 md:py-10 max-w-[1600px] w-full mx-auto">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase mb-1">ALL PRODUCTS</h1>
          <p className="text-[10px] text-gray-500 font-bold tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]"></span>
            {filteredProducts.length} PRODUCTS FOUND
          </p>
        </div>

        {loading ? (
          <div className="h-[40vh] flex items-center justify-center">
            <div className="text-gray-600 animate-pulse font-black tracking-widest text-xs uppercase">Connecting System...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center border border-dashed border-[#1F1F1F] rounded-2xl sm:rounded-3xl p-4">
            <p className="text-gray-500 text-xs font-bold tracking-wider mb-2 uppercase text-center">No items match your metrics.</p>
            <button onClick={() => setSearchQuery("")} className="text-[10px] text-[#F7FFB0] cursor-pointer font-black uppercase tracking-wider underline">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock <= 0;
              
              return (
                <div 
                  key={product.id} 
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="group flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-[#191919] rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-[#222]">
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        isOutOfStock ? "bg-black/40 text-red-500 border border-red-900/20" : "bg-black/40 text-gray-500 border border-[#1F1F1F]"
                      }`}>
                        {isOutOfStock ? "Out of Stock" : "In Stock"}
                      </span>
                    </div>

                    <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "opacity-20 grayscale" : ""}`}>
                      <img 
                        src={product.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'} 
                        alt={product.name} 
                        className="max-w-[90%] max-h-[90%] md:max-w-full md:max-h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                      />
                    </div>

                    {isOutOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                        <div className="border border-[#222] bg-black/90 px-6 py-2 rounded-xl rotate-[-8deg]">
                          <span className="text-gray-500 font-black text-xs tracking-widest uppercase">SOLD OUT</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                      {!isOutOfStock ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            addCart(product.id);
                          }}
                          className="w-full bg-[#F7FFB0] cursor-pointer text-black font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
                        >
                          ADD TO BAG
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="w-full bg-[#111] border border-[#222] text-gray-500 font-bold text-xs py-3 rounded-xl uppercase tracking-wider cursor-not-allowed"
                        >
                          Restock Alert
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 px-1 sm:px-2 mb-4">
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <div className="w-[70%]">
                        <p className="text-[9px] text-gray-600 font-bold tracking-widest uppercase mb-0.5">
                          {product.size ? `SIZE: ${product.size}` : "KINETIC STAPLE"}
                        </p>
                        <h3 className="font-bold text-sm sm:text-base tracking-tight uppercase text-gray-200 group-hover:text-white transition-colors truncate">
                          {product.name}
                        </h3>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-black text-base sm:text-lg text-white tracking-tight">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-600 font-bold pt-2 border-t border-[#141414] uppercase tracking-wider">
                      <div className="flex items-center gap-1 font-semibold text-gray-500">
                        <Star className="w-3 h-3 text-[#F7FFB0] fill-[#E2FF66]" /> 4.8
                      </div>
                      <p className="truncate max-w-[150px]">Seller: <span className="text-gray-500 font-black">PREMIUM SHUB</span></p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}