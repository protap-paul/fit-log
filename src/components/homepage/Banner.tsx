import Image from "next/image";
import { ChevronRight } from "lucide-react";
import bannerImage from "@/assets/banner.png";
import Link from "next/link";

const Banner = () => {
    return (
        <section className="bg-[#111] py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-10">

                    {/* Left content */}
                    <div className="flex-1 space-y-6">
                        <p className="text-[#ccff00] text-sm font-bold tracking-[0.2em] uppercase">
                            Workout Library
                        </p>
                        <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-tight">
                            Train With Intent.{" "}
                            <span className="block">Log Every Set.</span>
                        </h1>
                        <p className="text-gray-400 text-base max-w-md leading-relaxed">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                            into today&apos;s plan, and watch the week&apos;s work add up.
                        </p>
                        <Link
                            href="#library"
                            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm uppercase tracking-wider px-6 py-3 rounded hover:bg-[#b8e600] transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                            Browse Workouts
                        </Link>
                    </div>

                    {/* Right image */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <Image
                            src={bannerImage}
                            alt="FitLog Hero"
                            width={420}
                            height={420}
                            className="object-contain max-h-95"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
