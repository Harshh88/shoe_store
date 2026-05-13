import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <h1 className="text-xl font-black italic tracking-tighter text-yellow-400 uppercase">Kinetica</h1>
        <div className="relative hidden lg:block">
          <input 
            type="text" 
            placeholder="Search nearby shoes" 
            className="bg-zinc-900 border border-zinc-800 rounded-full py-2 px-5 pl-10 text-xs w-72 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <span className="absolute left-4 top-2.5 text-zinc-500 text-xs">🔍</span>
        </div>
      </div>
      
      <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
        <a href="#" className="border-b-2 border-yellow-400 pb-1 text-white">Shops</a>
        <a href="#" className="text-zinc-500 hover:text-white transition">Drops</a>
        <a href="#" className="text-zinc-500 hover:text-white transition">Release Radar</a>
        <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-black hover:bg-white transition duration-300">LOGIN</button>
      </div>
    </nav>
  );
};

export default Navbar;