"use client";
import toast from "react-hot-toast";

import { createContext, useContext, useState, ReactNode } from "react";

import { Exercise } from "@/Types/exercise";

interface CompletedExercise {
  id: number;

  completed: boolean;
}

interface FitnessContextType {
  todayPlan: Exercise[];

  savedExercises: Exercise[];

  completedExercises: number[];

  addToTodayPlan: (exercise: Exercise) => void;

  saveForLater: (exercise: Exercise) => void;

  removeFromTodayPlan: (id: number) => void;

  removeFromSaved: (id: number) => void;

  toggleCompleted: (id: number) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

interface FitnessProviderProps {
  children: ReactNode;
}

export const FitnessProvider = ({ children }: FitnessProviderProps) => {
  const [todayPlan, setTodayPlan] = useState<Exercise[]>([]);

  const [savedExercises, setSavedExercises] = useState<Exercise[]>([]);

  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  ///

  const toggleCompleted = (id: number) => {
    const alreadyCompleted = completedExercises.includes(id);

    if (alreadyCompleted) {
      setCompletedExercises((previous) =>
        previous.filter((exerciseId) => exerciseId !== id),
      );

      toast.success("Exercise marked as incomplete");

      return;
    }

    setCompletedExercises((previous) => [...previous, id]);

    toast.success("Exercise completed! 💪");
  };

  //

  const toggleTodayPlan = (exercise: Exercise) => {
    const alreadyExists = todayPlan.some((item) => item.id === exercise.id);

    if (alreadyExists) {
      setTodayPlan((previous) =>
        previous.filter((item) => item.id !== exercise.id),
      );

      setCompletedExercises((previous) =>
        previous.filter((exerciseId) => exerciseId !== exercise.id),
      );

      toast.success(`${exercise.name} removed from Today's Plan`);

      return;
    }

    setTodayPlan((previous) => [...previous, exercise]);

    toast.success(`${exercise.name} added to Today's Plan`);
  };

  // Add exercise to today's plan

  const addToTodayPlan = (exercise: Exercise) => {
    const alreadyExists = todayPlan.some((item) => item.id === exercise.id);

    if (alreadyExists) {
      toast.error("Exercise is already Added");
      return;
    }

    setTodayPlan((previous) => [...previous, exercise]);

    toast.success(`Added to Today's Plan`);
  };

  // Save exercise for later

  const saveForLater = (exercise: Exercise) => {
    const alreadyExists = savedExercises.some(
      (item) => item.id === exercise.id,
    );

    if (alreadyExists) {
      toast.error("Exercise is already saved");
      return;
    }

    setSavedExercises((previous) => [...previous, exercise]);

    toast.success(`Saved for Future`);
  };

  // Remove exercise from today's plan

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((previous) =>
      previous.filter((exercise) => exercise.id !== id),
    );

    setCompletedExercises((previous) =>
      previous.filter((exerciseId) => exerciseId !== id),
    );

    toast.success("Removed from Today's Plan");
  };

  // Remove exercise from saved exercises

  const removeFromSaved = (id: number) => {
    setSavedExercises((previous) =>
      previous.filter((exercise) => exercise.id !== id),
    );

    toast.success("Removed from saved exercises");
  };

  return (
    <FitnessContext.Provider
      value={{
        todayPlan,

        savedExercises,

        completedExercises,

        addToTodayPlan,

        saveForLater,

        removeFromTodayPlan,

        removeFromSaved,

        toggleCompleted,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);

  if (!context) {
    throw new Error("useFitness must be used inside FitnessProvider");
  }

  return context;
};
