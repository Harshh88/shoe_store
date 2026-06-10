"use client";

import React from 'react';
import { CheckCircle2, MapPin } from 'lucide-react';

export default function SuccessManifest({
  orderId,
  clientName,
  valuationMetric,
  orderItemsList = [], // Map crash se bachne ke liye safe default boundary
  address,
  city,
  state,
  country,
  onTrackQueue,
  onContinueShopping
}){
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="max-w-4xl w-full space-y-8">

        {/* Top Celebration Block Banner */}
        <div className="text-center bg-[#141414] border border-[#222222] rounded-3xl p-8 relative overflow-hidden">
          <div className="w-12 h-12 bg-[#233922] border border-[#2e542c] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#4FF1C2]" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black font-mono tracking-tight text-white uppercase">Order Placed Successfully</h1>
          <p className="text-xs font-mono text-zinc-500 mt-2 tracking-widest uppercase">
            CONFIRMATION SEGMENT TOKEN MATRIX // #KINETICA-{orderId}
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mt-6 pt-6 border-t border-[#1F1F1F] text-left font-mono">
            <div>
              <span className="text-[9px] text-zinc-500 block uppercase">EST. DELIVERY</span>
              <div className="text-xs font-bold text-white mt-0.5">May 24, 2026</div>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-zinc-500 block uppercase">LOGISTICS CARRIER</span>
              <div className="text-xs font-bold text-[#D9FA53] mt-0.5">Kinetica Priority Node</div>
            </div>
          </div>
        </div>

        {/* Main Info Dashboard Segment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Side Column: Order Tracker Timeline */}
          <div className="lg:col-span-1 bg-[#141414] border border-[#222222] rounded-3xl p-6 space-y-6 h-fit">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#1F1F1F] pb-2">
              Order Timeline Pipeline
            </span>

            <div className="relative border-l border-zinc-800 ml-3 space-y-8 pb-2">
              <div className="relative pl-6">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-[#D9FA53] rounded-full ring-4 ring-black" />
                <h4 className="text-sm font-black font-mono text-white tracking-wide uppercase">Order Pending</h4>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Transaction received & logged</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-zinc-700 rounded-full ring-4 ring-black" />
                <h4 className="text-sm font-bold font-mono text-zinc-400 tracking-wide uppercase">Confirmed Verification</h4>
                <p className="text-[10px] text-zinc-600 font-mono mt-0.5">Awaiting warehouse authorization validation</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-zinc-900 rounded-full ring-4 ring-black" />
                <h4 className="text-sm font-medium font-mono text-zinc-600 tracking-wide uppercase">Shipped Freight</h4>
                <p className="text-[10px] text-zinc-700 font-mono mt-0.5">Pending courier physical dispatch node</p>
              </div>
            </div>
          </div>

          {/* Right Side Column: Combined Address & Verified Products Manifest */}
          <div className="lg:col-span-2 space-y-6">

            {/* Address Logistics Box */}
            <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest border-b border-[#1F1F1F] pb-2">
                <MapPin className="w-4 h-4 text-[#D9FA53]" />
                Consignment Routing Coordinates Address
              </div>

              <div className="space-y-1 font-mono">
                <div className="text-sm font-black text-white">{clientName}</div>
                <div className="text-xs text-zinc-400">
                  {address}, {city}, {state}, {country}
                </div>
              </div>
            </div>

            {/* Unique Clean Products List Specification Box */}
            <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#1F1F1F] pb-2">
                Inventory Manifest Specification Breakdown
              </span>

              <div className="space-y-3">
                {orderItemsList.length === 0 ? (
                  <div className="flex justify-between items-center bg-[#0E0E0E] p-4 rounded-2xl border border-[#1F1F1F]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#141414] border border-[#222222] rounded-lg flex items-center justify-center text-lg">👟</div>
                      <div className="text-sm font-bold font-mono text-white">Premium Kinetic Footwear Bundle</div>
                    </div>
                    <span className="text-sm font-mono text-zinc-400">₹{Number(valuationMetric).toLocaleString("en-IN")}</span>
                  </div>
                ) : (
                  orderItemsList.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#0E0E0E] p-4 rounded-2xl border border-[#1F1F1F]">
                      <div className="flex items-center gap-3">
                        {/* Fallback image handle safely attached */}
                        <img 
                          src={item.product_image_url || item.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100"} 
                          alt="item" 
                          className="w-10 h-10 object-cover rounded-lg border border-[#1F1F1F]" 
                        />
                        <div>
                          <div className="text-sm font-bold font-mono text-white">{item.product_name || "Kinetica Gear Component"}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">Batch Identification Ref Code: {item.product_id || index}</div>
                        </div>
                      </div>
                      <span className="text-sm font-mono text-zinc-400 font-bold">₹{item.price || item.product_price}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Aggregation Cost Layout */}
              <div className="pt-4 border-t border-[#1F1F1F] flex justify-between items-center font-mono">
                <span className="text-xs text-zinc-500 uppercase">Gross Aggregation Sum</span>
                <span className="text-lg font-black text-[#D9FA53]">₹{Number(valuationMetric).toLocaleString("en-IN")}</span>
              </div>
            </div>

          </div> {/* Right layout closure safe block */}
        </div>

        {/* Bottom Actions Row Trigger Console */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button onClick={onTrackQueue} className="w-full sm:w-auto px-8 py-3.5 bg-[#D9FA53] hover:bg-[#cbe947] text-black font-mono text-xs font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer">
            Track Your Order Queue Console
          </button>
          <button onClick={onContinueShopping} className="w-full sm:w-auto px-8 py-3.5 bg-[#141414] hover:bg-[#1C1C1C] text-zinc-400 hover:text-white border border-[#222222] font-mono text-xs font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer">
            Continue Terminal Shopping
          </button>
        </div>

      </div>
    </div>
  );
}