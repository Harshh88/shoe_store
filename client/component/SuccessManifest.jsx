"use client";

import React from 'react';
import { CheckCircle2, MapPin } from 'lucide-react';

export default function SuccessManifest({
  orderId,
  clientName,
  valuationMetric,
  orderItemsList = [], 
  address,
  city,
  state,
  country,
  onTrackQueue,
  onContinueShopping
}){
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 font-sans w-full overflow-x-hidden">
      <div className="max-w-4xl w-full space-y-6 sm:space-y-8">

        {/* TOP STATUS CARD */}
        <div className="text-center bg-[#141414] border border-[#222222] rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="w-12 h-12 bg-[#233922] border border-[#2e542c] rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
            <CheckCircle2 className="w-6 h-6 text-[#4FF1C2]" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black font-mono tracking-tight text-white uppercase leading-tight">Order Placed Successfully</h1>
          <p className="text-[10px] sm:text-xs font-mono text-zinc-500 mt-2 tracking-widest uppercase break-all px-2">
            CONFIRMATION SEGMENT TOKEN MATRIX // #KINETICA-{orderId}
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-6 pt-6 border-t border-[#1F1F1F] text-left font-mono text-xs">
            <div>
              <span className="text-[9px] text-zinc-500 block uppercase">EST. DELIVERY</span>
              <div className="text-xs font-bold text-white mt-0.5 whitespace-nowrap">May 24, 2026</div>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-zinc-500 block uppercase">LOGISTICS CARRIER</span>
              <div className="text-xs font-bold text-[#F7FFB0] mt-0.5 truncate">Kinetica Priority Node</div>
            </div>
          </div>
        </div>

        {/* CONTENT DUAL COLUMN SPLIT */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          
          {/* TIMELINE COLUMN */}
          <div className="lg:col-span-1 bg-[#141414] border border-[#222222] rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-5 sm:space-y-6 h-fit w-full">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#1F1F1F] pb-2">
              Order Timeline Pipeline
            </span>

            <div className="relative border-l border-zinc-800 ml-2 sm:ml-3 space-y-6 sm:space-y-8 pb-2">
              <div className="relative pl-5 sm:pl-6">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-[#F7FFB0] rounded-full ring-4 ring-black" />
                <h4 className="text-xs sm:text-sm font-black font-mono text-white tracking-wide uppercase">Order Pending</h4>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5 leading-normal">Transaction received & logged</p>
              </div>
              <div className="relative pl-5 sm:pl-6">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-zinc-700 rounded-full ring-4 ring-black" />
                <h4 className="text-xs sm:text-sm font-bold font-mono text-zinc-400 tracking-wide uppercase">Confirmed Verification</h4>
                <p className="text-[10px] text-zinc-600 font-mono mt-0.5 leading-normal">Awaiting warehouse authorization validation</p>
              </div>
              <div className="relative pl-5 sm:pl-6">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-zinc-900 rounded-full ring-4 ring-black" />
                <h4 className="text-xs sm:text-sm font-medium font-mono text-zinc-600 tracking-wide uppercase">Shipped Freight</h4>
                <p className="text-[10px] text-zinc-700 font-mono mt-0.5 leading-normal">Pending courier physical dispatch node</p>
              </div>
            </div>
          </div>

          {/* SHIPPING & DETAILS DETAILS BUNDLE */}
          <div className="lg:col-span-2 space-y-6 w-full">

            {/* Address Section */}
            <div className="bg-[#141414] border border-[#222222] rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest border-b border-[#1F1F1F] pb-2">
                <MapPin className="w-4 h-4 text-[#F7FFB0] shrink-0" />
                Consignment Routing Coordinates Address
              </div>

              <div className="space-y-1 font-mono">
                <div className="text-sm font-black text-white">{clientName}</div>
                <div className="text-xs text-zinc-400 leading-relaxed break-words">
                  {address}, {city}, {state}, {country}
                </div>
              </div>
            </div>

            {/* Inventory Manifest Items */}
            <div className="bg-[#141414] border border-[#222222] rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#1F1F1F] pb-2">
                Inventory Manifest Specification Breakdown
              </span>

              <div className="space-y-3">
                {orderItemsList.length === 0 ? (
                  <div className="flex justify-between items-center bg-[#0E0E0E] p-4 rounded-xl sm:rounded-2xl border border-[#1F1F1F] gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-[#141414] border border-[#222222] rounded-lg flex items-center justify-center text-lg shrink-0">👟</div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-white truncate">Premium Kinetic Footwear Bundle</div>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-zinc-400 shrink-0">₹{Number(valuationMetric).toLocaleString("en-IN")}</span>
                  </div>
                ) : (
                  orderItemsList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#0E0E0E] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#1F1F1F] gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={item.product_image_url || item.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100"} 
                          alt="item" 
                          className="w-10 h-10 object-cover rounded-lg border border-[#1F1F1F] shrink-0" 
                        />
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold font-mono text-white truncate">{item.product_name || "Kinetica Gear Component"}</div>
                          <div className="text-[9px] sm:text-[10px] text-zinc-500 font-mono truncate">Batch ID Ref: {item.product_id || index}</div>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-mono text-zinc-400 font-bold shrink-0">₹{(item.price || item.product_price)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4 border-t border-[#1F1F1F] flex justify-between items-center font-mono text-xs">
                <span className="text-zinc-500 uppercase">Gross Aggregation Sum</span>
                <span className="text-base sm:text-lg font-black text-[#F7FFB0] shrink-0">₹{Number(valuationMetric).toLocaleString("en-IN")}</span>
              </div>
            </div>

          </div> 
        </div>

        {/* BOTTOM GLOBAL ACTIONS ROWS */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 w-full">
          <button onClick={onTrackQueue} className="w-full sm:w-auto px-6 py-4 bg-[#F7FFB0]/80 hover:bg-[#F7FFB0] text-black font-mono text-xs font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer text-center whitespace-nowrap">
            Track Your Order Queue Console
          </button>
          <button onClick={onContinueShopping} className="w-full sm:w-auto px-6 py-4 bg-[#141414] hover:bg-[#1C1C1C] text-zinc-400 hover:text-white border border-[#222222] font-mono text-xs font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer text-center whitespace-nowrap">
            Continue Terminal Shopping
          </button>
        </div>

      </div>
    </div>
  );
}