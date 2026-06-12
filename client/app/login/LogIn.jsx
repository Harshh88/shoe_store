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
        <main className="min-h-screen lg:h-[120vh] w-full lg:w-[100vw] flex flex-col bg-[#0E0E0E]">
            <nav className="w-full px-[2rem] py-[0.5rem] bg-[#0E0E0E]">
                <div className="text-[#F7FFB0] text-[1.6rem] italic font-medium">KINETIC</div>
            </nav>
            
            <section className="w-[100%] h-48 sm:h-56 lg:h-[37%]">
                <Card
                    image={image_url}
                    variant="overlay"
                    size="fit"
                    height="h-[100%]"
                    scale="emptyscale"
                >
                    <div className="px-[2rem]">
                        <span className="mt-[0.4rem] py-[0.5rem] px-[1rem] inline-block bg-[#F7FFB0] text-black rounded-full text-[0.7rem] letter-wide">ENGINEERED FOR MOTION</span>
                        <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] mb-0 lg:mb-[-2rem] font-bold tracking-tight text-white">Welcome Back</h1>
                    </div>
                </Card>
            </section>
            
            <section className="pt-8 lg:pt-[5rem] bg-[#0E0E0E] h-auto lg:h-[80%] w-[100%] flex flex-col items-center flex-1">
                <form onSubmit={handleForm} className="flex flex-col w-full max-w-xl lg:max-w-none lg:w-[40%] text-[#D4D4D8] px-[2rem] py-[2rem]">
                   <div className="w-full flex flex-col pb-[1.5rem]">
                        <label className="mb-[0.5rem] tracking-wide" htmlFor="email">EMAIL ADDRESS</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white"
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
                        <label className="mb-[0.5rem] tracking-wide" htmlFor="password">PASSWORD</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white"
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
                        className="shadow-[0_0_10px_rgba(247,255,176,0.6)] bg-[#B9D300] mt-[1rem] border-2 border-dashed border-blue-400 italic p-[1rem] w-full rounded-full text-black font-medium tracking-wide cursor-pointer transition-all active:scale-[0.98]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "logging..." : "Login"}
                    </button>
                </form>
                
                <footer className="px-[2rem] py-[2rem] text-gray-500 flex justify-center gap-1.5 text-xs sm:text-sm mt-auto">
                    <span className="text-[#A1A1AA]">{"Don't have an account?"}</span>
                    <Link className="text-[#D4D4D8] hover:text-[#F7FFB0] transition-colors" href={"/signup"}>Create one</Link>
                </footer>
            </section>
        </main>
    )
}