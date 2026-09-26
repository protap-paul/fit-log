"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { IWorkout } from "@/types/workout";

interface FitLogContextType {
    plan: IWorkout[];
    saved: IWorkout[];

    addToPlan: (workout: IWorkout) => boolean;
    removeFromPlan: (id: number) => void;

    addToSaved: (workout: IWorkout) => void;
    removeFromSaved: (id: number) => void;

    isInPlan: (id: number) => boolean;
    isInSaved: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | null>(null);

export function FitLogProvider({
    children,
}: {
    children: ReactNode;
}) {
    // Always start with the same value on server and client
    const [plan, setPlan] = useState<IWorkout[]>([]);
    const [saved, setSaved] = useState<IWorkout[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage after component mounts
    useEffect(() => {
        try {
            const storedPlan = localStorage.getItem("fitlog_plan");
            const storedSaved = localStorage.getItem("fitlog_saved");

            if (storedPlan) {
                setPlan(JSON.parse(storedPlan));
            }

            if (storedSaved) {
                setSaved(JSON.parse(storedSaved));
            }
        } catch {
            console.error("Failed to load FitLog data from localStorage");
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save plan to localStorage
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog_plan",
            JSON.stringify(plan)
        );
    }, [plan, isLoaded]);

    // Save saved workouts to localStorage
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            "fitlog_saved",
            JSON.stringify(saved)
        );
    }, [saved, isLoaded]);

    const addToPlan = (workout: IWorkout): boolean => {
        let added = false;

        setPlan((prev) => {
            if (prev.length >= 5) return prev;

            if (prev.some((w) => w.id === workout.id)) {
                return prev;
            }

            added = true;

            return [...prev, workout];
        });

        return added;
    };

    const removeFromPlan = (id: number) => {
        setPlan((prev) =>
            prev.filter((w) => w.id !== id)
        );
    };

    const addToSaved = (workout: IWorkout) => {
        setSaved((prev) => {
            if (prev.some((w) => w.id === workout.id)) {
                return prev;
            }

            return [...prev, workout];
        });
    };

    const removeFromSaved = (id: number) => {
        setSaved((prev) =>
            prev.filter((w) => w.id !== id)
        );
    };

    const isInPlan = (id: number) => {
        return plan.some((w) => w.id === id);
    };

    const isInSaved = (id: number) => {
        return saved.some((w) => w.id === id);
    };

    const sharedData: FitLogContextType = {
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isInSaved,
    };

    return (
        <FitLogContext.Provider value={sharedData}>
            {children}
        </FitLogContext.Provider>
    );
}

export function useFitLog() {
    const ctx = useContext(FitLogContext);

    if (!ctx) {
        throw new Error(
            "useFitLog must be used within FitLogProvider"
        );
    }

    return ctx;
}