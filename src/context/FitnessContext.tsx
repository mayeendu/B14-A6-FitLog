"use client";

import toast from "react-hot-toast";
import { createContext, useContext, useState, ReactNode } from "react";

import { Exercise } from "@/Types/exercise";

interface FitnessContextType {
  todayPlan: Exercise[];
  savedExercises: Exercise[];
  completedExercises: number[];

  addToTodayPlan: (exercise: Exercise) => void;
  toggleTodayPlan: (exercise: Exercise) => void;

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

  // ==========================================
  // Mark as Done ↔ Completed
  // ==========================================

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

  // ==========================================
  // Add exercise to Today's Plan
  // ==========================================

  const addToTodayPlan = (exercise: Exercise) => {
    const alreadyExists = todayPlan.some((item) => item.id === exercise.id);

    if (alreadyExists) {
      toast.error("Exercise is already added");
      return;
    }

    setTodayPlan((previous) => [...previous, exercise]);

    toast.success("Added to Today's Plan");
  };

  // ==========================================
  // Add ↔ Remove from Today's Plan
  // Used by Saved menu
  // ==========================================

  const toggleTodayPlan = (exercise: Exercise) => {
    const alreadyExists = todayPlan.some((item) => item.id === exercise.id);

    if (alreadyExists) {
      // Remove from Today's Plan
      setTodayPlan((previous) =>
        previous.filter((item) => item.id !== exercise.id),
      );

      // Also remove completed status
      setCompletedExercises((previous) =>
        previous.filter((exerciseId) => exerciseId !== exercise.id),
      );

      toast.success("Removed from Today's Plan");

      return;
    }

    // Add to Today's Plan
    setTodayPlan((previous) => [...previous, exercise]);

    toast.success("Added to Today's Plan");
  };

  // ==========================================
  // Save for Later
  // ==========================================

  const saveForLater = (exercise: Exercise) => {
    const alreadyExists = savedExercises.some(
      (item) => item.id === exercise.id,
    );

    if (alreadyExists) {
      toast.error("Exercise is already saved");
      return;
    }

    setSavedExercises((previous) => [...previous, exercise]);

    toast.success("Saved for Future");
  };

  // ==========================================
  // Remove from Today's Plan
  // ==========================================

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((previous) =>
      previous.filter((exercise) => exercise.id !== id),
    );

    // Remove completed status too
    setCompletedExercises((previous) =>
      previous.filter((exerciseId) => exerciseId !== id),
    );

    toast.success("Removed from Today's Plan");
  };

  // ==========================================
  // Remove from Saved Exercises
  // ==========================================

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
        toggleTodayPlan,

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

// ==========================================
// Custom Hook
// ==========================================

export const useFitness = () => {
  const context = useContext(FitnessContext);

  if (!context) {
    throw new Error("useFitness must be used inside FitnessProvider");
  }

  return context;
};
