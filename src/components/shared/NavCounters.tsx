"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

const NavbarBadges = () => {
    const { plan, saved } = useFitLog();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex items-center gap-3">
            {/* Plan */}
            <Link
                href="/my-plan"
                className="flex items-center gap-1.5"
            >
                <span className="text-sm font-oswald text-gray-400 tracking-wide">
                    Plan
                </span>

                <span className="min-w-7 h-7 px-2 flex items-center justify-center rounded-full bg-[#ccff00] text-black text-xs font-bold font-oswald">
                    {mounted ? plan.length : 0}
                </span>
            </Link>

            {/* Saved */}
            <Link
                href="/my-plan"
                className="flex items-center gap-1.5"
            >
                <span className="text-sm font-oswald text-gray-400 tracking-wide">
                    Saved
                </span>

                <span className="min-w-7 h-7 px-2 flex items-center justify-center rounded-full border border-gray-500 text-white text-xs font-bold font-oswald">
                    {mounted ? saved.length : 0}
                </span>
            </Link>
        </div>
    );
};

export default NavbarBadges;