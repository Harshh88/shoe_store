"use client";
import React from "react";
import Logo from "./Logo";
import Label from "./Label";
import Discription from "./Discription";
import Button from "./Button";

export default function HomeCard() {
    return (
        <div className="my-[rem] w-[100vw] h-auto md:h-[44rem] py-[3rem] bg-[#0E0E0E] overflow-hidden relative">
            
            <div className="hidden md:block w-[100%]">
                <h1 className="text-center text-[13rem] bg-transparent text-[#1A1A1A]/80 font-bold w-[100%] scale-x-170 overflow-hidden absolute right-[-7rem] bottom-[-5rem]">
                    PERFORM
                </h1>
            </div>

            <div className="md:flex-row-reverse md:justify-between w-[100%] h-[100%] relative px-4 md:px-0 gap-8 md:gap-0">
                
                <div className="w-full max-w-[37rem] sm:max-w-[45rem] md:max-w-none md:w-[60rem] h-[28rem] sm:h-[40rem] md:h-[50rem] cursor-pointer group overflow-hidden bg-black/15 flex md:-rotate-7 relative md:absolute md:top-[-2rem] md:right-[-3.5rem] z-10">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHGqVHkRAq8s52WRal98EIy2nOtSuWO_wbSDukzCyf0Y_tPD6-8W0Lj-cfGb_OpG7ygKQLiPYFvolI18s5wwEJROAAMmGvqkV6rYHiRnJixqWB6tANcdEhKtiuCaaOWcZKHcjlma2GEu12ll0BXzcwMi26J8XtHS7kACZaFfav66UrNK4x3pp19_6QaWjXVrAjqY3R6i1LaAW8PtMyV8rwbfbgDy8qUunfKLniMSzYiLsSdumvlvjDph9GRGR8p-cuSXysyAFYeg4"
                        alt="The Origin - Systems of Genesis"
                        className="h-[100%] w-[100%] md:h-[55rem] object-cover object-[center_65%] md:object-center absolute top-0 md:top-[-6.1rem] right-0 md:right-[0.5rem] -rotate-1 
                        [mask-image:linear-gradient(to_bottom,transparent,black_100%,black_35%,transparent)]
                        [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_50%,black_30%,transparent)]
                        group-hover:scale-105 group-hover:-rotate-2 group-hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[8rem] bg-gradient-to-t from-white/10 to-transparent"></div>
                </div>

                <div className="w-full md:w-[35rem] pl-0 md:pl-[2rem] pt-4 md:pt-[5.5rem] relative z-20 flex flex-col items-center md:items-start text-center md:text-left">
                    <div>
                        <Label
                            className="bg-[#414C00]/30 w-[12rem] hover:text-[#F7FFB0] cursor-pointer rounded-full flex justify-center items-center mb-[0.5rem] h-[1.8rem] px-auto py-[0.2rem] border-1 border-[#414C00] text-[#F7FFB0]/80"
                        >
                            LIMITED EDITION RELEASE
                        </Label>
                    </div>
                    
                    <div className="w-full flex justify-center lg:justify-start overflow-visible my-2 lg:my-0 scale-90 sm:scale-100 origin-center md:origin-left">
                        <Logo
                            className="text-[4rem] sm:text-[5rem] md:text-[6rem] font-bold"
                            marginh1="mb-[-2rem] lg:mb-[-3.2rem]"
                            firstElColor="text-white cursor-pointer"
                            secondElColor="text-[#F7FFB0]/80 hover:text-[#F7FFB0] cursor-pointer"
                            thirdElColor="text-white cursor-pointer"
                            thirdEl="V1"
                            firstEl="NEON"
                            secondEl="KINETIC"
                            secondElPadd="px-[0.5rem]"
                        />
                    </div>
                    
                    <div className="w-[100%] mb-[2rem] mt-4 md:mt-0 px-2 md:px-0">
                        <Discription>
                            The intersection of algorithmic design and high-<br className="hidden md:block"/>performance cushioning. Engineered for the future of<br className="hidden md:block"/> urban movement.
                        </Discription>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row md:absolute gap-[1rem] w-full sm:w-auto px-4 sm:px-0 bottom-[-6rem] left-0 md:left-[2rem] items-center justify-center">
                        <Button className="bg-[#F7FFB0]/80 px-[2rem] hover:bg-[#F7FFB0] hover:shadow-none h-[4rem] w-full sm:w-[15rem] text-black font-semibold whitespace-nowrap cursor-pointer rounded-xl md:rounded-none text-sm uppercase transition-colors"
                        >
                            EXPLORE THE DROP
                        </Button>
                        <Button
                            className="h-[4rem] px-[2rem] hover:bg-[#1A1A1A] font-semibold w-full sm:w-[10rem] bg-[#1A1A1A]/70 border-2 border-[#1A1A1A] text-white cursor-pointer rounded-xl md:rounded-none text-sm uppercase transition-colors"
                        >
                            VIEW SPECS
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}