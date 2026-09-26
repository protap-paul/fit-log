"use client";

import { useFitLog } from "@/context/FitLogContext";
import Image from "next/image";
import { CalendarPlus, Bookmark } from "lucide-react";
import { IWorkout } from "@/types/workout";
import { toast } from "react-toastify";

interface WorkoutDetailsProps {
    workout: IWorkout;
}

const specRows = [
    { label: "EQUIPMENT", key: "equipment" },
    { label: "DIFFICULTY", key: "difficulty" },
    { label: "SETS", key: "sets" },
    { label: "REPS", key: "reps" },
    { label: "DURATION", key: "duration", suffix: " min" },
    { label: "CALORIES", key: "caloriesBurned", suffix: " kcal" },
    { label: "RATING", key: "rating" },
];

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
    const { addToPlan, addToSaved, isInPlan, isInSaved } = useFitLog();

    const handleAddToPlan = () => {
        if (isInPlan(workout.id)) {
            toast.error("Already in today's plan!");
            return;
        }
        const success = addToPlan(workout);
        if (success) {
            toast.success("Added to today's plan! 💪");
        } else {
            toast.error("Plan is full! Max 5 lifts for today.");
        }
    };

    const handleSave = () => {
        if (isInSaved(workout.id)) {
            toast.error("Already saved!");
            return;
        }
        addToSaved(workout);
        toast.success("Saved for later! 🔖");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Image */}
                <div className="lg:w-[45%]">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 45vw"
                            priority
                        />
                    </div>
                </div>

                {/* Right: Details */}
                <div className="lg:w-[55%] space-y-6">
                    {/* Title */}
                    <h1 className="font-bold text-3xl sm:text-4xl text-white uppercase tracking-wide">
                        {workout.name}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-400 font-oswald leading-relaxed">
                        {workout.description}
                    </p>

                    {/* Category tags */}
                    <div className="flex flex-wrap gap-2">
                        {workout.muscleGroups.map((group) => (
                            <span
                                key={group}
                                className="px-3 py-1 bg-[#ccff00] text-black text-xs font-bold rounded uppercase tracking-wider"
                            >
                                {group}
                            </span>
                        ))}
                    </div>

                    {/* Specs Table */}
                    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a]">
                        {specRows.map(({ label, key, suffix }, i) => {
                            const val = workout[key as keyof IWorkout];
                            return (
                                <div
                                    key={label}
                                    className={`flex items-center justify-between px-5 py-3.5 ${i !== specRows.length - 1 ? "border-b border-[#2a2a2a]" : ""
                                        }`}
                                >
                                    <span className="text-xs text-gray-500 uppercase tracking-widest">
                                        {label}
                                    </span>
                                    <span className="text-white font-medium">
                                        {String(val)}{suffix ?? ""}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Instructions */}
                    <div>
                        <h2 className="font-bold text-white uppercase tracking-widest text-sm mb-4">
                            INSTRUCTIONS
                        </h2>
                        <ol className="space-y-3">
                            {workout.instructions.map((step, i) => (
                                <li key={i} className="flex gap-3 text-gray-400 font-oswald">
                                    <span className="text-[#ccff00] font-bold shrink-0">{i + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button
                            onClick={handleAddToPlan}
                            disabled={isInPlan(workout.id) || false}
                            className="flex items-center gap-2 px-6 py-3 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded hover:bg-[#b8e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CalendarPlus className="w-4 h-4" />
                            {isInPlan(workout.id) ? "In Today's Plan" : "Add to today's plan"}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isInSaved(workout.id)}
                            className="flex items-center gap-2 px-6 py-3 border border-white text-white font-bold uppercase tracking-wider rounded hover:border-[#ccff00] hover:text-[#ccff00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Bookmark className="w-4 h-4" />
                            {isInSaved(workout.id) ? "Saved" : "Save for later"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default WorkoutDetails;