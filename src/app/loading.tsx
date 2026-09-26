import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-12 h-12 text-[#ccff00] animate-spin" />
            <p className="font-oswald text-gray-400 text-lg uppercase tracking-widest">
                Loading workouts…
            </p>
        </div>
    );
};

export default Loading;