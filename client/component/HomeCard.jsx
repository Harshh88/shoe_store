import Logo from "./Logo"
import Label from "./Label"
import Discription from "./Discription"
import Button from "./Button"
import Image from "next/image"


export default function HomeCard() {
    return (
        <div className="my-[rem] w-[100vw] h-[55%] py-[3rem]  bg-[#0E0E0E] overflow-hidden relative">
            <div className=" w-[100%] ">
                <h1 className=" text-center text-[13rem] bg-transparent text-[#1A1A1A]/80 font-bold w-[100%] scale-x-170 overflow-hidden absolute right-[-7rem] bottom-[-5rem]">PERFORM</h1>
            </div>
            <div className="flex flex-row-reverse justify-between w-[100%] h-[100%] relative">
                <div className="h-[120%] w-[65%] overflow-hidden bg-black/15 relative flex -rotate-7 absolute top-[-2rem] right-[-3.5rem]">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHGqVHkRAq8s52WRal98EIy2nOtSuWO_wbSDukzCyf0Y_tPD6-8W0Lj-cfGb_OpG7ygKQLiPYFvolI18s5wwEJROAAMmGvqkV6rYHiRnJixqWB6tANcdEhKtiuCaaOWcZKHcjlma2GEu12ll0BXzcwMi26J8XtHS7kACZaFfav66UrNK4x3pp19_6QaWjXVrAjqY3R6i1LaAW8PtMyV8rwbfbgDy8qUunfKLniMSzYiLsSdumvlvjDph9GRGR8p-cuSXysyAFYeg4"
                        alt="The Origin - Systems of Genesis"
                        // width={600}
                        // height={600}
                        // priority
                        className="h-[110%] w-[100%] scale-105  object-cover absolute top-[-6.1rem] right-[0.5rem] -rotate-1 
                [mask-image:linear-gradient(to_bottom,transparent,black_100%,black_35%,transparent)]
  [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_50%,black_30%,transparent)]
                "
                    />

                    {/* <div className="absolute bottom-0 left-0 w-full h-[60%] 
                  bg-gradient-to-t from-[#0E0E0E] to-transparent">
                    </div> */}
                    <div className="absolute bottom-0 left-0 w-full h-[8rem] bg-gradient-to-t from-white/10 to-transparent"></div>

                </div>
                <div className="w-[35rem] pl-[2rem] pt-[5.5rem] relative">
                    <div className="">
                        <Label
                            className={"bg-[#414C00]/30 w-[12rem] rounded-full flex justify-center itmes-center  mb-[0.5rem] h-[1.8rem] px-auto py-[0.2rem] border-1 border-[#414C00] text-[#F7FFB0]"}
                        >LIMITED EDITION RELEASE</Label>
                    </div>
                    <div className="">
                        <Logo
                            className={"text-[6rem] font-bold "}
                            marginh1={"mb-[-3.2rem]"}
                            firstElColor={"text-white"}
                            secondElColor={"text-[#F7FFB0]"}
                            thirdElColor={"text-white"}
                            thirdEl={"V1"}
                            firstEl={"NEON"}
                            secondEl={"KINETIC"}
                            secondElPadd={"px-[0.5rem]"}
                        />
                    </div>
                    <div className="w-[100%] mb-[2rem] ">
                        <Discription>The intersection of algorithmic design and high-<br />performance cushioning. Engineered for the future of<br /> urban movement.</Discription>
                    </div>
                    <div className=" flex absolute gap-[1rem]">
                        <Button className="bg-[#F7FFB0]/80 px-[2rem] h-[4rem] w-[15rem] text-black font-semibold whitespace-nowrap cursor-pointer"
                        >EXPLORE THE DROP</Button>
                        <Button
                            className="h-[4rem] px-[2rem]  font-semibold w-[10rem] bg-[#1A1A1A]/70 border-2 border-[#1A1A1A] text-white cursor-pointer"
                        >VIEW SPECS</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}