"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";
import { Menu, X, LogOut, User as UserIcon } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NavBar({
    links = [],
    className,
    cartCount = 0
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggin, setIsLoggin] = useState(false);
    const [userImg, setUserImg] = useState(null); 
    const [userName, setUserName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggin(false);
        setUserImg(null);
        setUserName("");
        setIsDropdownOpen(false);
        router.push("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggin(true);
            
            const fetchUser = async () => {
                try {
                    const res = await api.post(`/user/get-profile`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserName(res.data.user.name);
                    const dbImg = res.data?.user?.url;
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
                    console.error("Error fetching profile image:", err);
                }
            };
            
            fetchUser();
        }
    }, []);

    return (
        <nav className={`${className} relative`}>
            <ul className="text-gray-500 hidden lg:flex justify-end items-center gap-6">
                {links.map((link) => (
                    <li key={link.label} className="relative group whitespace-nowrap">
                        <Link
                            href={link.href}
                            className="text-[16.5px] tracking-tight hover:text-[#F7FFB0] transition-all duration-300 ease-in-out"
                        >
                            {link.label}
                        </Link>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#F7FFB0] transition-all duration-300 group-hover:w-full"></span>
                    </li>
                ))}

                <li className="relative group whitespace-nowrap">
                    <Link href="/cart" className="relative cursor-pointer text-gray-400 hover:text-[#F7FFB0] transition-colors px-2 flex items-center">
                        <span className="absolute -top-1.5 -right-1.5 bg-[#F7FFB0] text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black shadow-md">
                            {cartCount}
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-all duration-300 group-hover:scale-105">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                    </Link>
                </li>

                <li>
                    <Link href="/shops/add">
                        <Button className="bg-transparent cursor-pointer border border-zinc-700 hover:border-[#D9FA53] text-zinc-300 hover:text-[#F7FFB0] text-xs font-mono font-bold tracking-widest px-4 h-[2.2rem] rounded-xl transition-all duration-300 uppercase whitespace-nowrap">
                            Add Shop
                        </Button>
                    </Link>
                </li>

                {isLoggin ? (
                    <li 
                        className="relative py-2"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-zinc-900 border border-zinc-800 hover:border-[#F7FFB0] transition-colors focus:outline-none cursor-pointer">
                            {userImg ? (
                                <img
                                    className="w-full h-full object-cover scale-110"
                                    src={userImg}
                                    alt="profile"
                                />
                            ) : (
                                <div className="h-10 w-10 bg-gray-700 animate-pulse rounded-full" />
                            )}
                        </button>

                        <div className={`absolute right-0 mt-2 w-48 bg-[#0E0E0E] border border-zinc-800 rounded-xl shadow-2xl transition-all duration-200 origin-top-right z-50 before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:content-[''] ${
                            isDropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}>
                            <div className="px-4 py-3 border-b border-zinc-900">
                                <p className="text-xs text-zinc-500 font-medium">Signed in as</p>
                                <p className="text-sm font-semibold text-zinc-200 truncate">{userName || "User"}</p>
                            </div>
                            
                            <div className="p-1.5">
                                <Link 
                                    href="/user" 
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-400 hover:text-[#F7FFB0] hover:bg-zinc-900/50 rounded-lg transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
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
                    </li>
                ) : (
                    <>
                        <li>
                            <Link href={"/login"}>
                                <Button className="bg-[#F7FFB0]/80 cursor-pointer px-[2rem] h-[2.2rem] text-black text-sm font-bold tracking-wide rounded-xl shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)] hover:bg-[#F7FFB0] hover:shadow-none active:translate-y-[1px] transition-all">
                                    Login
                                </Button>
                            </Link>
                        </li>

                        <li>
                            <Link href={"/signup"}>
                                <Button className="bg-[#F7FFB0]/80 cursor-pointer px-[2rem] h-[2.2rem] text-black text-sm font-bold tracking-wide rounded-xl shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)] hover:bg-[#F7FFB0] hover:shadow-none active:translate-y-[1px] transition-all">
                                    Signup
                                </Button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>

            <div className="flex lg:hidden justify-end items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-[#F7FFB0] focus:outline-none p-2 relative z-50 transition-transform active:scale-95"
                >
                    {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            <div className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMenuOpen(false)}>
                <div
                    className={`fixed top-0 right-0 h-full w-[70vw] max-w-[300px] bg-[#0E0E0E] border-l border-zinc-900 p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {isLoggin && (
                        <Link href={"/user"} className="h-10 w-full rounded-full" onClick={() => setIsMenuOpen(false)}>
                            <div className="w-full h-10 flex items-center relative">
                                <img src={userImg} alt="Profil-Pic" className="object-cover h-full w-10 rounded-full" />
                                <h1 className="text-white px-[1rem] text-xl font-semibold truncate">
                                    {userName}
                                </h1>
                            </div>
                        </Link>
                    )}
                    
                    <div className="flex flex-col gap-8 pt-12">
                        <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-white text-lg font-bold">
                            <span className="bg-[#F7FFB0] text-black text-xs font-black px-2.5 py-1 rounded-full shadow">
                                {cartCount} Items
                            </span>
                            <span>Cart Container</span>
                        </Link>
                        <div className="h-px bg-zinc-900 w-full" />
                        <ul className="flex flex-col gap-6 text-gray-400 text-lg font-semibold">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="hover:text-[#F7FFB0] transition-colors block py-1"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                        <Link href="/shops/add" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full bg-transparent border border-zinc-700 text-zinc-300 text-sm font-mono tracking-widest py-3 rounded-xl uppercase">
                                Add Shop
                            </Button>
                        </Link>
                        {isLoggin ? (
                            <button 
                                onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                                className="w-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold py-3 rounded-xl uppercase text-center block hover:bg-red-500/20 transition-colors cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full bg-[#F7FFB0]/80 text-black text-sm font-bold py-3 rounded-xl uppercase text-center block">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full bg-[#F7FFB0]/80 text-black text-sm font-bold py-3 rounded-xl uppercase text-center block">
                                        Signup
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
