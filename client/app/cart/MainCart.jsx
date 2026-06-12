"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';

const CheckoutComponent = ({ totalOfProduct, deleteItem, onCheckout }) => {
  const { cartItems } = useCart();

  const subtotal = (cartItems || []).reduce((acc, item) => {
    const price = Number(item.product_price || 0);
    const qty = Number(item.quantity || 1);
    return acc + (price * qty);
  }, 0);

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        <div className="lg:col-span-7 w-full">
          <h1 className="text-3xl sm:text-4xl font-black italic mb-6 sm:mb-8 tracking-tighter">YOUR BAG</h1>
          
          <div className="space-y-4">
            {cartItems && cartItems.map((item) => (
              <div key={item.cart_item_id} className="bg-[#0f0f0f] group p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row gap-4 sm:gap-6 border border-zinc-900 hover:bg-black cursor-pointer">
                
                <div className="w-full sm:w-32 h-40 sm:h-32 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={item.url || "/placeholder-shoe.png"} alt={item.product_name} className="w-full h-full object-cover group-hover:scale-110 ease-in-out transition-transform duration-700" />
                </div>

                <div className="flex-grow flex flex-col justify-between gap-2 sm:gap-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="max-w-[85%]">
                      <h3 className="font-black italic text-base sm:text-lg uppercase leading-tight sm:leading-none break-words">{item.product_name}</h3>
                    </div>
                    <button
                     onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.cart_item_id, item.product_id);
                     }}
                     className="text-zinc-700 hover:text-red-500 cursor-pointer transition-colors p-1 shrink-0"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>

                  <div className="flex gap-6 mt-1 sm:mt-4">
                    <div>
                      <p className="text-[9px] text-zinc-600 font-bold uppercase">Size</p>
                      <p className="text-xs font-bold">{item.product_size || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-600 font-bold uppercase">Color</p>
                      <p className="text-xs font-bold">Default</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 sm:mt-4 gap-2">
                    <div className="flex items-center gap-4 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 text-xs font-bold">
                      <button className="text-zinc-500 hover:text-white p-1">-</button>
                      <span>{item.quantity}</span>
                      <button className="text-zinc-500 hover:text-white p-1">+</button>
                    </div>
                    <p className="text-base sm:text-lg font-black italic shrink-0">₹{Number(item.product_price || 0).toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 w-full">
          <div className="bg-[#0f0f0f] p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border border-zinc-900 lg:sticky lg:top-10">
            <h2 className="text-lg sm:text-xl font-black italic uppercase mb-6 sm:mb-8">Order Summary</h2>
            
            <div className="space-y-4 text-[10px] sm:text-xs font-bold tracking-widest text-zinc-500 uppercase">
              <div className="flex justify-between gap-4">
                <span>Subtotal</span>
                <span className="text-white shrink-0">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Shipping</span>
                <span className="text-[#F7FFB0]/80 shrink-0">Free</span>
              </div>
              <div className="flex justify-between border-t border-zinc-900 pt-4 mt-4 text-lg sm:text-xl italic font-black text-white gap-4">
                <span className="uppercase">Total</span>
                <span className="text-2xl sm:text-3xl tracking-tighter shrink-0">₹{Number(totalOfProduct.totalprice || subtotal).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="cursor-pointer w-full bg-[#F7FFB0]/80 text-black font-black py-4 sm:py-5 rounded-xl sm:rounded-2xl mt-8 sm:mt-10 uppercase tracking-widest text-xs hover:brightness-110 transition-all active:scale-95 text-center"
            >
              Checkout
            </button>

            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0">
                 <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                 <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
               </svg>
               Secure Checkout
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutComponent;