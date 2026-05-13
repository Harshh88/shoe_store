export const Newsletter = () => {
  return (
    <section className="px-10 py-20 bg-[#0E0E0E]">
      <div 
        className="relative w-full rounded-[40px] p-16 overflow-hidden flex flex-col justify-between min-h-[450px]"
        style={{
          backgroundColor: '#1A1A1A',
          backgroundImage: 'radial-gradient(circle at 90% 50%, rgba(226, 255, 102, 0.15) 0%, transparent 50%)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <h2 className="text-[64px] font-black leading-[0.9] tracking-tighter text-white uppercase">
            Never miss <br /> a step.
          </h2>
          {/* <span className="bg-[#FFFFFF1A] backdrop-blur-md text-white text-[10px] px-3 py-1 rounded border border-[#FFFFFF1A] uppercase tracking-widest font-bold mt-4">
            Stitch - Design with AI
          </span> */}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 space-y-8">
          <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
            Join the Kinetica Reserve. Get early access to local drops, exclusive invites to shop events, and member-only pricing.
          </p>
          
          <div className="flex gap-4 max-w-xl">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 bg-[#252525] border border-transparent focus:border-[#E2FF66] rounded-full px-8 py-5 text-white outline-none transition-all placeholder:text-gray-600"
            />
            <button className="bg-[#F7FFB0]/80 text-black font-black uppercase px-10 py-5 rounded-full text-sm hover:bg-[#F7FFB0]/110 transition-colors duration-300">
              Join Reserve
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};