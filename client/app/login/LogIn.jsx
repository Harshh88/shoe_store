import Card from "@/component/Card"
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";

export default function LogIn({
    handleChange,
    handleForm,
    formData,
    loading
}){
    const image_url = "https://lh3.googleusercontent.com/aida-public/AB6AXuAEgD_RTqTb3E_oufEs0_x_-MaAQzhKObaMirHCp4pD68f4EnAqgBTn8ZxvATYY01BN6Yx1Jo7n8fpQdEpnznWgThBnaOYXzn3vVGuCv9VcN4veuhyBJgM1o5cQGmpu9HyM75l2FD-DocVRgkZ3c-uG_g9VqPEQ-Yu2YWmVr07ilzyeKmRhNt_6QsXwdFElvLX74Zcvwiz84roObVA3Za2rV7G9TgGXv2M7rE_XRXUj5rM06ABvAjtvFYVsoqQ2EUNmLxJHfeViVKg";
    return (
        <main className=" h-[120vh] w-[100vw]">
            <nav className="w-full px-[2rem] py-[0.5rem]">
                <div className="text-[#F7FFB0] text-[1.6rem] italic font-medium">KINETIC</div>
            </nav>
            <section className="w-[100%] h-[37%] ">
                <Card
                image={image_url}
                variant="overlay"
                size="fit"
                height="h-[100%]"
                scale="emptyscale"
                >
                <div className="px-[2rem]">
                    <span className="mt-[0.4rem] py-[0.5rem] px-[1rem] inline-block bg-[#F7FFB0] text-black rounded-full text-[0.7rem] letter-wide ">ENGINEERED FOR MOTION</span>
                    <h1 className="text-[3.2rem] mb-[-2rem] font-bold tracking-tight">Welcome Back</h1>
                </div>
                </Card>
            </section>
            <section className="pt-[5rem] bg-[#0E0E0E] h-[80%] w-[100%] flex flex-col items-center">
                <form onSubmit={handleForm} className="flex flex-col w-[40%] text-[#D4D4D8] px-[2rem] py-[2rem]">
                   <div className="w-full flex flex-col pb-[1.5rem]">
                        <label
                            className="mb-[0.5rem] tracking-wide"
                            htmlFor="email">EMAIL ADDRESS</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@kinetic.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                   <div className="w-full flex flex-col pb-[1.5rem]">
                        <label
                            className="mb-[0.5rem] tracking-wide"
                            htmlFor="password">PASSWORD</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button 
                    className="shadow-[0_0_10px_rgba(247,255,176,0.6)] bg-[#B9D300] mt-[1rem] border-2 border-dashed border-blue-400 italic p-[1rem]  w-full rounded-full text-black font-medium tracking-wide cursor-pointer"
                    type="submit"
                    disabled={loading}
                    >{loading ? "logging..." : "Login"}</button>
                </form>
                <div className="text-white flex items-center w-[40%] px-[2rem]">
                    <div className="flex-1 h-px bg-gray-600/30 "></div>
                    <span className="px-[1rem] text-[#D4D4D8]/30">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-gray-600/30"></div>
                </div>
                <div className="px-[2rem] py-[3rem] w-[40%] text-white flex justify-between">
                    <div className="bg-[#2A2A2A] h-[4rem] rounded-xl w-[48%] flex items-center justify-center cursor-pointer">
                        <FcGoogle className="text-2xl" />
                        <button
                         href={"?"}>GOOGLE</button>
                    </div>
                    <div className="bg-[#2A2A2A] h-[4rem] rounded-xl w-[48%] flex items-center justify-center cursor-pointer">
                        <FaApple className="text-2xl text-white" />
                        <button
                         href={"?"}>APPLE</button>
                    </div>
                </div>
                <footer className="px-[2rem] py-[2rem] text-gray-500 flex justify-center">
                    <span className="text-[#A1A1AA]">{"Don't have an account?"}</span>
                    <Link
                    className="text-[#D4D4D8]"
                    href={"/signup"} >Create one</Link>
                </footer>
            </section>
        </main>
    )
}