"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OrderTable({ orders, onOrderSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {
      case 'SHIPPED':
        return 'bg-[#152321] text-[#4FF1C2] border-[#223933]';
      case 'CONFIRMED':
        return 'bg-[#182538] text-[#529CFF] border-[#203146]';
      case 'DELIVERED':
        return 'bg-[#12222a] text-[#2fe4ff] border-[#1b3440]'; 
      case 'CANCELLED':
        return 'bg-[#2B1818] text-[#FF5252] border-[#462020]';
      default:
        return 'bg-[#2A2315] text-[#FFB020] border-[#3F331A]';
    }
  };

  const displayOrders = orders || [];
  
  const totalItems = displayOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = displayOrders.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
                <th className="py-4 px-6 font-bold">PRODUCTS</th>
                <th className="py-4 px-6 font-bold">STATUS</th>
                <th className="py-4 px-6 font-bold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C1C1C]">
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
                    No orders available in this section
                  </td>
                </tr>
              ) : (
                currentOrders.map((order, idx) => {
                  let normalizedProducts = order.items || order.products || [];

                  return (
                    <tr 
                      key={idx} 
                      onClick={() => onOrderSelect(order)}
                      className="group hover:bg-[#1A1A1A]/60 transition-colors align-top cursor-pointer"
                    >
                      <td className="py-4 px-6 font-mono font-bold text-sm tracking-wide text-white">
                        #{order.id}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-bold text-white tracking-wide">{order.customer}</div>
                        <div className="text-xs text-zinc-500 mt-1 font-mono">₹{order.total_amount}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-4">
                          {normalizedProducts.map((prod, pIdx) => {
                            const pName = prod.product_name || prod.name || "Unknown Product";
                            const pImage = prod.product_image_url || prod.image || "";

                            return (
                              <div key={pIdx} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#090909] border border-[#1C1C1C] flex items-center justify-center overflow-hidden shrink-0">
                                  {pImage ? (
                                    <img src={pImage} alt={pName} className="w-full h-full object-cover" />
                                  ) : (
                                    <span className="text-2xl">👟</span>
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-white tracking-wide">{pName}</div>
                                  <div className="text-xs text-zinc-500 mt-0.5 font-mono">ID: {prod.product_id || pIdx}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[10px] font-mono font-black tracking-widest px-3 py-1 rounded border uppercase ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => onOrderSelect(order)}
                          className="bg-[#1C1C1C] hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#262626] text-xs font-bold font-mono tracking-wider px-4 py-2 rounded-xl transition-all"
                        >
                          View Info
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 px-1">
        <span className="text-xs text-zinc-500 font-mono tracking-wide">
          Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)} of {totalItems} orders
        </span>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-full border border-[#222222] bg-[#141414] flex items-center justify-center transition-all ${
                currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => { setCurrentPage(number); window.scrollTo(0,0); }}
                className={`w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all ${
                  currentPage === number
                    ? 'bg-[#F7FFB0] text-black shadow-md'
                    : 'border border-[#222222] bg-[#141414] text-zinc-400 hover:text-white'
                }`}
              >
                {number}
              </button>
            ))}

            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-full border border-[#222222] bg-[#141414] flex items-center justify-center transition-all ${
                currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}