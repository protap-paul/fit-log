import Banner from "@/components/homepage/Banner";
import LibrarySection from "@/components/LibrarySection";
import { IWorkout } from "@/types/workout";

const getWorkouts = async (): Promise<IWorkout[]> => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    next: { revalidate: 3600 },
  });
  if (!res.ok)
    throw new Error("Failed to fetch workouts");
  return res.json();
}


export default async function Home() {
  const workouts = await getWorkouts();
  return (
    <div>
      <Banner />
      <LibrarySection workouts={workouts} />
    </div>
  );
}
