import React from 'react';

const Hero = () => {
  return (
    <section className="relative px-8 py-20 flex flex-col lg:flex-row items-center overflow-hidden min-h-[85vh] bg-black">
      <div className="z-10 max-w-2xl">
        <span className="text-[10px] border border-yellow-500 text-yellow-500 px-3 py-1 rounded-sm uppercase font-bold tracking-[0.2em]">
          Limited Edition Release
        </span>
        <h2 className="text-7xl md:text-[120px] font-black mt-6 leading-[0.8] italic uppercase tracking-tighter text-white">
          Neon <br /> <span className="text-zinc-400">Kinetic V1</span>
        </h2>
        <p className="mt-10 text-zinc-500 text-sm max-w-sm leading-relaxed">
          The intersection of algorithmic design and high-performance cushioning. 
          Engineered for the future of urban movement.
        </p>
        <div className="mt-12 flex gap-5">
          <button className="bg-yellow-100 text-black px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all">
            Explore the Drop
          </button>
          <button className="border border-zinc-700 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all">
            View Specs
          </button>
        </div>
      </div>

      {/* Background big text */}
      <div className="absolute right-[-5%] bottom-0 text-[20rem] font-black text-zinc-900/40 leading-none select-none italic pointer-events-none uppercase">
        PERFORM
      </div>

      {/* Shoe Image */}
      <div className="relative mt-20 lg:mt-0 lg:absolute lg:right-10 w-full lg:w-[50%] drop-shadow-[0_40px_50px_rgba(34,197,94,0.3)]">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000" 
          alt="Shoe"
          className="w-full h-auto transform -rotate-12 hover:rotate-0 transition-transform duration-700"
        />
      </div>
    </section>
  );
};

export default Hero;