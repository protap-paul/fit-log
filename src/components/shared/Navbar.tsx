'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import logoImg from "@/assets/logo.png"
import { NavLinks } from './NavLinks';
import NavCounters from './NavCounters';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='w-full bg-[#111] border-b border-[#222] sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2'>

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 shrink-0"
                >
                    <Image
                        src={logoImg}
                        alt="FitLog Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                    />

                    <span className="font-bold text-xl tracking-widest text-white uppercase">
                        FitLog
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className='hidden md:flex items-center gap-6'>
                    <NavLinks />
                </div>

                {/* Right side: Counters (always visible) + Hamburger (mobile) */}
                <div className='flex items-center gap-3 shrink-0'>
                    <NavCounters />

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='md:hidden text-white p-1'
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown - only nav links */}
            {isOpen && (
                <div className='md:hidden bg-[#111] border-t border-[#222] px-4 py-4 flex flex-col gap-4'>
                    <NavLinks />
                </div>
            )}
        </nav>
    );
};

export default Navbar;