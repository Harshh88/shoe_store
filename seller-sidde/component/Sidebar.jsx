"use client"
import React, { useEffect, useState } from 'react';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Calendar, User, Settings, LogOut, User as UserIcon, ChevronUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from "@/lib/api";
import Link from 'next/link';

export default function Sidebar({ currentNav = "Dashboard", onNavChange = () => {}, isOpen, setIsOpen }) {
  const [userImg, setUserImg] = useState(null); 
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products', icon: ShoppingBag },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Bookings', icon: Calendar },
    { name: 'Shop Profile', icon: User },
    { name: 'Settings', icon: Settings }
  ];

  const handleNavClick = (name) => {
    onNavChange(name);
    setIsOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    setIsOpen(false);
    setIsDropdownOpen(false);
    router.push("/seller/login");
  };

  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) {
      const fetchSellerProfile = async () => {
        try {
          const res = await api.post(`/user/get-profile`, {}, {
            headers: { Authorization: `Bearer ${sellerToken}` }
          });
          
          const sellerData = res.data?.user || res.data?.seller;
          setUserName(sellerData?.name || "Seller");
          
          const dbImg = sellerData?.url || sellerData?.image;
          const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
          const defaultImg = "imagen_kq7cqt.png";
          
          let finalImg;
          if (dbImg) {
            finalImg = dbImg;
          } else {
            finalImg = `https://res.cloudinary.com/${cloudName}/image/upload/d_${defaultImg}/no_image.png`;
          }
          setUserImg(finalImg); 
        } catch (err) {
          console.error("Error fetching seller profile:", err);
        }
      };
      
      fetchSellerProfile();
    }
  }, []);

  return (
    <>
      {/* Backdrop for Mobile/Global overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Container */}
      {/* Yahan fixed layout aur width handling ko adjust kiya hai taaki component idhar udhar na bhage */}
      <aside className={`fixed top-0 left-0 h-screen bg-[#141414] border-r border-[#1F1F1F] flex flex-col justify-between z-40 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64 p-6 translate-x-0' : 'w-0 p-0 -translate-x-full border-none'
      }`}>
        
        {/* Wrap content inside an opacity div so it doesn't jank while closing */}
        <div className={`flex flex-col flex-1 overflow-y-auto no-scrollbar transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 pt-16">
            <span className="font-mono tracking-wider font-bold text-lg text-white">KINETIC_LABS</span>
          </div>

          {/* Profile Card for Mobile View */}
          <div className="block lg:hidden mb-6 border-b border-zinc-900 pb-4">
            <Link href="/user" onClick={() => setIsOpen(false)} className="flex items-center gap-3 bg-[#1A1A1A] p-3 rounded-xl border border-[#242424] active:scale-98 transition-transform">
              {userImg ? (
                <img src={userImg} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 bg-gray-700 animate-pulse rounded-full" />
              )}
              <div className="truncate flex-1">
                <h4 className="text-sm font-semibold text-white truncate">{userName || "Elite Merchant"}</h4>
                <p className="text-[10px] text-zinc-400 tracking-wider">TAP TO VIEW PROFILE</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const isActive = item.name === currentNav;
              return (
                <button 
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item.name)} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all text-sm font-medium ${
                    isActive 
                      ? 'bg-[#F7FFB0] text-black font-bold' 
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

        {/* Laptop/Desktop View Profile Wrapper */}
        <div 
          className={`hidden lg:block relative pt-4 border-t border-zinc-900 pb-2 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {/* Dropdown Menu */}
          <div className={`absolute bottom-full left-0 mb-3 w-full bg-[#0E0E0E] border border-zinc-800 rounded-xl shadow-2xl transition-all duration-200 origin-bottom z-50 before:absolute before:-bottom-4 before:left-0 before:w-full before:h-4 before:content-[''] ${
              isDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          }`}>
              <div className="px-4 py-3 border-b border-zinc-900">
                  <p className="text-xs text-zinc-500 font-medium">Signed in as Seller</p>
                  <p className="text-sm font-semibold text-zinc-200 truncate">{userName || "Merchant"}</p>
              </div>
              
              <div className="p-1.5">
                  <Link 
                      href="/user" 
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-400 hover:text-[#F7FFB0] hover:bg-zinc-900/50 rounded-lg transition-colors"
                  >
                      <UserIcon size={16} />
                      <span>My Profile</span>
                  </Link>
                  
                  <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors text-left cursor-pointer"
                  >
                      <LogOut size={16} />
                      <span>Logout</span>
                  </button>
              </div>
          </div>

          {/* Trigger Profile Trigger Button */}
          <button 
            type="button" 
            className="w-full flex items-center justify-between bg-[#1A1A1A] p-3 rounded-xl border border-[#242424] text-left hover:border-[#F7FFB0] transition-colors focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              {userImg ? (
                <img src={userImg} alt="Profile" className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 bg-gray-700 animate-pulse rounded-full" />
              )}
              <div className="truncate">
                <h4 className="text-sm font-semibold text-white truncate">{userName || "Merchant"}</h4>
                <p className="text-[10px] text-zinc-400 tracking-wider">VERIFIED PRO</p>
              </div>
            </div>
            <ChevronUp size={16} className={`text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile View Logout Option */}
        <div className={`block lg:hidden pt-4 border-t border-zinc-900 mt-auto transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <button 
              onClick={handleLogout}
              className="w-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold py-3 rounded-xl uppercase text-center block hover:bg-red-500/20 transition-colors cursor-pointer"
          >
              Logout
          </button>
        </div>

      </aside>
    </>
  );
}
