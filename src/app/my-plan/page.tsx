"use client";

import { useState, useMemo } from "react";
import { useFitLog } from "@/context/FitLogContext";
import PlanCard from "@/components/PlanCard";
import Link from "next/link";
import { Dumbbell, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { IWorkout } from "@/types/workout";

type SortKey = "duration" | "caloriesBurned" | "rating";
type Tab = "plan" | "saved";

const sortOptions: { label: string; value: SortKey }[] = [
    { label: "Duration", value: "duration" },
    { label: "Calories", value: "caloriesBurned" },
    { label: "Rating", value: "rating" },
];

const MyPlanPage = () => {
    const { plan, saved, removeFromPlan, removeFromSaved } = useFitLog();
    const [activeTab, setActiveTab] = useState<Tab>("plan");
    const [sortBy, setSortBy] = useState<SortKey>("duration");
    const [sortOpen, setSortOpen] = useState(false);

    const handleMarkDone = (id: number) => {
        removeFromPlan(id);
        toast.success("Marked as done! 🎉");
    };

    const handleRemoveFromPlan = (id: number) => {
        removeFromPlan(id);
        toast.success("Removed from plan.");
    };

    const handleRemoveFromSaved = (id: number) => {
        removeFromSaved(id);
        toast.success("Removed from saved.");
    };

    const currentList: IWorkout[] = activeTab === "plan" ? plan : saved;

    const sortedList = useMemo(() => {
        return [...currentList].sort((a, b) => {
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "caloriesBurned") return b.caloriesBurned - a.caloriesBurned;
            return b.duration - a.duration;
        });
    }, [currentList, sortBy]);

    const totalExercises = plan.length;
    const totalMinutes = plan.reduce((acc, w) => acc + w.duration, 0);
    const totalCalories = plan.reduce((acc, w) => acc + w.caloriesBurned, 0);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-bold text-4xl text-white uppercase tracking-wide">
                    MY PLAN
                </h1>
                <p className="text-gray-400 mt-1">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* Metrics Summary */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 mb-8">
                <div className="grid grid-cols-3 divide-x divide-[#2a2a2a]">
                    <div className="text-center px-4">
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">
                            Exercises
                        </p>
                        <p className="font-bold text-4xl text-[#ccff00]">
                            {totalExercises}
                        </p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">
                            Minutes
                        </p>
                        <p className="font-bold text-4xl text-white">
                            {totalMinutes}
                        </p>
                    </div>
                    <div className="text-center px-4">
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">
                            Calories
                        </p>
                        <p className="font-bold text-4xl text-white">
                            {totalCalories}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs + Sort Row */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex bg-[#1a1a1a] rounded-full p-1 border border-[#2a2a2a]">
                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`px-5 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all ${activeTab === "plan"
                            ? "bg-[#ccff00] text-black"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`px-5 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all ${activeTab === "saved"
                            ? "bg-[#ccff00] text-black"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        Saved
                    </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setSortOpen(!sortOpen)}
                        className="flex items-center gap-2 px-4 py-2 border border-[#2a2a2a] rounded-lg text-sm text-white hover:border-[#ccff00] transition-colors"
                    >
                        Sort By{" "}
                        <span className="text-[#ccff00]">
                            {sortOptions.find((o) => o.value === sortBy)?.label}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {sortOpen && (
                        <div className="absolute right-0 top-full mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg z-10 min-w-35 overflow-hidden">
                            {sortOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => {
                                        setSortBy(opt.value);
                                        setSortOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#2a2a2a] transition-colors ${sortBy === opt.value ? "text-[#ccff00]" : "text-white"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Workout List */}
            {sortedList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] gap-4">
                    <Dumbbell className="w-10 h-10 text-gray-600" />
                    <h3 className="font-bold text-white text-2xl uppercase tracking-wide">
                        NOTHING HERE YET
                    </h3>
                    <p className="text-gray-500 text-center max-w-sm">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <Link
                        href="/"
                        className="mt-2 px-6 py-2.5 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded-full hover:bg-[#b8e600] transition-colors"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {sortedList.map((workout) => (
                        <PlanCard
                            key={workout.id}
                            workout={workout}
                            onRemove={activeTab === "plan" ? handleRemoveFromPlan : handleRemoveFromSaved}
                            onMarkDone={handleMarkDone}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
export default MyPlanPage;