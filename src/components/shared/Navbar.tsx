import Image from 'next/image';
import Link from 'next/link';
import logoImg from "@/assets/logo.png"
import { NavLinks } from './NavLinks';
import NavCounters from './NavCounters';

const Navbar = () => {

    return (
        <nav
            className='w-full bg-[#111] border-b border-[#222] sticky top-0 z-50' >
            <div
                className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between' >

                {/* Logo */}
                <Link href={"/"}
                    className='flex items-center gap-2 shrink-0 ' >
                    <Image
                        src={logoImg}
                        alt='FitLog Logo'
                        width={28}
                        height={28}
                        className='object-contain' />
                    <span
                        className='font-bold text-xl tracking-widest text-white uppercase' >
                        FitLog
                    </span>
                </Link>

                {/* Nav Links */}
                <NavLinks />

                {/* Badges */}
                <NavCounters />

            </div>
        </nav>
    );
};

export default Navbar;