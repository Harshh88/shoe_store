"use client";

import React from 'react';
import Card from "@/component/Card";

export default function SellerLoginForm({
    handleChange,
    handleSubmit,
    formData,
    loading
}) {
    const image_url = "https://lh3.googleusercontent.com/aida-public/AB6AXuAEgD_RTqTb3E_oufEs0_x_-MaAQzhKObaMirHCp4pD68f4EnAqgBTn8ZxvATYY01BN6Yx1Jo7n8fpQdEpnznWgThBnaOYXzn3vVGuCv9VcN4veuhyBJgM1o5cQGmpu9HyM75l2FD-DocVRgkZ3c-uG_g9VqPEQ-Yu2YWmVr07ilzyeKmRhNt_6QsXwdFElvLX74Zcvwiz84roObVA3Za2rV7G9TgGXv2M7rE_XRXUj5rM06ABvAjtvFYVsoqQ2EUNmLxJHfeViVKg";

    return (
        <main className="min-h-screen lg:h-[120vh] w-full lg:w-[100vw] flex flex-col bg-[#0E0E0E] text-white selection:bg-[#F7FFB0] selection:text-black">
            <nav className="w-full px-[2rem] py-[0.5rem] bg-[#0E0E0E]">
                <div className="text-[#F7FFB0] text-[1.6rem] italic font-medium">KINETIC</div>
            </nav>
            
            <section className="w-[100%] h-48 sm:h-56 lg:h-[37%] relative overflow-hidden">
                <Card
                    image={image_url}
                    variant="overlay"
                    size="fit"
                    height="h-[100%]"
                    scale="emptyscale"
                >
                    <div className="px-[2rem]">
                        <span className="mt-[0.4rem] py-[0.5rem] px-[1rem] inline-block bg-[#F7FFB0] text-black rounded-full text-[0.7rem] letter-wide uppercase font-bold">
                            ENGINEERED FOR MOTION
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] mb-0 lg:mb-[-2rem] font-bold tracking-tight text-white">
                            Seller Login
                        </h1>
                    </div>
                </Card>
            </section>
            
            <section className="pt-8 lg:pt-[5rem] bg-[#0E0E0E] h-auto lg:h-[80%] w-[100%] flex flex-col items-center flex-1">
                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xl lg:max-w-none lg:w-[40%] text-[#D4D4D8] px-[2rem] py-[2rem]">
                    
                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label className="mb-[0.5rem] tracking-wide text-xs sm:text-sm font-mono text-zinc-500 font-bold uppercase" htmlFor="email">
                            EMAIL ADDRESS
                        </label>
                        <input
                            className="bg-[#1A1A1A] border border-zinc-900 focus:border-zinc-700 outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white transition-all"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@kinetic.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label className="mb-[0.5rem] tracking-wide text-xs sm:text-sm font-mono text-zinc-500 font-bold uppercase" htmlFor="password">
                            PASSWORD
                        </label>
                        <input
                            className="bg-[#1A1A1A] border border-zinc-900 focus:border-zinc-700 outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white transition-all"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <button 
                        className="shadow-[0_0_10px_rgba(247,255,176,0.6)] bg-[#B9D300] mt-[1rem] italic p-[1rem] w-full rounded-full text-black font-medium tracking-wide cursor-pointer transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "LOGGING INTERFACE..." : "Login"}
                    </button>
                </form>
            </section>
        </main>
    );
}