import { IWorkout } from "@/types/workout";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, Eye, CheckCircle, X } from "lucide-react";

interface PlanCardProps {
    workout: IWorkout;
    onRemove: (id: number) => void;
    onMarkDone: (id: number) => void;
}

const PlanCard = ({ workout, onRemove, onMarkDone }: PlanCardProps) => {
    return (
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] flex items-center gap-4 p-4">
            {/* Thumbnail */}
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white uppercase tracking-wide truncate">
                    {workout.name}
                </h3>
                <p className="text-gray-400 text-sm mb-2 truncate">{workout.equipment}</p>
                <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#ccff00]" />
                        {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#ccff00]" />
                        {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#ccff00] fill-[#ccff00]" />
                        {workout.rating}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
                <Link
                    href={`/workout/${workout.id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white border border-[#444] rounded-lg hover:border-[#ccff00] transition-colors"
                >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                </Link>
                <button
                    onClick={() => onMarkDone(workout.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black bg-[#ccff00] rounded-lg hover:bg-[#b8e600] transition-colors"
                >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Done
                </button>
                <button
                    onClick={() => onRemove(workout.id)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 border border-[#444] rounded-lg hover:border-red-500 hover:text-red-400 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PlanCard;
