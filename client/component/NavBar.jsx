import Link from "next/link";
import Button from "./Button";

export default function NavBar({
    links = [],
    className
}) {
    return (
        <nav className={`${className} w-full`}>
            <ul className="text-gray-500 flex justify-end items-center gap-6">
                {links.map((link) => (
                    <li key={link.label} className="relative group whitespace-nowrap">
                        <Link 
                            href={link.href} 
                            className="text-[16.5px] tracking-tight hover:text-[#F7FFB0] transition-all duration-300 ease-in-out"
                        >
                            {link.label}
                        </Link>
                        {/* Subtle underline indicator */}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#F7FFB0] transition-all duration-300 group-hover:w-full"></span>
                    </li>
                ))}
                
                {/* DYNAMIC ADD SHOP TRIGGER BUTTON */}
                <li>
                    <Link href="/shops/add">
                        <Button
                            className="bg-transparent border border-zinc-700 hover:border-[#D9FA53] text-zinc-300 hover:text-[#D9FA53] text-xs font-mono font-bold tracking-widest px-4 h-[2.2rem] rounded-xl transition-all duration-300 uppercase whitespace-nowrap"
                        >
                            Add Shop
                        </Button>
                    </Link>
                </li>
                
                <li>
                    <Button
                        className="bg-[#F7FFB0]/80 px-[2rem] h-[2.2rem] text-black text-sm font-bold tracking-wide rounded-xl shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)] hover:bg-[#F7FFB0] hover:shadow-none active:translate-y-[1px] transition-all"
                    >
                        Login
                    </Button>
                </li>
            </ul>
        </nav>
    );
}