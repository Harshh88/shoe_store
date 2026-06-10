"use client"
import React from 'react';
import { ChevronRight, MapPin } from "lucide-react";

export default function ShippingForm({ formData, handleChange, cartItems, cartCosts, submitForm, loading }) {
  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center justify-start p-4 md:p-8 font-sans selection:bg-[#D9FA53] selection:text-black">
      <div className="max-w-3xl w-full space-y-8">
        
        <header className="flex justify-between items-center border-b border-[#1A1A1A] pb-6">
          <div>
            <h1 className="text-3xl font-black font-mono tracking-tighter text-white">SHIPPING</h1>
            <p className="text-xs text-zinc-500 font-mono mt-1 tracking-widest uppercase">STEP 01 OF 03 // LOGISTICS DESTINATION</p>
          </div>
          <div className="text-right font-mono text-[10px] text-zinc-400 border border-[#222222] bg-[#141414] px-3 py-1.5 rounded-xl">
            SECURE ENGINE AUTH
          </div>
        </header>

        <form onSubmit={submitForm} className="space-y-6">
          <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-widest mb-2 border-b border-[#1F1F1F] pb-2">
              <MapPin className="w-4 h-4 text-[#D9FA53]" /> Consignee Destination Meta
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Full Name</label>
                <input required name="user_name" type="text" value={formData.user_name} onChange={handleChange} placeholder="e.g. Marcus Sterling" className="w-full bg-[#0E0E0E] border border-[#222222] focus:border-zinc-500 rounded-xl p-3.5 text-sm font-mono tracking-wide text-white outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Contact Number</label>
                <input required name="contact_number" type="tel" pattern="[0-9]{10}" maxLength="10" value={formData.contact_number} onChange={handleChange} placeholder="10-Digit Mobile ID" className="w-full bg-[#0E0E0E] border border-[#222222] focus:border-zinc-500 rounded-xl p-3.5 text-sm font-mono tracking-wide text-white outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Country</label>
                <input required name="country" type="text" value={formData.country} onChange={handleChange} placeholder="United Kingdom" className="w-full bg-[#0E0E0E] border border-[#222222] focus:border-zinc-500 rounded-xl p-3.5 text-sm font-mono tracking-wide text-white outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">State / Province</label>
                <input required name="state" type="text" value={formData.state} onChange={handleChange} placeholder="London" className="w-full bg-[#0E0E0E] border border-[#222222] focus:border-zinc-500 rounded-xl p-3.5 text-sm font-mono tracking-wide text-white outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">City</label>
                <input required name="city" type="text" value={formData.city} onChange={handleChange} placeholder="Shoreditch" className="w-full bg-[#0E0E0E] border border-[#222222] focus:border-zinc-500 rounded-xl p-3.5 text-sm font-mono tracking-wide text-white outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Full Delivery Address</label>
              <input required name="address" type="text" value={formData.address} onChange={handleChange} placeholder="Floor 12, Unit 302, Velocity Tower" className="w-full bg-[#0E0E0E] border border-[#222222] focus:border-zinc-500 rounded-xl p-3.5 text-sm font-mono tracking-wide text-white outline-none transition-all" />
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#1F1F1F] pb-2">
              ORDER SUMMARY
            </span>
            
            {cartItems.length === 0 ? (
              <div className="flex justify-between items-center bg-[#0E0E0E] border border-[#1F1F1F] rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#141414] rounded-xl flex items-center justify-center text-xl border border-[#262626]">👟</div>
                  <div>
                    <h4 className="text-sm font-bold font-mono tracking-wide text-white">High-Performance Kinetics</h4>
                    <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Automated secure allocation mapping</p>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-sm text-zinc-400">Qty: 01</div>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#0E0E0E] border border-[#1F1F1F] rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <img src={item.product_image_url || item.image || ""} alt="Product" className="w-12 h-12 object-cover rounded-xl border border-[#222222]" onError={(e) => { e.target.style.display='none'; }}/>
                      <div>
                        <h4 className="text-sm font-bold font-mono tracking-wide text-white">{item.product_name || "Velocity Tech Elite"}</h4>
                        <p className="text-[11px] text-[#D9FA53] font-mono mt-0.5">₹{item.product_price}</p>
                      </div>
                    </div>
                    <div className="text-right font-mono font-black text-sm text-zinc-400">Qty: {item.quantity || 1}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <footer className="bg-[#141414] border border-[#222222] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">AGGREGATE VALUATION</span>
              <div className="text-3xl font-black font-mono tracking-tighter text-white">₹{Number(cartCosts.totalprice || 0).toLocaleString("en-IN")}</div>
            </div>
            <button type="submit" disabled={loading} className="w-full sm:w-auto px-8 py-4 bg-[#D9FA53] hover:bg-[#cbe947] disabled:bg-zinc-700 disabled:text-zinc-500 text-black text-xs font-black tracking-widest rounded-xl font-mono uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-black/40">
              {loading ? "PROCEESING CONSOLE..." : "Continue to Payment"}
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}