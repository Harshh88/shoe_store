import Card from "@/component/Card";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SignUp({
    formData,
    handleChange,
    handleForm,
    loading
}) {
    const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAUw1IwI84bE1OYAABJWC6P_z544otOiLz8wWNOIO2j8xNme5P1RnC1SQN45gh89ieWjp6kD1EfxBU_2V25--mSgcnnA_emzNgDnqHvS-4L2vnYEeo__tMHEw9W5POUebsA3WjKi2vmocGVKKsozy5fZVI7elb98_zXGyhSafgspo2nwZ4rOGznOEr9jYphJOroS6SHD3vhOhMJB_vsRO1OQexEYvZeaCHeKkGjKouw-0OMLVTrOrkulJE_p_Awu96j5cpiqHRQk7k"
    return (
        <div className="h-[150vh] w-[100vw] flex justify-center">
            <div className="bg-black w-[50vw] h-[150vh] flex flex-col">
                <Card
                    variant="overlay"
                    size="fit"
                    height="h-[35%]"
                    shadow="md"
                    image={imageUrl}
                    scale="grayscale"
                >
                    <h1 className={` absolute right-[10rem] bottom-[1rem] text-[3.2rem] font-semibold italic `}>JOIN THE MOTION</h1>
                    <span className={`absolute text-[#D4D4D8] right-[9rem] bottom-[0.1rem] text-[1.15rem] tracking-wide leading-tight `}>Enter your details to create your flagship account</span>
                </Card>
                <form className="text-[#D4D4D8] flex flex-col items-center px-[2rem] py-[3rem]"
                onSubmit={handleForm}
                >
                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label
                            className="mb-[0.3rem]"
                            htmlFor="fullname">FULL NAME</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl"
                            type="text"
                            name="name"
                            id="fullname"
                            placeholder="Alan Walker"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label
                            className="mb-[0.3rem]"
                            htmlFor="email">EMAIL</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="alan123@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label
                            className="mb-[0.3rem]"
                            htmlFor="password">PASSWORD</label>
                        <input
                            className="bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="w-full flex flex-col pb-[1.5rem]">
                        <label
                            className="mb-[0.3rem]"
                            htmlFor="confirm-password">CONFIRM PASSWORD</label>
                        <input
                            className={`bg-[#1A1A1A] outline-none h-[4rem] p-[1rem] rounded-xl 
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
                        />
                    </div>
                    <button 
                    className="bg-[#B9D300] p-[1rem] w-full rounded-full text-black font-medium tracking-wide italic cursor-pointer"
                    type="submit"
                    disabled={loading}
                    >{loading ? "CREATING..." : "CREATE ACCOUNT"}</button>
                </form>
                <div className="text-white flex items-center  px-[2rem]">
                    <div className="flex-1 h-px bg-gray-600"></div>
                    <span className="px-[1rem] text-[#D4D4D8]">OR CONTINUE WITH</span>
                    <div className="flex-1 h-px bg-gray-600"></div>
                </div>
                <div className="px-[2rem] py-[3rem] text-white flex justify-between">
                    <div className="bg-[#2A2A2A] h-[4rem] rounded-xl w-[48%] flex items-center justify-center cursor-pointer">
                        <FcGoogle className="text-2xl" />
                        <Link
                         href={"?"}>GOOGLE</Link>
                    </div>
                    <div className="bg-[#2A2A2A] h-[4rem] rounded-xl w-[48%] flex items-center justify-center cursor-pointer">
                        <FaApple className="text-2xl text-white" />
                        <Link
                         href={"?"}>APPLE</Link>
                    </div>
                </div>
                <div className="px-[2rem] py-[2rem] text-gray-500 flex justify-center">
                    <span className="text-[#A1A1AA]">Already have an account?</span>
                    <Link
                    className="text-[#D4D4D8]"
                    href={"/login"} >Login</Link>
                </div>
            </div>
        </div>
    )
}