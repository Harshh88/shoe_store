export const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 sm:px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-zinc-900">
      <div className="md:mb-0">
        <h2 className="text-xl font-black text-gray-500 tracking-tighter italic uppercase">Kinetica</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-300">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Shipping</a>
        <a href="#" className="hover:text-white transition-colors">Locations</a>
      </div>

      <div className="text-[9px] sm:text-[10px] text-zinc-600 font-medium uppercase tracking-wider text-center md:text-right">
        © 2024 Kinetica Reserve. All Rights Reserved.
      </div>
    </footer>
  );
};