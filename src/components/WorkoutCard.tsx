
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { IWorkout } from "@/types/workout";

interface WorkoutCardProps {
    workout: IWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="block group">
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200 border border-[#2a2a2a] hover:border-[#ccff00]/30">
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Category tags overlay */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        {workout.muscleGroups.map((group) => (
                            <span
                                key={group}
                                className="px-2 py-0.5 bg-[#ccff00] text-black text-[10px] font-bold font-oswald rounded uppercase tracking-wider"
                            >
                                {group}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                    <h3 className="font-bold text-white text-base uppercase tracking-wide mb-1 truncate">
                        {workout.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 truncate">{workout.equipment}</p>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                            {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                            {workout.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
                            {workout.rating}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WorkoutCard;
