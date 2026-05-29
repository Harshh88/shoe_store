"use client"
import React from 'react';
import { SlidersHorizontal, Download, Package, Truck, DollarSign } from 'lucide-react';
import OrderTable from '@/component/OrderTable';

export default function OrderQueueDashboard({ orders }) {
  const defaultOrders = [
    { id: '#KL-9821', customer: 'Alexander Chen', shipping: 'Standard Shipping', product: 'Vortex Racer X', meta: 'EU 44 • Crimson', status: 'PENDING', image: '👟' },
    { id: '#KL-9820', customer: 'Julianne Moore', shipping: 'Express Priority', product: 'Neon Drift Tech', meta: 'EU 38 • Lime', status: 'SHIPPED', image: '👟' },
    { id: '#KL-9799', customer: 'Marcus Thorne', shipping: 'International', product: 'Gravity Cloud V2', meta: 'EU 42 • Arctic', status: 'DELIVERED', image: '👟' },
    { id: '#KL-9755', customer: 'Sophia Rodriguez', shipping: 'Local Pickup', product: 'Legacy Canvas Hi', meta: 'EU 39 • Obsidian', status: 'PENDING', image: '👟' }
  ];

  const displayOrders = orders || defaultOrders;
  // const shippedOrder = displayOrders.forEach(element => {
    
  // });

  return (
    <div className="flex-1 text-white w-full flex flex-col justify-between">
      <div>
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-mono text-white mb-1">ORDER QUEUE</h1>
            <p className="text-zinc-400 text-xs md:text-sm tracking-wide">
              Managing the movement of high-performance kinetics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#1A1A1A] border border-[#262626] text-zinc-300 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider font-mono hover:text-white hover:border-zinc-700 transition-all">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 bg-[#D9FA53] text-black px-4 py-2.5 rounded-xl text-xs font-black tracking-wider font-mono hover:bg-[#cbe947] transition-all">
              <Download className="w-4 h-4 stroke-[2.5]" />
              Export Manifest
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-4">AWAITING DISPATCH</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-[#D9FA53]">12</span>
              <span className="text-xs text-zinc-500 font-medium font-mono uppercase">Orders</span>
            </div>
            <Package className="absolute right-[-10px] bottom-[-20px] w-32 h-32 text-[#1C1C1C] opacity-30 pointer-events-none stroke-1 transition-transform duration-500 group-hover:scale-110" />
          </div>

          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-4">IN TRANSIT</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-white">{displayOrders.filter(ord => ord.status === "shipped").length}</span>
              <span className="text-xs text-zinc-500 font-medium font-mono uppercase">Parcels</span>
            </div>
            <Truck className="absolute right-[-10px] bottom-[-20px] w-32 h-32 text-[#1C1C1C] opacity-30 pointer-events-none stroke-1 transition-transform duration-500 group-hover:scale-110" />
          </div>

          <div className="bg-[#141414] border-y border-r border-[#222222] border-l-2 border-l-[#D9FA53] rounded-2xl p-6 relative overflow-hidden group hover:border-y-zinc-700 hover:border-r-zinc-700 transition-all duration-300">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-4">TOTAL ORDER&#39;s AMOUNT</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-white">{displayOrders.reduce((prev,curr)=>{
                return(
                  prev + Number(curr.total_amount)
                )
              },0).toLocaleString("en-In",{
                style:"currency",
                currency:"INR",
                maximumFractionDigits: 0
              })}</span>
              {/* <span className="text-xs text-zinc-500 font-medium font-mono uppercase">Revenue</span> */}
            </div>
            <DollarSign className="absolute right-[-10px] bottom-[-20px] w-32 h-32 text-[#1C1C1C] opacity-30 pointer-events-none stroke-1 transition-transform duration-500 group-hover:scale-110" />
          </div>
        </section>

        <OrderTable orders={displayOrders} />
      </div>
    </div>
  );
}