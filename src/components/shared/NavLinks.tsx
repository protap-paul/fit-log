"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = () => {
    const pathname = usePathname();

    // active link logic

    return (
        <div>
            <ul className='flex items-center gap-1' >
                <li>
                    <Link
                        href={"/"}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider transition-all 
                            ${pathname === "/" ? "bg-[#ccff00] text-black font-bold" : "text-gray-400 hover:text-white"}
                            `} >
                        Workouts
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/my-plan"}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wider transition-all ${pathname === "/my-plan" ? "bg-[#ccff00] text-black font-bold" : "text-gray-400 hover:text-white"}`} >
                        My Plan
                    </Link>
                </li>
            </ul>
        </div>
    );
};