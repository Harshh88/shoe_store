"use client"
import React from 'react';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Calendar, User, Settings, Menu } from 'lucide-react';

export default function Sidebar({ currentNav = "Dashboard", onNavChange=()=>{} }) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products', icon: ShoppingBag },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Bookings', icon: Calendar },
    { name: 'Shop Profile', icon: User },
    { name: 'Settings', icon: Settings }
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#141414] border-r border-[#1F1F1F] p-6 flex flex-col justify-between hidden lg:flex shrink-0 z-50">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <Menu className="w-5 h-5 text-[#E2F952]" />
          <span className="font-mono tracking-wider font-bold text-lg text-white">KINETIC_LABS</span>
        </div>

        <div className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded-xl mb-8 border border-[#242424]">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-xl">
            👨‍💼
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">Elite Merchant</h4>
            <p className="text-[10px] text-zinc-400 tracking-wider">VERIFIED • PRO LEVEL</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = item.name === currentNav;
            return (
              <button 
                key={item.name}
                type="button"
                onClick={() => onNavChange(item.name)} 
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all text-sm font-medium ${
                  isActive 
                    ? 'bg-[#EBFFA2] text-black font-bold' 
                    : 'text-zinc-400 hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}