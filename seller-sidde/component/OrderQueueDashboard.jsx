"use client"
import React, { useState } from 'react';
import { Package, Truck, DollarSign, ArrowLeft } from 'lucide-react';
import OrderTable from '@/component/OrderTable';

export default function OrderQueueDashboard({ orders, onConfirmOrder, onShipOrder, onCancelOrder }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedOrder, setSelectedOrder] = useState(null); 

  const defaultOrders = [
    { id: 4, customer: 'Alexander Chen', total_amount: '900', status: 'pending', items: [{ product_name: 'Vortex Racer X', product_image_url: '' }] },
    { id: 2, customer: 'Julianne Moore', total_amount: '1800', status: 'confirmed', items: [{ product_name: 'Neon Drift Tech', product_image_url: '' }] }
  ];

  const displayOrders = orders || defaultOrders;

  // FILTER LOGIC
  const filteredOrders = displayOrders.filter((order) => {
    if (activeFilter === 'ALL') return true;
    return order?.status?.toLowerCase() === activeFilter.toLowerCase();
  });

  // COUNTS FOR SECTIONS
  const allCount = displayOrders.length;
  const pendingCount = displayOrders.filter(o => o.status?.toLowerCase() === 'pending').length;
  const confirmedCount = displayOrders.filter(o => o.status?.toLowerCase() === 'confirmed').length;
  const shippedCount = displayOrders.filter(o => o.status?.toLowerCase() === 'shipped').length;
  const deliveredCount = displayOrders.filter(o => o.status?.toLowerCase() === 'delivered').length;
  const cancelledCount = displayOrders.filter(o => o.status?.toLowerCase() === 'cancelled').length;

  const filters = [
    { label: `ALL (${allCount})`, value: 'ALL' },
    { label: `PENDING (${pendingCount})`, value: 'PENDING' },
    { label: `CONFIRMED (${confirmedCount})`, value: 'CONFIRMED' },
    { label: `SHIPPED (${shippedCount})`, value: 'SHIPPED' },
    { label: `DELIVERED (${deliveredCount})`, value: 'DELIVERED' }, // Added Delivered Tab
    { label: `CANCELLED (${cancelledCount})`, value: 'CANCELLED' }
  ];

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'SHIPPED': return 'bg-[#152321] text-[#4FF1C2] border-[#223933]';
      case 'CONFIRMED': return 'bg-[#182538] text-[#529CFF] border-[#203146]';
      case 'DELIVERED': return 'bg-[#12222a] text-[#2fe4ff] border-[#1b3440]'; // Delivered Style
      case 'CANCELLED': return 'bg-[#2B1818] text-[#FF5252] border-[#462020]';
      default: return 'bg-[#2A2315] text-[#FFB020] border-[#3F331A]';
    }
  };

  // FULL INFORMATION COMPONENT VIEW
  if (selectedOrder) {
    return (
      <div className="flex-1 text-white w-full flex flex-col justify-between animate-in fade-in duration-200">
        <div>
          <header className="mb-8">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="flex items-center gap-2 bg-[#141414] border border-[#222222] text-zinc-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-wider uppercase mb-6 transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Queue
            </button>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight font-mono text-white mb-2">
              ORDER SPECIFICATION
            </h1>
            <p className="text-zinc-500 font-mono text-sm tracking-widest">ORDER UNIQUE TOKEN ID // #{selectedOrder.id}</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            <div className="bg-[#141414] border border-[#222222] p-6 rounded-3xl space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#222222] pb-2">
                Logistics & Client Meta
              </span>
              <div>
                <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Customer Identifier</label>
                <div className="text-lg font-black font-mono text-white">{selectedOrder.customer}</div>
              </div>
              <div>
                <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Financial Valuation</label>
                <div className="text-xl font-black font-mono text-[#D9FA53]">₹{selectedOrder.total_amount}</div>
              </div>
              <div>
                <label className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Current State Status</label>
                <span className={`text-[9px] font-mono font-black tracking-widest px-2.5 py-1 rounded border uppercase inline-block mt-1 ${getStatusStyle(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="lg:col-span-2 bg-[#141414] border border-[#222222] p-6 rounded-3xl space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block border-b border-[#222222] pb-2">
                Consigned Inventory Items
              </span>
              <div className="space-y-4">
                {(selectedOrder.items || selectedOrder.products || []).map((prod, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-4 bg-[#0E0E0E] p-4 rounded-2xl border border-[#1F1F1F]">
                    <div className="w-16 h-16 rounded-xl bg-[#141414] border border-[#222222] overflow-hidden shrink-0 flex items-center justify-center">
                      {prod.product_image_url || prod.image ? (
                        <img src={prod.product_image_url || prod.image} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">👟</span>
                      )}
                    </div>
                    <div>
                      <div className="text-base font-black text-white font-mono">{prod.product_name || prod.name || "Product"}</div>
                      <div className="text-xs text-zinc-500 font-mono mt-1">Product Batch ID: {prod.product_id || pIdx}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="bg-[#141414] border border-[#222222] p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">OPERATIONAL CONSOLE</span>
              <p className="text-xs text-zinc-400 font-mono">Execute immediate pipeline modifications below.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              {selectedOrder.status?.toLowerCase() === 'pending' && (
                <>
                  <button 
                    onClick={() => { onConfirmOrder(selectedOrder.id); setSelectedOrder(null); }}
                    className="flex-1 md:flex-none px-6 bg-[#D9FA53] hover:bg-[#cbe947] text-black text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase transition-colors"
                  >
                    CONFIRM ORDER
                  </button>
                  <button 
                    onClick={() => { onCancelOrder(selectedOrder.id); setSelectedOrder(null); }}
                    className="flex-1 md:flex-none px-6 bg-red-950 text-red-400 hover:bg-red-900 border border-red-900 text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase transition-colors"
                  >
                    CANCEL ORDER
                  </button>
                </>
              )}

              {selectedOrder.status?.toLowerCase() === 'confirmed' && (
                <button 
                  onClick={() => { onShipOrder(selectedOrder.id); setSelectedOrder(null); }}
                  className="flex-1 md:flex-none px-8 bg-sky-500 hover:bg-sky-600 text-black text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase transition-colors"
                >
                  SHIP ORDER PARCEL
                </button>
              )}

              {(selectedOrder.status?.toLowerCase() === 'shipped' || selectedOrder.status?.toLowerCase() === 'delivered' || selectedOrder.status?.toLowerCase() === 'cancelled') && (
                <button 
                  disabled
                  className="flex-1 bg-[#1C1C1C] text-zinc-600 text-xs font-black tracking-widest py-3 px-8 rounded-xl font-mono uppercase border border-[#222222] cursor-not-allowed text-center"
                >
                  STATE LOCKED // {selectedOrder.status}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 text-white w-full flex flex-col justify-between">
      <div>
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight font-mono text-white mb-1">ORDER QUEUE</h1>
          <p className="text-zinc-400 text-xs md:text-sm tracking-wide">
            Managing the movement of high-performance kinetics.
          </p>
        </header>

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2 rounded-full text-[10px] font-black font-mono tracking-widest whitespace-nowrap transition-all border ${
                activeFilter === f.value
                  ? 'bg-[#D9FA53] text-black border-[#D9FA53]'
                  : 'bg-[#141414] text-zinc-500 border-[#222222]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-4">AWAITING DISPATCH</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-[#D9FA53]">{pendingCount}</span>
              <span className="text-xs text-zinc-500 font-medium font-mono uppercase">Orders</span>
            </div>
            <Package className="absolute right-[-10px] bottom-[-20px] w-32 h-32 text-[#1C1C1C] opacity-30 pointer-events-none stroke-1" />
          </div>

          <div className="bg-[#141414] border border-[#222222] rounded-2xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-all duration-300">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-4">IN TRANSIT</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-white">{shippedCount}</span>
              <span className="text-xs text-zinc-500 font-medium font-mono uppercase">Parcels</span>
            </div>
            <Truck className="absolute right-[-10px] bottom-[-20px] w-32 h-32 text-[#1C1C1C] opacity-30 pointer-events-none stroke-1" />
          </div>

          <div className="bg-[#141414] border-y border-r border-[#222222] border-l-2 border-l-[#D9FA53] rounded-2xl p-6 relative overflow-hidden group hover:border-y-zinc-700 hover:border-r-zinc-700 transition-all duration-300">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-4">TOTAL REVENUE AMOUNT</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-mono text-white">
                {displayOrders.reduce((prev, curr) => prev + Number(curr.total_amount || 0), 0).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0
                })}
              </span>
            </div>
            <DollarSign className="absolute right-[-10px] bottom-[-20px] w-32 h-32 text-[#1C1C1C] opacity-30 pointer-events-none stroke-1" />
          </div>
        </section>

        <OrderTable 
          orders={filteredOrders} 
          onOrderSelect={setSelectedOrder} 
        />
      </div>
    </div>
  );
}