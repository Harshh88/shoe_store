"use client"
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrderTable({ orders }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'SHIPPED':
        return 'bg-[#152321] text-[#4FF1C2] border-[#223933]';
      case 'DELIVERED':
        return 'bg-[#181D2B] text-[#529CFF] border-[#202E46]';
      default:
        return 'bg-[#2A2315] text-[#FFB020] border-[#3F331A]';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#141414] border border-[#222222] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#222222] text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                <th className="py-4 px-6 font-bold">ORDER ID</th>
                <th className="py-4 px-6 font-bold">CUSTOMER</th>
                <th className="py-4 px-6 font-bold">PRODUCT</th>
                <th className="py-4 px-6 font-bold">STATUS</th>
                <th className="py-4 px-6 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1C1C]">
              {orders.map((order, idx) => (
                <tr key={idx} className="group hover:bg-[#1A1A1A]/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-sm tracking-wide text-white">
                    {order.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-white tracking-wide">{order.customer}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{order.shipping}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#090909] border border-[#1C1C1C] flex items-center justify-center text-xl shrink-0">
                        {order.image || '👟'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white tracking-wide">{order.product}</div>
                        <div className="text-xs text-zinc-500 mt-0.5 font-mono">{order.meta}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-mono font-black tracking-widest px-3 py-1 rounded border uppercase ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="bg-[#1C1C1C] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#262626] text-xs font-bold font-mono tracking-wider px-4 py-2 rounded-xl transition-all">
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 px-1">
        <span className="text-xs text-zinc-500 font-mono tracking-wide">
          Showing 4 of 28 orders
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full border border-[#222222] bg-[#141414] text-zinc-500 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white text-black font-mono text-xs font-bold flex items-center justify-center shadow-md">
            1
          </button>
          <button className="w-8 h-8 rounded-full border border-[#222222] bg-[#141414] text-zinc-400 hover:text-white font-mono text-xs font-bold flex items-center justify-center transition-all">
            2
          </button>
          <button className="w-8 h-8 rounded-full border border-[#222222] bg-[#141414] text-zinc-400 hover:text-white font-mono text-xs font-bold flex items-center justify-center transition-all">
            3
          </button>
          <button className="w-8 h-8 rounded-full border border-[#222222] bg-[#141414] text-zinc-500 hover:text-white hover:border-zinc-700 flex items-center justify-center transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}