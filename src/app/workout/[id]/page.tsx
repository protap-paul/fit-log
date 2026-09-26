
import { IWorkout } from "@/types/workout";
import { notFound } from "next/navigation";
import WorkoutDetails from "./WorkoutDetails";

const getWorkout = async (id: string): Promise<IWorkout | null> => {
    try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

const WorkoutDetailsPage = async ({ params, }: { params: Promise<{ id: string }>; }) => {
    const { id } = await params;
    const workout = await getWorkout(id);

    if (!workout) {
        notFound();
    }

    return <WorkoutDetails workout={workout} />;
}
export default WorkoutDetailsPage;