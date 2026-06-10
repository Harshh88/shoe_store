"use client"
import React from 'react';
import { ShoppingBag, Pencil, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onDeleteProduct, onEditClick }) {
  const { name, price, stock, url, id, _id } = product;
  const targetId = id || _id;

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      if (onDeleteProduct) {
        onDeleteProduct(targetId);
      } else {
        console.error("Delete function prop missing");
      }
    }
  };

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 relative overflow-hidden group hover:border-zinc-800 transition-all duration-300">
      
      <div className="relative w-full aspect-square bg-[#090909] rounded-2xl mb-4 overflow-hidden flex items-center justify-center border border-[#1b1b1b]">
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <button 
            type="button"
            onClick={() => onEditClick && onEditClick(product)}
            className="p-2.5 bg-[#141414]/90 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full transition-all border border-[#2c2c2c] backdrop-blur-sm"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          
          <button 
            type="button"
            onClick={handleDeleteClick}
            className="p-2.5 bg-[#141414]/90 hover:bg-red-950 text-zinc-400 hover:text-red-400 rounded-full transition-all border border-[#2c2c2c] backdrop-blur-sm"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
          <img
            className="w-full h-full object-contain"
            src={url} 
            alt={name} 
          />
        </div>

      </div>

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-black tracking-wide font-mono flex items-center gap-1.5 text-white">
            {name} 
          </h3>
          <div className="flex items-center gap-4 text-zinc-500 font-mono text-[11px] mt-1.5">
            <span className="flex items-center gap-1">
              <ShoppingBag className="w-3 h-3 text-zinc-600" /> STOCK: <span className="text-zinc-300 font-bold">{stock}</span>
            </span>
          </div>
        </div>
        <div className="text-xl font-mono font-black text-[#D9FA53]">
          {price.toLocaleString('en-IN',{
            style: 'currency',
            currency: 'INR'
          })}
        </div>
      </div>

    </div>
  );
}