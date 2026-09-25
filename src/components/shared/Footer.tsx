import Image from "next/image";
import logoImg from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Image src={logoImg} alt="FitLog Logo" width={24} height={24} className="object-contain" />
                    <span className="font-oswald font-bold text-lg tracking-widest text-white uppercase">
                        FitLog
                    </span>
                </div>

                {/* Right: Copyright */}
                <p className="text-gray-500 text-sm font-oswald">
                    © 2026 FitLog — Workout Library. Train hard, log honest.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
