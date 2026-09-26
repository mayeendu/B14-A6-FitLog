
"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import { Exercise } from "@/Types/exercise";

interface FitnessContextType {
    todayPlan: Exercise[];
    savedExercises: Exercise[];

    addToTodayPlan: (exercise: Exercise) => void;
    saveForLater: (exercise: Exercise) => void;

    removeFromTodayPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(
    undefined
);

interface FitnessProviderProps {
    children: ReactNode;
}

export const FitnessProvider = ({
    children,
}: FitnessProviderProps) => {
    const [todayPlan, setTodayPlan] = useState<Exercise[]>([]);
    const [savedExercises, setSavedExercises] = useState<Exercise[]>([]);

    // Add exercise to today's plan
    const addToTodayPlan = (exercise: Exercise) => {
        setTodayPlan((previous) => {
            const alreadyExists = previous.some(
                (item) => item.id === exercise.id
            );

            if (alreadyExists) {
                return previous;
            }

            return [...previous, exercise];
        });
    };

    // Save exercise for later
    const saveForLater = (exercise: Exercise) => {
        setSavedExercises((previous) => {
            const alreadyExists = previous.some(
                (item) => item.id === exercise.id
            );

            if (alreadyExists) {
                return previous;
            }

            return [...previous, exercise];
        });
    };

    // Remove exercise from today's plan
    const removeFromTodayPlan = (id: number) => {
        setTodayPlan((previous) =>
            previous.filter((exercise) => exercise.id !== id)
        );
    };

    // Remove exercise from saved exercises
    const removeFromSaved = (id: number) => {
        setSavedExercises((previous) =>
            previous.filter((exercise) => exercise.id !== id)
        );
    };

    return (
        <FitnessContext.Provider
            value={{
                todayPlan,
                savedExercises,
                addToTodayPlan,
                saveForLater,
                removeFromTodayPlan,
                removeFromSaved,
            }}
        >
            {children}
        </FitnessContext.Provider>
    );
};

export const useFitness = () => {
    const context = useContext(FitnessContext);

    if (!context) {
        throw new Error(
            "useFitness must be used inside FitnessProvider"
        );
    }

    return context;
};
