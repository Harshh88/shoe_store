"use client";
import React, { useState } from 'react';
import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag, Check, Shield, Star } from 'lucide-react';

const Products = ({ shop, addCart, goToBooking, cartCount }) => {
  const { products } = useProducts();
  const shopName = shop?.shop_name || "EXCLUSIVE STORE";
  const shop_id = useParams().id;
  const router = useRouter();

  // Single Product ki full information page open karne ke liye state
  const [selectedProduct, setSelectedProduct] = useState(null);

  // -------------------------------------------------------------
  // 1. FULL-PAGE PRODUCT INFORMATION VIEW (JAB USER CARD PAR CLICK KAREGA)
  // -------------------------------------------------------------
  if (selectedProduct) {
    const isOutOfStock = Number(selectedProduct.stock) <= 0;
    
    return (
      <div className="min-h-screen bg-[#0E0E0E] text-white p-6 md:p-12 font-sans antialiased selection:bg-[#E2FF66] selection:text-black">
        
        {/* Simple Top Header Navigation */}
        <header className="flex justify-between items-center mb-12 border-b border-[#141414] pb-6 max-w-[1400px] mx-auto w-full">
          <button 
            onClick={() => setSelectedProduct(null)}
            className="text-[11px] font-black tracking-widest text-gray-500 hover:text-white flex items-center gap-2 bg-transparent border-none cursor-pointer uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#E2FF66]" /> BACK TO CATALOG
          </button>
          
          <Link href="/cart" className="relative cursor-pointer text-gray-400 hover:text-white transition-colors">
            <span className="absolute -top-1.5 -right-2 bg-[#E2FF66] text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black">
              {cartCount}
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </Link>
        </header>

        {/* Product Details Section Grid */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-4">
          
          {/* Left Side: Clean Product Showcase Image Frame */}
          <div className="bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-[#191919] aspect-[4/3] rounded-[2.5rem] p-8 flex items-center justify-center relative overflow-hidden shadow-2xl">
            <div className={`w-full h-full flex items-center justify-center ${isOutOfStock ? "opacity-20 grayscale" : ""}`}>
              <img 
                src={selectedProduct.url || selectedProduct.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'} 
                alt={selectedProduct.name} 
                className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
              />
            </div>
            
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                <div className="border border-[#222] bg-black/90 px-6 py-2 rounded-xl rotate-[-8deg]">
                  <span className="text-gray-500 font-black text-xs tracking-widest uppercase">SOLD OUT</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Product Details Content */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#161616] border border-[#222] text-gray-400 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {selectedProduct.size ? `SIZE: ${selectedProduct.size}` : "PREMIUM ASSET"}
                </span>
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                  isOutOfStock ? "bg-red-950/30 text-red-500 border border-red-900/20" : "bg-emerald-950/30 text-emerald-400 border border-emerald-900/20"
                }`}>
                  {isOutOfStock ? "Out of Stock" : "In Stock"}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
                {selectedProduct.name}
              </h1>
              
              <div className="text-3xl font-black text-[#E2FF66] tracking-tight pt-1">
                ₹{Number(selectedProduct.price).toLocaleString("en-IN")}
              </div>
              
              {/* Product Description */}
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed border-t border-b border-[#141414] py-5 my-4">
                {selectedProduct.description || "The intersection of algorithmic design and high-performance cushioning. Engineered for the absolute future of movement."}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 font-mono text-[10px] pb-2 text-gray-500 font-bold uppercase tracking-wider">
                <div className="bg-[#111] border border-[#191919] p-3 rounded-xl">
                  <span className="text-gray-600 block mb-1">SPECIFICATION</span>
                  <div className="text-gray-300 font-black text-xs">{selectedProduct.size || "Standard Fit"}</div>
                </div>
                <div className="bg-[#111] border border-[#191919] p-3 rounded-xl">
                  <span className="text-gray-600 block mb-1">AVAILABILITY METRIC</span>
                  <div className={`text-xs font-black ${!isOutOfStock ? "text-emerald-400" : "text-red-500"}`}>
                    {!isOutOfStock ? `${selectedProduct.stock || 5} UNITS LEFT` : "DEPLETED"}
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Button Action Block */}
            <div className="space-y-4 pt-2">
              <button 
                onClick={() => addCart(selectedProduct.id)}
                disabled={isOutOfStock}
                className="w-full bg-[#E2FF66] hover:bg-white disabled:bg-[#161616] disabled:text-gray-600 text-black font-black text-xs py-4 rounded-xl tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-[#E2FF66]/5"
              >
                <ShoppingBag className="w-4 h-4" /> ADD TO BAG
              </button>
              
              {/* Trust Footnotes */}
              <div className="flex items-center justify-center gap-6 pt-2 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-[#E2FF66]" /> 100% KINETIC AUTHENTIC</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#E2FF66]" /> VERIFIED LISTING</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. MAIN SHOP STOREFRONT VIEW (PRODUCTS CATALOG GRID)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white p-6 md:p-12 font-sans antialiased">
      
      {/* Header / Top Navigation block sync */}
      <header className="flex py-4 px-2 items-center justify-between border-b border-[#141414] max-w-[1600px] mx-auto w-full mb-12">
        <button 
          onClick={() => router.push("/shops")}
          className="text-[11px] tracking-widest font-black text-gray-500 bg-transparent border-none uppercase cursor-pointer hover:text-white transition-colors"
        >
          ← BACK TO STORES
        </button>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              goToBooking(shop_id);
            }}
            className="border cursor-pointer border-[#1F1F1F] bg-[#111] hover:bg-[#E2FF66] hover:text-black hover:border-[#E2FF66] px-5 py-2 rounded-xl text-[10px] font-black tracking-wider uppercase transition-all"
          >
            Book Appointment
          </button>
          
          <Link href="/cart" className="relative cursor-pointer text-gray-400 hover:text-white transition-colors">
             <span className="absolute -top-1.5 -right-2 bg-[#E2FF66] text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black">
               {cartCount}
             </span>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
               <line x1="3" y1="6" x2="21" y2="6"/>
               <path d="M16 10a4 4 0 0 1-8 0"/>
             </svg>
          </Link>
        </div>
      </header>

      {/* Shop Showcase Banner */}
      <section className="max-w-[1600px] mx-auto w-full mb-12 px-2">
        <p className="text-[#E2FF66] text-[10px] font-black tracking-widest uppercase mb-1">VERIFIED DEALER</p>
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-3 leading-none text-white uppercase">
          {shopName}
        </h1>
        <p className="text-gray-500 text-xs md:text-sm tracking-wide max-w-xl font-medium leading-relaxed">
          Welcome to our designated catalog space. Browse through an updated grid layout of verified authentic clothing and premium footwear.
        </p>
      </section>

      {/* Premium Product Listings Grid Architecture */}
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
        {products && products.map((product) => {
          const isOutOfStock = Number(product.stock) <= 0;

          return (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)} 
              className="group flex flex-col justify-between cursor-pointer"
            >
              
              {/* Product Frame Frame Renderer */}
              <div className="aspect-[4/3] bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-[#191919] rounded-[2rem] p-6 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-[#222]">
                
                {/* Condition Status Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                    isOutOfStock ? "bg-black/40 text-red-500 border border-red-900/20" : "bg-black/40 text-gray-500 border border-[#1F1F1F]"
                  }`}>
                    {isOutOfStock ? "Out Of Stock" : "In Stock"}
                  </span>
                </div>

                {/* Main Graphic Asset Box */}
                <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "opacity-20 grayscale" : ""}`}>
                  <img 
                    src={product.url || product.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'} 
                    alt={product.name}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                  />
                </div>

                {/* Dark Overlay for Out of Stock entries */}
                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                    <div className="border border-[#222] bg-black/90 px-6 py-2 rounded-xl rotate-[-8deg]">
                      <span className="text-gray-500 font-black text-xs tracking-widest uppercase">SOLD OUT</span>
                    </div>
                  </div>
                )}

                {/* Interactive Bottom Drawers on Grid Element Hover */}
                <div className="absolute bottom-5 left-5 right-5 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                  {!isOutOfStock ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        addCart(product.id);
                      }}
                      className="w-full bg-[#E2FF66] text-black font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
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

              {/* Footnote Descriptive Grid Metadata rows */}
              <div className="mt-4 px-2 mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="w-[70%]">
                    <p className="text-[9px] text-gray-600 font-bold tracking-widest uppercase mb-0.5">
                      {product.size ? `SIZE: ${product.size}` : "KINETIC ARTICLE"}
                    </p>
                    <h3 className="font-bold text-base tracking-tight uppercase text-gray-200 group-hover:text-white transition-colors truncate">
                      {product.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-lg text-white tracking-tight">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Ratings & Branding Metric strip alignment */}
                <div className="flex justify-between items-center text-[10px] text-gray-600 font-bold pt-2 border-t border-[#141414] uppercase tracking-wider">
                  <div className="flex items-center gap-1 font-semibold text-gray-500">
                    <Star className="w-3 h-3 text-[#E2FF66] fill-[#E2FF66]" /> 4.8
                  </div>
                  <p className="text-gray-500 font-black">CATALOG ITEM</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Products;