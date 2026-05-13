"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

const CheckoutComponent = ({totalOfProduct,deleteItem}) => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "AEROGLIDE Z1",
  //     subText: "PERFORMANCE / NITROCORE",
  //     size: "10.5 US",
  //     color: "ELECTRIC LIME",
  //     price: 245.00,
  //     image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400"
  //   },
  //   {
  //     id: 2,
  //     name: "NEON FLUX",
  //     subText: "EDITORIAL VAPORSOLE",
  //     size: "11 US",
  //     color: "GHOST WHITE",
  //     price: 320.00,
  //     image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=400"
  //   }
  // ]);
  const {cartItems} = useCart();

  // Total calculation logic
  const subtotal = cartItems.reduce((acc, item) => acc + item.product_price, 0);

  return (
    <div className="min-h-screen  text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: Items List (Map Function) */}
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-black italic mb-8 tracking-tighter">YOUR BAG</h1>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.cart_item_id} className="bg-[#0f0f0f] group p-5 rounded-2xl flex gap-6 border border-zinc-900 hover:bg-black cursor-pointer">
                {/* Image Section */}
                <div className="w-32 h-32 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.url} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-110 ease-in-out transition-transform duration-700" />
                </div>

                {/* Content Section */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-black italic text-lg uppercase leading-none">{item.product_name}</h3>
                      {/* <p className="text-[10px] text-zinc-600 font-bold mt-1 tracking-widest">{item.subText}</p> */}
                    </div>
                    {/* Delete Icon */}
                    <button
                     onClick={(e)=> {
                      e.stopPropagation();
                      deleteItem(item.cart_item_id,item.product_id)
                     }}
                    className="text-zinc-700 hover:text-red-500 cursor-pointer transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>

                  <div className="flex gap-6 mt-4">
                    <div>
                      <p className="text-[9px] text-zinc-600 font-bold uppercase">Size</p>
                      <p className="text-xs font-bold">{item.product_size}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-600 font-bold uppercase">Color</p>
                      <p className="text-xs font-bold">red</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 text-xs font-bold">
                      <button className="text-zinc-500 hover:text-white">-</button>
                      <span>{item.quantity}</span>
                      <button className="text-zinc-500 hover:text-white">+</button>
                    </div>
                    <p className="text-lg font-black italic">${item.product_price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-zinc-900 sticky top-10">
            <h2 className="text-xl font-black italic uppercase mb-8">Order Summary</h2>
            
            <div className="space-y-4 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#F7FFB0]/80">Free</span>
              </div>
              <div className="flex justify-between border-t border-zinc-900 pt-4 mt-4 text-xl italic font-black text-white">
                <span className="uppercase">Total</span>
                <span className="text-3xl tracking-tighter">₹{totalOfProduct.totalprice}</span>
              </div>
            </div>

            <button className="cursor-pointer w-full bg-[#F7FFB0]/80 text-black font-black py-5 rounded-2xl mt-10 uppercase tracking-widest text-xs hover:brightness-110 transition-all active:scale-95">
              Checkout
            </button>

            <div className="mt-8 flex items-center justify-center gap-3 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
               Secure Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutComponent;