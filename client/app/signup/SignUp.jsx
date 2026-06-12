"use client";

import React from "react";
import Card from "@/component/Card";
import Link from "next/link";

export default function SignUp({
    formData,
    handleChange,
    handleForm,
    loading,
    showPrompt,
    onPromptChoice
}) {
    const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAUw1IwI84bE1OYAABJWC6P_z544otOiLz8wWNOIO2j8xNme5P1RnC1SQN45gh89ieWjp6kD1EfxBU_2V25--mSgcnnA_emzNgDnqHvS-4L2vnYEeo__tMHEw9W5POUebsA3WjKi2vmocGVKKsozy5fZVI7elb98_zXGyhSafgspo2nwZ4rOGznOEr9jYphJOroS6SHD3vhOhMJB_vsRO1OQexEYvZeaCHeKkGjKouw-0OMLVTrOrkulJE_p_Awu96j5cpiqHRQk7k";

    return (
        <div className="min-h-screen lg:h-[150vh] w-full lg:w-[100vw] flex justify-center items-start lg:items-stretch p-4 sm:p-6 lg:p-0 relative selection:bg-[#B9D300] selection:text-black">
            <div className="bg-black w-full max-w-xl lg:max-w-none lg:w-[50vw] min-h-fit lg:h-[150vh] flex flex-col rounded-[2rem] lg:rounded-none overflow-hidden border border-zinc-900 lg:border-none shadow-2xl lg:shadow-none">
                
                <Card
                    variant="overlay"
                    size="fit"
                    height="h-40 sm:h-48 md:h-52 lg:h-[35%]"
                    shadow="md"
                    image={imageUrl}
                    scale="grayscale"
                >
                    <h1 className="absolute right-4 sm:right-8 lg:right-[10rem] bottom-10 sm:bottom-12 lg:bottom-[1rem] text-2xl sm:text-3xl lg:text-[3.2rem] font-semibold italic text-white leading-none">
                        JOIN THE MOTION
                    </h1>
                    <span className="absolute text-[#D4D4D8] right-4 sm:right-8 lg:right-[9rem] bottom-4 sm:bottom-5 lg:bottom-[0.1rem] text-xs sm:text-sm lg:text-[1.15rem] tracking-wide leading-tight text-right max-w-xs sm:max-w-sm lg:max-w-none">
                        Enter your details to create your flagship account
                    </span>
                </Card>

                <form className="text-[#D4D4D8] flex flex-col items-center px-4 sm:px-8 lg:px-[2rem] py-6 sm:py-8 lg:py-[3rem]" onSubmit={handleForm}>
                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label className="mb-[0.3rem]" htmlFor="fullname">FULL NAME</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white"
                            type="text"
                            name="name"
                            id="fullname"
                            placeholder="Alan Walker"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label className="mb-[0.3rem]" htmlFor="email">EMAIL</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="alan123@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label className="mb-[0.3rem]" htmlFor="password">PASSWORD</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label className="mb-[0.3rem]" htmlFor="confirm-password">CONFIRM PASSWORD</label>
                        <input
                            className={`bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl font-mono text-xs sm:text-sm text-white transition-all 
                                ${formData.password !== formData.confirm_password && formData.confirm_password 
                                  ? "border border-red-500"
                                  : ""
                                }`}
                            type="password"
                            name="confirm_password"
                            id="confirm-password"
                            placeholder="confirm your password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button 
                        className="bg-[#B9D300] p-[1rem] w-full rounded-full text-black font-medium tracking-wide italic cursor-pointer transition-all active:scale-[0.98]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "CREATING..." : "CREATE ACCOUNT"}
                    </button>
                </form>

                <div className="px-4 sm:px-8 lg:px-[2rem] py-4 sm:py-6 lg:py-[2rem] text-gray-500 flex justify-center gap-1.5 text-xs sm:text-sm mt-auto">
                    <span className="text-[#A1A1AA]">Already have an account?</span>
                    <Link className="text-[#D4D4D8] hover:text-[#B9D300] transition-colors" href={"/login"}>Login</Link>
                </div>
            </div>

            {showPrompt && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-[#090909] border border-zinc-800 rounded-[2rem] p-6 sm:p-8 text-center flex flex-col items-center shadow-2xl">
                        <div className="w-12 h-12 rounded-full bg-[#B9D300]/10 flex items-center justify-center mb-4 border border-[#B9D300]/20">
                            <span className="text-[#B9D300] text-xl">🚀</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase mb-2">
                            ACCOUNT INITIALIZED
                        </h2>
                        <p className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wide leading-relaxed mb-6 max-w-xs">
                            Would you like to establish your retail brand identity within the Kinetic Ecosystem now?
                        </p>
                        
                        <div className="w-full flex flex-col sm:flex-row gap-3">
                            <button
                                type="button"
                                onClick={() => onPromptChoice(false)}
                                className="w-full order-2 sm:order-1 bg-[#141414] hover:bg-zinc-800 border border-zinc-800 text-zinc-400 font-mono text-[11px] sm:text-xs font-black tracking-widest h-12 rounded-xl transition-all uppercase cursor-pointer"
                            >
                                Maybe Later
                            </button>
                            <button
                                type="button"
                                onClick={() => onPromptChoice(true)}
                                className="w-full order-1 sm:order-2 bg-[#B9D300] hover:bg-[#F7FFB0] text-black font-mono text-[11px] sm:text-xs font-black tracking-widest h-12 rounded-xl transition-all shadow-md active:scale-[0.98] uppercase cursor-pointer"
                            >
                                Register Shop
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}