import { ArrowLeft, Dumbbell } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] text-center px-4 gap-6">
            <Dumbbell className="w-20 h-20 text-[#ccff00]" />
            <h1 className="font-bold text-8xl text-white">404</h1>
            <h2 className="font-bold text-2xl text-white uppercase tracking-wide">
                Page Not Found
            </h2>
            <p className="text-gray-400 max-w-md">
                Looks like you wandered off the training floor. This page doesn&apos;t
                exist.
            </p>
            <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded hover:bg-[#b8e600] transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to workouts
            </Link>
        </div>
    );
};

export default NotFound;