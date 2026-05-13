import React from 'react';

const ShopCard = ({ name, location, tag, image }) => {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/5] bg-zinc-900 rounded-3xl overflow-hidden mb-6 border border-zinc-800 group-hover:border-yellow-500/40 transition-all">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-500" 
        />
      </div>
      <span className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{tag}</span>
      <h4 className="text-2xl font-bold uppercase mt-1 text-white">{name}</h4>
      <p className="text-xs text-zinc-500 mt-1 uppercase tracking-tighter">📍 {location}</p>
    </div>
  );
};

export default ShopCard;