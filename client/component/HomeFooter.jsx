export const Footer = () => {
  return (
    <footer className="bg-black text-white px-10 py-8 flex flex-col md:flex-row justify-between items-center border-t border-zinc-900">
      {/* Brand Logo */}
      <div className="mb-8 md:mb-0">
        <h2 className="text-xl font-black text-gray-500 tracking-tighter italic uppercase">Kinetica</h2>
      </div>

      {/* Nav Links */}
      <div className="flex gap-10 text-[13px] font-bold uppercase tracking-[0.2em] text-gray-300">
        <a href="#" className="hover:text-white transition">Privacy</a>
        <a href="#" className="hover:text-white transition">Terms</a>
        <a href="#" className="hover:text-white transition">Shipping</a>
        <a href="#" className="hover:text-white transition">Locations</a>
      </div>

      {/* Copyright */}
      <div className="mt-8 md:mt-0 text-[10px] text-zinc-600 font-medium uppercase tracking-wider">
        © 2024 Kinetica Reserve. All Rights Reserved.
      </div>
    </footer>
  );
};