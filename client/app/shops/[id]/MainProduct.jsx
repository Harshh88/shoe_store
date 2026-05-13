"use client";

import React from 'react';
import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Products = ({shop,addCart,goToBooking}) => {
  const {products} = useProducts();
  const shopName = shop.shop_name;
  const shop_id = useParams().id;
  
  const productss = [
    { 
      id: 1, 
      name: "KINETIC X APEX", 
      price: "$290.00", 
      img: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=600&auto=format&fit=crop", 
      tag: "NEW DROP" 
    },
    { 
      id: 2, 
      name: "VOLT RUNNER 01", 
      price: "$245.00", 
      img: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop" 
    },
    { 
      id: 3, 
      name: "AERO GLIDE PRO", 
      price: "$310.00", 
      img: "https://images.unsplash.com/photo-1614633833026-00206525b80f?q=80&w=600&auto=format&fit=crop" 
    },
    { 
      id: 4, 
      name: "QUANTUM SHIFT", 
      price: "$275.00", 
      img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop" 
    },
    { 
      id: 5, 
      name: "SHADOW PRIME V2", 
      price: "$340.00", 
      img: "https://images.unsplash.com/photo-1589483232748-515c025575bc?q=80&w=600&auto=format&fit=crop" 
    },
    { 
      id: 6, 
      name: "NEO FLOW", 
      price: "$210.00", 
      img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop" 
    },
  ];

  return (
    <div className="min-h-screen  text-white p-6 md:p-12 font-sans">
      
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-16">
        <div className="text-[10px] tracking-[0.3em] font-bold text-zinc-500 uppercase cursor-pointer hover:text-white transition">
          ← THE VAULT
        </div>
        
        <div className="flex items-center gap-6">
          <button 
          onClick={(e)=>{
            e.stopPropagation;
            goToBooking(shop_id);
          }}
          className="border cursor-pointer border-zinc-700 hover:bg-[#F7FFB0]/80 hover:text-black px-6 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-500">
            Book Appointment
          </button>
          
          <Link 
           href={"/cart"}
          className="relative cursor-pointer">
             <span className="absolute -top-1 -right-2 bg-[#F7FFB0]/80 text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black">0</span>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </Link>
        </div>
      </header>

      {/* --- HERO --- */}
      <section className="max-w-2xl mb-14">
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 leading-none">
          {shopName}
        </h1>
        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed uppercase tracking-[0.1em] max-w-md">
          Limited performance engineering curated for the concrete gallery. 
          Technical silhouettes meet high-fashion utility.
        </p>
      </section>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col cursor-pointer">
            
            {/* Image Container */}
            <div className="bg-[#111111] aspect-[4/5] rounded-2xl overflow-hidden relative flex items-center justify-center">
              {/* {product.tag && (
                <span className="absolute top-5 left-5 bg-[#D4FF3F] text-black text-[9px] font-black px-2 py-1 rounded-sm z-10 tracking-tighter">
                  {product.tag}
                </span>
              )} */}
              
              {/* Photo: Clear by default, zooms on hover, NO BLUR */}
              <img 
                src={product.url} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />

              {/* NO-BLUR Hover Actions Overlay (Gradient instead of Backdrop Blur) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <button
                onClick={(e)=>{
                  e.stopPropagation();
                  addCart(product.id);
                } }
                className="bg-[#F7FFB0]/80 cursor-pointer text-black font-black text-xs py-4 rounded-xl mb-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 tracking-widest">
                  ADD TO CART
                </button>
                <button className="text-white cursor-pointer text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">
                  View Details
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-6">
              <h3 className="font-bold text-xl italic tracking-tight uppercase transition-colors group-hover:text-[#F7FFB0]/80">
                {product.name}
              </h3>
              <p className="text-zinc-500 font-bold text-sm mt-1">₹{product.price}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;