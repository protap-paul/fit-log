
import { IWorkout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

interface LibrarySectionProps {
    workouts: IWorkout[];
}

const LibrarySection = ({ workouts }: LibrarySectionProps) => {
    return (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
                <h2 className="font-bold text-3xl sm:text-4xl text-white uppercase tracking-wide">
                    The Library
                </h2>
                <p className="text-gray-400 mt-2">
                    Twelve lifts covering every major muscle group.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </section>
    );
};

export default LibrarySection;
