import Link from "next/link";
import Button from "./Button";

export default function NavBar({
    links = [],
    className
}) {
    return (
       <nav className={`${className}`}>
    <ul className="text-gray-500 flex justify-between items-center">
        {links.map((link) => (
            <li key={link.label} className="relative group">
                <Link 
                    href={link.href} 
                    className="text-[16.5px] tracking-tight hover:text-[#F7FFB0]/140 transition-all duration-300 ease-in-out"
                >
                    {link.label}
                </Link>
                {/* Subtle underline indicator */}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
        ))}
        
        <Button
            className="bg-[#F7FFB0]/80 px-[2rem] h-[2rem] w-[5rem] text-black text-sm font-bold tracking-wide rounded-md shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)] hover:bg-[#F7FFB0] hover:shadow-none active:translate-y-[1px] transition-all"
        >
            Login
        </Button>
    </ul>
</nav>
    )
}