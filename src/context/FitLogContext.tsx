"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

function loadFromStorage<T>(key: string): T[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function FitLogProvider({ children }: { children: ReactNode }) {
    const [plan, setPlan] = useState<IWorkout[]>(() => loadFromStorage("fitlog_plan"));
    const [saved, setSaved] = useState<IWorkout[]>(() => loadFromStorage("fitlog_saved"));

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem("fitlog_plan", JSON.stringify(plan));
    }, [plan]);

    useEffect(() => {
        localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }, [saved]);

    const addToPlan = (workout: IWorkout): boolean => {
        let added = false;
        setPlan((prev) => {
            if (prev.length >= 5) return prev;
            if (prev.find((w) => w.id === workout.id)) return prev;
            added = true;
            return [...prev, workout];
        });
        return added;
    };

    const removeFromPlan = (id: number) => {
        setPlan((prev) => prev.filter((w) => w.id !== id));
    };

    const addToSaved = (workout: IWorkout) => {
        setSaved((prev) => {
            if (prev.find((w) => w.id === workout.id)) return prev;
            return [...prev, workout];
        });
    };

    const removeFromSaved = (id: number) => {
        setSaved((prev) => prev.filter((w) => w.id !== id));
    };

    const isInPlan = (id: number) => plan.some((w) => w.id === id);
    const isInSaved = (id: number) => saved.some((w) => w.id === id);

    const sharedData = {
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isInSaved
    }

    return (
        <FitLogContext.Provider
            value={sharedData}
        >
            {children}
        </FitLogContext.Provider>
    );
}

export function useFitLog() {
    const ctx = useContext(FitLogContext);
    if (!ctx) throw new Error("useFitLog must be used within FitLogProvider");
    return ctx;
}