export const Newsletter = () => {
  return (
    <section className="px-4 sm:px-10 py-12 sm:py-20 bg-[#0E0E0E]">
      <div 
        className="relative w-full rounded-[30px] sm:rounded-[40px] p-6 sm:p-16 overflow-hidden flex flex-col justify-between min-h-[400px] sm:min-h-[450px]"
        style={{
          backgroundColor: '#1A1A1A',
          backgroundImage: 'radial-gradient(circle at 90% 50%, rgba(226, 255, 102, 0.15) 0%, transparent 50%)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <h2 className="text-[40px] sm:text-[54px] lg:text-[64px] font-black leading-[0.95] sm:leading-[0.9] tracking-tighter text-white uppercase">
            Never miss <br /> a step.
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
          <p className="text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed">
            Join the Kinetica Reserve. Get early access to local drops, exclusive invites to shop events, and member-only pricing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl w-full">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-[#252525] border border-transparent focus:border-[#E2FF66] rounded-full px-6 sm:px-8 py-4 sm:py-5 text-white outline-none transition-all placeholder:text-gray-600 text-sm"
            />
            <button className="w-full sm:w-auto bg-[#F7FFB0]/80 text-black font-black uppercase px-8 sm:px-10 py-4 sm:py-5 rounded-full text-xs sm:text-sm hover:bg-[#F7FFB0] transition-colors duration-300 whitespace-nowrap">
              Join Reserve
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};