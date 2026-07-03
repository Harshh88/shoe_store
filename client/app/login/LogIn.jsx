"use client";

import React from "react";
import Card from "@/component/Card";
import Link from "next/link";

export default function LogIn({
    handleChange,
    handleForm,
    formData,
    loading
}){
    const image_url = "https://lh3.googleusercontent.com/aida-public/AB6AXuAEgD_RTqTb3E_oufEs0_x_-MaAQzhKObaMirHCp4pD68f4EnAqgBTn8ZxvATYY01BN6Yx1Jo7n8fpQdEpnznWgThBnaOYXzn3vVGuCv9VcN4veuhyBJgM1o5cQGmpu9HyM75l2FD-DocVRgkZ3c-uG_g9VqPEQ-Yu2YWmVr07ilzyeKmRhNt_6QsXwdFElvLX74Zcvwiz84roObVA3Za2rV7G9TgGXv2M7rE_XRXUj5rM06ABvAjtvFYVsoqQ2EUNmLxJHfeViVKg";
    
    return (
        <main className="min-h-screen w-full flex flex-col bg-[#0E0E0E] text-[#D4D4D8] selection:bg-[#F7FFB0] selection:text-black">
            {/* Navbar */}
            <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-[#F7FFB0] text-xl sm:text-2xl italic font-bold tracking-wider select-none">
                    KINETIC
                </div>
            </nav>
            
            {/* Top Header Card Section */}
            <section className="w-full h-[25vh] sm:h-[30vh] md:h-[35vh] min-h-[180px] max-h-[320px]">
                <Card
                    image={image_url}
                    variant="overlay"
                    size="fit"
                    height="h-full"
                    scale="emptyscale"
                >
                    <div className="h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start gap-2">
                        <span className="py-1 px-3 bg-[#F7FFB0] text-black rounded-full text-[0.65rem] sm:text-xs font-semibold tracking-widest uppercase shadow-sm">
                            Engineered for Motion
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
                            Welcome Back
                        </h1>
                    </div>
                </Card>
            </section>
            
            {/* Form Section */}
            <section className="flex-1 w-full max-w-xl mx-auto px-6 py-12 flex flex-col justify-between items-center">
                <form 
                    onSubmit={handleForm} 
                    className="w-full flex flex-col gap-6"
                >
                    {/* Email Input */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#F7FFB0] focus:ring-1 focus:ring-[#F7FFB0] outline-none h-12 sm:h-14 px-4 rounded-xl font-mono text-sm text-white transition-all placeholder:text-gray-600"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@kinetic.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-xs font-semibold tracking-wider text-[#A1A1AA] uppercase" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] focus:border-[#F7FFB0] focus:ring-1 focus:ring-[#F7FFB0] outline-none h-12 sm:h-14 px-4 rounded-xl font-mono text-sm text-white transition-all placeholder:text-gray-600"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        className="w-full h-12 sm:h-14 bg-[#B9D300] hover:bg-[#cbe600] text-black font-bold uppercase tracking-wider text-sm rounded-xl mt-4 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_20px_rgba(185,211,0,0.25)] flex items-center justify-center gap-2"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Logging in...</span>
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>
                
                {/* Footer Link */}
                <footer className="w-full text-center py-8 flex justify-center items-center gap-2 text-sm">
                    <span className="text-[#A1A1AA]">Don't have an account?</span>
                    <Link className="text-white hover:text-[#F7FFB0] font-medium underline underline-offset-4 transition-colors" href="/signup">
                        Create one
                    </Link>
                </footer>
            </section>
        </main>
    );
}
