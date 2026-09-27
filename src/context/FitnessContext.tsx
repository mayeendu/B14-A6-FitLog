"use client";

import toast from "react-hot-toast";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Exercise } from "@/Types/exercise";

// --------------------------------------
// Local Storage Keys
// --------------------------------------

const TODAY_PLAN_KEY = "fitlog-today-plan";
const SAVED_EXERCISES_KEY = "fitlog-saved-exercises";
const COMPLETED_EXERCISES_KEY = "fitlog-completed-exercises";

// Maximum number of exercises allowed
const MAX_TODAY_PLAN = 5;

// --------------------------------------
// Context Type
// --------------------------------------

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

// --------------------------------------
// Create Context
// --------------------------------------

const FitnessContext = createContext<FitnessContextType | undefined>(
  undefined
);

// --------------------------------------
// Provider Props
// --------------------------------------

interface FitnessProviderProps {
  children: ReactNode;
}

// --------------------------------------
// Fitness Provider
// --------------------------------------

export const FitnessProvider = ({
  children,
}: FitnessProviderProps) => {
  // --------------------------------------
  // State
  // --------------------------------------

  const [todayPlan, setTodayPlan] = useState<Exercise[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const item = localStorage.getItem(TODAY_PLAN_KEY);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  const [savedExercises, setSavedExercises] = useState<Exercise[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const item = localStorage.getItem(SAVED_EXERCISES_KEY);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });

  const [completedExercises, setCompletedExercises] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const item = localStorage.getItem(COMPLETED_EXERCISES_KEY);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  });


  // --------------------------------------
  // Save Today's Plan
  // --------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(TODAY_PLAN_KEY, JSON.stringify(todayPlan));
    } catch (error) {
      console.error("Failed to save Today's Plan:", error);
    }
  }, [todayPlan]);

  // --------------------------------------
  // Save Saved Exercises
  // --------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_EXERCISES_KEY, JSON.stringify(savedExercises));
    } catch (error) {
      console.error("Failed to save Saved Exercises:", error);
    }
  }, [savedExercises]);

  // --------------------------------------
  // Save Completed Exercises
  // --------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_EXERCISES_KEY, JSON.stringify(completedExercises));
    } catch (error) {
      console.error("Failed to save Completed Exercises:", error);
    }
  }, [completedExercises]);



  // --------------------------------------
  // Add Exercise to Today's Plan
  // --------------------------------------

  const addToTodayPlan = (exercise: Exercise) => {
    // Check duplicate
    const alreadyExists = todayPlan.some(
      (item) => item.id === exercise.id
    );

    if (alreadyExists) {
      toast.error("Exercise is already added");
      return;
    }

    // Check maximum limit
    if (todayPlan.length >= MAX_TODAY_PLAN) {
      toast.error(
        `Today's Plan can contain a maximum of ${MAX_TODAY_PLAN} lifts`
      );
      return;
    }

    // Add exercise
    setTodayPlan((previous) => [
      ...previous,
      exercise,
    ]);

    toast.success("Added to Today's Plan");
  };

  // --------------------------------------
  // Toggle Today's Plan
  // --------------------------------------

  const toggleTodayPlan = (exercise: Exercise) => {
    const alreadyExists = todayPlan.some(
      (item) => item.id === exercise.id
    );

    // --------------------------------------
    // Remove existing exercise
    // --------------------------------------

    if (alreadyExists) {
      setTodayPlan((previous) =>
        previous.filter(
          (item) => item.id !== exercise.id
        )
      );

      // If removed from today's plan,
      // also remove its completed status.
      setCompletedExercises((previous) =>
        previous.filter(
          (exerciseId) => exerciseId !== exercise.id
        )
      );

      toast.success("Removed from Today's Plan");

      return;
    }

    // --------------------------------------
    // Check maximum limit before adding
    // --------------------------------------

    if (todayPlan.length >= MAX_TODAY_PLAN) {
      toast.error(
        `Today's Plan can contain a maximum of ${MAX_TODAY_PLAN} lifts`
      );

      return;
    }

    // --------------------------------------
    // Add exercise
    // --------------------------------------

    setTodayPlan((previous) => [
      ...previous,
      exercise,
    ]);

    toast.success("Added to Today's Plan");
  };

  // --------------------------------------
  // Save Exercise for Later
  // --------------------------------------

  const saveForLater = (exercise: Exercise) => {
    const alreadyExists = savedExercises.some(
      (item) => item.id === exercise.id
    );

    if (alreadyExists) {
      toast.error("Exercise is already saved");
      return;
    }

    setSavedExercises((previous) => [
      ...previous,
      exercise,
    ]);

    toast.success("Saved for Future");
  };

  // --------------------------------------
  // Remove Exercise from Today's Plan
  // --------------------------------------

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((previous) =>
      previous.filter(
        (exercise) => exercise.id !== id
      )
    );

    // Remove completed status too
    setCompletedExercises((previous) =>
      previous.filter(
        (exerciseId) => exerciseId !== id
      )
    );

    toast.success("Removed from Today's Plan");
  };

  // --------------------------------------
  // Remove Exercise from Saved
  // --------------------------------------

  const removeFromSaved = (id: number) => {
    setSavedExercises((previous) =>
      previous.filter(
        (exercise) => exercise.id !== id
      )
    );

    toast.success("Removed from saved exercises");
  };

  // --------------------------------------
  // Toggle Exercise Completed
  // --------------------------------------

  const toggleCompleted = (id: number) => {
    const alreadyCompleted =
      completedExercises.includes(id);

    // --------------------------------------
    // Mark as incomplete
    // --------------------------------------

    if (alreadyCompleted) {
      setCompletedExercises((previous) =>
        previous.filter(
          (exerciseId) => exerciseId !== id
        )
      );

      toast.success(
        "Exercise marked as incomplete"
      );

      return;
    }

    // --------------------------------------
    // Mark as completed
    // --------------------------------------

    setCompletedExercises((previous) => [
      ...previous,
      id,
    ]);

    toast.success("Exercise completed! 💪");
  };

  // --------------------------------------
  // Provider
  // --------------------------------------

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

// --------------------------------------
// Custom Hook
// --------------------------------------

export const useFitness = () => {
  const context = useContext(FitnessContext);

  if (!context) {
    throw new Error(
      "useFitness must be used inside FitnessProvider"
    );
  }

  return context;
};